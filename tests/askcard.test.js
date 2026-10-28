// § ask card: Start over?, Delete …? and Play …? as a small glass card (D-400)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { askCardAt } from '../src/render/askcard.js';
import { SURE_HEADING, SURE_NOTE } from '../src/core/menu.js';

const VW = 422, VH = 195; // a sideways phone's room
const tap = (x, y) => askCardAt(x, y, VW, VH, SURE_HEADING, SURE_NOTE);

test('YES and NO are side by side in the middle of the card, NO on the right', () => {
  assert.deepEqual(tap(193, 117), { line: 0 });
  assert.deepEqual(tap(228, 117), { line: 1 });
});

test('the cross and a tap outside the card mean No; the note picks nothing', () => {
  assert.equal(tap(270, 72), 'close');
  assert.equal(tap(10, 10), 'out');
  assert.equal(tap(211, 95), null);
});
