import { run, base, shot, keys, line, sv, tap, OUT } from './mk.mjs';
// full flow: cast, wait until nibble, bite, pull, strike in zone. Then miss, then timeout.
const st = base({ hero: { x: 10, y: 3 }, tool: 'rod', turn: 20 });
const mode = process.argv[2] || 'hit';
await run(['phone', 'pc'], st, async (page, kind) => {
  const bump = async () => { if (kind === 'pc') await keys(page, 'ArrowLeft'); else await tap(page, 173, 245, 250); };
  const quick = async () => { if (kind === 'pc') await keys(page, 'ArrowLeft'); else { await page.locator('#quick-slot').tap(); await page.waitForTimeout(250); } };
  await bump(); console.log(kind, 'cast:', await line(page));
  let s, n = 0, shotN = false;
  for (; n < 60; n++) { await quick(); s = await sv(page); const l = await line(page);
    if (s.float?.nibble && !shotN) { shotN = true; console.log(kind, 'nibble at wait', n, l, await page.locator('#quick-slot').textContent()); await shot(page, `${OUT}f2-${kind}-nibble.png`); }
    if (s.float?.bite) break; }
  console.log(kind, 'bite after waits', n, await line(page), 'quick:', await page.locator('#quick-slot').textContent(), 'turn', s.turn);
  await shot(page, `${OUT}f2-${kind}-bite.png`);
  const t0 = Date.now();
  if (kind === 'pc') await page.keyboard.press('ArrowLeft'); else await page.locator('#quick-slot').tap();
  await page.waitForTimeout(400);
  s = await sv(page); const zone = s.float.strike; console.log(kind, 'pulled, zone', zone, 'turn', s.turn, 'line', await line(page));
  await shot(page, `${OUT}f2-${kind}-card.png`); const tShot = Date.now() - t0;
  console.log(kind, 'shot at ms after pull', tShot);
  if (mode === 'timeout') { await page.waitForTimeout(3300); }
  else {
    const D = Number(process.argv[3] || 200);
    const target = mode === 'hit' ? zone + 0.125 : (zone > 0.4 ? zone - 0.3 : zone + 0.55);
    const at = t0 + D + 2000 + target * 1000; // third pass, left to right
    await page.waitForTimeout(Math.max(0, at - Date.now()));
    if (kind === 'pc') await page.keyboard.press('Space'); else await page.touchscreen.tap(200, 700);
    await page.waitForTimeout(400);
  }
  s = await sv(page);
  console.log(kind, mode, '->', await line(page), 'float', JSON.stringify(s.float), 'bag', JSON.stringify(s.bag), 'turn', s.turn);
  await shot(page, `${OUT}f2-${kind}-${mode}.png`);
});
