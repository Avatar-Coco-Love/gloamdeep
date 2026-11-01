// § scorpion: the creature with the hard sting (D-370)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, placeFor } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';
import { makeState, step, wait, FIRST_START } from '../src/core/turn.js';
import { biteSound } from '../src/core/enemies.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);

const room = makeRoom(FIRST_ROOM);
// The first room, lit, the hero at 5,11 and one scorpion
const at = (x, y) => ({ ...makeState(room, FIRST_START, FIRST_LIGHTS, []), hero: { x: 5, y: 11 }, enemies: [{ id: 'scorpion', x, y }] });

test('a scorpion has 1 health and a bite of 2, and chases', () => {
  const m = get('scorpion');
  assert.equal(m.name, 'Scorpion'); assert.equal(m.health, 1); assert.equal(m.bite, 2);
  assert.deepEqual(m.ways, ['chases']);
  for (const id of [m.die, m.bites]) assert.ok(LINES[id], id);
});

test('next to the hero it stings for 2, with its own sound', () => {
  const n = wait(at(5, 10));
  assert.equal(n.health, 3);
  assert.equal(n.line.id, 'scorpionBite');
  assert.equal(biteSound(n.events), 'sting');
});

test('in the lantern light it comes for the hero', () => {
  assert.deepEqual(wait(at(5, 8)).enemies.map(({ x, y }) => [x, y]), [[5, 9]]);
});

test('one lantern hit kills it, worth 3', () => {
  const n = step(at(5, 10), 'up');
  assert.deepEqual(n.enemies, []);
  assert.equal(n.line.id, 'scorpionDie');
  assert.equal(n.xp, 3);
});

test('each scorpion a room lays out wears one of its 5 colour sets, the same for the same seed (D-373)', () => {
  const seen = new Set();
  for (const seed of SEEDS) {
    const id = layoutAt(seed, 3).cells.map((c) => c.id).find((c) => placeFor(c, seed).enemies.some((e) => e.id === 'scorpion'));
    if (!id) continue;
    const s = placeFor(id, seed).enemies.find((e) => e.id === 'scorpion');
    assert.ok(Number.isInteger(s.colour) && s.colour >= 0 && s.colour < get('scorpion').colours, `seed ${seed}`);
    assert.equal(placeFor(id, seed).enemies.find((e) => e.id === 'scorpion').colour, s.colour);
    seen.add(s.colour);
  }
  assert.equal(seen.size, 5, 'every set turns up');
});

test('a rat or lampmoth wears no colour set', () => {
  for (const seed of SEEDS.slice(0, 10)) for (const c of layoutAt(seed, 3).cells) {
    for (const e of placeFor(c.id, seed).enemies) if (e.id !== 'scorpion') assert.equal(e.colour, undefined);
  }
});

test('a scorpion keeps its colour as it moves', () => {
  const s = { ...at(5, 8), enemies: [{ id: 'scorpion', x: 5, y: 8, colour: 3 }] };
  assert.equal(wait(s).enemies[0].colour, 3);
});
