// § starts (D-735, answers Q-087): where a new journey may begin, one entry a start, so a new
// start later is a new entry. Plain data, no imports: state.js works out the room and the tile.
// Each start: `row`, the Hearthwood row its room is picked from, the seed picking, never the
// cave mouth's room; `tile`, where in the room the hero stands; `lit`, the lantern at the start;
// `opening`, the card's words (D-628); `goals`: `skip`, teaching goals it never shows; `now`,
// those shown from its first turn; `how`, words it changes. Every other goal keeps its own
// moment (D-706). A start's own aims beyond teaching are settled at that start (the owner's pick).
export const STARTS = {
  southWoods: {
    id: 'southWoods', name: 'South woods', row: 'south', tile: 'middle', lit: false,
    opening: [
      'You wake among the trees of Hearthwood.',
      'Your lantern is cold; keep its oil for the dark.',
      'Something waits below.',
    ],
    goals: { skip: ['home'], now: ['stone'], how: { stone: 'Home is in the middle of the woods.' } },
  },
};
// The start every new journey uses, for now the only one (D-733)
export const START = 'southWoods';
// The start of a journey, or null for one begun in the crypt before starts (older saves)
export const startOf = (state) => (state?.start && STARTS[state.start]) || null;
