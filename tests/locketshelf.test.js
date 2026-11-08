// § locketShelf: the locket set on the shelf (step 20, D-693): bumped with the locket in the
// bag, the shelf asks to take it; Yes sets it there for good; taken down, both go back together
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY, tileAt } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, setDown, takeDown, shelve, canShelve, panelBeside } from '../src/core/turn.js';
import { TAKE_ASKS, SHELVE_ASK, SHELVE_MENU } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { bagSize } from '../src/core/bag.js';

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const outside = (bag) => ({ ...makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 }), bag });
const shelfSet = (bag = []) => { const s = setDown(outside([{ id: 'shelf', n: 1 }, ...bag]), 0, 'right'); return { ...s, line: null }; };

test('with the locket in the bag, the shelf asks to set it there, No picked', () => {
  const set = shelfSet([{ id: 'locket', n: 1 }]);
  assert.equal(canShelve(set, 3, 2), true);
  assert.equal(canShelve(shelfSet(), 3, 2), false);
  assert.deepEqual(panelBeside(set, 'right'), { x: 3, y: 2 });
  assert.deepEqual(SHELVE_ASK, ['Set the locket on the shelf?', 'Kept close, whatever the dark took.']);
  assert.deepEqual(SHELVE_MENU.map((l) => l.text), ['Yes', 'No']);
  assert.equal(SHELVE_MENU.findIndex((l) => l.id === 'no'), 1);
});

test('Yes sets the locket on the shelf, from the bag, in a turn, with its line', () => {
  const set = shelfSet([{ id: 'locket', n: 1 }]), on = shelve(set, 3, 2);
  assert.equal(tileAt(on.room, 3, 2).id, 'locketShelf');
  assert.deepEqual(on.bag, []);
  assert.equal(on.turn, set.turn + 1);
  assert.equal(shownLine(on).text, 'You set the locket on the shelf.');
  assert.ok(on.events.some((e) => e.type === 'shelve' && e.id === 'locket'));
  const empty = shelfSet();
  assert.equal(shelve(empty, 3, 2), empty); // no locket in the bag: nothing changes
});

test('once set, it stays: the shelf asks Deconstruct shelf?, "The locket rests here."', () => {
  const on = shelve(shelfSet([{ id: 'locket', n: 1 }]), 3, 2);
  assert.equal(get('locketShelf').panel, 'bed');
  assert.equal(get('locketShelf').solid, true);
  assert.equal(canShelve(on, 3, 2), false);
  assert.deepEqual(TAKE_ASKS.locketShelf, ['Deconstruct shelf?', 'The locket rests here.']);
});

test('deconstructed, the shelf and the locket go back in the bag together, or neither', () => {
  const on = shelve(shelfSet([{ id: 'locket', n: 1 }]), 3, 2), back = takeDown(on, 3, 2);
  assert.deepEqual(back.bag, [{ id: 'shelf', n: 1 }, { id: 'locket', n: 1 }]);
  assert.equal(tileAt(back.room, 3, 2).id, 'floor');
  const fill = Array.from({ length: bagSize(on) - 1 }, (_, i) => ({ id: ['flask', 'herb', 'oilcap', 'heartcap', 'stone', 'wood', 'copperOre', 'ratTail', 'mothDust', 'spiderSilk', 'batWing'][i], n: 1 }));
  const full = takeDown({ ...on, bag: fill }, 3, 2);
  assert.equal(tileAt(full.room, 3, 2).id, 'locketShelf');
  assert.deepEqual(full.bag, fill);
  assert.equal(shownLine(full).text, 'Your bag is full.');
});
