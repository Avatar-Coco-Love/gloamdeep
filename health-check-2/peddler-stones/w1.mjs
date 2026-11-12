import { serve, open, shot, keys, line, readSave, inject, tap } from '../lib.mjs';
import { nearHomeStone, show, start } from './prep.mjs';
const s = await serve();
const kind = process.argv[2] || 'pc';
const st = nearHomeStone(1);
console.log(show(st));
const { browser, page, errors } = await open(s.url, kind, await inject(st));
const S = (n) => shot(page, `out/w1-${kind}-${n}.png`);
const log = async (tag) => { const k = await readSave(page); console.log(tag, '|', await line(page), '| turn', k.state.turn, 'hero', JSON.stringify(k.state.hero), 'hp', k.state.health, 'boon', k.state.boon); };
await start(page, kind); await S('a'); await log('start');
if (kind === 'pc') {
  await keys(page, 'ArrowUp', 500); await log('arm');
  await keys(page, 'ArrowUp', 300); await S('wake0'); await page.waitForTimeout(900); await log('plate (wakes)'); await S('wake1');
  await keys(page, 'Space', 500); await log('space on plate'); await S('travel');
  await keys(page, 'Enter', 400); await log('enter on dim row'); await keys(page, 'ArrowDown Enter', 400); await log('enter on ??? row'); await S('travel2');
  await keys(page, 'Escape', 300); await log('esc');
  await keys(page, 'ArrowDown', 500); await log('off'); await keys(page, 'ArrowUp', 600); await log('on again'); await S('boons');
  await keys(page, 'ArrowRight', 300); await log('right'); await S('boons2'); await keys(page, 'ArrowRight ArrowRight', 300); await log('right x2 more'); await S('boons3');
  await keys(page, 'Escape', 300); await log('esc (skip)'); await S('skipped');
  await keys(page, 'ArrowDown', 500); await keys(page, 'ArrowUp', 600); await log('on again 2'); await S('boonsB');
  await keys(page, 'Enter', 800); await log('pick first'); await S('picked');
  await keys(page, 'Enter', 800); await log('enter again'); await S('picked2');
  await keys(page, 'Space', 500); await log('space on plate with boon'); await S('travelB');
  await keys(page, 'Escape', 300);
  await keys(page, 'ArrowDown', 500); await keys(page, 'ArrowUp', 600); await log('off/on with boon held'); await S('held');
}
console.log(errors.filter((e) => !e.includes('willRead') && !e.includes('Audio')));
await browser.close(); s.close();
