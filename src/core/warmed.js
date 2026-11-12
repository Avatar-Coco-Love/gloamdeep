// § warmed: a campfire's second gift (D-845, Q-088's buff, step 2). Sitting by a burning fire
// leaves the hero Warmed: `state.warmed` holds the turns left, the tile's `sits.warm` at first,
// blazing 60, embers 30; sitting again sets the longer count, never a shorter one. Each passed
// turn counts one down, the lantern empty or not; as it runs out, its line. While it works a
// lit turn burns WARMED.burn of its oil, so a full tank lasts 70 turns, not 60, as Slowburn
// does and added to it and the Heart Charm (state.js). A night's sleep uses its turns too, and
// a fall ends it. Plain data, no drawing.
import { sayEnd } from './lines.js';

export const WARMED = { burn: 6 / 7 };

// The turns of Warmed left, 0 without
export const warmLeft = (state) => state.warmed ?? 0;
// The burn while Warmed, 1 without
export const warmBurn = (state) => (warmLeft(state) > 0 ? WARMED.burn : 1);
// § sat: (state, turns) → the state warmed for the longer of its turns left and `turns`
export const warming = (state, turns) => ({ ...state, warmed: Math.max(warmLeft(state), turns ?? 0) });

// § tick: (state) → the state a passed turn later: the count one down, and the line as it runs out
export function warmTick(state) {
  const left = warmLeft(state);
  if (!left) return state;
  const now = left - 1, next = { ...state, warmed: now };
  return now ? next : sayEnd(next, 'warmEnds');
}
// § slept: (state, turns) → the count `turns` turns later, with no line, as after a night's sleep;
// one left goes too, so the waking turn's tick never says its line over the waking one
export function warmSlept(state, turns) {
  const left = warmLeft(state) - turns;
  return warmLeft(state) ? { ...state, warmed: left > 1 ? left : 0 } : state;
}
