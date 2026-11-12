import { readFileSync } from 'node:fs';
const SAVE = await import('/home/user/gloamdeep/src/core/save.js'), MO = await import('/home/user/gloamdeep/src/core/mouth.js');
const f = process.argv[2], { text } = JSON.parse(readFileSync(f, 'utf8'));
const fromText = (k, v) => (Array.isArray(v?.u8) && Object.keys(v).length === 1 ? Uint8Array.from(v.u8) : v);
const kept = JSON.parse(text, fromText); let s = kept.state;
const where = (s) => Object.entries({ [s.place]: s, ...s.elsewhere }).flatMap(([id, p]) => (p.people || []).map((q) => id + JSON.stringify(q))).join(' ') || '-';
console.log('stoneHome', MO.stoneHome(s.seed), 'fmt', kept.format, 'place', s.place, where(s));
for (let n = kept.format; n < SAVE.FORMAT; n++) { const b = where(s), bp = s.place + JSON.stringify(s.hero); s = SAVE.UPGRADES[n](s); const a = where(s), ap = s.place + JSON.stringify(s.hero); if (a !== b || ap !== bp || process.argv[3]) console.log(`step ${n}->${n + 1}: ${ap} people ${a} rooms ${Object.keys(s.elsewhere).length}`); }
