import { run, base, shot, keys, line, sv, OUT } from './mk.mjs';
const st = base({ hero: { x: 10, y: 3 }, tool: 'rod', turn: 20 });
await run(['phone', 'pc'], st, async (page, kind) => {
  await shot(page, `${OUT}f1-${kind}-0.png`);
  console.log(kind, 'line0:', await line(page));
  await keys(page, 'ArrowLeft'); 
  console.log(kind, 'cast:', await line(page), JSON.stringify((await sv(page)).float));
  await shot(page, `${OUT}f1-${kind}-1cast.png`);
});
