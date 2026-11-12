import { run, turn, stairs, base, shot, keys, line, sv, tap, OUT } from './mk.mjs';
const st = { ...stairs.goToPlace(base(), 'woods:0,0'), hero: { x: 6, y: 16 }, health: 2, turn: 20, enemies: [], bag: [{ id: 'wood', n: 2 }], oil: 0.5 };
const fire = (s) => s.room.map[16][5];
await run(['phone', 'pc'], st, async (page, kind) => {
  const pc = kind === 'pc';
  const bump = async () => { if (pc) await keys(page, 'ArrowLeft'); else await tap(page, 173, 662); };
  const log = async (what) => { const s = await sv(page); console.log(kind, what, '|', await line(page), '| hp', s.health, 'warmed', s.warmed, 'stiff', s.stiff, 'fire', fire(s), 'turn', s.turn, 'oil', s.oil.toFixed(3), 'bag', JSON.stringify(s.bag)); };
  // 1 blazing: add wood must be dim
  await bump(); if (pc) await keys(page, 'ArrowRight Enter'); else await tap(page, 258, 492); await log('blazing: Add wood (dim)'); await shot(page, `${OUT}c3-${kind}-1dimwood.png`);
  // sit
  if (pc) await keys(page, 'ArrowLeft Enter'); else await tap(page, 148, 492); await log('blazing: Sit'); await page.waitForTimeout(500); await shot(page, `${OUT}c3-${kind}-2sat.png`);
  // 2 embers: bump, card
  await bump(); await shot(page, `${OUT}c3-${kind}-3embers.png`); console.log(kind, 'embers card:', await line(page));
  // add wood -> blazing
  if (pc) await keys(page, 'ArrowRight Enter'); else await tap(page, 258, 492); await log('embers: Add wood'); await shot(page, `${OUT}c3-${kind}-4fed.png`);
  // sit again (blazing) hp 4->5 (cap), embers
  await bump(); if (pc) await keys(page, 'Enter'); else await tap(page, 148, 492); await log('blazing: Sit 2');
  // sit on embers: full health, warmed 60 > 30, not stiff: Sit should be grey
  await bump(); await shot(page, `${OUT}c3-${kind}-5greysit.png`); console.log(kind, 'embers full card:', await line(page));
  if (pc) await keys(page, 'ArrowLeft Enter'); else await tap(page, 148, 492); await log('embers: Sit (grey)');
  await keys(page, 'Escape');
});
