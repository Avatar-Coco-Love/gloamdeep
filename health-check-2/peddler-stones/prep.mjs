import { core } from '../lib.mjs';
export const turn = await core('turn'), stairs = await core('stairs'), roomM = await core('room'), mouth = await core('mouth');
export const people = await core('people'), travelM = await core('travel');
const { tileAt } = roomM;
export function show(s) {
  const rows = s.room.map.map((l) => [...l]);
  for (const p of s.people || []) rows[p.y][p.x] = 'P';
  for (const e of s.enemies || []) rows[e.y][e.x] = 'e';
  for (const it of s.items || []) rows[it.y][it.x] = 'i';
  rows[s.hero.y][s.hero.x] = '@';
  return rows.map((r) => r.join('')).join('\n');
}
// hero beside a straight-side heap of the peddler: returns {state, dir} dir = key to bump heap
export function atPeddler(seed, mode = 'gentle', corner = false) {
  let s = turn.newJourney(seed, mode);
  s = stairs.goToPlace(s, roomM.peddlerRoom(seed));
  const p = s.people.find((q) => q.id === 'peddler');
  const D = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
  const heaps = corner ? [[-1,-1],[1,-1],[-1,1],[1,1]] : [[0,-1],[0,1],[-1,0],[1,0]];
  for (const [hx, hy] of heaps) {
    const x = p.x + hx, y = p.y + hy;
    if (tileAt(s.room, x, y).id !== 'rubble') continue;
    for (const [k, [dx, dy]] of Object.entries(D)) {
      const sx = x - dx, sy = y - dy; // hero stands here, bumps dir k
      if (sx === p.x && sy === p.y) continue;
      if (!tileAt(s.room, sx, sy).solid && !s.enemies.some((e) => e.x === sx && e.y === sy)) return { state: { ...s, hero: { x: sx, y: sy }, enemies: [] }, dir: k, p, heap: { x, y } };
    }
  }
  return null;
}
const KEY = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
// Peddler freed and gone home; hero in the stone's room at `off` tiles from him ({dx,dy}); extra merges in
export function atHome(seed, off = { dx: 3, dy: 0 }, extra = {}) {
  const a = atPeddler(seed); let s = a.state;
  for (let i = 0; i < 3; i++) s = turn.step(s, KEY[a.dir]);
  for (let i = 0; i < 6; i++) s = turn.wait(s);
  s = stairs.goToPlace(s, mouth.stoneHome(seed));
  const p = s.people.find((q) => q.id === 'peddler');
  return { state: { ...s, hero: { x: p.x + off.dx, y: p.y + off.dy }, enemies: [], ...extra }, p };
}
import { keys as _keys, tap as _tap } from '../lib.mjs';
// From boot to play: phone taps Tess then Continue; pc Enter Enter
export async function start(page, kind) {
  if (kind === 'pc') await _keys(page, 'Enter Enter'); else { await _tap(page, 200, 105); await _tap(page, 205, 576); }
  await page.waitForTimeout(1500);
}
export function plateOf(room) { for (let y = 0; y < room.rows; y++) { const x = room.map[y].search(/[ZA]/); if (x >= 0) return { x, y }; } return null; }
// hero in the home stone's room, `dy` tiles south of the plate; plate asleep
export function nearHomeStone(seed, dy = 2, extra = {}) {
  let s = stairs.goToPlace(turn.newJourney(seed, 'gentle'), mouth.stoneHome(seed));
  const pl = plateOf(s.room);
  return { ...s, hero: { x: pl.x, y: pl.y + dy }, enemies: [], lit: true, ...extra };
}
// wake the stone of `place` and leave the hero on its plate
export function wakeAt(s, place) {
  s = stairs.goToPlace(s, place);
  const pl = plateOf(s.room);
  s = { ...s, hero: { x: pl.x, y: pl.y + 1 }, enemies: [] };
  return turn.step(s, 'up');
}
// every stone woken down to `depths`, the hero on the last one's plate
export function allWoken(seed, depths = [2, 5, 8, 12, 16], extra = {}) {
  let s = wakeAt(turn.newJourney(seed, 'gentle'), mouth.stoneHome(seed));
  for (const d of depths) { const id = roomM.stoneRoom(seed, d); if (!id) { console.log('no stone room at', d); continue; } s = wakeAt(s, id); }
  return { ...s, lit: true, oil: 1, ...extra };
}
