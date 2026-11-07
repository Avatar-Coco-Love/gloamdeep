// § hold: under a card the room is drawn once and kept, once nothing in it moves (S3, D-686)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { running, sameKey, holdsRoom } from '../src/render/hold.js';
import { KINDLE_MS } from '../src/render/kindle.js';
import { GAIN_MS } from '../src/render/walk.js';

const BEAM = 1000;

test('with no moment running the room can be held', () => {
  assert.equal(running({}, 5000, BEAM), false);
  assert.equal(running({ nudge: { until: 100 }, hit: { until: 100, shakeUntil: 200 }, alertUntil: 0 }, 5000, BEAM), false);
});

test('a slide-like moment keeps the room drawn until it ends', () => {
  assert.equal(running({ travel: {} }, 0, BEAM), true);
  assert.equal(running({ fall: {} }, 0, BEAM), true);
  assert.equal(running({ hit: { until: 0, shakeUntil: 300 } }, 200, BEAM), true);
  assert.equal(running({ bitten: { until: 300, shakeUntil: 0 } }, 200, BEAM), true);
  assert.equal(running({ kindle: { start: 0 } }, KINDLE_MS - 1, BEAM), true);
  assert.equal(running({ kindle: { start: 0 } }, KINDLE_MS, BEAM), false);
  assert.equal(running({ gain: { at: 0 }, alertUntil: 500 }, 500 + GAIN_MS - 1, BEAM), true); // the "+1" shows after the "!"
  assert.equal(running({ beam: { start: 0 } }, BEAM - 1, BEAM), true);
});

test('the held picture is kept only while what it shows is the same', () => {
  const state = {}, room = {};
  assert.equal(sameKey(null, null), false); // no card: drawn every frame
  assert.equal(sameKey([state, room, 1], [state, room, 1]), true);
  assert.equal(sameKey([{}, room, 1], [state, room, 1]), false); // a find eaten: a new state
  assert.equal(sameKey([state, room, 2], [state, room, 1]), false); // the screen resized
});

test('in play the room is held only with reduced motion (D-687)', () => {
  assert.equal(holdsRoom('play', false, false), false); // motion on: torches flicker, drawn every frame
  assert.equal(holdsRoom('play', false, true), true);
  assert.equal(holdsRoom('place', false, true), true);
  assert.equal(holdsRoom('drop', false, true), false);
  assert.equal(holdsRoom('bag', true, false), true); // under a card, as before (D-686)
  const walk = { way: [] };
  assert.equal(sameKey(['play', walk, walk.way], ['play', walk, [1]]), false); // a walk's dots moved on
  assert.equal(sameKey(['play', null], ['place', null]), false); // placing a workbench shows its marks
});
