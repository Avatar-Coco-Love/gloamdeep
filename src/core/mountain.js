// § mountain: Hearthwood's north row of rooms, a rocky slope (D-183, D-738, D-733's step 4).
// Plain data, no drawing. A mountain room grows as a woods room does, without its pond and
// bush, and its paths are cut through the trees; then each tree becomes rock, but for a
// few lone trees inside, and 3 grey boulders lie on its open grass, as in a Cave room.
import { rng } from './rng.js';
import { COLS, ROWS } from './cave.js';
import { joinedFrom, depthIn } from './woods.js';

// § lone trees: a tree at least LONE_IN tiles in from the edge stays a tree 1 time in
// LONE_ONE; every other tree is rock
export const LONE_IN = 2, LONE_ONE = 4;
// § boulders: how many grey boulders (deposits, 'O') lie in each, as in a Cave room (D-282)
export const BOULDERS = 3;

// (seed, room, keep) → the room as a mountain room: its trees made rock but for the lone
// ones, then BOULDERS boulders on open grass off the edge, none on `keep` (the mouth's
// front) or a stick or the start, each leaving every open tile joined to the start.
// From its own seed, so the woods room it grew from stays as it was.
export function mountainOf(seed, room, keep = []) {
  const r = rng(seed ^ 0x2545f491), g = room.map.map((line) => line.split(''));
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++)
    if (g[y][x] === 'T' && !(depthIn(x, y) >= LONE_IN && r() * LONE_ONE < 1)) g[y][x] = 'R';
  const skip = [room.start, ...keep, ...room.items], open = [];
  for (let y = 1; y < ROWS - 1; y++) for (let x = 1; x < COLS - 1; x++)
    if (g[y][x] === '.' && !skip.some((t) => t.x === x && t.y === y)) open.push({ x, y });
  for (let placed = 0; placed < BOULDERS && open.length;) {
    const at = open.splice(Math.floor(r() * open.length), 1)[0];
    g[at.y][at.x] = 'O';
    if (joinedFrom(g, room.start)) placed++;
    else g[at.y][at.x] = '.';
  }
  return { ...room, map: g.map((row) => row.join('')) };
}

// § rock goes on: true for a woods room whose edge is rock but for its ways, no tree, a mountain
// room; past its edge the rock goes on, drawn so (D-738). Read from the room itself, so a
// mountain room an older save keeps as woods keeps its trees past the edge too.
export function rockGoesOn(room) {
  if (room.look !== 'woods') return false;
  const map = room.map, rows = map.length, cols = map[0].length;
  let rock = false;
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    if (x && y && x < cols - 1 && y < rows - 1) continue;
    if (map[y][x] === 'T' || map[y][x] === 'S') return false; // a tree or a felled one's stump
    if (map[y][x] === 'R') rock = true;
  }
  return rock;
}
