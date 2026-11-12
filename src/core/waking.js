// § waking: where a fall wakes the hero (D-733, D-737). In the last bed slept in, on the tile
// they lay down from, or with something there now, the nearest open tile beside the bed; with
// none, on the home waystone's plate once it is woken, no boon offered until stepped onto
// again; otherwise in the room where the journey began, on its tile, or with something there
// now, the nearest open tile beside it (H-16). Taking the bed down
// forgets it until it is slept in again. Plain data, no drawing.
import { tileAt } from './room.js';
import { get } from './registry.js';
import { stoneHome } from './mouth.js';

// The room of place `id` as the state holds it: the one stood in, one left, or none yet
const roomOf = (state, id) => (id === state.place ? state.room : state.elsewhere?.[id]?.room);
const itemsOf = (state, id) => (id === state.place ? state.items : state.elsewhere?.[id]?.items) || [];

// (state) → { place, hero }: where the hero wakes
export function wakeSpot(state) {
  return byBed(state) || byStone(state) || byStart(state);
}

// The bed slept in, still standing where it was: the tile lain down from, else the nearest
// open tile beside it with nothing on it
function byBed(state) {
  const bed = state.bed, room = bed && roomOf(state, bed.place);
  if (!room || tileAt(room, bed.x, bed.y)?.id !== 'bedstead') return null;
  const hero = nearOpen(room, itemsOf(state, bed.place), bed.from, bed);
  return hero && { place: bed.place, hero };
}

// The journey's first tile, else, with something set down or lying there, the nearest open
// tile beside it, as by a bed (H-16, D-879)
function byStart(state) {
  const { place, hero } = state.home, room = roomOf(state, place);
  return { place, hero: (room && nearOpen(room, itemsOf(state, place), hero, hero)) || hero };
}

// The tile `first` if open (inside the room, not solid, nothing on it), else the nearest open
// tile by steps from `from` over floor that is not solid; none, null
function nearOpen(room, items, first, from) {
  const inside = (x, y) => x >= 0 && y >= 0 && x < room.cols && y < room.rows;
  const open = (x, y) => inside(x, y) && tileAt(room, x, y).solid === false && !items.some((it) => it.x === x && it.y === y);
  if (open(first.x, first.y)) return { x: first.x, y: first.y };
  const seen = new Set([from.x + ',' + from.y]), queue = [{ x: from.x, y: from.y }];
  for (let i = 0; i < queue.length; i++) {
    for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) { // up, down, left, right, as DIRS
      const x = queue[i].x + dx, y = queue[i].y + dy;
      if (seen.has(x + ',' + y) || !inside(x, y) || tileAt(room, x, y).solid !== false) continue;
      seen.add(x + ',' + y);
      if (open(x, y)) return { x, y };
      queue.push({ x, y });
    }
  }
  return null;
}

// The home waystone's woken plate, once woken
function byStone(state) {
  const home = stoneHome(state.seed), room = roomOf(state, home), plate = get('wokenPlate').letter;
  for (let y = 0; room && y < room.rows; y++) {
    const x = room.map[y].indexOf(plate);
    if (x >= 0) return { place: home, hero: { x, y } };
  }
  return null;
}

// The bed remembered as slept in: its tile, and the tile the hero lay down from
export const sleptIn = (state, x, y) => ({ ...state, bed: { place: state.place, x, y, from: { ...state.hero } } });
// Forgotten when the bed at x, y in this room is taken down
export const forgetBed = (state, x, y) => (state.bed?.place === state.place && state.bed.x === x && state.bed.y === y ? { ...state, bed: null } : state);
