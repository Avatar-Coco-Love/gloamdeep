import { run, turn, stairs, base, shot, keys, line, sv, tap, OUT } from './mk.mjs';
const st = { ...stairs.goToPlace(base(), 'woods:0,0'), hero: { x: 6, y: 16 }, health: 2, turn: 20, enemies: [], bag: [{ id: 'wood', n: 2 }] };
await run(['phone', 'pc'], st, async (page, kind) => {
  await shot(page, `${OUT}c1-${kind}-0.png`);
  if (kind === 'pc') await keys(page, 'ArrowLeft'); else await tap(page, Number(process.argv[2] || 0), Number(process.argv[3] || 0));
  console.log(kind, 'bump:', await line(page));
  await shot(page, `${OUT}c1-${kind}-1card.png`);
});
