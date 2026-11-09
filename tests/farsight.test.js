// § far sight: a third of a room never seen, nearest the hero, remembered on arriving (D-602)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld } from '../src/core/turn.js';
import { goToDepth, goToPlace } from '../src/core/stairs.js';
import { offerable } from '../src/core/boon.js';
import { tileAt } from '../src/core/room.js';
import { BOONS } from '../src/core/registry.js';
import { glowsIn } from '../src/core/stairs.js';
import { stoneHome } from '../src/core/mouth.js';

const held = (s) => ({ ...s, boon: 'farSight' });
const floorTiles = (room) => { let n = 0; for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) if (!tileAt(room, x, y).solid) n++; return n; };
const seenFloor = (s) => { let n = 0; for (let y = 0; y < s.room.rows; y++) for (let x = 0; x < s.room.cols; x++) if (s.seen[y * s.room.cols + x] && !tileAt(s.room, x, y).solid) n++; return n; };
// Steps from the hero to every tile, -1 for none
const steps = (s) => {
  const { cols, rows } = s.room, d = new Int32Array(cols * rows).fill(-1), q = [[s.hero.x, s.hero.y]];
  d[s.hero.y * cols + s.hero.x] = 0;
  while (q.length) {
    const [x, y] = q.shift();
    for (const [nx, ny] of [[x, y - 1], [x + 1, y], [x, y + 1], [x - 1, y]]) {
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || tileAt(s.room, nx, ny).solid || d[ny * cols + nx] >= 0) continue;
      d[ny * cols + nx] = d[y * cols + x] + 1; q.push([nx, ny]);
    }
  }
  return d;
};

test('far sight: built and offered, the last boon', () => {
  assert.equal(BOONS.farSight.shows, 1 / 3);
  assert.ok(!BOONS.farSight.soon);
  assert.equal(offerable().length, Object.keys(BOONS).length);
});

test('far sight: without it, a new room arrives unremembered', () => {
  const s = goToDepth(makeWorld('first', 7), 2);
  assert.ok(!s.seen.some(Boolean));
});

test('far sight: a third of a new room\'s floor, nearest first, at every kind of floor', () => {
  for (const seed of [1, 7, 42, 1234]) for (const depth of [2, 3, 5, 6, 8, 9]) {
    const s = goToDepth(held(makeWorld('first', seed)), depth), at = `seed ${seed}, depth ${depth}`;
    const want = Math.ceil(floorTiles(s.room) / 3), d = steps(s), cols = s.room.cols;
    assert.equal(seenFloor(s), want, at);
    assert.ok(s.seen[s.hero.y * cols + s.hero.x], at);
    // Every floor tile shown is no farther than any floor tile left dark that can be reached
    let far = 0, near = Infinity;
    for (let i = 0; i < d.length; i++) if (d[i] >= 0) { if (s.seen[i]) far = Math.max(far, d[i]); else near = Math.min(near, d[i]); }
    assert.ok(far <= near, at);
    assert.ok(s.seen.some((v) => !v), `${at}: not the whole room`);
  }
});

test('far sight: the walls beside it show; it is kept when the boon ends', () => {
  const s = goToDepth(held(makeWorld('first', 7)), 2), { room, seen } = s;
  let walls = 0;
  for (let i = 0; i < seen.length; i++) if (seen[i] && tileAt(room, i % room.cols, Math.floor(i / room.cols)).solid) walls++;
  assert.ok(walls > 0);
  const home = goToPlace(s, stoneHome(s.seed)), back = goToPlace(home, s.place);
  assert.equal(home.boon, null);
  assert.deepEqual(back.seen, seen);
});

test('far sight: a room already seen is unchanged', () => {
  const s = goToDepth(makeWorld('first', 7), 2), place = s.place;
  const once = { ...s, seen: s.seen.map((v, i) => (i === 0 ? 1 : v)) };
  const again = goToPlace(held(goToDepth(once, 3)), place);
  assert.equal(again.seen.filter(Boolean).length, 1);
});

test('far sight: stairs in the third shown count as found, their glow lit (D-194)', () => {
  let found = 0;
  for (const seed of [1, 7, 42, 1234, 99, 5]) for (const depth of [2, 3, 5]) {
    const s = goToDepth(held(makeWorld('first', seed)), depth);
    const shown = glowsIn(s.room, null).filter((g) => s.seen[g.at]);
    assert.deepEqual(glowsIn(s.room, s.seen), shown);
    found += shown.length;
  }
  assert.ok(found > 0, 'the stairs up, at least, are near the hero');
});
