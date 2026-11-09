// § mountain: Hearthwood's north row, rocky slopes (D-738, D-733's step 4)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROOMS, isMountain } from '../src/core/hearthwood.js';
import { beginPlace, tileAt } from '../src/core/room.js';
import { depthIn } from '../src/core/woods.js';
import { LONE_IN, BOULDERS } from '../src/core/mountain.js';
import { COLS, ROWS } from '../src/core/cave.js';
import { makeWorld, step } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';

const SEEDS = Array.from({ length: 40 }, (_, i) => i + 1);
const MOUNTAINS = ['woods:0,0', 'woods:1,0', 'woods:2,0'];
const ids = (room) => { const out = []; for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) out.push({ x, y, id: tileAt(room, x, y).id }); return out; };

test('the north row is the mountain rooms, every seed; the rest are woods', () => {
  assert.deepEqual(ROOMS.filter(isMountain), MOUNTAINS);
});

test('a mountain room: no water or bush, 3 boulders off the edge, trees only as lone ones inside', () => {
  for (const seed of SEEDS) for (const id of MOUNTAINS) {
    const { room, start, items } = beginPlace(id, seed), all = ids(room);
    assert.ok(!all.some((t) => ['water', 'berryBush'].includes(t.id)), `seed ${seed} ${id}`);
    const boulders = all.filter((t) => t.id === 'deposit');
    assert.equal(boulders.length, BOULDERS, `seed ${seed} ${id}`);
    for (const b of boulders) {
      assert.ok(depthIn(b.x, b.y) >= 1);
      assert.ok(!(b.x === start.x && b.y === start.y) && !items.some((it) => it.x === b.x && it.y === b.y));
    }
    for (const t of all.filter((t) => t.id === 'tree')) assert.ok(depthIn(t.x, t.y) >= LONE_IN, `seed ${seed} ${id}: a tree at ${t.x},${t.y}`);
    assert.ok(all.filter((t) => t.id === 'outcrop').length > 60, 'mostly rock where the trees were');
  }
});

test('a mountain room keeps the woods\' 3 sticks and fallen branch', () => {
  for (const seed of SEEDS) for (const id of MOUNTAINS) {
    const { room, items } = beginPlace(id, seed);
    assert.equal(items.length, 3, `seed ${seed} ${id}`);
    assert.equal(ids(room).filter((t) => t.id === 'branch').length, 1, `seed ${seed} ${id}`);
  }
});

test('the woods rooms have no boulders, and rock only beside the cave mouth', () => {
  for (const seed of SEEDS) for (const id of ROOMS.filter((r) => !isMountain(r))) {
    const all = ids(beginPlace(id, seed).room);
    assert.ok(!all.some((t) => t.id === 'deposit'));
    assert.ok(all.filter((t) => t.id === 'outcrop').length <= 2);
  }
});

test('a mountain boulder breaks as a cave\'s does: three bumps, a Stone in the bag', () => {
  const w = goToPlace(makeWorld('first', 5), 'woods:1,0');
  const b = ids(w.room).find((t) => t.id === 'deposit' && [[0, 1], [0, -1], [1, 0], [-1, 0]].some(([dx, dy]) => !tileAt(w.room, t.x + dx, t.y + dy).solid));
  const [dx, dy, dir] = [[0, 1, 'up'], [0, -1, 'down'], [1, 0, 'left'], [-1, 0, 'right']].find(([dx, dy]) => !tileAt(w.room, b.x + dx, b.y + dy).solid);
  let s = { ...w, hero: { x: b.x + dx, y: b.y + dy }, enemies: [], bag: [] };
  for (let i = 0; i < 3; i++) s = step(s, dir);
  assert.equal(tileAt(s.room, b.x, b.y).id, 'floor');
  assert.deepEqual(s.bag, [{ id: 'stone', n: 1 }]);
});
