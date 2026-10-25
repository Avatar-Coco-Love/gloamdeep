// § workbench: Make on 3 Wood in the bag makes a workbench, a turn, with its
// line; only 1 is carried, and a second says so, free (WB1, D-320)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, craft, look } from '../src/core/turn.js';
import { bagAdd, stackFull } from '../src/core/bag.js';
import { shownLine } from '../src/core/lines.js';
import { get } from '../src/core/registry.js';

const carrying = (bag) => ({ ...makeState(makeRoom(FIRST_ROOM)), bag });

test('3 Wood make a workbench, passing a turn', () => {
  const n = craft(carrying([{ id: 'wood', n: 3, form: 1 }]), 0);
  assert.deepEqual(n.bag, [{ id: 'workbench', n: 1 }]);
  assert.equal(n.turn, 1);
  assert.equal(shownLine(n).text, 'You make a workbench.');
});

test('fewer than 3 Wood make nothing', () => {
  const s = carrying([{ id: 'wood', n: 2 }]);
  assert.equal(craft(s, 0), s);
});

test('only 1 workbench is carried: a second stays Wood, says so, and no turn passes', () => {
  const bag = [{ id: 'workbench', n: 1 }, { id: 'wood', n: 3 }];
  const n = craft(carrying(bag), 1);
  assert.equal(n.bag, bag);
  assert.equal(n.turn, 0);
  assert.equal(shownLine(n).text, 'You already carry a workbench.');
  assert.equal(get('workbench').max, 1);
  assert.equal(bagAdd(bag, 'workbench'), null);
  assert.ok(stackFull(bag, 'workbench'));
  assert.ok(!stackFull([{ id: 'wood', n: 1 }], 'wood'));
});

test('choosing it says its look lines in turn', () => {
  let s = carrying([{ id: 'workbench', n: 1 }]);
  const said = [];
  for (let i = 0; i < 3; i++) { s = look(s, 0); said.push(shownLine(s).text); }
  assert.deepEqual(said, ['A workbench, folded small.', 'Set it down on the surface.', 'Bigger things are made at it.']);
});
