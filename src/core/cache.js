// § cache: the last room of each side branch, a dead end, holds a cache (D-650):
// 2 or 3 extra finds from today's list, grouped together in the room's far corner,
// the open tile farthest to walk from the way in and the free tiles around it
// (diagonals count). Each is left once and never grows back (`once`, as at W2).
// Placed last, from its own draws, so the rest of a seed's room stays where it was.
// Plain data, no drawing.
import { rng, int, pick } from './rng.js';
import { toned } from './tones.js';

export const CACHE_COUNT = [2, 3];
export const CACHE_FINDS = ['flask', 'herb', 'oilcap', 'heartcap'];
const NEAR = 2; // how far from the far tile the finds may spread
const same = (a, b) => a.x === b.x && a.y === b.y;

// Steps from `from` to every floor tile, by "x,y"
export function steps(map, from) {
  const out = new Map([[`${from.x},${from.y}`, 0]]), queue = [from];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = { x: t.x + dx, y: t.y + dy }, k = `${n.x},${n.y}`;
      if (map[n.y]?.[n.x] !== '.' || out.has(k)) continue;
      out.set(k, out.get(`${t.x},${t.y}`) + 1); queue.push(n);
    }
  }
  return out;
}

// (seed, room) → the room with its cache, or the room as it was when no tile is free
export function withCache(seed, room) {
  const r = rng(seed ^ 0x1f83d9ab), map = room.map, rows = map.length, cols = map[0].length;
  const things = [room.start, ...room.items, ...room.enemies, ...(room.people || [])].filter(Boolean);
  const free = (x, y) => x > 0 && y > 0 && x < cols - 1 && y < rows - 1 && map[y][x] === '.' && !things.some((o) => same(o, { x, y }));
  const far = steps(map, room.start);
  let heart = null, most = -1;
  for (const [k, n] of far) { const [x, y] = k.split(',').map(Number); if (n > most && free(x, y)) { most = n; heart = { x, y }; } }
  if (!heart) return room;
  const count = int(r, CACHE_COUNT[0], CACHE_COUNT[1]), finds = [];
  const taken = (x, y) => finds.some((f) => same(f, { x, y }));
  for (let n = 0; n <= NEAR && finds.length < count; n++) {
    const spots = [];
    for (let y = heart.y - n; y <= heart.y + n; y++) for (let x = heart.x - n; x <= heart.x + n; x++) {
      if (Math.max(Math.abs(x - heart.x), Math.abs(y - heart.y)) === n && free(x, y) && !taken(x, y) && far.has(`${x},${y}`)) spots.push({ x, y });
    }
    while (spots.length && finds.length < count) {
      const at = spots.splice(int(r, 0, spots.length - 1), 1)[0];
      finds.push({ id: pick(r, CACHE_FINDS), x: at.x, y: at.y, once: true });
    }
  }
  return { ...room, items: [...room.items, ...toned(seed, finds)] };
}
