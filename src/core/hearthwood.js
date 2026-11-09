// § hearthwood: the starting region's 3 × 3 rooms on the surface (D-182, D-733, step 1).
// Plain data, no drawing. The north row is mountain rooms (mountain.js, D-738), the rest woods. Home
// is the centre cell and keeps the id 'woods', so a save's home stays as it was; the
// others are woods:x,y by their cell. Each room is joined to every room beside it by a
// path 3 tiles wide through the trees, at the same spot on both sides, the seed picking
// where along the edge; a path is cut from it to the room's open ground (D-733's joins).
import { rng, int, seedFor } from './rng.js';
import { COLS, ROWS } from './cave.js';
import { byLetter } from './registry.js';

export const SIZE = 3;
export const HOME_CELL = { x: 1, y: 1 };
export const HOME_ID = 'woods';
// § path: how wide each path is, and how far its first tile keeps from a corner
export const PATH = 3, CORNER = 3;

const STEP = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

// The room's id in cell x, y, or null off the grid
export const idAt = (x, y) => (x < 0 || y < 0 || x >= SIZE || y >= SIZE ? null : x === HOME_CELL.x && y === HOME_CELL.y ? HOME_ID : `woods:${x},${y}`);
// Every room's id, row by row
export const ROOMS = Array.from({ length: SIZE * SIZE }, (_, i) => idAt(i % SIZE, Math.floor(i / SIZE)));
// The cell of room `id`, or null when it is not one of Hearthwood's
export function cellOfWoods(id) {
  if (id === HOME_ID) return { ...HOME_CELL };
  const m = /^woods:(\d),(\d)$/.exec(id);
  return m && idAt(+m[1], +m[2]) === id ? { x: +m[1], y: +m[2] } : null;
}
// The room beside `id` each way, as { direction: id }
export function sidesOfWoods(id) {
  const c = cellOfWoods(id), out = {};
  if (!c) return out;
  for (const [dir, [dx, dy]] of Object.entries(STEP)) { const to = idAt(c.x + dx, c.y + dy); if (to) out[dir] = to; }
  return out;
}
// Whether room `id` is a mountain room: the north row, every seed (D-183, D-738)
export const isMountain = (id) => cellOfWoods(id)?.y === 0;
// § kinds: how thick each woods room round home grows (D-756, D-733's step 5): thick woods,
// the woods as they first were, or an open glade, the seed picking; at least one thick and
// one glade each seed, the rest by chance. Home stays as it first was, so what was set down
// keeps its place; a mountain room grows as the woods did (mountain.js).
export const KIND_NAMES = ['thick', 'woods', 'glade'];
export const ROUND_HOME = ROOMS.filter((id) => id !== HOME_ID && !isMountain(id));
export function kindsOf(seed) {
  const r = rng(seedFor(seed, 0) ^ 0x6b43a9b5), left = [...ROUND_HOME], out = {};
  for (const kind of ['thick', 'glade']) out[left.splice(int(r, 0, left.length - 1), 1)[0]] = kind;
  for (const id of left) out[id] = KIND_NAMES[int(r, 0, KIND_NAMES.length - 1)];
  return out;
}
export const kindOf = (seed, id) => kindsOf(seed)[id] || 'woods';
// The room the way `dir` from home, where the cave mouth stands (D-184, D-733)
export const besideHome = (dir) => idAt(HOME_CELL.x + STEP[dir][0], HOME_CELL.y + STEP[dir][1]);

// The seed a room is made from: home's as before, the others each their own
export function woodsSeed(seed, id) {
  const base = seedFor(seed, 0), i = ROOMS.indexOf(id);
  return id === HOME_ID ? base : (base + 1 + i) >>> 0;
}

// § paths: (seed, id) → [{ dir, at }]: each edge with a room beyond, and the first of its
// PATH tiles along it (its column, or row). Both rooms of an edge pick the same spot.
export function pathsOf(seed, id) {
  const c = cellOfWoods(id);
  return Object.keys(sidesOfWoods(id)).map((dir) => {
    const across = dir === 'left' || dir === 'right', [dx, dy] = STEP[dir];
    const ax = Math.min(c.x, c.x + dx), ay = Math.min(c.y, c.y + dy); // the edge's left or top cell
    const r = rng(seedFor(seed, 0) ^ 0x2f6a1c37 ^ ((across ? 1 : 2) * 64 + ay * 8 + ax) * 0x9e3779b1);
    return { dir, at: int(r, CORNER, (across ? ROWS : COLS) - CORNER - PATH) };
  });
}

// The PATH edge tiles of a path
export function pathTiles({ dir, at }) {
  return Array.from({ length: PATH }, (_, k) => ({ up: { x: at + k, y: 0 }, down: { x: at + k, y: ROWS - 1 }, left: { x: 0, y: at + k }, right: { x: COLS - 1, y: at + k } }[dir]));
}

// § cut: (map, paths, start) → the map with each path's edge tiles open and, from its
// middle one, the fewest trees cut to reach the ground joined to `start`. Only trees
// ('T') are cut, and a fallen branch or berry bush in the way, as a tree is (D-742, B1):
// water, rock, the waystone and things set down stay as they are.
const CUT = 'TFGH'; // a tree, a fallen branch, a gloamberry bush, a bare bush
const cuts = (ch) => ch !== undefined && CUT.includes(ch);
export function cutPaths(map, paths, start) {
  const g = map.map((line) => line.split(''));
  for (const p of paths) {
    const tiles = pathTiles(p);
    for (const t of tiles) if (cuts(g[t.y][t.x])) g[t.y][t.x] = '.';
    cutTo(g, tiles[PATH >> 1], start);
  }
  return g.map((row) => row.join(''));
}
const open = (ch) => ch !== undefined && !byLetter(ch)?.solid;
// The tiles joined to `start` over open ground
function joined(g, start) {
  const seen = new Set([start.y * COLS + start.x]), queue = [start];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of Object.values(STEP)) {
      const x = t.x + dx, y = t.y + dy;
      if (!open(g[y]?.[x]) || seen.has(y * COLS + x)) continue;
      seen.add(y * COLS + x); queue.push({ x, y });
    }
  }
  return seen;
}
// The fewest trees to cut from `from` to the ground joined to `start` (0-1 steps: open free,
// a tree, branch or bush costs one), then cut
function cutTo(g, from, start) {
  const home = joined(g, start), cost = new Map([[from.y * COLS + from.x, 0]]), back = new Map(), deque = [from];
  let end = null;
  while (deque.length) {
    const t = deque.shift(), k = t.y * COLS + t.x;
    if (home.has(k)) { end = t; break; }
    for (const [dx, dy] of Object.values(STEP)) {
      const x = t.x + dx, y = t.y + dy, ch = g[y]?.[x];
      if (x <= 0 || y <= 0 || x >= COLS - 1 || y >= ROWS - 1) { if (!(ch !== undefined && open(ch) && home.has(y * COLS + x))) continue; }
      if (!cuts(ch) && !open(ch)) continue;
      const c = cost.get(k) + (cuts(ch) ? 1 : 0), nk = y * COLS + x;
      if (cost.has(nk) && cost.get(nk) <= c) continue;
      cost.set(nk, c); back.set(nk, t);
      if (cuts(ch)) deque.push({ x, y }); else deque.unshift({ x, y });
    }
  }
  for (let t = end; t; t = back.get(t.y * COLS + t.x)) if (cuts(g[t.y][t.x])) g[t.y][t.x] = '.';
}
