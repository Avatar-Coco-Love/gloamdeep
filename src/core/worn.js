// § worn: what the hero wears (D-458, D-484, D-487). `state.worn` holds, by slot name, a list
// of the pieces worn there (armour in `armour`, charms in `charm`); a journey without it wears
// nothing. How many each slot takes is SLOTS: a new slot, or a bigger one, is one number here.
// Plain data, no drawing.
import { get } from './registry.js';
import { say } from './lines.js';
import { bagTake } from './bag.js';

export const SLOTS = { armour: 1, charm: 2 };

export const wornOf = (state) => state.worn ?? {};
const wornIds = (state) => Object.values(wornOf(state)).flat();
export const isWorn = (state, id) => wornIds(state).includes(id);
const effects = (state, key) => wornIds(state).map((id) => get(id)?.wear?.[key]).filter((v) => v !== undefined);

// The chance a bite glances off and hurts nothing: the worn pieces' `glance`, or 0 (D-484)
export const glanceOf = (state) => Math.max(0, ...effects(state, 'glance'));

// The chance a beaten creature leaves its rare material: the worn pieces' `rare`, or `base` (D-486)
export const rareOf = (state, base) => Math.max(base, ...effects(state, 'rare'));

// How much of a lit turn's oil still burns: the worn pieces' `burn`, multiplied, or 1 (D-487)
export const burnByWorn = (state) => effects(state, 'burn').reduce((a, b) => a * b, 1);

// § wear: Wear on bag slot i puts its piece on, with its `wears` line (D-484). With its slot
// full, the piece worn there longest comes off into that bag slot (D-487). Free: no turn passes.
export function wear(state, i) {
  const s = state.bag[i], on = s && get(s.id).wear;
  if (!on) return state;
  const there = wornOf(state)[on.slot] ?? [];
  const full = there.length >= (SLOTS[on.slot] ?? 1), was = full ? there[0] : null;
  const bag = was ? state.bag.map((o, j) => (j === i ? { id: was, n: 1 } : o)) : bagTake(state.bag, i);
  const now = [...(full ? there.slice(1) : there), s.id];
  return say({ ...state, bag, worn: { ...wornOf(state), [on.slot]: now } }, get(s.id).wears);
}
