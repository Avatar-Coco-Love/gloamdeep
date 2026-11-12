// § craft: Make in the bag (its Make tab, makeFrom, D-869) turns 3 oilcaps into an oil flask, a turn, with
// its line; too few do nothing, and no room for the flask says so (D-299)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, makeFrom } from '../src/core/turn.js';
import { OIL, setOil } from '../src/core/oil.js';
import { BAG_SLOTS } from '../src/core/bag.js';
import { shownLine } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
const carrying = (bag) => ({ ...setOil(makeState(room), 0.5), bag });

test('3 oilcaps make an oil flask in a new slot, passing a turn', () => {
  const n = makeFrom(carrying([{ id: 'oilcap', n: 3 }]), 'oilcap');
  assert.deepEqual(n.bag, [{ id: 'flask', n: 1 }]);
  assert.equal(n.turn, 1);
  assert.equal(n.oil, 0.5 - OIL.burn);
  assert.equal(shownLine(n).text, 'You make an oil flask.');
});

test('the made flask goes on the flasks already carried', () => {
  const n = makeFrom(carrying([{ id: 'flask', n: 1 }, { id: 'oilcap', n: 3 }]), 'oilcap');
  assert.deepEqual(n.bag, [{ id: 'flask', n: 2 }]);
});

test('fewer than 3 oilcaps make nothing', () => {
  const s = carrying([{ id: 'oilcap', n: 2 }]);
  assert.equal(makeFrom(s, 'oilcap'), s);
});

test('with 5 full stacks of flasks and no slot free the oilcaps stay, the line says so and no turn passes', () => {
  const bag = [...Array.from({ length: 5 }, () => ({ id: 'flask', n: 5 })), { id: 'oilcap', n: 4 }];
  const n = makeFrom(carrying(bag), 'oilcap');
  assert.equal(n.bag, bag);
  assert.equal(n.turn, 0);
  assert.equal(shownLine(n).text, "You can't carry more flasks.");
});

test('a full bag still has room: the oilcaps free their slot', () => {
  const bag = [{ id: 'oilcap', n: 3 }, ...Array.from({ length: BAG_SLOTS - 1 }, (_, i) => ({ id: 'thing' + i, n: 1 }))];
  const n = makeFrom(carrying(bag), 'oilcap');
  assert.equal(n.bag.length, BAG_SLOTS);
  assert.deepEqual(n.bag.at(-1), { id: 'flask', n: 1 });
});

test('a flask, or a find with no recipe, makes nothing', () => {
  const s = carrying([{ id: 'flask', n: 3 }]);
  assert.equal(makeFrom(s, 'flask'), s);
  assert.equal(makeFrom(s, 'nothing'), s);
});
