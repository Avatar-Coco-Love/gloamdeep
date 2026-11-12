import { serve, open, shot, keys, line, readSave, inject, tap } from '../lib.mjs';
import { atPeddler, show } from './prep.mjs';
const s = await serve();
const a = atPeddler(4127);
const kind = process.argv[2] || 'pc';
const { browser, page, errors } = await open(s.url, kind, await inject({ ...a.state, lit: true }));
await keys(page, 'Enter Enter'); await page.waitForTimeout(800);
await shot(page, `out/p1-${kind}-a.png`);
const log = async (tag) => { const k = await readSave(page); console.log(tag, '|', await line(page), '| turn', k.state.turn, 'people', JSON.stringify(k.state.people), 'chips', JSON.stringify(k.state.room.chips)); };
if (kind === 'pc') {
  for (let i = 1; i <= 3; i++) { await keys(page, a.dir, 500); await log('bump' + i); await shot(page, `out/p1-${kind}-b${i}.png`); }
  // step into cleared heap then bump peddler (he is below)
  await keys(page, a.dir, 500); await log('step in');
  await keys(page, a.dir, 500); await log('talk1'); await shot(page, `out/p1-${kind}-c1.png`);
  await keys(page, a.dir, 500); await log('talk2');
  await keys(page, a.dir, 500); await log('talk3');
  await keys(page, a.dir, 500); await log('talk4');
  for (let i = 1; i <= 4; i++) { await keys(page, 'Space', 500); await log('wait' + i); if (i>=3) await shot(page, `out/p1-${kind}-d${i}.png`); }
  await page.waitForTimeout(1500); await shot(page, `out/p1-${kind}-e.png`);
  const k = await readSave(page); console.log(JSON.stringify(Object.fromEntries(Object.entries(k.state.elsewhere).map(([id, p]) => [id, p.people]))));
}
console.log(errors);
await browser.close(); s.close();
