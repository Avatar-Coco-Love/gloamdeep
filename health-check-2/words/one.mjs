import { serve, open, shot, keys, line } from '../lib.mjs';
import { prepared } from './prep.mjs';
const s = await serve(); const p = await prepared();
console.log('level', p.level);
for (const kind of ['phone','pc']) {
  const { browser, page, errors } = await open(s.url, kind, p.storage);
  await keys(page, 'Enter Enter'); await shot(page, `out/${kind}-play.png`);
  await keys(page, 'Escape'); await shot(page, `out/${kind}-pause.png`);
  await keys(page, 'ArrowDown Enter'); await shot(page, `out/${kind}-records.png`);
  console.log(kind, errors, await page.evaluate(() => document.querySelector('[aria-live]')?.textContent));
  await browser.close();
}
s.close();
