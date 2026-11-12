import { atPeddler, show, roomM, turn, stairs, mouth } from './prep.mjs';
import { core } from '../lib.mjs';
const hw = await core('homeward');
const KEY = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
let none = 0, n = 0; const dist = {};
for (let seed = 1; seed <= 300; seed++) {
  const a = atPeddler(seed); if (!a) { console.log('no heap spot', seed); continue; }
  let s = a.state;
  for (let i = 0; i < 3; i++) s = turn.step(s, KEY[a.dir]);
  for (let i = 0; i < 6; i++) s = turn.wait(s);
  const at = mouth.stoneHome(seed), there = s.elsewhere[at], p = there?.people?.find((q) => q.id === 'peddler');
  n++;
  if (!p) { none++; console.log('NO PEDDLER HOME', seed, JSON.stringify(s.people)); continue; }
  const room = there.room, mx = room.cols >> 1, my = room.rows >> 1;
  const d = Math.abs(p.x - mx) + Math.abs(p.y - my); dist[d] = (dist[d] || 0) + 1;
  if (seed <= 3 || d > 3) { const st = stairs.goToPlace(s, at); console.log(seed, at, p, 'mid', mx, my, 'd', d, mouth.mouthOf(seed).tile); console.log(show(st)); }
}
console.log(n, none, dist);
