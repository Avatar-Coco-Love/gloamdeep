// node drive.mjs <kind> <tag> <setup>[:seed] ops...   ops: k:Key  t:x,y  c:#id  s:name  w:ms  d:dir(n)  go:x,y  line  st
import { Game, serve, line, keys, tap } from './pl.mjs';
import { setups } from './setups.mjs';
const [kind, tag, setup, ...ops] = process.argv.slice(2);
const [name, seed, arg] = setup.split(':');
const s = await serve();
const g = await Game.boot(s.url, kind, setups[name](seed ? +seed : undefined, arg));
for (const op of ops) {
  const [o, v] = [op.slice(0, op.indexOf(':') < 0 ? op.length : op.indexOf(':')), op.slice(op.indexOf(':') + 1)];
  if (o === 'k') await keys(g.page, v.replace(/,/g, ' '), 250);
  else if (o === 't') { const [x, y] = v.split(',').map(Number); await tap(g.page, x, y, 350); }
  else if (o === 'c') { if (kind === 'pc') await g.page.locator(v).click(); else await g.page.locator(v).tap(); await g.page.waitForTimeout(350); }
  else if (o === 's') await g.shot(tag + '-' + v);
  else if (o === 'w') await g.page.waitForTimeout(+v);
  else if (o === 'd') { const [dir, n] = v.split(','); for (let i = 0; i < (+n || 1); i++) await g.step(dir, 220); }
  else if (o === 'go') { const [x, y] = v.split(',').map(Number); console.log('go', await g.walkTo({ x, y })); }
  else if (o === 'gob') { const [x, y] = v.split(',').map(Number); console.log('gob', await g.walkTo({ x, y }, { stopBeside: true })); }
  else if (o === 'line') console.log('line:', await line(g.page));
  else if (o === 'st') { await g.read(); console.log(g.s.room.map.join('\n')); console.log('hero', JSON.stringify(g.s.hero), 'hp', g.s.health, 'oil', g.s.oil, 't', g.s.turn, g.s.place, '\nfoes', JSON.stringify(g.s.enemies), '\nitems', JSON.stringify(g.s.items), '\nbag', JSON.stringify(g.s.bag), 'lights', JSON.stringify(g.s.lights)); }
}
console.log(g.lines.join('\n')); if (g.bad.length) console.log('BAD', g.bad); const er = g.errors.filter((e) => !/willRead/.test(e)); if (er.length) console.log('ERRORS', er);
await g.close(); s.close();
