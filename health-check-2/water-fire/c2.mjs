import { run, turn, stairs, base, shot, keys, line, sv, tap, OUT } from './mk.mjs';
const st = { ...stairs.goToPlace(base(), 'woods:0,0'), hero: { x: 6, y: 16 }, health: 2, turn: 20, enemies: [], bag: [{ id: 'wood', n: 2 }] };
await run(['pc'], st, async (page, kind) => {
  await keys(page, 'ArrowLeft'); let s = await sv(page); console.log('after bump save line', JSON.stringify(s.line), 'turn', s.turn);
  await keys(page, 'Escape'); console.log('after esc:', JSON.stringify(await line(page))); await shot(page, `${OUT}c2-${kind}-esc.png`);
  s = await sv(page); console.log('save line', JSON.stringify(s.line));
});
