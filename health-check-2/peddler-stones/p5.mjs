import { serve, open, shot, keys, line, readSave, inject, tap } from '../lib.mjs';
import { atPeddler, show, start } from './prep.mjs';
const s = await serve();
const a = atPeddler(7); // heap to the left
console.log(a.dir, show(a.state));
const kind = 'phone';
const { browser, page, errors } = await open(s.url, kind, await inject({ ...a.state, lit: true }, { profile: { goals: {} } }));
const S = (n) => shot(page, `out/p5-${kind}-${n}.png`);
const log = async (tag) => { const k = await readSave(page); console.log(tag, '|', await line(page), '| turn', k.state.turn, 'hero', JSON.stringify(k.state.hero), 'people', JSON.stringify(k.state.people)); };
await start(page, kind); await S('a');
const [hx, hy] = (process.argv[2] || '206,457').split(',').map(Number);
for (let i = 1; i <= 3; i++) { await tap(page, hx - 32, hy, 500); await log('tap heap ' + i); }
await S('freed');
await tap(page, hx - 64, hy, 700); await log('tap peddler 2 tiles away (walk+bump?)'); await S('b');
await tap(page, hx - 64, hy, 700); await log('tap again'); await S('c');
console.log(errors.filter((e) => !e.includes('willRead') && !e.includes('Audio')));
await browser.close(); s.close();
