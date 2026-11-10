// § relamp: an older save given its dead lamppost (D-769), as restar.js gave the duskstars. A
// journey makes all 9 rooms at its start, so one begun before the lamppost has none. The room the
// seed picks gets it when never seen, with nothing taken, and its tile still open grass with
// nothing on it; a room seen, or the one stood in, stays as it was. The copies a fall and the dev
// Reset read (`home.places`) get theirs the same way.
import { beginPlace } from './room.js';
import { lamppostRoom } from './lamppost.js';
import { get } from './registry.js';

const unseen = (p) => !p.seen || !Array.prototype.some.call(p.seen, Boolean);
// The lamppost's tile in the room the seed lays it, or null
function spotOf(seed, id, letter) {
  const map = beginPlace(id, seed).room.map;
  for (let y = 0; y < map.length; y++) { const x = map[y].indexOf(letter); if (x >= 0) return { x, y }; }
  return null;
}
// A place with the lamppost at `at`, when that tile is free grass and none stands there yet
function stood(p, at, letter) {
  const map = p.room?.map, line = map?.[at.y];
  if (!line || line[at.x] !== '.' || map.some((l) => l.includes(letter)) || (p.items || []).some((it) => it.x === at.x && it.y === at.y)) return p;
  const next = map.map((l, y) => (y === at.y ? l.slice(0, at.x) + letter + l.slice(at.x + 1) : l));
  return { ...p, room: { ...p.room, map: next } };
}

// (state) → the state with the lamppost in its room, when that room is unseen
export function relamp(s) {
  const id = lamppostRoom(s.seed), letter = get('lamppost').letter, p = s.elsewhere?.[id];
  if (id === s.place || !p?.room || !unseen(p) || p.taken?.length) return s;
  const at = spotOf(s.seed, id, letter);
  if (!at) return s;
  const out = { ...s, elsewhere: { ...s.elsewhere, [id]: stood(p, at, letter) } }, kept = s.home?.places?.[id];
  if (kept?.room) out.home = { ...s.home, places: { ...s.home.places, [id]: stood(kept, at, letter) } };
  return out;
}
