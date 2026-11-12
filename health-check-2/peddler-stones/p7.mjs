import { serve, open, shot, keys, line, readSave, inject, tap } from '../lib.mjs';
import { atHome, show, start } from './prep.mjs';
const s = await serve();
for (const kind of ['phone', 'pc']) {
  const a = atHome(1, { dx: 1, dy: 0 }, { bag: [{ id: 'flask', n: 2 }, { id: 'ratTail', n: 3 }, { id: 'venomSac', n: 1 }], coins: 0 });
  const { browser, page } = await open(s.url, kind, await inject(a.state));
  const log = async (tag) => { const k = await readSave(page); console.log(kind, tag, '|', await line(page), '| coins', k.state.coins, 'bag', k.state.bag.map((b) => b.id + b.n).join(',')); };
  await start(page, kind);
  if (kind === 'pc') { await keys(page, 'ArrowLeft', 600); await keys(page, 'ArrowDown ArrowRight ArrowRight', 200); await log('frame on empty slot 6'); await shot(page, 'out/p7-pc-empty.png'); await keys(page, 'Enter', 300); await log('Enter 1'); await shot(page, 'out/p7-pc-jumped.png'); await keys(page, 'Enter', 300); await log('Enter 2'); }
  else { await tap(page, 174, 505, 600); await tap(page, 206, 255); await log('tap empty slot 6'); await tap(page, 340, 862); await log('SELL tap 1'); await shot(page, 'out/p7-phone-jumped.png'); await tap(page, 340, 862); await log('SELL tap 2'); }
  // sell last of a stack in the middle: frame stays, next stack slides in
  await browser.close();
}
s.close();
