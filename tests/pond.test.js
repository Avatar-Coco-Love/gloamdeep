// § pond: a pond at home in the woods, the cave pool's size, from its own seed (D-503)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateWoods, POND_MIN, POND_MAX, POND_IN, POND_CLEAR } from '../src/core/woods.js';
import { mouthOf } from '../src/core/mouth.js';
import { makeRoom, tileAt, placeFor } from '../src/core/room.js';

const SEEDS = Array.from({ length: 300 }, (_, i) => i + 1);
const wet = (map) => map.flatMap((row, y) => [...row].flatMap((ch, x) => (ch === '~' ? [{ x, y }] : [])));
const steps = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

test('the home woods hold one pond of 5 to 9 tiles, in from the edge, clear of the start and the mouth', () => {
  for (const seed of SEEDS) {
    const m = mouthOf(seed), w = generateWoods(seed, m), pond = wet(w.map);
    assert.ok(pond.length >= POND_MIN && pond.length <= POND_MAX, `seed ${seed}: ${pond.length} tiles`);
    for (const t of pond) {
      assert.ok(Math.min(t.x, t.y, w.map[0].length - 1 - t.x, w.map.length - 1 - t.y) >= POND_IN, `seed ${seed}`);
      assert.ok(steps(t, w.start) >= POND_CLEAR && steps(t, m.tile) >= POND_CLEAR, `seed ${seed}`);
      assert.ok(!w.items.some((it) => it.x === t.x && it.y === t.y), `seed ${seed}: a stick in the pond`);
    }
  }
});

test('a pond is one piece and never cuts the woods in two', () => {
  for (const seed of SEEDS) {
    const w = generateWoods(seed, mouthOf(seed)), room = makeRoom(w.map), pond = wet(w.map);
    const seen = new Set([`${pond[0].x},${pond[0].y}`]), queue = [pond[0]];
    while (queue.length) {
      const t = queue.shift();
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const k = `${t.x + dx},${t.y + dy}`;
        if (w.map[t.y + dy]?.[t.x + dx] === '~' && !seen.has(k)) { seen.add(k); queue.push({ x: t.x + dx, y: t.y + dy }); }
      }
    }
    assert.equal(seen.size, pond.length, `seed ${seed}`);
    const open = [];
    for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) if (!tileAt(room, x, y).solid) open.push(`${x},${y}`);
    const reach = new Set([`${w.start.x},${w.start.y}`]), q = [w.start];
    while (q.length) {
      const t = q.shift();
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const n = { x: t.x + dx, y: t.y + dy }, k = `${n.x},${n.y}`;
        if (!tileAt(room, n.x, n.y).solid && !reach.has(k)) { reach.add(k); q.push(n); }
      }
    }
    assert.equal(reach.size, open.length, `seed ${seed}`);
  }
});

test('a seed always makes the same pond', () => {
  for (const seed of SEEDS.slice(0, 50)) assert.deepEqual(generateWoods(seed, mouthOf(seed)), generateWoods(seed, mouthOf(seed)));
  assert.ok(placeFor('woods', 7).map.join('').includes('~'));
});
