import { run, turn, stairs, base, shot, keys, line, sv, tap, core, OUT } from './mk.mjs';
const st = { ...stairs.goToPlace(base(), 'woods'), turn: 200, health: 2, lit: true, oil: 0.5, bag: [{ id: 'furBedroll', n: 1 }] };
await run(['phone', 'pc'], st, async (page, kind) => {
  const pc = kind === 'pc';
  const log = async (what) => { const s = await sv(page); console.log(kind, what, '|', (await line(page)).slice(0, 140), '| turn', s.turn, 'hp', s.health, 'stiff', s.stiff, 'tile', s.room.map[10][7], 'bag', JSON.stringify(s.bag)); };
  const bump = async () => { if (pc) await keys(page, 'ArrowLeft'); else await tap(page, 173, 470); };
  if (pc) await keys(page, 'i'); else { await page.locator('#bag-button').tap(); await page.waitForTimeout(300); }
  await shot(page, `${OUT}s2-${kind}-0bag.png`);
  if (pc) await keys(page, 'c'); else await tap(page, 237, 864); await log('SLEEP in bag'); await shot(page, `${OUT}s2-${kind}-1sleepask.png`);
  await keys(page, 'Escape'); await log('esc');
  if (pc) await keys(page, 'i Enter'); else { await page.locator('#bag-button').tap(); await page.waitForTimeout(300); await tap(page, 325, 864); }
  await log('SET DOWN'); await bump(); await log('placed left'); await shot(page, `${OUT}s2-${kind}-2laid.png`);
  console.log(kind, 'moon visible', await page.locator('#sleep-button').isVisible());
  await bump(); await log('bump bedroll at night'); await shot(page, `${OUT}s2-${kind}-3ask.png`);
  if (pc) await keys(page, 'ArrowLeft Enter'); else await tap(page, 167, 492); await page.waitForTimeout(1200); await log('Yes'); await shot(page, `${OUT}s2-${kind}-4woke.png`);
  await bump(); await log('bump bedroll by day'); await shot(page, `${OUT}s2-${kind}-5rollup.png`);
  if (pc) await keys(page, 'ArrowLeft Enter'); else await tap(page, 167, 492); await log('Yes roll up');
  if (pc) await keys(page, 'i ArrowRight c'); else { await page.locator('#bag-button').tap(); await page.waitForTimeout(300); await tap(page, 138, 186); await tap(page, 237, 864); } await log('SLEEP by day'); await shot(page, `${OUT}s2-${kind}-6daysleep.png`);
});
