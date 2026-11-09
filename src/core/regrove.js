// § regrove: an older save's woods round home given their kinds (D-756, D-733's step 5). Plain
// data, no drawing. A journey makes all 9 rooms at its start, so one begun before the kinds kept
// the old woods everywhere. Each woods room round home never seen, with nothing taken, is made
// again as the seed now makes it, thick, as before, or a glade; a room seen, the one stood in, or
// one whose waystone is woken stays as it was. The copies a fall and the dev Reset read
// (`home.places`) follow the rooms made again.
import { ROUND_HOME } from './hearthwood.js';
import { beginPlace } from './room.js';
import { fresh } from './stairs.js';

const WOKEN = 'A'; // the woken plate's letter (tiles.js)
const unseen = (p) => !p.seen || !Array.prototype.some.call(p.seen, Boolean);
const remade = (s, id, p) => id !== s.place && p?.room && unseen(p) && !p.taken?.length && !p.room.map.some((line) => line.includes(WOKEN));

// (state) → the state with its unseen woods round home grown as their kinds
export function regrove(s) {
  const away = { ...(s.elsewhere || {}) }, again = ROUND_HOME.filter((id) => remade(s, id, away[id]));
  if (!again.length) return s;
  for (const id of again) away[id] = fresh(id, s.seed);
  const out = { ...s, elsewhere: away }, places = s.home?.places;
  if (places) {
    const kept = { ...places };
    for (const id of again) if (kept[id]?.room) kept[id] = beginPlace(id, s.seed);
    out.home = { ...s.home, places: kept };
  }
  return out;
}
