// bump every spawned solid tile; step on the others
import { start, wrench, tab, btn, head, readout, tapTile, sv, brief, freeTiles, tileId, shot, keys, said, OUT, core, tap, rectOf, pickId, panelOpen } from './devlib.mjs';
const turn = await core('turn'), stairs = await core('stairs'), reg = await core('registry');
const kind = process.argv[2] || 'phone';
const only = process.argv[3] ? process.argv[3].split(',') : null;
const st0 = { ...stairs.goToDepth(turn.newJourney(4127, 'gentle'), 3), god: true, lit: true, hero: { x: 5, y: 5 } };
const { page, errors, done } = await start(kind, st0, { jumped: true, dev: { grid: false, coords: true, noLight: false, reveal: false, revealMap: false, stats: true, open: ['spawn'] } });
const o = (n) => `${OUT}devC-${kind}-${n}.png`;
let k = await sv(page); console.log(kind, 'start', brief(k));
await wrench(page);
const tiles = reg.ALL.filter((e) => e.kind === 'tile' && !['wall', 'floor', 'water'].includes(e.id) && (!only || only.includes(e.id)));
let nerr = 0;
for (const e of tiles) {
  k = await sv(page); const h = k.state.hero;
  if (k.state.place !== 'depth3' || h.x !== 5 || h.y !== 5) { console.log(kind, '  (hero moved to', k.state.place, h.x, h.y, '- stopping; rerun for the rest)'); break; }
  await pickId(page, e.id); await tapTile(page, 5, 4, 250); await pickId(page, e.id); // place, drop the pick
  const placed = tileId((await sv(page)).state, 5, 4);
  await tapTile(page, 5, 4, 600); // bump or step
  const k2 = await sv(page), s = k2.state, line = await said(page);
  await shot(page, o(e.id));
  console.log(kind, `${e.id}${e.solid ? ' (solid)' : ''}: placed ${placed} | after tap: turn ${k.state.turn}->${s.turn} place ${s.place} hero ${s.hero.x},${s.hero.y} tile now ${s.place === 'depth3' ? tileId(s, 5, 4) : '-'} | said: ${line.slice(0, 110)} | new errors ${errors.length - nerr}`);
  if (errors.length > nerr) console.log('   ERR', errors.slice(nerr).join(' || ').slice(0, 500)); nerr = errors.length;
  await page.keyboard.press('Escape'); await page.waitForTimeout(250); const after = await said(page); if (/paus/i.test(after)) { await page.keyboard.press('Escape'); await page.waitForTimeout(250); }
  if (!(await panelOpen(page))) await wrench(page);
  const s3 = (await sv(page)).state;
  if (s3.place === 'depth3' && (s3.hero.x !== 5 || s3.hero.y !== 5) && s3.hero.x === 5 && s3.hero.y === 4) { await tapTile(page, 5, 5, 600); } // step back
  // put plain floor back
  if (s3.place === 'depth3') { await pickId(page, 'floor'); await tapTile(page, 5, 4, 200); await pickId(page, 'floor'); }
}
console.log(kind, 'end', brief(await sv(page)), 'errors', errors.length);
await done();
