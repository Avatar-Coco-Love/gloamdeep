import { core } from '../lib.mjs';
const room = await core('room'), region = await core('region'), cache = await core('cache');
let blockN = 0, n = 0; const calm = [];
for (let seed = 1; seed <= 400; seed++) {
  const id = room.locketRoom(seed), p = room.beginPlace(id, seed), w = p.enemies.find((e) => e.id === 'warden'), L = p.items.find((i) => i.id === 'locket');
  if (!w) continue; n++;
  // can the locket be reached without stepping on the warden's tile?
  const map = p.room.map.map((l, y) => [...l].map((ch, x) => (x === w.x && y === w.y ? '#' : ch)).join(''));
  const st = cache.steps(map, p.start); const free = st.has(L.x + ',' + L.y); if (!free) blockN++;
  const near = p.enemies.filter((e) => e !== w && Math.abs(e.x - w.x) + Math.abs(e.y - w.y) < 7).length;
  if (!near) calm.push(seed + (free ? '' : 'B') + ':' + p.enemies.length);
}
console.log('rooms', n, 'warden blocks the only way', blockN); console.log(calm.join(' '));
