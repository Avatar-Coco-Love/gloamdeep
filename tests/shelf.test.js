// § shelf: the relic shelf (step 20, D-689, D-690), made at the workbench from 4 Wood and 2
// Stone, set down on the surface as the shelf tile, empty, and taken down whole from its ask card
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY, tileAt } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, setDown, takeDown, panelBeside } from '../src/core/turn.js';
import { benchMakes, TAKE_ASKS } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const outside = (bag = [{ id: 'shelf', n: 1 }]) => ({ ...makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 }), bag });

test("the Shelf is the bench's last slot: 4 Wood and 2 Stone, dim with too few; Make takes it", () => {
  const made = benchMakes([{ id: 'wood', n: 4 }, { id: 'stone', n: 2 }]).at(-1);
  assert.deepEqual(made, { item: 'shelf', cost: [{ id: 'wood', n: 4, have: 4 }, { id: 'stone', n: 2, have: 2 }], dim: false });
  assert.equal(benchMakes([{ id: 'wood', n: 3 }, { id: 'stone', n: 2 }]).at(-1).dim, true);
  assert.equal(get('shelf').max, 1);
  const bag = makeAt(outside([{ id: 'wood', n: 5 }, { id: 'stone', n: 2 }]), 'shelf');
  assert.deepEqual(bag.bag, [{ id: 'wood', n: 1 }, { id: 'shelf', n: 1 }]);
  assert.equal(shownLine(bag).text, 'You make a shelf.');
  assert.equal(shownLine(makeAt(outside([{ id: 'wood', n: 4 }]), 'shelf')).text, 'You need 4 Wood, 2 Stone.');
});

test('the bench still shows 12 slots at most, whichever bag upgrade is offered', () => {
  for (const size of [6, 9, 12]) assert.ok(benchMakes([], size).length <= 12, `bag of ${size}`);
});

test('it is set down on the surface as the shelf tile, solid, and taken down whole', () => {
  const set = setDown(outside(), 0, 'right');
  assert.equal(tileAt(set.room, 3, 2).id, 'relicShelf');
  assert.equal(get('relicShelf').solid, true);
  assert.equal(shownLine(set).text, 'You set down the shelf.');
  const back = takeDown(set, 3, 2);
  assert.deepEqual(back.bag, [{ id: 'shelf', n: 1 }]);
  assert.equal(tileAt(back.room, 3, 2).id, 'floor');
  assert.equal(shownLine(back).text, 'You take down the shelf.');
});

test('bumped, day or night, it opens its ask card, Deconstruct shelf?, empty', () => {
  const set = setDown(outside(), 0, 'right');
  for (const turn of [0, 200]) assert.deepEqual(panelBeside({ ...set, turn }, 'right'), { x: 3, y: 2 });
  assert.equal(get('relicShelf').panel, 'bed');
  assert.deepEqual(TAKE_ASKS.relicShelf, ['Deconstruct shelf?', 'Nothing on it yet.']);
});
