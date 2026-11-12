import { run, shot, keys, line, sv, tap, OUT } from './mk.mjs';
import { mortarState } from './m1.mjs';
const SLOT = [[72, 105], [140, 105], [208, 105], [276, 105], [72, 173], [140, 173]];
const BAGSLOT = (i) => [70 + (i % 4) * 68, 186 + Math.floor(i / 4) * 68];
await run(['phone', 'pc'], mortarState({ stiff: 15, poisoned: 6, health: 5, warmed: 30 }), async (page, kind) => {
  const pc = kind === 'pc';
  const info = async (what) => { const s = await sv(page); console.log(kind, what, '|', (await line(page)).slice(0, 90), '| t', s.turn, 'bag', s.bag.map((b) => b.id + '×' + b.n).join(' '), '| glow', s.glow, 'slow', s.slowburn, 'mend', s.mending, 'ward', s.ward, 'spit', s.spitproof, 'shade', s.shade, 'pois', s.poisoned, 'stiff', s.stiff, 'warm', s.warmed, 'hp', s.health); return s; };
  if (pc) await keys(page, 'ArrowLeft'); else await tap(page, 173, 470);
  for (let i = 0; i < 6; i++) {
    if (pc) { if (i) await keys(page, 'ArrowRight'); await keys(page, 'Enter'); } else { await tap(page, ...SLOT[i]); await tap(page, 342, 864); }
    await info('make ' + i);
    if (i === 0) { await shot(page, `${OUT}m2-${kind}-made0.png`); if (pc) await keys(page, 'Enter'); else await tap(page, 342, 864); await info('make 0 again (short)'); await shot(page, `${OUT}m2-${kind}-short0.png`); }
  }
  await keys(page, 'Escape');
  let s = await sv(page);
  // drink each draught from the bag
  for (const id of ['wardDraught', 'glowDraught', 'slowburn', 'mendingDraught', 'spitproofDraught', 'shadeDraught']) {
    s = await sv(page); const i = s.bag.findIndex((b) => b.id === id);
    if (pc) { await keys(page, 'i'); await keys(page, 'ArrowRight '.repeat(i % 4) + 'ArrowDown '.repeat(Math.floor(i / 4))); if (id === 'glowDraught') await shot(page, `${OUT}m2-${kind}-drinkcard.png`); await keys(page, 'Enter'); }
    else { await page.locator('#bag-button').tap(); await page.waitForTimeout(300); await tap(page, ...BAGSLOT(i)); if (id === 'glowDraught') await shot(page, `${OUT}m2-${kind}-drinkcard.png`); await tap(page, 342, 864); }
    await info('drink ' + id); await keys(page, 'Escape'); if ((await line(page)).startsWith('Paused')) await keys(page, 'Escape');
  }
  await page.waitForTimeout(400); await shot(page, `${OUT}m2-${kind}-marks.png`);
});
