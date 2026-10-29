// § openings: walking off a room's edge into the room beside it (D-171,
// D-197). Plain data, no drawing. Both sides line up: out of one room's
// bottom edge at column x, in at the next room's top edge at column x, and
// so on for each side, in hand-made rooms and generated ones (D-201). The cave
// mouth pairs its own two tiles instead, as the woods and the crypt differ in
// size (mouth.js, D-211). The room left waits, as stairs leave it (stairs.js).
import { sidesOf, tileAt, letterAt } from './room.js';
import { arrive, fresh } from './stairs.js';
import { mouthSpot, mouthOf, mouthSides } from './mouth.js';

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

// § beyond: (room, doorways, past) → the room for drawing, past its edge the rock
// or trees going on all around, and floor straight out from each doorway, a
// passage on, but for the cave mouth, which leads down into the rock (D-403).
// `past` (outside below), when given, takes the whole side past its doorway:
// the woods room's own tiles there, and trees past its edges (D-438).
// Only drawing and light read it; nothing walks there.
const PAST = { up: (d, x, y) => x === d.x && y < 0, down: (d, x, y, r) => x === d.x && y >= r.rows,
  left: (d, x, y) => y === d.y && x < 0, right: (d, x, y, r) => y === d.y && x >= r.cols };
export function widen(room, doors, past = null) {
  const fill = room.look === 'woods' ? 'T' : '#', ways = doors.filter((d) => tileAt(room, d.x, d.y).id !== 'caveMouth');
  const out = (x, y) => (ways.some((d) => PAST[d.dir](d, x, y, room)) ? '.' : fill);
  if (!past) return { ...room, beyond: out };
  const there = past.there.room, onSide = SIDE[past.dir];
  const woods = (x, y) => (x < 0 || y < 0 || x >= there.cols || y >= there.rows ? 'T' : there.map[y][x]);
  const wide = { ...room, beyond: (x, y) => (onSide(x, y, room) ? woods(x - past.x, y - past.y) : out(x, y)) };
  // `seenFrom`: the woods as a light in this room sees them, in the woods' own tiles: this
  // room where it lies, its rock or brick around it, and trees past the woods' edges (light.js)
  const seenFrom = { ...there, beyond: (x, y) => (onSide(x + past.x, y + past.y, room) ? 'T' : letterAt(wide, x + past.x, y + past.y)) };
  return Object.assign(wide, { past: { ...past, seenFrom } });
}

// § outside (D-438): (state) → past the crypt's doorway that leads out, the
// woods room itself as it is now: { dir, x, y, there }, `dir` the way out
// through the doorway, x, y the woods' top-left in this room's tiles, placed so
// its cave mouth lies just past the doorway, and `there` the woods as they
// wait in `state.elsewhere` (tiles, items, memory), or as they begin if never
// visited. Null in any other room. Plain data, for drawing and light.
export const SIDE = { up: (x, y) => y < 0, down: (x, y, r) => y >= r.rows, left: (x) => x < 0, right: (x, y, r) => x >= r.cols };
const STEP = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const begun = new Map(); // the woods as they begin, by seed, made once
export function outside(state) {
  const m = mouthOf(state.seed);
  if (state.place !== m.room || state.place === 'woods') return null;
  const dir = Object.keys(mouthSides(m.room, state.seed))[0], [dx, dy] = STEP[dir];
  if (!begun.has(state.seed)) begun.set(state.seed, fresh('woods', state.seed));
  const there = state.elsewhere.woods || begun.get(state.seed);
  return { dir, x: m.gap.x + dx - m.tile.x, y: m.gap.y + dy - m.tile.y, there };
}
