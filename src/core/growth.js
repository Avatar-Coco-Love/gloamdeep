// § growth: what levels give (D-293, answers Q-050). Each level past the first
// gives an ember, spent in the Journal's Growth tab. Plain data, no drawing.
// What was bought is one record, `state.grown` (D-811, upgrades.js): each upgrade's id and how
// many times; a journey without it has bought nothing.
import { levelOf } from './xp.js';
import { HERO_HEALTH } from './turn.js';
import { BRANCHES, UPGRADES, grown } from './upgrades.js';
import { deepestOf } from './travel.js';
import { say } from './lines.js';

export const HEARTS_MORE = UPGRADES.heart.most; // at most 5 more, 10 in all
export const heartsBought = (state) => grown(state, 'heart');

// The embers left: one for each level reached past the first, and each taken from a vault
// (`foundEmbers`, D-896), less those spent
const spent = (state) => Object.values(UPGRADES).reduce((n, u) => n + grown(state, u.id) * u.cost, 0);
export const embers = (state) => levelOf(state.xp) - 1 + (state.foundEmbers || 0) - spent(state);

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
// them a twig for each row open, row 0 the first at the bottom; embers buy any upgrade in an
// open row, in any order. On a row's twig each branch's upgrades sit side by side, by their slot
// (Tough beside the heart); the branches and upgrades are in upgrades.js. A place is
// { col, row, slot }: an open row has one place for each of a branch's upgrades in it, or one
// to come where it has none; the locked row one a branch. `open` is how many rows are open,
// rowsOpen(state), 1 where not given.
// § opening (D-814): each row opens the first time the hero is deeper than its depth, row 1
// past depth 8, biome 1's last floor, until biome 2 is built. The journey keeps a mark,
// `state.growthRows`, so a row once open stays open (markRows, kept at each save).
export const ROW_DEPTHS = [0, 9]; // the depth that opens each row; row 0 is open from the start
const deepest = (state) => (state?.place ? deepestOf(state) : 0); // a journey with no place yet has been nowhere
export const rowsOpen = (state) => Math.max(state?.growthRows ?? 1, ROW_DEPTHS.filter((d) => deepest(state) >= d).length);
export const markRows = (state) => (state.growthRows === rowsOpen(state) ? state : { ...state, growthRows: rowsOpen(state) });
// markRows, and the first time a row opens, walking or by a dev jump, "Growth has a new row." (D-816);
// an older save marked as it loads says nothing
export function openRows(state) {
  const next = markRows(state);
  return next.growthRows > (state.growthRows ?? 1) ? say(next, 'newRow') : next;
}
export const rowsOf = (open = 1) => Math.min(open + 1, ROW_DEPTHS.length + 1); // the open rows and one more shown, dim and locked (D-481)
export const START_PICK = { col: 1, row: 0, slot: 0 }; // Body's first, the heart
export const upgradeAt = ({ col, row, slot = 0 }) => Object.values(UPGRADES).find((u) => u.branch === BRANCHES[col]?.id && u.row === row && u.slot === slot) ?? null;
// How many places a branch has in a row
export function placesIn(col, row, open = 1) {
  const here = Object.values(UPGRADES).filter((u) => u.branch === BRANCHES[col]?.id && u.row === row);
  return row < open ? Math.max(1, ...here.map((u) => u.slot + 1)) : 1;
}
// A row's places as read, left to right across the branches
export const rowPlaces = (row, open = 1) => BRANCHES.flatMap((_, col) => Array.from({ length: placesIn(col, row, open) }, (_, slot) => ({ col, row, slot })));
// Every place on the tree, row by row from the bottom
export const allPlaces = (open = 1) => Array.from({ length: rowsOf(open) }, (_, row) => rowPlaces(row, open)).flat();

// § pick (D-811): an arrow moves the gold outline over the tree's places as a row is read: Left
// and Right walk the row's places one by one, across the branches; Up and Down go to the row
// above or below (row 0 at the bottom, so Up climbs, D-481), on the same branch, its place as
// far along or its last. Gives the new place, the same one at the tree's top or bottom or the
// row's right end (rowEnd, where the input turns to the Bestiary), or null past the row's first,
// for the Records tab.
const sameAs = (p) => (q) => q.col === p.col && q.slot === (p.slot ?? 0);
export const rowEnd = (pick, open = 1) => sameAs(pick)(rowPlaces(pick.row, open).at(-1));
export function movePick(pick, dir, open = 1) {
  const ps = rowPlaces(pick.row, open), i = Math.max(0, ps.findIndex(sameAs(pick)));
  if (dir === 'left') return i === 0 ? null : ps[i - 1];
  if (dir === 'right') return ps[Math.min(i + 1, ps.length - 1)];
  const row = Math.max(0, Math.min(rowsOf(open) - 1, pick.row + (dir === 'up' ? 1 : -1)));
  return { col: pick.col, row, slot: Math.min(pick.slot ?? 0, placesIn(pick.col, row, open) - 1) };
}

// § told: what the picked place says beside the tree: its name, a value line or null, its words,
// and its button { text, cost, can } or null. A place with no upgrade yet is to come; a row not
// open yet is locked, and says the depth that opens it (D-814), or only deeper down where
// that depth is not set yet.
export function told(state, pick) {
  const u = upgradeAt(pick);
  if (pick.row >= rowsOpen(state)) return { name: 'Locked', value: null, words: ROW_DEPTHS[pick.row] ? `Reach depth ${ROW_DEPTHS[pick.row]} to open.` : 'Opens deeper down.', button: null };
  if (!u) return { name: 'To come', value: null, words: 'More to grow here later.', button: null };
  const n = grown(state, u.id), done = u.most === 1 && n > 0, cost = `${u.cost} ember${u.cost === 1 ? '' : 's'}`;
  const value = u.id === 'heart' ? `Hearts ${HERO_HEALTH + n} of ${HERO_HEALTH + u.most}` : done ? 'Bought' : null; // the hearts grown, not a boon's (H-19, D-863)
  return { name: u.name, value, words: u.words, button: done ? null : { text: u.get ?? `Get ${u.name}`, cost, can: canBuy(state, u.id) } };
}
