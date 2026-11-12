import { serve, open, shot, keys, inject, core, line } from '../lib.mjs';
const turn = await core('turn');
let st = turn.newJourney(4127, 'normal');
st = { ...st, held: 'knife', tool: 'pick', bag: [{ id: 'flask', n: 2 }, { id: 'herb', n: 1 }, { id: 'oilcap', n: 3 }, { id: 'wood', n: 3 }, { id: 'ratVest', n: 1 }, { id: 'potion', n: 1 }], known: ['flask','herb','oilcap','wood','stone','mothDust','mimicGlass','heartcap'] };
const s = await serve();
for (const kind of ['phone', 'pc']) {
  const { browser, page, errors } = await open(s.url, kind, await inject(st));
  await keys(page, 'Enter Enter'); await keys(page, 'i', 400); await shot(page, `out/${kind}-bag.png`);
  await keys(page, 'ArrowRight', 300); await shot(page, `out/${kind}-bag2.png`);
  await keys(page, 'Tab', 300); await shot(page, `out/${kind}-make.png`);
  await keys(page, 'Escape'); await keys(page, 'm', 400); await shot(page, `out/${kind}-map.png`);
  console.log(kind, errors);
  await browser.close();
}
s.close();
