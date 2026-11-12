// § lasting: each lasting effect's longest time, so its mark's rim is full there and dark at 0
// (D-847): Warmed's from the warmest fire to sit by (blazing 60), each draught's from its own
// turns, all read from the registry; poisoned's and stiff's from their own rules, 6 and 20 (D-848).
// Plain data, no drawing.
import { ALL } from './registry.js';
import { POISON } from './poison.js';
import { STIFF } from './stiff.js';

// state key → where an entry keeps the turns it gives
const GIVES = { warmed: (e) => e.sits?.warm, glow: (e) => e.glow?.turns, slowburn: (e) => e.slow?.turns, mending: (e) => e.mend?.turns, ward: (e) => e.ward?.turns, spitproof: (e) => e.spitproof?.turns, shade: (e) => e.shade?.turns };
export const LONGEST = Object.fromEntries([...Object.entries(GIVES).map(([key, of]) => [key, Math.max(0, ...ALL.map(of).filter((n) => typeof n === 'number'))]), ['poisoned', POISON.turns], ['stiff', STIFF.turns]]);
// The share of its longest time left, 0 to 1
export const shareLeft = (state, key) => (LONGEST[key] > 0 ? Math.min(1, Math.max(0, (state[key] ?? 0) / LONGEST[key])) : 0);
