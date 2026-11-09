// § state: the game state and the world it begins as, and the small helpers every
// part of the turn rules shares (split from turn.js at the 0.2.123 audit, D-362).
import { beginPlace, PLACES } from './room.js';
import { blankMemory } from './fog.js';
import { OIL, burnOil } from './oil.js';
import { fresh } from './events.js';
import { burnOf } from './parts.js';
import { BOONS, STARTS, byLetter } from './registry.js';
import { START } from './starts.js';
import { idAt, SIZE } from './hearthwood.js';
import { mouthOf } from './mouth.js';
import { rng, pick, seedFor } from './rng.js';

// § directions: four only, no diagonals (D-042)
export const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

// The hero starts where style study 1 put them (study line 277).
export const FIRST_START = PLACES.first.start;

// The hero's health: 5, and a rat's bite takes 1 (D-115). Hearts bought with
// embers add to it (growth.js, D-293), and so does a boon's (Stout Heart, D-596).
export const HERO_HEALTH = 5;
// The boon held's hearts added to the most (Stout Heart; Reckless takes 2), 0 without, and
// what it multiplies a lit turn's oil by (Slow Wick), 1 without. Here, not in boon.js, so
// boon.js can use maxHealth without a circular import; boon.js passes them on.
export const boonHearts = (state) => (state.boon && BOONS[state.boon]?.hearts) || 0;
export const boonBurn = (state) => (state.boon && BOONS[state.boon]?.burn) || 1;
export const maxHealth = (state) => HERO_HEALTH + (state.hearts ?? 0) + boonHearts(state);
// § without boon: the boon ends as the hero is home again or falls (D-583): its hearts go,
// any health above the most without it with them (boon.js)
export const withoutBoon = (state) => (state.boon ? { ...state, boon: null, health: Math.min(state.health, maxHealth({ ...state, boon: null })) } : state);

// `home` is where the hero wakes after a fall: the room as it started (D-119).
// One room on its own, as tests use it; makeWorld adds the other places.
// `seed` sets every generated depth (D-148).
export function makeState(room, start = FIRST_START, lights = [], enemies = [], items = [], seed = 1, people = []) {
  const home = { place: 'first', room, hero: { x: start.x, y: start.y }, lights, enemies, items, people };
  return { room, hero: home.hero, turn: 0, seed, seen: blankMemory(room), oil: OIL.start, lit: true, health: HERO_HEALTH, items, taken: [], lights, enemies, people, line: null, place: 'first', elsewhere: {}, home, xp: 0, found: ['first'], bag: [], held: null, tool: null, float: null, events: [], told: {}, stashes: {}, coins: 0 };
}

// § world: every place, the hero in the first one. The others wait in
// `elsewhere` as they begin (stairs.js); `home.places` keeps them all as
// they began, for a fall (D-136) and the dev reset. Generated depths begin
// only when first reached (stairs.js, D-147). `mode` is the way to play picked
// at New journey (D-334): gentle, normal or hardcore.
export function makeWorld(first = 'first', seed = 1, mode = 'normal') {
  const begun = beginAll(seed);
  const here = begun[first], state = makeState(here.room, here.start, here.lights, here.enemies, here.items, seed, here.people);
  return { ...state, mode, place: first, found: [first], elsewhere: away(begun, first, {}), home: { ...state.home, place: first, places: begun } };
}

// § new journey (D-735): the world begun at the start `id` (starts.js): its room the seed's pick
// from the start's row, never the cave mouth's, the hero on its tile, the lantern as the start
// says. `home` is that room as it began, so a fall wakes there until step 3 (the owner's pick).
export function newJourney(seed = 1, mode = 'normal', id = START) {
  const s = STARTS[id], place = startRoom(seed, s), w = makeWorld(place, seed, mode);
  const hero = startTile(w, s);
  return { ...w, start: id, lit: s.lit, hero, home: { ...w.home, hero } };
}
// The start's room: one of its row's, the seed picking, the mouth's room left out (D-733)
export function startRoom(seed, s = STARTS[START]) {
  const y = { north: 0, middle: 1, south: SIZE - 1 }[s.row];
  const rooms = Array.from({ length: SIZE }, (_, x) => idAt(x, y)).filter((id) => id !== mouthOf(seed).from);
  return pick(rng(seedFor(seed, 0) ^ 0x51a7e3d5), rooms);
}
// The start's tile: the open tile nearest the room's middle that the room's own start reaches
// (so it is joined to every path), with nothing on it (the owner's pick: the middle)
export function startTile(w, s = STARTS[START]) {
  const { room, items, lights, enemies } = w, from = w.hero, mid = { x: (room.cols - 1) / 2, y: (room.rows - 1) / 2 };
  if (s.tile !== 'middle') return from;
  const taken = (x, y) => [...items, ...lights, ...enemies].some((t) => t.x === x && t.y === y);
  const seen = new Set([from.y * room.cols + from.x]), queue = [from];
  let best = from, far = Infinity;
  while (queue.length) {
    const t = queue.shift(), d = (t.x - mid.x) ** 2 + (t.y - mid.y) ** 2;
    if (d < far && !taken(t.x, t.y)) { best = t; far = d; }
    for (const [dx, dy] of Object.values(DIRS)) {
      const x = t.x + dx, y = t.y + dy, k = y * room.cols + x;
      if (x < 0 || y < 0 || x >= room.cols || y >= room.rows || seen.has(k) || byLetter(room.map[y][x])?.solid !== false) continue;
      seen.add(k); queue.push({ x, y });
    }
  }
  return { x: best.x, y: best.y };
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
    if (id !== here) out[id] = { room: p.room, lights: p.lights, enemies: p.enemies, items: p.items || [], people: p.people || [], taken: [], seen: seen[id] || blankMemory(p.room) };
  }
  return out;
}

// A passed turn starts a new list of events (events.js)
// With Endless oil on (`state.endless`, a dev switch) a lit turn burns nothing (D-626).
export const passTurn = (state) => fresh({ ...state, turn: state.turn + 1, oil: state.lit && !state.endless ? burnOil(state.oil, burnOf(state) * boonBurn(state)) : state.oil });

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
