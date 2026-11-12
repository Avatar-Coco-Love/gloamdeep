// § slowburn: the Slowburn draught's while (D-792), the Glow Draught's way (glow.js, D-791).
// Drunk from the bag, any time, `state.slowburn` holds the turns left, its `slow.turns` at
// first; drunk again while it works, back to the full count, never more. Each passed turn
// counts one down, the lantern empty or not; as it runs out, its line. While it works a lit
// turn burns `slow.burn` of its oil, so a full tank lasts 70 turns, not 60, as the Heart
// Charm does and added to it (state.js). A night's sleep uses its turns too, and a fall ends
// it. Plain data, no drawing.
import { sayEnd } from './lines.js';

// The turns of Slowburn left, 0 without
export const slowLeft = (state) => state.slowburn ?? 0;
// § drunk: (state, entry) → the state burning slower anew, the count from the start
export const slowing = (state, entry) => ({ ...state, slowburn: entry.slow.turns });

// § tick: (state) → the state a passed turn later: the count one down, and the line as it runs out
export function slowTick(state) {
  const left = slowLeft(state);
  if (!left) return state;
  const now = left - 1, next = { ...state, slowburn: now };
  return now ? next : sayEnd(next, 'slowEnds');
}
// § slept: (state, turns) → the count `turns` turns later, with no line, as after a night's sleep;
// one left goes too, so the waking turn's tick never says its line over the waking one
export function slowSlept(state, turns) {
  const left = slowLeft(state) - turns;
  return slowLeft(state) ? { ...state, slowburn: left > 1 ? left : 0 } : state;
}
