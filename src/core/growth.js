// § growth: what levels give (D-293, answers Q-050). Each level past the first
// gives an ember, spent in the Journal's Growth tab. Plain data, no drawing.
// `state.hearts` counts the hearts bought; a journey without it has bought none. `state.tough`
// is true once Tough is bought (D-657).
import { levelOf } from './xp.js';
import { maxHealth, HERO_HEALTH } from './turn.js';
import { BRANCHES, UPGRADES } from './upgrades.js';

export const HEART_COST = 1; // embers for one more heart
export const HEARTS_MORE = 5; // at most 5 more, 10 in all

export const TOUGH_COST = 1; // embers for Tough, bought once (D-657)

export const heartsBought = (state) => state.hearts ?? 0;
export const isTough = (state) => !!state.tough;
// The embers left: one for each level reached past the first, less those spent
export const embers = (state) => levelOf(state.xp) - 1 - heartsBought(state) * HEART_COST - (isTough(state) ? TOUGH_COST : 0);
export const canAddHeart = (state) => embers(state) >= HEART_COST && heartsBought(state) < HEARTS_MORE;

// § add a heart: one more heart for good, arriving full (D-293). It can't be
// taken back. No turn passes.
export function addHeart(state) {
  if (!canAddHeart(state)) return state;
  return { ...state, hearts: heartsBought(state) + 1, health: state.health + 1 };
}

// § add Tough: bought once, for good (D-657). No turn passes.
export const canAddTough = (state) => embers(state) >= TOUGH_COST && !isTough(state);
export const addTough = (state) => (canAddTough(state) ? { ...state, tough: true } : state);
// The picked place's upgrade bought, or the state unchanged
export function buyAt(state, pick) {
  const u = upgradeAt(pick);
  return u?.id === 'heart' ? addHeart(state) : u?.id === 'tough' ? addTough(state) : state;
}

// § tree (D-462, D-481): Growth's three branches side by side, each a column of rows, one row
// for each biome reached; embers buy any upgrade in an open row, in any order. Today's hearts
// are Body's first, Tough stacked above them in the same row (D-657); the branches and upgrades
// are in upgrades.js. A place is { col, row, slot }: an open row has one place for each of its
// upgrades on that branch, or one to come; the locked row one.
export const ROWS_OPEN = 1; // the first biome's row; each next one opens on reaching the next biome (D-462)
export const ROWS = ROWS_OPEN + 1; // and one more shown, dim and locked (D-481)
export const START_PICK = { col: 1, row: 0, slot: 0 }; // Body's first, the heart
export const upgradeAt = ({ col, row, slot = 0 }) => Object.values(UPGRADES).find((u) => u.branch === BRANCHES[col]?.id && u.row === row && u.slot === slot) ?? null;
// A branch's places from the bottom up
export function placesOf(col) {
  const here = Object.values(UPGRADES).filter((u) => u.branch === BRANCHES[col]?.id);
  return Array.from({ length: ROWS }, (_, row) => {
    const n = row < ROWS_OPEN ? Math.max(1, ...here.filter((u) => u.row === row).map((u) => u.slot + 1)) : 1;
    return Array.from({ length: n }, (_, slot) => ({ col, row, slot }));
  }).flat();
}
// How high a place stands on its branch, 0 at the bottom
const heightOf = ({ col, row, slot = 0 }) => Math.max(0, placesOf(col).findIndex((p) => p.row === row && p.slot === slot));

// § pick: an arrow moves the gold outline over the tree's places, row 0 at the bottom, so Up
// climbs (D-481) through a branch's places, Tough above the heart (D-657). Left and Right go to
// the place as high on the next branch, or its top one. Gives the new place, the same one at the
// tree's top, bottom or right edge, or null past Light, the left edge, for the Records tab.
export function movePick(pick, dir) {
  const { col } = pick, h = heightOf(pick), on = (c, i) => { const ps = placesOf(c); return ps[Math.max(0, Math.min(i, ps.length - 1))]; };
  if (dir === 'left') return col === 0 ? null : on(col - 1, h);
  if (dir === 'right') return on(Math.min(col + 1, BRANCHES.length - 1), h);
  return on(col, dir === 'up' ? h + 1 : h - 1);
}

// § told: what the picked place says beside the tree: its name, a value line or null, its words,
// and its button { text, cost, can } or null. A place with no upgrade yet is to come; a row not
// open yet is locked.
export function told(state, pick) {
  const u = upgradeAt(pick);
  if (pick.row >= ROWS_OPEN) return { name: 'Locked', value: null, words: 'Opens deeper down.', button: null };
  if (!u) return { name: 'To come', value: null, words: 'More to grow here later.', button: null };
  if (u.id === 'tough') return { name: u.name, value: isTough(state) ? 'Bought' : null, words: u.words, button: isTough(state) ? null : { text: 'Get Tough', cost: `${TOUGH_COST} ember`, can: canAddTough(state) } };
  return { name: u.name, value: `Hearts ${maxHealth(state)} of ${HERO_HEALTH + HEARTS_MORE}`, words: u.words, button: { text: 'Add a heart', cost: `${HEART_COST} ember`, can: canAddHeart(state) } };
}
