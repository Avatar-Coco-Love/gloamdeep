import { serve, open, shot, keys, line, readSave, inject, core } from './lib.mjs';
const turn = await core('turn');
const st = turn.newJourney(4127, 'gentle');
const s = await serve();
for (const kind of ['phone', 'pc']) {
  const { browser, page, errors } = await open(s.url, kind, await inject(st));
  await shot(page, `out/s2-${kind}-1.png`);
  await keys(page, 'Enter'); await shot(page, `out/s2-${kind}-2.png`);
  await keys(page, 'Enter'); await shot(page, `out/s2-${kind}-3.png`);
  await keys(page, 'ArrowRight ArrowRight');
  const k = await readSave(page);
  console.log(kind, 'line:', await line(page), '| hero', JSON.stringify(k?.state.hero), 'turn', k?.state.turn, 'errors', errors);
  await shot(page, `out/s2-${kind}-4.png`);
  await browser.close();
}
s.close();
