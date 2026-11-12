// helpers for the tools worker
import { tap } from '../lib.mjs';
export * from '../lib.mjs';
export const OUT = new URL('./out/', import.meta.url).pathname;

// Find the page point where a hit-test function (module path under /src, exported fn name)
// returns something JSON-equal to `want`. args: extra args after (x, y, view.w, view.h).
export async function find(page, mod, fn, want, args = []) {
  return page.evaluate(async ({ mod, fn, want, args }) => {
    const m = await import('/src/' + mod), { view } = await import('/src/render/screen.js');
    const hud = document.getElementById('hud'), r = hud.getBoundingClientRect();
    let sx = 0, sy = 0, n = 0, minx = 1e9, maxx = -1, miny = 1e9, maxy = -1;
    const w = JSON.stringify(want);
    for (let y = 0; y < view.h; y++) for (let x = 0; x < view.w; x++) {
      if (JSON.stringify(m[fn](x + 0.5, y + 0.5, view.w, view.h, ...args)) === w) { sx += x; sy += y; n++; minx = Math.min(minx, x); maxx = Math.max(maxx, x); miny = Math.min(miny, y); maxy = Math.max(maxy, y); }
    }
    if (!n) return null;
    const k = r.width / hud.width;
    // use the box centre if it hits, else the centroid
    let gx = (minx + maxx) / 2, gy = (miny + maxy) / 2;
    if (JSON.stringify(m[fn](gx, gy, view.w, view.h, ...args)) !== w) { gx = sx / n; gy = sy / n; }
    return { x: r.left + gx * k, y: r.top + gy * k, w: (maxx - minx + 1) * k, h: (maxy - miny + 1) * k, view: { w: view.w, h: view.h }, k };
  }, { mod, fn, want, args });
}
export async function tapOn(page, mod, fn, want, args = [], pause = 300) {
  const p = await find(page, mod, fn, want, args);
  if (!p) throw new Error(`no point for ${fn} ${JSON.stringify(want)}`);
  await tap(page, p.x, p.y, pause);
  return p;
}
// look card: tap key by id on tab's pad
export async function lookTap(page, tab, id, scroll = 0, isTab = false) {
  const i = await page.evaluate(async ({ tab, id, isTab }) => { const l = await import('/src/core/looks.js'); return l.LOOK_PADS[tab].findIndex((k) => k.id === id && !!k.tab === isTab); }, { tab, id, isTab });
  return tapOn(page, 'render/cloak.js', 'lookCardAt', { key: i }, [tab, scroll]);
}
export async function nameTap(page, id, digits = false) {
  const i = await page.evaluate(async ({ id, digits }) => { const l = await import('/src/core/namepad.js'); return l.padOf(digits).findIndex((k) => k.id === id); }, { id, digits });
  return tapOn(page, 'render/namepad.js', 'nameCardAt', { key: i }, [digits], 120);
}
export async function slotTap(page, want, picking = null, back = false) {
  const lines = await page.evaluate(async (p) => (await import('/src/render/slots.js')).slotLines(p), picking);
  return tapOn(page, 'render/slots.js', 'slotsAt', want, [lines, back]);
}
export const said = (page) => page.evaluate(() => document.getElementById('line')?.textContent ?? '');
// open at any size (same as lib's open, but a custom viewport)
import { createRequire } from 'node:module';
export async function openAt(url, w, h, touch = true, storage = null) {
  let pw; try { pw = createRequire(import.meta.url)('playwright'); } catch { pw = createRequire('/opt/')('playwright'); }
  const browser = await pw.chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
  const page = await ctx.newPage(); const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text().slice(0, 300)); });
  if (storage) { await page.goto(url + 'reference/README.md'); await page.evaluate((st) => { for (const [k, v] of Object.entries(st)) localStorage.setItem(k, v); }, storage); }
  await page.goto(url); await page.waitForTimeout(600);
  return { browser, page, errors };
}
