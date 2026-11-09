// § region: each depth a grid of rooms of 1, 2 or 2 × 2 cells joined by openings (D-201, D-645),
// their stairs lined up floor to floor (D-202, D-203)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { layoutAt, sizeAt, roomSize } from '../src/core/region.js';
import { seedFor } from '../src/core/rng.js';
import { unguardedOf } from '../src/core/unguarded.js';
import { placeFor, placeBeside, tileAt, depthOf, poolAt, sideAt } from '../src/core/room.js';
import { makeWorld, step } from '../src/core/turn.js';
import { goToDepth, goToPlace } from '../src/core/stairs.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);
// The edge tile of an opening `at` along side `dir`, in a room `c.cols` × `c.rows` (D-580)
const EDGE = { up: (at) => ({ x: at, y: 0 }), down: (at, c) => ({ x: at, y: c.rows - 1 }), left: (at) => ({ x: 0, y: at }), right: (at, c) => ({ x: c.cols - 1, y: at }) };
const BACK = { up: 'down', down: 'up', left: 'right', right: 'left' };

// The rooms reachable from `start` through the openings, with how many joins away each is
function away(cells, start) {
  const out = new Map([[start.id, 0]]), todo = [start];
  while (todo.length) {
    const c = todo.shift();
    for (const { to: id } of c.doors) if (!out.has(id)) { out.set(id, out.get(c.id) + 1); todo.push(cells.find((x) => x.id === id)); }
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
      const covered = cells.flatMap((c) => Array.from({ length: c.w * c.h }, (_, i) => [c.x + (i % c.w), c.y + Math.floor(i / c.w)]));
      assert.ok(covered.every(([x, y]) => x >= 0 && y >= 0 && x < size && y < size));
      assert.equal(new Set(covered.map(String)).size, covered.length, 'no cell in two rooms');
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
    const p = placeFor(c.id, seed), all = p.map.join(''), { cols, rows } = c;
    assert.deepEqual([p.map[0].length, p.map.length], [cols, rows], `seed ${seed} ${c.id}`);
    assert.equal(all.includes('<'), !!c.up);
    assert.equal(all.includes('>'), !!c.down);
    const ids = p.enemies.map((e) => e.id).filter((id) => id !== 'flaskMimic');
    if (!unguardedOf(c.seed, 1)[0]) assert.equal(ids[0], 'rat'); assert.ok(ids.every((id) => poolAt(depth).includes(id))); // the mix (D-534), the first guard moved when its flask is unguarded (D-725)
  }
});

test('a cell is 11 × 13 on depths 2 to 7, 13 × 15 from 8; a room of more cells covers their seams too (D-645)', () => {
  const want = { 2: [11, 13], 4: [11, 13], 5: [11, 13], 7: [11, 13], 8: [13, 15], 9: [13, 15] };
  for (const [depth, [cols, rows]] of Object.entries(want)) {
    assert.deepEqual(sizeAt(+depth), { cols, rows });
    for (const seed of SEEDS.slice(0, 5)) for (const c of layoutAt(seed, +depth).cells) assert.deepEqual([c.cols, c.rows], [c.w * (cols + 1) - 1, c.h * (rows + 1) - 1]);
  }
  assert.deepEqual(roomSize(2, 2, 1), { cols: 23, rows: 13 });
  assert.deepEqual(roomSize(8, 2, 2), { cols: 27, rows: 31 });
});

// § shapes (D-645, step 2): halls of 2 cells and large rooms of 2 × 2 among the side rooms,
// how many by the band; the way's rooms stay one cell
const SHAPES = [[[2, 3, 4], 1, 2, 0, 0], [[5, 6, 7], 1, 2, 0, 1], [[8, 9, 12], 2, 3, 1, 1]];
test('each floor has the band\'s halls and large rooms, all side rooms; the way is one-cell rooms (D-645)', () => {
  for (const [depths, hallsLo, hallsHi, largeLo, largeHi] of SHAPES) {
    const halls = new Set(), large = new Set(), ways = new Set();
    for (const seed of SEEDS) for (const depth of depths) {
      const { cells } = layoutAt(seed, depth), up = cells.find((c) => c.up), down = cells.find((c) => c.down);
      const nh = cells.filter((c) => c.w * c.h === 2).length, nl = cells.filter((c) => c.w * c.h === 4).length;
      assert.ok(nh >= hallsLo && nh <= hallsHi, `seed ${seed} depth ${depth}: ${nh} halls`);
      assert.ok(nl >= largeLo && nl <= largeHi, `seed ${seed} depth ${depth}: ${nl} large rooms`);
      halls.add(nh); large.add(nl);
      for (const c of cells.filter((c) => c.w * c.h > 1)) ways.add(`${c.w}x${c.h}`);
      // the way's rooms, from the stairs down back to the stairs up, all one cell
      const steps = away(cells, up);
      for (let c = down; c !== up;) {
        assert.equal(c.w * c.h, 1, `seed ${seed} ${c.id} on the way`);
        c = cells.find((x) => x.doors.some((d) => d.to === c.id) && steps.get(x.id) === steps.get(c.id) - 1);
      }
      assert.equal(up.w * up.h, 1);
    }
    assert.equal(halls.size, hallsHi - hallsLo + 1, 'every count of halls turns up');
    assert.equal(large.size, largeHi - largeLo + 1, 'every count of large rooms turns up');
    assert.ok(ways.has('2x1') && ways.has('1x2'), 'halls both ways');
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

test('every opening is open on both sides, meeting on the map; across a seam, each leads to the other (D-645)', () => {
  for (const seed of SEEDS) for (const depth of [2, 5, 8]) {
    const { cells } = layoutAt(seed, depth), { cols, rows } = sizeAt(depth);
    for (const c of cells) {
      const room = placeFor(c.id, seed);
      assert.equal(depthOf(c.id), depth);
      for (const d of c.doors) {
        const o = cells.find((x) => x.id === d.to), p = EDGE[d.dir](d.at, c), q = EDGE[BACK[d.dir]](d.back, o);
        assert.equal(room.map[p.y][p.x], '.', `seed ${seed} ${c.id} ${d.dir}`);
        assert.equal(placeFor(o.id, seed).map[q.y][q.x], '.');
        // on the floor's tiles, the two edge tiles are a seam apart, straight across
        const fx = (r, t) => r.x * (cols + 1) + t.x, fy = (r, t) => r.y * (rows + 1) + t.y;
        assert.equal(Math.abs(fx(c, p) - fx(o, q)) + Math.abs(fy(c, p) - fy(o, q)), 2, `seed ${seed} ${c.id} ${d.dir}`);
        assert.deepEqual(sideAt(c.id, seed, d.dir, d.at), { to: o.id, along: d.back });
        assert.deepEqual(sideAt(o.id, seed, BACK[d.dir], d.back), { to: c.id, along: d.at });
      }
    }
  }
});

test('stairs up and their torch, and stairs down, each in one room; each room has a flask, a rat by it and a herb; the creatures mixed (D-534)', () => {
  for (const seed of SEEDS) for (const c of layoutAt(seed, 2).cells) {
    const p = placeFor(c.id, seed), all = p.map.join('');
    assert.equal(all.includes('<'), !!c.up);
    assert.equal(all.includes('>'), !!c.down);
    assert.equal(p.lights.length, c.up ? 1 : 0);
    const sets = c.w * c.h, each = (ids) => Array.from({ length: sets }, () => ids).flat(); // a set a cell in a hall or large room (D-651)
    assert.deepEqual(p.items.filter((it) => !it.once).map((it) => it.id).filter((id) => id !== 'heartcap'), c.up ? ['flask', 'herb', 'knife', 'oilcap', ...each(['flask', 'herb', 'oilcap']).slice(3)] : each(['flask', 'herb', 'oilcap'])); // an oilcap in each (D-296) // the knife by the stairs up (D-252); a dead end's cache aside (D-650)
    const ids = p.enemies.map((e) => e.id);
    if (!unguardedOf(c.seed, 1)[0]) assert.equal(ids[0], 'rat'); assert.ok(ids.every((id) => poolAt(2).includes(id))); // (D-725)
  }
});

test('walking out through an opening and back: the room beyond, then the same room as left', () => {
  const s = goToDepth(makeWorld(), 2), c = layoutAt(s.seed, 2).cells.find((x) => x.up), d = c.doors[0];
  const at = EDGE[d.dir](d.at, c), n = step({ ...s, hero: at, enemies: [] }, d.dir);
  assert.equal(n.place, d.to);
  assert.deepEqual(n.hero, EDGE[BACK[d.dir]](d.back, layoutAt(s.seed, 2).cells.find((x) => x.id === d.to)));
  assert.equal(tileAt(n.room, n.hero.x, n.hero.y).id, 'floor');
  const back = step({ ...n, enemies: [] }, BACK[d.dir]);
  assert.equal(back.place, 'depth2');
  assert.deepEqual(back.hero, at);
  assert.equal(back.turn, 2);
});

test('walking out of a hall or large room through its far stretch of edge and back: in at the matching spot (D-645)', () => {
  const far = (d) => d.at > (d.dir === 'up' || d.dir === 'down' ? 13 : 15); // past its first cell, at depth 8
  let walked = 0;
  for (const seed of SEEDS.slice(0, 20)) {
    const { cells } = layoutAt(seed, 8);
    for (const big of cells.filter((c) => c.w * c.h > 1)) for (const d of big.doors.filter(far)) {
      const s = goToPlace(goToDepth(makeWorld('first', seed), 8), big.id), at = EDGE[d.dir](d.at, big);
      const n = step({ ...s, hero: at, enemies: [] }, d.dir), o = cells.find((x) => x.id === d.to);
      assert.equal(n.place, d.to, `seed ${seed} ${big.id}`);
      assert.deepEqual(n.hero, EDGE[BACK[d.dir]](d.back, o));
      const back = step({ ...n, enemies: [] }, BACK[d.dir]);
      assert.equal(back.place, big.id);
      assert.deepEqual(back.hero, at);
      walked++;
    }
  }
  assert.ok(walked > 5, `${walked} walked`);
});

test('a seed keeps its rooms as the depths move up one: each takes its old depth\'s numbers (D-213)', () => {
  for (const seed of SEEDS.slice(0, 10)) for (const depth of [2, 3, 7]) {
    assert.equal(layoutAt(seed, depth).cells.find((c) => c.up).seed, seedFor(seed, depth + 1));
  }
});
