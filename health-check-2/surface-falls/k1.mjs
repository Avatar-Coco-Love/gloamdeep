// input during the fall (D-234: no taps or keys are taken until the hero wakes): node k1.mjs <kind> <mode> <input>
import { serve, open, shot, keys, line, inject, tap } from '../lib.mjs';
import { st, brief } from './h.mjs';
import { build } from './build.mjs';
const [kind, mode, input] = process.argv.slice(2), tag = `k-${mode}-${kind}-${input.replace('#', '')}`;
const { state } = build(mode, 'surface', 'bite', 'start');
const s = await serve();
const { browser, page, errors } = await open(s.url, kind, await inject(state));
await keys(page, 'Enter Enter'); await page.waitForTimeout(700);
await page.keyboard.press('Space'); await page.waitForTimeout(250);
const vis = async (sel) => page.evaluate((q) => { const e = document.querySelector(q); if (!e) return 'none'; const r = e.getBoundingClientRect(), c = getComputedStyle(e); return `${c.display}/${c.visibility} ${Math.round(r.width)}x${Math.round(r.height)} disabled=${e.disabled}`; }, sel);
console.log(tag, 'during fall: buttons', 'bag', await vis('#bag-button'), '| pause', await vis('#pause-button'), '| map', await vis('#map-button'), '| lantern', await vis('#lantern-button'), '| quick', await vis('#quick-slot'));
if (input.startsWith('#')) { try { await page.locator(input).tap({ timeout: 800, force: false }); } catch (e) { console.log(tag, 'tap refused:', e.message.split('\n')[0]); } }
else await page.keyboard.press(input);
await page.waitForTimeout(200); await shot(page, `out/${tag}-1-during.png`);
console.log(tag, 'line during:', (await line(page)).slice(0, 120));
await page.waitForTimeout(2600); await shot(page, `out/${tag}-2-after.png`);
const a = await st(page);
console.log(tag, 'after:', brief(a), '| lit', a.lit, '| line:', (await line(page)).slice(0, 120), '| errors', errors.filter((e) => !e.includes('willReadFrequently')).length);
await browser.close(); s.close();
