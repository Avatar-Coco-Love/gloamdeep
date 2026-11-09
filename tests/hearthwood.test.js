// § hearthwood: the starting region's 9 woods rooms, joined by paths (D-733, step 1)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROOMS, HOME_ID, PATH, CORNER, sidesOfWoods, cellOfWoods, pathsOf, pathTiles, besideHome } from '../src/core/hearthwood.js';
import { beginPlace, tileAt, depthOf } from '../src/core/room.js';
import { mouthOf } from '../src/core/mouth.js';
import { generateWoods } from '../src/core/woods.js';
import { seedFor } from '../src/core/rng.js';
import { makeWorld, step } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';
import { UPGRADES } from '../src/core/save.js';
import { fishHere, POND_FISH } from '../src/core/fishing.js';
import { COLS, ROWS } from '../src/core/cave.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);
const BACK = { up: 'down', down: 'up', left: 'right', right: 'left' };
const key = (t) => `${t.x},${t.y}`;

// Every open tile the hero can walk to from `from`
function walk(room, from) {
  const out = new Set([key(from)]), queue = [from];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = { x: t.x + dx, y: t.y + dy };
      if (n.x < 0 || n.y < 0 || n.x >= room.cols || n.y >= room.rows || tileAt(room, n.x, n.y).solid || out.has(key(n))) continue;
      out.add(key(n)); queue.push(n);
    }
  }
  return out;
}
const edgeOf = (dir) => Array.from({ length: dir === 'up' || dir === 'down' ? COLS : ROWS }, (_, i) => ({ up: { x: i, y: 0 }, down: { x: i, y: ROWS - 1 }, left: { x: 0, y: i }, right: { x: COLS - 1, y: i } }[dir]));

test('9 rooms on a 3 × 3 grid, home in the centre, all at depth 0, each joined to every room beside it', () => {
  assert.equal(ROOMS.length, 9);
  assert.deepEqual(cellOfWoods(HOME_ID), { x: 1, y: 1 });
  let joins = 0;
  for (const id of ROOMS) {
    assert.equal(depthOf(id), 0);
    for (const [dir, to] of Object.entries(sidesOfWoods(id))) { assert.equal(sidesOfWoods(to)[BACK[dir]], id); joins++; }
  }
  assert.equal(joins / 2, 12);
  assert.equal(Object.keys(sidesOfWoods(HOME_ID)).length, 4);
});

test('each path is 3 tiles of open edge, kept 3 from the corners, at the same spot in both rooms; the rest of the edge is trees', () => {
  for (const seed of SEEDS) {
    const m = mouthOf(seed);
    for (const id of ROOMS) {
      const { room } = beginPlace(id, seed), paths = pathsOf(seed, id), sides = sidesOfWoods(id);
      assert.deepEqual([room.cols, room.rows], [COLS, ROWS]);
      for (const p of paths) {
        const len = p.dir === 'up' || p.dir === 'down' ? COLS : ROWS;
        assert.ok(p.at >= CORNER && p.at + PATH - 1 <= len - 1 - CORNER, `seed ${seed} ${id} ${p.dir}`);
        assert.equal(pathsOf(seed, sides[p.dir]).find((q) => q.dir === BACK[p.dir]).at, p.at, 'the same spot both sides');
      }
      for (const dir of ['up', 'down', 'left', 'right']) {
        const path = paths.find((p) => p.dir === dir), cut = new Set(path ? pathTiles(path).map(key) : []);
        for (const t of edgeOf(dir)) {
          const at = tileAt(room, t.x, t.y).id;
          if (cut.has(key(t))) assert.equal(at, 'floor', `seed ${seed} ${id}: the path is open`);
          else if (id === m.from && dir === m.dir && Math.abs(t.x - m.tile.x) + Math.abs(t.y - m.tile.y) <= 1) assert.ok(['caveMouth', 'outcrop'].includes(at));
          else assert.equal(at, 'tree', `seed ${seed} ${id} ${dir}: ${key(t)}`);
        }
      }
    }
  }
});

test('every open tile of every room is joined to its paths and its middle', () => {
  for (const seed of SEEDS) for (const id of ROOMS) {
    const p = beginPlace(id, seed), reach = walk(p.room, p.start);
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (!tileAt(p.room, x, y).solid) assert.ok(reach.has(`${x},${y}`), `seed ${seed} ${id}: ${x},${y}`);
  }
});

test('the waystone stands only at home; the mouth only in the room beside home the seed picks (D-184)', () => {
  const ways = new Set();
  for (const seed of SEEDS) {
    const m = mouthOf(seed);
    ways.add(m.from);
    assert.equal(m.from, besideHome(m.dir));
    assert.notEqual(m.from, HOME_ID);
    for (const id of ROOMS) {
      const { map } = beginPlace(id, seed).room, all = map.join('');
      assert.equal(all.includes('Z'), id === HOME_ID, `seed ${seed} ${id}: the waystone`);
      assert.equal(all.includes('M'), id === m.from, `seed ${seed} ${id}: the mouth`);
    }
  }
  assert.equal(ways.size, 4);
});

test('home keeps today\'s trees: only the mouth and its rocks go, and only trees are cut for the paths', () => {
  for (const seed of SEEDS) {
    const m = mouthOf(seed), was = generateWoods(seedFor(seed, 0), m).map, now = beginPlace(HOME_ID, seed).room.map;
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      const a = was[y][x], b = now[y][x];
      if (a === b) continue;
      assert.ok((a === 'T' && b === '.') || ('MR'.includes(a) && 'T.'.includes(b)), `seed ${seed}: ${x},${y} was ${a}, now ${b}`); // the mouth's spot may be on a path
    }
  }
});

test('walking off a path arrives in the room beside, on the matching tile, and back', () => {
  for (const seed of [1, 2, 3, 4127]) for (const p of pathsOf(seed, HOME_ID)) {
    const to = sidesOfWoods(HOME_ID)[p.dir];
    for (const t of pathTiles(p)) {
      const s = { ...makeWorld(HOME_ID, seed), hero: { ...t } }, there = step(s, p.dir);
      assert.equal(there.place, to);
      const along = p.dir === 'up' || p.dir === 'down' ? 'x' : 'y';
      assert.equal(there.hero[along], t[along]);
      assert.equal(step(there, BACK[p.dir]).place, HOME_ID);
    }
  }
});

test('an older save\'s home: the mouth and rocks made trees, the paths cut, the same as a new home; a hero on the mouth steps in', () => {
  for (const seed of [1, 4, 6, 9, 4127]) {
    const m = mouthOf(seed), w = makeWorld(HOME_ID, seed);
    const old = { ...w.room, map: generateWoods(seedFor(seed, 0), m).map };
    const here = UPGRADES[19]({ ...w, room: old, hero: { ...m.tile } });
    assert.deepEqual(here.room.map, beginPlace(HOME_ID, seed).room.map);
    assert.ok(!tileAt(here.room, here.hero.x, here.hero.y).solid, 'stepped in off the old mouth');
    const away = goToPlace({ ...w, room: old }, 'first'), up = UPGRADES[19](away);
    assert.deepEqual(up.elsewhere[HOME_ID].room.map, beginPlace(HOME_ID, seed).room.map);
    assert.equal(up.place, 'first');
  }
  const none = { ...makeWorld('first', 1), elsewhere: {} };
  assert.equal(UPGRADES[19](none), none, 'no home yet: nothing changes');
});

test('every woods room\'s pond holds the home pond\'s fish', () => {
  for (const id of ROOMS) assert.equal(fishHere(goToPlace(makeWorld('first', 3), id)), POND_FISH);
  assert.notEqual(fishHere(makeWorld('first', 3)), POND_FISH);
});
