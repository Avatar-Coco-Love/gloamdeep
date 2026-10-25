// § fall and the lost bag: what a fall does in each way to play, and taking
// back the bag left where the hero fell (split from turn.js, D-362).
import { arrive, fresh as freshPlace } from './stairs.js';
import { OIL } from './oil.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { bagAdd } from './bag.js';
import { note } from './events.js';
import { makeWorld, maxHealth } from './state.js';

// § fetch: walking onto the bag where you fell puts back what fits, a stack at a
// time, kinds topping up their stacks first; all back, it is gone with "You take
// back your bag.", else the rest stays in it with "Your bag is full." (MO3, D-345)
export function fetchBag(state, found) {
  const entry = get(found.id), left = [];
  let bag = state.bag;
  for (const s of found.holds || []) {
    let n = 0;
    for (let b; n < s.n && (b = bagAdd(bag, s.id, s.form)); n++) bag = b;
    if (n < s.n) left.push({ ...s, n: s.n - n });
  }
  const items = state.items.filter((it) => it !== found);
  if (left.length) return say({ ...state, bag, items: [...items, { ...found, holds: left }] }, entry.full);
  return note(say({ ...state, bag, items }, entry.says), 'take', { id: found.id });
}

// § fall: back to the start of the first room, with full health and the starting
// oil (D-119, D-136). The world stays as it was: the same seed, every room as left,
// with what was set down, what chests keep and what grows back (D-332). `fell` keeps
// the room as the hero fell in it, for the fall to be shown before they wake (D-234).
// It is a `fall` event. In Normal the bag is left where they fell (dropBag).
// In Hardcore the world starts over instead, from the same seed (D-334, D-344).
export function fall(state) {
  if (state.mode === 'normal' && state.bag.length) state = dropBag(state);
  const { room: r, place: at, hero: h, lights: l, enemies: e, items: i, seen: m, oil, lit, turn } = state;
  const fell = { room: r, place: at, hero: h, lights: l, enemies: e, items: i, seen: m, oil, lit, turn, seed: state.seed, health: 0 };
  if (state.mode === 'hardcore') return note({ ...startOver(state.seed), fell }, 'fall');
  const { place, hero } = state.home;
  const woke = place === state.place ? { ...state, hero } : arrive(state, place, state.elsewhere[place] || freshPlace(place, state.seed), hero);
  return note(say({ ...woke, fell, health: maxHealth(state), oil: OIL.start }, 'fall'), 'fall');
}
// In Normal the bag stays where the hero fell, its stacks in it, and they wake
// with it empty (MO3, D-334, D-345). The hand keeps its weapon.
const dropBag = (state) => ({ ...state, bag: [], items: [...state.items, { id: 'lostbag', x: state.hero.x, y: state.hero.y, holds: state.bag }] });
// § start over: Hardcore's fall (MO2, D-344): a new Hardcore world from `seed`, as on
// day one: every room, the bag, the level, the map found and the time of day. The
// profile's Records are kept elsewhere (profile.js). "The world begins again." is said.
export const startOver = (seed) => say(makeWorld('first', seed, 'hardcore'), 'anew');
