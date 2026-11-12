// Plays an old version's own rules through a scripted stretch and writes its saves at checkpoints.
// node oldplay.mjs <vdir> <seed>
import { pathToFileURL } from 'node:url';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
const [vdir, seedArg] = process.argv.slice(2), seed = +seedArg || 7;
const base = process.cwd() + '/v/' + vdir + '/src/core/';
const imp = async (m) => { try { return existsSync(base + m + '.js') ? await import(pathToFileURL(base + m + '.js').href) : {}; } catch (e) { return {}; } };
const T = await imp('turn'), R = await imp('room'), ST = await imp('stairs'), REG = await imp('registry'), BAG = await imp('bag'), SAVE = await imp('save');
const BT = await imp('bagturn'), CH = await imp('chest'), WORN = await imp('worn'), TR = await imp('travel'), HW = await imp('homeward'), MO = await imp('mouth'), HE = await imp('hearthwood'), GR = await imp('growth');
const log = [], say = (...a) => log.push(a.join(' '));
const out = process.cwd() + '/out/' + vdir + '-s' + seed + '/'; mkdirSync(out, { recursive: true });
let rs = seed * 7919 + 13; const rnd = (n) => { rs = (rs * 1103515245 + 12345) & 0x7fffffff; return rs % n; };
const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const tile = (s, x, y) => (x < 0 || y < 0 || x >= s.room.cols || y >= s.room.rows ? null : R.tileAt(s.room, x, y));
const maxH = (s) => (T.maxHealth ? T.maxHealth(s) : T.HERO_HEALTH);
const FOG = await imp('fog'), DAY = await imp('daytime');
// as the old main.js did after every turn: daylight remembers the whole room, else the lantern's reach
const mem = (s) => { try { const day = DAY.inDaylight ? DAY.inDaylight(s) : !!s.room.dark?.sky; return day ? FOG.rememberAll(s) : FOG.remember(s, { x: s.hero.x * 16 + 8, y: s.hero.y * 16 + 8, r: 72 }); } catch (e) { return s; } };
const keep = (s) => mem({ ...s, health: Math.max(s.health, maxH(s)), oil: 1 });
let s; let turns = 0;
function go(dir) { const b = s; try { s = keep(T.step(keep(s), dir)); } catch (e) { say('THROW step', e.message); throw e; } turns++; return s !== b; }
// BFS path of dirs to the nearest tile passing goal(x,y); people and solid tiles block; avoid stairs/edges unless goal
function path(goal, avoidStairs = true) {
  const { cols, rows } = s.room, start = s.hero.y * cols + s.hero.x, prev = new Map([[start, null]]), q = [s.hero];
  const blocked = (x, y) => { const t = tile(s, x, y); return !t || t.solid || (s.people || []).some((p) => p.x === x && p.y === y); };
  for (let i = 0; i < q.length; i++) {
    const c = q[i];
    if (i && goal(c.x, c.y)) { const ds = []; let k = c.y * cols + c.x; while (prev.get(k)) { ds.unshift(prev.get(k)[1]); k = prev.get(k)[0]; } return ds; }
    for (const [d, [dx, dy]] of Object.entries(DIRS)) {
      const x = c.x + dx, y = c.y + dy, k = y * cols + x;
      if (blocked(x, y) || prev.has(k)) continue;
      const t = tile(s, x, y);
      if (avoidStairs && t.leads && !goal(x, y)) continue;
      prev.set(k, [c.y * cols + c.x, d]); q.push({ x, y });
    }
  }
  return null;
}
function walk(goal, max = 80, avoidStairs = true) {
  const place = s.place;
  for (let n = 0; n < max; n++) {
    if (s.place !== place) return true;
    const p = path(goal, avoidStairs); if (!p) return false; if (!p.length) return true;
    go(p[0]);
    if (s.place === place && goal(s.hero.x, s.hero.y)) return true;
  }
  return false;
}
const wander = (n) => { for (let i = 0; i < n; i++) { const its = s.items.filter((it) => !it.dropped); if (its.length && rnd(3)) { const it = its[rnd(its.length)]; walk((x, y) => x === it.x && y === it.y, 30); } else { const tx = rnd(s.room.cols), ty = rnd(s.room.rows); if (tile(s, tx, ty) && !tile(s, tx, ty).solid && !tile(s, tx, ty).leads) walk((x, y) => x === tx && y === ty, 25); } } };
// walk off an edge of the room through an opening; true when the place changed
function offEdge(want) {
  const { cols, rows } = s.room, place = s.place;
  for (const d of want ? [want] : ['up', 'left', 'right', 'down'].sort(() => rnd(3) - 1)) {
    const onEdge = (x, y) => (d === 'up' ? y === 0 : d === 'down' ? y === rows - 1 : d === 'left' ? x === 0 : x === cols - 1);
    if (walk(onEdge, 120) && s.place === place && onEdge(s.hero.x, s.hero.y)) { go(d); if (s.place !== place) return true; }
    if (s.place !== place) return true;
  }
  return false;
}
function stairs(id) { // walk onto the stairs of tile id ('stairsDown' / 'stairsUp')
  const place = s.place; walk((x, y) => tile(s, x, y).id === id, 200, true); return s.place !== place;
}
function jump(to) { try { const b = s.place; s = keep(ST.goToPlace(s, to)); return s.place !== b || to === b; } catch (e) { say('jump failed', to, e.message); return false; } }
function give(id, n = 1) { if (!REG.get(id)) return false; for (let i = 0; i < n; i++) { let b; try { b = BAG.bagAdd.length >= 4 || BAG.bagSize ? BAG.bagAdd(s.bag, id, undefined, BAG.bagSize ? BAG.bagSize(s) : undefined) : BAG.bagAdd(s.bag, id); } catch { b = null; } if (!b) return false; s = { ...s, bag: b }; } return true; }
const slot = (id) => s.bag.findIndex((x) => x.id === id);
const snap = () => {
  const places = { [s.place]: s, ...s.elsewhere }, info = {};
  for (const [id, p] of Object.entries(places)) if (p.room) info[id] = { cols: p.room.cols, rows: p.room.rows, map: p.room.map, people: (p.people || []).map((q) => ({ ...q })), items: (p.items || []).length, lost: (p.items || []).filter((i) => i.id === 'lostbag'), seenN: p.seen ? Array.from(p.seen).filter(Boolean).length : null, lights: p.lights };
  return { v: vdir, seed, turns, place: s.place, hero: s.hero, bag: s.bag, held: s.held, tool: s.tool, worn: s.worn, stashes: s.stashes, coins: s.coins, xp: s.xp, embers: s.embers, hearts: s.hearts, tough: s.tough, steady: s.steady, grown: s.grown, growthRows: s.growthRows, known: s.known, bagSlots: s.bagSlots, health: s.health, mode: s.mode, found: s.found, deepest: s.deepest, keys: Object.keys(s), places: info };
};
let nsave = 0;
function save(label, jumped = false) {
  const text = SAVE.journeyText(s, jumped);
  writeFileSync(out + String(nsave++).padStart(2, '0') + '-' + label + '.json', JSON.stringify({ label, text, snap: snap(), format: SAVE.FORMAT }));
}
const tryDo = (name, f) => { try { const r = f(); say(name + ':', r === undefined ? 'ok' : r); return r; } catch (e) { say(name + ': THROW ' + e.message.slice(0, 120)); return null; } };

// ---- the stretch
s = keep(T.newJourney ? T.newJourney(seed) : T.makeWorld('first', seed));
say('start', s.place, 'fmt', SAVE.FORMAT);
save('fresh');
wander(6);
const surface = () => Object.keys({ [s.place]: 1, ...s.elsewhere }).filter((id) => /woods/.test(id));
const homeId = HW.HOME || (surface().includes('woods') ? 'woods' : s.place);
// § home: build
tryDo('to home', () => jump(homeId));
function setDownAll() {
  const sets = (REG.ALL || []).filter((e) => e.kind === 'item' && e.sets).map((e) => e.id);
  const done = [];
  for (const id of sets) {
    if (!BT.setDown && !T.setDown) break;
    const fn = BT.setDown || T.setDown;
    // a free tile with open neighbours near the room's middle
    wander(1);
    if (!give(id)) { s = { ...s, bag: s.bag.slice(0, 3) }; if (!give(id)) continue; }
    let ok = false;
    for (const d of ['right', 'left', 'up', 'down']) { const b = s; try { s = keep(fn(s, slot(id), d)); } catch (e) { say('setDown THROW', id, e.message); } if (s.room !== b.room || s.lights !== b.lights) { ok = true; const [dx, dy] = DIRS[d]; done.push({ id, x: b.hero.x + dx, y: b.hero.y + dy, tile: REG.get(id).sets.tile }); break; } }
    if (!ok) { say('  not set', id, 'slot', slot(id), 'line', JSON.stringify(s.line), 'sides', (BT.setSides||T.setSides)?.(s, slot(id))); for (let k = 0; k < 6 && !ok; k++) { wander(1); for (const d of ['right', 'left', 'up', 'down']) { const b = s; try { s = keep(fn(s, slot(id), d)); } catch (e) {} if (s.room !== b.room) { ok = true; const [dx, dy] = DIRS[d]; done.push({ id, x: b.hero.x + dx, y: b.hero.y + dy, tile: REG.get(id).sets.tile }); break; } } } }
    if (!ok && slot(id) >= 0) s = { ...s, bag: s.bag.filter((x) => x.id !== id) };
  }
  return done;
}
const built = tryDo('built', () => { const d = setDownAll(); return JSON.stringify(d); });
// chest: put things in
tryDo('stash', () => {
  const b = JSON.parse(built || '[]').find((x) => x.tile === 'stash'); if (!b || !CH.moveStack) return 'no chest';
  for (const id of ['wood', 'stone', 'flask', 'ratTail', 'oilcap', 'herb']) give(id, 2);
  walk((x, y) => Math.abs(x - b.x) + Math.abs(y - b.y) === 1, 60);
  const n = s.bag.length; let moved = 0;
  for (let i = 0; i < 3 && s.bag.length; i++) { const bef = s; s = keep(CH.moveStack(s, b.x, b.y, CH.CHEST_BAG !== undefined ? CH.CHEST_BAG : 0)); if (s !== bef) moved++; }
  return 'moved ' + moved + ' stash=' + JSON.stringify(s.stashes);
});
tryDo('plant', () => { const b = JSON.parse(built || '[]').find((x) => x.tile === 'plot'); if (!b || !BT.plant) return 'none'; const seedId = REG.get('plot')?.plants?.seed; give(seedId); walk((x, y) => Math.abs(x - b.x) + Math.abs(y - b.y) === 1, 60); const bef = s; s = keep(BT.plant(s, b.x, b.y)); return s !== bef; });
// hold, wear, tool
tryDo('gear', () => {
  const res = [];
  s = { ...s, bag: [] };
  const holdFn = BT.hold || T.hold;
  for (const e of (REG.ALL || []).filter((e) => e.kind === 'item')) {
    if (e.hold && holdFn && !s.held && give(e.id)) { s = keep(holdFn(s, slot(e.id))); res.push('held=' + s.held); }
    else if (e.tool && holdFn && s.tool == null && give(e.id)) { const b = s; s = keep(holdFn(s, slot(e.id))); res.push('tool=' + s.tool); }
    else if ((e.wear || e.worn || e.slot) && WORN.wear && give(e.id)) { const b = s; s = keep(WORN.wear(s, slot(e.id))); if (s !== b) res.push('worn ' + e.id); }
  }
  if (!s.held && REG.get('knife')) { s = { ...s, held: 'knife' }; res.push('held knife (edit)'); }
  s = { ...s, bag: s.bag.filter((x) => !REG.get(x.id)?.sets) };
  for (const id of ['flask', 'wood', 'stone', 'herb', 'oilcap', 'ratTail', 'pick', 'stonePick', 'spear']) give(id, 2);
  return res.join(',') + ' worn=' + JSON.stringify(s.worn) + ' bag=' + JSON.stringify(s.bag);
});
// money and growth by the old dev way: plain edits of fields that exist
if ('coins' in s) s = { ...s, coins: 37 };
if ('xp' in s) s = { ...s, xp: 55 };
tryDo('growth', () => {
  if ('xp' in s) s = { ...s, xp: 100000 };
  const b = JSON.stringify([s.hearts, s.tough, s.steady, s.grown]);
  for (const f of ['addHeart', 'addHeart', 'addTough', 'addSteady']) if (GR[f]) s = GR[f](s);
  if (GR.buy && REG.UPGRADES) for (const id of Object.keys(REG.UPGRADES)) { try { s = GR.buy(s, id); } catch {} }
  return b + ' -> ' + JSON.stringify([s.hearts, s.tough, s.steady, s.grown]) + ' rows ' + s.growthRows;
});
save('home-built');
// § the surface rooms
const visited = {};
tryDo('surface walk', () => { const seenP = []; for (let i = 0; i < 6; i++) { if (offEdge()) { seenP.push(s.place); wander(3); } } return seenP.join('>'); });
save('surface-walked');
for (const id of surface()) { if (/woods:\d,0/.test(id)) { jump(id); wander(4); save('mountain'); break; } }
for (const id of surface()) { if (/woods:\d,[12]/.test(id) && id !== s.place) { jump(id); wander(4); save('woods-room'); break; } }
const stoneHomeId = MO.stoneHome ? MO.stoneHome(seed) : null;
// wake the home waystone wherever the old version has it
tryDo('home stone', () => { for (const id of [...surface(), s.place]) { const rm = id === s.place ? s.room : s.elsewhere[id]?.room; if (!rm || !rm.map.some((l) => /[ZA]/.test(l))) continue; jump(id); if (s.room.map.some((l) => /[ZA]/.test(l))) { const r = walk((x, y) => tile(s, x, y).id === 'waystonePlate', 200); return id + ' woke=' + s.room.map.some((l) => l.includes('A')) + ' ' + r; } } return 'no stone on the surface'; });
if (s.room.map.some((l) => l.includes('A'))) save('home-stone-woken');
// § the crypt
tryDo('crypt', () => { jump('first'); wander(5); return s.place; });
save('crypt');
// § down
const deep = +process.argv[4] || 9;
for (let d = 1; d <= deep; d++) {
  const ok = tryDo('down to ' + d, () => { const viaStairs = d > 1 && rnd(2) && stairs('stairsDown'); if (!viaStairs) jump(R.placeAt(d)); if (R.depthOf(s.place) !== d) jump(R.placeAt(d)); return (viaStairs ? 'stairs ' : 'jump ') + s.place; });
  wander(4);
  tryDo(' rooms at ' + d, () => { const ps = []; for (let i = 0; i < 3; i++) if (offEdge()) { ps.push(s.place); wander(3); } return ps.join('>'); });
  if (d === 2 && R.stoneRoom) tryDo(' stone 2', () => { const id = R.stoneRoom(seed); jump(id); const r = walk((x, y) => tile(s, x, y).id === 'waystonePlate', 300); save('stone-room-d2'); return id + ' woke=' + s.room.map.some((l) => l.includes('A')); });
  if (d > 2 && R.stoneRoom && R.isStoneDepth?.(d)) tryDo(' stone ' + d, () => { const id = R.stoneRoom(seed, d); if (!id) return 'none'; jump(id); walk((x, y) => tile(s, x, y).id === 'waystonePlate', 300); save('stone-room-d' + d); return id + ' woke=' + s.room.map.some((l) => l.includes('A')); });
  if (d === 3 && R.peddlerRoom) tryDo(' peddler', () => {
    const id = R.peddlerRoom(seed); jump(id); const p = (s.people || [])[0]; if (!p) return 'no person in ' + id;
    save('peddler-room-trapped');
    for (let n = 0; n < 60; n++) {
      const q = (s.people || []).find((x) => x.id === 'peddler'); if (!q || q.leaves !== undefined) break;
      const rub = []; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (tile(s, q.x + dx, q.y + dy)?.dig) rub.push([q.x + dx, q.y + dy]);
      if (!rub.length) break;
      let hit = false;
      for (const [rx, ry] of rub) { if (walk((x, y) => Math.abs(x - rx) + Math.abs(y - ry) === 1 && !tile(s, x, y).leads, 80) && s.place === id && Math.abs(s.hero.x - rx) + Math.abs(s.hero.y - ry) === 1) { const d2 = Object.entries(DIRS).find(([, [dx, dy]]) => s.hero.x + dx === rx && s.hero.y + dy === ry)[0]; for (let k = 0; k < 8 && tile(s, rx, ry).dig; k++) go(d2); hit = true; break; } }
      if (!hit) return 'could not reach rubble';
    }
    if (s.place !== id) return 'left the room by mistake, now ' + s.place;
    const q = (s.people || []).find((x) => x.id === 'peddler');
    if (!q || q.leaves === undefined) { save('peddler-room-not-freed'); return 'not freed ' + JSON.stringify(q); }
    save('peddler-room-freed-waiting');
    const left = offEdge(); if (!left) jump(R.placeAt(3));
    const wh = Object.entries({ [s.place]: s, ...s.elsewhere }).flatMap(([pid, p]) => (p.people || []).map((x) => pid + ':' + JSON.stringify(x)));
    save('peddler-freed-left-floor-room');
    return id + ' person=' + JSON.stringify(q) + ' leftByEdge=' + left + ' now ' + wh.join('|');
  });
  if (d === 4 && R.locketRoom) tryDo(' locket', () => { const id = R.locketRoom(seed); jump(id); save('locket-room'); return id + ' items=' + s.items.map((i) => i.id).join(',') + ' foes=' + s.enemies.map((e) => e.id).join(','); });
  if (d === 3 || d === 5 || d === 8) save('depth' + d);
  if (d === 6) tryDo(' fall', () => {
    const f0 = s.fell, p0 = s.place, n0 = s.bag.length; let i = 0;
    for (; i < 500 && s.fell === f0 && s.place === p0; i++) {
      s = { ...s, health: 1, oil: 1 };
      const near = s.enemies.some((e) => Math.abs(e.x - s.hero.x) + Math.abs(e.y - s.hero.y) === 1);
      s = mem(s); if (near) s = T.wait(s); else { const pth = path((x, y) => s.enemies.some((e) => Math.abs(e.x - x) + Math.abs(e.y - y) === 1) && !tile(s, x, y).leads); s = pth && pth.length ? T.step(s, pth[0]) : T.wait(s); }
      turns++;
    }
    const fellNow = s.fell !== f0; if (fellNow) save('just-fell');
    const bags = Object.entries({ [s.place]: s, ...s.elsewhere }).flatMap(([id, p]) => (p.items || []).filter((x) => x.id === 'lostbag').map((x) => id + ':' + JSON.stringify(x.holds)));
    const r = 'fell=' + fellNow + ' after ' + i + ' now ' + s.place + ' bag ' + n0 + '->' + s.bag.length + ' lost bags ' + bags.join(' ');
    s = keep(s); wander(2); if (fellNow) save('woke-after-fall');
    for (const id of ['flask', 'wood', 'stone']) give(id, 2);
    return r;
  });
  if (d === 4) tryDo(' up and down', () => { jump(R.placeAt(4)); const a = stairs('stairsDown'); const b = a && stairs('stairsUp'); return a + ' ' + b + ' ' + s.place; });
}
save('deepest');
// § home again: the Peddler should have gone home once the hero leaves his floor
tryDo('travel home', () => { if (TR.travel && TR.onWokenPlate?.(s)) { const b = s; const home = TR.stonesOf(s).find((x) => x.depth === 0 && x.woken); if (home) { s = keep(TR.travel(s, home.place)); return 'travelled to ' + s.place; } } jump(homeId); return 'jumped ' + s.place; });
wander(3);
const where = Object.entries({ [s.place]: s, ...s.elsewhere }).flatMap(([id, p]) => (p.people || []).map((q) => id + ':' + JSON.stringify(q)));
say('people at end', where.join(' | '));
save('back-on-surface');
jump(homeId); wander(2); save('home-end');
if (stoneHomeId) { jump(stoneHomeId); save('stonehome-room-end'); }
tryDo('peddler room end', () => { if (!R.peddlerRoom) return 'none'; jump(R.peddlerRoom(seed)); save('peddler-room-end'); return s.place; });
tryDo('dungeon end', () => { jump(R.placeAt(8)); save('dungeon-end', true); return s.place; });
writeFileSync(out + 'log.txt', log.join('\n'));
console.log(vdir, 'seed', seed, 'saves', nsave, 'turns', turns, log.filter((l) => /THROW|failed/.test(l)).length, 'throws');
