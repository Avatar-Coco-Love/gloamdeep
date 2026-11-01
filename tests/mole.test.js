// § mole: chases and never flees, 4 hearts (step 0.3.10, D-365, D-541, D-542)
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

test('a mole has 4 health and a bite of 1, only chases, and drops Mole Fur and Mole Claw', () => {
  const m = get('mole');
  assert.equal(m.name, 'Mole'); assert.equal(m.health, 4); assert.equal(m.bite, 1);
  assert.deepEqual(m.ways, ['chases']);
  assert.equal(m.drops, 'moleFur'); assert.equal(m.rare, 'moleClaw');
  for (const id of [m.hurt, m.die, m.bites]) assert.ok(LINES[id], id);
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
