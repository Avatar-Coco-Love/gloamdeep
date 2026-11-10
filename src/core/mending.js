// § mending: the Mending Draught's while (D-794), the Glow Draught's way (glow.js, D-791).
// Drunk from the bag, any time, `state.mending` holds the turns left, its `mend.turns` at
// first; drunk again while it works, back to the full count, never more. Each passed turn
// counts one down; every `mend.every` turns counted back from the end it gives a heart, the
// last turn too, so 4 in all, never above full, as poisoned takes them (poison.js). As it runs
// out, its line. A night's sleep uses its turns, giving none, and a fall ends it. Plain data,
// no drawing.
import { get } from './registry.js';
import { say } from './lines.js';
import { maxHealth } from './state.js';

const DRAUGHT = 'mendingDraught';
// The turns of mending left, 0 without
export const mendLeft = (state) => state.mending ?? 0;
// § drunk: (state, entry) → the state mending anew, the count from the start
export const mendingBy = (state, entry) => ({ ...state, mending: entry.mend.turns });

// § tick: (state) → the state a passed turn later: the count one down, a heart on every
// `mend.every`-th turn counted back from the end, never above full (the gold hearts of a
// night's rest kept), and the line as it runs out
export function mendTick(state) {
  const left = mendLeft(state);
  if (!left) return state;
  const now = left - 1, due = now % get(DRAUGHT).mend.every === 0;
  const health = due ? Math.max(state.health, Math.min(maxHealth(state), state.health + 1)) : state.health;
  const next = { ...state, mending: now, health };
  return now ? next : say(next, 'mendEnds');
}
// § slept: (state, turns) → the count `turns` turns later, with no line and no hearts, as after
// a night's sleep; one left goes too, so the waking turn's tick never says its line over the waking one
export function mendSlept(state, turns) {
  const left = mendLeft(state) - turns;
  return mendLeft(state) ? { ...state, mending: left > 1 ? left : 0 } : state;
}
