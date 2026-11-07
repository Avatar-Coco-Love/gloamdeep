// § the dead-end cache: 2 or 3 extra finds grouped in a dead end's far corner (D-650)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeFor } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';
import { CACHE_COUNT, CACHE_FINDS } from '../src/core/cache.js';

const near = (a, b) => Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));

test('a dead end is a side room with one opening, never the stairs rooms', () => {
  let ends = 0;
  for (let seed = 1; seed <= 40; seed++) for (const depth of [2, 5, 8]) {
    const { cells } = layoutAt(seed, depth);
    for (const c of cells) {
      assert.equal(c.end, !c.up && !c.down && c.doors.length === 1, `seed ${seed} ${c.id}`);
      ends += c.end ? 1 : 0;
    }
  }
  assert.ok(ends > 100, `only ${ends} dead ends`);
});

test('every dead end holds a cache of 2 or 3 finds, close together, left once; other rooms none', () => {
  for (let seed = 1; seed <= 25; seed++) for (const depth of [2, 3, 4, 6, 8, 9]) for (const c of layoutAt(seed, depth).cells) {
    const p = placeFor(c.id, seed), at = `seed ${seed} ${c.id}`, cache = p.items.filter((i) => i.once);
    if (!c.end) { assert.equal(cache.length, 0, at); continue; }
    assert.ok(cache.length >= CACHE_COUNT[0] && cache.length <= CACHE_COUNT[1], `${at} ${cache.length}`);
    for (const f of cache) {
      assert.ok(CACHE_FINDS.includes(f.id), at);
      assert.equal(p.map[f.y][f.x], '.', `${at} not on floor`);
      for (const g of cache) assert.ok(near(f, g) <= 4, `${at} spread out`);
    }
    const spots = [p.start, ...p.items, ...p.enemies, ...p.people].map(({ x, y }) => `${x},${y}`);
    assert.equal(new Set(spots).size, spots.length, `${at} two on one tile`);
  }
});

test('a room is the same each time it is made', () => {
  const c = layoutAt(7, 3).cells.find((x) => x.end);
  assert.deepEqual(placeFor(c.id, 7).items, placeFor(c.id, 7).items);
});
