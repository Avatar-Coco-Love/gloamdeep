// play helpers: real keys (pc) or taps on the neighbouring tile (phone)
import { serve, open, shot, keys, tap, line, readSave, inject, core, SCREENS } from '../lib.mjs';
export { serve, open, shot, keys, tap, line, readSave, inject, core };
const room = await core('room'), region = await core('region'), cam = await core('camera'), reg = await core('registry');
export const KEY = { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight' };
const D = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const VIEW = { phone: [206, 457, 2], pc: [266, 150, 6] };
export function screenOf(kind, s, x, y) { // centre of tile x,y on the page
  const [w, h, k] = VIEW[kind]; const c = cam.cameraAt(s.hero.x * 16, s.hero.y * 16, s.room, w, h);
  return [(x * 16 + 8 - c.x) * k + (kind === 'pc' ? 2 : 0), (y * 16 + 8 - c.y) * k];
}
export class Game {
  constructor(kind, page, errors, browser) { Object.assign(this, { kind, page, errors, browser, lines: [], log: [], bad: [] }); }
  static async boot(url, kind, state, opts = {}) {
    const { browser, page, errors } = await open(url, kind, await inject(state, opts));
    const g = new Game(kind, page, errors, browser);
    await keys(page, 'Enter Enter', 300);
    g.s = (await readSave(page))?.state ?? state; // nothing saved until a turn
    return g;
  }
  async swipe(dir) { const [dx, dy] = D[dir]; const c = await this.page.context().newCDPSession(this.page); const x0 = 200, y0 = 600;
    await c.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x0, y: y0 }] });
    for (let i = 1; i <= 4; i++) await c.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x0 + dx * 15 * i, y: y0 + dy * 15 * i }] });
    await c.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await c.detach(); }
  async read() { const k = await readSave(this.page); if (k) this.s = k.state; return this.s; }
  async shot(name) { return shot(this.page, `out/${name}-${this.kind}.png`); }
  // one input toward dir; returns the new state
  async step(dir, pause = 170) {
    const before = this.s;
    if (dir === 'wait') { if (this.kind === 'pc') await this.page.keyboard.press('Space'); else { const [x, y] = screenOf(this.kind, before, before.hero.x, before.hero.y); await this.page.touchscreen.tap(x, y); } }
    else if (this.kind === 'pc') await this.page.keyboard.press(KEY[dir]);
    else { const [dx, dy] = D[dir]; const tx = before.hero.x + dx, ty = before.hero.y + dy; const [x, y] = screenOf(this.kind, before, tx, ty);
      const off = tx < 0 || ty < 0 || tx >= before.room.cols || ty >= before.room.rows;
      if (off && !this.noSwipe) await this.swipe(dir); else await this.page.touchscreen.tap(x, y); }
    await this.page.waitForTimeout(pause);
    const s = await this.read();
    const l = await line(this.page); if (l && l !== this.lastLine) { this.lines.push(`d${room.depthOf(s.place)} t${s.turn}: ${l}`); } this.lastLine = l;
    this.check(before, s, dir); if (process.env.V) console.log('   .', dir, 't', s.turn, s.place, JSON.stringify(s.hero), 'hp', s.health, 'oil', s.oil.toFixed(2), JSON.stringify(s.events), l);
    return s;
  }
  check(b, s, dir) {
    const t = room.tileAt(s.room, s.hero.x, s.hero.y), tag = `${this.kind} seed${s.seed} ${s.place} t${s.turn}`;
    if (t.solid) this.bad.push(`${tag} hero on solid ${t.id} ${JSON.stringify(s.hero)}`);
    const at = {};
    for (const e of s.enemies) {
      const et = room.tileAt(s.room, e.x, e.y), k = e.x + ',' + e.y;
      if (et.solid && !(et.id === 'water' && reg.get(e.id).flies)) this.bad.push(`${tag} ${e.id} on solid ${et.id} ${k}`);
      if (at[k] && !e.pile && !at[k].pile) this.bad.push(`${tag} stacked ${e.id}+${at[k].id} at ${k}`);
      at[k] = e;
      if (e.x === s.hero.x && e.y === s.hero.y && !e.pile && !e.under) this.bad.push(`${tag} ${e.id} on the hero ${k} ${JSON.stringify(e)}`);
      if (e.x < 0 || e.y < 0 || e.x >= s.room.cols || e.y >= s.room.rows) this.bad.push(`${tag} ${e.id} outside room ${k}`);
    }
    if (s.health > 0 && s.health < b.health) this.log.push(`${tag} hurt ${b.health}->${s.health}`);
  }
  // BFS path in the room; foes block unless `through`
  path(to, { blockFoes = true, avoid = [] } = {}) {
    const s = this.s, r = s.room, key = (x, y) => x + ',' + y, foes = new Set(s.enemies.filter((e) => !e.pile).map((e) => key(e.x, e.y)));
    const av = new Set(avoid.map((t) => key(t.x, t.y)));
    const prev = new Map([[key(s.hero.x, s.hero.y), null]]), q = [s.hero];
    while (q.length) {
      const c = q.shift(); if (c.x === to.x && c.y === to.y) break;
      for (const [d, [dx, dy]] of Object.entries(D)) {
        const x = c.x + dx, y = c.y + dy, k = key(x, y);
        if (x < 0 || y < 0 || x >= r.cols || y >= r.rows || prev.has(k)) continue;
        const isTo = x === to.x && y === to.y;
        if (!isTo && (room.tileAt(r, x, y).solid || (blockFoes && foes.has(k)) || av.has(k))) continue;
        // don't walk over stairs on the way (they take you away)
        if (!isTo && ['stairsUp', 'stairsDown'].includes(room.tileAt(r, x, y).id)) continue;
        prev.set(k, { from: c, d }); q.push({ x, y });
      }
    }
    if (!prev.has(key(to.x, to.y))) return null;
    const out = []; let c = to; while (prev.get(key(c.x, c.y))) { const p = prev.get(key(c.x, c.y)); out.unshift(p.d); c = p.from; }
    return out;
  }
  // walk to a tile by single inputs, fighting what stands in the way; stops on leaving the room, dying, or max
  async walkTo(to, { max = 120, fight = true, stopBeside = false, onStep = null } = {}) {
    const place = this.s.place;
    for (let i = 0; i < max; i++) {
      const s = this.s; if (s.place !== place) return 'left'; if (s.health <= 0 || s.fallen) return 'fell';
      if (s.hero.x === to.x && s.hero.y === to.y) return 'there';
      if (stopBeside && Math.abs(s.hero.x - to.x) + Math.abs(s.hero.y - to.y) === 1) return 'beside';
      if (this.upkeep) await this.upkeep();
      if (fight && !(i > 0 && this.s === s)) { const adj = this.s.enemies.find((e) => !e.pile && !e.under && !e.asleep && Math.abs(e.x - s.hero.x) + Math.abs(e.y - s.hero.y) === 1 && !(e.x === to.x && e.y === to.y && stopBeside));
        if (adj && (this.swings = (this.swings || 0) + 1) < 400) { await this.step(adj.x > s.hero.x ? 'right' : adj.x < s.hero.x ? 'left' : adj.y > s.hero.y ? 'down' : 'up'); continue; } }
      let p = this.path(to) || (fight ? this.path(to, { blockFoes: false }) : null);
      if (!p || !p.length) return 'nopath';
      const turn = s.turn; await this.step(p[0]); if (onStep) await onStep(this.s);
      if (this.s.turn === turn && this.s.place === place) { this.stuckN = (this.stuckN || 0) + 1; if (this.stuckN % 2 === 0) await this.step('wait'); } else this.stuckN = 0;
      if (this.s.turn < turn) return 'fell'; // the journey began again
    }
    return 'max';
  }
  find(id) { const r = this.s.room; const out = []; for (let y = 0; y < r.rows; y++) for (let x = 0; x < r.cols; x++) if (room.tileAt(r, x, y).id === id) out.push({ x, y }); return out; }
  // walk off through the door that leads to room `to`
  async through(toId, opts) {
    const s = this.s, depth = room.depthOf(s.place), c = region.cellOf(s.seed, s.place, depth), d = c.doors.find((o) => o.to === toId);
    if (!d) return 'nodoor';
    const r = s.room, t = d.dir === 'up' ? { x: d.at, y: 0 } : d.dir === 'down' ? { x: d.at, y: r.rows - 1 } : d.dir === 'left' ? { x: 0, y: d.at } : { x: r.cols - 1, y: d.at };
    const w = await this.walkTo(t, opts); if (w !== 'there') return w;
    for (let i = 0; i < 4 && this.s.place === s.place; i++) await this.step(d.dir);
    return this.s.place === toId ? 'through' : 'stuck';
  }
  // rooms on the way from here to room id, by doors
  route(toId) {
    const s = this.s, depth = room.depthOf(s.place), lay = region.layoutAt(s.seed, depth);
    const prev = new Map([[s.place, null]]), q = [s.place];
    while (q.length) { const id = q.shift(); for (const d of lay.cells.find((c) => c.id === id).doors) if (!prev.has(d.to)) { prev.set(d.to, id); q.push(d.to); } }
    const out = []; let c = toId; while (c && c !== s.place) { out.unshift(c); c = prev.get(c); } return out;
  }
  async goRoom(toId, opts) { for (const id of this.route(toId)) { const r = await this.through(id, opts); if (r !== 'through') return r + ' at ' + this.s.place + '->' + id; } return 'ok'; }
  async close() { await this.browser.close(); }
}
export const cells = (seed, depth) => region.layoutAt(seed, depth).cells;
export { room, region, reg };
