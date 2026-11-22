// § knot: where the knot of gloam holding the spark lies (D-1024; the bump, spark.js). Plain
// data, no drawing; no import of room.js, which lays it. The knot waits in depth 2's room with the stairs up, the
// first cave, which every journey walks: on open floor whose 8 neighbours are all open, so it
// never cuts a way, never on a find, light, creature or person, nor beside the stairs up. It
// stands 2 to 4 steps from the stairs up where it can, else as near as it fits, the seed picking
// among the nearest. From its own seed, placed last, so the rest of each seed's room stays as it
// was.
import { rng } from './rng.js';
import { byLetter, get } from './registry.js';

export const KNOT_DEPTH = 2; // the first cave (D-1024)
export const KNOT = 'gloamKnot';
const NEAR = [2, 4]; // steps from the stairs up, where it can (D-1024)
const AROUND = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
const SIDES = [[0, -1], [0, 1], [-1, 0], [1, 0]];

// Walking steps from `from` over open tiles, as a map 'x,y' → steps
function stepsFrom(map, from) {
  const out = new Map([[`${from.x},${from.y}`, 0]]), queue = [from];
  while (queue.length) {
    const p = queue.shift(), n = out.get(`${p.x},${p.y}`);
    for (const [dx, dy] of SIDES) {
      const x = p.x + dx, y = p.y + dy, k = `${x},${y}`;
      if (y < 0 || y >= map.length || x < 0 || x >= map[y].length || out.has(k) || byLetter(map[y][x])?.solid) continue;
      out.set(k, n + 1); queue.push({ x, y });
    }
  }
  return out;
}
const stairsAt = (ch) => !!byLetter(ch)?.leads;

// § spot: (seed, room) → the knot's tile { x, y }, or null when none fits. `room` holds `map`,
// `start` (the stairs up) and what stands or lies in it: items, lights, enemies, people, hero. A
// tile with all 8 neighbours open is taken first; in a tight cave, any floor tile whose loss leaves
// every other tile reached as before (a dead end's tip, a bend's corner). Those 2 to 4 steps from
// the stairs up come first, wide before tight; else the nearest, wide before tight.
export function knotSpotIn(seed, room) {
  const { map, start } = room, steps = stepsFrom(map, start);
  const things = [start, room.hero, ...(room.items || []), ...(room.lights || []), ...(room.enemies || []), ...(room.people || [])].filter(Boolean);
  const wide = [], tight = [];
  for (let y = 1; y < map.length - 1; y++) for (let x = 1; x < map[y].length - 1; x++) {
    if (map[y][x] !== '.' || !steps.has(`${x},${y}`) || things.some((t) => t.x === x && t.y === y)) continue;
    if (AROUND.some(([dx, dy]) => stairsAt(map[y + dy][x + dx]) || (start.x === x + dx && start.y === y + dy))) continue;
    const at = { x, y, n: steps.get(`${x},${y}`) };
    if (!AROUND.some(([dx, dy]) => byLetter(map[y + dy][x + dx])?.solid)) wide.push(at);
    else tight.push(at);
  }
  const isNear = (f) => f.n >= NEAR[0] && f.n <= NEAR[1], safe = (t) => cutsNothing(map, start, t, steps.size);
  const nearest = (fits) => { const least = Math.min(...fits.map((f) => f.n)); return fits.filter((f) => f.n <= least + 2); };
  const tightSafe = () => tight.filter(safe);
  const pool = [wide.filter(isNear), tight.filter(isNear).filter(safe)].find((l) => l.length)
    || (wide.length ? nearest(wide) : tightSafe().length ? nearest(tightSafe()) : null);
  if (!pool) return null;
  const r = rng((seed ^ 0x7f4a7c15) >>> 0), at = pool[Math.floor(r() * pool.length)];
  return { x: at.x, y: at.y };
}
// Whether every tile reached from `start` is still reached with tile t solid
function cutsNothing(map, start, t, reached) {
  const walled = map.map((line, y) => (y === t.y ? line.slice(0, t.x) + '#' + line.slice(t.x + 1) : line));
  return stepsFrom(walled, start).size === reached - 1;
}

// § laid: (seed, room) → the room with the knot laid at its spot, or as it was when none fits
export function withKnot(seed, room) {
  const at = knotSpotIn(seed, room);
  if (!at) return room;
  const letter = get(KNOT).letter, map = room.map.map((line, y) => (y === at.y ? line.slice(0, at.x) + letter + line.slice(at.x + 1) : line));
  return { ...room, map };
}

