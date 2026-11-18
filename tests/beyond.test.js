// § the place beyond, its second step (D-970): past the gap, an Archway to one empty room off the grid.
// Moved word for word from leapgap.test.js (H-106); the first Leap gaps' tests stay there.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeFor, makeRoom, tileAt, leapGapAt } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';
import { newJourney } from '../src/core/state.js';
import { step } from '../src/core/turn.js';
import { LINES } from '../src/core/lines.js';
import { goToPlace } from '../src/core/stairs.js';
import { SIDES, WAYS, walk } from './fixtures.js';
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
