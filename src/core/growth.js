// § growth: what levels give (D-293, answers Q-050). Each level past the first
// gives an ember, spent in the Journal's Growth tab. Plain data, no drawing.
// What was bought is one record, `state.grown` (D-811, upgrades.js): each upgrade's id and how
// many times; a journey without it has bought nothing.
import { levelOf } from './xp.js';
import { maxHealth, HERO_HEALTH } from './turn.js';
import { BRANCHES, UPGRADES, grown } from './upgrades.js';

export const HEARTS_MORE = UPGRADES.heart.most; // at most 5 more, 10 in all
export const heartsBought = (state) => grown(state, 'heart');

// The embers left: one for each level reached past the first, less those spent
const spent = (state) => Object.values(UPGRADES).reduce((n, u) => n + grown(state, u.id) * u.cost, 0);
export const embers = (state) => levelOf(state.xp) - 1 - spent(state);

// § buy: an upgrade bought once more, for good, while an ember pays for it and it is not bought
// its most times; one that heals fills that many hearts (Heart arrives full, D-293). It can't be
// taken back. No turn passes.
export const canBuy = (state, id) => { const u = UPGRADES[id]; return !!u && embers(state) >= u.cost && grown(state, id) < u.most; };
export function buy(state, id) {
  if (!canBuy(state, id)) return state;
  const u = UPGRADES[id], bought = { ...state, grown: { ...state.grown, [id]: grown(state, id) + 1 } };
  return u.heals ? { ...bought, health: state.health + u.heals } : bought;
}
// The picked place's upgrade bought, or the state unchanged
export const buyAt = (state, pick) => buy(state, upgradeAt(pick)?.id);

// § tree (D-462, D-481, D-811): Growth's three branches side by side, each a limb, and across
// them a twig for each biome reached, row 0 the first at the bottom; embers buy any upgrade in an
// open row, in any order. On a row's twig each branch's upgrades sit side by side, by their slot
// (Tough beside the heart); the branches and upgrades are in upgrades.js. A place is
// { col, row, slot }: an open row has one place for each of a branch's upgrades in it, or one
// to come where it has none; the locked row one a branch.
export const ROWS_OPEN = 1; // the first biome's row; each next one opens on reaching the next biome (D-462)
export const ROWS = ROWS_OPEN + 1; // and one more shown, dim and locked (D-481)
export const START_PICK = { col: 1, row: 0, slot: 0 }; // Body's first, the heart
export const upgradeAt = ({ col, row, slot = 0 }) => Object.values(UPGRADES).find((u) => u.branch === BRANCHES[col]?.id && u.row === row && u.slot === slot) ?? null;
// How many places a branch has in a row
export function placesIn(col, row) {
  const here = Object.values(UPGRADES).filter((u) => u.branch === BRANCHES[col]?.id && u.row === row);
  return row < ROWS_OPEN ? Math.max(1, ...here.map((u) => u.slot + 1)) : 1;
}
// A row's places as read, left to right across the branches
export const rowPlaces = (row) => BRANCHES.flatMap((_, col) => Array.from({ length: placesIn(col, row) }, (_, slot) => ({ col, row, slot })));
// Every place on the tree, row by row from the bottom
export const allPlaces = () => Array.from({ length: ROWS }, (_, row) => rowPlaces(row)).flat();

// § pick (D-811): an arrow moves the gold outline over the tree's places as a row is read: Left
// and Right walk the row's places one by one, across the branches; Up and Down go to the row
// above or below (row 0 at the bottom, so Up climbs, D-481), on the same branch, its place as
// far along or its last. Gives the new place, the same one at the tree's top or bottom or the
// row's right end (rowEnd, where the input turns to the Bestiary), or null past the row's first,
// for the Records tab.
const sameAs = (p) => (q) => q.col === p.col && q.slot === (p.slot ?? 0);
export const rowEnd = (pick) => sameAs(pick)(rowPlaces(pick.row).at(-1));
export function movePick(pick, dir) {
  const ps = rowPlaces(pick.row), i = Math.max(0, ps.findIndex(sameAs(pick)));
  if (dir === 'left') return i === 0 ? null : ps[i - 1];
  if (dir === 'right') return ps[Math.min(i + 1, ps.length - 1)];
  const row = Math.max(0, Math.min(ROWS - 1, pick.row + (dir === 'up' ? 1 : -1)));
  return { col: pick.col, row, slot: Math.min(pick.slot ?? 0, placesIn(pick.col, row) - 1) };
}

// § told: what the picked place says beside the tree: its name, a value line or null, its words,
// and its button { text, cost, can } or null. A place with no upgrade yet is to come; a row not
// open yet is locked.
export function told(state, pick) {
  const u = upgradeAt(pick);
  if (pick.row >= ROWS_OPEN) return { name: 'Locked', value: null, words: 'Opens deeper down.', button: null };
  if (!u) return { name: 'To come', value: null, words: 'More to grow here later.', button: null };
  const n = grown(state, u.id), done = u.most === 1 && n > 0, cost = `${u.cost} ember${u.cost === 1 ? '' : 's'}`;
  const value = u.id === 'heart' ? `Hearts ${maxHealth(state)} of ${HERO_HEALTH + u.most}` : done ? 'Bought' : null; // the hearts the hero has, boons' too
  return { name: u.name, value, words: u.words, button: done ? null : { text: u.get ?? `Get ${u.name}`, cost, can: canBuy(state, u.id) } };
}
