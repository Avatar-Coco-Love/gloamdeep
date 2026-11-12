import { serve, open, shot, keys, said, OUT, slotTap, tap, core, inject, readSave } from './h.mjs';
export * from './h.mjs';
const room = await core('room');
export const DEVON = { grid: false, coords: true, noLight: false, reveal: false, revealMap: false, stats: true, open: ['view'] };
export async function start(kind, state, { dev = DEVON, profile = {}, jumped = false } = {}) {
  const s = await serve();
  const storage = await inject(state, { profile, jumped });
  if (dev) storage['gloamdeep-dev'] = JSON.stringify(dev);
  const { browser, page, errors } = await open(s.url, kind, storage);
  await slotTap(page, 0); await keys(page, 'Enter', 600);
  return { s, browser, page, errors, done: async () => { await browser.close(); s.close(); } };
}
export const rectOf = (page, sel) => page.evaluate((sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, cx: r.x + r.width / 2, cy: r.y + r.height / 2 }; }, sel);
export async function wrench(page) { const w = await rectOf(page, '#dev-button'); await tap(page, w.cx, w.cy, 400); }
export const panelOpen = (page) => page.evaluate(() => document.getElementById('dev-button').getAttribute('aria-expanded') === 'true');
export async function tab(page, title) {
  const t = await page.evaluate((title) => { const e = [...document.querySelectorAll('.dev-tab')].find((t) => t.title === title); const r = e.getBoundingClientRect(); return { cx: r.x + r.width / 2, cy: r.y + r.height / 2, open: e.getAttribute('aria-expanded') === 'true' }; }, title);
  if (!t.open) await tap(page, t.cx, t.cy, 300);
}
// tap a control of the open section by its words (button text, aria-label or title); scrolls it into view as a finger would
export async function btn(page, text, pause = 300) {
  const r = await page.evaluate((text) => {
    const body = [...document.querySelectorAll('.dev-body')].find((b) => !b.hidden);
    const e = [...body.querySelectorAll('button')].find((b) => !b.hidden && b.offsetParent && [(b.querySelector('.px-said')?.textContent ?? '').trim(), b.getAttribute('aria-label'), b.title, b.textContent.trim()].includes(text));
    if (!e) return null;
    e.scrollIntoView({ block: 'nearest' });
    const r = e.getBoundingClientRect(); return { cx: r.x + r.width / 2, cy: r.y + r.height / 2, disabled: e.disabled, pressed: e.getAttribute('aria-pressed') };
  }, text);
  if (!r) throw new Error('no button ' + text);
  await tap(page, r.cx, r.cy, pause);
  return r;
}
export const head = (page) => page.evaluate(() => document.querySelector('.dev-head').textContent);
export const readout = (page) => page.evaluate(() => document.getElementById('dev-readout').textContent);
// where room tile tx,ty is on the page now: probes with the Coords readout (Coords and Stats must be on)
export async function tileAt(page, tx, ty) {
  await page.waitForTimeout(450);
  const probe = (x, y) => page.evaluate(async ({ x, y }) => {
    document.getElementById('stage').dispatchEvent(new PointerEvent('pointermove', { clientX: x, clientY: y, pointerType: 'touch', bubbles: true }));
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const m = document.getElementById('dev-readout').textContent.match(/tile (\d+),(\d+)/); return m ? [Number(m[1]), Number(m[2])] : null;
  }, { x, y });
  const r = await rectOf(page, '#room'), cw = await page.evaluate(() => document.getElementById('room').width), s = r.w / cw * 16;
  // find a point on the room, then the tile boundary right of and below it
  let px = r.x + r.w / 2, py = r.y + r.h * 0.3, t0 = await probe(px, py);
  if (!t0) throw new Error('probe off room');
  // binary search for the boundary to the next tile, right and down
  const edge = async (horiz) => { let lo = 0, hi = Math.ceil(s) + 1; while (hi - lo > 1) { const mid = (lo + hi) >> 1; const t = horiz ? await probe(px + mid, py) : await probe(px, py + mid); if (t && t[horiz ? 0 : 1] === t0[horiz ? 0 : 1]) lo = mid; else hi = mid; } return hi; };
  const bx = px + await edge(true), by = py + await edge(false);
  return { x: bx + (tx - t0[0] - 1 + 0.5) * s, y: by + (ty - t0[1] - 1 + 0.5) * s, s };
}
export async function tapTile(page, tx, ty, pause = 350) { const p = await tileAt(page, tx, ty); const v = page.viewportSize(); if (p.x < 0 || p.y < 0 || p.x > v.width || p.y > v.height) throw new Error(`tile ${tx},${ty} off screen ${p.x},${p.y}`); await tap(page, p.x, p.y, pause); return p; }
export async function sv(page) { await page.waitForTimeout(120); const k = await readSave(page); return k; }
export const brief = (k) => { const s = k.state; return `place ${s.place} turn ${s.turn} hero ${s.hero.x},${s.hero.y} oil ${Math.round(s.oil * 100)} hp ${s.health} lit ${s.lit} jumped ${k.jumped} en ${s.enemies.length} it ${s.items.length} li ${s.lights.length} seen ${s.seen.reduce((a, b) => a + b, 0)}`; };
// floor tiles near the hero with nothing on them, nearest first
export function freeTiles(state, pred = (t) => t.id === 'floor') {
  const out = [], { room: r, hero } = state;
  for (let y = 0; y < r.rows; y++) for (let x = 0; x < r.cols; x++) {
    if (x === hero.x && y === hero.y) continue;
    if (!pred(room.tileAt(r, x, y), x, y)) continue;
    if (state.items.some((i) => i.x === x && i.y === y) || state.enemies.some((i) => i.x === x && i.y === y) || (state.people || []).some((i) => i.x === x && i.y === y)) continue;
    out.push({ x, y, d: Math.max(Math.abs(x - hero.x), Math.abs(y - hero.y)) });
  }
  return out.sort((a, b) => a.d - b.d);
}
export const tileId = (state, x, y) => room.tileAt(state.room, x, y).id;
// pick a Spawn cell by registry id (a real tap on its picture); again drops it
export async function pickId(page, id) {
  await tab(page, 'Spawn');
  const r = await page.evaluate(async (id) => {
    const { ALL } = await import('/src/core/registry.js');
    const order = [...new Set(ALL.map((e) => e.kind))].flatMap((k) => ALL.filter((e) => e.kind === k));
    const i = order.findIndex((e) => e.id === id); if (i < 0) return null;
    const e = document.querySelectorAll('.dev-cell')[i]; e.scrollIntoView({ block: 'nearest' });
    const r = e.getBoundingClientRect(); return { cx: r.x + r.width / 2, cy: r.y + r.height / 2, hidden: e.hidden };
  }, id);
  if (!r) throw new Error('no cell ' + id);
  await tap(page, r.cx, r.cy, 250);
  return head(page);
}
export const heroWait = async (page, x, y, ms = 4000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { const k = await readSave(page); if (k.state.hero.x === x && k.state.hero.y === y) return true; await page.waitForTimeout(150); } return false; };
