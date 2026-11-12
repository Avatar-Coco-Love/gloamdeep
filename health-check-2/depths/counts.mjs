import { core } from '../lib.mjs';
const room = await core('room'), region = await core('region');
const tab = {}, rooms = {}, halls = {}, finds = {}, cacheN = {}, way = {};
for (let seed = 1; seed <= 200; seed++) for (let depth = 4; depth <= 12; depth++) {
  const lay = region.layoutAt(seed, depth); const band = depth >= 8 ? '8+' : depth >= 5 ? '5-7' : '4';
  (rooms[band] ??= {})[lay.cells.length] = (rooms[band][lay.cells.length] || 0) + 1;
  const h = lay.cells.filter((c) => c.w * c.h === 2).length, L = lay.cells.filter((c) => c.w * c.h === 4).length;
  (halls[band] ??= {})[`h${h} L${L}`] = (halls[band][`h${h} L${L}`] || 0) + 1;
  // way length: rooms from up to down
  const prev = new Map([[room.placeAt(depth), 0]]), q = [room.placeAt(depth)]; while (q.length) { const id = q.shift(); for (const d of lay.cells.find((c) => c.id === id).doors) if (!prev.has(d.to)) { prev.set(d.to, prev.get(id) + 1); q.push(d.to); } }
  const wl = prev.get(lay.cells.find((c) => c.down).id) + 1; (way[band] ??= {})[wl] = (way[band][wl] || 0) + 1;
  const doorsN = lay.cells.reduce((a, c) => a + c.doors.length, 0) / 2 - (lay.cells.length - 1); (way[band + ' loops'] ??= {})[doorsN] = (way[band + ' loops'][doorsN] || 0) + 1;
  for (const c of lay.cells) {
    const p = room.beginPlace(c.id, seed), n = p.enemies.filter((e) => !['flaskMimic', 'warden'].includes(e.id)).length, k = `d${depth} cells${c.w * c.h}`;
    (tab[k] ??= {})[n] = (tab[k][n] || 0) + 1;
    const f = p.items.filter((i) => ['flask', 'herb', 'oilcap'].includes(i.id)).length; (finds[`${band} cells${c.w * c.h}${c.end ? ' end' : ''}`] ??= {})[f] = (finds[`${band} cells${c.w * c.h}${c.end ? ' end' : ''}`][f] || 0) + 1;
  }
}
console.log('rooms', JSON.stringify(rooms)); console.log('halls/large', JSON.stringify(halls)); console.log('way', JSON.stringify(way));
for (const k of Object.keys(tab).sort()) console.log(k, JSON.stringify(tab[k]));
for (const k of Object.keys(finds).sort()) console.log('finds(flask+herb+oilcap)', k, JSON.stringify(finds[k]));
