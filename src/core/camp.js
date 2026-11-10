// § camp: where the surface's one miners' camp stands (D-770, the second landmark). Plain data,
// no drawing. One of Hearthwood's 3 mountain rooms holds it, the seed picking the room, never the
// campfire's or the lamppost's, so each room holds about one thing (D-757); one of the 3 is always
// free. It is 3 × 2 tiles, all solid, light passing them, as the campfire: the pick's tiles until
// the pick is taken, then the bare camp's. In its room it stands on open grass, every tile at least
// IN tiles in from the edge, never on the start, a find, the cave mouth's front or the home
// waystone's ring, and never cuts the room in two. From its own seed, picked last, so the rest of
// each seed's room stays as it was; none when no spot fits. An older save stands it in its room if
// never seen, with nothing taken (recamp.js).
import { rng, int, seedFor } from './rng.js';
import { COLS, ROWS } from './cave.js';
import { joinedFrom, depthIn } from './woods.js';
import { ROOMS, isMountain } from './hearthwood.js';
import { get } from './registry.js';
import { campfireOf } from './campfire.js';
import { lamppostRoom } from './lamppost.js';

// § size: how wide and tall it is, in tiles; how many tiles in from the room's edge it stands
export const WIDE = 3, HIGH = 2, IN = 2;

// (seed) → the room it stands in: a mountain room, never the campfire's or the lamppost's
export function campRoom(seed) {
  const taken = [campfireOf(seed).room, lamppostRoom(seed)], rooms = ROOMS.filter((id) => isMountain(id) && !taken.includes(id));
  const r = rng(seedFor(seed, 0) ^ 0x5e3b7a21);
  return rooms[int(r, 0, rooms.length - 1)];
}

// (x, y) → its tiles, top-left at x, y
export const campTiles = (x, y) => Array.from({ length: WIDE * HIGH }, (_, i) => ({ x: x + (i % WIDE), y: y + Math.floor(i / WIDE) }));

// (seed, id, room, keep) → the room with its camp, when it is the camp's room; `keep` the tiles
// to keep clear (the mouth's front, the waystone's ring). The room as it was otherwise.
export function withCamp(seed, id, room, keep = []) {
  if (campRoom(seed) !== id) return room;
  const r = rng(seedFor(seed, 0) ^ 0x1f6c9d47), g = room.map.map((line) => line.split(''));
  const skip = [room.start, ...keep, ...room.items];
  const free = (t) => g[t.y]?.[t.x] === '.' && depthIn(t.x, t.y) >= IN && !skip.some((s) => s.x === t.x && s.y === t.y);
  const open = [];
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (campTiles(x, y).every(free)) open.push({ x, y });
  const letter = get('minersCamp').letter;
  while (open.length) {
    const at = open.splice(Math.floor(r() * open.length), 1)[0], tiles = campTiles(at.x, at.y);
    for (const t of tiles) g[t.y][t.x] = letter;
    if (joinedFrom(g, room.start)) return { ...room, map: g.map((row) => row.join('')) };
    for (const t of tiles) g[t.y][t.x] = '.';
  }
  return room;
}

// (room, x, y) → the top-left tile of the camp the tile at x, y is part of: left and up while the
// tile there is the camp's, with the pick or bare
export function campCorner(room, x, y) {
  const letters = [get('minersCamp').letter, get('minersCampBare').letter], is = (i, j) => letters.includes(room.map[j]?.[i]);
  while (is(x - 1, y)) x--;
  while (is(x, y - 1)) y--;
  return { x, y };
}
