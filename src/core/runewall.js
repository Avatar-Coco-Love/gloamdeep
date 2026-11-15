// § rune wall: L3, the dark door, step 1 (D-927, D-928). From depth 1, one room a floor the
// seed picks (room.js, runeWallAt) has a rune wall: an ordinary wall tile on the room's edge,
// a front face with plain floor in front of it, its three faint violet runes seen across the
// room only while the lantern is off. Lit, it is a wall like any other. The tile stays a wall
// in the map; the room keeps where it is as `runes` ({ x, y }). The tile behind it is wall on
// every side but the rune wall's, so step 2 can open a nook there. Seen: runesSeen in sight.js.
// Plain data, no drawing.
import { rng } from './rng.js';
import { get } from './registry.js';

export const RUNES_FROM = 1;

// (map, seed) → { x, y } of the rune wall, one of the tiles that fit the seed picks, or null:
// a wall with plain floor below it, and wall behind it with wall on that tile's three other sides
export function runeSpotIn(map, seed) {
  const wall = get('wall').letter, floor = get('floor').letter, at = (x, y) => map[y]?.[x];
  const fits = [];
  for (let y = 2; y < map.length - 1; y++) for (let x = 1; x < map[0].length - 1; x++) {
    if (at(x, y) === wall && at(x, y + 1) === floor && [[x, y - 1], [x - 1, y - 1], [x + 1, y - 1], [x, y - 2]].every(([i, j]) => at(i, j) === wall)) fits.push({ x, y });
  }
  if (!fits.length) return null;
  const r = rng((seed ^ 0x2f6b1d93) >>> 0);
  return fits[Math.floor(r() * fits.length)];
}
