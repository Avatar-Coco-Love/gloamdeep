// § one carried: a one-of-a-kind piece can't be had twice (R3, D-666). Make counts the bag
// before a tool goes into an empty Tool slot, and Wear won't put on a second of a piece worn
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, makeAt } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { wear } from '../src/core/worn.js';
import { takeOff } from '../src/core/gear.js';
import { burnOf } from '../src/core/parts.js';

const start = (more) => ({ ...makeState(makeRoom(FIRST_ROOM)), ...more });

test('after Take off, Make says the pick is carried, free, and takes nothing', () => {
  for (const id of ['pick', 'rod']) {
    const off = takeOff(start({ tool: id, bag: [{ id: 'wood', n: 9 }, { id: 'stone', n: 9 }, { id: 'spiderSilk', n: 9 }] }), 1);
    const n = makeAt(off, id);
    assert.equal(n.tool, null);
    assert.deepEqual(n.bag, off.bag);
    assert.equal(n.turn, off.turn);
    assert.match(shownLine(n).text, /^You already carry a/);
  }
});

test('a second heart charm stays in the bag: the tank lasts about 70 turns, not 82', () => {
  const s = start({ worn: { charm: ['heartCharm'] }, bag: [{ id: 'heartCharm', n: 1 }] });
  const n = wear(s, 0);
  assert.deepEqual(n.worn, s.worn);
  assert.deepEqual(n.bag, s.bag);
  assert.equal(shownLine(n).text, 'You already have a heart charm.');
  assert.equal(Math.round(1 / burnOf(n)), 70);
});

test('two different charms are still worn together', () => {
  const n = wear(start({ worn: { charm: ['heartCharm'] }, bag: [{ id: 'wispCharm', n: 1 }] }), 0);
  assert.deepEqual(n.worn.charm, ['heartCharm', 'wispCharm']);
  assert.deepEqual(n.bag, []);
});
