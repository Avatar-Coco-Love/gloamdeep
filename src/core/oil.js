// § oil: how much oil the lantern holds, and how far that lets its light
// reach (D-014). Plain data, no drawing. Oil runs from 0 (empty) to 1 (full).
// The amounts are style study 1's (lines 278, 394), burning a third slower (D-064, D-069),
// starting with a full tank (D-142).

const TILE_SIZE = 16;
export const OIL = { start: 1, burn: 1 / 60 };

// Each passed turn burns `burn`, even standing still (D-037): 60 empty a full tank, 75 with
// the Copper Wick (D-483). A last sliver of rounding counts as empty.
export const burnOil = (oil, burn = OIL.burn) => (oil - burn > 1e-9 ? oil - burn : 0);

// § reach: 1.6 tiles plus 3.6 per full tank; an empty lantern is a 0.9-tile ember (D-015).
export const reach = (oil) => (oil > 0 ? 1.6 + 3.6 * oil : 0.9) * TILE_SIZE;

// § set: (state, amount) → new state, for the dev Refill and Empty buttons (D-066)
export const setOil = (state, oil) => ({ ...state, oil: Math.max(0, Math.min(1, oil)) });
