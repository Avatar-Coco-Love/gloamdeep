// § bat: seeks light and flees when hurt (step 0.3.8, D-365, D-537, D-538)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, poolAt } from '../src/core/room.js';
import { makeState, step, wait, switchLantern, FIRST_START } from '../src/core/turn.js';
import { biteSound } from '../src/core/enemies.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
// The first room with the given lights, the hero at 5,11 and one bat
const at = (x, y, lights = [], seed) => ({ ...makeState(room, FIRST_START, lights, []), hero: { x: 5, y: 11 }, enemies: [{ id: 'bat', x, y }], ...(seed ? { seed } : {}) });
const where = (s) => s.enemies.map(({ x, y }) => [x, y]);

test('a bat has 2 health and a bite of 1, seeks light, flees when hurt, and drops Bat Wing and Bat Fang', () => {
  const m = get('bat');
  assert.equal(m.name, 'Bat'); assert.equal(m.health, 2); assert.equal(m.bite, 1);
  assert.deepEqual(m.ways, ['seeksLight', 'fleesHurt']);
  assert.equal(m.drops, 'batWing'); assert.equal(m.rare, 'batFang');
  for (const id of [m.hurt, m.stands, m.die, m.bites]) assert.ok(LINES[id], id);
  assert.equal(get('batWing').sells, 1); assert.equal(get('batFang').sells, 5);
});

test('it joins the pool from depth 3, not before', () => {
  assert.ok(!poolAt(2).includes('bat'));
  assert.ok(poolAt(3).includes('bat'));
  assert.ok(poolAt(9).includes('bat'));
});

test('while the lantern is lit it comes for the hero from anywhere', () => {
  assert.deepEqual(where(wait(at(9, 1))), [[9, 2]]);
});

test('with the lantern off and no torch it stays put', () => {
  let s = switchLantern(at(5, 7));
  for (let i = 0; i < 3; i++) s = wait(s);
  assert.deepEqual(where(s), [[5, 7]]);
});

test('next to the hero it bites for 1, with its own squeak', () => {
  const s = at(5, 10), n = wait(s);
  assert.equal(n.health, s.health - 1);
  assert.equal(n.line.id, 'batBite');
  assert.equal(biteSound(n.events), 'squeak');
});

test('hurt, on one side of the coin it flees, on the other it stands', () => {
  const lines = new Set();
  for (let seed = 1; seed <= 20; seed++) lines.add(step(at(5, 10, [], seed), 'up').line.id);
  assert.ok(lines.has('batHurt'), 'sometimes it flees');
  assert.ok(lines.has('batStands'), 'sometimes it stands');
  const flees = Array.from({ length: 20 }, (_, i) => i + 1).find((seed) => step(at(5, 10, [], seed), 'up').line.id === 'batHurt');
  const n = step(at(5, 10, [], flees), 'up');
  assert.equal(n.enemies[0].health, 1);
  assert.ok(n.enemies[0].flees > 0);
  assert.notDeepEqual(where(n), [[5, 10]], 'it flies off a tile');
});

test('two lantern hits beat it, worth 3', () => {
  const n = step({ ...at(5, 10), enemies: [{ id: 'bat', x: 5, y: 10, health: 1 }] }, 'up');
  assert.deepEqual(n.enemies, []);
  assert.equal(n.line.id, 'batDie');
  assert.equal(n.xp, 3);
});
