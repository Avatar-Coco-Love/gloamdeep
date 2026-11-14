// § danger: the round map's rim, red while a creature chases, ember while one is close to noticing (D-921)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS } from '../src/core/room.js';
import { makeState, switchLantern } from '../src/core/turn.js';
import { dangerNow } from '../src/core/danger.js';

const room = makeRoom(FIRST_ROOM);
// The lantern off, the hero at 4,11, the torch lighting 4,4 to 4,7 straight up from them
const dark = (enemies) => ({ ...switchLantern(makeState(room, { x: 4, y: 11 }, FIRST_LIGHTS, [])), enemies });

test('with no creature the rim stays as it is', () => {
  assert.equal(dangerNow(dark([])), null);
});

test('a creature chasing, near or far, turns it red', () => {
  assert.equal(dangerNow(dark([{ id: 'rat', x: 1, y: 1, chasing: true }])), 'chase');
  assert.equal(dangerNow(dark([{ id: 'rat', x: 1, y: 10 }, { id: 'rat', x: 8, y: 1, chasing: true }])), 'chase');
});

test('one in light along a clear line, not yet chasing, is close to noticing', () => {
  assert.equal(dangerNow(dark([{ id: 'rat', x: 4, y: 5 }])), 'near');
});

test('one in the dark beside a lit tile a step nearer is close to noticing', () => {
  assert.equal(dangerNow(dark([{ id: 'rat', x: 3, y: 7 }])), 'near');
});

test('one in the dark with no lit tile a step nearer is not', () => {
  assert.equal(dangerNow(dark([{ id: 'rat', x: 1, y: 10 }])), null);
  assert.equal(dangerNow(dark([{ id: 'rat', x: 2, y: 5 }])), null, 'lit, but a wall on the line');
});

test('one asleep, or one that only seeks light, never counts', () => {
  assert.equal(dangerNow(dark([{ id: 'rat', x: 4, y: 5, asleep: true }])), null);
  assert.equal(dangerNow(dark([{ id: 'lampmoth', x: 4, y: 5 }])), null);
});
