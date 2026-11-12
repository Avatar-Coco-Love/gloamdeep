import { serve, open, shot, keys, core, inject, line } from '../lib.mjs';
const turn = await core('turn');
const s = await serve();
const state = turn.newJourney(4127);
const st = await inject(state);
const info = (page) => page.evaluate(() => [...document.querySelectorAll('canvas')].map((c) => { const r = c.getBoundingClientRect(), cs = getComputedStyle(c); return { id: c.id || c.parentElement.id, w: c.width, h: c.height, cw: r.width, ch: r.height, left: r.left, top: r.top, zx: +(r.width / c.width).toFixed(4), zy: +(r.height / c.height).toFixed(4), ir: cs.imageRendering, disp: cs.display, smooth: c.getContext('2d')?.imageSmoothingEnabled }; }).filter((c) => c.disp !== 'none' && c.cw > 0));
for (const kind of ['phone', 'pc']) {
  const { browser, page, errors } = await open(s.url, kind, st);
  await shot(page, `out/${kind}-1-title.png`); console.log(kind, 'title', JSON.stringify(await info(page)));
  await keys(page, 'Enter', 700); await shot(page, `out/${kind}-2.png`);
  await keys(page, 'Enter', 700); await shot(page, `out/${kind}-3.png`); console.log(kind, 'play?', JSON.stringify(await info(page)), await line(page));
  await keys(page, 'ArrowRight ArrowRight', 300); await shot(page, `out/${kind}-4-play.png`);
  await keys(page, 'i', 500); await shot(page, `out/${kind}-5-bag.png`); console.log(kind, 'bag', JSON.stringify((await info(page)).filter(c=>c.id.includes('hud')||c.id.includes('room'))));
  await keys(page, 'Escape', 300); await keys(page, 'm', 500); await shot(page, `out/${kind}-6-map.png`);
  await keys(page, 'Escape', 300); await keys(page, 'p', 500); await shot(page, `out/${kind}-7-pause.png`);
  console.log(kind, 'errors', errors.filter(e=>!e.includes('willReadFrequently')));
  await browser.close();
}
s.close();
