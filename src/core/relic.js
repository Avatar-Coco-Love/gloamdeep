// § relic: biome 1's first relic, the Lightkeeper's Locket (D-691), lies in one room at
// depth 4, on the open tile farthest to walk from the way in that is free, with a rat
// beside it guarding it, as the rat guards a flask. Left once, never grows back. Placed
// last, from its own draws, so the rest of a seed's room stays where it was. Which room
// is picked in room.js (`locketRoom`). Plain data, no drawing.
import { rng, int } from './rng.js';
import { steps } from './cache.js';

export const RELIC_GUARD = 'rat'; // Claude's draft the owner may change (D-691)
const same = (a, b) => a.x === b.x && a.y === b.y;
const AROUND = [[1, 0], [-1, 0], [0, 1], [0, -1]];

// (seed, room, id) → the room with relic `id` and its guard, or the room as it was when
// no free tile has a free tile beside it
export function withRelic(seed, room, id = 'locket') {
  const r = rng(seed ^ 0x3c6ef372), map = room.map, rows = map.length, cols = map[0].length;
  const things = [room.start, ...room.items, ...room.enemies, ...(room.people || [])].filter(Boolean);
  const free = (x, y) => x > 0 && y > 0 && x < cols - 1 && y < rows - 1 && map[y][x] === '.' && !things.some((o) => same(o, { x, y }));
  const far = [...steps(map, room.start)].map(([k, n]) => { const [x, y] = k.split(',').map(Number); return { x, y, n }; })
    .filter((t) => free(t.x, t.y)).sort((a, b) => b.n - a.n);
  for (const at of far) {
    const beside = AROUND.map(([dx, dy]) => ({ x: at.x + dx, y: at.y + dy })).filter((t) => free(t.x, t.y));
    if (!beside.length) continue;
    const guard = beside[int(r, 0, beside.length - 1)];
    return { ...room, items: [...room.items, { id, x: at.x, y: at.y, once: true }], enemies: [...room.enemies, { id: RELIC_GUARD, x: guard.x, y: guard.y }] };
  }
  return room;
}
