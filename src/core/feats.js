// § feats: achievements built on Records (D-284, D-467, D-695). A Feat is one record's set of
// 3 tiers, each reached at a higher count and paying Glints, the look currency (D-516). Glints
// are worked out from the Records, so the counts made before Feats came pay too. Plain data.
import { spentOn } from './looks.js';

// Each Feat: its name, the record it reads, its 3 tiers and the Glints each pays (D-695, D-697, D-698)
export const FEATS = [
  { id: 'beaten', text: 'Beaten', record: 'beaten', tiers: [10, 50, 200], pays: [1, 2, 3] },
  { id: 'deepest', text: 'Deepest', record: 'deepest', tiers: [5, 10, 20], pays: [1, 2, 3] },
  // named Flasks, not its Records line's Flasks poured, so its row fits the upright card (D-698)
  { id: 'poured', text: 'Flasks', record: 'poured', tiers: [5, 25, 100], pays: [1, 2, 3] },
];

// How many of a Feat's tiers the records have reached
export const reached = (feat, records) => feat.tiers.filter((n) => (records[feat.record] ?? 0) >= n).length;
// The Glints all Feats have paid
export const glints = (records) => FEATS.reduce((g, f) => g + f.pays.slice(0, reached(f, records)).reduce((a, b) => a + b, 0), 0);
// The Glints a profile has left to spend: those Feats and goals paid (D-706) less the patterns it bought (D-696)
export const glintsLeft = (p) => Math.max(0, glints(p?.records ?? {}) + (p?.glints ?? 0) - spentOn(p?.bought));
// What a profile can spend on the Look card: its patterns bought and Glints left; none for a
// hero not made yet (D-696)
export const shopOf = (p) => ({ bought: p ? p.bought ?? [] : [], have: p ? glintsLeft(p) : 0 });
export const plural = (n) => `${n} Glint${n === 1 ? '' : 's'}`;
export const glintsText = (p) => plural(glintsLeft(p));

// § rows: the Feats tab's rows: the name, the count toward the next tier ("12 of 50"), or the
// last tier once all are reached, and how many of its 3 marks are lit
export function featRows(records) {
  return FEATS.map((f) => {
    const n = reached(f, records), have = records[f.record] ?? 0;
    return { id: f.id, text: f.text, value: n < f.tiers.length ? `${have} of ${f.tiers[n]}` : String(f.tiers.at(-1)), reached: n, tiers: f.tiers.length };
  });
}
// § price (D-696): the note under a locked pattern tried on: its price and the Glints the profile
// has, and to earn more when they are too few
export const priceNote = (name, price, have) => `${name} costs ${plural(price)}. You have ${have}.${have < price ? ' Earn more from Feats.' : ''}`;
// The Look card's shorter one, in the big hero's name line (D-700)
export const stageNote = (name, price, have) => `${name}: ${plural(price)}. You have ${have}.${have < price ? ' Earn more from Feats.' : ''}`;
const TURN = 'Left for the Bestiary, Right for Quests. Esc or the close button goes back.';
export const featsWords = (p) => `Journal, Feats tab. ${glintsText(p)}. ${featRows(p.records).map((r) => `${r.text}, ${r.value}, ${r.reached} of ${r.tiers} reached`).join('. ')}. ${TURN}`;

// § note: the tiers reached between two Records, as "Beaten 10. +1 Glint", the newest only
export function featNote(was, now) {
  for (const f of FEATS) {
    const a = reached(f, was), b = reached(f, now);
    if (b > a) return `${f.text} ${f.tiers[b - 1]}. +${plural(f.pays[b - 1])}`;
  }
  return null;
}
