// § lampmoth: the creature drawn to light (D-351, D-356)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, lampmothRooms, gloamlingRooms } from '../src/core/room.js';
import { makeState, step, wait, switchLantern, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);

const room = makeRoom(FIRST_ROOM);
const torch44 = FIRST_LIGHTS.filter((l) => l.x === 4 && l.y === 4);
// The first room with the given lights, the hero at 5,11 and one lampmoth
const at = (x, y, lights = []) => ({ ...makeState(room, FIRST_START, lights, []), hero: { x: 5, y: 11 }, enemies: [{ id: 'lampmoth', x, y }] });
const where = (s) => s.enemies.map(({ x, y }) => [x, y]);

test('a lampmoth has 1 health and a bite of 1, and seeks light', () => {
  const m = get('lampmoth');
  assert.equal(m.name, 'Lampmoth'); assert.equal(m.health, 1); assert.equal(m.bite, 1);
  assert.deepEqual(m.ways, ['seeksLight']);
  for (const id of [m.die, m.bites]) assert.ok(LINES[id], id);
});

test('while the lantern is lit it comes for the hero from anywhere, with no line to them', () => {
  const s = at(9, 1); // far off, in the dark, round a corner
  assert.deepEqual(where(wait(s)), [[9, 2]]);
});

test('next to the hero it bites for 1', () => {
  const n = wait(at(5, 10));
  assert.equal(n.health, 4);
  assert.equal(n.line.id, 'lampmothBite');
});

test('with the lantern off it heads for the nearest lit torch, not the hero', () => {
  const s = switchLantern(at(4, 9, torch44));
  assert.deepEqual(where(wait(s)), [[4, 8]]);
});

test('by the torch it stays', () => {
  const s = switchLantern(at(4, 5, torch44));
  assert.deepEqual(where(wait(s)), [[4, 5]]);
});

test('with the lantern off and no torch lit it stays', () => {
  const s = switchLantern(at(5, 7, FIRST_LIGHTS.filter((l) => l.id === 'unlitTorch')));
  assert.deepEqual(where(wait(s)), [[5, 7]]);
});

test('one lantern hit kills it', () => {
  const n = step(at(5, 10), 'up');
  assert.deepEqual(n.enemies, []);
  assert.equal(n.line.id, 'lampmothDie');
});

test('one room a floor holds a lampmoth on depths 2 to 4, none above or below', () => {
  for (const seed of SEEDS) {
    for (const d of [2, 3, 4]) assert.equal(lampmothRooms(seed, d).length, 1, `seed ${seed}, depth ${d}`);
    for (const d of [0, 1, 5, 8]) assert.deepEqual(lampmothRooms(seed, d), []);
    assert.deepEqual(gloamlingRooms(seed, 3), []);
  }
});
