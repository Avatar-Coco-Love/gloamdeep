// § woodscap: the oilcap that grows in each woods room (D-760, D-757's gathering, its first
// find). Plain data, no drawing. Every Hearthwood room but the north row's mountain rooms holds
// one, home too, on open grass beside a tree (a tree straight beside it, not a corner), never on
// the start, a stick, the cave mouth's front or the home waystone's ring. It lies on the grass, so
// it never cuts the room. From its own seed, picked last, so the rest of each seed's room stays as
// it was; none when no tile fits. Picked, it grows back after a day as in the caves (regrow.js),
// with its own tone (tones.js).
import { rng } from './rng.js';
import { COLS, ROWS } from './cave.js';
import { woodsSeed, isMountain } from './hearthwood.js';
import { toned } from './tones.js';

// § beside: the tree it grows beside, straight up, down, left or right
const SIDES = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const TREE = 'T';

// (map, x, y) → whether a tree stands straight beside tile x, y
export const besideTree = (map, x, y) => SIDES.some(([dx, dy]) => map[y + dy]?.[x + dx] === TREE);

// (seed, id, room, keep) → the room with its oilcap, when it is a woods room; `keep` the tiles to
// keep clear (the mouth's front, the waystone's ring). The room as it was otherwise.
export function withWoodscap(seed, id, room, keep = []) {
  if (isMountain(id)) return room;
  const s = woodsSeed(seed, id), r = rng(s ^ 0x1b873593), skip = [room.start, ...keep, ...room.items], open = [];
  for (let y = 1; y < ROWS - 1; y++) for (let x = 1; x < COLS - 1; x++)
    if (room.map[y][x] === '.' && besideTree(room.map, x, y) && !skip.some((t) => t.x === x && t.y === y)) open.push({ x, y });
  if (!open.length) return room;
  const at = open[Math.floor(r() * open.length)];
  return { ...room, items: [...room.items, ...toned(s, [{ id: 'oilcap', x: at.x, y: at.y }])] };
}
