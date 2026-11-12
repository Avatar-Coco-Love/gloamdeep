import { serve, open, shot, keys, core, inject } from '../lib.mjs';
const turn = await core('turn'), stairs = await core('stairs');
const s = await serve();
for (const d of [1, 3, 6, 8]) {
  let state = turn.newJourney(4127);
  try { state = stairs.goToDepth(state, d); } catch (e) { console.log('depth', d, e.message); continue; }
  console.log('depth', d, 'look', state.room.look, state.room.cols + 'x' + state.room.rows);
  const st = await inject(state, { jumped: true });
  for (const kind of ['phone', 'pc']) {
    if (kind === 'pc' && d !== 1 && d !== 6) continue;
    const { browser, page, errors } = await open(s.url, kind, st);
    await keys(page, 'Enter Enter', 700);
    await page.waitForTimeout(1500); console.log(await page.evaluate(()=>{const c=document.getElementById('room');return c.getBoundingClientRect().width/c.width}));
    await shot(page, `out/${kind}-depth${d}.png`);
    console.log(kind, d, errors.filter(e => !e.includes('willReadFrequently')));
    await browser.close();
  }
}
s.close();
