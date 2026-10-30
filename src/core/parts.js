// § parts: the lantern's part slots (D-459, D-483). `state.parts` holds the part fitted in
// each slot, by slot name (a wick in `wick`); a journey without it has none fitted.
// Plain data, no drawing.
import { get } from './registry.js';
import { OIL } from './oil.js';
import { say } from './lines.js';
import { bagTake } from './bag.js';

export const fitted = (state) => state.parts ?? {};
export const isFitted = (state, id) => Object.values(fitted(state)).includes(id);

// How much oil a lit turn burns: a fitted part's `burn`, else the plain lantern's (D-483)
export function burnOf(state) {
  const burns = Object.values(fitted(state)).map((id) => get(id)?.part?.burn).filter(Boolean);
  return burns.length ? Math.min(...burns) : OIL.burn;
}

// § fit: Fit on bag slot i puts its part in the lantern's slot, and the part there, if any,
// in that bag slot, with its `fits` line (D-483). Free: no turn passes.
export function fit(state, i) {
  const s = state.bag[i], part = s && get(s.id).part;
  if (!part) return state;
  const was = fitted(state)[part.slot];
  const bag = was ? state.bag.map((o, j) => (j === i ? { id: was, n: 1 } : o)) : bagTake(state.bag, i);
  return say({ ...state, bag, parts: { ...fitted(state), [part.slot]: s.id } }, get(s.id).fits);
}
