// § poison: poisoned, the first debuff (D-652, D-654). A creature whose entry `poisons` leaves
// the hero poisoned when its bite hurts: `state.poisoned` holds the turns left, POISON.turns at
// first. Each passed turn after the bite counts one down; every POISON.every turns it takes a
// heart, a `poison` event, so 2 in all. With the Antidote in, it can take the last heart, and
// the hero falls (D-655; until then it never did, D-654). A new bite starts the count again and
// never stacks. As it wears off, its line. A fall ends it. In god mode it takes no heart, as a
// bite (D-625); its event still says what it would take. Worn, the Centipede Charm makes it
// last 3 turns, 1 heart in all (D-656). With Tough bought, a hurting bite poisons only 1 time
// in 2, by the seeded dice (D-657). Plain data, no drawing.
import { say } from './lines.js';
import { note } from './events.js';
import { fall } from './fall.js';
import { poisonTurnsOf } from './worn.js';
import { rng, seedFor } from './rng.js';
import { UPGRADES } from './upgrades.js';

export const POISON = { turns: 6, every: 3 };

// The turns of poison left, 0 without
export const poisonLeft = (state) => state.poisoned ?? 0;

// § bitten: (state) → the state poisoned anew, the count from the start: POISON.turns, or
// fewer with a charm worn (D-656)
export const poisonedBy = (state) => ({ ...state, poisoned: poisonTurnsOf(state, POISON.turns) });

// § shrugs: (state) → whether Tough turns this turn's poison aside, by the seeded dice (D-657);
// never without Tough
const TOUGH_SALT = 8192; // keeps Tough's dice apart from the glance's and the flee's
export const shrugs = (state) => !!state.tough && rng(seedFor(state.seed ^ state.turn, TOUGH_SALT))() >= UPGRADES.tough.poisons;

// § tick: (state) → the state a passed turn later: the count one down, a heart on every
// POISON.every-th turn counted back from the end, the last one too, so the hero falls (D-655), and the line as it wears off
export function poisonTick(state) {
  const left = poisonLeft(state);
  if (!left) return state;
  const now = left - 1, due = now % POISON.every === 0;
  const hurt = due ? 1 : 0;
  let next = { ...state, poisoned: now, health: state.god ? state.health : state.health - hurt };
  if (due) next = note(next, 'poison', { hurt });
  if (next.health <= 0) return fall(next);
  return now ? next : say(next, 'poisonEnds');
}
