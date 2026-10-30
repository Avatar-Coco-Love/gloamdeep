// § upgrades: the Growth tree's branches and what embers buy on them (D-462, D-481), gathered
// by the registry. Each upgrade sits on a branch, in a row, row 0 the first biome's. Plain data.
export const BRANCHES = [{ id: 'light', text: 'Light' }, { id: 'body', text: 'Body' }, { id: 'hands', text: 'Hands' }];
export const UPGRADES = {
  heart: { id: 'heart', branch: 'body', row: 0, name: 'Heart', words: 'One more heart for good, arriving full.' },
};
