// § mole claw pick: the Mole Claw's first use (D-799, D-810), made on the workbench's BUILD tab,
// a second pick that works as the Stone Pick, copper veins and rubble breaking in 2 bumps
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, tileAt, FIRST_ROOM, withTile } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, step } from '../src/core/turn.js';
import { benchMakes, benchTabOf } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { bumpsFor, toolFits } from '../src/core/gear.js';

const COST = [{ id: 'moleClaw', n: 1 }, { id: 'wood', n: 2 }, { id: 'stone', n: 2 }];
const home = (bag, more = {}) => ({ ...makeState(makeRoom(FIRST_ROOM)), bag, tool: null, ...more });

test('the Mole Claw Pick is the BUILD tab\'s slot after the Stone Pick: 1 Mole Claw, 2 Wood, 2 Stone, dim with too few', () => {
  const p = get('moleClawPick');
  assert.equal(p.name, 'Mole Claw Pick');
  assert.equal(p.max, 1);
  assert.equal(p.tool, true);
  assert.equal(p.as, 'pick');
  assert.deepEqual(p.quick, { vein: 2, rubble: 2 });
  const makes = benchTabOf('build').makes;
  assert.equal(makes[makes.indexOf('pick') + 1], 'moleClawPick');
  const slot = (bag) => benchMakes(bag, 6, [], makes).find((m) => m.item === 'moleClawPick');
  assert.deepEqual(slot(COST), { item: 'moleClawPick', cost: [{ id: 'moleClaw', n: 1, have: 1 }, { id: 'wood', n: 2, have: 2 }, { id: 'stone', n: 2, have: 2 }], dim: false });
  assert.equal(slot([{ id: 'wood', n: 2 }, { id: 'stone', n: 2 }]).dim, true);
});

test('made with the Tool slot empty it goes straight there, a turn; with the Stone Pick held, into the bag; one at most', () => {
  const s = home(COST), made = makeAt(s, 'moleClawPick');
  assert.equal(made.tool, 'moleClawPick');
  assert.deepEqual(made.bag, []);
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'You make a mole claw pick.');
  const both = makeAt(home(COST, { tool: 'pick' }), 'moleClawPick');
  assert.equal(both.tool, 'pick');
  assert.deepEqual(both.bag, [{ id: 'moleClawPick', n: 1 }]);
  assert.equal(shownLine(makeAt({ ...made, bag: COST }, 'moleClawPick')).text, 'You already carry a mole claw pick.');
  assert.equal(shownLine(makeAt(both, 'moleClawPick')).text, 'You already carry a mole claw pick.');
  assert.equal(shownLine(makeAt(home([]), 'moleClawPick')).text, 'Need 1 Mole Claw, 2 Wood, 2 Stone.');
});

test('held, it works as the Stone Pick; veins and rubble take 2 bumps, other tiles their own', () => {
  const s = home([], { tool: 'moleClawPick' });
  assert.equal(toolFits(s, 'pick'), true);
  assert.equal(toolFits(home([], { tool: 'pick' }), 'pick'), true);
  assert.equal(toolFits(home([], { tool: 'rod' }), 'pick'), false);
  assert.equal(toolFits(home([]), 'pick'), false);
  assert.equal(bumpsFor(s, 'vein', 4), 2);
  assert.equal(bumpsFor(s, 'rubble', 3), 2);
  assert.equal(bumpsFor(s, 'deposit', 3), 3);
  assert.equal(bumpsFor(home([], { tool: 'pick' }), 'vein', 4), 4);
});

// The hero at 5,11 in the first room, a vein or a heap of rubble just above
const beside = (tile, tool) => ({ ...makeState(withTile(makeRoom(FIRST_ROOM), 5, 10, get(tile))), hero: { x: 5, y: 11 }, bag: [], tool });

test('held, a copper vein breaks in 2 bumps for a Copper Ore, a turn each', () => {
  let s = beside('vein', 'moleClawPick');
  const said = [];
  for (let i = 0; i < 2; i++) { s = step(s, 'up'); said.push(shownLine(s).text); }
  assert.equal(s.turn, 2);
  assert.deepEqual(said, ['Your pick bites the rock.', 'The rock gives. You take copper ore.']);
  assert.equal(tileAt(s.room, 5, 10).id, 'floor');
  assert.deepEqual(s.bag, [{ id: 'copperOre', n: 1 }]);
  assert.equal(shownLine(step({ ...beside('vein', null), bag: [{ id: 'moleClawPick', n: 1 }] }, 'up')).text, 'Too hard to break by hand.'); // only in the bag, it holds
});

test('held, rubble clears in 2 bumps, not 3; a stone deposit still takes 3', () => {
  let s = beside('rubble', 'moleClawPick');
  s = step(step(s, 'up'), 'up');
  assert.equal(s.turn, 2);
  assert.equal(tileAt(s.room, 5, 10).id, 'floor');
  let d = beside('deposit', 'moleClawPick');
  d = step(step(d, 'up'), 'up');
  assert.equal(tileAt(d.room, 5, 10).id, 'deposit');
});
