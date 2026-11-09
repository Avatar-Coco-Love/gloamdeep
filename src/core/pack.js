// § pack: the rat pack (D-727). From depth 3, about 1 made room in 3, from the room's seed,
// the rat by the room's first flask has 2 packmates, on top of the room's creatures. They
// stand within 2 tiles of it, out of the torch's light and 3 tiles from the stairs, by the
// guard's rules; with no room for both, the rat stays alone. All three carry the same `pack`
// mark. Its own draws, placed after the rest, so the rest of a seed's room stays where it
// was. Plain data, no drawing. How a pack acts is in creatureturn.js.
import { rng, pick } from './rng.js';

export const PACK_FROM = 3, PACK_ODDS = 1 / 3, PACKMATES = 2, PACK_NEAR = 2;
const same = (a, b) => a.x === b.x && a.y === b.y;
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const draws = (seed) => rng(seed ^ 0x71374491); // its own salt, apart from the flask mimic's (D-742, T1)

// (seed, depth) → whether a made room at that depth holds a pack
export const packOf = (seed, depth) => depth >= PACK_FROM && draws(seed)() < PACK_ODDS;

// (seed, room, depth) → the room, its flask's rat given 2 packmates when the seed says so
export function withPack(seed, room, depth) {
  if (!packOf(seed, depth)) return room;
  const flask = room.items.find((i) => i.id === 'flask');
  const lead = flask && room.enemies.findIndex((e) => e.id === 'rat' && dist(e, flask) <= PACK_NEAR);
  if (!flask || lead < 0) return room; // its guard went elsewhere (D-725)
  const rat = room.enemies[lead], map = room.map, rows = map.length, cols = map[0].length;
  const torch = room.lights.find((l) => l.id === 'torch');
  const downs = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if (map[y][x] === '>') downs.push({ x, y });
  const busy = [room.start, ...room.items, ...room.enemies, ...(room.people || [])].filter(Boolean);
  const spots = [];
  for (let y = 1; y < rows - 1; y++) for (let x = 1; x < cols - 1; x++) {
    const t = { x, y };
    if (map[y][x] === '.' && dist(t, rat) <= PACK_NEAR && dist(t, room.start) >= 3 && (!torch || dist(t, torch) >= 5) &&
      downs.every((d) => dist(t, d) >= 3) && !busy.some((o) => same(o, t))) spots.push(t);
  }
  if (spots.length < PACKMATES) return room;
  const r = draws(seed ^ 0x9b05688c), mates = [];
  while (mates.length < PACKMATES) { const t = pick(r, spots.filter((s) => !mates.some((m) => same(m, s)))); mates.push({ id: 'rat', x: t.x, y: t.y, pack: 1 }); }
  const enemies = room.enemies.map((e, i) => (i === lead ? { ...e, pack: 1 } : e));
  return { ...room, enemies: [...enemies, ...mates] };
}
