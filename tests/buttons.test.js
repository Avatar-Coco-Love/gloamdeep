// Every card button's tap is at least 22 game px tall, 44 px at a phone's zoom of 2 (TECH.md,
// D-513, H-68): one band for all (onButton, render/bag.js), measured on each card here.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bagAt, bagShape, cardAt, storeAt, sortAt, onButton, BUTTON, BUTTON_PAD, DROP_W, SORT_W, STORE_W as BAG_STORE_W } from '../src/render/bag.js';
import { makeCardAt } from '../src/render/makecard.js';
import { benchAt, take, TAKE_W } from '../src/render/benchpanel.js';
import { chestAt, store, STORE_W } from '../src/render/chestpanel.js';
import { tradeAt } from '../src/render/tradepanel.js';

const TALL = 22; // game px: 44 px at a zoom of 2
const VIEWS = [[195, 422], [176, 221], [422, 195], [340, 200]]; // upright, the smallest upright, sideways, a squarer one
// The rows at column x where `at(x, y)` gives `want`, all in one run
function band(at, x, want, h) {
  const ys = []; for (let y = 0; y < h; y++) if (at(x, y) === want) ys.push(y);
  assert.ok(ys.length, `no tap gives ${want}`);
  assert.equal(ys[ys.length - 1] - ys[0] + 1, ys.length, `${want}'s rows in one run`);
  return ys.length;
}
const mid = (b, w) => b.x + Math.floor(w / 2);

test('the shared band: 22 game px tall, BUTTON_PAD above and below', () => {
  assert.ok(BUTTON.h + 2 * BUTTON_PAD >= TALL);
  const b = { x: 10, y: 50 };
  assert.ok(onButton(b, 30, 12, 50 - BUTTON_PAD) && !onButton(b, 30, 12, 50 - BUTTON_PAD - 1));
  assert.ok(onButton(b, 30, 12, 50 + BUTTON.h + BUTTON_PAD - 1) && !onButton(b, 30, 12, 50 + BUTTON.h + BUTTON_PAD));
});

test('the bag card: its act, make, drop, store and sort buttons each 44 px tall to tap (H-68)', () => {
  for (const [vw, vh] of VIEWS) {
    const card = cardAt(vw, vh, bagShape(6).detail), at = (...o) => (x, y) => bagAt(x, y, vw, vh, ...o);
    assert.ok(band(at(false, false, true), mid(card.button, BUTTON.w), 'act', vh) >= TALL, `${vw}x${vh} act`);
    assert.ok(band(at(true, false, true), mid(card.make, BUTTON.w), 'make', vh) >= TALL, `${vw}x${vh} make`);
    assert.ok(band(at(false, false, true), mid(card.drop, DROP_W), 'drop', vh) >= TALL, `${vw}x${vh} drop`);
    assert.ok(band(at(true, false, true), mid(card.drop, DROP_W), 'drop', vh) >= TALL, `${vw}x${vh} drop beside two`);
    assert.ok(band(at(false, false, true, 6, false, true), mid(storeAt(card), BAG_STORE_W), 'store', vh) >= TALL, `${vw}x${vh} store`);
    assert.ok(band(at(false, false, true, 6, false, true), mid(sortAt(card, true), SORT_W), 'sort', vh) >= TALL, `${vw}x${vh} sort`);
  }
});

test('the make, bench, chest and trade cards: each button 44 px tall to tap (H-68)', () => {
  for (const [vw, vh] of VIEWS) {
    const card = cardAt(vw, vh);
    assert.ok(band((x, y) => makeCardAt(x, y, vw, vh), mid(card.button, BUTTON.w), 'make', vh) >= TALL, `${vw}x${vh} make card`);
    assert.ok(band((x, y) => benchAt(x, y, vw, vh), mid(card.button, BUTTON.w), 'make', vh) >= TALL, `${vw}x${vh} bench make`);
    assert.ok(band((x, y) => benchAt(x, y, vw, vh), mid(take(card), TAKE_W), 'take', vh) >= TALL, `${vw}x${vh} bench take`);
    if (vh !== 221) assert.ok(band((x, y) => chestAt(x, y, vw, vh), mid(take(card), TAKE_W), 'take', vh) >= TALL, `${vw}x${vh} chest take`); // on the smallest upright view the bag's slots lie over it (B-013)
    assert.ok(band((x, y) => chestAt(x, y, vw, vh), mid(store(card), STORE_W), 'store', vh) >= TALL, `${vw}x${vh} chest store`);
    const tc = cardAt(vw, vh, bagShape(6).detail);
    assert.ok(band((x, y) => tradeAt(x, y, vw, vh), mid(tc.button, BUTTON.w), 'act', vh) >= TALL, `${vw}x${vh} sell`);
  }
});

// H-69: a draught's look line is not drawn over its "Now" picture on the bag card
test('the chosen find\'s look line hides while its picture shows; any other line still shows (H-69)', async () => {
  const { hidesPicture } = await import('../src/render/bag.js');
  const { get } = await import('../src/core/registry.js');
  const glow = get('glowDraught'), sips = { key: 'glow', now: 0, after: 1 };
  assert.equal(hidesPicture(glow, { id: glow.look }, [], sips), true);
  assert.equal(hidesPicture(glow, { id: 'onlySurface' }, [], sips), false, 'another line shows');
  assert.equal(hidesPicture(glow, { id: glow.look }, [], null), false, 'no picture: the look line shows');
  assert.equal(hidesPicture(null, { id: glow.look }), false);
});
