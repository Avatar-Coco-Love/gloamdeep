// § lure wisp: the way that lures; near the hero it drifts away toward another creature, and never bites (D-649)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, poolAt } from '../src/core/room.js';
import { makeState, wait } from '../src/core/turn.js';
import { nextMoves } from '../src/core/creatureturn.js';
import { traits } from '../src/core/behaviours.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
// The first room, the hero at 5,11 and the creatures given, the lantern full
const at = (enemies) => ({ ...makeState(room, [5, 11], [], []), hero: { x: 5, y: 11 }, enemies, oil: 1 });
const wisp = (x, y) => ({ id: 'lureWisp', x, y });
const steps = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const wispOf = (s) => s.enemies.find((e) => e.id === 'lureWisp');

test('a lure wisp has 1 heart, never bites, lures, glows, flies, and drops Wisp Glass, with no rare one', () => {
  const m = get('lureWisp');
  assert.equal(m.name, 'Lure wisp'); assert.equal(m.health, 1); assert.equal(m.bite, 0);
  assert.deepEqual(m.ways, ['lures']); assert.equal(traits(m).bites, false); assert.equal(traits(m).near, 3);
  assert.ok(m.glows); assert.ok(m.flies);
  assert.equal(m.drops, 'wispGlass'); assert.equal(m.rare, undefined);
  assert.ok(LINES[m.die]); assert.ok(m.acts); assert.ok(m.fights);
  const g = get('wispGlass');
  assert.equal(g.name, 'Wisp Glass'); assert.equal(g.sells, 2); assert.equal(g.max, 20); assert.ok(g.bag);
  for (const id of [g.says, g.look, g.full]) assert.ok(LINES[id], id);
});

test('it joins the pool from depth 4, never leaving, and not before', () => {
  for (const d of [2, 3]) assert.ok(!poolAt(d).includes('lureWisp'), d);
  for (const d of [4, 5, 9]) assert.ok(poolAt(d).includes('lureWisp'), d);
});

test('beside the hero it never bites', () => {
  const s = at([wisp(5, 10)]), n = wait(s);
  assert.equal(n.health, s.health);
  assert.ok(!n.events.some((e) => e.type === 'bite'));
});

test('within 3 steps, alone, it drifts one tile farther from the hero, lit or not', () => {
  for (const lit of [true, false]) {
    const s = { ...at([wisp(5, 9)]), lit }, w = wispOf(wait(s));
    assert.equal(steps(w, s.enemies[0]), 1, `lit ${lit}`);
    assert.ok(steps(w, s.hero) > steps(s.enemies[0], s.hero), `lit ${lit}`);
  }
});

test('farther than 3 steps it stays where it is', () => {
  const s = at([wisp(5, 7)]), w = wispOf(wait(s));
  assert.deepEqual([w.x, w.y], [5, 7]);
});

test('with another creature in the room it drifts toward it, still away from the hero', () => {
  const s = at([wisp(5, 9), { id: 'rat', x: 9, y: 4, asleep: true }]), w = wispOf(wait(s));
  assert.ok(steps(w, s.hero) > steps(s.enemies[0], s.hero));
  assert.ok(steps(w, s.enemies[1]) < steps(s.enemies[0], s.enemies[1]));
});

test('its drift shows as a next move in the light', () => {
  const s = at([wisp(5, 9)]);
  assert.deepEqual(nextMoves(s).map((m) => m.kind), ['step']);
});
