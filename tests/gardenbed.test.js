// § garden bed: garden step 2 (D-562), made at the workbench from 4 Wood and set down on the
// surface the bed's way; bumped, it asks to be taken down, as the bed does by day (D-565)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY, tileAt } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, setDown, takeDown, panelBeside } from '../src/core/turn.js';
import { benchMakes, BENCH_MAKES } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const outside = (bag = [{ id: 'gardenBed', n: 1 }]) => ({ ...makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 }), bag });

test('the garden bed is the bench\'s eighth slot: 4 Wood, dim with too few; Make takes it', () => {
  assert.equal(BENCH_MAKES.indexOf('gardenBed'), 7);
  const bed = benchMakes([{ id: 'wood', n: 4 }])[7];
  assert.deepEqual(bed, { item: 'gardenBed', cost: [{ id: 'wood', n: 4, have: 4 }], dim: false });
  assert.equal(benchMakes([{ id: 'wood', n: 3 }])[7].dim, true);
  const made = makeAt(outside([{ id: 'wood', n: 5 }]), 'gardenBed');
  assert.deepEqual(made.bag, [{ id: 'wood', n: 1 }, { id: 'gardenBed', n: 1 }]);
  assert.equal(shownLine(made).text, 'You make a garden bed.');
  assert.equal(shownLine(makeAt(outside([{ id: 'wood', n: 3 }]), 'gardenBed')).text, 'You need 4 Wood.');
  assert.equal(shownLine(makeAt(outside([{ id: 'wood', n: 4 }, { id: 'gardenBed', n: 1 }]), 'gardenBed')).text, 'You already carry a garden bed.');
});

test('it is set down on the surface as the plot tile, solid, opens its ask, and is taken down whole', () => {
  const set = setDown(outside(), 0, 'right');
  assert.equal(tileAt(set.room, 3, 2).id, 'plot');
  assert.equal(get('plot').solid, true);
  assert.equal(shownLine(set).text, 'You set down the garden bed.');
  assert.deepEqual(panelBeside(set, 'right'), { x: 3, y: 2 });
  const back = takeDown(set, 3, 2);
  assert.deepEqual(back.bag, [{ id: 'gardenBed', n: 1 }]);
  assert.equal(tileAt(back.room, 3, 2).id, 'floor');
  assert.equal(shownLine(back).text, 'You take down the garden bed.');
});
