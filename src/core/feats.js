// § feats: achievements built on Records (D-284, D-467, D-695). A Feat is one record's set of
// 3 tiers, each reached at a higher count and paying Glints, the look currency (D-516). Glints
// are worked out from the Records, so the counts made before Feats came pay too. Plain data.

// Each Feat: its name, the record it reads, its 3 tiers and the Glints each pays (D-695)
export const FEATS = [
  { id: 'beaten', text: 'Beaten', record: 'beaten', tiers: [10, 50, 200], pays: [1, 2, 3] },
];

// How many of a Feat's tiers the records have reached
export const reached = (feat, records) => feat.tiers.filter((n) => (records[feat.record] ?? 0) >= n).length;
// The Glints all Feats have paid (spending them comes with the Look card's buying, D-695)
export const glints = (records) => FEATS.reduce((g, f) => g + f.pays.slice(0, reached(f, records)).reduce((a, b) => a + b, 0), 0);
const plural = (n) => `${n} Glint${n === 1 ? '' : 's'}`;
export const glintsText = (records) => plural(glints(records));

// § rows: the Feats tab's rows: the name, the count toward the next tier ("12 of 50"), or the
// last tier once all are reached, and how many of its 3 marks are lit
export function featRows(records) {
  return FEATS.map((f) => {
    const n = reached(f, records), have = records[f.record] ?? 0;
    return { id: f.id, text: f.text, value: n < f.tiers.length ? `${have} of ${f.tiers[n]}` : String(f.tiers.at(-1)), reached: n, tiers: f.tiers.length };
  });
}
const TURN = 'Left for the Bestiary. Esc or the close button goes back.';
export const featsWords = (records) => `Journal, Feats tab. ${glintsText(records)}. ${featRows(records).map((r) => `${r.text}, ${r.value}, ${r.reached} of ${r.tiers} reached`).join('. ')}. ${TURN}`;

// § note: the tiers reached between two Records, as "Beaten 10. +1 Glint", the newest only
export function featNote(was, now) {
  for (const f of FEATS) {
    const a = reached(f, was), b = reached(f, now);
    if (b > a) return `${f.text} ${f.tiers[b - 1]}. +${plural(f.pays[b - 1])}`;
  }
  return null;
}
