import { run, turn, stairs, base, shot, keys, line, sv, tap, core, OUT } from './mk.mjs';
const room = await core('room'), reg = await core('registry');
const b0 = base({ hero: { x: 10, y: 8 }, turn: 20, enemies: [], health: 1 });
const mk = (over) => ({ ...b0, room: room.withTile(b0.room, 9, 8, reg.get('ownAshes')), ...over });
const tileOf = (s) => s.room.map[8][9];
const BTN = { yes: [106, 492], take: [206, 492], no: [306, 492], sit: [148, 492], wood: [258, 492] };
async function play(tag, st, steps) {
  await run(['phone', 'pc'], st, async (page, kind) => {
    const pc = kind === 'pc';
    const bump = async () => { if (pc) await keys(page, 'ArrowLeft'); else await tap(page, 173, 406); };
    const press = async (b, idx) => { if (pc) { await keys(page, 'ArrowLeft ArrowLeft ' + 'ArrowRight '.repeat(idx) + 'Enter'); } else await tap(page, ...BTN[b]); };
    let n = 0;
    for (const [b, idx, shotIt] of steps) {
      await bump(); const card = await line(page); if (shotIt) await shot(page, `${OUT}c7-${tag}-${kind}-${n}.png`);
      await press(b, idx); await page.waitForTimeout(200); const s = await sv(page);
      console.log(kind, tag, n++, `[${card}] -> ${b}:`, await line(page), '| hp', s.health, 'warmed', s.warmed, 'tile', tileOf(s), 'turn', s.turn, 'oil', s.oil.toFixed(4), 'bag', JSON.stringify(s.bag));
      await keys(page, 'Escape'); if ((await line(page)).startsWith('Paused')) await keys(page, 'Escape');
    }
  });
}
await play('carry', mk({ oil: 0.5, bag: [{ id: 'wood', n: 3 }, { id: 'bagCampfire', n: 1 }] }), [['take', 1, true], ['yes', 0], ['wood', 1, true], ['sit', 0, true], ['sit', 0], ['take', 1]]);
await play('nooil', mk({ oil: 0, bag: [] }), [['yes', 0, true], ['take', 1]]);
