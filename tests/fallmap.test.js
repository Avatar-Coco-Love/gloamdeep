// § fall map: a fall on a floor of several rooms, and the round map drawn from the fall's picture (D-557)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld, wait, fallView } from '../src/core/turn.js';
import { goToDepth } from '../src/core/stairs.js';
import { floorPlan } from '../src/core/map.js';

// Depth 6, the hero at 1 heart with a rat beside them, then a wait: the rat bites and the hero falls
function fallDeep() {
  const s = goToDepth(makeWorld('first', 7), 6);
  const before = { ...s, health: 1, enemies: [{ id: 'rat', x: s.hero.x + 1, y: s.hero.y, chasing: true }] };
  return { before, after: wait(before) };
}

test('the fall at depth 6 wakes the hero at home, the fall kept in `fell`', () => {
  const { before, after } = fallDeep();
  assert.equal(after.fell.place, before.place);
  assert.notEqual(after.place, before.place);
});

test('the fall view keeps the room where the hero fell and the world as it was', () => {
  const { before, after } = fallDeep(), v = fallView(before, after);
  assert.equal(v.place, before.place);
  assert.equal(v.elsewhere, before.elsewhere);
});

test('the round map draws the floor from the fall view, where the bare picture broke it (the freeze)', () => {
  const { before, after } = fallDeep();
  assert.throws(() => floorPlan(after.fell)); // the bug: no other rooms to read
  const p = floorPlan(fallView(before, after));
  assert.equal(p.depth, 6);
  assert.ok(p.rooms.some((r) => r.id === before.place));
});
