// § guarding: the Lampeater's step 4 (D-972, D-976). Only while `calls.most` of its brood are alive
// (or waiting in a bowl, as its calls count them, call.js), the 2 of them nearest one whose entry names
// them its `flankers` (the Lampeater, its gloamlings) guard it, chosen again each turn (fewest steps,
// the first in the list on a tie): they follow it and hold its shoulders, the two tiles beside it
// across from the line to the hero, leaving the side toward the hero (the tile beside it fewest steps
// from them, the first of up, down, left, right on a tie) open and the side behind it too; a shoulder
// in a wall gives its place to the side behind. Each takes the free one nearest it that the other
// does not hold or head for this turn, by the shortest way round that never crosses the open side; on
// one, it stays. One beside the hero bites as ever, then goes back, never chasing. Lit, they back off
// as ever (creatureturn.js), back to it in the dark. With no way to one, it acts as ever. With fewer
// alive, they act as the rest. No mark: their place shows it. Plain data, no drawing.
import { get } from './registry.js';
import { openSide, stepTo } from './flank.js';
import { broodCount } from './call.js';
import { tileAt } from './room.js';

const steps = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const same = (a, b) => a.x === b.x && a.y === b.y;

// § guard lead: (state, e) → the one e guards, or undefined
export function guardLead(state, e) {
  const lead = state.enemies.find((o) => o !== e && get(o.id).flankers === e.id && get(o.id).calls && !o.asleep);
  if (!lead || broodCount(state, lead) < get(lead.id).calls.most) return undefined;
  const two = state.enemies.map((o, i) => ({ o, i })).filter(({ o }) => o.id === e.id && !o.asleep)
    .sort((a, b) => steps(a.o, lead) - steps(b.o, lead) || a.i - b.i).slice(0, 2);
  return two.some(({ o }) => o === e) ? lead : undefined;
}

// § posts: (state, lead) → { front, posts }: the side of it left open toward the hero, and the tiles its guards hold
export function posts(state, lead) {
  const front = openSide(lead, state.hero), dx = front.x - lead.x, dy = front.y - lead.y;
  const back = { x: lead.x - dx, y: lead.y - dy };
  const shoulders = dx ? [{ x: lead.x, y: lead.y - 1 }, { x: lead.x, y: lead.y + 1 }] : [{ x: lead.x - 1, y: lead.y }, { x: lead.x + 1, y: lead.y }];
  return { front, posts: shoulders.map((t) => (tileAt(state.room, t.x, t.y).solid ? back : t)).filter((t, i, all) => all.findIndex((o) => same(o, t)) === i) };
}

// § guard step: (state, e, lead, claims, free) → the tile e steps onto (its own tile to stay), or null to act as ever
export function guardStep(state, e, lead, claims, free) { // `free`: whether e may step onto a tile (creatureturn.js)
  const { front, posts: held } = posts(state, lead);
  const open = held.filter((t) => !claims.some((c) => same(c, t)) && (same(t, e) || free(state, e, t.x, t.y)));
  for (const t of open.sort((a, b) => steps(e, a) - steps(e, b))) {
    const to = same(t, e) ? e : stepTo(state, e, t, front, free);
    if (to) { claims.push(t); return to; }
  }
  return null;
}
