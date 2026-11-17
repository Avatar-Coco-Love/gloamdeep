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
import { goToPlace } from '../src/core/stairs.js';
const WAYS = { right: [1, 0], left: [-1, 0], down: [0, 1], up: [0, -1] };

test('in play: "Too wide to step across." without Leap, a leap over it with', () => {
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
      const leapt = leap({ ...s, leap: true }, way);
      assert.deepEqual(leapt.hero, to, `seed ${seed} ${id} leap`);
      tried++; break;
    }
  }
  assert.ok(tried >= 5, `only ${tried}`);
});
