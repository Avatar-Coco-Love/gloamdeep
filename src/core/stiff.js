// § stiff: the cost of sleeping out without a bed, step 2 (D-758, D-759). Waking on the cold
// ground leaves the hero stiff: `state.stiff` holds the turns left, STIFF.turns at first.
// Each passed turn counts one down; as it wears off, its line. While stiff, a hit on a
// creature misses 1 time in 3 (STIFF.misses), by the seeded dice: the turn passes, nothing
// is hurt, and the miss line is said. A fall ends it, as it ends poisoned. Plain data, no drawing.
import { say } from './lines.js';
import { rng, seedFor } from './rng.js';

export const STIFF = { turns: 20, misses: 1 / 3 };

// The turns of stiff left, 0 without
export const stiffLeft = (state) => state.stiff ?? 0;

// § woke stiff: (state) → the state stiff anew, the count from the start
export const stiffen = (state) => ({ ...state, stiff: STIFF.turns });

// § misses: (state) → whether this turn's hit misses, by the seeded dice; never when not stiff
const STIFF_SALT = 20480; // keeps Stiff's dice apart from the glance's (12288), Tough's (8192) and the drop's (4096)
export const misses = (state) => stiffLeft(state) > 0 && rng(seedFor(state.seed ^ state.turn, STIFF_SALT))() < STIFF.misses;

// § tick: (state) → the state a passed turn later: the count one down, and the line as it wears off
export function stiffTick(state) {
  const left = stiffLeft(state);
  if (!left) return state;
  const now = left - 1, next = { ...state, stiff: now };
  return now ? next : say(next, 'stiffEnds');
}
