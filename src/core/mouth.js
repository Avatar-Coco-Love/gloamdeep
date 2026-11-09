// § mouth: the first cave's mouth, on an edge of the woods (step 49, D-211).
// Plain data, no drawing. The seed picks the edge (D-184) and a spot along
// it, kept from the corners, so the rock beside it stays off them. Since
// Hearthwood's 9 rooms (D-733) it stands in the room beside home that way,
// on that room's far edge, the same spot along it. Walking
// through it arrives on the crypt's facing side, at a gap in its wall: going
// up, the south room's bottom, then on up into the first room; going down,
// left or right, the first room. And back out onto the mouth.
import { rng, int, pick, seedFor } from './rng.js';
import { COLS, ROWS } from './cave.js';
import { daylight } from './daytime.js';
import { besideHome } from './hearthwood.js';
import { TILES } from './tiles.js';

// The crypt room and its gap, by the way the hero walks into the mouth
const INTO = {
  up: { room: 'south', gap: { x: 5, y: 12 } },
  down: { room: 'first', gap: { x: 5, y: 0 } },
  left: { room: 'first', gap: { x: 10, y: 3 } },
  right: { room: 'first', gap: { x: 0, y: 3 } },
};
const BACK = { up: 'down', down: 'up', left: 'right', right: 'left' };

// (seed) → { dir, tile, from, room, gap, look }: the way in, the mouth's tile in its
// woods room `from`, the crypt room and gap it leads to, and its look, one of the
// registry's (D-744), from its own stream so the rest stays as it was. Worked out once per seed.
const made = new Map();
export function mouthOf(seed = 1) {
  if (!made.has(seed)) {
    const r = rng(seedFor(seed, 0) ^ 0x6d0c7e11), dir = pick(r, Object.keys(INTO));
    const n = int(r, 2, (dir === 'up' || dir === 'down' ? COLS : ROWS) - 3);
    const tile = { up: { x: n, y: 0 }, down: { x: n, y: ROWS - 1 }, left: { x: 0, y: n }, right: { x: COLS - 1, y: n } }[dir];
    const look = pick(rng(seedFor(seed, 0) ^ 0x51c3a7e5), TILES.caveMouth.looks);
    made.set(seed, { dir, tile, from: besideHome(dir), ...INTO[dir], look });
  }
  return made.get(seed);
}

// The room the home waystone stands in (D-751, D-753): the one with the cave mouth, the crypt's door
export const stoneHome = (seed = 1) => mouthOf(seed).from;

// The way through the mouth from place `id`, as { direction: place }, or {}
export function mouthSides(id, seed = 1) {
  const m = mouthOf(seed);
  if (id === m.from) return { [m.dir]: m.room };
  if (id === m.room) return { [BACK[m.dir]]: m.from };
  return {};
}

// The tile the hero arrives on, walking from place `from` into `to` through
// the mouth, or null when that way isn't the mouth
export function mouthSpot(seed, from, to) {
  const m = mouthOf(seed);
  if (from === m.from && to === m.room) return m.gap;
  if (from === m.room && to === m.from) return m.tile;
  return null;
}

// A crypt room's map with its gap cut, when the mouth leads to it
export function withGap(id, map, seed) {
  const { room, gap } = mouthOf(seed);
  if (id !== room) return map;
  return map.map((line, y) => (y === gap.y ? line.slice(0, gap.x) + '.' + line.slice(gap.x + 1) : line));
}

// § daylight in: the light the mouth lets into its crypt room from the gap
// (step 51, D-173, D-218), as { x, y, r, cr, cg, cb } in pixels, or null.
// By day it reaches 3 tiles, a pale daylight; through dusk it shrinks and
// warms to the torches' orange, gone at night, and back the same way at dawn.
const TILE_SIZE = 16, REACH = 3;
const PALE = [1, 0.97, 0.86], WARM = [1.2, 0.78, 0.42]; // WARM is the torch's colour (core/lights.js)
export function mouthLight(state) {
  const { room, gap } = mouthOf(state.seed), k = daylight(state.turn);
  if (state.place !== room || k <= 0) return null;
  const [cr, cg, cb] = PALE.map((c, i) => WARM[i] + (c - WARM[i]) * k);
  return { x: gap.x * TILE_SIZE + TILE_SIZE / 2, y: gap.y * TILE_SIZE + TILE_SIZE / 2, r: REACH * k * TILE_SIZE, cr, cg, cb };
}
