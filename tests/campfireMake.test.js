// § building a campfire (D-850, D-851): made on the bag's Make tab from 3 Stone and 2 Wood, its
// recipe its own `made`, 1 carried, and set down on the surface as cold ashes, lit with oil as before
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY, FIRST_ROOM, tileAt } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, setDown } from '../src/core/turn.js';
import { makeFrom } from '../src/core/bagturn.js';
import { bagMakes, makesWords, makeFor } from '../src/core/bagmake.js';
import { shownLine, LINES } from '../src/core/lines.js';

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const outside = (bag = [{ id: 'bagCampfire', n: 1 }]) => ({ ...makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 }), bag });

test('the Make tab shows it once Stone and Wood have been held: 3 Stone and 2 Wood, dim with too few', () => {
  const make = (bag) => bagMakes(outside(bag)).find((m) => m.item === 'bagCampfire');
  assert.equal(make([{ id: 'stone', n: 3 }]), undefined);
  assert.deepEqual(make([{ id: 'stone', n: 3 }, { id: 'wood', n: 2 }]), { from: 'bagCampfire', item: 'bagCampfire', cost: [{ id: 'stone', n: 3, have: 3 }, { id: 'wood', n: 2, have: 2 }], dim: false });
  assert.equal(make([{ id: 'stone', n: 3 }, { id: 'wood', n: 1 }]).dim, true);
  assert.equal(makesWords('bagCampfire'), 'Makes a Campfire');
});

test("Stone's and Wood's MAKE still open their own recipes, and the campfire's button stays Set down", () => {
  const s = outside([{ id: 'stone', n: 4 }, { id: 'wood', n: 3 }]), makes = bagMakes(s);
  assert.equal(makes[makeFor(s, 'stone')].item, 'mortar');
  assert.equal(makes[makeFor(s, 'wood')].item, 'workbench');
  assert.equal(get('bagCampfire').craft, undefined);
  assert.ok(get('bagCampfire').sets);
});

test('MAKE takes its cost and puts it in the bag, one carried', () => {
  const made = makeFrom(outside([{ id: 'stone', n: 4 }, { id: 'wood', n: 2 }]), 'bagCampfire');
  assert.deepEqual(made.bag, [{ id: 'stone', n: 1 }, { id: 'bagCampfire', n: 1 }]);
  assert.equal(made.turn, 1);
  assert.equal(shownLine(made).text, 'You make a campfire.');
  assert.equal(get('bagCampfire').max, 1);
  const again = makeFrom(outside([{ id: 'stone', n: 3 }, { id: 'wood', n: 2 }, { id: 'bagCampfire', n: 1 }]), 'bagCampfire');
  assert.equal(shownLine(again).text, 'You already carry a campfire.');
  assert.equal(again.turn, 0);
});

test('it is set down on the surface as cold ashes, and only there', () => {
  const set = setDown(outside(), 0, 'right');
  assert.equal(tileAt(set.room, 3, 2).id, 'ownAshes'); // your own cold ashes (D-853)
  assert.deepEqual(set.bag, []);
  assert.equal(shownLine(set).text, 'You lay the stones in a ring.');
  const below = setDown({ ...makeState(makeRoom(FIRST_ROOM)), bag: [{ id: 'bagCampfire', n: 1 }] }, 0, 'right');
  assert.equal(shownLine(below).text, 'Only on the surface.');
});

test('choosing it says one of its plain words', () => {
  assert.deepEqual(LINES[get('bagCampfire').look].texts, ['Stones and wood for a campfire.', 'Set it down on the surface.', 'Light it with a little oil.']);
});
