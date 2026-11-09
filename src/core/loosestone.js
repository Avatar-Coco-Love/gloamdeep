// § loosestone: the loose stones lying in each mountain room (D-761, D-760's gathering, its
// second find). Plain data, no drawing. Each of Hearthwood's north row of rooms holds STONES,
// the woods rooms none, each on open grass, never on the start, a find already lying there, the
// cave mouth's front or the home waystone's ring. Each is a plain Stone, the bag's pebble as it
// lies. From its own seed, picked last, so the rest of each seed's room stays as it was; fewer
// when too few tiles fit. Picked, it grows back after a day (regrow.js), as the oilcap outside.
// An older save lays them in each mountain room never seen, with nothing taken (strewn.js).
import { rng } from './rng.js';
import { COLS, ROWS } from './cave.js';
import { woodsSeed, isMountain } from './hearthwood.js';

// § how many: loose stones in each mountain room (D-761)
export const STONES = 2;

// (seed, id, room, keep) → the room with its loose stones, when it is a mountain room; `keep`
// the tiles to keep clear (the mouth's front, the waystone's ring). The room as it was otherwise.
export function withLooseStones(seed, id, room, keep = []) {
  if (!isMountain(id)) return room;
  const r = rng(woodsSeed(seed, id) ^ 0x2c1b3c6d), skip = [room.start, ...keep, ...room.items], open = [];
  for (let y = 1; y < ROWS - 1; y++) for (let x = 1; x < COLS - 1; x++)
    if (room.map[y][x] === '.' && !skip.some((t) => t.x === x && t.y === y)) open.push({ x, y });
  const stones = [];
  while (stones.length < STONES && open.length) {
    const [at] = open.splice(Math.floor(r() * open.length), 1);
    stones.push({ id: 'stone', x: at.x, y: at.y });
  }
  return stones.length ? { ...room, items: [...room.items, ...stones] } : room;
}
