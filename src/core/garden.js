// § garden: a planted seed grows (garden step 4, D-567). Each planted garden bed keeps the
// turn it was planted, keyed by its room and tile the chest's way (`planted`). Every turn
// counts, on the surface too, so the plant grows while the hero is near it or away. A tile
// with `grows` becomes its `into` tile `turns` after planting; in a room just come into,
// what grew while the hero was away is already there. A planted bed with no kept turn (an
// older save) starts its clock now. Plain data, no drawing.
import { get } from './registry.js';
import { tileAt, withTile } from './room.js';

const keyOf = (state, x, y) => `${state.place}:${x},${y}`;

// (state, x, y) → the state with the bed at x, y planted on this turn
export const sow = (state, x, y) => ({ ...state, planted: { ...state.planted, [keyOf(state, x, y)]: state.turn } });

// (state, x, y) → the state without the bed at x, y's planting, once it is taken down
export function unsow(state, x, y) {
  const key = keyOf(state, x, y);
  if (!state.planted || !(key in state.planted)) return state;
  const { [key]: _gone, ...planted } = state.planted;
  return { ...state, planted };
}

// (state) → the state with every planted bed in this room whose time is up grown
export function grow(state) {
  const { room } = state;
  let now = state;
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
    const grows = tileAt(room, x, y).grows;
    if (!grows) continue;
    const at = now.planted?.[keyOf(state, x, y)];
    if (at === undefined) now = sow(now, x, y);
    else if (state.turn - at >= grows.turns) now = { ...unsow(now, x, y), room: withTile(now.room, x, y, get(grows.into)) };
  }
  return now;
}

// (state) → the state with every planted bed's time up, for the dev panel's Grow (D-567);
// the beds in this room grow at once, the rest when the hero next comes to them
export function growAll(state) {
  const sown = grow(state), long = state.turn - 1e9; // a number that keeps in a save, unlike -Infinity
  return grow({ ...sown, planted: Object.fromEntries(Object.keys(sown.planted || {}).map((k) => [k, long])) });
}
