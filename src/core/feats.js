// § feats: achievements built on Records (D-284, D-467, D-695). A Feat is one record's set of
// 3 tiers, each reached at a higher count and paying Glints, the look currency (D-516). Glints
// are worked out from the Records, so the counts made before Feats came pay too. Plain data.
import { spentOn } from './looks.js';

// Each Feat: its name, the record it reads, its 3 tiers and the Glints each pays (D-695, D-697, D-698, D-721, D-722, D-723)
export const FEATS = [
  { id: 'beaten', text: 'Beaten', record: 'beaten', tiers: [10, 50, 200], pays: [1, 2, 3] },
  { id: 'deepest', text: 'Deepest', record: 'deepest', tiers: [5, 10, 20], pays: [1, 2, 3] },
  // named Flasks, not its Records line's Flasks poured, so its row fits the upright card (D-698)
  { id: 'poured', text: 'Flasks', record: 'poured', tiers: [5, 25, 100], pays: [1, 2, 3] },
  // named Rooms, not its Records line's Rooms found, so its row fits the upright card (D-721)
  { id: 'found', text: 'Rooms', record: 'found', tiers: [10, 50, 200], pays: [1, 2, 3] },
  // named Steps, as its Records line (D-722)
  { id: 'steps', text: 'Steps', record: 'steps', tiers: [1000, 5000, 20000], pays: [1, 2, 3] },
  // named Torches, not its Records line's Torches lit, so its row fits the upright card (D-723)
  { id: 'torches', text: 'Torches', record: 'torches', tiers: [5, 25, 100], pays: [1, 2, 3] },
];

// How many of a Feat's tiers the records have reached
export const reached = (feat, records) => feat.tiers.filter((n) => (records[feat.record] ?? 0) >= n).length;
// The Glints all Feats have paid
export const glints = (records) => FEATS.reduce((g, f) => g + f.pays.slice(0, reached(f, records)).reduce((a, b) => a + b, 0), 0);
// The Glints a profile has left to spend: those Feats and goals paid (D-706) less the patterns it
// bought (D-696), its free pick costing none (D-714)
export const glintsLeft = (p) => Math.max(0, glints(p?.records ?? {}) + (p?.glints ?? 0) - spentOn((p?.bought ?? []).filter((id) => id !== p.gift)));
// What a profile can spend on the Look card: its patterns bought, Glints left, and whether its free
// pick waits (D-714); a hero not made yet has no Glints, its free pick the one taken on the card or
// waiting (D-696, D-714)
export const shopOf = (p) => ({ bought: p ? p.bought ?? [] : [], have: p ? glintsLeft(p) : 0, free: p ? p.gift === null : true });
export const newShop = (gift = null) => ({ bought: gift ? [gift] : [], have: 0, free: !gift });
export const plural = (n) => `${n} Glint${n === 1 ? '' : 's'}`;
export const glintsText = (p) => plural(glintsLeft(p));

// § rows: the Feats tab's rows: the name, the count toward the next tier ("12 of 50"), or the
// last tier once all are reached, and how many of its 3 marks are lit
// A goal of a thousand or more is written in k on the tab, "4321 of 5k", so Steps' row fits the
// upright card; the count stays whole, and the note and the screen reader say it whole (D-722)
const goalText = (n) => (n >= 1000 && n % 1000 === 0 ? `${n / 1000}k` : String(n));
const countText = (f, records, write) => {
  const n = reached(f, records), have = records[f.record] ?? 0;
  return n < f.tiers.length ? `${have} of ${write(f.tiers[n])}` : write(f.tiers.at(-1));
};
export function featRows(records) {
  return FEATS.map((f) => ({ id: f.id, text: f.text, value: countText(f, records, goalText), reached: reached(f, records), tiers: f.tiers.length }));
}
// § price (D-696): the note under a locked pattern tried on: its price and the Glints the profile
// has, and to earn more when they are too few
export const priceNote = (name, price, have) => `${name} costs ${plural(price)}. You have ${have}.${have < price ? ' Earn more from Feats.' : ''}`;
// The free pick's note, after a look's name (D-714): its price, or the one free pick (D-715)
export const freeNote = (price) => `${plural(price)}, or your one free pick.`;
// The Look card's gold line while the free pick waits (D-715)
export const FREE_PICK = '1 FREE PICK';
// The Look card's shorter one, in the big hero's name line (D-700)
export const stageNote = (name, price, have) => `${name}: ${plural(price)}. You have ${have}.${have < price ? ' Earn more from Feats.' : ''}`;
const TURN = 'Left for the Bestiary, Right for Quests. Esc or the close button goes back.';
export const featsWords = (p) => `Journal, Feats tab. ${glintsText(p)}. ${FEATS.map((f) => `${f.text}, ${countText(f, p.records, String)}, ${reached(f, p.records)} of ${f.tiers.length} reached`).join('. ')}. ${TURN}`;

// § note: the tiers reached between two Records, as "Beaten 10. +1 Glint"; two Feats in one note,
// "Beaten 10, Flasks 5. +2 Glints", their Glints added up (D-719)
export function featNote(was, now) {
  const names = [];
  let pays = 0;
  for (const f of FEATS) {
    const a = reached(f, was), b = reached(f, now);
    if (b > a) { names.push(`${f.text} ${f.tiers[b - 1]}`); pays += f.pays.slice(a, b).reduce((x, y) => x + y, 0); }
  }
  return names.length ? `${names.join(', ')}. +${plural(pays)}` : null;
}
// § note's turn (D-719): the Records the note counts from (those before a note still waiting, or
// before this action), those now, and whether this action said its own line. With its own line,
// that line shows and the note waits, counting from the same Records, for a move that says none
export function featTurn(from, now, ownLine) {
  const note = featNote(from, now);
  if (!note) return { note: null, from: null };
  return ownLine ? { note: null, from } : { note, from: null };
}
