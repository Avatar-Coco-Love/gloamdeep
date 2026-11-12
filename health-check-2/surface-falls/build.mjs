// builds a rich journey one turn from a fall
import { core } from '../lib.mjs';
import { turn, stairs, roomM } from './h.mjs';
const bagM = await core('bag'), sleepM = await core('sleep'), xpM = await core('xp');
export const SEED = 4127;
const freeBeside = (s) => [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => ({ x: s.hero.x + dx, y: s.hero.y + dy }))
  .find((t) => roomM.tileAt(s.room, t.x, t.y).solid === false && !s.enemies.some((e) => e.x === t.x && e.y === t.y) && !s.items.some((e) => e.x === t.x && e.y === t.y));
export function build(mode, where, cause, wake) {
  let j = turn.newJourney(SEED, mode);
  const notes = { start: { place: j.place, hero: j.hero } };
  if (wake === 'stone') {
    j = stairs.goToPlace(j, 'woods:1,0'); j = { ...j, hero: { x: 8, y: 9 } }; j = turn.step(j, 'up');
    notes.plate = { place: 'woods:1,0', hero: { ...j.hero } }; notes.stoneLine = j.line;
    j = { ...j, hero: { x: 8, y: 11 } };
  }
  if (wake === 'bed') {
    j = { ...j, hero: { x: notes.start.hero.x + 3, y: notes.start.hero.y + 2 }, turn: 180 };
    j = { ...j, bag: bagM.bagAdd(j.bag, 'bed') };
    const side = turn.setSides(j, 0)[0]; const h0 = j.hero; j = turn.setDown(j, 0, side); j = { ...j, hero: h0 };
    const d = turn.DIRS[side], bx = h0.x + d[0], by = h0.y + d[1]; notes.setLine = j.line;
    j = sleepM.sleep(j, bx, by); notes.bed = j.bed; notes.sleepLine = j.line;
  }
  for (const [id, n] of [['wood', 3], ['stone', 2], ['flask', 1], ['herb', 1], ['glowDraught', 1]]) for (let i = 0; i < n; i++) j = { ...j, bag: bagM.bagAdd(j.bag, id) };
  j = { ...j, held: 'knife', tool: 'pick', worn: { armour: ['ratVest'], charm: ['heartCharm'] }, coins: 7, boon: 'stoutHeart', glow: 40, xp: 30, turn: j.turn + 300 };
  j = where === 'surface' ? stairs.goToPlace(j, 'woods:2,1') : stairs.goToDepth(j, 2);
  if (where === 'surface') j = { ...j, hero: { x: 8, y: 9 }, enemies: [] };
  else j = { ...j, enemies: [] };
  j = { ...j, health: 1 };
  if (cause === 'bite') { const t = freeBeside(j); j = { ...j, enemies: [...j.enemies, { id: 'rat', x: t.x, y: t.y, chasing: true }] }; }
  else j = { ...j, poisoned: 1 };
  notes.level = xpM.levelOf(j.xp);
  return { state: j, notes };
}
