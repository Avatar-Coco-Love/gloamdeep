// § mole: burrows and never flees, 4 hearts (step 0.3.10, D-365, D-541, D-542; burrows, D-726)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, poolAt } from '../src/core/room.js';
import { makeState, step, wait, FIRST_START } from '../src/core/turn.js';
import { biteSound } from '../src/core/enemies.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
// The first room, the hero at 5,11 and one mole
const at = (x, y, health, seed) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies: [{ id: 'mole', x, y, ...(health && { health }) }], ...(seed ? { seed } : {}) });
const where = (s) => s.enemies.map(({ x, y }) => [x, y]);

test('a mole has 4 health and a bite of 1, burrows, and drops Mole Fur and Mole Claw', () => {
  const m = get('mole');
  assert.equal(m.name, 'Mole'); assert.equal(m.health, 4); assert.equal(m.bite, 1);
  assert.deepEqual(m.ways, ['burrows']);
  assert.equal(m.drops, 'moleFur'); assert.equal(m.rare, 'moleClaw');
  for (const id of [m.hurt, m.die, m.bites, m.digs, m.surfaces, m.surfacesFar, m.underSay]) assert.ok(LINES[id], id);
  assert.equal(get('moleFur').sells, 1); assert.equal(get('moleClaw').sells, 5);
});

test('it joins the pool from depth 5, not before', () => {
  assert.ok(!poolAt(4).includes('mole'));
  assert.ok(poolAt(5).includes('mole'));
  assert.ok(poolAt(9).includes('mole'));
});

test('next to the hero it bites for 1, with its own snuffle', () => {
  const s = at(5, 10), n = wait(s);
  assert.equal(n.health, s.health - 1);
  assert.equal(n.line.id, 'moleBite');
  assert.equal(biteSound(n.events), 'snuffle');
});

test('hurt, it never flees: it stays and keeps coming, whatever the seed', () => {
  for (let seed = 1; seed <= 20; seed++) {
    const n = step(at(5, 10, undefined, seed), 'up');
    assert.equal(n.enemies[0].health, 3);
    assert.ok(!n.enemies[0].flees, 'no fleeing');
    assert.deepEqual(where(n), [[5, 10]]);
  }
});

test('four lantern hits beat it, worth 5', () => {
  let s = at(5, 10);
  for (let i = 0; i < 3; i++) s = step(s, 'up');
  assert.equal(s.enemies[0].health, 1);
  const n = step(s, 'up');
  assert.deepEqual(n.enemies, []);
  assert.equal(n.line.id, 'moleDie');
  assert.equal(n.xp, 5);
});

// § burrows (D-726)
test('seeing the hero in the light, it digs down where it stands, with its line', () => {
  const n = wait(at(5, 8));
  assert.deepEqual(where(n), [[5, 8]]);
  assert.equal(n.enemies[0].under, true);
  assert.equal(n.line.id, 'moleDigs');
});

test('under the earth it comes a tile a turn, comes up beside the hero, and bites only on the turn after', () => {
  let s = wait(at(5, 8));
  s = wait(s); assert.deepEqual(where(s), [[5, 9]]); assert.ok(s.enemies[0].under);
  s = wait(s); assert.deepEqual(where(s), [[5, 10]]); assert.ok(s.enemies[0].under);
  const full = s.health;
  s = wait(s);
  assert.ok(!s.enemies[0].under, 'up'); assert.ok(s.enemies[0].dug);
  assert.equal(s.line.id, 'moleSurfaces'); assert.equal(s.health, full, 'no bite as it comes up');
  s = wait(s);
  assert.equal(s.health, full - 1); assert.equal(s.line.id, 'moleBite');
});

test('its mound can not be hit: a bump says so, free, and hurts nothing', () => {
  const s = { ...at(5, 10), enemies: [{ id: 'mole', x: 5, y: 10, under: true, chasing: true }] }, n = step(s, 'up');
  assert.equal(n.turn, s.turn, 'free');
  assert.equal(n.line.id, 'moleUnder');
  assert.equal(n.enemies[0].health, undefined);
  assert.deepEqual(where(n), [[5, 10]]);
});

test('once up, it never digs again: it chases on foot', () => {
  const s = { ...at(5, 8), enemies: [{ id: 'mole', x: 5, y: 8, dug: true, chasing: true }] }, n = wait(s);
  assert.deepEqual(where(n), [[5, 9]]);
  assert.ok(!n.enemies[0].under);
});

// § stuck under the earth (B-003, D-857)
test('under the earth with no tile toward the hero free, it comes up where it is, then can be hit', () => {
  // the hero at 5,11, the mole under at 4,10, diagonal; a rat on 5,10 and on 4,11 blocks both tiles toward them
  const s = { ...at(4, 10), enemies: [{ id: 'mole', x: 4, y: 10, under: true, chasing: true }, { id: 'rat', x: 5, y: 10, asleep: true }, { id: 'rat', x: 4, y: 11, asleep: true }] };
  const n = wait(s), m = n.enemies.find((e) => e.id === 'mole');
  assert.deepEqual([m.x, m.y], [4, 10], 'where it was');
  assert.ok(!m.under, 'up'); assert.ok(m.dug, 'it never digs again');
  assert.equal(n.line.id, 'moleSurfacesFar');
});

test('it notices the hero only within 5 steps, even in daylight that lights every tile (D-858)', () => {
  assert.equal(get('mole').sight, 5);
  const day = (s) => ({ ...s, room: { ...s.room, dark: { ...s.room.dark, sky: true } }, turn: 0 });
  assert.ok(wait(day(at(5, 6))).enemies[0].under, '5 steps: it digs down');
  for (const y of [5, 4]) {
    const far = wait(day(at(5, y))).enemies[0];
    assert.ok(!far.under && !far.chasing, `${11 - y} steps: it has not noticed`);
  }
  const after = day({ ...at(5, 4), enemies: [{ id: 'mole', x: 5, y: 4, chasing: true }] });
  assert.ok(wait(after).enemies[0].under, 'once after the hero, it keeps coming from farther');
});
