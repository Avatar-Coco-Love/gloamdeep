import { serve, open, shot, keys, line, readSave, inject, tap } from '../lib.mjs';
import { allWoken, show, start, travelM } from './prep.mjs';
const s = await serve();
const base = allWoken(1, [2, 5]);
const h = base.hero;
const cases = { adjacentAwake: [{ id: 'rat', x: h.x + 1, y: h.y, health: 2, chasing: false }], cornerAwake: [{ id: 'rat', x: h.x + 1, y: h.y + 1, health: 2 }], asleepAdjacent: [{ id: 'rat', x: h.x + 1, y: h.y, health: 2, asleep: true }], chasingFar: [{ id: 'rat', x: h.x, y: h.y + 1 + 0, health: 2, chasing: true }] };
for (const kind of ['pc', 'phone']) for (const [name, enemies] of Object.entries(cases)) {
  const { browser, page, errors } = await open(s.url, kind, await inject({ ...base, enemies }));
  await start(page, kind);
  if (kind === 'pc') await keys(page, 'Space', 500); else await tap(page, 206, 457, 600);
  const k = await readSave(page);
  console.log(kind, name, '|', (await line(page)).slice(0, 60), '| turn', k.state.turn, 'hp', k.state.health, JSON.stringify(k.state.enemies.map((e) => [e.x, e.y, e.asleep, e.chasing])));
  if (name === 'adjacentAwake') await shot(page, `out/w5-${kind}-${name}.png`);
  await browser.close();
}
s.close();
