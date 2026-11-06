// § fishing: cast, wait, pull at the home pond and the cave pools (D-608, D-610, D-618). The float
// on the water is `state.float`: { x, y, at, bite, nibble, fish, strike? }, or null with no line out.
// `at` is the turn it landed; `bite`, a fish on the line this turn; `nibble`, a fish nibbling, the
// bite next turn (D-613); `fish`, the registry id of the water's fish (D-618); `strike`, once
// pulled, the strike meter's zone, its left as 0..1 (D-614). Plain data.
import { say } from './lines.js';
import { rng, seedFor } from './rng.js';
import { bagAdd, bagSize } from './bag.js';
import { passTurn } from './state.js';
import { note, fresh } from './events.js';
import { HOME } from './homeward.js';
import { get } from './registry.js';

export const NIBBLE_CHANCE = 1 / 6; // each turn the line waits, a nibble, then the bite (D-608, D-613)
export const POND_FISH = 'pondMinnow'; // the home pond's fish (D-608)
export const CAVE_FISH = 'blindCavefish'; // every cave pool's fish (D-618)
const BITE_SALT = 0xf154, ZONE_SALT = 0x57c1;
// § the strike meter (D-614): the zone a quarter of the bar, or the fish's own `zone`, smaller for
// bigger fish (D-612, D-618); the needle goes back and forth 3 passes, each a second; then the fish is gone
export const STRIKE_ZONE = 1 / 4;
export const STRIKE_PASSES = 3;
export const STRIKE_PASS_MS = 1000;

// The fish in the water here: the home pond's, or a cave pool's (D-618); a float cast before it
// kept its fish is the pond's
export const fishHere = (state) => state.place === HOME ? POND_FISH : CAVE_FISH;
const fishOf = (f) => f?.fish ?? POND_FISH;
// The strike meter's zone width for the fish on the line (D-618)
export const zoneWidth = (f) => get(fishOf(f)).zone ?? STRIKE_ZONE;

// § bump: bumping water with the rod held, a turn (endTurn follows, in turn.js). With a fish
// on the line, the pull: the strike meter's card opens, its zone placed by the seed (D-614).
// With the line out and no bite, the bump waits, the float where it is (D-612), a nibble too
// (D-613). Otherwise the line is cast, the float landing on the bumped tile, with a plop.
export function bumpWater(state, x, y) {
  const next = passTurn(state), f = state.float;
  if (f?.bite) return { ...next, float: { ...f, bite: false, strike: zoneFor(state, zoneWidth(f)) } };
  if (f) return next;
  return note(say({ ...next, float: { x, y, at: next.turn, bite: false, nibble: false, fish: fishHere(state) } }, 'castLine'), 'cast');
}
const zoneFor = (state, w) => rng(seedFor(state.seed ^ state.turn, ZONE_SALT))() * (1 - w);

// § the needle: where it is `ms` after the card opened, 0 (left) to 1 (right), left to right,
// back, and again; null once its 3 passes are over (D-614). Its timing is the card's, not a turn's.
export function needleAt(ms) {
  const pass = Math.floor(ms / STRIKE_PASS_MS);
  if (ms < 0 || pass >= STRIKE_PASSES) return null;
  const f = (ms % STRIKE_PASS_MS) / STRIKE_PASS_MS;
  return pass % 2 ? 1 - f : f;
}
// Whether a needle at `n` is in the zone starting at `zone`, `w` wide
export const inZone = (zone, n, w = STRIKE_ZONE) => n !== null && n >= zone && n <= zone + w;

// § strike: the card's tap, free (the pull was the turn), with the needle at `n`, or null when
// its passes ran out. In the zone the fish lands, into the bag, with a splash, saying its `caught`
// line; with no room it slips back, its `slips` line. A miss: "It got away.", and the line comes in (D-614).
export function strikeFish(state, n) {
  const f = state.float, now = fresh(state), id = fishOf(f), fish = get(id);
  if (f?.strike === undefined) return state;
  if (!inZone(f.strike, n, zoneWidth(f))) return say({ ...now, float: null }, 'fishAway');
  const bag = bagAdd(state.bag, id, undefined, bagSize(state));
  if (!bag) return say({ ...now, float: null }, fish.slips);
  return note(note(say({ ...now, bag, float: null }, fish.caught), 'take', { id }), 'catch', { id });
}

// § wait for a bite: at the end of each passed turn (endturn.js). Walking off, another
// room or another tool reels the line in. A bite not pulled within its turn gets away;
// After a nibble the fish always bites, its "!" over the float; otherwise, but on the turn of
// the cast, a fish nibbles 1 time in 6, the float twitching (D-613).
export function fishTurn(before, after) {
  const f = after.float;
  if (!f) return after;
  if (f.strike !== undefined) return before.float?.strike === undefined ? after : say({ ...after, float: null }, 'fishAway'); // a turn passing under the strike meter: gone
  const moved = after.hero.x !== before.hero.x || after.hero.y !== before.hero.y;
  if (after.place !== before.place) return { ...after, float: null };
  if (moved || after.tool !== 'rod') return say({ ...after, float: null }, 'reelIn');
  if (f.bite) return say({ ...after, float: { ...f, bite: false } }, 'fishAway');
  if (after.turn <= f.at) return after;
  if (f.nibble) return say({ ...after, float: { ...f, nibble: false, bite: true } }, 'fishBite');
  const nibbles = rng(seedFor(after.seed ^ after.turn, BITE_SALT + f.x * 64 + f.y))() < NIBBLE_CHANCE;
  return nibbles ? say({ ...after, float: { ...f, nibble: true } }, 'fishNibble') : after;
}
