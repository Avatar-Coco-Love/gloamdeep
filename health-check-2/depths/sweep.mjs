import { core } from '../lib.mjs';
const room = await core('room'), region = await core('region'), op = await core('openings'), reg = await core('registry');
const N = +process.argv[2] || 150;
const issues = {}; const add = (k, v) => { (issues[k] ??= []).push(v); };
const stats = { rooms: 0, creatures: {}, perDepthKinds: {}, stoneNull: {}, locketMissing: 0, wardenNotBeside: 0, shapes: {} };
for (let seed = 1; seed <= N; seed++) for (let depth = 4; depth <= 12; depth++) {
  const lay = region.layoutAt(seed, depth);
  const made = {};
  for (const c of lay.cells) {
    const p = room.beginPlace(c.id, seed); made[c.id] = p; stats.rooms++;
    const r = p.room, tag = `s${seed} ${c.id}`;
    stats.shapes[`${depth >= 8 ? 'D' : depth >= 5 ? 'W' : 'C'} ${c.w}x${c.h}`] = (stats.shapes[`${depth >= 8 ? 'D' : depth >= 5 ? 'W' : 'C'} ${c.w}x${c.h}`] || 0) + 1;
    if (r.cols !== c.cols || r.rows !== c.rows) add('size', tag);
    const solid = (x, y) => room.tileAt(r, x, y).solid;
    const seen = new Set([p.start.x + ',' + p.start.y]), q = [p.start];
    while (q.length) { const t = q.shift(); for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) { const x = t.x + dx, y = t.y + dy; if (x < 0 || y < 0 || x >= r.cols || y >= r.rows || seen.has(x + ',' + y)) continue; const tl = room.tileAt(r, x, y); if (tl.solid && !tl.dig && tl.id !== 'water') continue; if (tl.solid) { continue; } seen.add(x + ',' + y); q.push({ x, y }); } }
    // strict reach (non-solid only)
    const ids = {};
    for (const e of p.enemies) {
      const t = room.tileAt(r, e.x, e.y); stats.creatures[depth + ' ' + e.id] = (stats.creatures[depth + ' ' + e.id] || 0) + 1;
      if (t.solid) add('enemy on solid ' + t.id + ' ' + e.id, tag + ` ${e.x},${e.y}`);
      else if (!seen.has(e.x + ',' + e.y)) add('enemy unreachable ' + e.id, tag);
      if (ids[e.x + ',' + e.y]) add('stacked enemies', tag + ` ${e.id}+${ids[e.x + ',' + e.y]} ${e.x},${e.y}`); ids[e.x + ',' + e.y] = e.id;
      if (e.x === p.start.x && e.y === p.start.y) add('enemy on start', tag);
      if (e.x === 0 || e.y === 0 || e.x === r.cols - 1 || e.y === r.rows - 1) add('enemy on edge(doorway)', tag + ' ' + e.id);
    }
    const its = {};
    for (const it of p.items) {
      const t = room.tileAt(r, it.x, it.y);
      if (t.solid) add('item on solid ' + t.id + ' ' + it.id, tag + ` ${it.x},${it.y}`);
      else if (!seen.has(it.x + ',' + it.y)) add('item unreachable ' + it.id, tag + ` ${it.x},${it.y}`);
      if (t.id !== 'floor') add('item on ' + t.id + ' ' + it.id, tag);
      if (its[it.x + ',' + it.y]) add('stacked items', tag + ` ${it.id}+${its[it.x + ',' + it.y]}`); its[it.x + ',' + it.y] = it.id;
      if (ids[it.x + ',' + it.y]) add('enemy on item at start ' + ids[it.x + ',' + it.y] + '/' + it.id, tag);
    }
    for (let y = 0; y < r.rows; y++) for (let x = 0; x < r.cols; x++) { const t = room.tileAt(r, x, y); if (!t.solid && !seen.has(x + ',' + y)) add('floor cut off (' + t.id + ')', tag + ` ${x},${y}`); if ((t.id === 'stairsDown' || t.id === 'stairsUp') && !seen.has(x + ',' + y)) add('stairs unreachable', tag); }
    for (const l of p.lights) { if (!room.tileAt(r, l.x, l.y).solid && l.id !== 'x') add('light on open tile ' + l.id + ' on ' + room.tileAt(r, l.x, l.y).id, tag); }
    const kinds = new Set(p.enemies.map((e) => e.id)); if (p.enemies.length > 1 && kinds.size < 2) add('one kind only', tag);
    const pool = room.poolAt(depth); for (const e of p.enemies) if (!pool.includes(e.id) && e.id !== 'flaskMimic' && e.id !== 'warden') add('out of pool ' + e.id, tag);
    if (p.enemies.some((e) => e.id === 'flaskMimic') && depth > 5) add('mimic deeper than 5', tag);
    const expect = room.creaturesAt(depth) * c.w * c.h; const n = p.enemies.filter((e) => !['flaskMimic', 'warden'].includes(e.id)).length;
    stats['count d' + depth + ' ' + c.w * c.h + ' n=' + n] = (stats['count d' + depth + ' ' + c.w * c.h + ' n=' + n] || 0) + 1;
  }
  // doors both ways
  for (const c of lay.cells) for (const d of c.doors) {
    const p = made[c.id], r = p.room; const [x, y] = d.dir === 'up' ? [d.at, 0] : d.dir === 'down' ? [d.at, r.rows - 1] : d.dir === 'left' ? [0, d.at] : [r.cols - 1, d.at];
    if (room.tileAt(r, x, y).solid) add('door tile solid', `s${seed} ${c.id} ${d.dir}@${d.at} ${room.tileAt(r, x, y).id}`);
    const o = made[d.to]; if (!o) { add('door to nowhere', `s${seed} ${c.id}`); continue; }
    const ro = o.room; const [ox, oy] = d.dir === 'up' ? [d.back, ro.rows - 1] : d.dir === 'down' ? [d.back, 0] : d.dir === 'left' ? [ro.cols - 1, d.back] : [0, d.back];
    if (room.tileAt(ro, ox, oy).solid) add('door far tile solid', `s${seed} ${c.id}->${d.to} ${d.dir}`);
    // reachable from that room's start?
  }
  // edge open tiles that lead nowhere
  for (const c of lay.cells) { const r = made[c.id].room; const dw = op.doorways(c.id, r, seed);
    for (let x = 0; x < r.cols; x++) for (const y of [0, r.rows - 1]) if (!room.tileAt(r, x, y).solid && !dw.some((d) => d.x === x && d.y === y)) add('open edge, no room', `s${seed} ${c.id} ${x},${y}`);
    for (let y = 0; y < r.rows; y++) for (const x of [0, r.cols - 1]) if (!room.tileAt(r, x, y).solid && !dw.some((d) => d.x === x && d.y === y)) add('open edge, no room', `s${seed} ${c.id} ${x},${y}`);
    if (dw.length !== c.doors.length) add('doorways count != doors', `s${seed} ${c.id} ${dw.length}/${c.doors.length}`);
  }
  // all rooms joined
  const seenR = new Set([room.placeAt(depth)]), qq = [room.placeAt(depth)]; while (qq.length) { const id = qq.shift(); for (const d of lay.cells.find((c) => c.id === id).doors) if (!seenR.has(d.to)) { seenR.add(d.to); qq.push(d.to); } }
  if (seenR.size !== lay.cells.length) add('room cut off from floor', `s${seed} d${depth}`);
  if (room.isStoneDepth(depth)) { const st = room.stoneAt(seed, depth); if (!st) stats.stoneNull[depth] = (stats.stoneNull[depth] || 0) + 1; else { const r = made[st.id].room; const has = r.map.some((l) => [...l].some((ch) => reg.byLetter(ch).id?.startsWith('waystone'))); if (!has) add('stone room without stone', `s${seed} d${depth} ` + st.id); } }
  if (depth === 4) { const id = room.locketRoom(seed), p = made[id]; const lk = p.items.find((i) => i.id === 'locket'), w = p.enemies.find((e) => e.id === 'warden');
    if (!lk || !w) stats.locketMissing++; else { if (Math.abs(lk.x - w.x) + Math.abs(lk.y - w.y) !== 1) stats.wardenNotBeside++; if (!w.asleep) add('warden awake', 's' + seed); if (id === room.placeAt(4)) add('locket in stairs room', 's' + seed); } }
}
for (const [k, v] of Object.entries(issues)) console.log(k, v.length, v.slice(0, 4).join(' | '));
console.log(JSON.stringify(stats, null, 0));
