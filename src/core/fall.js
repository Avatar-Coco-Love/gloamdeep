// § fall and the lost bag: what a fall does in each way to play, and taking
// back the bag left where the hero fell (split from turn.js, D-362).
import { arrive, stepAside, fresh as freshPlace } from './stairs.js';
import { OIL } from './oil.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { bagAdd, bagSize } from './bag.js';
import { priceOf } from './trade.js';
import { note } from './events.js';
import { newJourney, maxHealth, withoutBoon } from './state.js';
import { wakeSpot } from './waking.js';

// § fetch: walking onto the bag where you fell puts back what fits, a stack at a
// time, kinds topping up their stacks first; all back, it is gone with "You take
// back your bag.", else the rest stays in it with "Your bag is full." (MO3, D-345)
export function fetchBag(state, found) {
  const entry = get(found.id), left = [];
  let bag = state.bag;
  for (const s of found.holds || []) {
    let n = 0;
    for (let b; n < s.n && (b = bagAdd(bag, s.id, s.form, bagSize(state))); n++) bag = b;
    if (n < s.n) left.push({ ...s, n: s.n - n });
  }
  const items = state.items.filter((it) => it !== found);
  if (left.length) return say({ ...state, bag, items: [...items, { ...found, holds: left }] }, entry.full);
  return note(say({ ...state, bag, items }, entry.says), 'take', { id: found.id });
}

// § fall: the hero wakes in the last bed slept in, else on the woken home waystone's plate,
// else where the journey began (wakeSpot, waking.js, D-737), with full health and the starting
// oil (D-119, D-136). The world stays as it was: the same seed, every room as left,
// with what was set down, what chests keep and what grows back (D-332). `fell` keeps
// the room as the hero fell in it, for the fall to be shown before they wake (D-234).
// It is a `fall` event. In Normal the bag is left where they fell (dropBag). A line out
// is reeled in, quietly, a strike waiting too (R4, D-667).
// In Hardcore the world starts over instead, from the same seed (D-334, D-344).
export function fall(state) {
  const kept = state.mode === 'normal' && lockets(state) ? keptStack(state.bag) : null; // the locket on the shelf (D-694)
  if (state.mode === 'normal' && state.bag.length) state = dropBag(state, kept);
  if (state.devFlasks) state = { ...state, devFlasks: 0 }; // spawned flasks are no longer told apart (D-720)
  const { room: r, place: at, hero: h, lights: l, enemies: e, items: i, seen: m, oil, lit, turn } = state;
  const fell = { room: r, place: at, hero: h, lights: l, enemies: e, items: i, seen: m, oil, lit, turn, seed: state.seed, health: 0 };
  if (state.mode === 'hardcore') return note({ ...startOver(state.seed), fell }, 'fall');
  const { place, hero } = wakeSpot(state);
  const woke = withoutBoon(place === state.place ? stepAside({ ...state, hero }) : arrive(state, place, state.elsewhere[place] || freshPlace(place, state.seed), hero)); // a fall ends the boon (D-583)
  const awake = { ...woke, fell, health: maxHealth(woke), oil: OIL.start, poisoned: 0, stiff: 0, glow: 0, float: null, globs: [], ...(kept && { bag: [kept] }) };
  return note(kept ? say(awake, 'locketKept', stackWords(kept)) : say(awake, 'fall'), 'fall'); // a fall ends poisoned too (D-654), and stiff (D-759), and the Glow Draught (D-791), and the line (D-667)
}
// § the locket on the shelf (step 20, D-691, D-694): with a shelf holding the locket in
// any room of the world, a Normal fall brings home the bag's stack the peddler would pay
// most for in all (price × how many); a tie goes to the one first in the bag; with
// nothing he buys, nothing is kept. "The locket kept Venom Sac ×3." is said in place of the fall line,
// as both would not fit the strip.
const lockets = (state) => [state.room, ...Object.values(state.elsewhere || {}).map((p) => p.room)]
  .some((room) => room?.map?.some((line) => line.includes(get('locketShelf').letter)));
export function keptStack(bag) {
  let best = null, most = 0;
  for (const s of bag) if (priceOf(s.id) * s.n > most) { best = s; most = priceOf(s.id) * s.n; }
  return best;
}
const stackWords = (s) => (s.n > 1 ? `${get(s.id).name} ×${s.n}` : get(s.id).name);
// § fall view: the room as the hero fell in it (`fell`), with the rest of the world as it was
// just before (`elsewhere`), for the fall's picture and the round map beside it. The map
// reads the floor's other rooms from `elsewhere`; without them it broke and the game
// froze at every fall on a floor of several rooms (D-557). Kept out of the saved state.
export const fallView = (before, after) => ({ ...after.fell, elsewhere: before.elsewhere });
// In Normal the bag stays where the hero fell, its stacks in it, and they wake
// with it empty (MO3, D-334, D-345), or holding only the stack the locket `kept` (D-694).
// The hand keeps its weapon. A bag with only the kept stack in it is not left.
function dropBag(state, kept) {
  const holds = state.bag.filter((s) => s !== kept);
  return { ...state, bag: [], items: holds.length ? [...state.items, { id: 'lostbag', x: state.hero.x, y: state.hero.y, holds }] : state.items };
}
// § start over: Hardcore's fall (MO2, D-344): a new Hardcore world from `seed`, as on
// day one: every room, the bag, the level, the map found and the time of day. The
// profile's Records are kept elsewhere (profile.js). "The world begins again." is said.
export const startOver = (seed) => say(newJourney(seed, 'hardcore'), 'anew'); // at the journey's start (D-735)
