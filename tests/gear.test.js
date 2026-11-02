// § gear: the five gear slots on the bag's card, and the Tool slot the pick works from (D-552)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, makeAt } from '../src/core/turn.js';
import { hold } from '../src/core/bagturn.js';
import { GEAR, gearRow, gearWords, withTool, takeOff, canTakeOff } from '../src/core/gear.js';
import { upgradeState, FORMAT } from '../src/core/save.js';
import { shownLine } from '../src/core/lines.js';
import { bagAt, cardAt, bagShape, gearSlotAt, gearChosen, BUTTON, OFF_W } from '../src/render/bag.js';

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

test('Take off puts the weapon or the tool back in the bag, free, with its line (D-554)', () => {
  const s = { ...fresh(), held: 'spear', tool: 'pick', bag: [{ id: 'wood', n: 2 }] };
  const off = takeOff(s, 0);
  assert.equal(off.held, null);
  assert.equal(off.tool, 'pick');
  assert.deepEqual(off.bag, [{ id: 'wood', n: 2 }, { id: 'spear', n: 1 }]);
  assert.equal(off.turn, s.turn);
  assert.equal(shownLine(off).text, 'You put the spear away.');
  const tool = takeOff(off, 1);
  assert.equal(tool.tool, null);
  assert.equal(shownLine(tool).text, 'You put the stone pick away.');
  assert.equal(shownLine(takeOff({ ...fresh(), held: 'knife' }, 0)).text, 'You put the knife away.');
});

test('Take off with the bag full says so and keeps the piece; worn ones and empty slots stay', () => {
  const bag = ['wood', 'stone', 'copper', 'flask', 'oilcap', 'heartcap'].map((id) => ({ id, n: 1 }));
  const s = { ...fresh(), held: 'knife', bag, worn: { armour: ['ratVest'] } };
  const full = takeOff(s, 0);
  assert.equal(full.held, 'knife');
  assert.equal(shownLine(full).text, 'Your bag is full.');
  assert.equal(canTakeOff(s, 0), true);
  assert.equal(canTakeOff(s, 1), false); // empty
  assert.equal(canTakeOff(s, 2), false); // worn (D-484)
  assert.equal(takeOff(s, 2), s);
});

test('a tap on the gear row chooses its slot; Take off is in the corner when one is chosen (D-554)', () => {
  const vw = 320, vh = 180, card = cardAt(vw, vh, bagShape().detail);
  for (let g = 0; g < GEAR.length; g++) {
    const at = gearSlotAt(card, g);
    assert.deepEqual(bagAt(at.x + 5, at.y + 5, vw, vh), { gear: g });
  }
  const b = card.button;
  assert.equal(bagAt(b.x + BUTTON.w - OFF_W + 2, b.y + 3, vw, vh, false, false, false, undefined, true), 'act');
  assert.equal(bagAt(card.drop.x + 2, card.drop.y + 3, vw, vh, false, false, false, undefined, true), null);
  assert.equal(gearChosen(-2), 1);
  assert.equal(gearChosen(0), -1);
});
