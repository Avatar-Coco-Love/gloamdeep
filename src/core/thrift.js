// § thrift: Hands' row 2 upgrade (D-814, D-818). With Thrift bought, about 1 making in 4
// (UPGRADES.thrift.keeps) keeps 1 of the part its recipe uses most of, the first listed on a
// tie: the Mortar's 4 Stone and 1 Wood keep 1 Stone. Every making: the bag's, the bench's, the
// mortar's, the Pouch and the Big Bag. The full cost is still needed; 1 fewer is taken, and
// "You keep 1 Stone." is said in place of the make line. Plain data, no drawing.
import { rng, seedFor } from './rng.js';
import { UPGRADES, grown } from './upgrades.js';
import { get } from './registry.js';
import { say } from './lines.js';

// § kept: the part a cost { id: n } keeps, the one used most of, the first on a tie
export const keptOf = (of) => Object.entries(of).reduce((most, e) => (e[1] > most[1] ? e : most))[0];
// § thrifts: whether Thrift keeps a part on this making, by the seeded dice; never without it
const THRIFT_SALT = 28672; // keeps Thrift's dice apart from Guard's (24576), Stiff's (20480), the glance's (12288), Tough's (8192) and the drop's (4096)
export const thrifts = (state) => grown(state, 'thrift') > 0 && rng(seedFor(state.seed ^ state.turn, THRIFT_SALT))() < UPGRADES.thrift.keeps;
// § thrift: (state, of) → { of, kept }: the cost to take, 1 fewer of the kept part when the
// dice say so, and that part's id, or null
export function thrift(state, of) {
  if (!thrifts(state)) return { of, kept: null };
  const kept = keptOf(of), left = { ...of, [kept]: of[kept] - 1 };
  if (!left[kept]) delete left[kept];
  return { of: left, kept };
}
// § kept line: "You keep 1 Stone." in place of the make line `says` when a part was kept
export const keptSay = (state, kept, says) => (kept ? say(state, 'thriftKeep', get(kept).name) : say(state, says));
