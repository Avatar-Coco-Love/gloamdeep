// § guano: a pile of Bat Guano beside each bat as a room is made (D-539, D-540), as
// each flask has its rat. Each goes on an open floor tile next to its bat (diagonals
// count), or 2 steps off when none is free, off the room's edge, never on the way in
// or where anything lies, stands or starts. Placed last, from its own draws, so the
// rest of a seed's room stays where it was. Taken, it grows back (regrow.js).
// Plain data, no drawing.
import { rng, pick } from './rng.js';

export const GUANO_NEAR = 2;
const same = (a, b) => a.x === b.x && a.y === b.y;

// (seed, room) → the room with a pile by each bat that has a free tile near it
export function withGuano(seed, room) {
  const bats = room.enemies.filter((e) => e.id === 'bat');
  if (!bats.length) return room;
  const r = rng(seed ^ 0x6a09e667), rows = room.map.length, cols = room.map[0].length;
  const things = [room.start, ...room.items, ...room.enemies, ...(room.people || [])].filter(Boolean);
  const piles = [];
  const open = (x, y) => x > 0 && y > 0 && x < cols - 1 && y < rows - 1 && room.map[y][x] === '.'
    && ![...things, ...piles].some((o) => same(o, { x, y }));
  for (const bat of bats) {
    for (let n = 1; n <= GUANO_NEAR; n++) {
      const spots = [];
      for (let y = bat.y - n; y <= bat.y + n; y++) for (let x = bat.x - n; x <= bat.x + n; x++) {
        if (Math.max(Math.abs(x - bat.x), Math.abs(y - bat.y)) === n && open(x, y)) spots.push({ x, y });
      }
      if (spots.length) { const at = pick(r, spots); piles.push({ id: 'batGuano', x: at.x, y: at.y }); break; }
    }
  }
  return piles.length ? { ...room, items: [...room.items, ...piles] } : room;
}
