// § charm: the Wisp Charm, the first charm, made at the workbench and worn from the bag;
// worn, rare drops come about 1 in 5, not 1 in 10 (D-486)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, step } from '../src/core/turn.js';
import { benchMakes } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { wear, rareOf } from '../src/core/worn.js';

const room = makeRoom(FIRST_ROOM);
const start = (bag) => ({ ...makeState(room), bag });

test('the Wisp Charm is the bench\'s fifth slot: 3 Gloam Wisp and 1 Copper Ore, dim with too few', () => {
  assert.equal(get('wispCharm').name, 'Wisp Charm');
  const charm = benchMakes([{ id: 'gloamWisp', n: 3 }, { id: 'copperOre', n: 1 }])[4];
  assert.deepEqual(charm, { item: 'wispCharm', cost: [{ id: 'gloamWisp', n: 3, have: 3 }, { id: 'copperOre', n: 1, have: 1 }], dim: false });
  assert.equal(benchMakes([{ id: 'gloamWisp', n: 2 }, { id: 'copperOre', n: 1 }])[4].dim, true);
});

test('Make takes its cost for a charm, a turn; too few or one worn is free', () => {
  const s = start([{ id: 'gloamWisp', n: 4 }, { id: 'copperOre', n: 1 }]);
  const made = makeAt(s, 'wispCharm');
  assert.deepEqual(made.bag, [{ id: 'gloamWisp', n: 1 }, { id: 'wispCharm', n: 1 }]);
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'You make a wisp charm.');
  assert.equal(shownLine(makeAt(start([{ id: 'gloamWisp', n: 2 }]), 'wispCharm')).text, 'You need 3 Gloam Wisp, 1 Copper Ore.');
  const worn = makeAt({ ...s, worn: { charm: ['wispCharm'] } }, 'wispCharm');
  assert.equal(worn.turn, s.turn);
  assert.equal(shownLine(worn).text, 'You already have a wisp charm.');
});

test('Wear puts the charm on from the bag, free, beside the vest', () => {
  const s = { ...start([{ id: 'wispCharm', n: 1 }]), worn: { armour: ['ratVest'] } };
  assert.equal(rareOf(s, 0.1), 0.1);
  const n = wear(s, 0);
  assert.deepEqual(n.worn, { armour: ['ratVest'], charm: ['wispCharm'] });
  assert.deepEqual(n.bag, []);
  assert.equal(n.turn, s.turn);
  assert.equal(shownLine(n).text, 'You put on the wisp charm.');
  assert.equal(rareOf(n, 0.1), 0.2);
});

test('worn, a beaten gloamling leaves its Gloam Eye about 1 in 5; the common still about 1 in 2', () => {
  const beat = (seed, worn) => step({ ...makeState(room), seed, worn, hero: { x: 5, y: 11 }, items: [],
    enemies: [{ id: 'gloamling', x: 5, y: 10, health: 1, chasing: true }] }, 'up');
  const seeds = Array.from({ length: 1000 }, (_, i) => i + 1);
  const count = (id, worn) => seeds.filter((s) => beat(s, worn).items.some((it) => it.id === id)).length;
  const rare = count('gloamEye', { charm: ['wispCharm'] }), common = count('gloamWisp', { charm: ['wispCharm'] });
  assert.ok(rare > 150 && rare < 250, `${rare} of 1000`);
  assert.ok(common > 420 && common < 580, `${common} of 1000`);
  assert.ok(count('gloamEye', {}) < 140, 'bare, still about 1 in 10');
});
