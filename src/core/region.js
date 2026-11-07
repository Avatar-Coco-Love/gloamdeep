// § region: a generated depth laid out as a grid of rooms (D-169, D-201).
// Plain data, no drawing. Each room is one cell of its floor's grid (D-645):
// 6 to 8 rooms on a 4 × 4 grid at depths 2 to 4, 9 to 11 on 5 × 5 at depths
// 5 to 7, and 11 to 13 on 5 × 5 from depth 8, with 2 loops. The seed picks
// the count. First the way grows from the room with the stairs up, 3 or 4
// rooms long, the stairs down in its last room; then the other rooms grow one
// at a time off any room already there, each joined only to the room it grew
// from, so they are side rooms and dead ends. The loops are openings between
// two rooms side by side not yet joined, never one that shortens the way.
// Below depth 8 every floor is made as depth 8 is, until biome 2 (D-647).
// § lining up (D-202, D-203): every floor sits on the same grid. The stairs
// up are in the same cell, at the same tile, as the stairs down one floor
// above; the stairs down at a tile the seed picks, which the floor below
// then fits. Under the crypt the seed picks the cell. The room with the
// stairs up keeps the depth's own id (depth2), the others are depth2:x,y.
// § sizes (D-645): a cell is 11 × 13 tiles, 13 × 15 from depth 8. Floors
// only grow going down, so the stairs down always fit the floor below.
// § seeds: the depths moved up one (D-212), but every place below the
// surface keeps the numbers of its old depth, so a seed keeps its rooms (D-213).
import { rng, int, pick, seedFor } from './rng.js';

// The floors' bands (D-645): from which depth, the grid's size, the room
// counts the seed picks between, and how many loops
const BANDS = [
  { from: 2, size: 4, rooms: [6, 8], loops: 0 },
  { from: 5, size: 5, rooms: [9, 11], loops: 0 },
  { from: 8, size: 5, rooms: [11, 13], loops: 2 },
];
const DUNGEONS = 8;
// The way from the stairs up to the stairs down, in rooms, both ends counted (D-645)
const WAY = [3, 4];
// The first generated depth, and the crypt's stairs down above it (SECOND_ROOM in room.js)
const FIRST = 2;
const CRYPT_DOWN = { x: 1, y: 11 };
export const bandAt = (depth) => BANDS.findLast((b) => depth >= b.from);
// A generated depth's room size, one cell (D-645), as { cols, rows }
export const sizeAt = (depth) => (depth >= DUNGEONS ? { cols: 13, rows: 15 } : { cols: 11, rows: 13 });

// (seed, depth) → { cells: [{ id, x, y, seed, up, down, doors, sides, cols, rows }], up,
// down }, or null above the generated depths. `up` and `down` are the stairs
// tiles, in a cell's own `up` or `down` (null when it has none) and for the
// whole floor as { x, y, cell }. `doors` are a room's openings, as { dir, at }
// (the column or row along that edge); `sides` the room beyond each, by
// direction, as openings.js reads them. Worked out once per seed and depth.
const laid = new Map();
export const seedAt = (seed, depth) => seedFor(seed, depth + 1);
export function layoutAt(seed, depth) {
  if (depth < FIRST) return null;
  const k = `${seed}:${depth}`;
  if (!laid.has(k)) laid.set(k, lay(seed, depth));
  return laid.get(k);
}

function lay(seed, depth) {
  const base = seedAt(seed, depth), r = rng(base ^ 0x2c1b3c6d), above = layoutAt(seed, depth - 1);
  const upAt = above ? above.down : CRYPT_DOWN, { cols, rows } = sizeAt(depth), band = bandAt(depth);
  const { cells, ups, downs, joins } = grow(r, band, above?.down.cell);
  ups.up = tile(upAt);
  cells.forEach((c, i) => {
    c.id = c === ups ? `depth${depth}` : `depth${depth}:${c.x},${c.y}`;
    c.seed = c === ups ? base : (base + 1 + i) >>> 0;
    c.cols = cols; c.rows = rows;
  });
  // § joins: the opening's spot kept 2 tiles from the corners, and clear of the stairs up
  for (const [a, b] of joins) {
    if (b.x === a.x + 1) join(a, b, 'right', 'left', door(r, rows, a, b, (n) => [{ x: cols - 2, y: n }, { x: 1, y: n }]));
    else join(a, b, 'down', 'up', door(r, cols, a, b, (n) => [{ x: n, y: rows - 2 }, { x: n, y: 1 }]));
  }
  // § stairs down: in the way's last room, anywhere 2 tiles in from its edges, but
  // not on or beside the tile just inside one of its openings, and 3 from the bottom
  // edge, so the stairs up below have room under them in the dungeon's halls
  const inside = downs.doors.map(({ dir, at }) => (dir === 'left' ? { x: 1, y: at } : dir === 'right' ? { x: cols - 2, y: at } : dir === 'up' ? { x: at, y: 1 } : { x: at, y: rows - 2 }));
  downs.down = spot(r, cols, rows, (t) => t.y > rows - 4 || inside.some((d) => Math.abs(d.x - t.x) <= 1 && Math.abs(d.y - t.y) <= 1));
  return { cells, up: { ...tile(upAt), cell: tile(ups) }, down: { ...downs.down, cell: tile(downs) } };
}

const cellAt = (x, y) => ({ x, y, up: null, down: null, doors: [], sides: {} });
const STEPS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const beside = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y) === 1;
// A join kept with its first room left of or above its second
const joined = (a, b) => (b.x > a.x || b.y > a.y ? [a, b] : [b, a]);

// § growing (D-645): the way, then the side rooms, then the loops. The way under
// the crypt starts in a cell the seed picks, else under the stairs down above. A
// try whose way walks into a corner, or with too few places for its loops, is grown again.
function grow(r, { size, rooms, loops }, under) {
  for (;;) {
    const start = under ? cellAt(under.x, under.y) : cellAt(int(r, 0, size - 1), int(r, 0, size - 1));
    const cells = [start], joins = [], count = int(r, rooms[0], rooms[1]), long = int(r, WAY[0], WAY[1]);
    const free = (x, y) => x >= 0 && y >= 0 && x < size && y < size && !cells.some((c) => c.x === x && c.y === y);
    const ways = (from) => from.flatMap((c) => STEPS.map(([dx, dy]) => [c, c.x + dx, c.y + dy])).filter(([, x, y]) => free(x, y));
    const add = ([from, x, y]) => { const to = cellAt(x, y); cells.push(to); joins.push(joined(from, to)); return to; };
    let end = start;
    while (cells.length < long && ways([end]).length) end = add(pick(r, ways([end])));
    if (cells.length < long) continue;
    while (cells.length < count && ways(cells).length) add(pick(r, ways(cells)));
    if (cells.length < count) continue;
    let made = 0;
    for (; made < loops; made++) {
      const far = away(cells, joins, start).get(end);
      const open = [];
      for (const a of cells) for (const b of cells) {
        if (beside(a, b) && (b.x > a.x || b.y > a.y) && !joins.some(([u, v]) => u === a && v === b)
          && away(cells, [...joins, [a, b]], start).get(end) === far) open.push([a, b]);
      }
      if (!open.length) break;
      joins.push(pick(r, open));
    }
    if (made === loops) return { cells, ups: start, downs: end, joins };
  }
}

// How many joins each room is from `start`, as a Map
function away(cells, joins, start) {
  const steps = new Map([[start, 0]]), todo = [start];
  while (todo.length) {
    const c = todo.shift();
    for (const [a, b] of joins) for (const [u, v] of [[a, b], [b, a]]) if (u === c && !steps.has(v)) { steps.set(v, steps.get(c) + 1); todo.push(v); }
  }
  return steps;
}

// An opening's spot along an edge `len` long, redrawn while the tile just
// inside it, in a (first) or b (second), would be that room's stairs up, the
// wall above them or a tile beside either
function door(r, len, a, b, inner) {
  const near = (t, up) => up && Math.abs(t.x - up.x) <= 1 && (t.y === up.y || t.y === up.y - 1);
  let n;
  do n = int(r, 2, len - 3);
  while (near(inner(n)[0], a.up) || near(inner(n)[1], b.up));
  return n;
}

function join(a, b, out, back, at) {
  a.doors.push({ dir: out, at }); a.sides[out] = b.id;
  b.doors.push({ dir: back, at }); b.sides[back] = a.id;
}

// A tile 2 in from the room's edges, redrawn while `bad` holds
function spot(r, cols, rows, bad) {
  let t;
  do t = { x: int(r, 2, cols - 3), y: int(r, 2, rows - 3) };
  while (bad(t));
  return t;
}

const tile = ({ x, y }) => ({ x, y });

// The cell of a generated place in its depth's grid, or null
export function cellOf(seed, id, depth) {
  return layoutAt(seed, depth)?.cells.find((c) => c.id === id) || null;
}

// The id of the room with the stairs down at a generated depth
export const downPlaceIn = (seed, depth) => layoutAt(seed, depth).cells.find((c) => c.down).id;
