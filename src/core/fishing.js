// § fishing: cast, wait, pull at the home pond (D-608, D-610). The float on the water is
// `state.float`: { x, y, at, bite, nibble }, or null with no line out. `at` is the turn it
// landed; `bite`, a fish on the line this turn; `nibble`, a fish nibbling, the bite next turn
// (D-613). Plain data, no drawing.
import { say } from './lines.js';
import { rng, seedFor } from './rng.js';
import { bagAdd, bagSize } from './bag.js';
import { passTurn } from './state.js';
import { note } from './events.js';
import { HOME } from './homeward.js';

export const NIBBLE_CHANCE = 1 / 6; // each turn the line waits, a nibble, then the bite (D-608, D-613)
export const POND_FISH = 'pondMinnow'; // the home pond's fish (D-608)
const BITE_SALT = 0xf154;

// Whether water here can be fished yet: the pond at home only; cave pools at their own step
export const fishable = (state) => state.place === HOME;

// § bump: bumping water with the rod held, a turn (endTurn follows, in turn.js). With a fish
// on the line it lands, into the bag, the line coming in with it; with no room it slips
// back (D-610). With the line out and no bite, the bump waits, the float where it is
// (D-612), a nibble too (D-613). Otherwise the line is cast, the float landing on the bumped
// tile, with a plop; a catch splashes (D-613).
export function bumpWater(state, x, y) {
  const next = passTurn(state);
  if (state.float && !state.float.bite) return next;
  if (!state.float?.bite) return note(say({ ...next, float: { x, y, at: next.turn, bite: false, nibble: false } }, 'castLine'), 'cast');
  const bag = bagAdd(state.bag, POND_FISH, undefined, bagSize(state));
  if (!bag) return say({ ...next, float: null }, 'fishSlip');
  return note(note(say({ ...next, bag, float: null }, 'fishCatch'), 'take', { id: POND_FISH }), 'catch', { id: POND_FISH });
}

// § wait for a bite: at the end of each passed turn (endturn.js). Walking off, another
// room or another tool reels the line in. A bite not pulled within its turn gets away;
// After a nibble the fish always bites, its "!" over the float; otherwise, but on the turn of
// the cast, a fish nibbles 1 time in 6, the float twitching (D-613).
export function fishTurn(before, after) {
  const f = after.float;
  if (!f) return after;
  const moved = after.hero.x !== before.hero.x || after.hero.y !== before.hero.y;
  if (after.place !== before.place) return { ...after, float: null };
  if (moved || after.tool !== 'rod') return say({ ...after, float: null }, 'reelIn');
  if (f.bite) return say({ ...after, float: { ...f, bite: false } }, 'fishAway');
  if (after.turn <= f.at) return after;
  if (f.nibble) return say({ ...after, float: { ...f, nibble: false, bite: true } }, 'fishBite');
  const nibbles = rng(seedFor(after.seed ^ after.turn, BITE_SALT + f.x * 64 + f.y))() < NIBBLE_CHANCE;
  return nibbles ? say({ ...after, float: { ...f, nibble: true } }, 'fishNibble') : after;
}
