// § nightfall: night creatures come out in the woods (D-778, D-760's last step, its first
// creature; the bat the second, D-779; the rare gloamling the third, D-780). Plain data, no drawing. In each woods room round home,
// never home and never a mountain room, one of each night kind comes out each night: once daylight stops lighting the room
// (halfway through dusk), on an open grass tile off the edge, free and out of the hero's sight,
// picked by the seed and the night. The room notes the night it came (`night`), so one beaten
// stays beaten till the next night. Halfway through dawn, as daylight lights the room again,
// any still standing are gone. In a room come into by day, they went while the hero was away.
import { daylight, DAY_TURNS } from './daytime.js';
import { ROUND_HOME, woodsSeed } from './hearthwood.js';
import { tileAt } from './room.js';
import { litAt } from './sight.js';
import { rng, pick, seedFor } from './rng.js';

// § kinds: what comes out each night, one of each, in each room
export const NIGHT_KINDS = ['lampmoth', 'bat']; // a night bat leaves no guano: that lies only by a bat a room is made with (D-779)
// The rare one: a gloamling, in one woods room round home a night, picked by the seed and the
// night, beside that room's lampmoth and bat (D-780)
export const RARE_KIND = 'gloamling';
export const rareRoom = (seed, n) => pick(rng(seedFor(seedFor(seed, 0) ^ 0x2c1b3c6d, n + 1)), ROUND_HOME);

// The night a turn falls in: the day's own number, as all its dark lies inside one day (D-217)
export const nightOf = (turn) => Math.floor(turn / DAY_TURNS);
// Whether daylight no longer lights the room: from halfway through dusk to halfway through dawn
export const darkOut = (turn) => daylight(turn) < 0.5;

// (state) → the state with tonight's creatures out, or last night's gone by day; the same state
// when nothing changes, or no tile fits yet (it waits for the next turn)
export function nightfall(state) {
  if (!ROUND_HOME.includes(state.place)) return state;
  if (!darkOut(state.turn)) {
    return state.enemies.some((e) => e.night) ? { ...state, enemies: state.enemies.filter((e) => !e.night) } : state;
  }
  const n = nightOf(state.turn);
  if (state.room.night === n) return state;
  const spots = openSpots(state);
  if (!spots.length) return state;
  const r = rng(seedFor(woodsSeed(state.seed ?? 1, state.place), n + 1)), out = [];
  const kinds = rareRoom(state.seed ?? 1, n) === state.place ? [...NIGHT_KINDS, RARE_KIND] : NIGHT_KINDS;
  for (const id of kinds) {
    const left = spots.filter((s) => !out.some((o) => o.x === s.x && o.y === s.y));
    if (left.length) out.push({ id, ...pick(r, left), night: true });
  }
  return { ...state, room: { ...state.room, night: n }, enemies: [...state.enemies, ...out] };
}

// Every grass tile off the edge with nothing on it, not the hero's, and out of their sight
function openSpots(state) {
  const { room } = state, spots = [], on = (list, x, y) => (list || []).some((o) => o.x === x && o.y === y);
  for (let y = 1; y < room.rows - 1; y++) for (let x = 1; x < room.cols - 1; x++) {
    if (tileAt(room, x, y).id !== 'floor' || (state.hero.x === x && state.hero.y === y)) continue;
    if (on(state.enemies, x, y) || on(state.items, x, y) || on(state.people, x, y) || litAt(state, x, y)) continue;
    spots.push({ x, y });
  }
  return spots;
}
