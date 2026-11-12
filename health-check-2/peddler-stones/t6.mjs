import { core } from '../lib.mjs';
import { turn } from './prep.mjs';
let s = { ...turn.newJourney(1, 'gentle'), enemies: [], lit: false };
for (const b of [null, 'kindHerbs']) {
  let x = turn.eat({ ...s, boon: b, health: 1, bag: [{ id: 'mendingDraught', n: 1 }], growth: { heart: 5 } }, 0);
  const h0 = x.health; for (let i = 0; i < 46; i++) x = turn.wait(x);
  console.log(b, 'mending draught: 1 ->', h0, '->', x.health, 'mending left', x.mending);
}
