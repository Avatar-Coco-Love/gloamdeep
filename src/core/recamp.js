// § recamp: an older save given its miners' camp (D-770), as relamp.js gave the lamppost. A
// journey makes all 9 rooms at its start, so one begun before the camp has none. The room the seed
// picks gets it when never seen, with nothing taken, and its 6 tiles still open grass with nothing
// on them; a room seen, or the one stood in, stays as it was. The copies a fall and the dev Reset
// read (`home.places`) get theirs the same way.
import { beginPlace } from './room.js';
import { campRoom, campTiles } from './camp.js';
import { get } from './registry.js';

const unseen = (p) => !p.seen || !Array.prototype.some.call(p.seen, Boolean);
// The camp's top-left tile in the room the seed lays it, or null
function spotOf(seed, id, letter) {
  const map = beginPlace(id, seed).room.map;
  for (let y = 0; y < map.length; y++) { const x = map[y].indexOf(letter); if (x >= 0) return { x, y }; }
  return null;
}
// A place with the camp at `at`, when its tiles are free grass and none stands there yet
function stood(p, at, letters) {
  const map = p.room?.map, tiles = campTiles(at.x, at.y);
  if (!map || map.some((l) => letters.some((ch) => l.includes(ch)))) return p;
  if (!tiles.every((t) => map[t.y]?.[t.x] === '.' && !(p.items || []).some((it) => it.x === t.x && it.y === t.y))) return p;
  const next = map.map((l, y) => [...l].map((ch, x) => (tiles.some((t) => t.x === x && t.y === y) ? letters[0] : ch)).join(''));
  return { ...p, room: { ...p.room, map: next } };
}

// (state) → the state with the camp in its room, when that room is unseen
export function recamp(s) {
  const id = campRoom(s.seed), letters = [get('minersCamp').letter, get('minersCampBare').letter], p = s.elsewhere?.[id];
  if (id === s.place || !p?.room || !unseen(p) || p.taken?.length) return s;
  const at = spotOf(s.seed, id, letters[0]);
  if (!at) return s;
  const out = { ...s, elsewhere: { ...s.elsewhere, [id]: stood(p, at, letters) } }, kept = s.home?.places?.[id];
  if (kept?.room) out.home = { ...s.home, places: { ...s.home.places, [id]: stood(kept, at, letters) } };
  return out;
}
