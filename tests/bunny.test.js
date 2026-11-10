// § bunny: the second day creature, the first that means no harm (D-784): 1 heart, never bites,
// `shy`, it hops away from a hero within 3 steps and never toward another creature; Bunny Fur
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, poolAt } from '../src/core/room.js';
import { makeState, wait } from '../src/core/turn.js';
import { traits } from '../src/core/behaviours.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
const at = (enemies) => ({ ...makeState(room, [5, 11], [], []), hero: { x: 5, y: 11 }, enemies, oil: 1 });
const steps = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const of = (s, id) => s.enemies.find((e) => e.id === id);

test('a bunny has 1 heart, never bites, is shy, and drops Bunny Fur, with no rare one', () => {
  const b = get('bunny');
  assert.equal(b.name, 'Bunny'); assert.equal(b.health, 1); assert.equal(b.bite, 0);
  assert.deepEqual(b.ways, ['shy']); assert.equal(traits(b).bites, false); assert.equal(traits(b).near, 3);
  assert.equal(b.drops, 'bunnyFur'); assert.equal(b.rare, undefined);
  assert.ok(LINES[b.die]); assert.ok(b.acts); assert.ok(b.fights);
  const f = get('bunnyFur');
  assert.equal(f.name, 'Bunny Fur'); assert.equal(f.max, 20); assert.equal(f.sells, 1); assert.ok(f.bag);
  for (const id of [f.says, f.look, f.full]) assert.ok(LINES[id], id);
});

test('never underground: in no depth\'s pool', () => {
  for (const d of [1, 2, 5, 9, 20]) assert.ok(!poolAt(d).includes('bunny'), d);
});

test('beside the hero it never bites', () => {
  const s = at([{ id: 'bunny', x: 5, y: 10 }]), n = wait(s);
  assert.equal(n.health, s.health);
  assert.ok(!n.events.some((e) => e.type === 'bite'));
});

test('within 3 steps it hops one tile farther from the hero, lit or not; farther, it stays', () => {
  for (const lit of [true, false]) {
    const s = { ...at([{ id: 'bunny', x: 5, y: 9 }]), lit }, b = of(wait(s), 'bunny');
    assert.equal(steps(b, s.enemies[0]), 1, `lit ${lit}`);
    assert.ok(steps(b, s.hero) > steps(s.enemies[0], s.hero), `lit ${lit}`);
  }
  const far = of(wait(at([{ id: 'bunny', x: 5, y: 7 }])), 'bunny');
  assert.deepEqual([far.x, far.y], [5, 7]);
});

test('with another creature in the room it hops just away, never toward it, as the lure wisp would', () => {
  const rat = { id: 'rat', x: 1, y: 9, asleep: true }; // off to one side
  const alone = of(wait(at([{ id: 'bunny', x: 5, y: 9 }])), 'bunny');
  const near = of(wait(at([{ id: 'bunny', x: 5, y: 9 }, rat])), 'bunny');
  assert.deepEqual([near.x, near.y], [alone.x, alone.y]);
  const wisp = of(wait(at([{ id: 'lureWisp', x: 5, y: 9 }, rat])), 'lureWisp');
  assert.notDeepEqual([wisp.x, wisp.y], [alone.x, alone.y], 'the wisp heads for the rat instead');
});
