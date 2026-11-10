// § rim lurker: the mountain rooms' first night creature, a hunched shade that waits by the rock
// till the hero comes within 3 steps, then chases; 3 hearts, a bite of 2 (D-797)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, poolAt } from '../src/core/room.js';
import { makeState, step, wait, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
import { BEHAVIOURS } from '../src/core/behaviours.js';

const room = makeRoom(FIRST_ROOM);
// The first room, the hero at 5,11 and one rim lurker
const at = (x, y, extra = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies: [{ id: 'rimLurker', x, y }], ...extra });
const where = (s) => s.enemies.map(({ x, y }) => [x, y]);

test('a rim lurker has 3 hearts and a bite of 2, lurks, and drops a Lurker Claw', () => {
  const m = get('rimLurker');
  assert.equal(m.name, 'Rim lurker'); assert.equal(m.health, 3); assert.equal(m.bite, 2);
  assert.deepEqual(m.ways, ['lurks']); assert.equal(BEHAVIOURS.lurks.near, 3);
  assert.equal(m.drops, 'lurkerClaw'); assert.equal(m.rare, undefined);
  for (const id of [m.hurt, m.die, m.bites]) assert.ok(LINES[id], id);
  assert.ok(m.acts); assert.ok(m.fights);
  const c = get('lurkerClaw');
  assert.equal(c.name, 'Lurker Claw'); assert.equal(c.max, 20); assert.equal(c.sells, 1); assert.ok(c.bag);
  for (const id of [c.says, c.look, c.full]) assert.ok(LINES[id], id);
});

test('never underground: in no depth\'s pool', () => {
  for (const d of [1, 2, 5, 9, 20]) assert.ok(!poolAt(d).includes('rimLurker'), d);
});

test('4 steps away it waits, even in the lantern light', () => {
  let s = at(5, 7);
  for (let i = 0; i < 6; i++) s = wait(s);
  assert.deepEqual(where(s), [[5, 7]]);
});

test('within 3 steps it comes, lit or not, and keeps coming', () => {
  for (const lit of [true, false]) {
    const s = wait(at(5, 8, { lit }));
    assert.deepEqual(where(s), [[5, 9]], `lit ${lit}`);
    assert.ok(s.enemies[0].chasing);
  }
});

test('beside the hero it claws for 2', () => {
  const s = at(5, 10), n = wait(s);
  assert.equal(n.health, s.health - 2);
  assert.equal(n.line.id, 'rimLurkerBite');
});

test('three lantern hits beat it', () => {
  let s = step(at(5, 10), 'up');
  assert.equal(s.enemies[0].health, 2);
  s = step({ ...s, health: 10 }, 'up');
  const n = step({ ...s, health: 10 }, 'up');
  assert.deepEqual(n.enemies, []);
  assert.equal(n.line.id, 'rimLurkerDie');
});
