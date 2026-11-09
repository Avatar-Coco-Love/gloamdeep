// § strewn: an older save's mountain rooms given their loose stones (D-761), as recap.js gave
// the woods rooms their oilcaps. Each mountain room never seen, with nothing taken, gets the
// stones the seed now lays there, each whose tile is still open grass with nothing on it; a room
// seen, one with stones already, or the one stood in stays as it was. The copies a fall and the
// dev Reset read (`home.places`) get theirs the same way.
import { ROOMS, isMountain } from './hearthwood.js';
import { beginPlace } from './room.js';

const unseen = (p) => !p.seen || !Array.prototype.some.call(p.seen, Boolean);
function laid(p, stones) {
  if (!p?.room) return p;
  let items = p.items || [];
  if (items.some((it) => it.id === 'stone')) return p;
  for (const st of stones) {
    const line = p.room.map?.[st.y];
    if (line && line[st.x] === '.' && !items.some((it) => it.x === st.x && it.y === st.y)) items = [...items, st];
  }
  return items === p.items ? p : { ...p, items };
}

// (state) → the state with loose stones in each unseen mountain room
export function strewn(s) {
  const away = { ...(s.elsewhere || {}) }, out = { ...s, elsewhere: away }, places = s.home?.places;
  const kept = places ? { ...places } : null;
  for (const id of ROOMS) {
    if (!isMountain(id) || id === s.place) continue;
    const p = away[id];
    if (!p?.room || !unseen(p) || p.taken?.length) continue;
    const stones = beginPlace(id, s.seed).items.filter((it) => it.id === 'stone');
    away[id] = laid(p, stones);
    if (kept?.[id]?.room) kept[id] = laid(kept[id], stones);
  }
  if (kept) out.home = { ...s.home, places: kept };
  return out;
}
