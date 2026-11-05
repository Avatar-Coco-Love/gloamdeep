// § draft: where the motes drift (D-581, D-605). Plain data, no drawing.
// Straight across the whole floor at its nearest stairs down, through walls,
// like a draft through the stone; nothing once any of the floor's stairs down
// is remembered, or the floor has none (not counting the far side of the cave mouth).
import { depthOf } from './room.js';
import { partPlan, downsOf } from './map.js';

// The floor's rooms laid out from this room, each with its stairs down, worked out once per seed and room
const laid = new Map();
function layout(state) {
  const k = `${state.seed}:${state.place}`;
  if (!laid.has(k)) {
    const { rooms, hero } = partPlan(state, true, depthOf(state.place), state.place);
    const here = { x: hero.x - state.hero.x, y: hero.y - state.hero.y };
    laid.set(k, rooms.map(({ id, x, y, room }) => ({ id, x: x - here.x, y: y - here.y, downs: downsOf(room) })));
  }
  return laid.get(k);
}

// (state) → the nearest stairs down as a tile { x, y } in this room's own
// tiles (maybe outside it), or null when there is no draft
export function draftTo(state) {
  const known = (id) => (id === state.place ? state : state.elsewhere[id]);
  let best = null, bd = Infinity;
  for (const { id, x, y, downs } of layout(state)) {
    const seen = known(id)?.seen, cols = known(id)?.room.cols;
    for (const d of downs) {
      if (seen?.[d.y * cols + d.x]) return null;
      const tx = x + d.x, ty = y + d.y, dd = (tx - state.hero.x) ** 2 + (ty - state.hero.y) ** 2;
      if (dd < bd) { bd = dd; best = { x: tx, y: ty }; }
    }
  }
  return best;
}
