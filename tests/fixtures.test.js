// § fixtures: the shared setups new tests use (H-105) are the ones the old tests copied
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeState } from '../src/core/state.js';
import { makeRoom, FIRST_ROOM, tileAt } from '../src/core/room.js';
import { QUICK, sweep, seeds, start, at, walk } from './fixtures.js';

test('start and at give the copied first-room state, with the changes asked', () => {
  const bag = [{ id: 'chest', n: 1 }];
  assert.deepEqual(start({ bag }), { ...makeState(makeRoom(FIRST_ROOM)), bag });
  assert.deepEqual(at(5, 11).hero, { x: 5, y: 11 });
  assert.equal(at(5, 11, start({ bag })).bag, bag);
});

test('a sweep is every seed, or a tenth of them, at least 10, in a quick run (H-103)', () => {
  assert.equal(sweep(300), QUICK ? 30 : 300);
  assert.equal(sweep(60), QUICK ? 10 : 60);
  assert.equal(sweep(5), 5);
  assert.deepEqual(seeds(3), [1, 2, 3]);
});

test('walk reaches every open tile from the start, and none through a wall', () => {
  const room = makeRoom(FIRST_ROOM), s = start();
  const seen = walk(room, s.hero, (x, y) => !tileAt(room, x, y).solid);
  assert.ok(seen.has(`${s.hero.x},${s.hero.y}`));
  for (const k of seen) { const [x, y] = k.split(',').map(Number); assert.ok(!tileAt(room, x, y).solid, k); }
});
