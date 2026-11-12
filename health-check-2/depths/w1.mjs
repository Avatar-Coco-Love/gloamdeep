import { Game, serve, core, room, cells, line, keys } from './pl.mjs';
const turn = await core('turn'), stairs = await core('stairs');
const seed = +process.argv[2] || 4127, kind = process.argv[3] || 'pc', mode = process.argv[4] || 'win';
let st = turn.newJourney(seed, 'normal');
const lk = room.locketRoom(seed);
st = stairs.goToPlace(st, lk); st = { ...st, enemies: st.enemies.filter((e) => e.id === 'warden' || process.argv[5] === 'all'), lit: true, ...(mode === 'knife' && { held: 'knife' }), ...(mode === 'lose' && { health: 2 }) };
const s = await serve();
const g = await Game.boot(s.url, kind, st);
const T = `w1-${seed}-${mode}`;
console.log(g.s.room.map.join('\n')); console.log('hero', g.s.hero, JSON.stringify(g.s.enemies), JSON.stringify(g.s.items));
const w = () => g.s.enemies.find((e) => e.id === 'warden'), L = g.s.items.find((i) => i.id === 'locket');
const say = async (tag) => console.log(tag, JSON.stringify(g.s.events), JSON.stringify(g.s.enemies.filter((e) => e.id !== "warden" && Math.abs(e.x - g.s.hero.x) + Math.abs(e.y - g.s.hero.y) < 4)), '| line:', await line(g.page), '| hp', g.s.health, 'warden', JSON.stringify(w()), 'hero', JSON.stringify(g.s.hero), 't', g.s.turn);
console.log('walk', await g.walkTo(w(), { stopBeside: true, max: 80 })); await say('beside');
await g.page.waitForTimeout(500); await g.shot(T + '-1asleep');
const dirTo = (a, b) => (b.x > a.x ? 'right' : b.x < a.x ? 'left' : b.y > a.y ? 'down' : 'up');
if (mode === 'win' || mode === 'knife') {
  for (let i = 0; i < 8 && w(); i++) { await g.step(dirTo(g.s.hero, w()), 500); await say('bump' + i); if (i === 0) await g.shot(T + '-2awake'); if (w() && Math.abs(w().x - g.s.hero.x) + Math.abs(w().y - g.s.hero.y) !== 1) break; }
  await g.shot(T + '-3beaten');
  console.log('to locket', await g.walkTo(L, { max: 30 })); await say('locket'); await g.shot(T + '-4taken');
  console.log('bag', JSON.stringify(g.s.bag), 'items left', JSON.stringify(g.s.items));
  if (kind === 'pc') await keys(g.page, 'i', 500); else { await g.page.locator('#bag-button').tap(); await g.page.waitForTimeout(500); }
  await g.shot(T + '-5bag');
} else if (mode === 'flee') { // wake it then walk away, count turns to settle
  await g.step(dirTo(g.s.hero, w()), 400); await say('bump');
  for (let i = 0; i < 9; i++) { const far = [['up', 0, -1], ['down', 0, 1], ['left', -1, 0], ['right', 1, 0]].filter(([d, dx, dy]) => !room.tileAt(g.s.room, g.s.hero.x + dx, g.s.hero.y + dy).solid && !g.s.enemies.some((e) => e.x === g.s.hero.x + dx && e.y === g.s.hero.y + dy))
      .sort((a, b) => (Math.abs(g.s.hero.x + b[1] - w().x) + Math.abs(g.s.hero.y + b[2] - w().y)) - (Math.abs(g.s.hero.x + a[1] - w().x) + Math.abs(g.s.hero.y + a[2] - w().y)));
    await g.step(far[0][0], 400); await say('flee' + i); }
  await g.shot(T + '-settled');
} else if (mode === 'lose') {
  await g.step(dirTo(g.s.hero, w()), 400); await say('bump');
  for (let i = 0; i < 8 && g.s.place === lk; i++) { await g.step('wait', 500); await say('wait' + i); if (i < 3) await g.shot(T + '-wait' + i); }
  await g.page.waitForTimeout(2500); await g.shot(T + '-fell'); await g.read(); await say('after');
  console.log('place', g.s.place, 'warden there', JSON.stringify(g.s.elsewhere[lk]?.enemies.filter((e) => e.id === 'warden')), JSON.stringify(g.s.elsewhere[lk]?.items));
}
console.log(g.lines.join('\n')); console.log('bad', g.bad, 'log', g.log, 'errors', g.errors.filter((e) => !/willRead/.test(e)));
await g.close(); s.close();
