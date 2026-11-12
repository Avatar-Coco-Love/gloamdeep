import { serve, open, shot, keys, line, readSave, inject, tap } from '../lib.mjs';
import { wakeAt, mouth, turn, show, start } from './prep.mjs';
const s = await serve();
const kind = process.argv[2] || 'pc';
let base = wakeAt(turn.newJourney(1, 'gentle'), mouth.stoneHome(1));
base = { ...turn.step(base, 'down'), lit: false, health: 3 };
for (const [T, pick] of [[3, 0], [4, 1], [5, 0], [7, 0], [8, 1], [9, 2], [10, 1], [12, 0]]) {
  const { browser, page, errors } = await open(s.url, kind, await inject({ ...base, turn: T - 1 }, { profile: T > 3 ? { goals: { boon: { done: true, shown: true } } } : {} }));
  const S = (n) => shot(page, `out/w2-${kind}-T${T}-${n}.png`);
  const log = async (tag) => { const k = await readSave(page); console.log(T, tag, '|', (await line(page)).slice(0, 150), '| turn', k.state.turn, 'hp', k.state.health, 'boon', k.state.boon, 'oil', k.state.oil); };
  await start(page, kind);
  if (T === 3) await S('pre');
  if (kind === 'pc') await keys(page, 'ArrowUp', 600); else await tap(page, 206, 410, 700);
  await S('card'); await log('card');
  if (kind === 'pc') { for (let i = 0; i < pick; i++) await keys(page, 'ArrowRight', 200); await S('chosen'); await keys(page, 'Enter', 700); }
  else { await tap(page, [96, 206, 316][pick], 480, 700); }
  await S('took'); await log('took');
  if (T === 3) { if (kind === 'pc') await keys(page, 'Enter', 500); else await tap(page, 206, 600, 500); await S('took2'); await log('after about'); }
  // the mark: hover / tap
  if (kind === 'pc') { await page.mouse.move(48, 205); await page.waitForTimeout(300); } else await tap(page, 22, 84, 400);
  await S('mark'); await log('mark');
  console.log(errors.filter((e) => !e.includes('willRead') && !e.includes('Audio')));
  await browser.close();
}
s.close();
