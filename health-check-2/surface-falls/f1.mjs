// falls: node f1.mjs <mode> <where> <cause> <wake> <kind> [pick: same|other|esc]
import { serve, open, shot, keys, line, readSave, inject, tap, core } from '../lib.mjs';
import { st, brief, showMap, path } from './h.mjs';
import { build, SEED } from './build.mjs';
const [mode, where, cause, wake, kind, pick = 'same'] = process.argv.slice(2);
const tag = `f-${mode}-${where}-${cause}-${wake}-${kind}`;
const prof = await core('profile');
const { state, notes } = build(mode, where, cause, wake);
const profile = { records: { deepest: 3, beaten: 5, falls: 2, found: 4, steps: 100, poured: 1, torches: 0 }, glints: 9, bestiary: { rat: { met: 3, beaten: 2 } }, played: 500 };
const s = await serve();
const { browser, page, errors } = await open(s.url, kind, await inject(state, { profile, settings: process.env.SEEDSET ? { seed: +process.env.SEEDSET } : null }));
const profs = async () => prof.unpackProfiles(JSON.parse(await page.evaluate(() => localStorage.getItem('gloamdeep-profiles'))));
const p0 = (await profs()).slots[0];
await keys(page, 'Enter Enter'); await page.waitForTimeout(700);
const before = await st(page);
console.log(tag, 'BEFORE', brief(before), 'boon', before.boon, 'glow', before.glow, 'poisoned', before.poisoned, 'worn', JSON.stringify(before.worn), 'xp', before.xp, 'seed', before.seed, 'found', before.found.length, 'notes', JSON.stringify(notes));
await shot(page, `out/${tag}-0-before.png`);
await page.keyboard.press('Space');
await page.waitForTimeout(350); await shot(page, `out/${tag}-1-fall.png`); console.log(tag, 'line at fall+350:', await line(page));
await page.waitForTimeout(600); await shot(page, `out/${tag}-2-dark.png`);
await page.waitForTimeout(900); await shot(page, `out/${tag}-3-later.png`); console.log(tag, 'line at +1850:', await line(page));
// keys during the fall are not taken (D-234)? checked separately
if (mode === 'hardcore') {
  const savedAtOnce = await st(page);
  console.log(tag, 'ENDED page; saved at once:', brief(savedAtOnce), 'seed', savedAtOnce.seed, 'line', JSON.stringify(savedAtOnce.line));
  if (pick === 'esc') { await keys(page, 'Escape', 600); await shot(page, `out/${tag}-4-title.png`); await keys(page, 'Enter', 900); }
  else if (kind === 'phone') { await tap(page, 206, pick === 'same' ? +process.env.Y1 || 577 : +process.env.Y2 || 609, 400); }
  else await keys(page, pick === 'same' ? 'Enter' : 'ArrowDown Enter', 300);
  await page.waitForTimeout(300); await shot(page, `out/${tag}-5-opening.png`);
}
await page.waitForTimeout(1500);
await shot(page, `out/${tag}-6-awake.png`);
const a = await st(page), p1 = (await profs()).slots[0];
console.log(tag, 'AFTER', brief(a), 'boon', a.boon, 'glow', a.glow, 'poisoned', a.poisoned, 'worn', JSON.stringify(a.worn), 'xp', a.xp, 'seed', a.seed, 'found', a.found.length, 'grown', JSON.stringify(a.grown), 'bed', JSON.stringify(a.bed), 'line', await line(page), '| start', JSON.stringify(a.start), 'lit', a.lit);
console.log(tag, 'lostbag items anywhere:', JSON.stringify([a.items, ...Object.values(a.elsewhere).map((p) => p.items)].flat().filter((i) => i.id === 'lostbag')));
console.log(tag, 'seen kept (rooms with memory):', Object.entries({ [a.place]: { seen: a.seen }, ...a.elsewhere }).filter(([, p]) => p.seen && Array.prototype.some.call(p.seen, Boolean)).map(([id]) => id).join(' '), '| before:', Object.entries({ [before.place]: { seen: before.seen }, ...before.elsewhere }).filter(([, p]) => p.seen && Array.prototype.some.call(p.seen, Boolean)).map(([id]) => id).join(' '));
console.log(tag, 'PROFILE before', JSON.stringify(p0.records), 'glints', p0.glints, '| after', JSON.stringify(p1.records), 'glints', p1.glints, 'bestiary', JSON.stringify(p1.bestiary), 'goals', JSON.stringify(p1.goals));
// play on 20 turns
const KEYS = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Space'];
let t0 = a.turn, n = 0;
for (let i = 0; i < 60 && n < 20; i++) {
  const c = await st(page); n = c.turn - t0;
  await keys(page, KEYS[(i * 7 + (i >> 2)) % 5], 180);
  if (await page.evaluate(() => false)) break;
}
const z = await st(page);
console.log(tag, 'PLAYED ON', z.turn - t0, 'turns:', 'seed', z.seed, brief(z), 'line', await line(page), 'errors', JSON.stringify(errors));
await shot(page, `out/${tag}-7-played-on.png`);
if (kind === 'phone') await page.tap('#bag-button'); else await keys(page, 'i'); await page.waitForTimeout(400);
await shot(page, `out/${tag}-8-bag.png`);
await keys(page, 'Escape', 300);
console.log(tag, 'final errors', JSON.stringify(errors));
await browser.close(); s.close();
