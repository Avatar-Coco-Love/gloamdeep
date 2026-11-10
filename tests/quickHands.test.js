// § quick hands: Hands' first upgrade (D-813), 1 ember, bought once; with it a tree, a stone
// deposit or a branch, gathered by hand, takes 1 bump fewer; a bush stays 1, tools keep theirs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, tileAt, FIRST_ROOM, withTile } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, step } from '../src/core/turn.js';
import { embers, canBuy, buyAt, told, upgradeAt } from '../src/core/growth.js';
import { bumpsFor } from '../src/core/gear.js';
import { UPGRADES, grown } from '../src/core/upgrades.js';

const HANDS = { col: 2, row: 0, slot: 0 };
const QUICK = { quickHands: 1 };

test('Quick Hands is Hands\' first, 1 ember, bought once, its picture an open hand', () => {
  assert.equal(upgradeAt(HANDS), UPGRADES.quickHands);
  assert.equal(UPGRADES.quickHands.look, 'hand');
  const n = buyAt({ xp: 10, health: 5 }, HANDS);
  assert.equal(grown(n, 'quickHands'), 1);
  assert.equal(embers(n), 0);
  assert.equal(canBuy({ ...n, xp: 60 }, 'quickHands'), false);
  assert.equal(told(n, HANDS).value, 'Bought');
});

test('bought, a tree takes 3 bumps, a deposit 2, a branch 1, a bush still 1; veins and rubble keep theirs', () => {
  const s = { grown: QUICK, tool: null };
  assert.deepEqual(['tree', 'deposit', 'branch', 'berryBush'].map((id) => bumpsFor(s, id, get(id).mine.hits)), [3, 2, 1, 1]);
  assert.deepEqual(['tree', 'deposit', 'branch'].map((id) => bumpsFor({ tool: null }, id, get(id).mine.hits)), [4, 3, 2], 'not bought');
  assert.equal(bumpsFor({ ...s, tool: 'pick' }, 'vein', 4), 4);
  assert.equal(bumpsFor({ ...s, tool: 'moleClawPick' }, 'vein', 4), 2, 'the Mole Claw Pick\'s own count');
  assert.equal(bumpsFor(s, 'rubble', 3), 3);
});

test('bought, a stone deposit breaks in 2 bumps for a Stone, a turn each', () => {
  let s = { ...makeState(withTile(makeRoom(FIRST_ROOM), 5, 10, get('deposit'))), hero: { x: 5, y: 11 }, bag: [], tool: null, grown: QUICK };
  s = step(step(s, 'up'), 'up');
  assert.equal(s.turn, 2);
  assert.equal(tileAt(s.room, 5, 10).id, 'floor');
  assert.deepEqual(s.bag, [{ id: 'stone', n: 1 }]);
});
