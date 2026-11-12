import { run, turn, stairs, shot, keys, line, sv, tap, OUT } from './mk.mjs';
const hook = process.argv[2] === 'hook', mode = process.argv[3] || 'hit', tx = Number(process.argv[4] || 0), ty = Number(process.argv[5] || 0);
let st = stairs.goToDepth(turn.newJourney(4128, 'gentle'), 2);
st = { ...st, hero: { x: 4, y: 5 }, tool: 'rod', lit: true, enemies: [], ...(hook && { parts: { hook: 'boneHook' } }) };
const tag = `f3-${hook ? 'hook' : 'plain'}`;
await run(['phone', 'pc'], st, async (page, kind) => {
  await shot(page, `${OUT}${tag}-${kind}-0.png`);
  if (kind === 'phone' && !tx) return;
  const quick = async () => { if (kind === 'pc') await keys(page, 'ArrowLeft'); else { await page.locator('#quick-slot').tap(); await page.waitForTimeout(250); } };
  if (kind === 'pc') await keys(page, 'ArrowLeft'); else await tap(page, tx, ty, 250);
  console.log(kind, 'cast:', await line(page));
  let s, n = 0;
  for (; n < 80; n++) { await quick(); s = await sv(page); if (s.float?.bite) break; if (!s.float) { console.log('float gone', await line(page)); return; } }
  console.log(kind, 'bite after', n, await line(page));
  await shot(page, `${OUT}${tag}-${kind}-bite.png`);
  const t0 = Date.now();
  if (kind === 'pc') await page.keyboard.press('ArrowLeft'); else await page.locator('#quick-slot').tap();
  await page.waitForTimeout(400);
  s = await sv(page); const zone = s.float.strike;
  await shot(page, `${OUT}${tag}-${kind}-card.png`);
  const w = (hook ? 0.3 : 0.2);
  const target = mode === 'hit' ? zone + w / 2 : mode === 'edge' ? zone + w + 0.06 : zone + w / 2;
  await page.waitForTimeout(Math.max(0, t0 + 60 + 2000 + target * 1000 - Date.now()));
  if (kind === 'pc') await page.keyboard.press('Enter'); else await page.touchscreen.tap(200, 200);
  await page.waitForTimeout(400);
  s = await sv(page);
  console.log(kind, tag, mode, 'zone', zone.toFixed(3), '->', await line(page), 'bag', JSON.stringify(s.bag), 'oil', s.oil.toFixed(3));
  await shot(page, `${OUT}${tag}-${kind}-end.png`);
});
