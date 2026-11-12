// § glass flask: Make on Mimic Glass turns 1 with 2 oilcaps into an oil flask,
// a turn, with its line; too few of either do nothing (D-477)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, makeFrom } from '../src/core/turn.js';
import { setOil } from '../src/core/oil.js';
import { shownLine } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
const carrying = (bag) => ({ ...setOil(makeState(room), 0.5), bag });

test('1 mimic glass and 2 oilcaps make an oil flask, passing a turn', () => {
  const n = makeFrom(carrying([{ id: 'mimicGlass', n: 2 }, { id: 'oilcap', n: 5 }]), 'mimicGlass');
  assert.deepEqual(n.bag, [{ id: 'mimicGlass', n: 1 }, { id: 'oilcap', n: 3 }, { id: 'flask', n: 1 }]);
  assert.equal(n.turn, 1);
  assert.equal(shownLine(n).text, 'You make a flask from the glass.');
});

test('the last glass and oilcaps free their slots for the flask', () => {
  const n = makeFrom(carrying([{ id: 'oilcap', n: 2 }, { id: 'mimicGlass', n: 1 }]), 'mimicGlass');
  assert.deepEqual(n.bag, [{ id: 'flask', n: 1 }]);
});

test('with fewer than 2 oilcaps, or none, the glass makes nothing', () => {
  for (const bag of [[{ id: 'mimicGlass', n: 3 }], [{ id: 'mimicGlass', n: 3 }, { id: 'oilcap', n: 1 }]]) {
    const s = carrying(bag);
    assert.equal(makeFrom(s, 'mimicGlass'), s);
  }
});

test('3 oilcaps alone still make a flask, from the oilcap stack', () => {
  const bag = [{ id: 'mimicGlass', n: 1 }, { id: 'oilcap', n: 3 }];
  assert.deepEqual(makeFrom(carrying(bag), 'oilcap').bag, [{ id: 'mimicGlass', n: 1 }, { id: 'flask', n: 1 }]);
});
