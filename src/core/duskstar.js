// § duskstar: the first flower, 2 in each woods room (D-763, D-760's gathering, its fourth find,
// the first of Q-092's flowers). Plain data, no drawing. Every Hearthwood room but the north row's
// mountain rooms holds FLOWERS, home too, each on open grass, never on the start, a find already
// lying there, the cave mouth's front or the home waystone's ring. Each has its own tone (tones.js)
// and faces left or right (`flip`), the seed picking. From its own seed, picked last, so the rest
// of each seed's room stays as it was; fewer when too few tiles fit. Picked, it comes back a day
// later on another grass tile of the room (regrow.js, D-530). An older save lays them in each woods
// room never seen, with nothing taken (restar.js).
import { rng } from './rng.js';
import { COLS, ROWS } from './cave.js';
import { woodsSeed, isMountain } from './hearthwood.js';
import { toned } from './tones.js';

// § how many: duskstars in each woods room (D-763)
export const FLOWERS = 2;

// (seed, id, room, keep) → the room with its duskstars, when it is a woods room; `keep` the tiles
// to keep clear (the mouth's front, the waystone's ring). The room as it was otherwise.
export function withDuskstars(seed, id, room, keep = []) {
  if (isMountain(id)) return room;
  const s = woodsSeed(seed, id), r = rng(s ^ 0x5f356495), skip = [room.start, ...keep, ...room.items], open = [];
  for (let y = 1; y < ROWS - 1; y++) for (let x = 1; x < COLS - 1; x++)
    if (room.map[y][x] === '.' && !skip.some((t) => t.x === x && t.y === y)) open.push({ x, y });
  const flowers = [];
  while (flowers.length < FLOWERS && open.length) {
    const [at] = open.splice(Math.floor(r() * open.length), 1);
    flowers.push({ id: 'duskstar', x: at.x, y: at.y, ...(r() < 0.5 && { flip: true }) });
  }
  return flowers.length ? { ...room, items: [...room.items, ...toned(s, flowers)] } : room;
}
