// § waystone: the home waystone, 3 × 3 (D-620) and asleep, north of the woods' middle (D-579, D-587, D-589)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateWoods, STONE_UP } from '../src/core/woods.js';
import { mouthOf, stoneHome } from '../src/core/mouth.js';
import { makeRoom, tileAt } from '../src/core/room.js';
import { LANDMARKS, get } from '../src/core/registry.js';
import { around } from '../src/core/landmarks.js';

const SEEDS = Array.from({ length: 500 }, (_, i) => i + 1);
const PLAN = LANDMARKS.waystone.plan;

test('waystone: its plan is 3 × 3, a walked cross, a standing stone in each corner, the plate in the middle', () => {
  assert.deepEqual(PLAN, ['YXY', 'XZX', 'YXY']);
  assert.ok(get('standingStone').solid && get('standingStone').blocksLight); // like rock
  assert.ok(!get('waystonePath').solid && !get('waystonePlate').solid);
  for (const id of ['standingStone', 'waystonePath', 'waystonePlate']) assert.equal(get(id).name, 'Waystone');
});

test('waystone: every home woods room has it, north of the middle, ringed by open grass', () => {
  for (const seed of SEEDS) {
    const w = generateWoods(seed, mouthOf(seed)), room = makeRoom(w.map), sx = w.start.x, sy = w.start.y - STONE_UP;
    PLAN.forEach((row, j) => [...row].forEach((ch, i) => assert.equal(w.map[sy - 1 + j][sx - 1 + i], ch, `seed ${seed}`)));
    assert.equal(w.start.y, sy + 2); // the start is just below the south arm
    for (const t of around(LANDMARKS.waystone, sx, sy, 1)) {
      if (Math.max(Math.abs(t.x - sx), Math.abs(t.y - sy)) === 2) assert.equal(tileAt(room, t.x, t.y).id, 'floor', `seed ${seed} ${t.x},${t.y}`);
    }
    assert.ok(!w.items.some((it) => Math.abs(it.x - sx) <= 1 && Math.abs(it.y - sy) <= 1), `seed ${seed}: a stick on the stone`);
  }
});

// § old saves: the stone set once at the nearest clear spot, nothing of the hero's moved (D-589)
import { makeWorld } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';
import { upgradeState, UPGRADES } from '../src/core/save.js';

// A woods room from before the stone: its tiles grass again, `extra` letters set at x, y
const unstoned = (room, extra = []) => {
  const g = room.map.map((l) => [...l.replace(/[XYZ]/g, '.')]);
  for (const [x, y, ch] of extra) g[y][x] = ch;
  return { ...room, map: g.map((r) => r.join('')) };
};
const plateIn = (room) => { for (let y = 0; y < room.rows; y++) { const x = room.map[y].indexOf('Z'); if (x >= 0) return { x, y }; } return null; };
// A world as a save from before D-753 had it: no cave mouth's room kept yet, so no stone there
const oldWorld = (seed) => {
  const w = makeWorld('first', seed), id = stoneHome(seed), elsewhere = { ...w.elsewhere }, places = { ...w.home.places };
  delete elsewhere[id]; delete places[id];
  return { ...w, elsewhere, home: { ...w.home, places } };
};

test('waystone: an old save gets it in the woods once, where a new game puts it when that is clear', () => {
  const w = oldWorld(5), woods = w.elsewhere.woods;
  const old = { ...w, elsewhere: { ...w.elsewhere, woods: { ...woods, room: unstoned(woods.room) } } };
  const s = UPGRADES[12](old), at = plateIn(s.elsewhere.woods.room);
  assert.deepEqual(at, { x: woods.room.cols >> 1, y: (woods.room.rows >> 1) - STONE_UP });
  assert.deepEqual(UPGRADES[12](s), s); // once
  assert.ok(plateIn(s.home.places.woods.room)); // the room as it began has it too
  const now = upgradeState(12, old); // then moved to the cave mouth's room (D-753)
  assert.equal(plateIn(now.elsewhere.woods.room), null);
  assert.ok(plateIn(now.elsewhere[stoneHome(5)].room));
});

test('waystone: a built thing on the spot stays, and the stone stands at the nearest clear spot', () => {
  const w = oldWorld(5), woods = w.elsewhere.woods, cx = woods.room.cols >> 1, cy = (woods.room.rows >> 1) - STONE_UP;
  const room = unstoned(woods.room, [[cx, cy, 'W'], [cx + 1, cy, 'C']]); // a workbench and a chest
  const s = UPGRADES[12]({ ...w, elsewhere: { ...w.elsewhere, woods: { ...woods, room, taken: [{ id: 'tree', x: cx, y: cy + 7, at: 0 }] } } });
  const got = s.elsewhere.woods.room, at = plateIn(got);
  assert.ok(at && (at.x !== cx || at.y !== cy));
  assert.equal(got.map[cy][cx], 'W'); assert.equal(got.map[cy][cx + 1], 'C');
  for (const a of around(LANDMARKS.waystone, at.x, at.y)) assert.ok(!['W', 'C'].includes(room.map[a.y][a.x]));
  makeRoom(got.map); // every letter known
});

test('waystone: in the woods, the hero is never under the stone', () => {
  const w = goToPlace(oldWorld(9), 'woods'), cx = w.room.cols >> 1, cy = (w.room.rows >> 1) - STONE_UP;
  const s = UPGRADES[12]({ ...w, room: unstoned(w.room), hero: { x: cx, y: cy } });
  const at = plateIn(s.room);
  assert.ok(at);
  assert.ok(Math.abs(at.x - cx) > 2 || Math.abs(at.y - cy) > 2);
});

// § waking: stepping onto the plate wakes it, for good (D-591)
import { step } from '../src/core/turn.js';
import { glowsIn } from '../src/core/stairs.js';
import { shownLine } from '../src/core/lines.js';

// The home woods with the hero just below the plate, at the foot of the cross's middle
const belowPlate = () => {
  const s = goToPlace(makeWorld('first', 5), stoneHome(5)), at = plateIn(s.room);
  return { ...s, hero: { x: at.x, y: at.y + 1 }, enemies: [], events: [] };
};

test('waking: a step onto the sleeping plate wakes it, its line said, in one turn', () => {
  const s = belowPlate(), at = plateIn(s.room), out = step(s, 'up');
  assert.deepEqual(out.hero, at);
  assert.equal(tileAt(out.room, at.x, at.y).id, 'wokenPlate');
  assert.equal(out.turn, s.turn + 1); // the step is the turn, nothing more
  assert.deepEqual(out.events.filter((e) => e.type === 'stoneWake'), [{ type: 'stoneWake', ...at }]);
  assert.equal(shownLine(out)?.text, 'The waystone wakes.');
});

test('waking: a woken plate stays woken, walkable, and wakes no more', () => {
  const s = belowPlate(), woke = step(s, 'up'), off = step(woke, 'down'), back = step(off, 'up');
  assert.equal(tileAt(back.room, back.hero.x, back.hero.y).id, 'wokenPlate');
  assert.ok(!back.events.some((e) => e.type === 'stoneWake'));
  assert.ok(!get('wokenPlate').solid && !get('wokenPlate').blocksLight);
  assert.equal(get('wokenPlate').name, 'Waystone');
});

test('waking: a woken plate glows faintly, like the stairs; a sleeping one gives no light', () => {
  const s = belowPlate(), at = plateIn(s.room), woke = step(s, 'up');
  assert.ok(!glowsIn(s.room, null).some((g) => g.x === at.x * 16 + 8 && g.y === at.y * 16 + 8));
  const g = glowsIn(woke.room, null).find((l) => l.x === at.x * 16 + 8 && l.y === at.y * 16 + 8);
  assert.deepEqual(g && [g.r, g.cr, g.cg, g.cb], [16, get('stairsDown').glow.cr, get('stairsDown').glow.cg, get('stairsDown').glow.cb]);
});

test('waking: its room keeps it woken after going away and coming back', () => {
  const woke = step(belowPlate(), 'up'), at = woke.hero, away = goToPlace(woke, 'first'), back = goToPlace(away, stoneHome(5));
  assert.equal(tileAt(back.room, at.x, at.y).id, 'wokenPlate');
});

// § smaller: a save's 5 × 5 waystones made 3 × 3 where they stand, once (D-620)
import { shrinkMap } from '../src/core/smallstone.js';
import { FORMAT } from '../src/core/save.js';

const BIG = ['.......', '.YYXYY.', '.YYXYY.', '.XXAXX.', '.YYXYY.', '.YYXYY.', '.......'];
test('waystone: an old 5 × 5 stone becomes 3 × 3 where it stands, woken as it was, once', () => {
  const small = shrinkMap(BIG);
  assert.deepEqual(small, ['.......', '.......', '..YXY..', '..XAX..', '..YXY..', '.......', '.......']);
  assert.deepEqual(shrinkMap(small), small); // once
  assert.deepEqual(shrinkMap(['YXY', 'XZX', 'YXY']), ['YXY', 'XZX', 'YXY']); // a new one stays
  makeRoom(small);
});

test('waystone: an old save has every waystone made 3 × 3: here, elsewhere and as the woods began', () => {
  assert.ok(FORMAT >= 18); // the cells came after it, then the halls and large rooms (D-645)
  const w = makeWorld('first', 5), woods = w.elsewhere.woods, big = { ...woods, room: { ...woods.room, map: woods.room.map.map((l, y) => (y >= 1 && y <= 7 ? l.slice(0, 1) + BIG[y - 1] + l.slice(8) : l)) } };
  const old = { ...w, elsewhere: { ...w.elsewhere, woods: big }, home: { ...w.home, places: { ...w.home.places, woods: big } }, room: { ...w.room, map: BIG } };
  const s = UPGRADES[15](old), want = shrinkMap(big.room.map);
  assert.deepEqual(s.elsewhere.woods.room.map, want);
  assert.deepEqual(s.home.places.woods.room.map, want);
  assert.deepEqual(s.room.map, shrinkMap(BIG));
  assert.deepEqual(UPGRADES[15](s), s);
});
