// § danger: what the round map's rim shows (Q-109, D-921). Plain data, no drawing.
// 'chase' when any creature in the room is chasing the hero, near or far; else 'near' when one is
// close to noticing them: one that comes for the hero (its ways notice and move toward), awake, that
// would notice them where it stands, or from a free tile beside it one step nearer, by the same
// rules as its turn (noticesHero: lit, near or any line, Soft Step, the Shade Draught, its sight);
// else null. Ones that seek light, lure or only spit never count.
import { get } from './registry.js';
import { traits } from './behaviours.js';
import { DIRS } from './state.js';
import { noticesHero, still, free } from './creatureturn.js';
import { onTheWay } from './follow.js';

const steps = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

// § close: (state, e) → whether `e` is close to noticing the hero
export function closeToNoticing(state, e) {
  if (e.chasing || still(e)) return false;
  const t = traits(get(e.id));
  if (!t.notices || t.moves !== 'toward') return false;
  if (noticesHero(state, e, t)) return true;
  return Object.values(DIRS).some(([dx, dy]) => {
    const at = { ...e, x: e.x + dx, y: e.y + dy };
    return steps(at, state.hero) < steps(e, state.hero) && free(state, e, at.x, at.y) && noticesHero(state, at, t);
  });
}

// § danger now: (state) → 'chase', 'near' or null
export function dangerNow(state) {
  if (state.enemies.some((e) => e.chasing) || onTheWay(state)) return 'chase'; // one following on its way too (D-925)
  return state.enemies.some((e) => closeToNoticing(state, e)) ? 'near' : null;
}
