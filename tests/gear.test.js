// § gear: the five gear slots on the bag's card, and the Tool slot the pick works from (D-552)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, makeAt } from '../src/core/turn.js';
import { hold } from '../src/core/bagturn.js';
import { GEAR, gearRow, gearWords, withTool } from '../src/core/gear.js';
import { upgradeState, FORMAT } from '../src/core/save.js';
import { shownLine } from '../src/core/lines.js';

const fresh = () => makeState(makeRoom(FIRST_ROOM));

test('the row is Weapon, Tool, Armour, Charm, Charm, all empty at the start', () => {
  assert.deepEqual(GEAR.map((g) => g.name), ['Weapon', 'Tool', 'Armour', 'Charm', 'Charm']);
  assert.equal(fresh().tool, null);
  assert.deepEqual(gearRow(fresh()), [null, null, null, null, null]);
});

test('the row shows the hand, the tool and what is worn', () => {
  const s = { ...fresh(), held: 'spear', tool: 'pick', worn: { armour: ['ratVest'], charm: ['wispCharm', 'heartCharm'] } };
  assert.deepEqual(gearRow(s), ['spear', 'pick', 'ratVest', 'wispCharm', 'heartCharm']);
  assert.equal(gearWords({ ...s, worn: {} }), 'Gear: Spear, Stone Pick, empty, empty, empty');
});

test('Hold on the pick puts it in the Tool slot, a turn, the weapon hand untouched', () => {
  const s = { ...fresh(), held: 'knife', bag: [{ id: 'wood', n: 2 }, { id: 'pick', n: 1 }] };
  const held = hold(s, 1);
  assert.equal(held.tool, 'pick');
  assert.equal(held.held, 'knife');
  assert.deepEqual(held.bag, [{ id: 'wood', n: 2 }]);
  assert.equal(held.turn, s.turn + 1);
  assert.equal(shownLine(held).text, 'You hold the stone pick.');
});

test('a pick made with one in the Tool slot is already carried, free', () => {
  const s = { ...fresh(), tool: 'pick', bag: [{ id: 'wood', n: 2 }, { id: 'stone', n: 3 }] };
  const again = makeAt(s, 'pick');
  assert.equal(again.turn, s.turn);
  assert.equal(shownLine(again).text, 'You already carry a stone pick.');
});

test('an older save moves its pick from the bag into the Tool slot', () => {
  assert.equal(FORMAT, 10);
  const old = { ...fresh(), bag: [{ id: 'wood', n: 1 }, { id: 'pick', n: 1 }] };
  delete old.tool;
  const s = upgradeState(9, old);
  assert.equal(s.tool, 'pick');
  assert.deepEqual(s.bag, [{ id: 'wood', n: 1 }]);
  const none = { ...old, bag: [] };
  assert.equal(withTool(none).tool, null);
});
