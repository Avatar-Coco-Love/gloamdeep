import { serve, open, shot, keys, line, readSave, inject, core } from '../lib.mjs';
const turn = await core('turn'), stairs = await core('stairs');
let st = turn.newJourney(4127, 'normal');
st = { ...stairs.goToDepth(st, 4), lit: true };
console.log(Object.keys(st).join(' '));
console.log(st.room.map.join('\n'), st.hero, st.place, st.oil, st.health);
const s = await serve();
for (const kind of ['phone', 'pc']) {
  const { browser, page, errors } = await open(s.url, kind, await inject(st));
  await shot(page, `out/p1-${kind}-1.png`);
  await keys(page, 'Enter'); await shot(page, `out/p1-${kind}-2.png`);
  await keys(page, 'Enter'); await shot(page, `out/p1-${kind}-3.png`);
  const k = await readSave(page);
  console.log(kind, 'line:', await line(page), '| hero', JSON.stringify(k?.state.hero), 'turn', k?.state.turn, 'errors', errors);
  console.log(await page.evaluate(() => [...document.querySelectorAll('button')].map((b) => b.id + ':' + b.textContent.trim().slice(0, 12) + ':' + JSON.stringify(b.getBoundingClientRect().toJSON(), (k, v) => typeof v === 'number' ? Math.round(v) : v)).join('\n')));
  console.log(await page.evaluate(() => { const c = document.querySelector('canvas'); const r = c.getBoundingClientRect(); return [c.width, c.height, r.left, r.top, r.width, r.height]; }));
  await browser.close();
}
s.close();
