import { serve, open, shot, keys, line, readSave, inject, tap } from '../lib.mjs';
import { allWoken, show, start, travelM } from './prep.mjs';
const s = await serve();
const kind = 'phone';
const st = allWoken(1, [2, 5, 8, 12, 16], { boon: 'waymark' });
const { browser, page, errors } = await open(s.url, kind, await inject(st, { profile: { goals: { boon: { done: true, shown: true } } } }));
const S = (n) => shot(page, `out/w4-${kind}-${n}.png`);
const log = async (tag) => { const k = await readSave(page); console.log(tag, '|', (await line(page)).slice(0, 120), '| turn', k.state.turn, 'place', k.state.place, 'hero', JSON.stringify(k.state.hero), 'hp', k.state.health, 'boon', k.state.boon, 'oil', k.state.oil.toFixed(3)); };
await start(page, kind); await S('a'); await log('start');
const [hx, hy] = (process.argv[2] || '206,457').split(',').map(Number);
await tap(page, hx, hy, 600); await S('card'); await log('tap hero');
await page.touchscreen.tap(200, 500); // nothing
// swipe up to page
await page.mouse.move(200, 700); 
await S('card1');
await tap(page, 200, 95, 1500); await S('home'); await log('tap Home row');
await tap(page, 206, 410, 600); await S('homecard'); await log('tap hero at home');
await tap(page, 200, 275, 1500); await S('went'); await log('tap Depth 8 row'); await tap(page, 206, 457, 600); await S('card8'); await tap(page, 200, 275, 500); await log('tap here row'); await tap(page, 200, 455, 500); await log('tap ??? row'); await tap(page, 356, 38, 500); await log('cross'); await S('end');
console.log(errors.filter((e) => !e.includes('willRead') && !e.includes('Audio')));
await browser.close(); s.close();
