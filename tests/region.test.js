// § region: each depth a grid of one-cell rooms joined by openings (D-201, D-645),
// their stairs lined up floor to floor (D-202, D-203)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { layoutAt, sizeAt } from '../src/core/region.js';
import { seedFor } from '../src/core/rng.js';
import { placeFor, placeBeside, tileAt, depthOf, poolAt } from '../src/core/room.js';
import { makeWorld, step } from '../src/core/turn.js';
import { goToDepth } from '../src/core/stairs.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);
// The edge tile of an opening `at` along side `dir`, in a room `c.cols` × `c.rows` (D-580)
const EDGE = { up: (at) => ({ x: at, y: 0 }), down: (at, c) => ({ x: at, y: c.rows - 1 }), left: (at) => ({ x: 0, y: at }), right: (at, c) => ({ x: c.cols - 1, y: at }) };
const BACK = { up: 'down', down: 'up', left: 'right', right: 'left' };

// The rooms reachable from `start` through the openings, with how many joins away each is
function away(cells, start) {
  const out = new Map([[start.id, 0]]), todo = [start];
  while (todo.length) {
    const c = todo.shift();
    for (const id of Object.values(c.sides)) if (!out.has(id)) { out.set(id, out.get(c.id) + 1); todo.push(cells.find((x) => x.id === id)); }
  }
  return out;
}

// § the floors (D-645): rooms on each band's grid, the way 3 or 4 rooms long, side rooms
// grown off it with no loops but depth 8's two, which never shorten the way
const BANDS = [[[2, 3, 4], 4, 6, 8, 0], [[5, 6, 7], 5, 9, 11, 0], [[8, 9, 12], 5, 11, 13, 2]];
test('each floor has the band\'s rooms on its grid, every room reached, the stairs down 3 or 4 rooms along (D-645)', () => {
  for (const [depths, size, least, most, loops] of BANDS) {
    const counts = new Set(), ways = new Set();
    for (const seed of SEEDS) for (const depth of depths) {
      const { cells } = layoutAt(seed, depth), up = cells.find((c) => c.up), down = cells.find((c) => c.down);
      assert.ok(cells.length >= least && cells.length <= most, `seed ${seed} depth ${depth}: ${cells.length}`);
      counts.add(cells.length);
      assert.ok(cells.every((c) => c.x >= 0 && c.y >= 0 && c.x < size && c.y < size));
      assert.equal(new Set(cells.map((c) => `${c.x},${c.y}`)).size, cells.length);
      assert.equal(cells.reduce((n, c) => n + c.doors.length, 0), 2 * (cells.length - 1 + loops)); // a tree, plus the loops
      const steps = away(cells, up);
      assert.equal(steps.size, cells.length, `seed ${seed} depth ${depth}: every room reached`);
      assert.ok([2, 3].includes(steps.get(down.id)), `seed ${seed} depth ${depth}`); // 3 or 4 rooms, both ends counted
      ways.add(steps.get(down.id));
      assert.equal(cells.filter((c) => c.up).length, 1);
      assert.equal(cells.filter((c) => c.down).length, 1);
      assert.equal(up.id, `depth${depth}`);
    }
    assert.equal(counts.size, most - least + 1, 'every count turns up');
    assert.equal(ways.size, 2, 'ways of 3 and of 4 both turn up');
  }
  assert.equal(layoutAt(1, 1), null);
});

test('every room is made, not the fallback, with its stairs and contents', () => {
  for (const seed of SEEDS.slice(0, 20)) for (const depth of [2, 5, 6, 8]) for (const c of layoutAt(seed, depth).cells) {
    const p = placeFor(c.id, seed), all = p.map.join(''), { cols, rows } = sizeAt(depth);
    assert.deepEqual([p.map[0].length, p.map.length], [cols, rows], `seed ${seed} ${c.id}`);
    assert.equal(all.includes('<'), !!c.up);
    assert.equal(all.includes('>'), !!c.down);
    const ids = p.enemies.map((e) => e.id).filter((id) => id !== 'flaskMimic');
    assert.equal(ids[0], 'rat'); assert.ok(ids.every((id) => poolAt(depth).includes(id))); // the mix (D-534)
  }
});

test('a room is one cell: 11 × 13 on depths 2 to 7, 13 × 15 from 8 (D-645)', () => {
  const want = { 2: [11, 13], 4: [11, 13], 5: [11, 13], 7: [11, 13], 8: [13, 15], 9: [13, 15] };
  for (const [depth, [cols, rows]] of Object.entries(want)) {
    assert.deepEqual(sizeAt(+depth), { cols, rows });
    for (const seed of SEEDS.slice(0, 5)) for (const c of layoutAt(seed, +depth).cells) assert.deepEqual([c.cols, c.rows], [cols, rows]);
  }
});

test('the rooms keep open floor in step with their area: at least 45 open tiles in an 11 × 13 room (D-147, D-645)', () => {
  for (const seed of SEEDS.slice(0, 20)) for (const depth of [2, 4, 5, 7]) for (const c of layoutAt(seed, depth).cells) {
    const open = placeFor(c.id, seed).map.join('').replace(/#/g, '').length;
    assert.ok(open >= 45, `seed ${seed} ${c.id}: ${open}`);
  }
});

test('stairs down lead to stairs up in the same cell, at the same tile, one floor down', () => {
  const where = (map, ch) => { const y = map.findIndex((row) => row.includes(ch)); return { x: map[y].indexOf(ch), y }; };
  for (const seed of SEEDS.slice(0, 20)) {
    let above = where(placeFor('second', seed).map, '>'), cell = null;
    for (let depth = 2; depth <= 8; depth++) { // across both changes of size (D-580)
      const L = layoutAt(seed, depth), up = L.cells.find((c) => c.up), down = L.cells.find((c) => c.down);
      assert.deepEqual(where(placeFor(up.id, seed).map, '<'), above, `seed ${seed} depth ${depth}`);
      if (cell) assert.deepEqual({ x: up.x, y: up.y }, cell);
      above = where(placeFor(down.id, seed).map, '>'); cell = { x: down.x, y: down.y };
      assert.equal(placeBeside(up.id, 'up', seed), depth === 2 ? 'second' : layoutAt(seed, depth - 1).cells.find((c) => c.down).id);
      assert.equal(placeBeside(down.id, 'down', seed), `depth${depth + 1}`);
    }
  }
});

test('every opening is open on both sides, at the same spot', () => {
  for (const seed of SEEDS) for (const depth of [2, 5]) for (const c of layoutAt(seed, depth).cells) {
    const room = placeFor(c.id, seed);
    assert.equal(depthOf(c.id), depth);
    for (const d of c.doors) {
      const p = EDGE[d.dir](d.at, c), there = placeFor(c.sides[d.dir], seed), q = EDGE[BACK[d.dir]](d.at, c);
      assert.equal(room.map[p.y][p.x], '.', `seed ${seed} ${c.id} ${d.dir}`);
      assert.equal(there.map[q.y][q.x], '.');
    }
  }
});

test('stairs up and their torch, and stairs down, each in one room; each room has a flask, a rat by it and a herb; the creatures mixed (D-534)', () => {
  for (const seed of SEEDS) for (const c of layoutAt(seed, 2).cells) {
    const p = placeFor(c.id, seed), all = p.map.join('');
    assert.equal(all.includes('<'), !!c.up);
    assert.equal(all.includes('>'), !!c.down);
    assert.equal(p.lights.length, c.up ? 1 : 0);
    assert.deepEqual(p.items.map((it) => it.id).filter((id) => id !== 'heartcap'), c.up ? ['flask', 'herb', 'knife', 'oilcap'] : ['flask', 'herb', 'oilcap']); // an oilcap in each (D-296) // the knife by the stairs up (D-252)
    const ids = p.enemies.map((e) => e.id);
    assert.equal(ids[0], 'rat'); assert.ok(ids.every((id) => poolAt(2).includes(id)));
  }
});

test('walking out through an opening and back: the room beyond, then the same room as left', () => {
  const s = goToDepth(makeWorld(), 2), c = layoutAt(s.seed, 2).cells.find((x) => x.up), d = c.doors[0];
  const at = EDGE[d.dir](d.at, c), n = step({ ...s, hero: at, enemies: [] }, d.dir);
  assert.equal(n.place, c.sides[d.dir]);
  assert.deepEqual(n.hero, EDGE[BACK[d.dir]](d.at, c));
  assert.equal(tileAt(n.room, n.hero.x, n.hero.y).id, 'floor');
  const back = step({ ...n, enemies: [] }, BACK[d.dir]);
  assert.equal(back.place, 'depth2');
  assert.deepEqual(back.hero, at);
  assert.equal(back.turn, 2);
});

test('a seed keeps its rooms as the depths move up one: each takes its old depth\'s numbers (D-213)', () => {
  for (const seed of SEEDS.slice(0, 10)) for (const depth of [2, 3, 7]) {
    assert.equal(layoutAt(seed, depth).cells.find((c) => c.up).seed, seedFor(seed, depth + 1));
  }
});
