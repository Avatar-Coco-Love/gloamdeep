import { serve, open, shot, keys, line, readSave, inject, tap } from '../lib.mjs';
import { plateOf, turn, stairs, roomM, start, show } from './prep.mjs';
const s = await serve();
for (const [kind, d] of [['pc', 2], ['phone', 5], ['pc', 8], ['pc', 12], ['pc', 16]]) {
  let st = stairs.goToPlace(turn.newJourney(1, 'gentle'), roomM.stoneRoom(1, d));
  const pl = plateOf(st.room); st = { ...st, hero: { x: pl.x, y: pl.y + 1 }, enemies: [], lit: true };
  if (d === 2) console.log(show(st));
  const { browser, page, errors } = await open(s.url, kind, await inject(st));
  const log = async (tag) => { const k = await readSave(page); console.log(kind, d, tag, '|', (await line(page)).slice(0, 200), '| turn', k.state.turn, 'hero', JSON.stringify(k.state.hero)); };
  await start(page, kind);
  if (kind === 'pc') { await keys(page, 'ArrowUp', 300); await shot(page, `out/w7-${kind}-${d}-waking.png`); await page.waitForTimeout(900); await log('wake'); await keys(page, 'Space', 500); await log('card'); await shot(page, `out/w7-${kind}-${d}-card.png`); }
  else { await shot(page, `out/w7-${kind}-${d}-pre.png`); await tap(page, 206, 425, 1200); await log('wake'); await shot(page, `out/w7-${kind}-${d}-woke.png`); await tap(page, 206, 425, 600); await log('tap hero'); await shot(page, `out/w7-${kind}-${d}-card.png`); }
  console.log(errors.filter((e) => !e.includes('willRead') && !e.includes('Audio')));
  await browser.close();
}
s.close();
