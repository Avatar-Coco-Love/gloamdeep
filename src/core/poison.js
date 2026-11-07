// § poison: poisoned, the first debuff (D-652, D-654). A creature whose entry `poisons` leaves
// the hero poisoned when its bite hurts: `state.poisoned` holds the turns left, POISON.turns at
// first. Each passed turn after the bite counts one down; every POISON.every turns it takes a
// heart, a `poison` event, so 2 in all. It never takes the last heart: at 1 heart it hurts
// nothing until the Antidote is in (the owner's words). A new bite starts the count again and
// never stacks. As it wears off, its line. A fall ends it. In god mode it takes no heart, as a
// bite (D-625); its event still says what it would take. Plain data, no drawing.
import { say } from './lines.js';
import { note } from './events.js';

export const POISON = { turns: 6, every: 3 };

// The turns of poison left, 0 without
export const poisonLeft = (state) => state.poisoned ?? 0;

// § bitten: (state, poisoned) → the state poisoned anew, the count from the start
export const poisonedBy = (state) => ({ ...state, poisoned: POISON.turns });

// § tick: (state) → the state a passed turn later: the count one down, a heart on every
// POISON.every-th turn, never the last, and the line as it wears off
export function poisonTick(state) {
  const left = poisonLeft(state);
  if (!left) return state;
  const now = left - 1, due = (POISON.turns - now) % POISON.every === 0;
  const hurt = due && state.health > 1 ? 1 : 0;
  let next = { ...state, poisoned: now, health: state.god ? state.health : state.health - hurt };
  if (due) next = note(next, 'poison', { hurt });
  return now ? next : say(next, 'poisonEnds');
}
