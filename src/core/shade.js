// § shade: the Shade Draught's while (D-806), the Spitproof Draught's way (spitproof.js, D-802).
// Drunk from the bag, any time, `state.shade` holds the turns left, its `shade.turns` at first;
// drunk again while it works, back to the full count, never more. While it works, a creature
// that has not noticed the hero notices them only within `SHADE_NEAR` steps (creatureturn.js);
// one already after them keeps coming, and lampmoths and spit grubs are as they were. Each
// passed turn counts one down; as it runs out, its line. A night's sleep uses its turns, and a
// fall ends it. Plain data, no drawing.
import { say } from './lines.js';

export const SHADE_NEAR = 2; // steps, a creature's own way of counting them (D-806)
// The turns of it left, 0 without
export const shadeLeft = (state) => state.shade ?? 0;
// Whether creatures notice the hero only near this turn
export const shaded = (state) => shadeLeft(state) > 0;
// § drunk: (state, entry) → the state shaded anew, the count from the start
export const shadeBy = (state, entry) => ({ ...state, shade: entry.shade.turns });

// § tick: (state) → the state a passed turn later: the count one down, and the line as it runs out
export function shadeTick(state) {
  const left = shadeLeft(state);
  if (!left) return state;
  const now = left - 1, next = { ...state, shade: now };
  return now ? next : say(next, 'shadeEnds');
}
// § slept: (state, turns) → the count `turns` turns later, with no line, as after a night's sleep;
// one left goes too, so the waking turn's tick never says its line over the waking one
export function shadeSlept(state, turns) {
  const left = shadeLeft(state) - turns;
  return shadeLeft(state) ? { ...state, shade: left > 1 ? left : 0 } : state;
}
