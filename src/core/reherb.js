// § reherb: an older save's woods rooms given their herbs (D-762), as recap.js gave them their
// oilcaps. Each woods room never seen, with nothing taken, gets the herb the seed now lays there,
// when its tile is still open grass with nothing on it; a room seen, one with a herb already, or
// the one stood in stays as it was. The copies a fall and the dev Reset read (`home.places`) get
// theirs the same way.
import { ROOMS, isMountain } from './hearthwood.js';
import { beginPlace } from './room.js';

const unseen = (p) => !p.seen || !Array.prototype.some.call(p.seen, Boolean);
// The herb the seed lays in room `id`, or null
const herbOf = (seed, id) => beginPlace(id, seed).items.find((it) => it.id === 'herb') || null;
// A place with `herb` among its items, when its tile is free grass and it has no herb yet
function laid(p, herb) {
  const items = p.items || [], line = p.room?.map?.[herb.y];
  if (!line || line[herb.x] !== '.' || items.some((it) => it.id === 'herb' || (it.x === herb.x && it.y === herb.y))) return p;
  return { ...p, items: [...items, herb] };
}

// (state) → the state with a herb in each unseen woods room
export function reherb(s) {
  const away = { ...(s.elsewhere || {}) }, out = { ...s, elsewhere: away }, places = s.home?.places;
  const kept = places ? { ...places } : null;
  for (const id of ROOMS) {
    if (isMountain(id) || id === s.place) continue;
    const p = away[id];
    if (!p?.room || !unseen(p) || p.taken?.length) continue;
    const herb = herbOf(s.seed, id);
    if (!herb) continue;
    away[id] = laid(p, herb);
    if (kept?.[id]?.room) kept[id] = laid(kept[id], herb);
  }
  if (kept) out.home = { ...s.home, places: kept };
  return out;
}
