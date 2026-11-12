import { turn, base, core } from './mk.mjs';
const so = await core('sleepout'), reg = await core('registry');
let s = base({ hero: { x: 10, y: 8 }, turn: 180, enemies: [], health: 2, lit: true, oil: 0.5, bag: [] });
for (let i = 0; i < 6; i++) { s = turn.wait(s); console.log(s.turn, 'can', so.canSleepOut(s), s.enemies.map((e) => `${e.id}@${e.x},${e.y}${e.chasing ? ' CHASING' : ''}${e.asleep ? ' asleep' : ''}${e.under ? ' under' : ''} d${Math.abs(e.x - 10) + Math.abs(e.y - 8)}`).join(' | '), 'list', turn.creatureList(s).map((a) => a.e.id).join(',')); }
console.log(JSON.stringify(reg.get('mole')).slice(0, 400));
