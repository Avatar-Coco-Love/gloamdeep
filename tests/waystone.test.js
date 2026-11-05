// § waystone: the home waystone, 5 × 5 and asleep, north of the woods' middle (D-579, D-587, D-589)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateWoods, STONE_UP } from '../src/core/woods.js';
import { mouthOf } from '../src/core/mouth.js';
import { makeRoom, tileAt } from '../src/core/room.js';
import { LANDMARKS, get } from '../src/core/registry.js';
import { around } from '../src/core/landmarks.js';

const SEEDS = Array.from({ length: 500 }, (_, i) => i + 1);
const PLAN = LANDMARKS.waystone.plan;

test('waystone: its plan is 5 × 5, a walked cross, standing stones on the corners, the plate in the middle', () => {
  assert.deepEqual(PLAN, ['YYXYY', 'YYXYY', 'XXZXX', 'YYXYY', 'YYXYY']);
  assert.ok(get('standingStone').solid && get('standingStone').blocksLight); // like rock
  assert.ok(!get('waystonePath').solid && !get('waystonePlate').solid);
  for (const id of ['standingStone', 'waystonePath', 'waystonePlate']) assert.equal(get(id).name, 'Waystone');
});

test('waystone: every home woods room has it, north of the middle, ringed by open grass', () => {
  for (const seed of SEEDS) {
    const w = generateWoods(seed, mouthOf(seed)), room = makeRoom(w.map), sx = w.start.x, sy = w.start.y - STONE_UP;
    PLAN.forEach((row, j) => [...row].forEach((ch, i) => assert.equal(w.map[sy - 2 + j][sx - 2 + i], ch, `seed ${seed}`)));
    assert.equal(w.start.y, sy + 3); // the start is just below the south arm
    for (const t of around(LANDMARKS.waystone, sx, sy, 1)) {
      if (Math.max(Math.abs(t.x - sx), Math.abs(t.y - sy)) === 3) assert.equal(tileAt(room, t.x, t.y).id, 'floor', `seed ${seed} ${t.x},${t.y}`);
    }
    assert.ok(!w.items.some((it) => Math.abs(it.x - sx) <= 2 && Math.abs(it.y - sy) <= 2), `seed ${seed}: a stick on the stone`);
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

test('waystone: an old save gets it in the woods once, where a new game puts it when that is clear', () => {
  const w = makeWorld('first', 5), woods = w.elsewhere.woods;
  const old = { ...w, elsewhere: { ...w.elsewhere, woods: { ...woods, room: unstoned(woods.room) } } };
  const s = UPGRADES[12](old), at = plateIn(s.elsewhere.woods.room);
  assert.deepEqual(at, { x: woods.room.cols >> 1, y: (woods.room.rows >> 1) - STONE_UP });
  assert.deepEqual(UPGRADES[12](s), s); // once
  assert.ok(plateIn(s.home.places.woods.room)); // the room as it began has it too
  assert.equal(upgradeState(12, old).elsewhere.woods.room.map.join(), s.elsewhere.woods.room.map.join());
});

test('waystone: a built thing on the spot stays, and the stone stands at the nearest clear spot', () => {
  const w = makeWorld('first', 5), woods = w.elsewhere.woods, cx = woods.room.cols >> 1, cy = (woods.room.rows >> 1) - STONE_UP;
  const room = unstoned(woods.room, [[cx, cy, 'W'], [cx + 1, cy, 'C']]); // a workbench and a chest
  const s = UPGRADES[12]({ ...w, elsewhere: { ...w.elsewhere, woods: { ...woods, room, taken: [{ id: 'tree', x: cx, y: cy + 7, at: 0 }] } } });
  const got = s.elsewhere.woods.room, at = plateIn(got);
  assert.ok(at && (at.x !== cx || at.y !== cy));
  assert.equal(got.map[cy][cx], 'W'); assert.equal(got.map[cy][cx + 1], 'C');
  for (const a of around(LANDMARKS.waystone, at.x, at.y)) assert.ok(!['W', 'C'].includes(room.map[a.y][a.x]));
  makeRoom(got.map); // every letter known
});

test('waystone: in the woods, the hero is never under the stone', () => {
  const w = goToPlace(makeWorld('first', 9), 'woods'), cx = w.room.cols >> 1, cy = (w.room.rows >> 1) - STONE_UP;
  const s = UPGRADES[12]({ ...w, room: unstoned(w.room), hero: { x: cx, y: cy } });
  const at = plateIn(s.room);
  assert.ok(at);
  assert.ok(Math.abs(at.x - cx) > 2 || Math.abs(at.y - cy) > 2);
});
