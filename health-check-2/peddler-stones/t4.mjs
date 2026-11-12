import { core } from '../lib.mjs';
import { nearHomeStone, wakeAt, mouth, turn } from './prep.mjs';
const boon = await core('boon');
let s = wakeAt(turn.newJourney(1, 'gentle'), mouth.stoneHome(1));
s = turn.step(s, 'down');
const need = new Set(Object.keys((await core('boons')).BOONS)), picks = [];
for (let T = s.turn + 1; need.size && T < 400; T++) { const o = boon.offer({ ...s, turn: T }); if (o.some((id) => need.has(id)) && o.filter((id) => need.has(id)).length >= (need.size > 4 ? 2 : 1)) { picks.push([T, o]); o.forEach((id) => need.delete(id)); } }
console.log(JSON.stringify(picks), s.turn, s.hero, s.health);
