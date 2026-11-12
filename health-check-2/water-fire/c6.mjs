import { run, turn, stairs, base, shot, keys, line, sv, tap, OUT } from './mk.mjs';
const st = base({ hero: { x: 10, y: 8 }, turn: 20, enemies: [], health: 3, oil: 0.5, bag: [{ id: 'stone', n: 7 }, { id: 'wood', n: 4 }], known: ['stone', 'wood'] });
await run(['phone'], st, async (page, kind) => {
  const log = async (what) => { const s = await sv(page); console.log(kind, what, '|', (await line(page)).slice(0, 130), '| tile', s.room.map[8], 'turn', s.turn, 'bag', JSON.stringify(s.bag)); };
  await shot(page, `${OUT}c6-0.png`);
  await page.locator('#bag-button').tap(); await page.waitForTimeout(300); await shot(page, `${OUT}c6-1bag.png`);
  if (process.argv[2]) { const pts = process.argv.slice(2).map((p) => p.split(',').map(Number)); let i = 2; for (const [x, y] of pts) { await tap(page, x, y, 400); await log(`tap ${x},${y}`); await shot(page, `${OUT}c6-${i++}.png`); } }
});
