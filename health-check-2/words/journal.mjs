import { serve, open, shot, keys } from '../lib.mjs';
import { prepared } from './prep.mjs';
import { core } from '../lib.mjs';
const en = await core('enemies'); const ids = Object.keys(en.ENEMIES);
const s = await serve(); const p = await prepared();
const spoken = (page) => page.evaluate(() => [...document.querySelectorAll('[aria-live]')].map((e) => e.id + ':' + e.textContent).join(' | '));
for (const kind of process.argv[2] ? [process.argv[2]] : ['phone','pc']) {
  const { browser, page, errors } = await open(s.url, kind, p.storage);
  await keys(page, 'Enter Enter Escape ArrowDown Enter');
  await keys(page, 'ArrowRight'); await shot(page, `out/${kind}-growth-heart.png`);
  const steps = [['ArrowLeft','steady'],['ArrowUp','quickpour'],['ArrowRight','guard'],['ArrowRight','thrift'],['ArrowUp','locked'],['ArrowDown ArrowDown','quickhands'],['ArrowLeft','tough']];
  for (const [k, n] of steps) { await keys(page, k); await shot(page, `out/${kind}-growth-${n}.png`); if (kind==='phone') console.log(n, await spoken(page)); }
  await keys(page, 'ArrowRight ArrowRight'); await shot(page, `out/${kind}-bestiary.png`);
  await keys(page, 'PageDown'); await shot(page, `out/${kind}-bestiary2.png`); await keys(page, 'PageUp');
  for (let i = 0; i < ids.length; i++) {
    await keys(page, 'Enter', 150); await shot(page, `out/${kind}-beast-${String(i).padStart(2,'0')}-${ids[i]}.png`);
    await keys(page, 'PageDown', 150); await shot(page, `out/${kind}-beastB-${String(i).padStart(2,'0')}-${ids[i]}.png`);
    await keys(page, 'ArrowLeft ArrowDown', 120);
  }
  await keys(page, 'ArrowRight'); await shot(page, `out/${kind}-feats.png`); if (kind==='phone') console.log(await spoken(page));
  await keys(page, 'ArrowRight'); await shot(page, `out/${kind}-quests.png`); if (kind==='phone') console.log(await spoken(page));
  console.log(kind, 'errors', errors);
  await browser.close();
}
s.close();
