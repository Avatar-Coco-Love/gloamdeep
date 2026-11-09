// § renew: an older save's Hearthwood brought up to date (D-742, the twelfth audit's B1 to B3).
// Plain data, no drawing. A journey makes all 9 rooms at its start, so one begun before the
// mountain rooms (0.3.190) kept woods in the north row. Each north room never seen, with
// nothing taken, is made again as today's mountain room (D-738 keeps woods only where the
// hero has been). Every Hearthwood room, the one stood in too, has its paths cut again, so a
// bush or branch in a path's way is cleared (B1); a path already open changes nothing. The
// copies a fall and the dev Reset read (`home.places`) are brought up the same way, home's
// with its old mouth made trees as step 19 did for the room itself (rehome.js, B3).
import { ROOMS, HOME_ID, isMountain, pathsOf, cutPaths } from './hearthwood.js';
import { beginPlace } from './room.js';
import { fresh } from './stairs.js';
import { homeMap, HOME_MIDDLE } from './rehome.js';

const unseen = (p) => !p.seen || !Array.prototype.some.call(p.seen, Boolean);
// A room's paths cut again, from its start as the seed makes it, or home's middle
function recut(seed, id, room) {
  const start = id === HOME_ID ? HOME_MIDDLE : beginPlace(id, seed).start;
  return { ...room, map: cutPaths(room.map, pathsOf(seed, id), start) };
}

// (state) → the state with its Hearthwood renewed
export function renew(s) {
  const seed = s.seed, out = { ...s };
  const away = { ...(s.elsewhere || {}) };
  for (const id of ROOMS) {
    if (id === s.place) continue;
    const p = away[id];
    if (!p?.room) continue;
    away[id] = isMountain(id) && unseen(p) && !p.taken?.length ? fresh(id, seed) : { ...p, room: recut(seed, id, p.room) };
  }
  out.elsewhere = away;
  if (ROOMS.includes(s.place)) out.room = recut(seed, s.place, s.room);
  const places = s.home?.places;
  if (places) {
    const kept = { ...places };
    for (const id of ROOMS) {
      if (!kept[id]?.room) continue;
      if (isMountain(id) && unseen(away[id] || {}) && id !== s.place) kept[id] = beginPlace(id, seed);
      else if (id === HOME_ID) kept[id] = { ...kept[id], room: { ...kept[id].room, map: homeMap(seed, kept[id].room.map) } };
      else kept[id] = { ...kept[id], room: recut(seed, id, kept[id].room) };
    }
    out.home = { ...s.home, places: kept };
  }
  return out;
}
