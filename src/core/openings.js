// § openings: walking off a room's edge into the room beside it (D-171,
// D-197). Plain data, no drawing. Both sides line up: out of one room's
// bottom edge at column x, in at the next room's top edge at column x, and
// so on for each side, in hand-made rooms and generated ones (D-201). The cave
// mouth pairs its own two tiles instead, as the woods and the crypt differ in
// size (mouth.js, D-211). The room left waits, as stairs leave it (stairs.js).
import { sidesOf, tileAt } from './room.js';
import { arrive, fresh } from './stairs.js';
import { mouthSpot } from './mouth.js';

// True when x, y lies outside the room
export const offEdge = (room, x, y) => x < 0 || y < 0 || x >= room.cols || y >= room.rows;

// (state, direction) → the state in the room beyond that edge, the hero on
// its matching edge tile. Null when that edge has no opening there: no room
// beyond, or the matching tile is solid.
export function walkOff(state, dir) {
  const to = sidesOf(state.place, state.seed)[dir];
  if (!to) return null;
  const there = state.elsewhere[to] || fresh(to, state.seed), { cols, rows } = there.room;
  const { x, y } = state.hero;
  const spot = mouthSpot(state.seed, state.place, to) || { up: { x, y: rows - 1 }, down: { x, y: 0 }, left: { x: cols - 1, y }, right: { x: 0, y } }[dir];
  if (tileAt(there.room, spot.x, spot.y).solid) return null;
  return arrive(state, to, there, spot);
}

// § doorways: (place, room, seed) → the edge tiles that walk off into the
// room beside, [{ x, y, dir }], for the line drawn across each (D-225). An
// open edge tile with a room that way is one, but on the cave mouth's way
// only the mouth's own tile, or the gap it leads to, is.
export function doorways(place, room, seed) {
  const out = [], { cols, rows } = room;
  for (const [dir, to] of Object.entries(sidesOf(place, seed))) {
    const only = mouthSpot(seed, to, place);
    const edge = { up: (i) => [i, 0], down: (i) => [i, rows - 1], left: (i) => [0, i], right: (i) => [cols - 1, i] }[dir];
    for (let i = 0; i < (dir === 'up' || dir === 'down' ? cols : rows); i++) {
      const [x, y] = edge(i);
      if (only ? x === only.x && y === only.y : !tileAt(room, x, y).solid) out.push({ x, y, dir });
    }
  }
  return out;
}

// § beyond: (room, doorways) → the room for drawing, past its edge the rock
// or trees going on all around, and floor straight out from each doorway, a
// passage on, but for the cave mouth, which leads down into the rock (D-403).
// Only drawing and light read it; nothing walks there.
const PAST = { up: (d, x, y) => x === d.x && y < 0, down: (d, x, y, r) => x === d.x && y >= r.rows,
  left: (d, x, y) => y === d.y && x < 0, right: (d, x, y, r) => y === d.y && x >= r.cols };
export function widen(room, doors) {
  const fill = room.look === 'woods' ? 'T' : '#', ways = doors.filter((d) => tileAt(room, d.x, d.y).id !== 'caveMouth');
  return { ...room, beyond: (x, y) => (ways.some((d) => PAST[d.dir](d, x, y, room)) ? '.' : fill) };
}
