// § upgrades: the Growth tree's branches and what embers buy on them (D-462, D-481), gathered
// by the registry. Each upgrade sits on a branch, in a row, row 0 the first biome's, and in a
// row's places stacked from the bottom, its `slot`, 0 the first (D-657). Each has its cost in
// embers, the most times it can be bought, `most`, and its `look` in the tree; `get`, its
// button's words where not "Get" and its name; `heals`, hearts it fills as it is bought. What a
// journey bought is one record, `state.grown`, each upgrade's id and how many times (D-811).
// Plain data.
export const BRANCHES = [{ id: 'light', text: 'Light' }, { id: 'body', text: 'Body' }, { id: 'hands', text: 'Hands' }];
export const UPGRADES = {
  // Light's first: a lit turn burns this much of its oil, for good, a full tank lasting about 66
  // turns, not 60, added to the rest (D-798); `short`, its name in a box too narrow for the whole
  steadyWick: { id: 'steadyWick', branch: 'light', row: 0, slot: 0, name: 'Steady Wick', short: 'Steady', words: 'The lantern burns a little slower, for good.', cost: 1, most: 1, look: 'flame', burn: 0.9 },
  heart: { id: 'heart', branch: 'body', row: 0, slot: 0, name: 'Heart', words: 'One more heart for good, arriving full.', cost: 1, most: 5, look: 'hearts', get: 'Add a heart', heals: 1 },
  // A bite that hurts poisons the hero only this often, by the seeded dice (D-657)
  tough: { id: 'tough', branch: 'body', row: 0, slot: 1, name: 'Tough', words: 'A bite that hurts poisons you only 1 time in 2.', cost: 1, most: 1, look: 'drop', poisons: 0.5 },
};
// § grown: how many times a journey bought an upgrade, 0 for none (D-811)
export const grown = (state, id) => state.grown?.[id] ?? 0;
