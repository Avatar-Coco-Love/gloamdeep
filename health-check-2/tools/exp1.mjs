import { serve, open, shot, keys, said, OUT, slotTap, find, tap, tapOn } from './h.mjs';
const s = await serve();
const kind = process.argv[2] || 'phone';
const { browser, page, errors } = await open(s.url, kind);
const o = (n) => `${OUT}exp1-${kind}-${n}.png`;
const log = async (what) => console.log(kind, what, '|', (await said(page)).slice(0, 75));
const settings = () => page.evaluate(() => localStorage.getItem('gloamdeep-settings'));
const M = (want) => tapOn(page, 'render/map.js', 'mapCardAt', want, [true]);
const S = async (id) => { const i = await page.evaluate(async (id) => (await import('/src/core/seedpad.js')).PAD.findIndex((k) => k.id === id), id); return tapOn(page, 'render/seedpad.js', 'seedCardAt', { key: i }, [], 150); };
await slotTap(page, 0); await shot(page, o('0title'));
if (kind === 'pc') await keys(page, 'ArrowDown ArrowDown ArrowDown ArrowDown ArrowDown ArrowDown Enter', 100);
else await tap(page, 60, 880);
await log('open'); await shot(page, o('1open'));
for (const w of ['back', 'type', 'reseed', 'up', 'down', 'close']) { const p = await find(page, 'render/map.js', 'mapCardAt', w, [true]); console.log(kind, 'hit', w, p && `${p.w.toFixed(0)}x${p.h.toFixed(0)}`); }
await M('back'); await log('back with none');
await M('type'); await log('pad'); await shot(page, o('2pad'));
await S('0'); await S('1'); await S('ok'); await log('typed 0 1 ok'); await shot(page, o('3seed1'));
await M('down'); await log('down'); await shot(page, o('4seed1-d1'));
await M('down'); await log('down'); await shot(page, o('5seed1-d2'));
await M('type'); for (const d of '9999999') await S(d); await shot(page, o('6pad99999')); await S('del'); await S('9'); await S('ok'); await log('99999 (floor kept?)'); await shot(page, o('7seed99999-d2'));
await M('type'); await S('ok'); await log('ok with nothing typed');
await M('type'); await S('random'); await log('random');
await M('type'); await S('5'); await tapOn(page, 'render/seedpad.js', 'seedCardAt', 'close', []); await log('pad closed with cross after typing 5');
await M('reseed'); await log('reseed'); await M('reseed'); await log('reseed');
for (let i = 0; i < 6; i++) { await M('back'); await log('back ' + i); }
await shot(page, o('8backed'));
await M('up'); await M('up'); await M('up'); await log('up x3'); await shot(page, o('9surface'));
console.log(kind, 'settings', await settings());
// deep floors
if (kind === 'pc') { for (let i = 0; i < 101; i++) await page.keyboard.press('PageDown'); await page.waitForTimeout(300); await log('PageDown x101'); await shot(page, o('10deep99'));
  await keys(page, '< <', 150); await log('< <'); await keys(page, '>', 150); await log('>');
  await keys(page, 'r', 150); await log('r'); await keys(page, 't', 150); await log('t'); await page.keyboard.type('123456'); await page.waitForTimeout(100); await shot(page, o('11typed')); await keys(page, 'Enter', 200); await log('typed 123456 enter'); await keys(page, 'b', 150); await log('b');
  // arrows scroll, wheel zoom, drag
  await page.mouse.move(800, 450); for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, -120); await page.waitForTimeout(80); } await shot(page, o('12zoomed'));
  await keys(page, 'ArrowRight ArrowRight ArrowDown', 80); await page.mouse.move(800, 450); await page.mouse.down(); await page.mouse.move(600, 350, { steps: 5 }); await page.mouse.up(); await page.waitForTimeout(200); await shot(page, o('13dragged')); await log('after drag');
  for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, 120); await page.waitForTimeout(50); } await shot(page, o('14zoomedout'));
  await keys(page, 'Enter', 100); await keys(page, ' ', 100); await keys(page, 'm', 150); await log('m (toggleMap closes explorer?)');
} else {
  for (let i = 0; i < 12; i++) await M('down'); await log('down x12'); await shot(page, o('10deep'));
  const cdp = await page.context().newCDPSession(page);
  const T = (type, pts) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: pts.map((p, i) => ({ x: p[0], y: p[1], id: i })) });
  await T('touchStart', [[150, 400], [250, 500]]); for (let i = 1; i <= 8; i++) await T('touchMove', [[150 - 8 * i, 400 - 8 * i], [250 + 8 * i, 500 + 8 * i]]); await T('touchEnd', []); await page.waitForTimeout(200); await shot(page, o('11pinched')); await log('pinched out');
  await T('touchStart', [[200, 450]]); for (let i = 1; i <= 6; i++) await T('touchMove', [[200 - 15 * i, 450 - 10 * i]]); await T('touchEnd', []); await page.waitForTimeout(200); await shot(page, o('12dragged')); await log('dragged');
  await T('touchStart', [[80, 350], [330, 600]]); for (let i = 1; i <= 8; i++) await T('touchMove', [[80 + 12 * i, 350 + 12 * i], [330 - 12 * i, 600 - 12 * i]]); await T('touchEnd', []); await page.waitForTimeout(200); await shot(page, o('13pinchedin')); await log('pinched in');
  await tap(page, 5, 5); await log('tap outside');
}
await shot(page, o('15end'));
console.log(kind, 'errors', errors, 'settings', await settings());
await browser.close(); s.close();
