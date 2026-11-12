import { turn, stairs, base } from './mk.mjs';
const st = base(); const s = stairs.goToPlace(st, 'woods:0,0');
console.log(s.place, JSON.stringify(s.hero)); console.log(s.room.map.map((l, i) => String(i).padStart(2) + ' ' + l).join('\n'));
console.log(s.enemies.map((e) => `${e.id}@${e.x},${e.y}`).join(' '));
