// § region: a generated depth laid out as a grid of rooms (D-169, D-201).
// Plain data, no drawing. Each room is made of cells of its floor's grid (D-645):
// 6 to 8 rooms on a 4 × 4 grid at depths 2 to 4, 9 to 11 on 5 × 5 at depths
// 5 to 7, and 11 to 13 on 5 × 5 from depth 8, with 2 loops. The seed picks
// the count. First the way grows from the room with the stairs up, 3 or 4
// rooms long, the stairs down in its last room; then the other rooms grow one
// at a time off any room already there, each joined only to the room it grew
// from, so they are side rooms and dead ends. The loops are openings between
// two rooms side by side not yet joined, never one that shortens the way.
// Below depth 8 every floor is made as depth 8 is, until biome 2 (D-647).
// § shapes (D-645, step 2): a room is 1 cell, a hall of 2 (side by side or one
// above the other) or a large room of 2 × 2. The way's rooms are 1 cell, so the
// walk to the stairs stays as it was (D-580); the halls and large rooms are side
// rooms, how many by the band, picked by the seed (Claude's draft, tuned at the playtest).
// § lining up (D-202, D-203): every floor sits on the same grid. The stairs
// up are in the same cell, at the same tile, as the stairs down one floor
// above; the stairs down at a tile the seed picks, which the floor below
// then fits. Under the crypt the seed picks the cell. The room with the
// stairs up keeps the depth's own id (depth2), the others are depth2:x,y, by
// their top-left cell.
// § sizes (D-645): a cell is 11 × 13 tiles, 13 × 15 from depth 8. A room of
// more cells also covers the seams between them, as the map draws a tile
// apart, so a hall is 23 × 13 and a large room 23 × 27, and every room lines
// up on the map. Floors only grow going down, so the stairs down always fit the floor below.
// § seeds: the depths moved up one (D-212), but every place below the
// surface keeps the numbers of its old depth, so a seed keeps its rooms (D-213).
import { rng, int, pick, seedFor } from './rng.js';

// The floors' bands (D-645): from which depth, the grid's size, the room
// counts the seed picks between, how many loops, and how many halls and
// large rooms among the side rooms
const BANDS = [
  { from: 2, size: 4, rooms: [6, 8], loops: 0, halls: [1, 2], large: [0, 0] },
  { from: 5, size: 5, rooms: [9, 11], loops: 0, halls: [1, 2], large: [0, 1] },
  { from: 8, size: 5, rooms: [11, 13], loops: 2, halls: [2, 3], large: [1, 1] },
];
const DUNGEONS = 8;
// The way from the stairs up to the stairs down, in rooms, both ends counted (D-645)
const WAY = [3, 4];
// The first generated depth, and the crypt's stairs down above it (SECOND_ROOM in room.js)
const FIRST = 2;
const CRYPT_DOWN = { x: 1, y: 11 };
export const bandAt = (depth) => BANDS.findLast((b) => depth >= b.from);
// A generated depth's cell, as { cols, rows } (D-645)
export const sizeAt = (depth) => (depth >= DUNGEONS ? { cols: 13, rows: 15 } : { cols: 11, rows: 13 });
// A room `w` × `h` cells big, as { cols, rows }, the seams between its cells covered
export const roomSize = (depth, w = 1, h = 1) => { const { cols, rows } = sizeAt(depth); return { cols: w * (cols + 1) - 1, rows: h * (rows + 1) - 1 }; };

// (seed, depth) → { cells: [{ id, x, y, w, h, seed, up, down, doors, cols, rows, end }], up,
// down }, or null above the generated depths. A room's x, y is its top-left cell,
// w, h how many cells wide and tall. `up` and `down` are the stairs tiles, in a
// room's own `up` or `down` (null when it has none) and for the whole floor as
// { x, y, cell }; `end` marks a dead end (D-650). `doors` are a room's openings, as { dir, at, to, back }: the column
// or row along that edge, the room beyond, and the opening's column or row there.
// Worked out once per seed and depth.
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
  const upAt = above ? above.down : CRYPT_DOWN, cell = sizeAt(depth), band = bandAt(depth);
  const { cells, ups, downs, joins } = grow(r, band, above?.down.cell);
  ups.up = tile(upAt);
  cells.forEach((c, i) => {
    c.id = c === ups ? `depth${depth}` : `depth${depth}:${c.x},${c.y}`;
    c.seed = c === ups ? base : (base + 1 + i) >>> 0;
    Object.assign(c, roomSize(depth, c.w, c.h));
  });
  // § joins: on one stretch of edge the two rooms share, a cell's edge, the opening's
  // spot kept 2 tiles from that cell's corners, and clear of the stairs up
  for (const [a, b] of joins) {
    const [ca, cb] = pick(r, shared(a, b));
    if (cb.x === ca.x + 1) {
      const oa = (ca.y - a.y) * (cell.rows + 1), ob = (cb.y - b.y) * (cell.rows + 1);
      const n = door(r, cell.rows, a, b, (k) => [{ x: a.cols - 2, y: oa + k }, { x: 1, y: ob + k }]);
      join(a, b, 'right', 'left', oa + n, ob + n);
    } else {
      const oa = (ca.x - a.x) * (cell.cols + 1), ob = (cb.x - b.x) * (cell.cols + 1);
      const n = door(r, cell.cols, a, b, (k) => [{ x: oa + k, y: a.rows - 2 }, { x: ob + k, y: 1 }]);
      join(a, b, 'down', 'up', oa + n, ob + n);
    }
  }
  // § stairs down: in the way's last room, anywhere 2 tiles in from its edges, but
  // not on or beside the tile just inside one of its openings, and 3 from the bottom
  // edge, so the stairs up below have room under them in the dungeon's halls
  const { cols, rows } = downs;
  const inside = downs.doors.map(({ dir, at }) => (dir === 'left' ? { x: 1, y: at } : dir === 'right' ? { x: cols - 2, y: at } : dir === 'up' ? { x: at, y: 1 } : { x: at, y: rows - 2 }));
  downs.down = spot(r, cols, rows, (t) => t.y > rows - 4 || inside.some((d) => Math.abs(d.x - t.x) <= 1 && Math.abs(d.y - t.y) <= 1));
  // § dead ends (D-650): a side room with one opening, the last of its branch
  for (const c of cells) c.end = c !== ups && c !== downs && c.doors.length === 1;
  return { cells, up: { ...tile(upAt), cell: tile(ups) }, down: { ...downs.down, cell: tile(downs) } };
}

const roomAt = (x, y, w = 1, h = 1) => ({ x, y, w, h, up: null, down: null, doors: [] });
const STEPS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
// The cells a room covers
const cellsOf = (c) => Array.from({ length: c.w * c.h }, (_, i) => ({ x: c.x + (i % c.w), y: c.y + Math.floor(i / c.w) }));
const beside = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y) === 1;
// The pairs of cells, one of `a` and one of `b`, side by side, the first left of or above the second
function shared(a, b) {
  const out = [];
  for (const u of cellsOf(a)) for (const v of cellsOf(b)) if (v.x === u.x + 1 && v.y === u.y || v.y === u.y + 1 && v.x === u.x) out.push([u, v]);
  return out;
}
// Whether `shared` (a, b) has any pair, worked out from the two rooms' edges
// without listing their cells: b starts just right of a with rows in common, or
// just below a with columns in common
const meets = (a, b) => (b.x === a.x + a.w && b.y < a.y + a.h && a.y < b.y + b.h)
  || (b.y === a.y + a.h && b.x < a.x + a.w && a.x < b.x + b.w);
// A join kept with its first room left of or above its second
const joined = (a, b) => (meets(a, b) ? [a, b] : [b, a]);
const touches = (a, b) => meets(a, b) || meets(b, a);

// § growing (D-645): the way, then the side rooms, then the loops. The way under
// the crypt starts in a cell the seed picks, else under the stairs down above. The
// seed picks how many side rooms are halls and how many large, and which; each grows
// where it fits beside any room. A try whose way walks into a corner, whose rooms
// don't all fit, or with too few places for its loops, is grown again.
function grow(r, { size, rooms, loops, halls, large }, under) {
  for (;;) {
    const start = under ? roomAt(under.x, under.y) : roomAt(int(r, 0, size - 1), int(r, 0, size - 1));
    const cells = [start], joins = [], count = int(r, rooms[0], rooms[1]), long = int(r, WAY[0], WAY[1]);
    // The cells taken so far, as "x,y", kept with `cells` so a check is one look-up
    const taken = new Set([`${start.x},${start.y}`]);
    const free = (x, y) => x >= 0 && y >= 0 && x < size && y < size && !taken.has(`${x},${y}`);
    // Every spot a room of the shapes `fits` can take beside a room of `from`, as [from, x, y, w, h]
    const ways = (from, fits) => from.flatMap((c) => fits.flatMap(([w, h]) => {
      const out = [];
      for (let y = c.y - h; y <= c.y + c.h; y++) for (let x = c.x - w; x <= c.x + c.w; x++) {
        const to = roomAt(x, y, w, h);
        if (cellsOf(to).every((t) => free(t.x, t.y)) && touches(c, to)) out.push([c, x, y, w, h]);
      }
      return out;
    }));
    const add = ([from, x, y, w, h]) => {
      const to = roomAt(x, y, w, h); cells.push(to); joins.push(joined(from, to));
      for (const t of cellsOf(to)) taken.add(`${t.x},${t.y}`);
      return to;
    };
    let end = start;
    while (cells.length < long && ways([end], [[1, 1]]).length) end = add(pick(r, ways([end], [[1, 1]])));
    if (cells.length < long) continue;
    // The side rooms' shapes, in the order they grow: the seed's halls and large rooms among the small ones
    const sides = Array(count - long).fill('small'), nl = int(r, large[0], large[1]), nh = int(r, halls[0], halls[1]);
    for (const kind of [...Array(nl).fill('large'), ...Array(nh).fill('hall')]) {
      const at = sides.map((k, i) => i).filter((i) => sides[i] === 'small');
      if (at.length) sides[pick(r, at)] = kind;
    }
    const SHAPE = { small: [[1, 1]], hall: [[2, 1], [1, 2]], large: [[2, 2]] };
    for (const kind of sides) {
      const spots = ways(cells, SHAPE[kind]);
      if (!spots.length) break;
      add(pick(r, spots));
    }
    if (cells.length < count) continue;
    let made = 0;
    for (; made < loops; made++) {
      const far = away(cells, joins, start).get(end);
      const open = [];
      for (const a of cells) for (const b of cells) {
        if (a !== b && meets(a, b) && !joins.some(([u, v]) => (u === a && v === b) || (u === b && v === a))
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

// An opening's spot along a cell's edge `len` long, redrawn while the tile just
// inside it, in a (first) or b (second), would be that room's stairs up, the
// wall above them or a tile beside either
function door(r, len, a, b, inner) {
  const near = (t, up) => up && Math.abs(t.x - up.x) <= 1 && (t.y === up.y || t.y === up.y - 1);
  let n;
  do n = int(r, 2, len - 3);
  while (near(inner(n)[0], a.up) || near(inner(n)[1], b.up));
  return n;
}

function join(a, b, out, back, at, bt) {
  a.doors.push({ dir: out, at, to: b.id, back: bt }); b.doors.push({ dir: back, at: bt, to: a.id, back: at });
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

// § beyond: walking off room `c`'s edge `dir` at tile `along` (its column or row
// there), the room beyond and the tile along its matching edge, as { to, along },
// or null. Each cell's stretch of edge leads to the room its opening joins, if any.
export function beyondOf(c, dir, along, depth) {
  const cell = sizeAt(depth), len = (dir === 'up' || dir === 'down' ? cell.cols : cell.rows) + 1;
  const d = c.doors.find((o) => o.dir === dir && Math.floor(o.at / len) === Math.floor(along / len));
  return d ? { to: d.to, along: along - d.at + d.back } : null;
}

// The id of the room with the stairs down at a generated depth
export const downPlaceIn = (seed, depth) => layoutAt(seed, depth).cells.find((c) => c.down).id;
