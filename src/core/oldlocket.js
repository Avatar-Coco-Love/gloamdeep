// § oldlocket: a save from before the locket (0.3.143, D-691) may hold the room the seed picks
// for it as it was, with no locket and no warden. Once, as the save is brought up to date
// (save.js), they are laid there as a new game lays them (relic.js): the room stays as it
// is, nothing of the hero's moves (D-716). Only while the locket is nowhere in the journey:
// not in that room, the bag, a chest, a lost bag, on the floor anywhere or on the shelf.
// Plain data, no drawing.
import { locketRoom, LOCKET_DEPTH, placeFor } from './room.js';
import { cellOf } from './region.js';
import { withRelic } from './relic.js';
import { get } from './registry.js';

// (state) → the state with the locket and its warden in the locket room, when it is held and the
// locket is nowhere; otherwise as it was
export function withOldLocket(s) {
  const id = locketRoom(s.seed), here = s.place === id, p = here ? s : s.elsewhere?.[id];
  if (!p?.room || anywhere(s)) return s;
  const cell = cellOf(s.seed, id, LOCKET_DEPTH);
  if (!cell) return s;
  const { start } = placeFor(id, s.seed);
  const laid = withRelic(cell.seed, { map: p.room.map, start, hero: here ? s.hero : null, items: p.items || [], enemies: p.enemies || [], people: p.people || [] });
  const out = { ...p, items: laid.items, enemies: laid.enemies };
  return here ? { ...s, ...out } : { ...s, elsewhere: { ...s.elsewhere, [id]: out } };
}

// Whether the locket is somewhere in the journey: a thing with its id, or the shelf holding it
function anywhere(s) {
  const shelf = get('locketShelf').letter;
  const rooms = [s.room, ...Object.values(s.elsewhere || {}).map((p) => p.room)];
  return rooms.some((room) => room?.map?.some((line) => line.includes(shelf))) || holds(s);
}
const holds = (v) => (Array.isArray(v) ? v.some(holds)
  : !!v && typeof v === 'object' && !ArrayBuffer.isView(v) && (v.id === 'locket' || Object.values(v).some(holds)));
