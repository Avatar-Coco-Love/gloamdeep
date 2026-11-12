// node tour.mjs <kind> <seed> <fromDepth> <toDepth> [god]
import { Game, serve, core, room, region, reg, cells, line, keys } from './pl.mjs';
import { base } from './setups.mjs';
import { appendFileSync } from 'node:fs';
const [kind, seedS, fromS, toS, god] = process.argv.slice(2), seed = +seedS, to = +toS;
const T = `tour-${seed}`, LOG = `out/${T}-${kind}.log`;
const out = (...a) => { const t = a.join(' '); console.log(t); appendFileSync(LOG, t + '\n'); };
const s = await serve();
let depth = +fromS, g = null;
const hero = () => ({ grown: { heart: 5 }, health: 10, held: 'knife', bag: [{ id: 'flask', n: 5 }, { id: 'herb', n: 3 }], ...(god && { god: true, endless: true }) });
const tally = {}, seenKinds = {};
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const dirTo = (a, b) => (b.x > a.x ? 'right' : b.x < a.x ? 'left' : b.y > a.y ? 'down' : 'up');
async function upkeep() {
  const st = g.s;
  if (st.oil < 0.35 && st.bag.some((b) => b.id === 'flask')) { if (kind === 'pc') await g.page.locator('#quick-slot').click(); else await g.page.locator('#quick-slot').tap(); await g.page.waitForTimeout(200); await g.read(); out(`  poured, oil ${st.oil.toFixed(2)} -> ${g.s.oil.toFixed(2)} line: ${await line(g.page)}`); }
}
async function fps() { return g.page.evaluate(() => new Promise((ok) => { const ts = []; const f = (t) => { ts.push(t); if (ts.length < 40) requestAnimationFrame(f); else { const d = ts.slice(1).map((v, i) => v - ts[i]); ok([Math.round(d.reduce((a, b) => a + b) / d.length), Math.round(Math.max(...d))]); } }; requestAnimationFrame(f); })); }
const alive = () => room.depthOf(g.s.place) === depth && room.isGenerated(g.s.place);
async function inRoom(n) {
  const st = g.s, c = region.cellOf(seed, st.place, depth);
  for (const e of st.enemies) seenKinds[e.id] = (seenKinds[e.id] || 0) + 1;
  await g.page.waitForTimeout(350);
  const f = await fps();
  await g.shot(`${T}-d${depth}-${String(n).padStart(2, '0')}`);
  out(` room ${n} ${st.place} ${c.w}x${c.h}${c.end ? ' end' : ''}${c.down ? ' DOWN' : ''} ${st.room.cols}x${st.room.rows} foes[${st.enemies.map((e) => e.id).join(',')}] items[${st.items.map((i) => i.id).join(',')}] lights ${st.lights.length} frame ${f[0]}/${f[1]}ms hp ${st.health} oil ${st.oil.toFixed(2)}`);
  // the waystone
  const plate = g.find('waystonePlate')[0];
  if (plate) { out('  waystone plate at ' + JSON.stringify(plate)); const r = await g.walkTo({ x: plate.x, y: plate.y + 2 }, { max: 150 }); await g.page.waitForTimeout(400); await g.shot(`${T}-d${depth}-stone-asleep`); const r2 = await g.walkTo(plate, { max: 20 }); await g.page.waitForTimeout(900); await g.shot(`${T}-d${depth}-stone-woken`); out(`  stone: ${r} ${r2} line: ${await line(g.page)} tile now ${room.tileAt(g.s.room, plate.x, plate.y).id}`); }
  // hunt a few
  for (let k = 0; k < 6 && alive(); k++) {
    const foes = g.s.enemies.filter((e) => !e.pile && (tally[e.id] || 0) < 2 && !['warden'].includes(e.id)).sort((a, b) => dist(a, g.s.hero) - dist(b, g.s.hero));
    if (!foes.length) break;
    const f0 = foes[0], id = f0.id; let r = await g.walkTo(f0, { stopBeside: true, max: 60 });
    if (r !== 'beside') { tally[id] = (tally[id] || 0) + 0.5; continue; }
    let n0 = g.s.enemies.filter((e) => e.id === id && !e.pile).length;
    for (let b = 0; b < 14 && alive(); b++) {
      await upkeep();
      const near = g.s.enemies.filter((e) => !e.pile && !e.under && (!e.asleep || e.id === id) && dist(e, g.s.hero) === 1).sort((a, b) => (b.id === id) - (a.id === id))[0];
      if (!near) { if (g.s.enemies.filter((e) => e.id === id && !e.pile).length < n0) break; await g.step('wait'); continue; }
      await g.step(dirTo(g.s.hero, near));
    }
    const won = g.s.enemies.filter((e) => e.id === id && !e.pile).length < n0;
    tally[id] = (tally[id] || 0) + (won ? 1 : 0.5); out(`  fought ${id}: ${won ? 'beat' : 'no'} hp ${g.s.health} line: ${await line(g.page)}`);
    await upkeep();
  }
  // finds
  for (let k = 0; k < 12 && alive(); k++) {
    const its = g.s.items.filter((i) => !i.skip && g.path(i)).sort((a, b) => dist(a, g.s.hero) - dist(b, g.s.hero));
    if (!its.length) break;
    const it = its[0], n = g.s.items.length; const r = await g.walkTo(it, { max: 90 });
    if (g.s.items.some((i) => i.x === it.x && i.y === it.y && i.id === it.id)) { out(`  find ${it.id} not taken (${r}) line: ${await line(g.page)}`); g.s.items.find((i) => i.x === it.x && i.y === it.y).skip = true; skip.add(g.s.place + it.x + ',' + it.y); }
    await upkeep();
    for (const i of g.s.items) if (skip.has(g.s.place + i.x + ',' + i.y)) i.skip = true;
  }
}
const skip = new Set();
while (depth <= to) {
  if (!g) { g = await Game.boot(s.url, kind, base(seed, depth, hero())); g.upkeep = upkeep; out(`== ${kind} seed ${seed}: set down at depth ${depth}`); }
  const lay = region.layoutAt(seed, depth), down = lay.cells.find((c) => c.down).id, visited = new Set();
  out(`= depth ${depth}: ${lay.cells.length} rooms, area ${room.areaAt(depth).area}, stone ${room.stoneRoom(seed, depth) ?? '-'}${depth === 4 ? ' locket ' + room.locketRoom(seed) : ''}`);
  let n = 0, fell = false;
  while (alive()) {
    visited.add(g.s.place); await inRoom(++n); if (!alive()) break;
    const rest = lay.cells.map((c) => c.id).filter((id) => !visited.has(id));
    if (!rest.length) break;
    const pick = rest.filter((id) => id !== down || rest.length === 1).sort((a, b) => g.route(a).length - g.route(b).length)[0];
    for (const id of g.route(pick)) { const r = await g.through(id, { max: 200 }); await upkeep(); if (r !== 'through') { out(`  way to ${id}: ${r} at ${g.s.place} hero ${JSON.stringify(g.s.hero)}`); if (r !== 'left' && r !== 'fell') { await g.shot(`${T}-d${depth}-stuck${n}`); visited.add(pick); } break; } }
  }
  if (!alive()) { out(`  FELL or left at depth ${depth}: now ${g.s.place}, hp ${g.s.health}, line: ${await line(g.page)}`); await g.page.waitForTimeout(1500); await g.shot(`${T}-d${depth}-fell`); fell = true; }
  else {
    const r0 = await g.goRoom(down, { max: 200 });
    if (kind === 'pc') await keys(g.page, 'm', 600); else { await g.page.locator('#map-button').tap(); await g.page.waitForTimeout(600); }
    await g.shot(`${T}-d${depth}-map`);
    await keys(g.page, 'Escape', 400);
    const sd = g.find('stairsDown')[0]; const r = sd ? await g.walkTo(sd, { max: 200 }) : 'nostairs';
    await g.page.waitForTimeout(500);
    out(`  down: ${r0} ${r} -> ${g.s.place} hero ${JSON.stringify(g.s.hero)} on ${room.tileAt(g.s.room, g.s.hero.x, g.s.hero.y).id} line: ${await line(g.page)} growthRows ${g.s.growthRows}`);
    if (room.depthOf(g.s.place) !== depth + 1) { fell = true; await g.shot(`${T}-d${depth}-nodown`); }
  }
  out('  lines: ' + g.lines.splice(0).join(' | '));
  if (g.bad.length) out('  BAD: ' + g.bad.splice(0).join(' ; '));
  const er = g.errors.splice(0).filter((e) => !/willRead/.test(e)); if (er.length) out('  ERRORS: ' + er.join(' ; '));
  depth++;
  if (fell) { await g.close(); g = null; }
}
out('tally ' + JSON.stringify(tally) + ' kinds seen ' + JSON.stringify(seenKinds));
if (g) await g.close(); s.close();
