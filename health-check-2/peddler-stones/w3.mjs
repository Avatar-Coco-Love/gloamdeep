import { serve, open, shot, keys, line, readSave, inject, tap } from '../lib.mjs';
import { allWoken, show, start, travelM } from './prep.mjs';
const s = await serve();
const kind = process.argv[2] || 'pc';
const st = allWoken(1, [2, 5, 8, 12, 16], { boon: 'stoutHeart', health: 7 });
console.log(JSON.stringify(travelM.stonesOf(st)));
const { browser, page, errors } = await open(s.url, kind, await inject(st, { profile: { goals: { boon: { done: true, shown: true } } } }));
const S = (n) => shot(page, `out/w3-${kind}-${n}.png`);
const log = async (tag) => { const k = await readSave(page); console.log(tag, '|', (await line(page)).slice(0, 260), '| turn', k.state.turn, 'place', k.state.place, 'hero', JSON.stringify(k.state.hero), 'hp', k.state.health, 'boon', k.state.boon, 'oil', k.state.oil.toFixed(3)); };
await start(page, kind); await S('a'); await log('start');
if (kind === 'pc') {
  await keys(page, 'Space', 500); await S('card'); await log('card');
  await keys(page, 'ArrowDown ArrowDown ArrowDown ArrowDown ArrowDown ArrowDown', 150); await S('card-down'); 
  await keys(page, 'PageUp', 300); await S('card-pgup');
  await keys(page, 'Escape', 300);
  await keys(page, 'Enter', 500); await S('card-enter'); await log('enter opens');
  await keys(page, 'Enter', 1200); await log('to first woken (home?)'); await S('home');
  await keys(page, 'Space', 500); await S('card-home'); await log('card at home');
  await keys(page, 'ArrowDown ArrowDown Enter', 400); await page.waitForTimeout(1200); await log('travelled from home'); await S('d5');
  await keys(page, 'Enter', 400); await keys(page, 'ArrowDown Enter', 400); await page.waitForTimeout(1200); await log('next'); await S('next');
}
console.log(errors.filter((e) => !e.includes('willRead') && !e.includes('Audio')));
await browser.close(); s.close();
