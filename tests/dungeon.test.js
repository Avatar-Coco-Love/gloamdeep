// § dungeon: from depth 8 each room is halls, in the crypt's bricks (D-228); the
// floor's layout is checked in region.test.js (D-645)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateRoom } from '../src/core/cave.js';
import { unguardedOf } from '../src/core/unguarded.js';
import { layoutAt } from '../src/core/region.js';
import { kindAt, placeFor, placeBeside, poolAt } from '../src/core/room.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);
const count = (map, ch) => map.join('').split(ch).length - 1;

test('from depth 8 every depth is dungeon halls in the crypt look', () => {
  assert.deepEqual([8, 9, 40].map((d) => kindAt(d)), Array(3).fill({ from: 8, shape: 'halls', look: 'dungeon', area: 'DUNGEON' }));
  assert.equal(kindAt(7).shape, 'burrows');
  assert.equal(placeFor('depth8', 4127).look, 'dungeon');
});

test('every dungeon room is made, not the fallback, and the stairs line up from the warrens', () => {
  const where = (map, ch) => { const y = map.findIndex((row) => row.includes(ch)); return { x: map[y].indexOf(ch), y }; };
  for (const seed of SEEDS.slice(0, 20)) {
    for (const depth of [8, 9]) for (const c of layoutAt(seed, depth).cells) {
      const p = placeFor(c.id, seed);
      assert.deepEqual([p.map[0].length, p.map.length], [c.cols, c.rows], `seed ${seed} ${c.id}`); // 13 × 15 cells, a seam between two (D-645)
      assert.equal(count(p.map, '<'), c.up ? 1 : 0);
      assert.equal(count(p.map, '>'), c.down ? 1 : 0);
      const ids = p.enemies.map((e) => e.id);
      if (!unguardedOf(c.seed, 1)[0]) assert.equal(ids[0], 'rat'); assert.ok(ids.every((id) => poolAt(depth).includes(id))); // the mix (D-534), the first guard moved when its flask is unguarded (D-725)
    }
    const above = layoutAt(seed, 7).cells.find((c) => c.down), up = layoutAt(seed, 8).cells.find((c) => c.up);
    assert.deepEqual({ x: up.x, y: up.y }, { x: above.x, y: above.y });
    assert.deepEqual(where(placeFor(up.id, seed).map, '<'), where(placeFor(above.id, seed).map, '>'));
    assert.equal(placeBeside(up.id, 'up', seed), above.id);
  }
});

test('halls: every seed gives one, the same each time, with the usual contents', () => {
  for (let seed = 1; seed <= 300; seed++) {
    const h = generateRoom(seed, 'halls');
    assert.ok(h, `seed ${seed}`);
    assert.deepEqual(h, generateRoom(seed, 'halls'));
    assert.equal(count(h.map, '<'), 1);
    assert.equal(count(h.map, '>'), 1);
    assert.ok(count(h.map, '.') + 2 >= 107, `seed ${seed} is too small`);
    assert.equal(h.lights.length, 1);
  }
});
