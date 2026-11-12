import { core, serve, open, shot, keys, inject, line, readSave } from '../lib.mjs';
const turn = await core('turn'), stairs = await core('stairs'), mouth = await core('mouth');
const seed = 4127; let st = turn.newJourney(seed, 'normal'); const sh = mouth.stoneHome(seed);
const there = stairs.fresh(sh, seed);
let plate; there.room.map.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === 'Z') plate = { x, y }; }));
st = stairs.arrive(st, sh, there, { x: plate.x, y: plate.y + 1 });
console.log('plate', plate, st.place);
const s = await serve();
for (const kind of ['phone', 'pc']) {
  const { browser, page, errors } = await open(s.url, kind, await inject(st));
  await keys(page, 'Enter Enter'); await keys(page, 'ArrowUp', 600); console.log(await line(page));
  await keys(page, 'ArrowDown ArrowUp', 600); await shot(page, `out/${kind}-boons.png`);
  console.log(kind, await line(page), errors);
  await keys(page, 'Enter', 600); await shot(page, `out/${kind}-boons2.png`); console.log((await readSave(page)).state.boon);
  await browser.close();
}
s.close();
