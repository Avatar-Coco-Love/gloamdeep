// § the bed's gold heart kept (H-01, D-863): only a bite or a fall takes it (D-488); and the
// Growth tree's Heart tile counts only hearts grown (H-19, D-863)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld, makeState, maxHealth, sit, sleepOut } from '../src/core/turn.js';
import { makeRoom, SKY } from '../src/core/room.js';
import { takeBoon } from '../src/core/boon.js';
import { withoutBoon, goldHearts } from '../src/core/state.js';
import { told, START_PICK } from '../src/core/growth.js';

const rested = (s) => ({ ...s, health: maxHealth(s) + 1 }); // as the bed leaves the hero

test('taking a boon keeps the gold heart: no hearts, Stout Heart and Reckless', () => {
  const s = rested(makeWorld('first', 5));
  for (const id of ['keenEye', 'stoutHeart', 'reckless']) {
    const took = takeBoon(s, id);
    assert.equal(took.health, maxHealth(took) + 1, id);
  }
});

test('a boon ending keeps the gold heart, and still takes its own hearts', () => {
  const s = makeWorld('first', 5), stout = takeBoon(rested(s), 'stoutHeart');
  assert.equal(withoutBoon(stout).health, maxHealth(s) + 1);
  const hurt = { ...takeBoon(s, 'stoutHeart'), health: maxHealth(s) + 2 }; // full with the boon, no gold
  assert.equal(withoutBoon(hurt).health, maxHealth(s));
  assert.equal(goldHearts(withoutBoon(hurt)), 0);
});

test('sitting by a fire while stiff keeps the gold heart', () => {
  const s = { ...makeState(makeRoom(['TTTTT', 'T..DT', 'TTTTT'], SKY, 'woods'), { x: 2, y: 1 }), stiff: 10 };
  const sat = sit(rested(s), 3, 1);
  assert.equal(sat.stiff, 0);
  assert.equal(sat.health, maxHealth(s) + 1);
});

test('waking warm in the fur bedroll keeps the gold heart', () => {
  const out = { ...makeState(makeRoom(['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'], SKY, 'woods'), { x: 2, y: 2 }), turn: 480, oil: 0.5, line: null, bag: [{ id: 'furBedroll', n: 1 }] };
  assert.equal(sleepOut(rested(out)).health, maxHealth(out) + 1);
});

test('the Heart tile counts hearts grown, never a boon\'s', () => {
  const s = { ...makeWorld('first', 5), grown: { heart: 5 } };
  assert.equal(told(s, START_PICK).value, 'Hearts 10 of 10');
  assert.equal(told(takeBoon(s, 'stoutHeart'), START_PICK).value, 'Hearts 10 of 10');
  assert.equal(told(takeBoon(s, 'reckless'), START_PICK).value, 'Hearts 10 of 10');
});
