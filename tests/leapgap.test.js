// § the first Leap gaps (D-968): from depth 5 to 8, one dead end a floor has its cache behind a Gap
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeFor, makeRoom, tileAt, leapGapAt } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';
import { LEAP_GAPS_FROM, LEAP_GAPS_TO } from '../src/core/leapgap.js';

const SIDES = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const walk = (room, from, open) => {
  const seen = new Set([`${from.x},${from.y}`]), queue = [from];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of SIDES) {
      const x = t.x + dx, y = t.y + dy, k = `${x},${y}`;
      if (x >= 0 && y >= 0 && x < room.cols && y < room.rows && !seen.has(k) && open(x, y)) { seen.add(k); queue.push({ x, y }); }
    }
  }
  return seen;
};
const gapsIn = (map) => map.flatMap((l, y) => [...l].flatMap((ch, x) => (ch === 's' ? [{ x, y }] : [])));

test('only depths 5 to 8 pick a dead end, one a floor', () => {
  assert.equal(LEAP_GAPS_FROM, 5); assert.equal(LEAP_GAPS_TO, 8);
  for (let seed = 1; seed <= 30; seed++) {
    for (const d of [2, 3, 4, 9, 12]) assert.equal(leapGapAt(seed, d), null);
    for (const d of [5, 6, 7, 8]) {
      const id = leapGapAt(seed, d), cell = layoutAt(seed, d).cells.find((c) => c.id === id);
      if (id) assert.ok(cell.end, `seed ${seed} depth ${d}`);
      for (const c of layoutAt(seed, d).cells) if (c.id !== id) assert.equal(gapsIn(placeFor(c.id, seed).map).length, 0, `seed ${seed} ${c.id}`);
    }
  }
});

test('a gap cuts the whole cache off from walking, and can be leapt', () => {
  let made = 0;
  for (let seed = 1; seed <= 120; seed++) for (const d of [5, 6, 7, 8]) {
    const id = leapGapAt(seed, d); if (!id) continue;
    const p = placeFor(id, seed), gaps = gapsIn(p.map); if (!gaps.length) continue;
    made++;
    const room = makeRoom(p.map, undefined, p.look), at = `seed ${seed} ${id}`;
    const near = walk(room, p.start, (x, y) => !tileAt(room, x, y).solid);
    const cache = p.items.filter((i) => i.once && i.id !== 'locket');
    assert.ok(cache.length >= 1, at); // a cramped corner can hold fewer than 2 (cache.js)
    for (const f of cache) assert.ok(!near.has(`${f.x},${f.y}`), `${at} cache walkable`);
    for (const g of gaps) assert.ok(![...p.items, ...p.enemies].some((o) => o.x === g.x && o.y === g.y), `${at} thing on gap`);
    // leapt: some gap with walkable floor on the near side and open floor 2 on, in line
    const leapt = gaps.some((g) => SIDES.some(([dx, dy]) => near.has(`${g.x - dx},${g.y - dy}`) && !tileAt(room, g.x + dx, g.y + dy).solid && !near.has(`${g.x + dx},${g.y + dy}`)));
    assert.ok(leapt, `${at} no leap`);
    // with Leap, the cache is reached: walking on from every landing tile reaches every find
    const lands = gaps.flatMap((t) => SIDES.filter(([dx, dy]) => near.has(`${t.x - dx},${t.y - dy}`) && !tileAt(room, t.x + dx, t.y + dy).solid && !near.has(`${t.x + dx},${t.y + dy}`)).map(([dx, dy]) => ({ x: t.x + dx, y: t.y + dy })));
    const far = new Set(lands.flatMap((l) => [...walk(room, l, (x, y) => !tileAt(room, x, y).solid)]));
    for (const f of cache) assert.ok(far.has(`${f.x},${f.y}`), `${at} cache not reached`);
  }
  assert.ok(made > 200, `only ${made} gaps`);
});

// § in play: walking into the gap is refused with its line; with Leap the hero crosses
import { newJourney } from '../src/core/state.js';
import { step, leap } from '../src/core/turn.js';
import { LINES } from '../src/core/lines.js';
import { goToPlace } from '../src/core/stairs.js';
const WAYS = { right: [1, 0], left: [-1, 0], down: [0, 1], up: [0, -1] };

test('in play: the Gap\'s line without Leap, its reminder and a leap over it with', () => {
  let tried = 0;
  for (let seed = 1; seed <= 40 && tried < 5; seed++) for (const d of [5, 6, 7, 8]) {
    const id = leapGapAt(seed, d); if (!id) continue;
    const there = goToPlace(newJourney(seed), id), map = there.room.map, gaps = gapsIn(map); if (!gaps.length) continue;
    const open = (x, y) => map[y]?.[x] === '.';
    for (const g of gaps) for (const [way, [dx, dy]] of Object.entries(WAYS)) {
      const from = { x: g.x - dx, y: g.y - dy }, to = { x: g.x + dx, y: g.y + dy };
      if (!open(from.x, from.y) || !open(to.x, to.y)) continue;
      const s = { ...there, hero: from, enemies: [] }, walked = step(s, way);
      assert.deepEqual(walked.hero, from, `seed ${seed} ${id}`);
      assert.equal(walked.line?.id, 'gapBump');
      assert.equal(LINES.gapBump.text, "Too wide to step. More lies beyond.");
      assert.equal(step({ ...s, leap: true }, way).line?.id, 'gapLeap', 'with Leap, its reminder (D-969)');
      const leapt = leap({ ...s, leap: true }, way);
      assert.deepEqual(leapt.hero, to, `seed ${seed} ${id} leap`);
      tried++; break;
    }
  }
  assert.ok(tried >= 5, `only ${tried}`);
});

// § the place beyond, its second step (D-970): past the gap, an Archway to one empty room off the grid
import { archwayIn, throughArchway, isBeyond } from '../src/core/beyond.js';
import { sizeAt } from '../src/core/region.js';
import { floorPlan } from '../src/core/map.js';

test('every gap has one archway, beside the cut-off corner only, never walkable round the gap', () => {
  let made = 0, edge = 0;
  for (let seed = 1; seed <= 120; seed++) for (const d of [5, 6, 7, 8]) {
    const id = leapGapAt(seed, d); if (!id) continue;
    const p = placeFor(id, seed), at = archwayIn(p.map), where = `seed ${seed} ${id}`;
    assert.ok(at, `${where} no archway`); made++;
    assert.equal(p.map.join('').split('t').length - 1, 1, `${where} one archway`);
    const room = makeRoom(p.map, undefined, p.look), cols = room.cols, rows = room.rows;
    const solidOrArch = (x, y) => tileAt(room, x, y).solid || (x === at.x && y === at.y);
    const near = walk(room, p.start, (x, y) => !solidOrArch(x, y));
    for (const [dx, dy] of SIDES) assert.ok(!near.has(`${at.x + dx},${at.y + dy}`), `${where} archway beside the near side`);
    const cache = p.items.filter((i) => i.once && i.id !== 'locket');
    const behind = walk(room, cache[0], (x, y) => !solidOrArch(x, y));
    assert.ok(SIDES.some(([dx, dy]) => behind.has(`${at.x + dx},${at.y + dy}`)), `${where} archway not in the corner`);
    if (at.x === 0 || at.y === 0 || at.x === cols - 1 || at.y === rows - 1) edge++;
  }
  assert.ok(made > 200, `only ${made}`);
  assert.ok(edge > made / 2, `only ${edge} of ${made} on the outer edge`);
  for (let seed = 1; seed <= 20; seed++) for (const d of [5, 8]) for (const c of layoutAt(seed, d).cells) {
    if (c.id !== leapGapAt(seed, d)) assert.equal(archwayIn(placeFor(c.id, seed).map), null, `seed ${seed} ${c.id} archway with no gap`);
  }
});

test('the room beyond: a cell big, empty, its archway in the middle of the edge facing back', () => {
  for (let seed = 1; seed <= 40; seed++) for (const d of [5, 6, 7, 8]) {
    const id = leapGapAt(seed, d); if (!id) continue;
    const to = throughArchway(id), b = placeFor(to, seed), where = `seed ${seed} ${to}`;
    assert.ok(isBeyond(to)); assert.equal(throughArchway(to), id);
    assert.equal(b.depth, d); assert.equal(b.map.length, sizeAt(d).rows); assert.equal(b.map[0].length, sizeAt(d).cols);
    assert.deepEqual([b.enemies.length, b.items.length, b.lights.length, b.people.length], [0, 0, 0, 0], `${where} not empty`);
    const at = archwayIn(b.map), rows = b.map.length, cols = b.map[0].length;
    assert.ok(at.x === 0 || at.y === 0 || at.x === cols - 1 || at.y === rows - 1, `${where} archway off the edge`);
    assert.ok(at.x === Math.floor(cols / 2) || at.y === Math.floor(rows / 2), `${where} archway not in the middle`);
    assert.equal(Math.abs(b.start.x - at.x) + Math.abs(b.start.y - at.y), 1, `${where} start beside it`);
  }
});

test('in play: through the archway and back, the hero on each side\'s archway, the map showing them', () => {
  let tried = 0;
  for (let seed = 1; seed <= 30 && tried < 6; seed++) for (const d of [5, 6, 7, 8]) {
    const id = leapGapAt(seed, d); if (!id) continue;
    const there = goToPlace(newJourney(seed), id), at = archwayIn(there.room.map);
    const [way, [dx, dy]] = Object.entries(WAYS).find(([, [ex, ey]]) => there.room.map[at.y - ey]?.[at.x - ex] === '.');
    const back = { right: 'left', left: 'right', down: 'up', up: 'down' }[way];
    const s = step({ ...there, hero: { x: at.x - dx, y: at.y - dy }, enemies: [] }, way), where = `seed ${seed} ${id}`;
    assert.equal(s.place, `${id}/beyond`, where); assert.equal(s.line?.id, 'archway');
    assert.equal(LINES.archway.text, 'You go through the archway.');
    assert.deepEqual(s.hero, archwayIn(s.room.map), `${where} not on its archway`);
    assert.ok(floorPlan(s).hero, `${where} no hero on the map`);
    const off = step(s, way); assert.equal(off.place, s.place);
    const home = step(off, back);
    assert.equal(home.place, id, `${where} not back`); assert.deepEqual(home.hero, at);
    assert.deepEqual(home.room.map, there.room.map, `${where} the gap room changed`);
    tried++;
  }
  assert.ok(tried >= 6, `only ${tried}`);
});
