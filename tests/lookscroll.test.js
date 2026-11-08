// § look scroll (D-701): the look card shows four rows of choices at most; a tab with more
// scrolls them a row at a time, the window following the flame, a bar at the boxes' right
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LOOK_PADS, LOOK_WINDOW, LOOK_SHOWN, LOOK_ROWS, clampScroll, scrollToRow, lookScrollTo, tabRows } from '../src/core/looks.js';
import { boxesAt, barAt, lookCardAt } from '../src/render/cloak.js';

test('the window is four rows, as many as the cloak tab has today', () => {
  assert.equal(LOOK_WINDOW, 4);
  assert.equal(LOOK_SHOWN, Math.min(LOOK_ROWS, 4));
});

test('the scroll stays between none and the last row at the window\'s foot', () => {
  assert.equal(clampScroll(-1, 7, 4), 0);
  assert.equal(clampScroll(2, 7, 4), 2);
  assert.equal(clampScroll(9, 7, 4), 3);
  assert.equal(clampScroll(3, 4, 4), 0); // rows that all fit never scroll
});

test('the window moves as little as it can to show a row: a row at a time past either edge', () => {
  assert.equal(scrollToRow(0, 4, 7, 4), 0); // already in view
  assert.equal(scrollToRow(0, 5, 7, 4), 1); // one past the foot: one row
  assert.equal(scrollToRow(1, 7, 7, 4), 3);
  assert.equal(scrollToRow(3, 3, 7, 4), 2); // one over the top: one row back
  assert.equal(scrollToRow(3, 1, 7, 4), 0);
});

test('today every tab fits, so the flame on any key leaves the scroll at none', () => {
  for (const tab of Object.keys(LOOK_PADS)) {
    assert.ok(tabRows(tab) <= LOOK_SHOWN, tab);
    LOOK_PADS[tab].forEach((k, i) => assert.equal(lookScrollTo(tab, 0, i), 0, `${tab} ${k.id}`));
  }
});

test('the bar: none when the rows fit; with more, at the boxes\' right, its thumb sized and placed by the scroll', () => {
  for (const [vw, vh] of [[195, 422], [420, 221], [176, 221]]) {
    const at = boxesAt(vw, vh);
    assert.equal(barAt(at, 0, 4), null);
    const top = barAt(at, 0, 8), foot = barAt(at, 4, 8);
    assert.ok(top.x >= at.x + 3 * at.bw && top.x + top.w <= at.card.x + at.card.w, `${vw}x${vh} inside the card`);
    assert.equal(top.thumb.y, top.y);
    assert.equal(foot.thumb.y + foot.thumb.h, foot.y + foot.h); // the last rows: the thumb at the foot
    assert.ok(Math.abs(top.thumb.h - top.h / 2) <= 1); // half the rows shown: half the track
  }
});

test('a tap with a scroll past what the tab has is kept to it: today the boxes are where they were', () => {
  const vw = 195, vh = 422, at = boxesAt(vw, vh), x = at.x + 2, y = at.y + 2;
  assert.deepEqual(lookCardAt(x, y, vw, vh, 'cloak', 3), lookCardAt(x, y, vw, vh, 'cloak', 0));
});
