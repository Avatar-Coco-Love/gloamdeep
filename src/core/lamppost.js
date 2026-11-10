// § lamppost: where the surface's one dead lamppost stands (D-769, the first landmark, D-760's
// second step). Plain data, no drawing. One of Hearthwood's 8 rooms outside home holds it, the seed
// picking the room, never the campfire's, so each room holds about one thing (D-757). In its room
// it stands on open grass at least IN tiles in from the edge, never on the start, a find, the cave
// mouth's front or the home waystone's ring, and never cuts the room in two. From its own seed,
// picked last, so the rest of each seed's room stays as it was; none when no spot fits. An older
// save stands it in its room if never seen, with nothing taken (relamp.js).
import { rng, int, seedFor } from './rng.js';
import { COLS, ROWS } from './cave.js';
import { joinedFrom, depthIn } from './woods.js';
import { get } from './registry.js';
import { FIRE_ROOMS, campfireOf } from './campfire.js';

// § in: how many tiles in from the room's edge it stands, at least, as the campfire
export const IN = 2;

// (seed) → the room it stands in: one of the 8 outside home, never the campfire's
export function lamppostRoom(seed) {
  const r = rng(seedFor(seed, 0) ^ 0x2b8e61d3), fire = campfireOf(seed).room, rooms = FIRE_ROOMS.filter((id) => id !== fire);
  return rooms[int(r, 0, rooms.length - 1)];
}

// (seed, id, room, keep) → the room with its lamppost, when it is the lamppost's room; `keep` the
// tiles to keep clear (the mouth's front, the waystone's ring). The room as it was otherwise.
export function withLamppost(seed, id, room, keep = []) {
  if (lamppostRoom(seed) !== id) return room;
  const r = rng(seedFor(seed, 0) ^ 0x6d4a17b9), g = room.map.map((line) => line.split(''));
  const skip = [room.start, ...keep, ...room.items], open = [];
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++)
    if (g[y][x] === '.' && depthIn(x, y) >= IN && !skip.some((t) => t.x === x && t.y === y)) open.push({ x, y });
  const letter = get('lamppost').letter;
  while (open.length) {
    const at = open.splice(Math.floor(r() * open.length), 1)[0];
    g[at.y][at.x] = letter;
    if (joinedFrom(g, room.start)) return { ...room, map: g.map((row) => row.join('')) };
    g[at.y][at.x] = '.';
  }
  return room;
}
