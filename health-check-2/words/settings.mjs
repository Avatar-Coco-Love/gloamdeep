import { serve, open, shot, keys } from '../lib.mjs';
import { prepared } from './prep.mjs';
const s = await serve(); const p = await prepared();
for (const kind of ['phone','pc']) {
  const { browser, page, errors } = await open(s.url, kind, p.storage);
  await shot(page, `out/${kind}-slots.png`);
  await keys(page, 'Enter'); await shot(page, `out/${kind}-title.png`);
  await keys(page, 'Enter Escape ArrowDown ArrowDown Enter');
  for (const t of ['controls','game','screen','sound']) { await shot(page, `out/${kind}-set-${t}.png`); if (t !== 'sound') await keys(page, 'Tab'); }
  // sound tab: lines sound, loud, 5 kinds
  await keys(page, 'ArrowDown ArrowDown');
  for (const k of ['steps','fight','finds','menus','music']) { await keys(page, 'Enter'); await shot(page, `out/${kind}-snd-${k}.png`); await keys(page, 'Escape ArrowDown'); }
  await keys(page, 'Escape'); await keys(page, 'ArrowDown Enter'); // how to play
  for (const t of ['basics','touch','mouse','keyboard','bag','bench']) { await shot(page, `out/${kind}-how-${t}.png`); await keys(page, 'ArrowRight'); }
  console.log(kind, errors);
  await browser.close();
}
s.close();
