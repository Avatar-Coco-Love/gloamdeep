// § skulker crab: the mountain rooms' first creature, a loose stone that pinches, never moving,
// 2 hearts (D-796): the snapcap's way (D-543), out by day in each mountain room
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, poolAt } from '../src/core/room.js';
import { makeState, step, wait, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
// The first room, the hero at 5,11 and one skulker crab
const at = (x, y, extra = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies: [{ id: 'skulkerCrab', x, y }], ...extra });
const where = (s) => s.enemies.map(({ x, y }) => [x, y]);

test('a skulker crab has 2 hearts and a bite of 1, no ways, shut as a loose stone, and drops a Crab Shell', () => {
  const m = get('skulkerCrab');
  assert.equal(m.name, 'Skulker crab'); assert.equal(m.health, 2); assert.equal(m.bite, 1);
  assert.deepEqual(m.ways, []); assert.equal(m.shutAs, 'stone');
  assert.equal(m.drops, 'crabShell'); assert.equal(m.rare, undefined);
  for (const id of [m.hurt, m.die, m.bites]) assert.ok(LINES[id], id);
  assert.ok(m.acts); assert.ok(m.fights);
  const c = get('crabShell');
  assert.equal(c.name, 'Crab Shell'); assert.equal(c.max, 20); assert.equal(c.sells, 1); assert.ok(c.bag);
  for (const id of [c.says, c.look, c.full]) assert.ok(LINES[id], id);
});

test('never underground: in no depth\'s pool', () => {
  for (const d of [1, 2, 5, 9, 20]) assert.ok(!poolAt(d).includes('skulkerCrab'), d);
});

test('it never moves, even with the hero in sight and the lantern lit', () => {
  let s = at(5, 7);
  for (let i = 0; i < 6; i++) s = wait(s);
  assert.deepEqual(where(s), [[5, 7]]);
  assert.equal(s.health, at(5, 7).health);
});

test('beside the hero it pinches for 1, lit or not', () => {
  for (const lit of [true, false]) {
    const s = at(5, 10, { lit }), n = wait(s);
    assert.equal(n.health, s.health - 1, `lit ${lit}`);
    assert.equal(n.line.id, 'skulkerCrabBite');
  }
});

test('hurt, it stays where it is; two lantern hits beat it', () => {
  const s = step(at(5, 10), 'up');
  assert.equal(s.enemies[0].health, 1);
  assert.deepEqual(where(s), [[5, 10]]);
  const n = step(s, 'up');
  assert.deepEqual(n.enemies, []);
  assert.equal(n.line.id, 'skulkerCrabDie');
});
