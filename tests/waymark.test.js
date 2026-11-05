// § waymark: the floor's stairs down shown on the map while the boon is held (D-601)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { floorPlan, stairsIn, markAt } from '../src/core/map.js';
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
