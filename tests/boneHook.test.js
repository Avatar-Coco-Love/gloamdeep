// § bone hook: the Rat Bone's first use (D-799, D-807), made on the workbench's BUILD tab and
// fitted to the rod from the bag; fitted, the strike meter's zone is half again as wide
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, withTile } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, step, wait } from '../src/core/turn.js';
import { benchMakes, benchTabOf } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { fit, isFitted, burnOf } from '../src/core/parts.js';
import { strikeFish, zoneWidth } from '../src/core/fishing.js';

const start = (bag, more = {}) => ({ ...makeState(makeRoom(FIRST_ROOM)), bag, ...more });
const HOOK = { id: 'boneHook', n: 1 };

test('the Bone Hook is the BUILD tab\'s last slot: 3 Rat Bone and 1 Spider Silk, dim with too few', () => {
  const hook = get('boneHook');
  assert.equal(hook.name, 'Bone Hook');
  assert.equal(hook.max, 1);
  const last = (bag) => benchMakes(bag, 6, [], benchTabOf('build').makes).at(-1);
  assert.deepEqual(last([{ id: 'ratBone', n: 3 }, { id: 'spiderSilk', n: 1 }]), { item: 'boneHook', cost: [{ id: 'ratBone', n: 3, have: 3 }, { id: 'spiderSilk', n: 1, have: 1 }], dim: false });
  assert.equal(last([{ id: 'ratBone', n: 2 }, { id: 'spiderSilk', n: 1 }]).dim, true);
});

test('Make takes its cost, a turn; too few, one carried or one fitted is free', () => {
  const s = start([{ id: 'ratBone', n: 4 }, { id: 'spiderSilk', n: 1 }]), made = makeAt(s, 'boneHook');
  assert.deepEqual(made.bag, [{ id: 'ratBone', n: 1 }, HOOK]);
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'You make a bone hook.');
  assert.equal(shownLine(makeAt(start([{ id: 'ratBone', n: 2 }]), 'boneHook')).text, 'Need 3 Rat Bone, 1 Spider Silk.');
  const more = [{ id: 'ratBone', n: 3 }, { id: 'spiderSilk', n: 1 }];
  assert.equal(shownLine(makeAt(start([HOOK, ...more]), 'boneHook')).text, 'You already have a bone hook.');
  const tied = makeAt(start(more, { parts: { hook: 'boneHook' } }), 'boneHook');
  assert.equal(tied.turn, s.turn);
  assert.equal(shownLine(tied).text, 'You already have a bone hook.');
});

test('FIT ties it to the rod, free, the rod in the bag or the Tool slot; with no rod it stays', () => {
  for (const s of [start([{ id: 'rod', n: 1 }, HOOK]), start([{ id: 'stone', n: 1 }, HOOK], { tool: 'rod' })]) {
    const n = fit(s, 1);
    assert.equal(isFitted(n, 'boneHook'), true);
    assert.equal(n.bag.some((o) => o.id === 'boneHook'), false);
    assert.equal(n.turn, s.turn);
    assert.equal(shownLine(n).text, 'You tie the bone hook to your rod.');
  }
  const none = fit(start([HOOK], { tool: 'pick' }), 0);
  assert.deepEqual(none.bag, [HOOK]);
  assert.equal(isFitted(none, 'boneHook'), false);
  assert.equal(shownLine(none).text, 'You have no rod to fit it to.');
  assert.equal(burnOf(start([], { parts: { hook: 'boneHook' } })), burnOf(start([])), 'the lantern burns the same');
});

test('fitted, the strike zone is half again as wide: the minnow 3/8, the cavefish 3/10', () => {
  const hooked = start([], { parts: { hook: 'boneHook' } }), plain = start([]);
  const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} vs ${b}`);
  near(zoneWidth({ fish: 'pondMinnow' }, plain), 1 / 4);
  near(zoneWidth({ fish: 'pondMinnow' }, hooked), 3 / 8);
  near(zoneWidth({ fish: 'blindCavefish' }, plain), 1 / 5);
  near(zoneWidth({ fish: 'blindCavefish' }, hooked), 3 / 10);
});

test('a strike just past the plain zone still lands the fish with the hook', () => {
  const beside = (parts) => ({ ...makeState(withTile(makeRoom(FIRST_ROOM), 5, 10, get('water'))), hero: { x: 5, y: 11 }, tool: 'rod', place: 'woods', enemies: [], parts });
  const pull = (s) => { s = step(s, 'up'); for (let i = 0; i < 200 && !s.float?.bite; i++) s = wait(s); return step(s, 'up'); };
  const plain = pull(beside({})), hooked = pull(beside({ hook: 'boneHook' }));
  assert.equal(shownLine(strikeFish(plain, plain.float.strike + 0.3)).text, 'It got away.');
  assert.equal(shownLine(strikeFish(hooked, hooked.float.strike + 0.3)).text, 'You catch a pond minnow.');
  assert.ok(hooked.float.strike <= 1 - 3 / 8, 'the wider zone still fits the bar');
});
