// § fang: the Fang Charm (D-809). Worn, each creature beaten (struck down, or a pile of bones
// scattered) has a coin of its own, about `fang` in 1, to give the hero back 1 heart; at full
// hearts nothing happens. The coin is seeded from the seed, the turn and the creature's tile, as
// a drop's is (turn.js), so a replay heals the same. Healed, a `fang` event, for the heart rising
// over the hero, and the fang's line, said over the creature's own. Plain data, no drawing.
import { fangOf } from './worn.js';
import { maxHealth } from './state.js';
import { rng, seedFor } from './rng.js';
import { note } from './events.js';
import { say } from './lines.js';

// (state, foe) → the state, a heart back or not, for one creature `foe` just beaten
export function fangMend(state, foe) {
  const chance = fangOf(state);
  if (!chance || state.health >= maxHealth(state)) return state;
  if (rng(seedFor(state.seed ^ state.turn, foe.x * 64 + foe.y + 8192))() >= chance) return state;
  return say(note({ ...state, health: state.health + 1 }, 'fang', { id: foe.id }), 'fangCharmMend');
}
