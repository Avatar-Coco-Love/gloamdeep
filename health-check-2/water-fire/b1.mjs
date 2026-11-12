import { run, base, shot, keys, line, sv, tap, OUT } from './mk.mjs';
const bag = [{ id: 'pondMinnow', n: 3 }, { id: 'blindCavefish', n: 2 }, { id: 'rod', n: 1 }, { id: 'boneHook', n: 1 }, { id: 'mortar', n: 1 }, { id: 'bagCampfire', n: 1 }, { id: 'furBedroll', n: 1 },
  { id: 'glowDraught', n: 2 }, { id: 'slowburn', n: 1 }, { id: 'mendingDraught', n: 1 }, { id: 'wardDraught', n: 1 }, { id: 'spitproofDraught', n: 1 }];
const st = base({ hero: { x: 10, y: 3 }, turn: 20, bag, bagSlots: 12, health: 3, oil: 0.5 });
await run(['phone', 'pc'], st, async (page, kind) => {
  await keys(page, 'i');
  for (let i = 0; i < 12; i++) {
    await shot(page, `${OUT}b1-${kind}-slot${i}.png`);
    console.log(kind, i, await line(page));
    
    await keys(page, 'ArrowRight');
  }
});
