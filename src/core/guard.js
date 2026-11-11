// § guard: Body's row 2 upgrade (D-814, D-817). With Guard bought, a bite the worn vest did
// not turn rolls Guard's own dice, and about 1 in 6 (UPGRADES.guard.glance) glances off and
// hurts nothing, with Guard's line. Only bites: a drink, a glob and a sting are not turned.
// Plain data, no drawing.
import { rng, seedFor } from './rng.js';
import { UPGRADES, grown } from './upgrades.js';

// § guards: (state, e) → whether Guard turns the bite of enemy e this turn, by the seeded dice;
// never without Guard. Each biter rolls apart, by where it stands, as the vest's glance does
const GUARD_SALT = 24576; // keeps Guard's dice apart from the glance's (12288), Tough's (8192), Stiff's (20480) and the drop's (4096)
export const guards = (state, e) => grown(state, 'guard') > 0 && rng(seedFor(state.seed ^ state.turn, GUARD_SALT + e.x * 64 + e.y))() < UPGRADES.guard.glance;
