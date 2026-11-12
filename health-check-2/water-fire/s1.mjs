import { run, turn, stairs, base, shot, keys, line, sv, tap, core, OUT } from './mk.mjs';
const roll = process.argv[2] === 'roll';
const st = base({ hero: { x: 10, y: 8 }, turn: 180, enemies: [], health: 2, lit: true, oil: 0.5, glow: 40, mending: 200, bag: roll ? [{ id: 'furBedroll', n: 1 }] : [] });
const tag = roll ? 'roll' : 'bare';
await run(['phone', 'pc'], st, async (page, kind) => {
  const pc = kind === 'pc';
  await shot(page, `${OUT}s1-${tag}-${kind}-0night.png`);
  const vis = await page.locator('#sleep-button').isVisible(); const box = await page.locator('#sleep-button').boundingBox();
  console.log(kind, tag, 'moon visible', vis, JSON.stringify(box));
  if (pc) await page.locator('#sleep-button').click(); else await page.locator('#sleep-button').tap(); await page.waitForTimeout(300);
  console.log(kind, 'ask:', await line(page)); await shot(page, `${OUT}s1-${tag}-${kind}-1ask.png`);
  // No is picked: Enter should close without sleeping
  await keys(page, 'Enter'); let s = await sv(page); console.log(kind, 'Enter on No -> turn', s.turn, await line(page));
  if (pc) { await page.locator('#sleep-button').click(); await page.waitForTimeout(300); await keys(page, 'ArrowLeft Enter'); } else { await page.locator('#sleep-button').tap(); await page.waitForTimeout(300); await tap(page, Number(process.argv[3] || 148), 492); }
  await page.waitForTimeout(1500);
  s = await sv(page); console.log(kind, 'slept ->', await line(page), '| turn', s.turn, 'hp', s.health, 'stiff', s.stiff, 'oil', s.oil.toFixed(3), 'glow', s.glow, 'mending', s.mending, 'lit', s.lit, 'enemies', s.enemies.map((e) => e.id).join(','));
  await shot(page, `${OUT}s1-${tag}-${kind}-2woke.png`);
  console.log(kind, 'moon visible after', await page.locator('#sleep-button').isVisible());
});
