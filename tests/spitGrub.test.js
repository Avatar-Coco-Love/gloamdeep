// § spitGrub: biome 1's 16th kind, step 1 of 2 (D-659, D-688): it never moves, glows, and hurts
// whoever stands beside it; its spit down a row or column is the next step
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, poolAt } from '../src/core/room.js';
import { makeState, wait, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
// The first room, the hero at 5,11 and the creatures given
const at = (enemies) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies });
const grub = (x, y) => ({ id: 'spitGrub', x, y });

test('a spit grub has 1 heart, a hurt of 1, no way, glows, and drops a Grub Skin or rarely a Glow Gland', () => {
  const m = get('spitGrub');
  assert.equal(m.name, 'Spit grub'); assert.equal(m.health, 1); assert.equal(m.bite, 1);
  assert.deepEqual(m.ways, []); assert.ok(m.glows); assert.ok(!m.flies);
  assert.equal(m.drops, 'grubSkin'); assert.equal(m.rare, 'glowGland');
  for (const id of [m.die, m.bites]) assert.ok(LINES[id], id);
  assert.ok(m.acts && m.fights);
});

test('its Grub Skin sells for 1 and its rare Glow Gland for 5, 20 a stack, each with its lines', () => {
  const skin = get('grubSkin'), gland = get('glowGland');
  assert.equal(skin.name, 'Grub Skin'); assert.equal(skin.sells, 1); assert.equal(skin.max, 20);
  assert.equal(gland.name, 'Glow Gland'); assert.equal(gland.sells, 5); assert.equal(gland.max, 20);
  for (const id of ['grubSkinTake', 'grubSkinLook', 'grubSkinFull', 'glowGlandTake', 'glowGlandLook', 'glowGlandFull']) assert.ok(LINES[id], id);
});

test('it joins the pool from depth 4, never leaving, and not before', () => {
  for (const d of [2, 3]) assert.ok(!poolAt(d).includes('spitGrub'), d);
  for (const d of [4, 5, 9]) assert.ok(poolAt(d).includes('spitGrub'), d);
});

test('it never moves, near the hero or far', () => {
  for (const [x, y] of [[5, 7], [2, 11], [5, 10]]) {
    let s = at([grub(x, y)]);
    for (let i = 0; i < 4; i++) s = wait(s);
    assert.deepEqual([s.enemies[0].x, s.enemies[0].y], [x, y]);
  }
});

test('beside the hero it takes a heart with its line; two tiles off, nothing', () => {
  const s = at([grub(5, 10)]), n = wait(s);
  assert.equal(n.health, s.health - 1); assert.equal(n.line.id, 'spitGrubBite');
  const f = at([grub(5, 9)]), m = wait(f);
  assert.equal(m.health, f.health);
});
