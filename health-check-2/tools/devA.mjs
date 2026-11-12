import { serve, open, shot, keys, said, OUT, slotTap, tap, core, inject, readSave } from './h.mjs';
const turn = await core('turn');
const s = await serve();
const kind = process.argv[2] || 'phone';
const st = turn.newJourney(4127, 'gentle');
const { browser, page, errors } = await open(s.url, kind, await inject(st));
const o = (n) => `${OUT}devA-${kind}-${n}.png`;
await slotTap(page, 0); await keys(page, 'Enter', 500);
const rect = (sel) => page.evaluate((sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), shown: getComputedStyle(e).display !== 'none' && getComputedStyle(e).visibility !== 'hidden' }; }, sel);
console.log(kind, 'viewport', JSON.stringify(page.viewportSize()), 'wrench', JSON.stringify(await rect('#dev-button')), 'pause', JSON.stringify(await rect('#pause-button')), 'map', JSON.stringify(await rect('#map-button')));
await shot(page, o('0play'));
const w = await rect('#dev-button'); await tap(page, w.x + w.w / 2, w.y + w.h / 2, 400);
console.log(kind, 'panel', JSON.stringify(await rect('#dev-panel')));
const tabs = await page.evaluate(() => [...document.querySelectorAll('.dev-tab')].map((t) => { const r = t.getBoundingClientRect(); return { title: t.title, x: r.x + r.width / 2, y: r.y + r.height / 2, w: Math.round(r.width), h: Math.round(r.height), open: t.getAttribute('aria-expanded') }; }));
console.log(kind, 'tabs', tabs.map((t) => `${t.title}:${t.w}x${t.h}${t.open === 'true' ? '*' : ''}`).join(' '));
for (const t of tabs) {
  if (t.open !== 'true' || t !== tabs[0]) await tap(page, t.x, t.y, 350);
  const info = await page.evaluate(() => {
    const body = [...document.querySelectorAll('.dev-body')].find((b) => !b.hidden); if (!body) return null;
    const br = body.getBoundingClientRect(), pr = document.getElementById('dev-panel').getBoundingClientRect();
    const items = [...body.querySelectorAll('button, input, textarea')].filter((e) => !e.hidden && e.offsetParent).map((e) => { const r = e.getBoundingClientRect(); return { t: (e.getAttribute('aria-label') || e.title || e.textContent || e.type).trim().slice(0, 18), w: Math.round(r.width), h: Math.round(r.height), inView: r.top >= br.top - 1 && r.bottom <= br.bottom + 1, right: Math.round(r.right) }; });
    return { head: document.querySelector('.dev-head').textContent, body: { top: Math.round(br.top), bottom: Math.round(br.bottom), w: Math.round(br.width), scrollH: body.scrollHeight, clientH: body.clientHeight }, panel: { top: Math.round(pr.top), bottom: Math.round(pr.bottom), w: Math.round(pr.width) }, small: items.filter((i) => i.w < 44 || i.h < 44), n: items.length, hiddenBelow: items.filter((i) => !i.inView).map((i) => i.t), overflowRight: items.filter((i) => i.right > innerWidth).map((i) => i.t), all: items.map((i) => `${i.t}(${i.w}x${i.h})`) };
  });
  console.log(kind, t.title, JSON.stringify({ ...info, all: t.title === 'Spawn' ? info.all.length : info.all }));
  await shot(page, o('tab-' + t.title));
}
// fold: tap the open tab again
const last = tabs[tabs.length - 1]; await tap(page, last.x, last.y, 350); console.log(kind, 'folded panel', JSON.stringify(await rect('#dev-panel'))); await shot(page, o('folded'));
console.log(kind, 'devstore', await page.evaluate(() => localStorage.getItem('gloamdeep-dev')));
// open View, switch all on, reload: remembered?
await tap(page, tabs[0].x, tabs[0].y, 300);
const sw = await page.evaluate(() => [...document.querySelectorAll('.dev-body:not([hidden]) .dev-switch')].map((b) => { const r = b.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, t: b.textContent.trim() }; }));
for (const b of sw) { await tap(page, b.x, b.y, 250); }
await shot(page, o('allon'));
console.log(kind, 'readout', JSON.stringify(await rect('#dev-readout')), '|', await page.evaluate(() => document.getElementById('dev-readout').textContent));
console.log(kind, 'devstore', await page.evaluate(() => localStorage.getItem('gloamdeep-dev')));
await tap(page, w.x + w.w / 2, w.y + w.h / 2, 400); await shot(page, o('allon-shut'));
console.log(kind, 'readout shut', JSON.stringify(await rect('#dev-readout')));
await page.reload(); await page.waitForTimeout(600); await slotTap(page, 0); await keys(page, 'Enter', 500);
console.log(kind, 'after reload panel shown?', JSON.stringify(await rect('#dev-panel')), 'wrench expanded', await page.evaluate(() => document.getElementById('dev-button').getAttribute('aria-expanded')));
await tap(page, w.x + w.w / 2, w.y + w.h / 2, 400); await shot(page, o('reloaded-open'));
console.log(kind, 'open section after reload:', await page.evaluate(() => document.querySelector('.dev-head').textContent), 'pressed:', await page.evaluate(() => [...document.querySelectorAll('.dev-switch[aria-pressed=true]')].map((b) => b.textContent.trim()).join(',')));
console.log(kind, 'errors', errors);
await browser.close(); s.close();
