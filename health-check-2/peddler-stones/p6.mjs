import { serve, open, shot, keys, line, readSave, inject, tap } from '../lib.mjs';
import { atHome, show, start } from './prep.mjs';
const s = await serve();
for (const kind of ['pc', 'phone']) {
  const a = atHome(1, { dx: 5, dy: 0 });
  const { browser, page, errors } = await open(s.url, kind, await inject(a.state));
  const log = async (tag) => { const k = await readSave(page); console.log(kind, tag, '|', await line(page), '| ped', JSON.stringify(k.state.people)); };
  await start(page, kind);
  for (let i = 1; i <= 4; i++) { if (kind === 'pc') await keys(page, 'ArrowLeft', 500); else await tap(page, 206 + 3 * 32 - 0 - 32 * 1 + (i > 0 ? 0 : 0), 505, 600); await log('step' + i); if (i === 3) await shot(page, `out/p6-${kind}-greet.png`); }
  await shot(page, `out/p6-${kind}-end.png`);
  await browser.close();
}
s.close();
