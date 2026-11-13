// § vault: L1, the braziers and the sealed vault (D-891, D-892). From depth 2, one dead-end room a
// floor, a one-cell room with one opening, is laid out as a vault instead of a cave: an outer
// room with 2 cold braziers, and a wall with the sealed door in its middle, the small vault 3
// tiles deep behind it, on the side away from the opening. Two layouts, checked by hand: the
// vault above or below for an opening at the top or bottom, beside for one at the left or
// right; from depth 8 the same, the outer room bigger with the bigger cell (D-892). The gap
// in the edge stands wherever the opening is. Nothing else lies in it: no creatures, finds or
// cache (D-892). Drawn in the crypt's bricks wherever it stands (D-891). No floor without a
// one-cell dead end has a vault (D-892). Plain data, no drawing.
import { rng } from './rng.js';
import { get } from './registry.js';

export const VAULT_FROM = 2;
const DEEP = 3; // the vault behind the door, in tiles, the same at every size

// (cells, seed, depth, taken) → the id of the floor's vault room, or null: one of the one-cell
// dead ends the seed picks, never a room in `taken` (the peddler's, the locket's, a waystone's)
export function vaultRoomOf(cells, seed, depth, taken = []) {
  if (depth < VAULT_FROM) return null;
  const ends = cells.filter((c) => c.end && c.w === 1 && c.h === 1 && !taken.includes(c.id));
  if (!ends.length) return null;
  const r = rng((seed ^ 0x7a3d1e5b) >>> 0);
  return ends[Math.floor(r() * ends.length)].id;
}

// § prize (L1 step 4, D-896): the one prize the seed draws for a vault (D-891), 1 vault in 4 an
// ember, the rest 2 of a rare material, the seed picking one of the 7 alike: { id, n }
export const EMBER_IN = 4;
export const RARE = ['venomSac', 'mimicHeart', 'gloamEye', 'batFang', 'moleClaw', 'oilBladder', 'glowGland'];
export const RARE_N = 2;
export function prizeOf(seed) {
  const r = rng((seed ^ 0x51c3a9e7) >>> 0);
  return r() < 1 / EMBER_IN ? { id: 'ember', n: 1 } : { id: RARE[Math.floor(r() * RARE.length)], n: RARE_N };
}
// The plinth's tile for a prize: an ember's own, which glows, or the one a material lies on
export const plinthFor = (prize) => get(prize.id === 'ember' ? 'plinthEmber' : 'plinth');

// (cols, rows, door) → the vault's tiles, for its one opening `door` ({ dir, at }), as
// { map, start, braziers, seal, prize }: `start` the tile just inside the opening, `seal` the
// sealed door, `prize` the tile at the heart of the vault, where its plinth stands (vaultRoom)
export function vaultLayout(cols, rows, door) {
  const g = Array.from({ length: rows }, (_, y) => Array.from({ length: cols }, (_, x) => (x === 0 || y === 0 || x === cols - 1 || y === rows - 1 ? '#' : '.')));
  const along = door.dir === 'up' || door.dir === 'down';
  let seal, prize, braziers;
  if (along) { // the vault above the wall row, for an opening at the bottom; flipped for the top
    const mid = Math.floor(cols / 2), wallY = DEEP + 1;
    seal = { x: mid, y: wallY }; prize = { x: mid, y: Math.ceil(DEEP / 2) };
    braziers = [{ x: 2, y: wallY + 2 }, { x: cols - 3, y: wallY + 2 }];
    for (let x = 1; x < cols - 1; x++) g[wallY][x] = '#';
  } else { // the vault right of the wall column, for an opening at the left; mirrored for the right
    const mid = Math.floor(rows / 2), wallX = cols - 2 - DEEP, outerMid = Math.floor(wallX / 2);
    seal = { x: wallX, y: mid }; prize = { x: wallX + Math.ceil(DEEP / 2), y: mid };
    braziers = [{ x: outerMid, y: 3 }, { x: outerMid, y: rows - 4 }];
    for (let y = 1; y < rows - 1; y++) g[y][wallX] = '#';
  }
  const flip = door.dir === 'up' ? (t) => ({ x: t.x, y: rows - 1 - t.y }) : door.dir === 'right' ? (t) => ({ x: cols - 1 - t.x, y: t.y }) : (t) => t;
  const turned = (door.dir === 'up' ? g.slice().reverse() : door.dir === 'right' ? g.map((row) => row.slice().reverse()) : g).map((row) => row.slice());
  seal = flip(seal); prize = flip(prize); braziers = braziers.map(flip);
  turned[seal.y][seal.x] = get('sealedDoor').letter;
  for (const b of braziers) turned[b.y][b.x] = get('brazier').letter;
  const edge = { up: { x: door.at, y: 0 }, down: { x: door.at, y: rows - 1 }, left: { x: 0, y: door.at }, right: { x: cols - 1, y: door.at } }[door.dir];
  const start = { up: { x: door.at, y: 1 }, down: { x: door.at, y: rows - 2 }, left: { x: 1, y: door.at }, right: { x: cols - 2, y: door.at } }[door.dir];
  turned[edge.y][edge.x] = '.';
  return { map: turned.map((row) => row.join('')), start, braziers, seal, prize };
}

// (cell) → the vault room as a generated room is: its map, where the hero starts, nothing in it
// but the plinth at its heart, and the `prize` on it, drawn from the cell's seed (D-896)
export function vaultRoom(cell) {
  const { map, start, prize: at } = vaultLayout(cell.cols, cell.rows, cell.doors[0]), prize = prizeOf(cell.seed);
  const row = map[at.y], placed = map.map((r, y) => (y === at.y ? row.slice(0, at.x) + plinthFor(prize).letter + row.slice(at.x + 1) : r));
  return { map: placed, start, lights: [], items: [], enemies: [], people: [], prize };
}

// § open and cold (D-895): (room) → the room with its sealed door sunk open once no brazier in it
// is cold, the braziers burning on for good; else the same room
export function openVault(room) {
  const cold = get('brazier').letter, sealed = get('sealedDoor').letter;
  if (!room.map.some((row) => row.includes(sealed)) || room.map.some((row) => row.includes(cold))) return room;
  return { ...room, map: room.map.map((row) => row.split(sealed).join(get('openDoor').letter)) };
}
// (room) → the room as the hero leaves it: a vault still sealed has its lit braziers go cold
// again, so it can never lock anyone out (rule 5, D-891); an open one, and any other, the same.
// The oil spent stays spent.
export function coolVault(room) {
  const lit = get('brazierLit').letter, sealed = get('sealedDoor').letter;
  if (!room.map.some((row) => row.includes(sealed)) || !room.map.some((row) => row.includes(lit))) return room;
  return { ...room, map: room.map.map((row) => row.split(lit).join(get('brazier').letter)) };
}
