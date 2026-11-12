// Loads old saves with today's code and checks them. node check.mjs <outdir...> [--quiet]
import { readFileSync, readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const core = (n) => import(pathToFileURL('/home/user/gloamdeep/src/core/' + n + '.js').href);
const SAVE = await core('save'), R = await core('room'), REG = await core('registry'), T = await core('turn'), ST = await core('stairs'), RGN = await core('region'), MO = await core('mouth'), HW = await core('homeward'), BT = await core('bagturn'), HE = await core('hearthwood');
const dirs = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const placesOf = (s) => ({ [s.place]: s, ...s.elsewhere });
const count = (m, re) => m.join('').split('').filter((c) => re.test(c)).length;
function expectSize(seed, id) {
  if (R.isGenerated(id)) { const c = RGN.cellOf(seed, id, R.depthOf(id)); return c ? { cols: c.cols, rows: c.rows } : null; }
  const b = R.beginPlace(id, seed).room; return { cols: b.cols, rows: b.rows };
}
function scanBad(v, path, out, depth = 0) {
  if (typeof v === 'number' && !Number.isFinite(v)) out.push(path + '=' + v);
  else if (v === undefined) out.push(path + '=undefined');
  else if (v && typeof v === 'object' && !ArrayBuffer.isView(v) && depth < 7) for (const [k, x] of Object.entries(v)) { if (k === 'home' && depth === 0) continue; scanBad(x, path + '.' + k, out, depth + 1); }
}
function sound(s, tag) {
  const bad = [];
  const here = R.tileAt(s.room, s.hero.x, s.hero.y);
  if (!(s.hero.x >= 0 && s.hero.y >= 0 && s.hero.x < s.room.cols && s.hero.y < s.room.rows)) bad.push('hero out of room');
  else if (here.solid) bad.push(`hero on solid ${here.id} at ${s.hero.x},${s.hero.y} in ${s.place}`);
  if ((s.people || []).some((p) => p.x === s.hero.x && p.y === s.hero.y)) bad.push('hero on a person');
  for (const [id, p] of Object.entries(placesOf(s))) {
    if (!p.room) { bad.push('no room ' + id); continue; }
    const { cols, rows, map } = p.room;
    if (map.length !== rows || map.some((l) => l.length !== cols)) bad.push(`map shape ${id}`);
    if (p.seen && p.seen.length !== cols * rows) bad.push(`seen size ${id}: ${p.seen.length} vs ${cols}x${rows}`);
    if (!(p.seen instanceof Uint8Array)) bad.push(`seen not u8 in ${id}`);
    let ex = null; try { ex = expectSize(s.seed, id); } catch (e) { bad.push('expectSize threw ' + id + ' ' + e.message); }
    if (!ex) bad.push('place not in today\'s layout: ' + id); else if (ex.cols !== cols || ex.rows !== rows) bad.push(`size ${id}: ${cols}x${rows}, today ${ex.cols}x${ex.rows}`);
    for (const l of map) for (const c of l) if (!REG.byLetter(c)) bad.push(`unknown letter ${c} in ${id}`);
    for (const kind of ['enemies', 'items', 'people', 'lights']) for (const t of p[kind] || []) {
      if (!(t.x >= 0 && t.y >= 0 && t.x < cols && t.y < rows)) { bad.push(`${kind} ${t.id} out of ${id}`); continue; }
      if (!REG.get(t.id)) bad.push(`${kind} unknown id ${t.id} in ${id}`);
      const tl = R.tileAt(p.room, t.x, t.y);
      if (kind === 'people' && tl.solid) bad.push(`person ${t.id} on solid ${tl.id} in ${id}`);
      if (kind === 'enemies' && tl.solid && !(tl.id === 'water' && REG.get(t.id)?.flies)) bad.push(`enemy ${t.id} on solid ${tl.id} in ${id}`);
      if (kind === 'items' && tl.solid && tl.id !== 'water') bad.push(`item ${t.id} on solid ${tl.id} in ${id} at ${t.x},${t.y}`);
    }
    if (!Array.isArray(p.taken)) bad.push('taken missing ' + id);
    if (!Array.isArray(p.people)) bad.push('people missing ' + id);
  }
  for (const k of Object.keys(s.stashes || {})) { const m = /^(.*):(\d+),(\d+)$/.exec(k); const p = m && placesOf(s)[m[1]]; if (!p || R.tileAt(p.room, +m[2], +m[3]).id !== 'stash') bad.push('stash with no chest ' + k); }
  const nb = []; scanBad(s, 's', nb); if (nb.length) bad.push('bad values: ' + nb.slice(0, 5).join(' '));
  for (const k of ['bag', 'events', 'found', 'known']) if (!Array.isArray(s[k])) bad.push('not a list: ' + k);
  for (const k of ['xp', 'oil', 'health', 'turn', 'seed', 'growthRows']) if (typeof s[k] !== 'number') bad.push('not a number: ' + k + '=' + s[k]);
  for (const k of ['grown', 'told', 'stashes', 'home']) if (!s[k] || typeof s[k] !== 'object') bad.push('not an object: ' + k);
  for (const st of s.bag) if (!REG.get(st.id) || !(st.n > 0)) bad.push('bag stack ' + JSON.stringify(st));
  if (s.held && !REG.get(s.held)) bad.push('held ' + s.held); if (s.tool && !REG.get(s.tool)) bad.push('tool ' + s.tool);
  for (const [slot, l] of Object.entries(s.worn || {})) if (!Array.isArray(l)) bad.push('worn slot not a list ' + slot);
  return bad.map((b) => tag + ': ' + b);
}
// what the hero owns, as a multiset of ids
function owned(x) {
  const m = {}; const add = (id, n = 1) => { if (id) m[id] = (m[id] || 0) + n; };
  for (const st of x.bag || []) add(st.id, st.n);
  add(x.held); add(x.tool);
  for (const v of Object.values(x.worn || {})) for (const id of [].concat(v || [])) add(id);
  for (const l of Object.values(x.stashes || {})) for (const st of l) add(st.id, st.n);
  return m;
}
const same = (a, b) => JSON.stringify(Object.entries(a).sort()) === JSON.stringify(Object.entries(b).sort());
function lockets(s) {
  let n = 0, wardens = 0, shelf = 0; const sh = REG.get('locketShelf')?.letter;
  const walk = (v) => { if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object' && !ArrayBuffer.isView(v)) { if (v.id === 'locket') n += 1; if (v.id === 'warden') wardens++; Object.values(v).forEach(walk); } };
  const { home, ...rest } = s; walk(rest);
  for (const p of Object.values(placesOf(s))) shelf += count(p.room.map, new RegExp(sh ? '[' + sh + ']' : '$^'));
  return { n, wardens, shelf };
}
function stairsPair(s) { // from the hero's floor: its stairs down, then back up
  const out = [];
  for (const [id] of Object.entries(placesOf(s)).slice(0, 40)) {
    let a; try { a = ST.goToPlace(s, id); } catch (e) { out.push('goToPlace threw ' + id + ': ' + e.message); continue; }
    for (let y = 0; y < a.room.rows; y++) for (let x = 0; x < a.room.cols; x++) {
      const t = R.tileAt(a.room, x, y); if (!t.leads) continue;
      let b; try { b = ST.takeStairs({ ...a, hero: { x, y } }); } catch (e) { out.push(`takeStairs threw ${id}: ${e.message}`); continue; }
      if (!b) { if (!(t.id === 'stairsUp' && R.depthOf(id) === 0)) out.push(`stairs ${t.id} in ${id} lead nowhere`); continue; }
      const back = ST.takeStairs(b);
      if (!back || back.place !== id || back.hero.x !== x || back.hero.y !== y) out.push(`stairs ${t.id} ${id}@${x},${y} -> ${b.place}@${b.hero.x},${b.hero.y} -> ${back ? back.place + '@' + back.hero.x + ',' + back.hero.y : 'nowhere'}`);
    }
  }
  return out;
}
let rs = 99; const rnd = (n) => { rs = (rs * 1103515245 + 12345) & 0x7fffffff; return rs % n; };
function playOn(s0, turns, alive) {
  let s = s0; const bad = [];
  const walkable = (x, y) => x >= 0 && y >= 0 && x < s.room.cols && y < s.room.rows && !R.tileAt(s.room, x, y).solid;
  const pathTo = (goal) => { const { cols } = s.room, prev = new Map([[s.hero.y * cols + s.hero.x, null]]), q = [s.hero]; for (let i = 0; i < q.length; i++) { const c = q[i]; if (i && goal(c.x, c.y)) { let k = c.y * cols + c.x, d = null; while (prev.get(k)) { d = prev.get(k)[1]; k = prev.get(k)[0]; } return d; } for (const [d, [dx, dy]] of Object.entries(DIRS)) { const x = c.x + dx, y = c.y + dy, k = y * cols + x; if (!walkable(x, y) || prev.has(k)) continue; prev.set(k, [c.y * cols + c.x, d]); q.push({ x, y }); } } return null; };
  let mode = 0, places = new Set([s.place]);
  for (let t = 0; t < turns; t++) {
    try {
      if (alive) s = { ...s, health: Math.max(s.health, T.maxHealth(s)), oil: Math.max(s.oil, 0.5) };
      const r = rnd(20);
      if (t % 50 === 0) mode = rnd(3);
      if (r === 0) s = T.wait(s);
      else if (r === 1 && s.bag.length) { const i = rnd(s.bag.length); s = [BT.look, BT.pour, BT.eat, BT.hold, T.drop, BT.craft][rnd(6)](s, i) || s; }
      else if (r === 2) s = BT.sortTheBag(s);
      else if (r < 12) { const want = mode === 0 ? 'stairsDown' : mode === 1 ? 'stairsUp' : null; const d = want && pathTo((x, y) => R.tileAt(s.room, x, y).id === want); s = T.step(s, d || Object.keys(DIRS)[rnd(4)]); }
      else s = T.step(s, Object.keys(DIRS)[rnd(4)]);
    } catch (e) { bad.push(`play turn ${t}: THROW ${e.message} @ ${(e.stack || '').split('\n')[1]?.trim()}`); break; }
    places.add(s.place);
    const h = R.tileAt(s.room, s.hero.x, s.hero.y);
    if (!h || h.solid) { bad.push(`play turn ${t}: hero on solid ${h?.id} in ${s.place}`); break; }
    for (const e of s.enemies) { const tl = e.x >= 0 && e.y >= 0 && e.x < s.room.cols && e.y < s.room.rows ? R.tileAt(s.room, e.x, e.y) : null; if (!tl || (tl.solid && !(tl.id === 'water' && REG.get(e.id)?.flies))) { bad.push(`play turn ${t}: creature ${e.id} on ${tl?.id} in ${s.place}`); t = turns; break; } }
    const nb0 = []; scanBad({ ...s, elsewhere: null, home: null }, 's', nb0); const nb = nb0.filter((x) => !/facing=undefined/.test(x)); if (nb.length) { bad.push(`play turn ${t}: ${nb.slice(0, 4).join(' ')}`); break; }
  }
  let rt = null; try { const text = SAVE.journeyText(s, false); rt = SAVE.readJourney(text); if (SAVE.journeyText(rt.state, false) !== text) bad.push('round trip after play differs'); } catch (e) { bad.push('save after play threw ' + e.message); }
  if (rt) bad.push(...sound(rt.state, 'after play').slice(0, 6));
  return { bad, places: places.size, s };
}
const quiet = process.argv.includes('--quiet');
let total = 0, failed = 0;
for (const d of dirs) {
  for (const f of readdirSync(d).filter((f) => f.endsWith('.json')).sort()) {
    const { label, text, snap, format } = JSON.parse(readFileSync(d + '/' + f, 'utf8'));
    const tag = `${d.split('/').filter(Boolean).pop()} ${f.replace('.json', '')}`; const bad = [], notes = [];
    total++;
    let kept; try { kept = SAVE.readJourney(text); } catch (e) { bad.push('readJourney THROW ' + e.message + ' @ ' + (e.stack || '').split('\n')[1]?.trim()); }
    if (!kept && !bad.length) bad.push('did not load (null)');
    if (kept) {
      const s = kept.state;
      if (JSON.parse(text).format !== format) bad.push('format tag');
      if (kept.jumped !== !!JSON.parse(text).jumped) bad.push('jumped changed');
      bad.push(...sound(s, 'loaded'));
      // owned
      const before = owned(snap), after = owned(s);
      if (!same(before, after)) bad.push('owned differs: before ' + JSON.stringify(before) + ' after ' + JSON.stringify(after));
      if ((snap.coins ?? 0) !== (s.coins ?? 0)) bad.push(`coins ${snap.coins} -> ${s.coins}`);
      if ((snap.xp ?? 0) !== (s.xp ?? 0)) bad.push(`xp ${snap.xp} -> ${s.xp}`);
      if (snap.bagSlots !== s.bagSlots) bad.push(`bagSlots ${snap.bagSlots} -> ${s.bagSlots}`);
      const g0 = snap.grown ?? { ...(snap.hearts ? { heart: snap.hearts } : {}), ...(snap.tough ? { tough: 1 } : {}), ...(snap.steady ? { steadyWick: 1 } : {}) };
      if (JSON.stringify(g0) !== JSON.stringify(s.grown)) bad.push('grown ' + JSON.stringify(g0) + ' -> ' + JSON.stringify(s.grown));
      if (s.health > T.maxHealth(s) + 1) bad.push('health above most ' + s.health);
      // where the hero is
      if (snap.place !== s.place) notes.push(`place ${snap.place} -> ${s.place}`);
      else if (snap.hero.x !== s.hero.x || snap.hero.y !== s.hero.y) notes.push(`hero moved in ${s.place} ${snap.hero.x},${snap.hero.y} -> ${s.hero.x},${s.hero.y}`);
      // places kept, map changes
      const now = placesOf(s);
      for (const [id, p] of Object.entries(snap.places)) {
        const q = now[id];
        if (!q) { notes.push('room dropped ' + id + (p.seenN ? ` (seen ${p.seenN})` : '')); continue; }
        if (q.room.cols !== p.cols || q.room.rows !== p.rows) { notes.push(`room remade ${id} ${p.cols}x${p.rows}->${q.room.cols}x${q.room.rows}` + (p.seenN ? ` (seen ${p.seenN})` : '')); continue; }
        const diff = {}; for (let y = 0; y < p.rows; y++) for (let x = 0; x < p.cols; x++) if (p.map[y][x] !== q.room.map[y][x]) { const k = p.map[y][x] + '>' + q.room.map[y][x]; diff[k] = (diff[k] || 0) + 1; }
        if (Object.keys(diff).length) notes.push(`map ${id}${p.seenN ? '(seen)' : ''} ` + JSON.stringify(diff));
        const seenNow = Array.from(q.seen).filter(Boolean).length; if (p.seenN && seenNow !== p.seenN) notes.push(`memory ${id} ${p.seenN}->${seenNow}`);
        
      }
      const lostOf = (ls) => JSON.stringify(ls.map((b) => JSON.stringify(b.holds)).sort());
      const lb = lostOf(Object.values(snap.places).flatMap((p) => p.lost)), la = lostOf(Object.values(now).flatMap((p) => (p.items || []).filter((i) => i.id === 'lostbag')));
      if (lb !== la) bad.push('lost bags differ: ' + lb + ' -> ' + la);
      for (const [id, p] of Object.entries(now)) for (const it of (p.items || []).filter((i) => i.id === 'lostbag')) notes.push('lost bag in ' + id + ' at ' + it.x + ',' + it.y + ' on ' + R.tileAt(p.room, it.x, it.y).id);
      if (s.fell) notes.push('fell kept: ' + s.fell.place + ' ' + s.fell.room?.cols + 'x' + s.fell.room?.rows);
      // waystones woken per depth (surface: any)
      const wokeBefore = new Set(Object.entries(snap.places).filter(([, p]) => p.map.some((l) => l.includes('A'))).map(([id]) => R.depthOf(id)));
      const wokeAfter = new Set(Object.entries(now).filter(([, p]) => p.room.map.some((l) => l.includes('A'))).map(([id]) => R.depthOf(id)));
      for (const dd of wokeBefore) if (!wokeAfter.has(dd)) bad.push('waystone woken at depth ' + dd + ' is asleep or gone');
      for (const dd of wokeAfter) if (!wokeBefore.has(dd)) bad.push('waystone woken by the upgrade at depth ' + dd);
      for (const [id, p] of Object.entries(now)) { const n = count(p.room.map, /[ZA]/); if (n > 1) bad.push(`${n} plates in ${id}`); if (n && R.isGenerated(id) && R.stoneRoom(s.seed, R.depthOf(id)) !== id) bad.push('plate in a room that is not the stone room ' + id); if (n && !R.isGenerated(id) && id !== MO.stoneHome(s.seed)) bad.push('surface plate outside the stone home ' + id); }
      const sh = MO.stoneHome(s.seed); if (now[sh] && count(now[sh].room.map, /[ZA]/) !== 1) bad.push('stone home ' + sh + ' has no plate');
      // people
      const pb = Object.entries(snap.places).flatMap(([id, p]) => p.people.map((q) => ({ ...q, at: id }))), pa = Object.entries(now).flatMap(([id, p]) => (p.people || []).map((q) => ({ ...q, at: id })));
      const ped0 = pb.filter((p) => p.id === 'peddler'), ped1 = pa.filter((p) => p.id === 'peddler');
      if (ped1.length > 1) bad.push('peddler ' + ped1.length + ' times: ' + JSON.stringify(ped1));
      if (ped0.length && !ped1.length) { const pr = R.peddlerRoom(s.seed); if (!(ped0[0].home === undefined && ped0[0].leaves === undefined && !now[pr])) bad.push('peddler lost: was ' + JSON.stringify(ped0[0])); else notes.push('trapped peddler\'s room remade, unseen'); }
      if (ped0[0]?.home && ped1[0] && !(ped1[0].home && ped1[0].at === sh)) bad.push('peddler at home not in the stone room: ' + JSON.stringify(ped1[0]));
      if (ped0[0] && !ped0[0].home && ped0[0].leaves === undefined && ped1[0] && (ped1[0].home || ped1[0].leaves !== undefined)) bad.push('trapped peddler now free ' + JSON.stringify(ped1[0]));
      if (ped0[0] && (ped0[0].home || ped0[0].leaves !== undefined) && ped1[0] && !(ped1[0].home || ped1[0].leaves !== undefined)) bad.push('freed peddler trapped again ' + JSON.stringify(ped1[0]));
      if (ped0[0] && ped1[0] && !!ped0[0].greeted !== !!ped1[0].greeted) bad.push('peddler greeted changed');
      if (ped1[0]) notes.push('peddler ' + JSON.stringify(ped0[0] || null) + ' -> ' + JSON.stringify(ped1[0]));
      // freed peddler: his old room must not trap again (no peddler in peddlerRoom when free elsewhere) - covered by count
      const lk = lockets(s); if (lk.n + lk.shelf > 1 || lk.wardens > 1) bad.push('lockets ' + JSON.stringify(lk));
      const lr = R.locketRoom(s.seed); if (now[lr] && lk.n + lk.shelf !== 1) bad.push('locket room kept but locket count ' + JSON.stringify(lk)); notes.push('locket ' + JSON.stringify(lk) + (now[lr] ? ' room kept' : ' room not made'));
      bad.push(...stairsPair(s).slice(0, 4));
      // home.places copies
      for (const [id, p] of Object.entries(s.home?.places || {})) { if (!p.room) continue; let ex; try { ex = expectSize(s.seed, id); } catch {} if (ex && (ex.cols !== p.room.cols || ex.rows !== p.room.rows)) bad.push(`home.places ${id} size ${p.room.cols}x${p.room.rows} today ${ex.cols}x${ex.rows}`); }
      // play on
      for (const alive of [true, false]) { rs = 99 + total; const r = playOn(s, 200, alive); bad.push(...r.bad.map((b) => (alive ? 'kept alive ' : 'natural ') + b)); }
    }
    if (bad.length) failed++;
    if (bad.length || !quiet) console.log((bad.length ? 'FAIL ' : 'ok   ') + tag + (bad.length ? '\n   ! ' + bad.join('\n   ! ') : '') + (quiet && !bad.length ? '' : '\n   . ' + notes.join('\n   . ')));
  }
}
console.log(`checked ${total}, with problems ${failed}`);
