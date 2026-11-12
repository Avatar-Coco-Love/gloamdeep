import { start, wrench, tab, btn, head, readout, tapTile, sv, brief, freeTiles, tileId, shot, keys, said, OUT, core, tap, rectOf } from './devlib.mjs';
const turn = await core('turn');
const kind = process.argv[2] || 'phone';
const { page, errors, done } = await start(kind, turn.newJourney(4127, 'gentle'), { dev: { grid: false, coords: true, noLight: false, reveal: false, revealMap: false, stats: true, open: ['room'] } });
const o = (n) => `${OUT}devB1-${kind}-${n}.png`;
const log = async (what) => { const k = await sv(page); console.log(kind, what, '|', brief(k), '|', (await said(page)).slice(0, 60)); return k; };
let k = await log('start');
await wrench(page);
console.log(kind, 'open section from storage:', await head(page), '| readout:', await readout(page));
// depth picker
const depth = () => page.evaluate(() => document.querySelector('.dev-depth').textContent);
for (let i = 0; i < 3; i++) await btn(page, '-', 60); console.log(kind, 'after - x3 from 0:', await depth());
for (let i = 0; i < 3; i++) await btn(page, '+', 60); console.log(kind, 'after + x3:', await depth());
await btn(page, 'Go', 500); k = await log('Go 3'); console.log(kind, 'hero on', tileId(k.state, k.state.hero.x, k.state.hero.y), 'picker', await depth()); await shot(page, o('1depth3'));
for (let i = 0; i < 100; i++) await btn(page, '+', 15); console.log(kind, 'after + x100:', await depth());
await btn(page, 'Go', 500); k = await log('Go 99'); console.log(kind, 'hero on', tileId(k.state, k.state.hero.x, k.state.hero.y)); await shot(page, o('2depth99'));
await btn(page, 'Go', 300); await log('Go 99 again');
for (let i = 0; i < 96; i++) await btn(page, '-', 15); console.log(kind, 'picker:', await depth());
await btn(page, 'Go', 500); k = await log('Go 3 again (kept as left?)');
// time
await btn(page, '+10', 300); k = await log('+10'); console.log(kind, 'readout', (await readout(page)).slice(0, 60));
await btn(page, '+50', 300); k = await log('+50');
// Forget and Reset
await btn(page, 'Forget', 400); k = await log('Forget');
await page.waitForTimeout(600); await log('a moment later');
// oil
await tab(page, 'Oil'); await shot(page, o('3oil'));
await btn(page, 'Empty', 400); k = await log('Empty'); await shot(page, o('4empty'));
await btn(page, 'Refill', 400); k = await log('Refill');
const sl = await rectOf(page, '.dev-slider input'); await tap(page, sl.x + sl.w * 0.37, sl.cy, 400); k = await log('slider tapped at 37%'); console.log(kind, 'amount', await page.evaluate(() => document.querySelector('.dev-amount').textContent));
await btn(page, 'Endless oil', 300); k = await log('Endless on'); console.log(kind, 'endless flag', k.state.endless);
await tab(page, 'Hero'); await btn(page, 'God mode', 300); k = await log('God on'); console.log(kind, 'god flag', k.state.god);
await btn(page, 'Refill hearts', 300); await log('Refill hearts at full');
await shot(page, o('5hero'));
await wrench(page);
// walk 4 turns with endless oil
if (kind === 'pc') await keys(page, 'Space Space Space Space', 250); else { for (let i = 0; i < 4; i++) { const h = (await sv(page)).state; const f = freeTiles(h)[0]; await tapTile(page, f.x, f.y, 450); } }
k = await log('4 turns, endless oil');
await page.reload(); await page.waitForTimeout(600);
const { slotTap } = await import('./h.mjs'); await slotTap(page, 0); await keys(page, 'Enter', 600);
k = await log('after reload'); console.log(kind, 'god', k.state.god, 'endless', k.state.endless);
await wrench(page); console.log(kind, 'section after reload:', await head(page), '| god pressed', await page.evaluate(() => [...document.querySelectorAll('.dev-switch[aria-pressed=true]')].map((b) => b.textContent.trim()).join(',')));
await shot(page, o('6reloaded'));
console.log(kind, 'errors', errors);
await done();
