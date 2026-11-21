// § trade's window (D-1011, D-1013): on the peddler's card, where the grid's slots don't fit,
// they show through a window of whole rows that scrolls, ending where the price line still fits
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tradeWindow, TRADE_TOP } from '../src/render/tradescroll.js';
import { grabsAt, rowSpan } from '../src/render/bagscroll.js';
import { tradeAt } from '../src/render/tradepanel.js';
import { isTall, LINE_H } from '../src/render/bag.js';

globalThis.devicePixelRatio = 1;
const VIEWS = [[176, 264], [176, 221], [312, 176], [180, 320], [195, 422], [384, 216], [160, 284], [422, 195]];

test('the window shows whole rows, at least one', () => {
  for (const [vw, vh] of VIEWS) for (const size of [6, 9, 12]) {
    const win = tradeWindow(vw, vh, size);
    assert.equal((win.h + 4) % win.pitch, 0, `${vw}×${vh}, ${size}: whole rows`);
    assert.equal(win.max % win.pitch, 0);
    assert.ok(win.h >= win.shape.slot);
  }
});

test('upright, the name, carried and price lines fit above the button, where more than a row shows', () => {
  for (const [vw, vh] of VIEWS) for (const size of [6, 9, 12]) {
    const win = tradeWindow(vw, vh, size);
    if (!isTall(vw, vh) || !win.max || win.h < win.pitch) continue;
    const price = win.top + win.h + 12 + 10 + 2.5 * LINE_H; // the price line's top, with no rows or picture
    assert.ok(price + LINE_H <= win.card.button.y - win.card.y, `${vw}×${vh}, ${size}`);
  }
});

test('it scrolls only on the short upright windows; elsewhere every bag fits', () => {
  assert.ok(tradeWindow(176, 264, 12).max > 0 && tradeWindow(176, 221, 6).max > 0);
  for (const [vw, vh] of [[195, 422], [180, 320], [422, 195], [384, 216], [312, 176]]) assert.equal(tradeWindow(vw, vh, 12).max, 0, `${vw}×${vh}`);
});

test('a tap picks only a slot showing in the window, scrolled', () => {
  const win = tradeWindow(176, 264, 12), { card, left } = win, x = card.x + left + 5, y = card.y + TRADE_TOP + 5;
  assert.deepEqual(tradeAt(x, y, 176, 264, 'sell', 12, win, 0), { slot: 0 });
  assert.deepEqual(tradeAt(x, y, 176, 264, 'sell', 12, win, win.pitch), { slot: win.shape.cols });
  const below = card.y + TRADE_TOP + win.h + 10; // where the hidden row lies, under the window
  assert.ok(tradeAt(x, below, 176, 264, 'sell', 12, win, 0)?.slot === undefined, 'no hidden slot under the window');
  assert.deepEqual(rowSpan(win, 4), [win.pitch, win.pitch + win.shape.slot]);
});

test('a drag starts on the slots or the bar only where they scroll', () => {
  const win = tradeWindow(176, 264, 12), { card, left, shape } = win, y = card.y + TRADE_TOP + 10;
  assert.equal(grabsAt(win, card.x + left + 3, y), 'grid');
  assert.equal(grabsAt(win, card.x + left + shape.w + 5, y), 'bar');
  assert.equal(grabsAt(tradeWindow(195, 422, 12), card.x + left + 3, y), null);
});
