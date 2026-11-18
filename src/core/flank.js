// § flank: the Lampeater's step 2 (D-972). While one whose entry names its `flankers` (the
// Lampeater, its gloamlings) comes for the hero, chasing and not caught, each of those kinds
// chasing the hero takes the free tiles beside them away from it, as a rat pack spreads (D-727),
// leaving the side toward it open: of the 4 tiles beside the hero, the one fewest steps from it,
// the first of up, down, left, right on a tie. One beside the hero stays and bites; one on that
// open side bites, then steps off it toward another free side, nearest first, else onto the free
// tile beside it nearest the hero. One on its way heads for a free side no other holds or heads for
// this turn, the farthest from its kind first, then the nearest to it, by the shortest way round that
// never crosses the open side; with no way to any, it comes as ever. Else they act as ever. Plain data, no drawing.
import { get } from './registry.js';
import { DIRS } from './state.js';

const steps = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const same = (a, b) => a.x === b.x && a.y === b.y;
const around = (t) => Object.values(DIRS).map(([dx, dy]) => ({ x: t.x + dx, y: t.y + dy }));

// § lead: (enemies, e) → the one coming for the hero that e flanks for, or undefined
export const flankLead = (enemies, e) => enemies.find((o) => o !== e && get(o.id).flankers === e.id && o.chasing && !o.caught && !o.asleep);

// § open side: (hero, lead) → the tile beside the hero left open toward it
export const openSide = (hero, lead) => around(hero).reduce((b, t) => (steps(t, lead) < steps(b, lead) ? t : b));

// The first tile on the shortest way over free tiles from e to `to`, never through `shut`, or null when
// there is none within `FAR` steps; of the first tiles that start such a way, the first of up, down, left, right
const FAR = 12;
function stepTo(state, e, to, shut, free) {
  const key = (t) => `${t.x},${t.y}`, seen = new Set([key(e), key(shut)]);
  let ring = around(e).filter((t) => !same(t, shut) && free(state, e, t.x, t.y)).map((t) => ({ ...t, first: t }));
  ring.forEach((t) => seen.add(key(t)));
  for (let n = 0; ring.length && n < FAR; n++) {
    const there = ring.find((t) => same(t, to));
    if (there) return there.first;
    ring = ring.flatMap((t) => around(t).map((a) => ({ ...a, first: t.first })))
      .filter((t) => !seen.has(key(t)) && seen.add(key(t)) && free(state, e, t.x, t.y));
  }
  return null;
}

// § flank step: (state, e, claims, lead, free) → the tile e steps onto (its own tile to stay), or null to come as ever
export function flankStep(state, e, claims, lead, free) { // `free`: whether e may step onto a tile (creatureturn.js)
  const hero = state.hero, shut = openSide(hero, lead), beside = steps(e, hero) === 1;
  if (beside && !same(e, shut)) return e;
  const kin = state.enemies.filter((o) => o !== e && o.id === e.id);
  const apart = (t) => Math.min(...kin.map((o) => steps(o, t)));
  const sides = around(hero).filter((t) => !same(t, shut) && free(state, e, t.x, t.y) && !claims.some((c) => same(c, t)));
  const order = beside ? (a, b) => steps(e, a) < steps(e, b) : (a, b) => apart(a) > apart(b) || (apart(a) === apart(b) && steps(e, a) < steps(e, b));
  for (const t of [...sides].sort((a, b) => (order(a, b) ? -1 : order(b, a) ? 1 : 0))) {
    const to = stepTo(state, e, t, shut, free);
    if (to) { claims.push(t); return to; }
  }
  if (!beside) return null;
  const off = around(e).filter((t) => !same(t, hero) && free(state, e, t.x, t.y)); // off the open side, any way
  return off.reduce((best, t) => (!best || steps(t, hero) < steps(best, hero) ? t : best), null) || e;
}
