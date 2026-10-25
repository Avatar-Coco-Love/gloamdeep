// § state: the game state and the world it begins as, and the small helpers every
// part of the turn rules shares (split from turn.js at the 0.2.123 audit, D-362).
import { beginPlace, PLACES } from './room.js';
import { blankMemory } from './fog.js';
import { OIL, burnOil } from './oil.js';
import { fresh } from './events.js';

// § directions: four only, no diagonals (D-042)
export const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

// The hero starts where style study 1 put them (study line 277).
export const FIRST_START = PLACES.first.start;

// The hero's health: 5, and a rat's bite takes 1 (D-115). Hearts bought with
// embers add to it (growth.js, D-293).
export const HERO_HEALTH = 5;
export const maxHealth = (state) => HERO_HEALTH + (state.hearts ?? 0);

// `home` is where the hero wakes after a fall: the room as it started (D-119).
// One room on its own, as tests use it; makeWorld adds the other places.
// `seed` sets every generated depth (D-148).
export function makeState(room, start = FIRST_START, lights = [], enemies = [], items = [], seed = 1) {
  const home = { place: 'first', room, hero: { x: start.x, y: start.y }, lights, enemies, items };
  return { room, hero: home.hero, turn: 0, seed, seen: blankMemory(room), oil: OIL.start, lit: true, health: HERO_HEALTH, items, taken: [], lights, enemies, line: null, place: 'first', elsewhere: {}, home, xp: 0, found: ['first'], bag: [], held: null, events: [], told: {}, stashes: {} };
}

// § world: every place, the hero in the first one. The others wait in
// `elsewhere` as they begin (stairs.js); `home.places` keeps them all as
// they began, for a fall (D-136) and the dev reset. Generated depths begin
// only when first reached (stairs.js, D-147). `mode` is the way to play picked
// at New journey (D-334): gentle, normal or hardcore.
export function makeWorld(first = 'first', seed = 1, mode = 'normal') {
  const begun = beginAll(seed);
  const here = begun[first], state = makeState(here.room, here.start, here.lights, here.enemies, here.items, seed);
  return { ...state, mode, place: first, found: [first], elsewhere: away(begun, first, {}), home: { ...state.home, place: first, places: begun } };
}

// Every hand-made place as it begins with this seed
function beginAll(seed) {
  const begun = {};
  for (const id of Object.keys(PLACES)) begun[id] = beginPlace(id, seed);
  return begun;
}

// The places other than `here` as they began, with the memory in `seen` kept
// (D-021). Generated depths aren't among them: they begin when reached.
function away(begun, here, seen) {
  const out = {};
  for (const [id, p] of Object.entries(begun)) {
    if (id !== here) out[id] = { room: p.room, lights: p.lights, enemies: p.enemies, items: p.items || [], taken: [], seen: seen[id] || blankMemory(p.room) };
  }
  return out;
}

// A passed turn starts a new list of events (events.js)
export const passTurn = (state) => fresh({ ...state, turn: state.turn + 1, oil: state.lit ? burnOil(state.oil) : state.oil });

// § items: the item lying on tile x, y, or undefined
export const itemAt = (state, x, y) => state.items.find((it) => it.x === x && it.y === y);

// § toward: the direction from one point to another, along whichever side is
// farther (a tap steps toward where it lands, D-042). Null when they match.
export function toward(fromX, fromY, toX, toY) {
  const dx = toX - fromX, dy = toY - fromY;
  if (dx === 0 && dy === 0) return null;
  if (Math.abs(dx) >= Math.abs(dy)) return dx > 0 ? 'right' : 'left';
  return dy > 0 ? 'down' : 'up';
}
