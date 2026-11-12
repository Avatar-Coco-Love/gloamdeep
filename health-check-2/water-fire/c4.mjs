import { run, turn, stairs, base, shot, keys, line, sv, tap, OUT } from './mk.mjs';
// own campfire: open grass at home-ish room woods:2,2 hero (10,8); stone+wood for campfire and mortar
const st = base({ hero: { x: 10, y: 8 }, turn: 20, enemies: [], health: 3, oil: 0.5, bag: [{ id: 'stone', n: 7 }, { id: 'wood', n: 4 }], known: ['stone', 'wood'] });
await run(['phone', 'pc'], st, async (page, kind) => {
  await keys(page, 'i'); await shot(page, `${OUT}c4-${kind}-bag.png`); console.log(kind, await line(page));
  await keys(page, 'Tab'); await shot(page, `${OUT}c4-${kind}-make.png`); console.log(kind, await line(page));
  for (let i = 0; i < 5; i++) { await keys(page, 'ArrowRight'); console.log(kind, i, await line(page)); await shot(page, `${OUT}c4-${kind}-make${i}.png`); }
});
