// § worn: what the hero wears (D-458, D-484). `state.worn` holds the piece worn in each
// slot, by slot name (armour in `armour`); a journey without it wears nothing.
// Plain data, no drawing.
import { get } from './registry.js';
import { say } from './lines.js';
import { bagTake } from './bag.js';

export const wornOf = (state) => state.worn ?? {};
export const isWorn = (state, id) => Object.values(wornOf(state)).includes(id);

// The chance a bite glances off and hurts nothing: the worn pieces' `glance`, or 0 (D-484)
export const glanceOf = (state) => Math.max(0, ...Object.values(wornOf(state)).map((id) => get(id)?.wear?.glance ?? 0));

// § wear: Wear on bag slot i puts its piece on, and the piece worn there, if any, in that
// bag slot, with its `wears` line (D-484). Free: no turn passes.
export function wear(state, i) {
  const s = state.bag[i], on = s && get(s.id).wear;
  if (!on) return state;
  const was = wornOf(state)[on.slot];
  const bag = was ? state.bag.map((o, j) => (j === i ? { id: was, n: 1 } : o)) : bagTake(state.bag, i);
  return say({ ...state, bag, worn: { ...wornOf(state), [on.slot]: s.id } }, get(s.id).wears);
}
