import { Game, serve, core, room, region, line, tap } from './pl.mjs';
import { base } from './setups.mjs';
const mode = process.argv[2] || 'default';
const settingsMod = await core('settings');
const s = await serve();
const st = base(7, 4, { god: true, endless: true, enemies: [] });
const c = region.cellOf(7, 'depth4', 4); console.log(st.room.map.join('\n'), JSON.stringify(c.doors));
const g = await Game.boot(s.url, 'phone', st, mode === 'default' ? {} : { settings: { swipe: 'off', tap: mode } });
if (mode !== 'default') console.log('settings before', await g.page.evaluate(() => localStorage.getItem('gloamdeep-settings')));
const d = c.doors[0], r = st.room, t = d.dir === 'up' ? { x: d.at, y: 0 } : d.dir === 'down' ? { x: d.at, y: r.rows - 1 } : d.dir === 'left' ? { x: 0, y: d.at } : { x: r.cols - 1, y: d.at };
console.log('walk to door', await g.walkTo(t), JSON.stringify(g.s.hero));
await g.shot('door-1-at-' + mode);
g.noSwipe = true;
for (let i = 0; i < 3; i++) { await g.step(d.dir, 400); console.log('tap past edge ->', g.s.place, JSON.stringify(g.s.hero), 't', g.s.turn, '|', await line(g.page)); }
// a held finger past the edge
g.noSwipe = false; await g.step(d.dir, 500); if (mode !== 'default') { const c2 = await g.page.context().newCDPSession(g.page); const [hx, hy] = [200, 500]; await c2.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 76, y: 870 }] }); await g.page.waitForTimeout(900); await c2.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await g.read(); console.log('held finger below ->', g.s.place, g.s.turn); } console.log('swipe ->', g.s.place, JSON.stringify(g.s.hero), 't', g.s.turn);
await g.shot('door-2-after-' + mode);
await g.close(); s.close();
