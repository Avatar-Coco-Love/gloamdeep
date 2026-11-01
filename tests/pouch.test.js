// The Pouch and the Big Bag (D-545, D-547, D-548): made at the workbench, they grow the bag
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, step, itemAt, HERO_HEALTH } from '../src/core/turn.js';
import { benchMakes } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { spawn } from '../src/core/spawn.js';
import { bagSize, bagCols } from '../src/core/bag.js';
import { moveChest, CHEST_BAG, CHEST_TAKE } from '../src/core/chest.js';

const start = (bag, more = {}) => ({ ...makeState(makeRoom(FIRST_ROOM)), bag, ...more });
const pouchCost = [{ id: 'ratTail', n: 4 }, { id: 'spiderSilk', n: 2 }];
const bigCost = [{ id: 'moleFur', n: 4 }, { id: 'spiderSilk', n: 3 }];

test('a bag holds 6 until the Pouch; 3 wide, 4 wide for 12', () => {
  assert.equal(bagSize(start([])), 6);
  assert.equal(bagCols(6), 3);
  assert.equal(bagCols(9), 3);
  assert.equal(bagCols(12), 4);
  assert.equal(get('pouch').name, 'Pouch');
  assert.equal(get('bigBag').name, 'Big Bag');
});

test('the bench shows the Pouch at 6 slots, the Big Bag at 9, neither at 12', () => {
  const items = (size) => benchMakes([], size).map((m) => m.item);
  assert.ok(items(6).includes('pouch'));
  assert.ok(!items(6).includes('bigBag'));
  assert.ok(items(9).includes('bigBag'));
  assert.ok(!items(9).includes('pouch'));
  assert.ok(!items(12).includes('pouch') && !items(12).includes('bigBag'));
  const pouch = benchMakes(pouchCost).find((m) => m.item === 'pouch');
  assert.deepEqual(pouch, { item: 'pouch', cost: [{ id: 'ratTail', n: 4, have: 4 }, { id: 'spiderSilk', n: 2, have: 2 }], dim: false });
});

test('Make on the Pouch takes 4 Rat Tail and 2 Spider Silk, a turn, and the bag holds 9', () => {
  const s = start([{ id: 'ratTail', n: 5 }, { id: 'spiderSilk', n: 2 }]);
  const made = makeAt(s, 'pouch');
  assert.deepEqual(made.bag, [{ id: 'ratTail', n: 1 }]);
  assert.equal(bagSize(made), 9);
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'Your bag holds 9 now.');
  const few = makeAt(start([{ id: 'ratTail', n: 3 }]), 'pouch');
  assert.equal(few.turn, s.turn);
  assert.equal(shownLine(few).text, 'You need 4 Rat Tail and 2 Spider Silk.');
  assert.equal(shownLine(makeAt({ ...made, bag: pouchCost }, 'pouch')).text, 'Your bag already holds 9.');
});

test('the Big Bag needs the Pouch first, then takes 4 Mole Fur and 3 Spider Silk for 12', () => {
  const early = start(bigCost);
  assert.deepEqual(makeAt(early, 'bigBag'), early);
  const s = start(bigCost, { bagSlots: 9 }), made = makeAt(s, 'bigBag');
  assert.deepEqual(made.bag, []);
  assert.equal(bagSize(made), 12);
  assert.equal(shownLine(made).text, 'Your bag holds 12 now.');
  assert.equal(shownLine(makeAt(start([], { bagSlots: 9 }), 'bigBag')).text, 'You need 4 Mole Fur and 3 Spider Silk.');
  assert.equal(shownLine(makeAt({ ...made, bag: bigCost }, 'bigBag')).text, 'Your bag already holds 12.');
});

test('a bigger bag takes a find a 6-slot bag has no room for', () => {
  const full = Array.from({ length: 6 }, () => ({ id: 'stone', n: 20 }));
  const at6 = step({ ...spawn(start(full), 'herb', 5, 10), health: HERO_HEALTH }, 'up');
  assert.equal(itemAt(at6, 5, 10).id, 'herb');
  const at9 = step({ ...spawn(start(full, { bagSlots: 9 }), 'herb', 5, 10), health: HERO_HEALTH }, 'up');
  assert.deepEqual(at9.bag.at(-1), { id: 'herb', n: 1 });
});

test('on the chest\'s card the arrows follow the bag\'s grid, 3 × 3 or 4 × 3 (D-548)', () => {
  assert.equal(moveChest(CHEST_BAG + 3, 'down', 9), CHEST_BAG + 6);
  assert.equal(moveChest(CHEST_BAG + 6, 'down', 9), CHEST_TAKE);
  assert.equal(moveChest(CHEST_BAG + 2, 'down', 6), CHEST_BAG + 5);
  assert.equal(moveChest(CHEST_BAG + 3, 'right', 12), CHEST_BAG + 3);
  assert.equal(moveChest(CHEST_BAG + 2, 'right', 12), CHEST_BAG + 3);
  assert.equal(moveChest(11, 'right', 12), CHEST_BAG + 8);
  assert.equal(moveChest(CHEST_BAG + 8, 'left', 12), 11);
  assert.equal(moveChest(CHEST_BAG + 8, 'down', 12), CHEST_TAKE);
});
