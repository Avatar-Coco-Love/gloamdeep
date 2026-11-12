import { core } from '../lib.mjs';
import { turn, stairs } from './prep.mjs';
const boon = await core('boon'), st = await core('state');
let s = { ...turn.newJourney(1, 'gentle'), enemies: [] };
const run = (label, s0, f, n = 0) => { let s = f(s0); for (let i = 0; i < n; i++) s = turn.wait(s); console.log(label, 'hp', s0.health, '->', s.health, 'oil', s0.oil.toFixed(3), '->', s.oil.toFixed(3)); return s; };
for (const b of [null, 'kindHerbs']) {
  const base = { ...s, boon: b, health: 1, lit: false };
  run(`${b} herb`, { ...base, bag: [{ id: 'herb', n: 1 }] }, (x) => turn.eat(x, 0));
  run(`${b} potion`, { ...base, bag: [{ id: 'potion', n: 1 }] }, (x) => turn.eat(x, 0));
  run(`${b} minnow`, { ...base, bag: [{ id: 'pondMinnow', n: 1 }] }, (x) => turn.eat(x, 0));
  const ks = Object.keys(turn).filter((k) => /drink|quaff|use/i.test(k)); 
  if (!b) console.log('exports', ks.join(','));
}
for (const b of [null, 'deepPour', 'slowWick', 'hungryFlame', 'greedyHands']) {
  const base = { ...s, boon: b, oil: 0.3, lit: true, bag: [{ id: 'flask', n: 1 }] };
  run(`${b} pour`, base, (x) => turn.pour(x, 0));
  run(`${b} 10 waits`, { ...base, oil: 1 }, (x) => x, 10);
  console.log(b, 'reach', boon.lanternReach({ ...base, oil: 1 }), 'empty', boon.lanternReach({ ...base, oil: 0 }), 'hit', turn.heroHit(base), 'max', st.maxHealth(base));
}
