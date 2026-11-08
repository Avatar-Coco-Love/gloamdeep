// § spitGrub: biome 1's 16th kind (D-659, D-688): it never moves, glows, and spits a glob at the
// lit lantern down a clear row or column, up to 5 tiles; the glob flies a tile a turn (spit.js)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, poolAt } from '../src/core/room.js';
import { makeState, wait, step, nextMoves, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
import { traits } from '../src/core/behaviours.js';

const room = makeRoom(FIRST_ROOM); // walls at 3,9 and 7,9; columns 1 to 9 and rows 1 to 11 open around the hero
// The first room, the hero at 5,11 and the creatures given
const at = (enemies, more = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies, ...more });
const grub = (x, y) => ({ id: 'spitGrub', x, y });
const waits = (s, n) => { for (let i = 0; i < n; i++) s = wait(s); return s; };

test('a spit grub has 1 heart, spits for 1, never bites, glows, and drops a Grub Skin or rarely a Glow Gland', () => {
  const m = get('spitGrub');
  assert.equal(m.name, 'Spit grub'); assert.equal(m.health, 1); assert.equal(m.bite, 1);
  assert.deepEqual(m.ways, ['spits']); assert.ok(m.glows); assert.ok(!m.flies);
  assert.deepEqual(traits(m).spits, { range: 5, rest: 2 }); assert.equal(traits(m).bites, false);
  assert.equal(m.drops, 'grubSkin'); assert.equal(m.rare, 'glowGland');
  for (const id of [m.die, m.spitsSay, m.hitSay]) assert.ok(LINES[id], id);
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

test('down a clear column it spits: the glob flies a tile a turn and hits the hero who stays, for 1', () => {
  let s = wait(at([grub(5, 7)]));
  assert.deepEqual(s.globs, [{ x: 5, y: 8, dx: 0, dy: 1, id: 'spitGrub' }]);
  assert.equal(s.line.id, 'spitGrubSpits'); assert.equal(s.enemies[0].rests, 2);
  assert.ok(s.events.some((e) => e.type === 'spit'));
  s = wait(s); assert.deepEqual(s.globs.map((g) => g.y), [9]);
  s = wait(s); assert.deepEqual(s.globs.map((g) => g.y), [10]);
  const hp = s.health; s = wait(s);
  assert.equal(s.health, hp - 1); assert.equal(s.line.id, 'spitGrubHit'); // the hit, then a new spit, rested: the hit's line stays
  assert.ok(s.events.some((e) => e.type === 'bite' && e.id === 'spitGrub' && e.hurt === 1));
  assert.deepEqual(s.globs, [{ x: 5, y: 8, dx: 0, dy: 1, id: 'spitGrub' }]);
  assert.deepEqual([s.enemies[0].x, s.enemies[0].y], [5, 7]); // it never moves
});

test('it rests 2 turns after a spit', () => {
  const s = at([grub(5, 7)]), turns = [1, 2, 3, 4].map((n) => waits(s, n));
  assert.deepEqual(turns.map((t) => t.events.some((e) => e.type === 'spit')), [true, false, false, true]);
});

test('a step out of the line lets the glob fly past, out through the gap and away', () => {
  let s = step(wait(at([grub(5, 7)])), 'left');
  const hp = s.health;
  s = waits(s, 4);
  assert.equal(s.health, hp); assert.deepEqual(s.globs, []);
});

test('beside it with the lantern lit, the glob hits at once', () => {
  const s = at([grub(5, 10)]), n = wait(s);
  assert.equal(n.health, s.health - 1); assert.equal(n.line.id, 'spitGrubHit'); assert.deepEqual(n.globs, []);
});

test('with the lantern off it sees nothing: no spit, beside it or down the line, and no bite', () => {
  for (const g of [grub(5, 10), grub(5, 7)]) {
    const s = at([g], { lit: false }), n = waits(s, 3);
    assert.equal(n.health, s.health); assert.deepEqual(n.globs, []);
  }
});

test('5 tiles off it spits, 6 off it does not, and not across a row and column both', () => {
  assert.equal(wait(at([grub(5, 6)])).globs.length, 1);
  assert.equal(wait(at([grub(5, 5)])).globs.length, 0);
  assert.equal(wait(at([grub(4, 8)])).globs.length, 0);
});

test('a wall between stops its sight, and a glob breaks on one', () => {
  assert.equal(wait({ ...at([grub(3, 7)]), hero: { x: 3, y: 11 } }).globs.length, 0); // the wall at 3,9
  const s = wait({ ...at([grub(5, 11)]), hero: { x: 9, y: 11 } }); // spat right, down row 11
  const n = waits(step(s, 'up'), 4);
  assert.deepEqual(n.globs, []); assert.ok(n.health === s.health);
});

test('it turns to face the way it spits', () => {
  assert.equal(wait({ ...at([grub(1, 11)]) }).enemies[0].facing, 'right');
  assert.equal(wait({ ...at([grub(9, 11)]) }).enemies[0].facing, 'left');
});

test('a glob hurts a creature in its path, as a blow would', () => {
  const s = waits(at([grub(5, 7), { id: 'snapcap', x: 5, y: 9 }]), 2);
  assert.equal(s.enemies.find((e) => e.id === 'snapcap').health, get('snapcap').health - 1);
  assert.deepEqual(s.globs, []);
});

test('walking onto a glob is hit by it', () => {
  let s = wait(at([grub(1, 11)])); // a glob at 2,11, flying right
  s = step(s, 'up'); // out of the row; the glob flies to 3,11
  s = step(s, 'down'); // back at 5,11: the glob flies on to 4,11 and the grub spits no more yet
  assert.deepEqual(s.globs.map((g) => g.x), [4]);
  const hp = s.health; s = step(s, 'left'); // onto it
  assert.equal(s.health, hp - 1);
});

test('a fall clears the globs', () => {
  const s = wait(at([grub(5, 10), grub(5, 6)], { health: 1 }));
  assert.ok(s.events.some((e) => e.type === 'fall')); assert.deepEqual(s.globs, []);
});

test('its next move shows: a glob mark toward the hero, none while it rests', () => {
  const s = at([grub(5, 9)]);
  assert.deepEqual(nextMoves(s).map(({ kind, dx, dy }) => ({ kind, dx, dy })), [{ kind: 'spit', dx: 0, dy: 1 }]);
  assert.deepEqual(nextMoves(step(wait(s), 'left')).filter((m) => m.kind === 'spit'), []);
});
