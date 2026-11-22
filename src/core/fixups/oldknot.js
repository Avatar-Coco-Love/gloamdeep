// § oldknot: a save from before the spark (0.3.460, D-1024). Once, as the save is brought up to
// date (save.js), the spark is not yet freed, and depth 2's room with the stairs up, if the journey
// already holds it, gets the knot laid at the seed's spot in its kept map, where it fits as a new
// game lays it (knot.js): what stands or lies there now, the hero too, kept clear. Where nothing
// fits, the spark is freed, so no journey goes without it. Rooms never entered are made fresh, the
// knot in its place. Plain data, no drawing.
import { placeAt, placeFor } from '../room.js';
import { cellOf } from '../region.js';
import { KNOT_DEPTH, knotSpotIn } from '../knot.js';
import { get } from '../registry.js';

export function withOldKnot(s) {
  const id = placeAt(KNOT_DEPTH), here = s.place === id, p = here ? s : s.elsewhere?.[id];
  if (!p?.room) return { ...s, spark: false };
  const cell = cellOf(s.seed, id, KNOT_DEPTH), { start } = placeFor(id, s.seed);
  const at = cell && knotSpotIn(cell.seed, { map: p.room.map, start, hero: here ? s.hero : null, items: p.items, lights: p.lights, enemies: p.enemies, people: p.people });
  if (!at) return { ...s, spark: true };
  const letter = get('gloamKnot').letter, map = p.room.map.map((line, y) => (y === at.y ? line.slice(0, at.x) + letter + line.slice(at.x + 1) : line));
  const out = { ...p, room: { ...p.room, map } };
  return here ? { ...s, room: out.room, spark: false } : { ...s, spark: false, elsewhere: { ...s.elsewhere, [id]: out } };
}
