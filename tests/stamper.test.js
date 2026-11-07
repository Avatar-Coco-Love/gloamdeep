// § stamper: the waystones on depth 2, 5, 8, then every 4th (D-594), each set aside by the shared stamper in a room the seed picks
// (D-579, D-587, D-592); many rooms built, and old saves brought up to date once
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeFor, stoneAt, stoneRoom, placeAt, makeRoom, tileAt, isStoneDepth, nextStoneDepth, STONE_DEPTH } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';
import { LANDMARKS } from '../src/core/registry.js';
import { around } from '../src/core/landmarks.js';
import { spotIn, ringOf } from '../src/core/stamper.js';

const SEEDS = Array.from({ length: 400 }, (_, i) => i + 1);
const MARK = LANDMARKS.waystone, PLAN = MARK.plan;
const platesIn = (map) => map.flatMap((l, y) => [...l].flatMap((ch, x) => (ch === 'Z' ? [{ x, y }] : [])));
// The open tiles walked to from `from`, through anything not solid
function walked(room, from) {
  const seen = new Set([`${from.x},${from.y}`]), queue = [from];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = { x: t.x + dx, y: t.y + dy }, k = `${n.x},${n.y}`;
      if (!seen.has(k) && !tileAt(room, n.x, n.y).solid) { seen.add(k); queue.push(n); }
    }
  }
  return seen;
}

test('stamper: on depth 2, exactly one room holds the waystone, never the room with the stairs up', () => {
  for (const seed of SEEDS) {
    const ids = layoutAt(seed, STONE_DEPTH).cells.map((c) => c.id), holding = ids.filter((id) => platesIn(placeFor(id, seed).map).length);
    assert.deepEqual(holding, [stoneRoom(seed)], `seed ${seed}`);
    assert.notEqual(stoneRoom(seed), placeAt(STONE_DEPTH));
  }
  const rooms = new Set(SEEDS.map((seed) => stoneRoom(seed).split(':')[1]));
  assert.ok(rooms.size >= 3, 'the seed picks among the rooms');
});

test('stamper: the stone stands whole near the middle, ringed by open floor, nothing on it, the plate reached', () => {
  for (const seed of SEEDS) {
    const { id, at } = stoneAt(seed), p = placeFor(id, seed), room = makeRoom(p.map, undefined, p.look);
    assert.ok(Math.abs(at.x - (room.cols >> 1)) <= 1 && Math.abs(at.y - (room.rows >> 1)) <= 2, `seed ${seed}: near the middle`);
    PLAN.forEach((row, j) => [...row].forEach((ch, i) => assert.equal(p.map[at.y - 1 + j][at.x - 1 + i], ch, `seed ${seed}`)));
    for (const t of around(MARK, at.x, at.y, ringOf(MARK))) { // 3 × 3 (D-620), its old 5 × 5 patch and ring open floor
      if (Math.max(Math.abs(t.x - at.x), Math.abs(t.y - at.y)) > 1) assert.ok(!tileAt(room, t.x, t.y).solid && p.map[t.y][t.x] !== '~', `seed ${seed}: ring ${t.x},${t.y}`);
    }
    const on = (o) => Math.abs(o.x - at.x) <= 2 && Math.abs(o.y - at.y) <= 2; // nothing on it or its pad
    assert.ok(![...p.items, ...p.enemies, ...p.lights].some(on), `seed ${seed}: something on the stone`);
    const reached = walked(room, p.start);
    for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
      if (!tileAt(room, x, y).solid) assert.ok(reached.has(`${x},${y}`), `seed ${seed}: ${x},${y} cut off`);
    }
  }
});

test('stamper: the spot keeps clear of the stairs, and none is found where they stand in the middle', () => {
  assert.deepEqual(spotIn(MARK, 13, 15), { x: 6, y: 7 });
  assert.equal(spotIn(MARK, 13, 15, [{ x: 6, y: 7 }]), null);
  const at = spotIn(MARK, 13, 15, [{ x: 6, y: 3 }]);
  assert.ok(at && Math.abs(at.y - 3) > 4);
  for (const seed of SEEDS) {
    const cell = layoutAt(seed, STONE_DEPTH).cells.find((c) => c.id === stoneRoom(seed)), { at: s } = stoneAt(seed);
    if (cell.down) assert.ok(Math.abs(cell.down.x - s.x) > 4 || Math.abs(cell.down.y - s.y) > 4, `seed ${seed}`);
  }
});

test('stamper: a stone at the top of each band, then every 4th depth, none between (D-594)', () => {
  const holds = Array.from({ length: 30 }, (_, d) => d).filter(isStoneDepth);
  assert.deepEqual(holds, [2, 5, 8, 12, 16, 20, 24, 28]);
  assert.deepEqual([1, 2, 5, 8, 11, 12].map(nextStoneDepth), [2, 5, 8, 12, 12, 16]);
  for (const depth of [3, 4, 6, 7, 9, 13]) assert.equal(stoneAt(1, depth), null);
  for (const seed of SEEDS.slice(0, 40)) {
    for (const c of layoutAt(seed, 3).cells) assert.equal(platesIn(placeFor(c.id, seed).map).length, 0);
  }
});

test('stamper: deeper stones, 100 seeds on 5, 8, 12 and 16: one room each, one stone, all reached', () => {
  for (const depth of [5, 8, 12, 16]) for (const seed of SEEDS.slice(0, 100)) {
    const { id, at } = stoneAt(seed, depth), p = placeFor(id, seed), room = makeRoom(p.map, undefined, p.look);
    assert.notEqual(id, placeAt(depth), `depth ${depth} seed ${seed}`);
    assert.deepEqual(platesIn(p.map), [at], `depth ${depth} seed ${seed}`);
    const reached = walked(room, p.start);
    for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
      if (!tileAt(room, x, y).solid) assert.ok(reached.has(`${x},${y}`), `depth ${depth} seed ${seed}: ${x},${y} cut off`);
    }
    const others = layoutAt(seed, depth).cells.filter((c) => c.id !== id).slice(0, 2);
    for (const c of others) assert.equal(platesIn(placeFor(c.id, seed).map).length, 0);
  }
});

// § old saves: the stone's room made again once, every other room kept (D-592)
import { UPGRADES, upgradeState } from '../src/core/save.js';
import { restone, restones } from '../src/core/refloor.js';
import { makeWorld } from '../src/core/turn.js';
import { goToPlace, goToDepth } from '../src/core/stairs.js';

const SEED = 7;
// A save from before the stone: its room as an old one would be, the plan grassed over to floor
const unstoned = (p) => ({ ...p, room: { ...p.room, map: p.room.map.map((l) => l.replace(/[XYZA]/g, '.')) } });

test('stamper: the step from format 13 is the restone, from 14 the deeper ones', () => {
  assert.equal(UPGRADES[13], restone);
  assert.equal(UPGRADES[14], restones);
});

test('stamper: an old save has the stone\'s room made again with it, the others kept as they were', () => {
  const id = stoneRoom(SEED), w = goToPlace(goToDepth(makeWorld('first', SEED), 2), id), w2 = goToPlace(w, 'first');
  const old = { ...w2, elsewhere: { ...w2.elsewhere, [id]: unstoned(w2.elsewhere[id]) } };
  const marked = { ...old, elsewhere: { ...old.elsewhere, depth2: { ...old.elsewhere.depth2, items: [{ id: 'herb', x: 1, y: 1 }] } } };
  const s = UPGRADES[13](marked); // the step itself: a later one makes every room again (D-645)
  assert.equal(s.place, 'first');
  assert.ok(!s.elsewhere[id] || platesIn(s.elsewhere[id].room.map).length === 1);
  assert.deepEqual(s.elsewhere.depth2.items, marked.elsewhere.depth2.items); // kept
  assert.deepEqual(restone(s), s); // once: a room with its stone stays
});

test('stamper: a hero in that room stands on the floor\'s stairs up', () => {
  const id = stoneRoom(SEED), w = goToPlace(goToDepth(makeWorld('first', SEED), 2), id);
  const s = restone(unstoned({ ...w, hero: { x: 3, y: 3 } }));
  assert.equal(s.place, placeAt(STONE_DEPTH));
  assert.equal(tileAt(s.room, s.hero.x, s.hero.y).id, 'stairsUp');
});

test('stamper: a woken plate is kept as it is', () => {
  const id = stoneRoom(SEED), w = goToPlace(goToPlace(goToDepth(makeWorld('first', SEED), 2), id), 'first'), p = w.elsewhere[id];
  const woken = { ...w, elsewhere: { ...w.elsewhere, [id]: { ...p, room: { ...p.room, map: p.room.map.map((l) => l.replace('Z', 'A')) } } } };
  assert.deepEqual(restone(woken), woken);
});

test('stamper: an old save has each deeper stone\'s room made again once, the others kept (D-594)', () => {
  let w = makeWorld('first', SEED);
  for (const d of [5, 8]) w = goToPlace(goToPlace(goToDepth(w, d), stoneRoom(SEED, d)), placeAt(d));
  const old = { ...w, elsewhere: Object.fromEntries(Object.entries(w.elsewhere).map(([id, p]) => [id, id === stoneRoom(SEED, 5) || id === stoneRoom(SEED, 8) ? unstoned(p) : p])) };
  const s = UPGRADES[14](old); // the step itself, as above
  for (const d of [5, 8]) { // forgotten, to be made again with its stone on arrival
    const id = stoneRoom(SEED, d);
    assert.ok(old.elsewhere[id] && !s.elsewhere[id], `depth ${d}`);
    assert.equal(platesIn(placeFor(id, SEED).map).length, 1, `depth ${d}`);
  }
  const remade = new Set([stoneRoom(SEED, 5), stoneRoom(SEED, 8)]);
  assert.ok(Object.keys(old.elsewhere).filter((id) => !remade.has(id))
    .every((id) => JSON.stringify(s.elsewhere[id]) === JSON.stringify(old.elsewhere[id]))); // every other room kept
  assert.deepEqual(s.room, old.room); // the hero's room kept, and the hero in it
  assert.deepEqual(s.hero, old.hero);
  assert.deepEqual(restones(s), s); // once
});
