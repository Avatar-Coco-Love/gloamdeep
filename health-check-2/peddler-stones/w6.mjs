import { serve, open, shot, keys, line, readSave, inject, tap } from '../lib.mjs';
import { allWoken, start } from './prep.mjs';
const s = await serve();
for (const kind of ['phone', 'pc']) for (const [n, extra] of Object.entries({ stout7: { boon: 'stoutHeart', health: 7 }, stout5: { boon: 'stoutHeart', health: 5 }, reckless: { boon: 'reckless', health: 3 } })) {
  const { browser, page } = await open(s.url, kind, await inject(allWoken(1, [2], extra)));
  await start(page, kind);
  await page.screenshot({ path: `out/w6-${kind}-${n}.png`, clip: { x: 0, y: 0, width: kind === 'pc' ? 400 : 200, height: kind === 'pc' ? 240 : 120 } });
  await browser.close();
}
s.close();
