// § echo: the Echo Charm (D-805). Worn, each creature within its `echo` tiles of the hero (counted
// the king's way, so diagonals are one step), walls between or not, that no light shines on now,
// is echoed: drawn as a pale outline over the dark (sprites.js). One in disguise (a mimic asleep,
// a snapcap shut) stays hidden, that being the Gloam Eye's work later (D-799); one with its own
// glow shows already (D-649). Echoed is not met: the Bestiary still waits for light. Plain data,
// no drawing.
import { echoOf } from './worn.js';
import { litAt } from './sight.js';
import { shows } from './bestiary.js';
import { get } from './registry.js';

// (state) → the enemies echoed now, none without the charm
export function echoed(state) {
  const n = echoOf(state), { hero } = state;
  if (!n) return [];
  return state.enemies.filter((e) => Math.max(Math.abs(e.x - hero.x), Math.abs(e.y - hero.y)) <= n
    && !get(e.id)?.glows && shows(state, e) && !litAt(state, e.x, e.y));
}
