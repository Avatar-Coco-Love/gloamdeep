import { turn, stairs } from './mk.mjs';
for (let seed = 4127; seed < 4160; seed++) for (const d of [2,3,4]) {
  const s = stairs.goToDepth(turn.newJourney(seed, 'gentle'), d);
  const m = s.room.map; let w = [];
  m.forEach((l, y) => [...l].forEach((ch, x) => { if (ch === '~') w.push([x, y]); }));
  if (w.length) { console.log(seed, d, s.place, JSON.stringify(s.hero), w.length, 'enemies', s.enemies.length); console.log(m.join('\n')); process.exit(); }
}
