// § openings: walking off a room's edge into the room beside it (D-171,
// D-197). Plain data, no drawing. Both sides line up: out of one room's
// bottom edge at column x, in at the next room's top edge at column x, and
// so on for each side, in hand-made rooms and generated ones (D-201); a
// generated room of more cells has a room beyond each cell's stretch of edge,
// the column or row moved to match (region.js, D-645). The cave
// mouth pairs its own two tiles instead, as the woods and the crypt differ in
// size (mouth.js, D-211). The room left waits, as stairs leave it (stairs.js).
import { sideAt, tileAt } from './room.js';
import { arrive, fresh } from './stairs.js';
import { mouthSpot } from './mouth.js';
import { rockGoesOn } from './mountain.js';

// True when x, y lies outside the room
export const offEdge = (room, x, y) => x < 0 || y < 0 || x >= room.cols || y >= room.rows;

// (state, direction) → the state in the room beyond that edge, the hero on
// its matching edge tile. Null when that edge has no opening there: no room
// beyond, or the matching tile is solid.
export function walkOff(state, dir) {
  const { x, y } = state.hero, side = sideAt(state.place, state.seed, dir, dir === 'up' || dir === 'down' ? x : y);
  if (!side) return null;
  const { to, along } = side, there = state.elsewhere[to] || fresh(to, state.seed), { cols, rows } = there.room;
  const spot = mouthSpot(state.seed, state.place, to) || { up: { x: along, y: rows - 1 }, down: { x: along, y: 0 }, left: { x: cols - 1, y: along }, right: { x: 0, y: along } }[dir];
  if (tileAt(there.room, spot.x, spot.y).solid) return null;
  return arrive(state, to, there, spot);
}

// § doorways: (place, room, seed) → the edge tiles that walk off into the
// room beside, [{ x, y, dir }], for the line drawn across each (D-225). An
// open edge tile with a room that way is one, but on the cave mouth's way
// only the mouth's own tile, or the gap it leads to, is.
export function doorways(place, room, seed) {
  const out = [], { cols, rows } = room;
  for (const dir of ['up', 'down', 'left', 'right']) {
    const edge = { up: (i) => [i, 0], down: (i) => [i, rows - 1], left: (i) => [0, i], right: (i) => [cols - 1, i] }[dir];
    for (let i = 0; i < (dir === 'up' || dir === 'down' ? cols : rows); i++) {
      const side = sideAt(place, seed, dir, i);
      if (!side) continue;
      const [x, y] = edge(i), only = mouthSpot(seed, side.to, place);
      if (only ? x === only.x && y === only.y : !tileAt(room, x, y).solid) out.push({ x, y, dir });
    }
  }
  return out;
}

// § beyond: (room, doorways) → the room for drawing, past its edge the rock
// or trees going on all around, and floor straight out from each doorway, a
// passage on, but for the cave mouth, which leads down into the rock (D-403).
// Past a mountain room's edge, rock goes on, not trees (D-738).
// Only drawing and light read it; nothing walks there.
const PAST = { up: (d, x, y) => x === d.x && y < 0, down: (d, x, y, r) => x === d.x && y >= r.rows,
  left: (d, x, y) => y === d.y && x < 0, right: (d, x, y, r) => y === d.y && x >= r.cols };
export function widen(room, doors) {
  const fill = rockGoesOn(room) ? 'R' : room.look === 'woods' ? 'T' : '#', ways = doors.filter((d) => tileAt(room, d.x, d.y).id !== 'caveMouth');
  return { ...room, beyond: (x, y) => (ways.some((d) => PAST[d.dir](d, x, y, room)) ? '.' : fill) };
}
