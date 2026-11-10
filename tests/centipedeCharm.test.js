// § centipede charm: the charm against poison, made at the workbench, after the rod, from 3 Centipede Leg and
// 1 Copper Ore; worn, poisoned lasts 3 turns, not 6, and takes 1 heart, not 2 (D-656)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, wait, FIRST_START } from '../src/core/turn.js';
import { benchMakes, benchTabOf } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { wear } from '../src/core/worn.js';
import { poisonLeft } from '../src/core/poison.js';

const room = makeRoom(FIRST_ROOM);
const start = (bag) => ({ ...makeState(room), bag });
const at = (enemies, more = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies, ...more });
const waits = (s, n) => { const out = []; for (let i = 0; i < n; i++) out.push(s = wait(s)); return out; };
const worn = { charm: ['centipedeCharm'] };

test("the Centipede Charm is on the GEAR tab, before the Echo Charm (D-690, D-800, D-805): 3 Centipede Leg and 1 Copper Ore, dim with too few", () => {
  const c = get('centipedeCharm');
  assert.equal(c.name, 'Centipede Charm'); assert.equal(c.max, 1);
  const slot = benchMakes([{ id: 'centipedeLeg', n: 3 }, { id: 'copperOre', n: 1 }], 6, [], benchTabOf('gear').makes).at(-2);
  assert.deepEqual(slot, { item: 'centipedeCharm', cost: [{ id: 'centipedeLeg', n: 3, have: 3 }, { id: 'copperOre', n: 1, have: 1 }], dim: false });
  assert.equal(benchMakes([{ id: 'centipedeLeg', n: 2 }, { id: 'copperOre', n: 1 }], 6, [], benchTabOf('gear').makes).at(-2).dim, true);
});

test('Make takes its cost, a turn; too few or one worn is free', () => {
  const s = start([{ id: 'centipedeLeg', n: 4 }, { id: 'copperOre', n: 1 }]);
  const made = makeAt(s, 'centipedeCharm');
  assert.deepEqual(made.bag, [{ id: 'centipedeLeg', n: 1 }, { id: 'centipedeCharm', n: 1 }]);
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'You make a centipede charm.');
  assert.equal(shownLine(makeAt(start([{ id: 'copperOre', n: 1 }]), 'centipedeCharm')).text, 'Need 3 Centipede Leg, 1 Copper Ore.');
  const has = makeAt({ ...s, worn }, 'centipedeCharm');
  assert.equal(has.turn, s.turn);
  assert.equal(shownLine(has).text, 'You already have a centipede charm.');
});

test('Wear puts it on beside another charm, free', () => {
  const s = { ...start([{ id: 'centipedeCharm', n: 1 }]), worn: { charm: ['wispCharm'] } };
  const n = wear(s, 0);
  assert.deepEqual(n.worn.charm, ['wispCharm', 'centipedeCharm']);
  assert.equal(n.turn, s.turn);
  assert.equal(shownLine(n).text, 'You put on the centipede charm.');
});

test('worn, a bite poisons for 3 turns, not 6', () => {
  const n = wait(at([{ id: 'centipede', x: 5, y: 10 }], { worn }));
  assert.equal(poisonLeft(n), 3);
  assert.equal(poisonLeft(wait(at([{ id: 'centipede', x: 5, y: 10 }]))), 6);
});

test('worn, poisoned takes 1 heart on its 3rd turn, then wears off with its line', () => {
  const turns = waits({ ...at([], { worn }), health: 5, poisoned: 3 }, 4);
  assert.deepEqual(turns.map((t) => t.health), [5, 5, 4, 4]);
  assert.deepEqual(turns.map(poisonLeft), [2, 1, 0, 0]);
  assert.equal(turns[2].line.id, 'poisonEnds');
});
