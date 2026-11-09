// § hearthwood: the starting region's 9 woods rooms, joined by paths (D-733, step 1)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROOMS, HOME_ID, PATH, CORNER, sidesOfWoods, cellOfWoods, pathsOf, pathTiles, besideHome, isMountain } from '../src/core/hearthwood.js';
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

test('each path is 3 tiles of open edge, kept 3 from the corners, at the same spot in both rooms; the rest of the edge is trees, rock in the mountains', () => {
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
          else assert.equal(at, isMountain(id) ? 'outcrop' : 'tree', `seed ${seed} ${id} ${dir}: ${key(t)}`);
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

// B1 (D-742): a bush or branch just inside a path was left, cutting the path's end off
test('every path can be walked to from the start: a bush or branch in its way is cut as a tree is', () => {
  for (const seed of [...SEEDS, 72, 78, 142]) for (const id of ROOMS) {
    const p = beginPlace(id, seed), reach = walk(p.room, p.start);
    for (const path of pathsOf(seed, id)) assert.ok(reach.has(key(pathTiles(path)[PATH >> 1])), `seed ${seed} ${id} ${path.dir}`);
  }
});
test('the waystone and the mouth stand only in the room beside home the seed picks (D-184, D-753)', () => {
  const ways = new Set();
  for (const seed of SEEDS) {
    const m = mouthOf(seed);
    ways.add(m.from);
    assert.equal(m.from, besideHome(m.dir));
    assert.notEqual(m.from, HOME_ID);
    for (const id of ROOMS) {
      const { map } = beginPlace(id, seed).room, all = map.join('');
      assert.equal(all.includes('Z'), id === m.from, `seed ${seed} ${id}: the waystone`);
      assert.equal(all.includes('M'), id === m.from, `seed ${seed} ${id}: the mouth`);
    }
  }
  assert.equal(ways.size, 4);
});

test('home keeps today\'s trees: only the mouth and its rocks go, only trees are cut for the paths, and the stone is grass (D-753)', () => {
  for (const seed of SEEDS) {
    const m = mouthOf(seed), was = generateWoods(seedFor(seed, 0), m).map, now = beginPlace(HOME_ID, seed).room.map;
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      const a = was[y][x], b = now[y][x];
      if (a === b) continue;
      assert.ok((a === 'T' && b === '.') || ('XYZ'.includes(a) && b === '.') || ('MR'.includes(a) && 'T.'.includes(b)), `seed ${seed}: ${x},${y} was ${a}, now ${b}`); // the mouth's spot may be on a path
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
    const here = UPGRADES[21](UPGRADES[19]({ ...w, room: old, hero: { ...m.tile } })); // and its stone moved (D-753)
    assert.deepEqual(here.room.map, beginPlace(HOME_ID, seed).room.map);
    assert.ok(!tileAt(here.room, here.hero.x, here.hero.y).solid, 'stepped in off the old mouth');
    const away = goToPlace({ ...w, room: old }, 'first'), up = UPGRADES[21](UPGRADES[19](away));
    assert.deepEqual(up.elsewhere[HOME_ID].room.map, beginPlace(HOME_ID, seed).room.map);
    assert.equal(up.place, 'first');
  }
  const none = { ...makeWorld('first', 1), elsewhere: {} };
  assert.equal(UPGRADES[19](none), none, 'no home yet: nothing changes');
});

// B2, B3 (D-742): a journey begun before the mountain rooms keeps woods in its unseen north
// rooms; the dev Reset's copy of home keeps the old mouth; a path's way kept closed
test('an older save renewed: unseen north rooms made mountains, seen ones kept, paths cut again, the kept copies too', () => {
  for (const seed of [1, 4, 72, 4127]) {
    const w = makeWorld(HOME_ID, seed), m = mouthOf(seed), north = ROOMS.filter(isMountain);
    const woodsOf = (id) => ({ ...w.elsewhere[id].room, map: generateWoods(seedFor(seed, 0) + 1 + ROOMS.indexOf(id), null, { mark: true }).map });
    const elsewhere = { ...w.elsewhere }, places = { ...w.home.places };
    for (const id of north) { elsewhere[id] = { ...elsewhere[id], room: woodsOf(id) }; places[id] = { ...places[id], room: woodsOf(id) }; }
    const seenOne = north[0], seen = new Uint8Array(w.elsewhere[seenOne].seen.length); seen[5] = 1;
    elsewhere[seenOne] = { ...elsewhere[seenOne], seen };
    const side = ROOMS.find((id) => !isMountain(id) && id !== HOME_ID), path = pathsOf(seed, side)[0], t = pathTiles(path)[PATH >> 1];
    const shut = elsewhere[side].room.map.map((line, y) => (y === t.y ? line.slice(0, t.x) + 'G' + line.slice(t.x + 1) : line));
    elsewhere[side] = { ...elsewhere[side], room: { ...elsewhere[side].room, map: shut } };
    places[HOME_ID] = { ...places[HOME_ID], room: { ...places[HOME_ID].room, map: generateWoods(seedFor(seed, 0), m).map } };
    const up = UPGRADES[21](UPGRADES[20]({ ...w, elsewhere, home: { ...w.home, places } })); // and its stone moved (D-753)
    for (const id of north.slice(1)) {
      assert.deepEqual(up.elsewhere[id].room.map, beginPlace(id, seed).room.map, `seed ${seed} ${id}`);
      assert.deepEqual(up.home.places[id].room.map, beginPlace(id, seed).room.map);
    }
    assert.ok(!up.elsewhere[seenOne].room.map.join('').includes('R'), 'a north room already seen stays woods');
    assert.equal(up.elsewhere[side].room.map[t.y][t.x], '.', 'the bush in the path cut');
    assert.deepEqual(up.home.places[HOME_ID].room.map, beginPlace(HOME_ID, seed).room.map, 'Reset at home has today\'s home');
    assert.deepEqual(up.room.map, w.room.map, 'a room already open is kept as it was');
  }
});

test('every woods room\'s pond holds the home pond\'s fish', () => {
  for (const id of ROOMS.filter((r) => !isMountain(r))) assert.equal(fishHere(goToPlace(makeWorld('first', 3), id)), POND_FISH);
  assert.notEqual(fishHere(makeWorld('first', 3)), POND_FISH);
});
