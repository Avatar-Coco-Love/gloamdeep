// § minnow oil: a Pond Minnow poured from the bag gives the lantern 15% of a tank,
// a turn, the flask's way, but only by hand (D-611)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, wait, pour, pourByItself } from '../src/core/turn.js';
import { setOil } from '../src/core/oil.js';
import { firstFlask, flasksIn } from '../src/core/bag.js';
import { pourOf } from '../src/core/boon.js';
import { counted } from '../src/core/record.js';
import { get } from '../src/core/registry.js';
import { newProfile } from '../src/core/profile.js';

const room = makeRoom(FIRST_ROOM);
const carrying = (bag, oil = 0.3) => ({ ...setOil(makeState(room), oil), bag });

test('a minnow pours 15% of a tank, a turn, one from the stack', () => {
  const s = carrying([{ id: 'pondMinnow', n: 3 }]), n = pour(s, 0);
  assert.equal(n.turn, 1);
  assert.ok(Math.abs(n.oil - (wait(s).oil + 0.15)) < 1e-9);
  assert.deepEqual(n.bag, [{ id: 'pondMinnow', n: 2 }]);
});

test('a minnow never fills the lantern past full', () => {
  assert.equal(pour(carrying([{ id: 'pondMinnow', n: 1 }], 1), 0).oil, 1);
});

test('the quick slot and By itself pass minnows by', () => {
  const bag = [{ id: 'pondMinnow', n: 4 }, { id: 'flask', n: 1 }];
  assert.equal(firstFlask(bag), 1);
  assert.equal(flasksIn(bag), 1);
  assert.equal(firstFlask([{ id: 'pondMinnow', n: 4 }]), -1);
  const s = carrying([{ id: 'pondMinnow', n: 4 }], 0.2), n = pourByItself(s, wait(s));
  assert.deepEqual(n.bag, [{ id: 'pondMinnow', n: 4 }], 'no minnow pours by itself');
});

test('Deep Pour does not make a minnow pour more', () => {
  const deep = { ...carrying([]), boon: 'deepPour' };
  assert.equal(pourOf(deep, get('pondMinnow')), 0.15);
  assert.equal(pourOf(deep, get('flask')), 0.6);
});

test('Flasks poured counts flasks, not minnows', () => {
  const r = newProfile().records;
  assert.equal(counted(r, [{ type: 'pour', id: 'pondMinnow', by: 'hand' }]).poured, 0);
  assert.equal(counted(r, [{ type: 'pour', id: 'flask', by: 'hand' }]).poured, 1);
});
