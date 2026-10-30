// § growth: what levels give (D-293, answers Q-050). Each level past the first
// gives an ember, spent in the Journal's Growth tab. Plain data, no drawing.
// `state.hearts` counts the hearts bought; a journey without it has bought none.
import { levelOf } from './xp.js';
import { maxHealth, HERO_HEALTH } from './turn.js';
import { BRANCHES, UPGRADES } from './upgrades.js';

export const HEART_COST = 1; // embers for one more heart
export const HEARTS_MORE = 5; // at most 5 more, 10 in all

export const heartsBought = (state) => state.hearts ?? 0;
// The embers left: one for each level reached past the first, less those spent
export const embers = (state) => levelOf(state.xp) - 1 - heartsBought(state) * HEART_COST;
export const canAddHeart = (state) => embers(state) >= HEART_COST && heartsBought(state) < HEARTS_MORE;

// § add a heart: one more heart for good, arriving full (D-293). It can't be
// taken back. No turn passes.
export function addHeart(state) {
  if (!canAddHeart(state)) return state;
  return { ...state, hearts: heartsBought(state) + 1, health: state.health + 1 };
}

// § tree (D-462, D-481): Growth's three branches side by side, each a column of rows, one row
// for each biome reached; embers buy any upgrade in an open row, in any order. Today's hearts
// are Body's first; the branches and upgrades are in upgrades.js.
export const ROWS_OPEN = 1; // the first biome's row; each next one opens on reaching the next biome (D-462)
export const ROWS = ROWS_OPEN + 1; // and one more shown, dim and locked (D-481)
export const START_PICK = { col: 1, row: 0 }; // Body's first, the heart
export const upgradeAt = ({ col, row }) => Object.values(UPGRADES).find((u) => u.branch === BRANCHES[col]?.id && u.row === row) ?? null;

// § pick: an arrow moves the gold outline over the tree's places, row 0 at the bottom, so Up
// climbs (D-481). Gives the new place, the same one at the tree's top, bottom or right edge,
// or null past Light, the left edge, for the Records tab.
export function movePick({ col, row }, dir) {
  if (dir === 'left') return col === 0 ? null : { col: col - 1, row };
  if (dir === 'right') return { col: Math.min(col + 1, BRANCHES.length - 1), row };
  if (dir === 'up') return { col, row: Math.min(row + 1, ROWS - 1) };
  return { col, row: Math.max(row - 1, 0) };
}

// § told: what the picked place says beside the tree: its name, a value line or null, its words,
// and its button { text, cost, can } or null. A place with no upgrade yet is to come; a row not
// open yet is locked.
export function told(state, pick) {
  const u = upgradeAt(pick);
  if (pick.row >= ROWS_OPEN) return { name: 'Locked', value: null, words: 'Opens deeper down.', button: null };
  if (!u) return { name: 'To come', value: null, words: 'More to grow here later.', button: null };
  return { name: u.name, value: `Hearts ${maxHealth(state)} of ${HERO_HEALTH + HEARTS_MORE}`, words: u.words, button: { text: 'Add a heart', cost: `${HEART_COST} ember`, can: canAddHeart(state) } };
}
