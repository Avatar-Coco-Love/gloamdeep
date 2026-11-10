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
  const n = grown(state, u.id), done = u.most === 1 && n > 0, cost = `${u.cost} ember${u.cost === 1 ? '' : 's'}`;
  const value = u.id === 'heart' ? `Hearts ${maxHealth(state)} of ${HERO_HEALTH + u.most}` : done ? 'Bought' : null; // the hearts the hero has, boons' too
  return { name: u.name, value, words: u.words, button: done ? null : { text: u.get ?? `Get ${u.name}`, cost, can: canBuy(state, u.id) } };
}
