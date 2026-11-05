// § boon: the home waystone's boons (D-583, D-596). Stepping onto the woken home plate with
// no boon held offers 3, each of a different kind, drawn from the boons built so far; the
// hero picks 1, or the cross skips it. `state.boon` holds its id until the hero is back in the
// woods, by stairs or travel, or falls (withoutBoon, state.js). Its effects stack with gear.
// The boons and their numbers are data (boons.js). Plain data, no drawing.
import { BOONS, BOON_SORTS } from './registry.js';
import { tileAt } from './room.js';
import { rng, seedFor } from './rng.js';
import { say } from './lines.js';
import { note } from './events.js';
import { reach } from './oil.js';
import { maxHealth } from './state.js';
import { rareOf } from './worn.js';

export const HOME = 'woods'; // where the home waystone stands (D-589)
export const OFFERED = 3;

// The boon held, its registry entry, or null
export const boonOf = (state) => (state.boon && BOONS[state.boon]) || null;
// Its hearts added to the most, and what it multiplies a lit turn's oil by (state.js)
export { boonHearts, boonBurn } from './state.js';
// The tiles more the lantern's light reaches (Wide Glow), 0 without
export const boonReach = (state) => boonOf(state)?.reach ?? 0;
// The lantern's light reach in pixels, with the boon's tiles; the empty ember stays as it is
export const lanternReach = (state) => reach(state.oil) + (state.oil > 0 ? boonReach(state) * 16 : 0);
// What it adds to every hit the hero lands (Hard Blow), 0 without
export const boonHit = (state) => boonOf(state)?.hit ?? 0;
// A beaten creature's chance to drop its part: the boon's (Keen Eye), or `base`
export const dropOf = (state, base) => Math.max(base, boonOf(state)?.drop ?? 0);
// The oil an item pours into the lantern: Deep Pour's `pour` for a flask, else its `oil`, 0 for none
export const pourOf = (state, entry) => (entry?.oil ? Math.max(entry.oil, boonOf(state)?.pour ?? 0) : 0);
// The hearts an eaten item heals: its `heal`, and Kind Herbs' 1 more (D-599)
export const healOf = (state, entry) => (entry?.heal ?? 0) + (boonOf(state)?.heal ?? 0);
// A beaten creature's chance to leave its rare one: the worn charm's, and Lucky Find's part above
// `base` added on top, so both stack (D-599: 10% + 10 + 15 = 35%)
export const rareChance = (state, base) => rareOf(state, base) + Math.max(0, (boonOf(state)?.rare ?? base) - base);

// The boons that can be offered: every one built (not `soon`)
export const offerable = () => Object.values(BOONS).filter((b) => !b.soon);

// Whether the hero stands on the home waystone's woken plate
export const onHomePlate = (state) => state.place === HOME && tileAt(state.room, state.hero.x, state.hero.y).id === 'wokenPlate';
// Whether the plate offers boons now: on it, holding none
export const offersBoons = (state) => onHomePlate(state) && !state.boon;

// § offer: (state) → up to OFFERED boon ids, each of a different kind, seeded by the seed and
// the turn, so a replay draws the same
export function offer(state) {
  const r = rng(seedFor(state.seed ^ state.turn, 0xb007));
  const shuffle = (list) => { const a = [...list]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pool = offerable(), sorts = shuffle(Object.keys(BOON_SORTS).filter((k) => pool.some((b) => b.sort === k)));
  return sorts.slice(0, OFFERED).map((k) => shuffle(pool.filter((b) => b.sort === k))[0].id);
}

// § take: (state, id) → the state holding that boon, with its line and a `boon` event; its
// hearts are full as the hero sets out, and hearts it takes (Reckless) are cut to the new most. Free: no turn passes. One held, or not on offer: as it was
export function takeBoon(state, id) {
  const b = BOONS[id];
  if (!b || b.soon || state.boon) return state;
  const held = { ...state, boon: id }, more = b.hearts ?? 0;
  const health = more > 0 ? state.health + more : Math.min(state.health, maxHealth(held));
  return note(say({ ...held, health }, 'boonTake', b.name), 'boon', { id });
}

// A boon's row on the card: its name, its kind and its line
export const boonRow = (id) => ({ id, text: BOONS[id].name, note: `${BOON_SORTS[BOONS[id].sort]}. ${BOONS[id].words}` });
