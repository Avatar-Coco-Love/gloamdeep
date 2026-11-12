import { turn, stairs, base, core } from './mk.mjs';
const fishing = await core('fishing'), lines = await core('lines'), sight = await core('sight').catch(() => null), boon = await core('boon');
const L = (s) => s.line ? `"${lines.shownLine ? JSON.stringify(s.line.id) + " " + (lines.LINES[s.line.id]?.text ?? (lines.LINES[s.line.id]?.texts || [])[s.line.n ?? 0] ?? "") : ""}" t${s.line.turn}` : "-";
console.log(Object.keys(lines).join(' '));
const st = base({ hero: { x: 10, y: 3 }, tool: 'rod', turn: 20 });
// 1 nibble rate
let s = turn.step(st, 'left'), nib = 0, waits = 0, bites = 0, away = 0;
for (let i = 0; i < 6000; i++) { const b = s; s = turn.wait(s); if (!s.float) { console.log("float gone at", i, L(s), JSON.stringify(s.hero), s.health, s.turn, s.tool, s.place); break; } if (s.float.nibble) nib++; else if (!b.float.nibble && !b.float.bite) waits++; if (s.float.bite) bites++; if (b.float.bite && !s.float.bite) away++; if (!s.float) { console.log('float gone at', i, L(s)); break; } }
console.log('nibbles', nib, 'plain waits', waits, 'rate', (nib / (nib + waits)).toFixed(3), 'bites', bites, 'got away', away, 'float still', !!s.float, 'hero hp', s.health);
// 2 pour / eat
for (const id of ['pondMinnow', 'blindCavefish']) {
  let a = base({ bag: [{ id, n: 2 }], oil: 0.5, health: 3, turn: 20 });
  const p = turn.pour(a, 0); console.log(id, 'pour oil', a.oil, '->', p.oil.toFixed(4), 'turn+', p.turn - a.turn, L(p), 'bag', JSON.stringify(p.bag));
  const e = turn.eat(a, 0); console.log(id, 'eat hp', a.health, '->', e.health, 'turn+', e.turn - a.turn, L(e));
  const f = turn.eat({ ...a, health: 5 }, 0); console.log(id, 'eat full', f.health, 'turn+', f.turn - a.turn, L(f));
  const q = turn.pour({ ...a, grown: { ...(a.grown || {}), quickPour: 1 } }, 0); console.log(id, 'quickPour turn+', q.turn - a.turn, 'grown', JSON.stringify(a.grown));
  const full = turn.pour({ ...a, oil: 0.95 }, 0); console.log(id, 'pour near full', full.oil.toFixed(3));
}
// 3 full bag catch
let b = { ...st, bag: Array.from({ length: 6 }, () => ({ id: 'stone', n: 20 })), float: { x: 9, y: 3, at: 20, bite: false, nibble: false, fish: 'pondMinnow', strike: 0.3 } };
let c = fishing.strikeFish(b, 0.35); console.log('full bag strike:', L(c), 'float', c.float, 'bagSize', (await core('bag')).bagSize(b));
c = fishing.strikeFish({ ...b, bag: [] }, 0.56); console.log('edge 0.56 (zone .3-.55):', L(c));
c = fishing.strikeFish({ ...b, bag: [] }, 0.55); console.log('edge 0.55:', L(c));
