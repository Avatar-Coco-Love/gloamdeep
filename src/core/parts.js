// § parts: the lantern's part slots (D-459, D-483), and the rod's hook (D-807). `state.parts` holds the part fitted in
// each slot, by slot name (a wick in `wick`, the Bone Hook in `hook`); a journey without it has none fitted.
// Plain data, no drawing.
import { get } from './registry.js';
import { OIL } from './oil.js';
import { say } from './lines.js';
import { bagTake } from './bag.js';
import { burnByWorn } from './worn.js';
import { UPGRADES } from './upgrades.js';

export const fitted = (state) => state.parts ?? {};
export const isFitted = (state, id) => Object.values(fitted(state)).includes(id);

// How much oil a lit turn burns: a fitted part's `burn`, else the plain lantern's (D-483),
// times a worn charm's (D-487), times Steady Wick's once bought (D-798)
export const steadyBurn = (state) => (state.steady ? UPGRADES.steadyWick.burn : 1);
export function burnOf(state) {
  const burns = Object.values(fitted(state)).map((id) => get(id)?.part?.burn).filter(Boolean);
  return (burns.length ? Math.min(...burns) : OIL.burn) * burnByWorn(state) * steadyBurn(state);
}

// How much wider the strike meter's zone is: each fitted part's `wide` (the Bone Hook, D-807)
export const zoneByParts = (state) => Object.values(fitted(state)).reduce((w, id) => w * (get(id)?.part?.wide ?? 1), 1);

// § fit: Fit on bag slot i puts its part in the lantern's slot, and the part there, if any,
// in that bag slot, with its `fits` line (D-483). Free: no turn passes. A part `on` a tool (the
// Bone Hook on the rod, D-807) fits only with that tool carried, in the bag or the Tool slot.
export function fit(state, i) {
  const s = state.bag[i], part = s && get(s.id).part;
  if (!part) return state;
  if (part.on && state.tool !== part.on && !state.bag.some((o) => o.id === part.on)) return say(state, 'boneHookNoRod');
  const was = fitted(state)[part.slot];
  const bag = was ? state.bag.map((o, j) => (j === i ? { id: was, n: 1 } : o)) : bagTake(state.bag, i);
  return say({ ...state, bag, parts: { ...fitted(state), [part.slot]: s.id } }, get(s.id).fits);
}
