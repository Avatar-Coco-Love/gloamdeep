import { turn, stairs, base, core } from './mk.mjs';
const lines = await core('lines'), light = await core('light').catch(() => ({})), boon = await core('boon'), lasting = await core('lasting');
const L = (s) => s.line ? `"${lines.LINES[s.line.id]?.text ?? (lines.LINES[s.line.id]?.texts || [])[s.line.n ?? 0] ?? s.line.id}" t${s.line.turn}` : '-';
console.log('LONGEST', JSON.stringify(lasting.LONGEST));
const KEYS = { glowDraught: 'glow', slowburn: 'slowburn', mendingDraught: 'mending', wardDraught: 'ward', spitproofDraught: 'spitproof', shadeDraught: 'shade' };
// cave state so the lantern burns; no enemies
let cave = stairs.goToDepth(turn.newJourney(4128, 'gentle'), 2); cave = { ...cave, hero: { x: 4, y: 5 }, lit: true, enemies: [], mode: 'normal' };
for (const [id, key] of Object.entries(KEYS)) {
  let s = { ...cave, bag: [{ id, n: 2 }], health: 1, poisoned: id === 'wardDraught' ? 4 : 0 };
  let d = turn.eat(s, 0); const out = [`${id}: drunk turn+${d.turn - s.turn} ${key}=${d[key]} ${L(d)} hp ${d.health} poisoned ${d.poisoned}`];
  let n = 0, hearts = [];
  while (d[key] > 0 && n < 100) { const b = d; d = turn.wait(d); n++; if (d.health > b.health) hearts.push(n); if (n === 10) { const r = turn.eat(d, 0); out.push(`redrunk at 10 left: ${d[key]} -> ${r[key]}`); } }
  out.push(`ended after ${n} waits ${L(d)} hearts at ${hearts} hp ${d.health}`);
  console.log(out.join(' | '));
}
// slowburn: how long a full tank lasts
for (const over of [{}, { slowburn: 1e6 }, { warmed: 1e6 }, { slowburn: 1e6, warmed: 1e6 }]) { let s = { ...cave, oil: 1, ...over }, n = 0; while (s.oil > 1e-9 && n < 500) { s = turn.wait(s); n++; } console.log('tank lasts', JSON.stringify(over), n, 'mode', s.mode); }
// two ending at once
let s = { ...cave, glow: 1, slowburn: 1, mending: 1, health: 2 }; let d = turn.wait(s); console.log('three end at once:', L(d), 'hp', d.health);
s = { ...cave, glow: 1, poisoned: 0 }; d = turn.step(s, 'left'); console.log('glow ends on a bump turn:', L(d));
// fall ends
const fall = await core('fall'); if (fall.fall) { d = fall.fall({ ...cave, glow: 30, slowburn: 3, warmed: 3, mending: 3, ward: 3, spitproof: 3, shade: 3, stiff: 3 }); console.log('fall:', ['glow', 'slowburn', 'warmed', 'mending', 'ward', 'spitproof', 'shade', 'stiff'].map((k) => k + '=' + d[k]).join(' ')); }
// glow reach
console.log('glowReach', (await core('glow')).glowReach({ ...cave, glow: 5 }));
