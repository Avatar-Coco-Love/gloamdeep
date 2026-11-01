// § bone rat: a rat with nothing left but bone; chases and never flees, 3 hearts (step 0.3.15, D-549, D-551)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, poolAt } from '../src/core/room.js';
import { makeState, step, wait, FIRST_START } from '../src/core/turn.js';
import { biteSound } from '../src/core/enemies.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
// The first room, the hero at 5,11 and one bone rat
const at = (x, y, seed) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies: [{ id: 'boneRat', x, y }], ...(seed ? { seed } : {}) });
const where = (s) => s.enemies.map(({ x, y }) => [x, y]);

test('a bone rat has 3 health and a bite of 1, only chases, and drops a Rat Bone', () => {
  const m = get('boneRat');
  assert.equal(m.name, 'Bone rat'); assert.equal(m.health, 3); assert.equal(m.bite, 1);
  assert.deepEqual(m.ways, ['chases']);
  assert.equal(m.drops, 'ratBone'); assert.equal(m.rare, undefined); // its rare one waits (Q-061)
  for (const id of [m.hurt, m.die, m.bites]) assert.ok(LINES[id], id);
  assert.equal(get('ratBone').name, 'Rat Bone'); assert.equal(get('ratBone').sells, 1); assert.equal(get('ratBone').max, 20);
});

test('it joins the pool from depth 4, never leaving, and not before', () => {
  assert.ok(!poolAt(3).includes('boneRat'));
  for (const d of [4, 5, 9]) assert.ok(poolAt(d).includes('boneRat'), d);
});

test('next to the hero it bites for 1, with its own rattle', () => {
  const s = at(5, 10), n = wait(s);
  assert.equal(n.health, s.health - 1);
  assert.equal(n.line.id, 'boneRatBite');
  assert.equal(biteSound(n.events), 'rattle');
});

test('hurt, it never flees: it stays and keeps coming, whatever the seed', () => {
  for (let seed = 1; seed <= 20; seed++) {
    const n = step(at(5, 10, seed), 'up');
    assert.equal(n.enemies[0].health, 2);
    assert.ok(!n.enemies[0].flees, 'no fleeing');
    assert.deepEqual(where(n), [[5, 10]]);
  }
});

test('three lantern hits beat it, worth 4', () => {
  let s = at(5, 10);
  for (let i = 0; i < 2; i++) s = step(s, 'up');
  assert.equal(s.enemies[0].health, 1);
  const n = step(s, 'up');
  assert.deepEqual(n.enemies, []);
  assert.equal(n.line.id, 'boneRatDie');
  assert.equal(n.xp, 4);
});
