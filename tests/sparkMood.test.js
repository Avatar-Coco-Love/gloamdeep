// § sparkMood (D-1025): the spark speaks in light. It cools near a creature of the gloam, seen or
// not, and warms a little the deeper it goes, toward the First Light
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sparkMood, CHILL_REACH, FIRST_LIGHT_DEPTH } from '../src/core/spark.js';
import { get } from '../src/core/registry.js';

const at = (enemies, place = 'first') => sparkMood({ hero: { x: 5, y: 5 }, enemies, place });

test('the gloamling and the Lampeater are of the gloam; a rat is not', () => {
  assert.deepEqual(['gloamling', 'lampeater', 'rat'].map((id) => !!get(id).gloam), [true, true, false]);
});

test('chill: full within a tile, fading out past the reach, the nearest counting', () => {
  assert.equal(at([]).chill, 0);
  assert.equal(at([{ id: 'gloamling', x: 6, y: 5 }]).chill, 1);
  assert.ok(Math.abs(at([{ id: 'gloamling', x: 6, y: 6 }]).chill - (1 - (Math.SQRT2 - 1) / CHILL_REACH)) < 1e-9);
  assert.equal(at([{ id: 'gloamling', x: 5 + CHILL_REACH + 1, y: 5 }]).chill, 0);
  assert.equal(at([{ id: 'rat', x: 6, y: 5 }]).chill, 0);
  assert.equal(at([{ id: 'gloamling', x: 9, y: 5 }, { id: 'lampeater', x: 5, y: 7 }]).chill, 2 / 3);
});

test('warmth: none on the surface or in the crypt, growing with depth to the First Light', () => {
  for (const place of ['first', 'woods', 'south']) assert.equal(at([], place).warmth, 0, place);
  assert.equal(at([], 'second').warmth, 1 / FIRST_LIGHT_DEPTH);
  assert.equal(at([], 'depth8').warmth, 8 / FIRST_LIGHT_DEPTH);
  assert.equal(at([], `depth${FIRST_LIGHT_DEPTH}`).warmth, 1);
});
