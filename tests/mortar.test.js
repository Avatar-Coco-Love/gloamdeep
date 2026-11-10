// § mortar: the Mortar and Pestle (D-786), made on the bag's Make tab from 4 Stone and 1 Wood, set
// down on the surface the bed's way, and bumped, day or night, opening the workbench's card as
// MORTAR, nothing listed yet, where Deconstruct takes it straight back
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY, tileAt } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, setDown, takeDown, panelBeside } from '../src/core/turn.js';
import { makeFrom } from '../src/core/bagturn.js';
import { bagMakes, makesWords } from '../src/core/bagmake.js';
import { stationMakes, stationTitle, STATION_NONE } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const outside = (bag = [{ id: 'mortar', n: 1 }]) => ({ ...makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 }), bag });

test('the Make tab shows it once Stone and Wood have been held: 4 Stone and 1 Wood, dim with too few', () => {
  const make = (bag) => bagMakes(outside(bag)).find((m) => m.item === 'mortar');
  assert.equal(make([{ id: 'stone', n: 4 }]), undefined);
  assert.deepEqual(make([{ id: 'stone', n: 4 }, { id: 'wood', n: 1 }]), { from: 'stone', item: 'mortar', cost: [{ id: 'stone', n: 4, have: 4 }, { id: 'wood', n: 1, have: 1 }], dim: false });
  assert.equal(make([{ id: 'stone', n: 3 }, { id: 'wood', n: 1 }]).dim, true);
  assert.equal(makesWords('mortar'), 'Makes a Mortar and Pestle');
});

test('MAKE takes its cost and puts it in the bag, one carried', () => {
  const made = makeFrom(outside([{ id: 'stone', n: 5 }, { id: 'wood', n: 1 }]), 'stone');
  assert.deepEqual(made.bag, [{ id: 'stone', n: 1 }, { id: 'mortar', n: 1 }]);
  assert.equal(shownLine(made).text, 'You make a mortar and pestle.');
  assert.equal(get('mortar').max, 1);
  const again = makeFrom(outside([{ id: 'stone', n: 4 }, { id: 'wood', n: 1 }, { id: 'mortar', n: 1 }]), 'stone');
  assert.equal(shownLine(again).text, 'You already carry a mortar.');
});

test('it is set down on the surface as its tile, solid, and taken straight back', () => {
  const set = setDown(outside(), 0, 'right');
  assert.equal(tileAt(set.room, 3, 2).id, 'mortarStand');
  assert.equal(get('mortarStand').solid, true);
  assert.equal(shownLine(set).text, 'You set down the mortar.');
  const back = takeDown(set, 3, 2);
  assert.deepEqual(back.bag, [{ id: 'mortar', n: 1 }]);
  assert.equal(tileAt(back.room, 3, 2).id, 'floor');
  assert.equal(shownLine(back).text, 'You take down the mortar.');
});

test("bumped, day or night, it opens the workbench's card as MORTAR, nothing listed yet", () => {
  const set = setDown(outside(), 0, 'right');
  for (const turn of [0, 200]) assert.deepEqual(panelBeside({ ...set, turn }, 'right'), { x: 3, y: 2 });
  const tile = get('mortarStand');
  assert.equal(tile.panel, 'bench');
  assert.equal(stationTitle(tile), 'MORTAR');
  assert.deepEqual(stationMakes(tile, [{ id: 'wood', n: 20 }]), []);
  assert.equal(STATION_NONE, 'Nothing to make here yet.');
  assert.equal(stationTitle(get('bench')), 'WORKBENCH');
  assert.ok(stationMakes(get('bench'), []).length > 0);
});
