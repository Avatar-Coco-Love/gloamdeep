import { readFileSync, readdirSync } from 'node:fs';
const SAVE = await import('/home/user/gloamdeep/src/core/save.js'), TR = await import('/home/user/gloamdeep/src/core/travel.js'), R = await import('/home/user/gloamdeep/src/core/room.js');
for (const n of [5, 10, 15, 16, 17, 18, 22, 28, 31, 32]) { const d = `out/${n}-s7/`; const f = readdirSync(d).find((x) => /home-end/.test(x)); const { text, snap } = JSON.parse(readFileSync(d + f, 'utf8')); const s = SAVE.readJourney(text).state;
  const deepBefore = Math.max(...Object.keys(snap.places).map((id) => R.depthOf(id)).filter(Number.isFinite));
  console.log(n, 'deepest room held before', deepBefore, 'found has depth9:', snap.found?.some((x) => /depth9/.test(x)), '| after: growthRows', s.growthRows, 'deepestOf', TR.deepestOf(s), 'found9', s.found.some((x) => /depth9/.test(x)), 'stones', JSON.stringify(TR.stonesOf(s).map((x) => x.depth + (x.woken ? 'W' : '')))); }
