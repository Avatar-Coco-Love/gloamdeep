// § spitproof: the Spitproof Draught's while (D-802), the Ward Draught's way (ward.js, D-795).
// Drunk from the bag, any time, `state.spitproof` holds the turns left, its `spitproof.turns`
// at first; drunk again while it works, back to the full count, never more. While it works, a
// spit grub's glob that reaches the hero splashes off and hurts nothing (spit.js). Each passed
// turn counts one down; as it runs out, its line. A night's sleep uses its turns, and a fall
// ends it. Plain data, no drawing.
import { say } from './lines.js';

// The turns of it left, 0 without
export const spitproofLeft = (state) => state.spitproof ?? 0;
// Whether a glob splashes off the hero this turn
export const spitproofed = (state) => spitproofLeft(state) > 0;
// § drunk: (state, entry) → the state spitproof anew, the count from the start
export const spitproofBy = (state, entry) => ({ ...state, spitproof: entry.spitproof.turns });

// § tick: (state) → the state a passed turn later: the count one down, and the line as it runs out
export function spitproofTick(state) {
  const left = spitproofLeft(state);
  if (!left) return state;
  const now = left - 1, next = { ...state, spitproof: now };
  return now ? next : say(next, 'spitproofEnds');
}
// § slept: (state, turns) → the count `turns` turns later, with no line, as after a night's sleep;
// one left goes too, so the waking turn's tick never says its line over the waking one
export function spitproofSlept(state, turns) {
  const left = spitproofLeft(state) - turns;
  return spitproofLeft(state) ? { ...state, spitproof: left > 1 ? left : 0 } : state;
}
