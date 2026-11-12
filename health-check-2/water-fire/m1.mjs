import { run, turn, stairs, base, shot, keys, line, sv, tap, core, OUT } from './mk.mjs';
const room = await core('room'), reg = await core('registry');
const h = stairs.goToPlace(base(), 'woods');
const bagAll = [{ id: 'duskstar', n: 3 }, { id: 'wispGlass', n: 1 }, { id: 'tickShell', n: 2 }, { id: 'oilcap', n: 1 }, { id: 'mimicLeaf', n: 2 }, { id: 'herb', n: 3 }, { id: 'centipedeLeg', n: 2 }, { id: 'grubSkin', n: 2 }, { id: 'lurkerClaw', n: 2 }];
export const mortarState = (over = {}) => ({ ...h, room: room.withTile(h.room, 7, 10, reg.get('mortarStand')), turn: 20, health: 2, oil: 0.5, bagSlots: 12, bag: bagAll, known: bagAll.map((s) => s.id), items: h.items.filter((it) => !(it.x === 8 && it.y === 10)), ...over });
if (process.argv[1].endsWith('m1.mjs')) {
  const which = process.argv[2] || 'all';
  const st = which === 'none' ? mortarState({ bag: [], known: [] }) : which === 'one' ? mortarState({ bag: [{ id: 'duskstar', n: 1 }, { id: 'wispGlass', n: 1 }], known: ['duskstar', 'wispGlass'] }) : mortarState();
  await run(['phone', 'pc'], st, async (page, kind) => {
    const pc = kind === 'pc';
    await shot(page, `${OUT}m1-${which}-${kind}-0.png`);
    if (pc) await keys(page, 'ArrowLeft'); else await tap(page, 173, Number(process.argv[3] || 470));
    console.log(kind, which, 'card:', await line(page)); await shot(page, `${OUT}m1-${which}-${kind}-1card.png`);
    if (which !== 'all') { await keys(page, 'Enter'); const s = await sv(page); console.log(kind, 'Enter:', await line(page), JSON.stringify(s.bag)); await shot(page, `${OUT}m1-${which}-${kind}-2.png`); return; }
    for (let i = 0; i < 6; i++) { if (i) await keys(page, 'ArrowRight'); console.log(kind, 'slot', i, await line(page)); await shot(page, `${OUT}m1-all-${kind}-slot${i}.png`); }
  });
}
