import { run, shot, keys, line, sv, tap, OUT } from './mk.mjs';
import { mortarState } from './m1.mjs';
const boon = process.argv[2];
await run(['phone', 'pc'], mortarState({ stiff: 15, poisoned: 6, health: 5, warmed: 30, glow: 60, slowburn: 45, mending: 30, ward: 15, spitproof: 5, shade: 1, boon }), async (page, kind) => {
  await shot(page, `${OUT}m3-${kind}-marks.png`);
  const xs = process.argv.slice(3).map(Number);
  for (const x of xs) { const X = kind === 'pc' ? x * 2.5 : x, Y = kind === 'pc' ? 90 * 2.5 : 90; if (kind === 'pc') await page.mouse.move(X, Y); else await tap(page, X, Y); await page.waitForTimeout(200); console.log(kind, 'mark at', x, '->', await line(page)); }
  await shot(page, `${OUT}m3-${kind}-marks2.png`);
});
