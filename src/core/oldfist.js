// § oldfist (D-888): a save from before the Warden's Fist may have beaten the warden already, and
// there is only one, so the Fist could never be found. Once, as the save is brought up to date
// (save.js): when the locket room has been entered and its warden is gone, the Fist is laid
// where the warden first stood, as the room's seed placed it (relic.js), or on the nearest open
// tile to it. Nothing else of the room moves. Plain data, no drawing.
import { locketRoom, placeFor } from './room.js';
import { RELIC_GUARD } from './relic.js';
import { spread } from './spread.js';

export function withOldFist(s) {
  const id = locketRoom(s.seed), here = s.place === id, p = here ? s : s.elsewhere?.[id];
  if (!p?.room || (p.enemies || []).some((e) => e.id === RELIC_GUARD)) return s;
  const stood = placeFor(id, s.seed)?.enemies?.find((e) => e.id === RELIC_GUARD);
  if (!stood) return s; // no warden was ever laid there
  const items = p.items || [], room = { room: p.room, hero: here ? s.hero : { x: -1, y: -1 }, items, enemies: p.enemies || [], people: p.people || [] };
  const [at] = spread(room, stood.x, stood.y, 1, 'stack');
  const out = { ...p, items: [...items, { id: 'wardenFist', x: at.x, y: at.y }] };
  return here ? { ...s, ...out } : { ...s, elsewhere: { ...s.elsewhere, [id]: out } };
}
