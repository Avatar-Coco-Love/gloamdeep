// § restar: an older save's woods rooms given their duskstars (D-763), as reherb.js gave them their
// herbs. Each woods room never seen, with nothing taken, gets the duskstars the seed now lays there,
// each whose tile is still open grass with nothing on it; a room seen, one with a duskstar already,
// or the one stood in stays as it was. The copies a fall and the dev Reset read (`home.places`) get
// theirs the same way.
import { ROOMS, isMountain } from './hearthwood.js';
import { beginPlace } from './room.js';

const unseen = (p) => !p.seen || !Array.prototype.some.call(p.seen, Boolean);
// The duskstars the seed lays in room `id`
const starsOf = (seed, id) => beginPlace(id, seed).items.filter((it) => it.id === 'duskstar');
// A place with each of `stars` among its items whose tile is free grass, when it has none yet
function laid(p, stars) {
  const items = p.items || [];
  if (items.some((it) => it.id === 'duskstar')) return p;
  const fit = stars.filter((f) => p.room?.map?.[f.y]?.[f.x] === '.' && !items.some((it) => it.x === f.x && it.y === f.y));
  return fit.length ? { ...p, items: [...items, ...fit] } : p;
}

// (state) → the state with duskstars in each unseen woods room
export function restar(s) {
  const away = { ...(s.elsewhere || {}) }, out = { ...s, elsewhere: away }, places = s.home?.places;
  const kept = places ? { ...places } : null;
  for (const id of ROOMS) {
    if (isMountain(id) || id === s.place) continue;
    const p = away[id];
    if (!p?.room || !unseen(p) || p.taken?.length) continue;
    const stars = starsOf(s.seed, id);
    if (!stars.length) continue;
    away[id] = laid(p, stars);
    if (kept?.[id]?.room) kept[id] = laid(kept[id], stars);
  }
  if (kept) out.home = { ...s.home, places: kept };
  return out;
}
