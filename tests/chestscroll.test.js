// § chest's bag window (D-1011, B-014): on the stash chest's card, where the bag's slots don't
// fit, they show through a window of whole rows that scrolls, ending where the name still fits
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chestWindow } from '../src/render/chestscroll.js';
import { grabsAt, rowSpan } from '../src/render/bagscroll.js';
import { chestAt, raised } from '../src/render/chestpanel.js';
import { CHEST_BAG } from '../src/core/chest.js';

globalThis.devicePixelRatio = 1;
const VIEWS = [[176, 264], [176, 221], [312, 176], [180, 320], [195, 422], [384, 216], [160, 284], [422, 195]];

test('the window shows whole rows; it scrolls only with the buttons raised', () => {
  for (const [vw, vh] of VIEWS) for (const size of [6, 9, 12]) {
    const win = chestWindow(vw, vh, size);
    assert.equal((win.h + 4) % win.pitch, 0, `${vw}×${vh}, ${size}: whole rows`);
    assert.equal(win.max % win.pitch, 0);
    if (!raised(vw, vh, size)) assert.equal(win.max, 0, `${vw}×${vh}, ${size}: fits`);
  }
});

test('the chosen find\'s name fits under the window, where more than a row shows', () => {
  for (const [vw, vh] of VIEWS) for (const size of [6, 9, 12]) {
    const win = chestWindow(vw, vh, size);
    if (!win.max || win.h < win.pitch) continue;
    assert.ok(win.top + win.h + 10 + 7 <= win.card.h - 6, `${vw}×${vh}, ${size}: name at ${win.top + win.h + 10}`);
  }
});

test('the big bag scrolls on the small window, and a 6-slot bag there fits', () => {
  assert.ok(chestWindow(176, 264, 12).max > 0 && chestWindow(176, 221, 12).max > 0);
  assert.equal(chestWindow(176, 264, 6).max, 0);
  assert.equal(chestWindow(195, 422, 12).max, 0);
  assert.equal(chestWindow(422, 195, 12).max, 0);
});

test('a tap picks only a bag slot showing in the window, scrolled', () => {
  const win = chestWindow(176, 264, 12), { card, top, left } = win, x = card.x + left + 5, y = card.y + top + 5;
  assert.deepEqual(chestAt(x, y, 176, 264, 12, win, 0), { slot: CHEST_BAG });
  assert.deepEqual(chestAt(x, y, 176, 264, 12, win, 30), { slot: CHEST_BAG + 4 });
  const below = card.y + top + win.h + 10; // where the hidden third row lies, under the window
  assert.ok(chestAt(x, below, 176, 264, 12, win, 0)?.slot === undefined, 'no hidden slot under the window');
  assert.deepEqual(rowSpan(win, 5), [30, 56]);
});

test('a drag starts on the bag\'s slots or the bar only where they scroll', () => {
  const win = chestWindow(176, 264, 12), { card, top, left, shape } = win, y = card.y + top + 10;
  assert.equal(grabsAt(win, card.x + left + 3, y), 'grid');
  assert.equal(grabsAt(win, card.x + left + shape.w + 5, y), 'bar');
  assert.equal(grabsAt(win, card.x + left + 3, card.y + 40), null); // the chest's own slots don't scroll
  assert.equal(grabsAt(chestWindow(195, 422, 12), card.x + left + 3, y), null);
});
