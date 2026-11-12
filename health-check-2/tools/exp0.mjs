import { core } from './h.mjs';
const turn = await core('turn'), map = await core('map'), ex = await core('explorer'), stairs = await core('stairs'), room = await core('room');
const sig = (plan) => plan.rooms.map((r) => `${r.id}@${r.x},${r.y}:${r.room.map.join('/')}`).sort();
for (const seed of [1, 4127, 99999, 50000]) {
  for (const depth of [0, 1, 2, 3, 7, 12, 40, 99]) {
    let st = turn.newJourney(seed, 'gentle');
    const a = depth === 0 ? map.wholeSurface(ex.explorerWorld(seed)) : map.floorPlan(ex.explorerWorld(seed), true, depth);
    let b;
    try { if (depth > 0) st = stairs.goToDepth(st, depth); b = map.floorPlan(st, true, depth); } catch (e) { console.log(seed, depth, 'journey threw', e.message); continue; }
    const sa = sig(a), sb = sig(b);
    const same = sa.length === sb.length && sa.every((x, i) => x === sb[i]);
    let diff = '';
    if (!same) { const ida = a.rooms.map((r) => r.id).sort().join(' '), idb = b.rooms.map((r) => r.id).sort().join(' '); diff = ida === idb ? 'same rooms, tiles differ: ' + a.rooms.filter((r) => { const o = b.rooms.find((q) => q.id === r.id); return !o || o.room.map.join('/') !== r.room.map.join('/') || o.x !== r.x || o.y !== r.y; }).map((r) => r.id).join(' ') : `ids differ A[${ida}] B[${idb}]`; }
    console.log(seed, 'depth', depth, 'rooms', a.rooms.length, b.rooms.length, same ? 'SAME' : 'DIFF ' + diff.slice(0, 300), 'place', st.place);
  }
}
