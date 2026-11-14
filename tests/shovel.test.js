// § shovel: Q-106's first step (D-926), made on the workbench's BUILD tab; held, walking onto a
// stump digs it out for good, grass left, the tree waiting to grow back on it struck off
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, tileAt, FIRST_ROOM, withTile } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, step } from '../src/core/turn.js';
import { benchMakes, benchTabOf } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { regrow } from '../src/core/regrow.js';

const COST = [{ id: 'wood', n: 3 }, { id: 'stone', n: 2 }];
const home = (bag, more = {}) => ({ ...makeState(makeRoom(FIRST_ROOM)), bag, tool: null, ...more });

test('the Shovel is the BUILD tab\'s last slot: 3 Wood, 2 Stone, dim with too few', () => {
  const s = get('shovel');
  assert.equal(s.name, 'Shovel');
  assert.equal(s.max, 1);
  assert.equal(s.tool, true);
  const makes = benchTabOf('build').makes;
  assert.equal(makes.at(-1), 'shovel');
  const slot = (bag) => benchMakes(bag, 6, [], makes).find((m) => m.item === 'shovel');
  assert.deepEqual(slot(COST), { item: 'shovel', cost: [{ id: 'wood', n: 3, have: 3 }, { id: 'stone', n: 2, have: 2 }], dim: false });
  assert.equal(slot([{ id: 'wood', n: 2 }, { id: 'stone', n: 2 }]).dim, true);
});

test('made with the Tool slot empty it goes straight there, a turn; with the pick held, into the bag; one at most', () => {
  const s = home(COST), made = makeAt(s, 'shovel');
  assert.equal(made.tool, 'shovel');
  assert.deepEqual(made.bag, []);
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'You make a shovel.');
  const both = makeAt(home(COST, { tool: 'pick' }), 'shovel');
  assert.equal(both.tool, 'pick');
  assert.deepEqual(both.bag, [{ id: 'shovel', n: 1 }]);
  assert.equal(shownLine(makeAt({ ...made, bag: COST }, 'shovel')).text, 'You already carry a shovel.');
  assert.equal(shownLine(makeAt(home([]), 'shovel')).text, 'Need 3 Wood, 2 Stone.');
});

// The hero at 5,11 in the first room, a stump just above
const beside = (tool, more = {}) => ({ ...makeState(withTile(makeRoom(FIRST_ROOM), 5, 10, get('stump'))), hero: { x: 5, y: 11 }, bag: [], tool, ...more });

test('held, walking onto a stump digs it out to grass, a turn, the hero staying put', () => {
  const s = beside('shovel'), dug = step(s, 'up');
  assert.equal(tileAt(dug.room, 5, 10).id, 'floor');
  assert.deepEqual(dug.hero, { x: 5, y: 11 });
  assert.equal(dug.turn, s.turn + 1);
  assert.equal(shownLine(dug).text, 'You dig out the stump.');
  assert.ok(dug.events.some((e) => e.type === 'dig'));
  assert.deepEqual(step(dug, 'up').hero, { x: 5, y: 10 }, 'the next step walks onto the grass');
});

test('without it held, a stump is walked onto as before; in the bag is not enough', () => {
  for (const s of [beside(null), beside('pick'), beside(null, { bag: [{ id: 'shovel', n: 1 }] })]) {
    const on = step(s, 'up');
    assert.deepEqual(on.hero, { x: 5, y: 10 });
    assert.equal(tileAt(on.room, 5, 10).id, 'stump');
  }
});

test('the tree waiting to grow back on a dug stump never does; others still do', () => {
  const taken = [{ id: 'tree', x: 5, y: 10, at: 0 }, { id: 'tree', x: 8, y: 6, at: 0 }];
  const dug = step(beside('shovel', { taken }), 'up');
  assert.deepEqual(dug.taken, [{ id: 'tree', x: 8, y: 6, at: 0 }]);
  const later = regrow({ ...dug, turn: dug.turn + get('tree').regrow + 1 }, true);
  assert.equal(tileAt(later.room, 5, 10).id, 'floor');
});
