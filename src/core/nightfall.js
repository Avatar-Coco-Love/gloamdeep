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
// The audit's bug fixes (D-783): an earlier night's or day's creatures are cleared before new
// ones come out (B1); the other half's leave before any creature acts, so none bites on waking
// (B2); and night creatures come out at least 4 steps away too, as the mole (B3).
// The second day creature, the bunny (D-784), the first that means no harm: one each day in each
// woods room round home beside the mole, and one in the home room too, the only creature there.
// The third, the rare herb mimic (D-793): one woods room round home a day, picked by the seed and
// the day, as the gloamling by night; it comes out asleep, looking like a herb.
import { daylight, DAY_TURNS } from './daytime.js';
import { ROUND_HOME, HOME_ID, woodsSeed } from './hearthwood.js';
import { tileAt } from './room.js';
import { get, asleepAtFirst } from './registry.js';
import { litAt } from './sight.js';
import { rng, pick, seedFor } from './rng.js';

// § kinds: what comes out each night, one of each, in each room
export const NIGHT_KINDS = ['lampmoth', 'bat']; // a night bat leaves no guano: that lies only by a bat a room is made with (D-779)
// The rare one: a gloamling, in one woods room round home a night, picked by the seed and the
// night, beside that room's lampmoth and bat (D-780)
export const RARE_KIND = 'gloamling';
export const rareRoom = (seed, n) => pick(rng(seedFor(seedFor(seed, 0) ^ 0x2c1b3c6d, n + 1)), ROUND_HOME);

// § day kinds: what comes out each day, one of each, in each room (D-781)
export const DAY_KINDS = ['mole', 'bunny'];
// The rare one by day: a herb mimic, in one woods room round home a day, picked by the seed and
// the day, beside that room's mole and bunny (D-793); never home
export const RARE_DAY_KIND = 'herbMimic';
export const rareDayRoom = (seed, n) => pick(rng(seedFor(seedFor(seed, 0) ^ 0x6a09e667, n + 1)), ROUND_HOME);
// The home room's: only the bunny, which never bites (D-784); nothing comes out there by night
export const HOME_KINDS = ['bunny'];
// The rooms where creatures come out: the home room and the woods rooms round it
const OUT = [HOME_ID, ...ROUND_HOME];
const FAR = 4; // at least this many steps from the hero, by day and by night (B3)

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
  if (!OUT.includes(state.place)) return state;
  const when = darkOut(state.turn) ? 'night' : 'day';
  return state.place === HOME_ID && when === 'night' ? leaveByLight(state) : comeOut(leaveByLight(state), when);
}

// (state) → the state with the other half's creatures gone: day ones by night, night ones by day.
// The turn's end runs it before the creatures act, so one gone with the light never bites (B2)
export const leaveByLight = (state) => !OUT.includes(state.place) ? state
  : goneBy(state, darkOut(state.turn) ? 'day' : 'night');

// (state, when) → the state with the creatures of the other half gone ('night' by day, 'day' by night)
const goneBy = (state, when) => state.enemies.some((e) => e[when])
  ? { ...state, enemies: state.enemies.filter((e) => !e[when]) } : state;

// (state, when) → the state with this night's or this day's creatures out, once each
function comeOut(state, when) {
  const night = when === 'night', n = night ? nightOf(state.turn) : dayOf(state.turn);
  if (state.room[when] === n) return state;
  const spots = openSpots(state, night);
  if (!spots.length) return state;
  const r = rng(seedFor(woodsSeed(state.seed ?? 1, state.place) ^ (night ? 0 : 0x5d4f1a37), n + 1)), out = [];
  const kinds = !night ? (state.place === HOME_ID ? HOME_KINDS : rareDayRoom(state.seed ?? 1, n) === state.place ? [...DAY_KINDS, RARE_DAY_KIND] : DAY_KINDS)
    : rareRoom(state.seed ?? 1, n) === state.place ? [...NIGHT_KINDS, RARE_KIND] : NIGHT_KINDS;
  for (const id of kinds) {
    const left = spots.filter((s) => !out.some((o) => o.x === s.x && o.y === s.y));
    if (left.length) out.push({ id, ...pick(r, left), ...(asleepAtFirst(get(id)) && { asleep: true }), [when]: true }); // a mimic comes out asleep, looking like its find
  }
  const stay = state.enemies.filter((e) => !e[when]); // an earlier night's or day's still standing go first (B1)
  return { ...state, room: { ...state.room, [when]: n }, enemies: [...stay, ...out] };
}

// Every grass tile off the edge with nothing on it, `FAR` steps or more from the hero; by night
// out of their sight too (B3)
function openSpots(state, night) {
  const { room } = state, spots = [], on = (list, x, y) => (list || []).some((o) => o.x === x && o.y === y);
  for (let y = 1; y < room.rows - 1; y++) for (let x = 1; x < room.cols - 1; x++) {
    if (tileAt(room, x, y).id !== 'floor' || (state.hero.x === x && state.hero.y === y)) continue;
    if (on(state.enemies, x, y) || on(state.items, x, y) || on(state.people, x, y)) continue;
    if (Math.max(Math.abs(x - state.hero.x), Math.abs(y - state.hero.y)) < FAR || (night && litAt(state, x, y))) continue;
    spots.push({ x, y });
  }
  return spots;
}
