// § campfire: where the surface's one campfire stands and how lit it is (D-757, Q-088's first
// step). Plain data, no drawing. One of Hearthwood's 8 rooms outside home holds it, the seed
// picking the room, and blazing, embers or cold ashes, each as likely. In its room it stands
// on open grass at least IN tiles in from the edge, never on the start, a stick, the cave
// mouth's front or the home waystone's ring, and never cuts the room in two. From its own
// seed, picked last, so the rest of each seed's room stays as it was; none when no spot fits.
// Lighting cold ashes is the bed's ask card's (bagturn.js `kindle`).
import { rng, int, seedFor } from './rng.js';
import { COLS, ROWS } from './cave.js';
import { ROOMS, HOME_ID } from './hearthwood.js';
import { joinedFrom, depthIn } from './woods.js';
import { get } from './registry.js';

// § levels: the tile of each, blazing first (tiles.js)
export const LEVELS = ['campfire', 'campfireEmbers', 'campfireAshes'];
// § in: how many tiles in from the room's edge it stands, at least
export const IN = 2;
// The rooms it may stand in: Hearthwood's 8 outside home
export const FIRE_ROOMS = ROOMS.filter((id) => id !== HOME_ID);

// (seed) → { room, level }: the room it stands in and its tile, blazing, embers or ashes
export function campfireOf(seed) {
  const r = rng(seedFor(seed, 0) ^ 0x7c3f1e95);
  return { room: FIRE_ROOMS[int(r, 0, FIRE_ROOMS.length - 1)], level: LEVELS[int(r, 0, LEVELS.length - 1)] };
}

// (seed, id, room, keep) → the room with its campfire, when it is the campfire's room; `keep`
// the tiles to keep clear (the mouth's front, the waystone's ring). The room as it was otherwise.
export function withCampfire(seed, id, room, keep = []) {
  const fire = campfireOf(seed);
  if (fire.room !== id) return room;
  const r = rng(seedFor(seed, 0) ^ 0x4a1d93c7), g = room.map.map((line) => line.split(''));
  const skip = [room.start, ...keep, ...room.items], open = [];
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++)
    if (g[y][x] === '.' && depthIn(x, y) >= IN && !skip.some((t) => t.x === x && t.y === y)) open.push({ x, y });
  const letter = get(fire.level).letter;
  while (open.length) {
    const at = open.splice(Math.floor(r() * open.length), 1)[0];
    g[at.y][at.x] = letter;
    if (joinedFrom(g, room.start)) return { ...room, map: g.map((row) => row.join('')) };
    g[at.y][at.x] = '.';
  }
  return room;
}
