// changing the way to play: node e1.mjs <kind> <mode> "<key sequence after Settings opens>"
import { serve, open, shot, keys, line, inject, tap } from '../lib.mjs';
import { turn, st } from './h.mjs';
const [kind, mode, seq = ''] = process.argv.slice(2), tag = `e-${mode}-${kind}`;
const s = await serve();
const { browser, page, errors } = await open(s.url, kind, await inject(turn.newJourney(4127, mode)));
await keys(page, 'Enter Enter'); await page.waitForTimeout(600);
await keys(page, 'Escape', 400); console.log(tag, 'pause |', await line(page));
await keys(page, 'ArrowDown ArrowDown Enter', 300); console.log(tag, 'settings |', (await line(page)).slice(0, 300));
await shot(page, `out/${tag}-1-settings.png`);
let i = 2;
for (const k of seq.split(' ').filter(Boolean)) {
  if (k.startsWith('tap:')) { const [x, y] = k.slice(4).split(',').map(Number); await tap(page, x, y, 400); } else await keys(page, k, 350);
  console.log(tag, k, '| mode', (await st(page)).mode, '|', (await line(page)).slice(0, 260));
  await shot(page, `out/${tag}-${i++}-${k.replace(/[:,]/g, '_')}.png`);
}
console.log(tag, 'errors', JSON.stringify(errors).slice(0, 200));
await browser.close(); s.close();
