// § travel: going from one woken waystone to another (D-579, D-593). Standing on a woken
// plate, the wait (a tap on the hero, Space) or Enter opens the travel card (main.js); it
// lists every waystone, home first, then by depth. One not yet woken shows as ???. Picking a
// woken one goes there at once, onto its plate. It is free: no turn passes and no oil burns,
// so the creatures there can't act before the hero's first move. It is barred while a
// creature awake stands beside the hero or chases them, with its line, so it is no free
// escape. Plain data, no drawing.
import { tileAt, stoneRoom, areaAt, STONE_DEPTH } from './room.js';
import { arrive, fresh as freshPlace } from './stairs.js';
import { endTurn } from './endturn.js';
import { say } from './lines.js';
import { note, fresh } from './events.js';

const WOKEN = 'A'; // the woken plate's letter (tiles.js)

// Every waystone's place, home first, then by depth: the woods' (D-589) and depth 2's (D-592)
export const stonePlaces = (seed) => ['woods', stoneRoom(seed)].filter(Boolean);

// The room of place `id` as the state holds it: the one stood in, one left, or none yet
const roomOf = (state, id) => (id === state.place ? state.room : state.elsewhere?.[id]?.room);
const wokenIn = (room) => !!room && room.map.some((line) => line.includes(WOKEN));

// (state) → [{ place, depth, woken, here }], one for each waystone
export const stonesOf = (state) => stonePlaces(state.seed).map((place) => ({
  place, depth: place === 'woods' ? 0 : STONE_DEPTH, woken: wokenIn(roomOf(state, place)), here: place === state.place,
}));

// Whether the hero stands on a woken plate
export const onWokenPlate = (state) => tileAt(state.room, state.hero.x, state.hero.y).id === 'wokenPlate';

// Whether a creature awake stands beside the hero, corners too, or chases them
export const creatureNear = (state) => state.enemies.some((e) => !e.asleep
  && (e.chasing || (Math.abs(e.x - state.hero.x) <= 1 && Math.abs(e.y - state.hero.y) <= 1)));

// (state, place) → the state on that waystone's plate, with its line; with a creature near,
// the same state with the barred line; one not woken, or this one, the same state
export function travel(state, place) {
  if (creatureNear(state)) return say(state, 'stoneNear');
  const stone = stonesOf(state).find((s) => s.place === place);
  if (!stone?.woken || stone.here) return state;
  const there = state.elsewhere[place] || freshPlace(place, state.seed), spot = plateIn(there.room);
  return endTurn(state, say(note(fresh(arrive(state, place, there, spot)), 'travel', { place }), 'stoneTravel'));
}

// The woken plate in a room, { x, y }
function plateIn(room) {
  for (let y = 0; y < room.rows; y++) { const x = room.map[y].indexOf(WOKEN); if (x >= 0) return { x, y }; }
  return null;
}

// A waystone's row on the card: its name and note (D-593)
export const stoneName = (s) => (!s.woken ? '???' : s.depth === 0 ? 'Home' : `Depth ${s.depth}`);
const AREAS = { CAVE: 'caves', WARREN: 'warrens', DUNGEON: 'dungeon' }; // by the map's area name (D-233)
export const stoneNote = (s) => (s.here ? 'You are here.' : !s.woken ? 'Not yet woken.' : s.depth === 0 ? 'The surface.' : `The ${AREAS[areaAt(s.depth).area]}.`);
