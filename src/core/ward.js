// § ward: the Ward Draught's while (D-795), the Glow Draught's way (glow.js, D-791). Drunk
// from the bag, any time, it ends poisoned at once, and `state.ward` holds the turns left, its
// `ward.turns` at first; drunk again while it works, back to the full count, never more. While
// it works, a bite that hurts never leaves the hero poisoned (creatureturn.js). Each passed
// turn counts one down; as it runs out, its line. A night's sleep uses its turns, and a fall
// ends it. Plain data, no drawing.
import { sayEnd } from './lines.js';

// The turns of the ward left, 0 without
export const wardLeft = (state) => state.ward ?? 0;
// Whether a bite's poison is turned aside this turn
export const warded = (state) => wardLeft(state) > 0;
// § drunk: (state, entry) → the state warded anew, the count from the start, poisoned ended
export const wardingBy = (state, entry) => ({ ...state, ward: entry.ward.turns, poisoned: 0 });

// § tick: (state) → the state a passed turn later: the count one down, and the line as it runs out
export function wardTick(state) {
  const left = wardLeft(state);
  if (!left) return state;
  const now = left - 1, next = { ...state, ward: now };
  return now ? next : sayEnd(next, 'wardEnds');
}
// § slept: (state, turns) → the count `turns` turns later, with no line, as after a night's sleep;
// one left goes too, so the waking turn's tick never says its line over the waking one
export function wardSlept(state, turns) {
  const left = wardLeft(state) - turns;
  return wardLeft(state) ? { ...state, ward: left > 1 ? left : 0 } : state;
}
