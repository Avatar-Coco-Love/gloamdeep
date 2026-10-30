// § spear: the second weapon, in depth 3's first room; it hits a creature for 2 and the
// one awake behind it for 1. Found with a weapon held it goes into the bag, where Hold
// swaps it into the hand, a turn (D-479)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, placeFor, tileAt } from '../src/core/room.js';
import { makeState, makeWorld, step, hold, itemAt, heroHit, behind } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { spawn } from '../src/core/spawn.js';
import { shownLine } from '../src/core/lines.js';
import { goToDepth } from '../src/core/stairs.js';
import { layoutAt } from '../src/core/region.js';

// A long room under a roof, the hero at 1,2 facing right along row 2
const ROOM = ['########', '#......#', '#......#', '#......#', '########'];
const inside = (more = {}) => ({ ...makeState(makeRoom(ROOM), { x: 1, y: 2 }), held: 'spear', ...more });
const at = (s, x, y) => s.enemies.find((e) => e.x === x && e.y === y);

test('the spear is a held item hitting 2, and 1 through', () => {
  const spear = get('spear');
  assert.equal(spear.kind, 'item');
  assert.equal(spear.name, 'Spear');
  assert.equal(spear.hit, 2);
  assert.equal(spear.through, 1);
  assert.equal(spear.hold, true);
  assert.equal(heroHit(inside()), 2);
});

test('walking into a creature hits it for 2 and the one behind it for 1', () => {
  const s = inside({ enemies: [{ id: 'flaskMimic', x: 2, y: 2 }, { id: 'flaskMimic', x: 3, y: 2 }] });
  const n = step(s, 'right');
  assert.equal(at(n, 2, 2).health, 1);
  assert.equal(at(n, 3, 2).health, 2);
  assert.equal(n.turn, 1);
  assert.equal(n.events.filter((e) => e.type === 'hit').length, 2);
});

test('it beats both, each worth its experience', () => {
  const s = inside({ enemies: [{ id: 'rat', x: 2, y: 2, health: 2 }, { id: 'lampmoth', x: 3, y: 2 }] });
  const n = step(s, 'right');
  assert.equal(n.enemies.length, 0);
  assert.equal(n.events.filter((e) => e.type === 'beat').length, 2);
  assert.equal(n.xp, 2 + 1 + 1 + 1);
  assert.equal(shownLine(n).text, 'The rat squeaks and falls still.'); // the front one's line
});

test('only the tile in line behind is hit, never one beside, nor one asleep', () => {
  const side = inside({ enemies: [{ id: 'flaskMimic', x: 2, y: 2 }, { id: 'flaskMimic', x: 2, y: 3 }] });
  assert.equal(step(side, 'right').enemies.filter((e) => (e.health ?? 3) === 3).length, 1); // the one beside, untouched
  const asleep = inside({ enemies: [{ id: 'rat', x: 2, y: 2 }, { id: 'flaskMimic', x: 3, y: 2, asleep: true }] });
  assert.equal(behind(asleep, asleep.enemies[0]), null);
  assert.ok(at(step(asleep, 'right'), 3, 2).asleep);
});

test('the knife and the lantern hit only the one', () => {
  const two = { enemies: [{ id: 'flaskMimic', x: 2, y: 2 }, { id: 'flaskMimic', x: 3, y: 2 }] };
  for (const held of ['knife', null]) assert.equal(step(inside({ ...two, held }), 'right').enemies.filter((e) => (e.health ?? 3) === 3).length, 1);
});

test('found with a weapon held, it goes into the bag; with the bag full it stays', () => {
  const s = spawn(inside({ held: 'knife' }), 'spear', 2, 2);
  const n = step(s, 'right');
  assert.deepEqual(n.bag, [{ id: 'spear', n: 1 }]);
  assert.equal(shownLine(n).text, 'The spear goes in your bag.');
  const full = Array.from({ length: 6 }, () => ({ id: 'stone', n: 20 }));
  const f = step({ ...s, bag: full }, 'right');
  assert.equal(itemAt(f, 2, 2).id, 'spear');
  assert.equal(shownLine(f).text, 'Your bag is full.');
});

test('with an empty hand it is held at once', () => {
  const n = step(spawn(inside({ held: null }), 'spear', 2, 2), 'right');
  assert.equal(n.held, 'spear');
  assert.equal(shownLine(n).text, 'You take the spear.');
});

test('Hold swaps the weapon in the bag with the one in hand, a turn', () => {
  const s = inside({ held: 'knife', bag: [{ id: 'stone', n: 3 }, { id: 'spear', n: 1 }] });
  const n = hold(s, 1);
  assert.equal(n.held, 'spear');
  assert.deepEqual(n.bag, [{ id: 'stone', n: 3 }, { id: 'knife', n: 1 }]);
  assert.equal(n.turn, 1);
  assert.equal(shownLine(n).text, 'You hold the spear.');
  assert.ok(n.events.some((e) => e.type === 'hold' && e.id === 'spear'));
  const empty = hold(inside({ held: null, bag: [{ id: 'spear', n: 1 }] }), 0);
  assert.equal(empty.held, 'spear');
  assert.deepEqual(empty.bag, []);
  assert.equal(hold(s, 0), s); // a stone has no Hold
});

test('the spear lies only in depth 3\'s room with the stairs up, on a free floor tile', () => {
  for (const seed of [1, 7, 4127, 99991]) for (const c of layoutAt(seed, 3).cells) {
    const p = placeFor(c.id, seed), spears = p.items.filter((it) => it.id === 'spear');
    assert.equal(spears.length, c.up ? 1 : 0);
    if (!c.up) continue;
    const [k] = spears, r = makeRoom(p.map);
    assert.equal(tileAt(r, k.x, k.y).id, 'floor');
    assert.equal(p.items.filter((it) => it.x === k.x && it.y === k.y).length, 1);
    assert.ok(!p.enemies.some((e) => e.x === k.x && e.y === k.y));
  }
  assert.ok(!placeFor('depth2', 1).items.some((it) => it.id === 'spear'));
});

test('with a spear held or in the bag, none lies in depth 3', () => {
  assert.ok(goToDepth(makeWorld(), 3).items.some((it) => it.id === 'spear'));
  assert.ok(!goToDepth({ ...makeWorld(), held: 'spear' }, 3).items.some((it) => it.id === 'spear'));
  assert.ok(!goToDepth({ ...makeWorld(), bag: [{ id: 'spear', n: 1 }] }, 3).items.some((it) => it.id === 'spear'));
});
