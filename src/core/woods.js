// § woods: a generated woods room on the surface (step 48, D-209), from one
// seed. Plain data, no drawing. Same seed, same room. Trees stand thick at
// the edges and thinner inside; every open tile is joined to the start.
import { rng, int } from './rng.js';
import { COLS, ROWS } from './cave.js';
import { get } from './registry.js';

// § trees: the chance a tile holds a tree, by how many tiles in from the edge
// it is: the edge itself is always trees; deeper in than the list, the last one
const TREES = [1, 0.6, 0.35, 0.15];
// At least this many open tiles, as in a cave of this size (cave.js)
const MIN_OPEN = 107;
const TRIES = 200;

// § sticks: how many lie in each woods room, as Wood (W1, D-314)
const STICKS = 3;
// § branch: how many fallen branches lie in each, as tiles (W2, D-316)
const BRANCHES = 1;

// (seed, mouth) → { map, start, lights, enemies, items }. Nothing lives in the
// woods yet (starting-region.md, "Creatures and finds"); 3 sticks lie on open
// tiles, picked after the trees so the rest of each seed's room stays as it
// was, each one of Wood's looks, its `form` (D-314); then one fallen branch,
// picked after the sticks for the same reason (D-316); then a pond, from its
// own seed (D-503). The hero starts in
// the middle. `mouth` (mouth.js), when given, opens the cave mouth in its
// edge with a rock either side, the two tiles in front of it open and
// joined to the start (D-211).
export function generateWoods(seed, mouth = null) {
  const r = rng(seed), start = { x: COLS >> 1, y: ROWS >> 1 }, front = mouth ? inFront(mouth) : [];
  let g = null;
  for (let i = 0; i < TRIES && !g; i++) g = grow(r, start, front);
  g = g || Array.from({ length: ROWS }, (_, y) => Array.from({ length: COLS }, (_, x) => (depthIn(x, y) === 0 ? 'T' : '.')));
  if (mouth) {
    const { tile: t, dir } = mouth, [ax, ay] = dir === 'up' || dir === 'down' ? [1, 0] : [0, 1];
    g[t.y][t.x] = 'M'; g[t.y - ay][t.x - ax] = 'R'; g[t.y + ay][t.x + ax] = 'R';
  }
  const items = sticks(r, g, [start, ...front]);
  branches(r, g, start, [start, ...front, ...items]);
  pond(seed, g, start, front, items);
  return { map: g.map((row) => row.join('')), start, lights: [], enemies: [], items };
}

// BRANCHES fallen branches on open tiles, none on `keep` (the start, the mouth's
// front, the sticks), each leaving every open tile joined to the start
function branches(r, g, start, keep) {
  const open = [];
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++)
    if (g[y][x] === '.' && !keep.some((t) => t.x === x && t.y === y)) open.push({ x, y });
  for (let placed = 0; placed < BRANCHES && open.length;) {
    const at = open.splice(Math.floor(r() * open.length), 1)[0];
    g[at.y][at.x] = 'F';
    if (joinedFrom(g, start)) placed++;
    else g[at.y][at.x] = '.';
  }
}

// § pond: one pond of POND_MIN to POND_MAX water tiles ('~', D-503), the cave pool's
// size, on open grass at least POND_IN tiles in from the edge and POND_CLEAR steps from
// the start and the mouth's front, where no stick lies. It grows round from a seeded
// spot, each next tile the one nearest that spot, with a little chance in it, and never
// cuts the room in two. From its own seed, picked last, so the rest of each seed's room
// stays as it was; none when no spot fits.
export const POND_MIN = 5, POND_MAX = 9, POND_IN = 2, POND_CLEAR = 4;
function pond(seed, g, start, front, items) {
  const r = rng(seed ^ 0x3c6ef372), size = int(r, POND_MIN, POND_MAX), near = [start, ...front];
  const free = (x, y) => g[y]?.[x] === '.' && depthIn(x, y) >= POND_IN && !items.some((t) => t.x === x && t.y === y)
    && near.every((t) => Math.abs(t.x - x) + Math.abs(t.y - y) >= POND_CLEAR);
  const spots = [];
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (free(x, y)) spots.push({ x, y });
  while (spots.length) {
    const at = spots.splice(Math.floor(r() * spots.length), 1)[0], wet = [at], jitter = new Map();
    g[at.y][at.x] = '~';
    while (wet.length < size) {
      let best = null, bestD = Infinity;
      for (const t of wet) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const x = t.x + dx, y = t.y + dy, k = y * COLS + x;
        if (!free(x, y)) continue;
        if (!jitter.has(k)) jitter.set(k, r() * 1.3);
        const d = Math.hypot(x - at.x, (y - at.y) * 1.2) + jitter.get(k);
        if (d < bestD) { bestD = d; best = { x, y }; }
      }
      if (!best) break;
      g[best.y][best.x] = '~'; wet.push(best);
    }
    if (wet.length >= POND_MIN && joinedFrom(g, start)) return;
    for (const t of wet) g[t.y][t.x] = '.';
  }
}

// Whether every open tile of g, the cave mouth too, can be walked to from `start`
function joinedFrom(g, start) {
  const walk = (x, y) => g[y]?.[x] === '.' || g[y]?.[x] === 'M';
  let all = 0;
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (walk(x, y)) all++;
  const seen = new Set([start.y * COLS + start.x]), queue = [start];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const x = t.x + dx, y = t.y + dy;
      if (!walk(x, y) || seen.has(y * COLS + x)) continue;
      seen.add(y * COLS + x); queue.push({ x, y });
    }
  }
  return seen.size === all;
}

// STICKS wood items on open tiles, none on `keep` (the start, the mouth's front)
function sticks(r, g, keep) {
  const open = [];
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++)
    if (g[y][x] === '.' && !keep.some((t) => t.x === x && t.y === y)) open.push({ x, y });
  const items = [];
  while (items.length < STICKS && open.length) {
    const at = open.splice(Math.floor(r() * open.length), 1)[0];
    items.push({ id: 'wood', x: at.x, y: at.y, form: Math.floor(r() * get('wood').forms) });
  }
  return items;
}

// The two tiles in front of the mouth, nearest first
function inFront({ tile: t, dir }) {
  const [dx, dy] = { up: [0, 1], down: [0, -1], left: [1, 0], right: [-1, 0] }[dir];
  return [1, 2].map((k) => ({ x: t.x + dx * k, y: t.y + dy * k }));
}

// How many tiles in from the room's edge tile x, y is: 0 on it
const depthIn = (x, y) => Math.min(x, y, COLS - 1 - x, ROWS - 1 - y);

// One try: trees by chance, the start and `keep` tiles kept open, then any
// open tile cut off from the start becomes a tree. Null when too little is
// left open, or a `keep` tile is cut off.
function grow(r, start, keep) {
  const g = Array.from({ length: ROWS }, (_, y) => Array.from({ length: COLS }, (_, x) =>
    (r() < TREES[Math.min(depthIn(x, y), TREES.length - 1)] ? 'T' : '.')));
  for (const t of [start, ...keep]) g[t.y][t.x] = '.';
  const joined = new Set([start.y * COLS + start.x]), queue = [start];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const x = t.x + dx, y = t.y + dy;
      if (g[y]?.[x] !== '.' || joined.has(y * COLS + x)) continue;
      joined.add(y * COLS + x); queue.push({ x, y });
    }
  }
  if (joined.size < MIN_OPEN || keep.some((t) => !joined.has(t.y * COLS + t.x))) return null;
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (!joined.has(y * COLS + x)) g[y][x] = 'T';
  return g;
}
