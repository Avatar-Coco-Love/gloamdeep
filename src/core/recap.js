// § recap: an older save's woods rooms given their oilcaps (D-760). Plain data, no drawing. A
// journey makes all 9 rooms at its start, so one begun before the oilcaps outside has none. Each
// woods room never seen, with nothing taken, gets the oilcap the seed now lays there, when its
// tile is still open grass with nothing on it; a room seen or the one stood in stays as it was.
// The copies a fall and the dev Reset read (`home.places`) get theirs the same way.
import { ROOMS, isMountain } from './hearthwood.js';
import { beginPlace } from './room.js';

const unseen = (p) => !p.seen || !Array.prototype.some.call(p.seen, Boolean);
// The oilcap the seed lays in room `id`, or null
const capOf = (seed, id) => beginPlace(id, seed).items.find((it) => it.id === 'oilcap') || null;
// A place with `cap` among its items, when its tile is free grass and it has no oilcap yet
function laid(p, cap) {
  const items = p.items || [], line = p.room?.map?.[cap.y];
  if (!line || line[cap.x] !== '.' || items.some((it) => it.id === 'oilcap' || (it.x === cap.x && it.y === cap.y))) return p;
  return { ...p, items: [...items, cap] };
}

// (state) → the state with an oilcap in each unseen woods room
export function recap(s) {
  const away = { ...(s.elsewhere || {}) }, out = { ...s, elsewhere: away }, places = s.home?.places;
  const kept = places ? { ...places } : null;
  for (const id of ROOMS) {
    if (isMountain(id) || id === s.place) continue;
    const p = away[id];
    if (!p?.room || !unseen(p) || p.taken?.length) continue;
    const cap = capOf(s.seed, id);
    if (!cap) continue;
    away[id] = laid(p, cap);
    if (kept?.[id]?.room) kept[id] = laid(kept[id], cap);
  }
  if (kept) out.home = { ...s.home, places: kept };
  return out;
}
