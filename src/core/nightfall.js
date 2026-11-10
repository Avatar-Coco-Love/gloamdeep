// § nightfall: night creatures come out in the woods (D-778, D-760's last step, its first
// creature; the bat the second, D-779; the rare gloamling the third, D-780). Plain data, no drawing. In each woods room round home,
// never home and never a mountain room, one of each night kind comes out each night: once daylight stops lighting the room
// (halfway through dusk), on an open grass tile off the edge, free and out of the hero's sight,
// picked by the seed and the night. The room notes the night it came (`night`), so one beaten
// stays beaten till the next night. Halfway through dawn, as daylight lights the room again,
// any still standing are gone. In a room come into by day, they went while the hero was away.
// Day creatures are the same turned round (D-781): a mole each day in each woods room round home,
// from halfway through dawn till halfway through dusk; as daylight shows every tile, it comes out
// on open grass at least 4 steps from the hero instead of out of sight (Claude's call).
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

// § day kinds: what comes out each day, one of each, in each room (D-781)
export const DAY_KINDS = ['mole'];
const FAR = 4; // by day, at least this many steps from the hero

// The night a turn falls in: the day's own number, as all its dark lies inside one day (D-217)
export const nightOf = (turn) => Math.floor(turn / DAY_TURNS);
// Whether daylight no longer lights the room: from halfway through dusk to halfway through dawn
export const darkOut = (turn) => daylight(turn) < 0.5;
// The day a turn falls in: a day runs from halfway through dawn (turn 285 of the one before) to
// halfway through dusk (turn 185), so it counts from the half dawn
export const dayOf = (turn) => Math.floor((turn + 15) / DAY_TURNS);

// (state) → the state with tonight's creatures out, or last night's gone by day; the same state
// when nothing changes, or no tile fits yet (it waits for the next turn)
export function nightfall(state) {
  if (!ROUND_HOME.includes(state.place)) return state;
  return darkOut(state.turn) ? comeOut(goneBy(state, 'day'), 'night') : comeOut(goneBy(state, 'night'), 'day');
}

// (state, when) → the state with the creatures of the other half gone ('night' by day, 'day' by night)
const goneBy = (state, when) => state.enemies.some((e) => e[when])
  ? { ...state, enemies: state.enemies.filter((e) => !e[when]) } : state;

// (state, when) → the state with this night's or this day's creatures out, once each
function comeOut(state, when) {
  const night = when === 'night', n = night ? nightOf(state.turn) : dayOf(state.turn);
  if (state.room[when] === n) return state;
  const spots = night ? openSpots(state) : openSpots(state, FAR);
  if (!spots.length) return state;
  const r = rng(seedFor(woodsSeed(state.seed ?? 1, state.place) ^ (night ? 0 : 0x5d4f1a37), n + 1)), out = [];
  const kinds = !night ? DAY_KINDS : rareRoom(state.seed ?? 1, n) === state.place ? [...NIGHT_KINDS, RARE_KIND] : NIGHT_KINDS;
  for (const id of kinds) {
    const left = spots.filter((s) => !out.some((o) => o.x === s.x && o.y === s.y));
    if (left.length) out.push({ id, ...pick(r, left), [when]: true });
  }
  return { ...state, room: { ...state.room, [when]: n }, enemies: [...state.enemies, ...out] };
}

// Every grass tile off the edge with nothing on it, not the hero's, and out of their sight; by
// day, when every tile is in sight, `far` steps or more from them instead
function openSpots(state, far = 0) {
  const { room } = state, spots = [], on = (list, x, y) => (list || []).some((o) => o.x === x && o.y === y);
  for (let y = 1; y < room.rows - 1; y++) for (let x = 1; x < room.cols - 1; x++) {
    if (tileAt(room, x, y).id !== 'floor' || (state.hero.x === x && state.hero.y === y)) continue;
    if (on(state.enemies, x, y) || on(state.items, x, y) || on(state.people, x, y)) continue;
    if (far ? Math.max(Math.abs(x - state.hero.x), Math.abs(y - state.hero.y)) < far : litAt(state, x, y)) continue;
    spots.push({ x, y });
  }
  return spots;
}
