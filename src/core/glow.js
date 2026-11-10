// § glow: the Glow Draught's while (D-786, D-791). Drunk from the bag, any time, `state.glow`
// holds the turns left, its `glow.turns` at first; drunk again while it works, back to the full
// count, never more. Each passed turn counts one down, the lantern empty or not; as it runs
// out, its line. While it works the lantern's light reaches its `glow.reach` tile farther,
// added to Wide Glow's, none while the lantern is empty (boon.js). A night's sleep uses its
// turns too, and a fall ends it, as it ends poisoned and stiff. Plain data, no drawing.
import { get } from './registry.js';
import { say } from './lines.js';

const DRAUGHT = 'glowDraught';
// The turns of glow left, 0 without
export const glowLeft = (state) => state.glow ?? 0;
// The tiles more the draught adds to the lantern's reach, 0 without
export const glowReach = (state) => (glowLeft(state) > 0 ? get(DRAUGHT).glow.reach : 0);
// § drunk: (state, entry) → the state glowing anew, the count from the start
export const glowing = (state, entry) => ({ ...state, glow: entry.glow.turns });

// § tick: (state) → the state a passed turn later: the count one down, and the line as it runs out
export function glowTick(state) {
  const left = glowLeft(state);
  if (!left) return state;
  const now = left - 1, next = { ...state, glow: now };
  return now ? next : say(next, 'glowEnds');
}
// § slept: (state, turns) → the count `turns` turns later, with no line, as after a night's sleep;
// one left goes too, so the waking turn's tick never says its line over the waking one
export function glowSlept(state, turns) {
  const left = glowLeft(state) - turns;
  return glowLeft(state) ? { ...state, glow: left > 1 ? left : 0 } : state;
}
