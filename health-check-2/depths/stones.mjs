import { core } from '../lib.mjs';
const room = await core('room'), region = await core('region');
const bad = {}; const add = (k, v) => (bad[k] ??= []).push(v); let n = 0, none = 0; const sizes = {};
for (let seed = 1; seed <= 400; seed++) for (const depth of [5, 8, 12, 16]) {
  const st = room.stoneAt(seed, depth); if (!st) { none++; add('no stone on floor', `s${seed} d${depth}`); continue; } n++;
  const p = room.beginPlace(st.id, seed), r = p.room, c = region.cellOf(seed, st.id, depth), tag = `s${seed} ${st.id}`;
  sizes[`${c.w}x${c.h}`] = (sizes[`${c.w}x${c.h}`] || 0) + 1;
  if (st.id === room.placeAt(depth)) add('in stairs-up room', tag);
  const plates = []; for (let y = 0; y < r.rows; y++) for (let x = 0; x < r.cols; x++) if (room.tileAt(r, x, y).id === 'waystonePlate') plates.push({ x, y });
  if (plates.length !== 1) { add('plates ' + plates.length, tag); continue; }
  const P = plates[0];
  for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
    const t = room.tileAt(r, P.x + dx, P.y + dy), ring = Math.max(Math.abs(dx), Math.abs(dy)) === 2;
    const want = ring ? 'floor' : (dx && dy) ? 'standingStone' : (dx || dy) ? 'waystonePath' : 'waystonePlate';
    if (t.id !== want) add(`tile ${ring ? 'ring' : 'plan'} is ${t.id}`, tag + ` ${dx},${dy}`);
    if (p.enemies.some((e) => e.x === P.x + dx && e.y === P.y + dy)) add('creature starts on ' + (ring ? 'ring' : 'stone tiles'), tag);
    if (p.items.some((e) => e.x === P.x + dx && e.y === P.y + dy)) add('find starts on ' + (ring ? 'ring' : 'stone tiles') + ' ' + p.items.find((e) => e.x === P.x + dx && e.y === P.y + dy).id, tag);
    if (t.id === 'stairsDown') add('stairs in ring', tag);
  }
  // middle?
  const mid = { x: (r.cols - 1) / 2, y: (r.rows - 1) / 2 }; const off = Math.abs(P.x - mid.x) + Math.abs(P.y - mid.y); sizes['off' + Math.round(off)] = (sizes['off' + Math.round(off)] || 0) + 1;
}
console.log('stones', n, 'none', none, JSON.stringify(sizes));
for (const [k, v] of Object.entries(bad)) console.log(k, v.length, v.slice(0, 5).join(' | '));
