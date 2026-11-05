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

export const HOME = 'woods'; // where the home waystone stands (D-589)
export const OFFERED = 3;

// The boon held, its registry entry, or null
export const boonOf = (state) => (state.boon && BOONS[state.boon]) || null;
// Its hearts added to the most (Stout Heart), 0 without
export const boonHearts = (state) => boonOf(state)?.hearts ?? 0;
// What it multiplies a lit turn's oil by (Slow Wick), 1 without
export const boonBurn = (state) => boonOf(state)?.burn ?? 1;
// A beaten creature's chance to drop its part: the boon's (Keen Eye), or `base`
export const dropOf = (state, base) => Math.max(base, boonOf(state)?.drop ?? 0);

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
// hearts are full as the hero sets out. Free: no turn passes. One held, or not on offer: as it was
export function takeBoon(state, id) {
  const b = BOONS[id];
  if (!b || b.soon || state.boon) return state;
  const health = state.health + Math.max(0, b.hearts ?? 0);
  return note(say({ ...state, boon: id, health }, 'boonTake', b.name), 'boon', { id });
}

// A boon's row on the card: its name, its kind and its line
export const boonRow = (id) => ({ id, text: BOONS[id].name, note: `${BOON_SORTS[BOONS[id].sort]}. ${BOONS[id].words}` });
