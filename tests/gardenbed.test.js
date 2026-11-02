// § garden bed: garden step 2 (D-565), made at the workbench from 3 Wood and 2 Stone, set
// down on the surface as the garden bed tile, and taken down whole from its ask card
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY, tileAt } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, setDown, takeDown, panelBeside } from '../src/core/turn.js';
import { benchMakes, TAKE_ASKS } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const outside = (bag = [{ id: 'gardenBed', n: 1 }]) => ({ ...makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 }), bag });

test('the garden bed is the bench\'s last slot: 3 Wood and 2 Stone, dim with too few; Make takes it', () => {
  const made = benchMakes([{ id: 'wood', n: 3 }, { id: 'stone', n: 2 }]).find((m) => m.item === 'gardenBed');
  assert.deepEqual(made, { item: 'gardenBed', cost: [{ id: 'wood', n: 3, have: 3 }, { id: 'stone', n: 2, have: 2 }], dim: false });
  assert.equal(benchMakes([]).at(-1).item, 'gardenBed');
  assert.equal(benchMakes([{ id: 'wood', n: 3 }]).at(-1).dim, true);
  const bag = makeAt(outside([{ id: 'wood', n: 4 }, { id: 'stone', n: 2 }]), 'gardenBed');
  assert.deepEqual(bag.bag, [{ id: 'wood', n: 1 }, { id: 'gardenBed', n: 1 }]);
  assert.equal(shownLine(bag).text, 'You make a garden bed.');
  assert.equal(shownLine(makeAt(outside([{ id: 'wood', n: 3 }]), 'gardenBed')).text, 'You need 3 Wood, 2 Stone.');
});

test('it is set down on the surface as the garden bed tile, solid, and taken down whole', () => {
  const set = setDown(outside(), 0, 'right');
  assert.equal(tileAt(set.room, 3, 2).id, 'plot');
  assert.equal(get('plot').solid, true);
  assert.equal(shownLine(set).text, 'You set down the garden bed.');
  const back = takeDown(set, 3, 2);
  assert.deepEqual(back.bag, [{ id: 'gardenBed', n: 1 }]);
  assert.equal(tileAt(back.room, 3, 2).id, 'floor');
  assert.equal(shownLine(back).text, 'You take down the garden bed.');
});

test('bumped, day or night, it opens its card: Garden bed, Plant and Deconstruct (D-566)', () => {
  const set = setDown(outside(), 0, 'right');
  for (const turn of [0, 200]) assert.deepEqual(panelBeside({ ...set, turn }, 'right'), { x: 3, y: 2 });
  assert.equal(get('plot').panel, 'bed');
  assert.deepEqual(TAKE_ASKS.plot, ['Garden bed', 'Nothing grows here yet.']);
});
