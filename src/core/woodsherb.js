// § woodsherb: the herb that grows in each woods room (D-762, D-760's gathering, its third find,
// the first of Q-092's plants). Plain data, no drawing. Every Hearthwood room but the north row's
// mountain rooms holds one, home too, on open grass, never on the start, a find already lying
// there, the cave mouth's front or the home waystone's ring. It is the cave herb, the same in
// every way: hurt, walking onto it eats it; at full health it goes into the bag. From its own
// seed, picked last, so the rest of each seed's room stays as it was; none when no tile fits.
// Picked, it grows back after a day as in the caves (regrow.js). An older save lays one in each
// woods room never seen, with nothing taken (reherb.js).
import { rng } from './rng.js';
import { COLS, ROWS } from './cave.js';
import { woodsSeed, isMountain } from './hearthwood.js';

// (seed, id, room, keep) → the room with its herb, when it is a woods room; `keep` the tiles to
// keep clear (the mouth's front, the waystone's ring). The room as it was otherwise.
export function withWoodsHerb(seed, id, room, keep = []) {
  if (isMountain(id)) return room;
  const r = rng(woodsSeed(seed, id) ^ 0x3d4d51cb), skip = [room.start, ...keep, ...room.items], open = [];
  for (let y = 1; y < ROWS - 1; y++) for (let x = 1; x < COLS - 1; x++)
    if (room.map[y][x] === '.' && !skip.some((t) => t.x === x && t.y === y)) open.push({ x, y });
  if (!open.length) return room;
  const at = open[Math.floor(r() * open.length)];
  return { ...room, items: [...room.items, { id: 'herb', x: at.x, y: at.y }] };
}
