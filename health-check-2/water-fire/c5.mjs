import { run, turn, stairs, base, shot, keys, line, sv, tap, OUT } from './mk.mjs';
const st = base({ hero: { x: 10, y: 8 }, turn: 20, enemies: [], health: 3, oil: 0.5, bag: [{ id: 'stone', n: 7 }, { id: 'wood', n: 4 }], known: ['stone', 'wood'] });
const fireAt = (s) => s.room.map[8][9];
await run(['pc'], st, async (page, kind) => {
  const log = async (what) => { const s = await sv(page); console.log(kind, what, '|', (await line(page)).slice(0, 160), '| hp', s.health, 'warmed', s.warmed, 'tile', fireAt(s), 'turn', s.turn, 'oil', s.oil.toFixed(4), 'bag', JSON.stringify(s.bag)); };
  await keys(page, 'i Tab ArrowRight ArrowRight Enter'); await log('make campfire'); await shot(page, `${OUT}c5-${kind}-1made.png`);
  await keys(page, 'Enter'); await log('make second'); 
  await keys(page, 'Tab'); await log('bag tab'); await shot(page, `${OUT}c5-${kind}-2bag.png`);
  await keys(page, 'ArrowRight ArrowRight'); await log('choose campfire'); await shot(page, `${OUT}c5-${kind}-3chosen.png`);
  await keys(page, 'Enter'); await log('enter on campfire'); await shot(page, `${OUT}c5-${kind}-4place.png`);
  await keys(page, 'ArrowLeft'); await log('left'); await shot(page, `${OUT}c5-${kind}-5set.png`);
  await keys(page, 'Enter'); await log('enter');
  await keys(page, 'Escape'); await log('esc');
  await keys(page, 'ArrowLeft'); await log('bump ashes'); await shot(page, `${OUT}c5-${kind}-6ashes.png`);
});
