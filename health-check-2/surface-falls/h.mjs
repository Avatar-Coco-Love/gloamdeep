// helpers for the surface-falls worker
import { core, readSave, keys, line, shot, tap } from '../lib.mjs';
export const turn = await core('turn'), roomM = await core('room'), stairs = await core('stairs'), daytime = await core('daytime');
const KEY = { '0,-1': 'ArrowUp', '0,1': 'ArrowDown', '-1,0': 'ArrowLeft', '1,0': 'ArrowRight' };
const DIR = { '0,-1': 'up', '0,1': 'down', '-1,0': 'left', '1,0': 'right' };
// BFS path of [dx,dy] from hero to a tile satisfying goal(x,y); avoid = extra blocked tiles
export function path(state, goal, { avoidItems = false, avoid = [] } = {}) {
  const { room, hero } = state, k = (x, y) => y * room.cols + x;
  const blocked = (x, y) => x < 0 || y < 0 || x >= room.cols || y >= room.rows || roomM.tileAt(room, x, y).solid !== false
    || state.enemies.some((e) => e.x === x && e.y === y) || (state.people || []).some((e) => e.x === x && e.y === y)
    || avoid.some((e) => e.x === x && e.y === y) || (avoidItems && state.items.some((e) => e.x === x && e.y === y));
  const back = new Map([[k(hero.x, hero.y), null]]), q = [hero];
  while (q.length) {
    const t = q.shift();
    if (goal(t.x, t.y) && !(t.x === hero.x && t.y === hero.y)) { const out = []; for (let c = t; back.get(k(c.x, c.y)); c = back.get(k(c.x, c.y)).from) out.unshift(back.get(k(c.x, c.y)).d); return out; }
    for (const d of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
      const x = t.x + d[0], y = t.y + d[1];
      if (back.has(k(x, y)) || (blocked(x, y) && !goal(x, y))) continue;
      if (blocked(x, y)) continue;
      back.set(k(x, y), { from: t, d }); q.push({ x, y });
    }
  }
  return null;
}
// in Node: walk the state to a tile with the game's own step
export function nodeGo(state, x, y, opt) {
  for (let i = 0; i < 200 && !(state.hero.x === x && state.hero.y === y); i++) {
    const p = path(state, (a, b) => a === x && b === y, opt); if (!p) throw new Error('no path to ' + x + ',' + y);
    state = turn.step(state, DIR[p[0].join()]);
  }
  return state;
}
// in the browser: walk with real keys, one at a time, to a tile (or next to it with beside=true)
export async function go(page, x, y, { beside = false, opt = {}, max = 80, log = false } = {}) {
  for (let i = 0; i < max; i++) {
    const s = (await readSave(page)).state;
    const done = beside ? Math.abs(s.hero.x - x) + Math.abs(s.hero.y - y) === 1 : s.hero.x === x && s.hero.y === y;
    if (done) return s;
    const p = path(s, beside ? (a, b) => Math.abs(a - x) + Math.abs(b - y) === 1 : (a, b) => a === x && b === y, opt);
    if (!p) { console.log('  no path to', x, y, 'from', JSON.stringify(s.hero)); return s; }
    await keys(page, KEY[p[0].join()], 200);
    if (log) console.log('   ', KEY[p[0].join()], '|', await line(page));
  }
  return (await readSave(page)).state;
}
export const keyToward = (from, to) => KEY[[Math.sign(to.x - from.x), Math.sign(to.y - from.y)].join()];
export const st = async (page) => (await readSave(page))?.state;
export const brief = (s) => `place ${s.place} hero ${s.hero.x},${s.hero.y} turn ${s.turn} hp ${s.health} oil ${Math.round(s.oil * 100)} mode ${s.mode} bag ${JSON.stringify(s.bag.map((b) => b.id + 'x' + b.n))} held ${s.held} tool ${s.tool} coins ${s.coins}`;
export const showMap = (s) => s.room.map.map((l, y) => String(y).padStart(2) + ' ' + [...l].map((ch, x) => (s.hero.x === x && s.hero.y === y ? '@' : s.enemies.some((e) => e.x === x && e.y === y) ? 'e' : s.items.some((e) => e.x === x && e.y === y) ? '*' : ch)).join('')).join('\n');
