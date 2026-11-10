// § echo charm: Bat Wing's first use (D-799, D-805), made at the workbench's GEAR tab from 3 Bat Wing
// and 1 Copper Ore; worn, each creature within 4 tiles, walls or not, that no light shines on is echoed
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, FIRST_START } from '../src/core/turn.js';
import { benchMakes, benchTabOf } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { wear, echoOf } from '../src/core/worn.js';
import { echoed } from '../src/core/echo.js';
import { litAt } from '../src/core/sight.js';

const room = makeRoom(FIRST_ROOM);
const start = (bag) => ({ ...makeState(room), bag });
const worn = { charm: ['echoCharm'] };
const hero = { x: 5, y: 11 };
const dark = (enemies, more = {}) => ({ ...makeState(room, FIRST_START, [], []), hero, enemies, lit: false, ...more });
const ids = (s) => echoed(s).map((e) => `${e.id}@${e.x},${e.y}`);

test("the Echo Charm is the GEAR tab's last slot: 3 Bat Wing and 1 Copper Ore, dim with too few", () => {
  const c = get('echoCharm');
  assert.equal(c.name, 'Echo Charm'); assert.equal(c.max, 1); assert.deepEqual(c.wear, { slot: 'charm', echo: 4 });
  const slot = benchMakes([{ id: 'batWing', n: 3 }, { id: 'copperOre', n: 1 }], 6, [], benchTabOf('gear').makes).at(-1);
  assert.deepEqual(slot, { item: 'echoCharm', cost: [{ id: 'batWing', n: 3, have: 3 }, { id: 'copperOre', n: 1, have: 1 }], dim: false });
  assert.equal(benchMakes([{ id: 'batWing', n: 2 }, { id: 'copperOre', n: 1 }], 6, [], benchTabOf('gear').makes).at(-1).dim, true);
});

test('Make takes its cost, a turn; too few or one worn is free', () => {
  const s = start([{ id: 'batWing', n: 5 }, { id: 'copperOre', n: 1 }]);
  const made = makeAt(s, 'echoCharm');
  assert.deepEqual(made.bag, [{ id: 'batWing', n: 2 }, { id: 'echoCharm', n: 1 }]);
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'You make an echo charm.');
  assert.equal(shownLine(makeAt(start([{ id: 'copperOre', n: 1 }]), 'echoCharm')).text, 'Need 3 Bat Wing, 1 Copper Ore.');
  const has = makeAt({ ...s, worn }, 'echoCharm');
  assert.equal(has.turn, s.turn);
  assert.equal(shownLine(has).text, 'You already have an echo charm.');
});

test('Wear puts it on beside another charm, free', () => {
  const s = { ...start([{ id: 'echoCharm', n: 1 }]), worn: { charm: ['heartCharm'] } };
  const n = wear(s, 0);
  assert.deepEqual(n.worn.charm, ['heartCharm', 'echoCharm']);
  assert.equal(n.turn, s.turn);
  assert.equal(shownLine(n).text, 'You put on the echo charm.');
  assert.equal(echoOf(n), 4); assert.equal(echoOf(s), 0);
});

test('worn, creatures in the dark within 4 tiles are echoed, diagonals one step; none without it', () => {
  const rats = [{ id: 'rat', x: 9, y: 11 }, { id: 'rat', x: 9, y: 7 }, { id: 'rat', x: 10, y: 11 }, { id: 'rat', x: 5, y: 6 }];
  for (const r of rats) assert.equal(litAt(dark(rats), r.x, r.y), false);
  assert.deepEqual(ids(dark(rats, { worn })), ['rat@9,11', 'rat@9,7']);
  assert.deepEqual(ids(dark(rats)), []);
});

test('one on a lit tile is not echoed; it shows in the light already', () => {
  const s = dark([{ id: 'rat', x: 6, y: 11 }], { worn, lit: true, oil: 1 });
  assert.equal(litAt(s, 6, 11), true);
  assert.deepEqual(ids(s), []);
});

test('one in disguise stays hidden, one with its own glow shows already', () => {
  const s = dark([{ id: 'flaskMimic', x: 6, y: 11, asleep: true }, { id: 'lureWisp', x: 7, y: 11 }, { id: 'flaskMimic', x: 8, y: 11 }], { worn });
  assert.deepEqual(ids(s), ['flaskMimic@8,11']);
});

test('one behind a wall, the lantern lit, is echoed too', () => {
  const s = dark([{ id: 'rat', x: 2, y: 8 }], { worn, lit: true, oil: 1, hero: { x: 4, y: 10 } });
  assert.equal(litAt(s, 2, 8), false); // the wall at 3, 9 shades it
  assert.deepEqual(ids(s), ['rat@2,8']);
});
