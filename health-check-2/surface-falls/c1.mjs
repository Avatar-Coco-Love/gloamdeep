// miners' camp: node c1.mjs <kind> <variant: plain|bagpick|toolpick|full|clawpick>
import { serve, open, shot, keys, line, inject, tap, core } from '../lib.mjs';
import { turn, stairs, st, brief } from './h.mjs';
const bagM = await core('bag');
const [kind, variant = 'plain'] = process.argv.slice(2), tag = `c-${variant}-${kind}`;
let j = stairs.goToPlace(turn.newJourney(4127, 'normal'), 'woods:2,0');
j = { ...j, hero: { x: 4, y: 10 }, enemies: [] };
if (variant === 'bagpick') j = { ...j, bag: bagM.bagAdd(j.bag, 'pick') };
if (variant === 'toolpick') j = { ...j, tool: 'pick' };
if (variant === 'clawpick') j = { ...j, tool: 'moleClawPick' };
if (variant === 'full') for (const id of ['wood', 'stone', 'flask', 'herb', 'oilcap', 'duskstar']) j = { ...j, bag: bagM.bagAdd(j.bag, id) };
const s = await serve();
const { browser, page, errors } = await open(s.url, kind, await inject(j));
const log = async (what) => { const c = await st(page); console.log(tag, what, '| turn', c.turn, 'bag', JSON.stringify(c.bag.map((b) => b.id)), 'tool', c.tool, '| line:', await line(page), '| rows 8-9:', c.room.map[8].slice(2, 7), c.room.map[9].slice(2, 7)); };
await keys(page, 'Enter Enter'); await page.waitForTimeout(700);
await shot(page, `out/${tag}-0.png`);
await keys(page, 'ArrowUp', 500); await log('bump from below'); await shot(page, `out/${tag}-1-card.png`);
await keys(page, 'Enter', 500); await log('Enter on the picked line (No?)'); await shot(page, `out/${tag}-2-after-no.png`);
await keys(page, 'ArrowUp', 500);
if (kind === 'phone' && process.env.YESXY) { const [x, y] = process.env.YESXY.split(',').map(Number); await tap(page, x, y, 500); } else await keys(page, 'ArrowUp Enter', 400);
await log('Yes'); await shot(page, `out/${tag}-3-after-yes.png`);
await keys(page, 'ArrowUp', 500); await log('bump again'); await shot(page, `out/${tag}-4-bump-again.png`);
await keys(page, 'Escape', 300);
// other sides: left of it (2,8) → right; above (4,7) → down; right (6,9)? is rock at 6,9, so (6,8) → left
await keys(page, 'ArrowLeft ArrowLeft ArrowUp ArrowUp'); await keys(page, 'ArrowRight', 500); await log('bump from the left'); await keys(page, 'Escape', 300);
console.log(tag, 'errors', JSON.stringify(errors).slice(0, 200));
await browser.close(); s.close();
