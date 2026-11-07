// § upgrades: the Growth tree's branches and what embers buy on them (D-462, D-481), gathered
// by the registry. Each upgrade sits on a branch, in a row, row 0 the first biome's, and in a
// row's places stacked from the bottom, its `slot`, 0 the first (D-657). Plain data.
export const BRANCHES = [{ id: 'light', text: 'Light' }, { id: 'body', text: 'Body' }, { id: 'hands', text: 'Hands' }];
export const UPGRADES = {
  heart: { id: 'heart', branch: 'body', row: 0, slot: 0, name: 'Heart', words: 'One more heart for good, arriving full.' },
  // A bite that hurts poisons the hero only this often, by the seeded dice (D-657)
  tough: { id: 'tough', branch: 'body', row: 0, slot: 1, name: 'Tough', words: 'A bite that hurts poisons you only 1 time in 2.', poisons: 0.5 },
};
