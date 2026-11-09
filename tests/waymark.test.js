// § waymark: the floor's stairs down shown on the map while the boon is held (D-601)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { floorPlan, stairsIn, markAt, rimDot, aroundHero } from '../src/core/map.js';
import { makeWorld } from '../src/core/turn.js';
import { goToDepth, goToPlace } from '../src/core/stairs.js';
import { downPlaceIn } from '../src/core/region.js';
import { offerable } from '../src/core/boon.js';
import { BOONS } from '../src/core/registry.js';

const held = (s) => ({ ...s, boon: 'waymark' });
// Where the floor's stairs down are, from the map revealed
const truth = (s) => {
  const p = floorPlan(s, true), id = p.rooms.find((r) => stairsIn(p, r.id, 'stairsDown'))?.id;
  return stairsIn(p, id, 'stairsDown');
};

test('waymark: built and offered', () => {
  assert.equal(BOONS.waymark.stairs, true);
  assert.ok(!BOONS.waymark.soon);
  assert.ok(offerable().some((b) => b.id === 'waymark'));
});

test('waymark: without it, no marks; with the map revealed, none either', () => {
  const s = goToDepth(makeWorld('first', 7), 2);
  assert.deepEqual(floorPlan(s).waymarks, []);
  assert.deepEqual(floorPlan(held(s), true).waymarks, []);
});

test('waymark: on arriving, the stairs down show in a room not yet entered, at every kind of floor', () => {
  for (const seed of [1, 7, 42, 1234]) for (const depth of [2, 3, 5, 6, 8, 9]) {
    const s = goToDepth(makeWorld('first', seed), depth), p = floorPlan(held(s));
    assert.notEqual(downPlaceIn(seed, depth), s.place, 'in another room than the stairs up');
    assert.ok(!p.rooms.some((r) => r.id === downPlaceIn(seed, depth)), 'that room is still unknown');
    assert.deepEqual(p.waymarks, [truth(s)], `seed ${seed}, depth ${depth}`);
  }
});

test('waymark: nothing written into the memory; the rooms shown are the same as without', () => {
  const s = goToDepth(makeWorld('first', 7), 3), before = s.seen.slice();
  const p = floorPlan(held(s));
  assert.deepEqual(s.seen, before);
  assert.deepEqual(p.rooms, floorPlan(s).rooms);
});

test('waymark: stairs already remembered show as found stairs, not as a mark', () => {
  const s = goToPlace(goToDepth(makeWorld('first', 7), 2), downPlaceIn(7, 2));
  assert.equal(floorPlan(held(s)).waymarks.length, 1, 'not seen yet');
  const lit = { ...s, seen: s.seen.slice().fill(1) }, p = floorPlan(held(lit)), at = truth(lit);
  assert.deepEqual(p.waymarks, []);
  const r = p.rooms.find((m) => m.id === lit.place);
  assert.equal(markAt(r.room, r.seen, at.x - r.x, at.y - r.y), 'stairs');
});

test('waymark: the crypt shows its way down too', () => {
  const s = makeWorld('first', 7), p = floorPlan(held(s));
  assert.deepEqual(p.waymarks, [stairsIn(p, 'first', 'stairsDown')]);
});

// § rim: Waymark's dot on the round map's rim (D-754)
const N = 52, K = 3; // the round map's canvas and its pixels a tile (input/mapbutton.js)
const plan = (hero, downs) => ({ cols: 99, rows: 99, hero, downs });
const inside = (d) => Math.hypot(d.x + K / 2 - N / 2, d.y + K / 2 - N / 2) + K * Math.SQRT1_2 <= N / 2;

test('waymark rim: none without the boon, none when the stairs fit on the round map', () => {
  assert.equal(rimDot(plan({ x: 20, y: 20 }, []), N, K), null);
  assert.equal(rimDot(plan(null, [{ x: 40, y: 20 }]), N, K), null, 'on another floor');
  assert.equal(rimDot(plan({ x: 20, y: 20 }, [{ x: 26, y: 20 }]), N, K), null, '6 tiles off still shows');
  assert.deepEqual(floorPlan(goToDepth(makeWorld('first', 7), 2)).downs, []);
});

test('waymark rim: a dot inside the glass, toward the nearest stairs, found or not', () => {
  for (const [dx, dy] of [[30, 0], [-30, 0], [0, 30], [0, -30], [20, 20], [-15, 25], [9, 0]]) {
    const hero = { x: 50, y: 50 }, d = rimDot(plan(hero, [{ x: 50 + dx, y: 50 + dy }, { x: 50 - 2 * dx, y: 50 - 2 * dy }]), N, K);
    assert.ok(d && inside(d), `${dx},${dy} inside`);
    const ux = d.x + K / 2 - N / 2, uy = d.y + K / 2 - N / 2;
    assert.ok(ux * dx + uy * dy > 0.95 * Math.hypot(ux, uy) * Math.hypot(dx, dy), `${dx},${dy} pointing the nearer way`);
  }
});

test('waymark rim: the plan keeps every stairs down while held, found ones too', () => {
  const s = goToPlace(goToDepth(makeWorld('first', 7), 2), downPlaceIn(7, 2));
  const lit = { ...s, seen: s.seen.slice().fill(1) }, p = floorPlan(held(lit));
  assert.deepEqual(p.downs, [truth(lit)]);
  assert.ok(aroundHero(p, N, K));
});
