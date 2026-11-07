// § the waiting line (D-680): only a turn taken in play waits for the slide or the fade;
// a card's action happens at once (audit finding I4)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { waitsInLine } from '../src/input/queue.js';

test('in play, a turn waits while the hero still slides or the stairs fade', () => {
  assert.equal(waitsInLine('play', false), true);
});

test('in play, once the hero is still, a turn happens at once', () => {
  assert.equal(waitsInLine('play', true), false);
});

test('on a card, an action happens at once, even mid-slide', () => {
  for (const card of ['bag', 'bench', 'chest', 'bed', 'travel']) assert.equal(waitsInLine(card, false), false, card);
});
