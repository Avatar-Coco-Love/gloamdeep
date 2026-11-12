// § growth: an ember for each level past the first, spent on hearts (D-293)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS } from '../src/core/room.js';
import { makeState, wait, maxHealth, HERO_HEALTH } from '../src/core/turn.js';
import { embers, canBuy, buy, HEARTS_MORE } from '../src/core/growth.js';
import { grown } from '../src/core/upgrades.js';

const addHeart = (s) => buy(s, 'heart');

const room = makeRoom(FIRST_ROOM);
const at = (xp, more = {}) => ({ ...makeState(room, undefined, FIRST_LIGHTS, []), xp, ...more });

test('level 1 has no embers; each level past it gives one, older journeys too', () => {
  assert.equal(embers(at(0)), 0);
  assert.equal(embers(at(9)), 0);
  assert.equal(embers(at(10)), 1); // level 2
  assert.equal(embers(at(60)), 3); // level 4
});

test('a heart costs an ember, arrives full and stays', () => {
  const s = addHeart({ ...at(10), health: 3 });
  assert.equal(grown(s, 'heart'), 1);
  assert.equal(s.health, 4);
  assert.equal(maxHealth(s), HERO_HEALTH + 1);
  assert.equal(embers(s), 0);
  assert.equal(s.turn, 0, 'no turn passes');
});

test('no embers, no heart', () => {
  const s = at(9);
  assert.equal(canBuy(s, 'heart'), false);
  assert.equal(addHeart(s), s);
});

test('at most 5 more hearts, 10 in all', () => {
  let s = at(100000);
  for (let i = 0; i < 8; i++) s = addHeart(s);
  assert.equal(grown(s, 'heart'), HEARTS_MORE);
  assert.equal(maxHealth(s), 10);
  assert.equal(canBuy(s, 'heart'), false);
});

test('a fall wakes the hero with every heart bought, and keeps them', () => {
  const s = { ...at(10, { grown: { heart: 1 } }), health: 1, enemies: [{ id: 'rat', x: 6, y: 11 }] };
  const n = wait({ ...s, hero: { x: 5, y: 11 } });
  assert.equal(grown(n, 'heart'), 1);
  assert.equal(n.health, 6);
});

// § tree (D-462, D-481)
import { rowsOf, rowsOpen, markRows, START_PICK, upgradeAt, movePick, rowEnd, rowPlaces, told } from '../src/core/growth.js';
import { FORMAT, upgradeState } from '../src/core/save.js';
import { BRANCHES, UPGRADES } from '../src/core/upgrades.js';
import { UPGRADES as GATHERED } from '../src/core/registry.js';

test('the tree has three branches, Light, Body and Hands, and the heart is Body\'s first, in the registry', () => {
  assert.deepEqual(BRANCHES.map((b) => b.text), ['Light', 'Body', 'Hands']);
  assert.equal(upgradeAt(START_PICK), UPGRADES.heart);
  assert.equal(GATHERED, UPGRADES);
  assert.equal(upgradeAt({ col: 0, row: 0 }), UPGRADES.steadyWick, 'Light\'s first (D-798)');
  assert.equal(upgradeAt({ col: 2, row: 0 }), UPGRADES.quickHands, 'Hands\' first (D-813)');
  assert.equal(rowsOf(1), 2, 'the open row and one locked');
});

test('the arrows read a row: Left and Right walk its places across the branches, Up and Down change row, Left past its first gives null for Records (D-811)', () => {
  const steady = { col: 0, row: 0, slot: 0 }, tough = { col: 1, row: 0, slot: 1 }, hands = { col: 2, row: 0, slot: 0 };
  assert.deepEqual(movePick(START_PICK, 'right'), tough, 'Tough beside the heart');
  assert.deepEqual(movePick(tough, 'right'), hands);
  assert.deepEqual(movePick(hands, 'right'), hands, 'the row\'s end');
  assert.ok(rowEnd(hands) && !rowEnd(tough), 'Right there turns to the Bestiary');
  assert.deepEqual(movePick(tough, 'left'), START_PICK);
  assert.deepEqual(movePick(START_PICK, 'left'), steady);
  assert.equal(movePick(steady, 'left'), null);
  assert.deepEqual(movePick(tough, 'up'), { col: 1, row: 1, slot: 0 }, 'the locked row, its one place on Body');
  assert.deepEqual(movePick({ col: 1, row: 1, slot: 0 }, 'up'), { col: 1, row: 1, slot: 0 }, 'the top');
  assert.deepEqual(movePick({ col: 1, row: 1, slot: 0 }, 'down'), START_PICK);
  assert.deepEqual(movePick(START_PICK, 'down'), START_PICK, 'the bottom');
  assert.deepEqual(movePick({ col: 1, row: 1, slot: 0 }, 'right'), { col: 2, row: 1, slot: 0 });
  assert.equal(movePick({ col: 0, row: 1, slot: 0 }, 'left'), null);
  assert.deepEqual(rowPlaces(0), [steady, START_PICK, tough, hands]);
});

test('the heart\'s button is dim without an ember; a locked place has none', () => {
  assert.equal(told(at(0), START_PICK).button.can, false);
  assert.equal(told(at(10), START_PICK).button.can, true);
  assert.equal(told(at(10), { col: 1, row: 1 }).button, null);
  assert.equal(told(at(10), { col: 1, row: 1 }).name, 'Locked');
});

// § opening (D-814): row 2 opens the first time the hero is deeper than depth 8, and stays open
const deep = (place, extra = {}) => ({ ...at(10), place, elsewhere: {}, ...extra });
test('row 2 opens past depth 8, a stand-in for biome 2 (D-814)', () => {
  assert.equal(rowsOpen(deep('depth8')), 1, 'depth 8, biome 1\'s last floor, opens nothing');
  assert.equal(rowsOpen(deep('depth9')), 2);
  assert.equal(rowsOpen(deep('first', { elsewhere: { depth12: {} } })), 2, 'a deeper floor left behind counts');
  assert.equal(rowsOf(rowsOpen(deep('depth9'))), 3, 'the two open rows and one locked');
  assert.equal(rowsOpen(deep('first', { growthRows: 2 })), 2, 'the mark keeps it open, the deep rooms forgotten');
  assert.equal(rowsOpen(at(10)), 1, 'a journey nowhere yet');
});

test('the mark is kept: set once the hero is deeper, unchanged otherwise, and an old save gets it (D-814)', () => {
  const s = deep('depth8', { growthRows: 1 });
  assert.equal(markRows(s), s);
  assert.equal(markRows(deep('depth9', { growthRows: 1 })).growthRows, 2);
  assert.ok(FORMAT >= 32);
  assert.equal(upgradeState(31, deep('depth10')).growthRows, 2);
  assert.equal(upgradeState(31, deep('depth3')).growthRows, 1);
});

test('the locked row says the depth that opens it; opened, its places are to come, one a branch (D-814)', () => {
  const locked = told(deep('depth8'), { col: 0, row: 1 });
  assert.deepEqual([locked.name, locked.words, locked.button], ['Locked', 'Reach depth 9 to open.', null]);
  const open = deep('depth9');
  assert.equal(told(open, { col: 2, row: 1 }).name, 'Thrift', 'row 2 full: Quick Pour, Guard, Thrift');
  assert.deepEqual(rowPlaces(1, 2), [0, 1, 2].map((col) => ({ col, row: 1, slot: 0 })));
  assert.deepEqual(movePick({ col: 1, row: 1, slot: 0 }, 'up', 2), { col: 1, row: 2, slot: 0 }, 'row 3, locked, above');
  assert.equal(told(open, { col: 1, row: 2 }).words, 'Opens deeper down.', 'no depth set for row 3 yet');
});
