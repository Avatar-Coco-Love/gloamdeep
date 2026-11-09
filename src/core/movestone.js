// § movestone: an older save's home waystone moved from home, Hearthwood's middle room, to the
// cave mouth's room (D-753, step 25, 2). Plain data, no drawing. In the mouth's room it is set
// as an older save first had it set (homestone.js): at the spot nearest the room's middle, clear
// of what the hero built, the pond, the mouth, people, lights and the hero. Woken at home, it is
// woken there; a mouth room not made yet is made now, so it can be. At home its 9 tiles become
// grass, anything set down there stays, and a hero standing there stays. The copies of the rooms
// as they began (`home.places`, read by the dev Reset) are moved the same way, asleep.
import { LANDMARKS } from './registry.js';
import { around } from './landmarks.js';
import { settle } from './homestone.js';
import { stoneHome } from './mouth.js';
import { HOME_ID } from './hearthwood.js';
import { fresh } from './stairs.js';

const MARK = LANDMARKS.waystone;
const ASLEEP = 'Z', WOKEN = 'A'; // the plate's letters (tiles.js)

// (state) → the state with the home waystone in the cave mouth's room, or as it was when home has
// none or no spot fits there
export function moveStone(s) {
  const to = stoneHome(s.seed);
  return to === HOME_ID ? s : copiesMoved(liveMoved(s, to), to);
}

// The rooms played in: home's stone, if it has one, moved to place `to`
function liveMoved(s, to) {
  const home = placeOf(s, HOME_ID), plate = home?.room && plateIn(home.room);
  if (!plate) return s;
  let there = settle(placeOf(s, to) || fresh(to, s.seed), s.place === to ? s.hero : null);
  if (!plateIn(there.room)) return s;
  if (home.room.map[plate.y][plate.x] === WOKEN) there = { ...there, room: woken(there.room) };
  return put(put(s, to, there), HOME_ID, { ...home, room: unstoned(home.room, plate) });
}
// The copies of the rooms as they began: the same, asleep, when home's copy has the stone
function copiesMoved(s, to) {
  const began = s.home?.places, was = began?.[HOME_ID], at = was?.room && plateIn(was.room);
  if (!at) return s;
  const places = { ...began, [HOME_ID]: { ...was, room: unstoned(was.room, at) } };
  if (began[to]?.room) places[to] = settle(began[to]);
  return { ...s, home: { ...s.home, places } };
}

// Place `id` as the state holds it, the one stood in or one left, or null
function placeOf(s, id) {
  if (s.place !== id) return s.elsewhere?.[id] || null;
  const { room, items, people, lights, taken } = s;
  return { room, items, people, lights, taken };
}
// The state with place `id` as `p`
const put = (s, id, p) => (s.place === id ? { ...s, ...p } : { ...s, elsewhere: { ...s.elsewhere, [id]: p } });

// The plate in a room, asleep or woken, { x, y }, or null
function plateIn(room) {
  for (let y = 0; y < room.map.length; y++) {
    const x = [...room.map[y]].findIndex((c) => c === ASLEEP || c === WOKEN);
    if (x >= 0) return { x, y };
  }
  return null;
}
// The room with its plate woken
const woken = (room) => ({ ...room, map: room.map.map((line) => line.replace(ASLEEP, WOKEN)) });
// The room with the stone around the plate at `at` made grass
function unstoned(room, at) {
  const g = room.map.map((line) => [...line]);
  for (const t of around(MARK, at.x, at.y)) g[t.y][t.x] = '.';
  return { ...room, map: g.map((row) => row.join('')) };
}
