import { turn, stairs, base, core } from './mk.mjs';
const so = await core('sleepout');
let h = stairs.goToPlace(base(), 'woods'); console.log(JSON.stringify(h.hero)); console.log(h.room.map.map((l, i) => String(i).padStart(2) + ' ' + l).join('\n'));
let s = { ...h, turn: 200, health: 2, lit: true, oil: 0.5 };
for (let i = 0; i < 5; i++) { s = turn.wait(s); console.log(s.turn, 'can', so.canSleepOut(s), s.enemies.map((e) => `${e.id}@${e.x},${e.y}${e.chasing ? ' CHASING' : ''}`).join(' | ')); }
