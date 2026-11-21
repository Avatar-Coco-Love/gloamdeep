// § bag's scroll (D-1011, B-014): where a bag's slots don't fit, they show through a window of
// whole rows that a drag, a flick, the wheel or the arrows scroll, settling on whole rows
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scroller, grab, drag, release, letGo, nudge, keepInView, stepScroll } from '../src/render/scroll.js';
import { bagWindow, grabsAt, rowSpan } from '../src/render/bagscroll.js';
import { bagAt, bagShape, cardAt, detailAt, HELD_Y, LINE_H, PAD } from '../src/render/bag.js';

globalThis.devicePixelRatio = 1;
const run = (s, max, pitch, from = 0, ms = 3000) => { for (let t = from; t <= from + ms; t += 16) stepScroll(s, t, max, pitch); };

test('a flick glides on and settles on a whole row, inside its reach', () => {
  for (const speed of [0.2, 0.8, 2.5]) {
    const s = scroller();
    grab(s, 100, 0); drag(s, 100, 0, 120); drag(s, 100 - speed * 40, 40, 120); release(s, 120, 30);
    run(s, 120, 30, 40);
    assert.ok(!s.moving && s.y % 30 === 0 && s.y >= 0 && s.y <= 120, `speed ${speed}: rests at ${s.y}`);
    assert.ok(s.y > 0, `speed ${speed}: it moved`);
  }
});

test('a slow drag let go settles on the nearest row', () => {
  const s = scroller();
  grab(s, 50, 0); drag(s, 50, 0, 90); drag(s, 38, 400, 90); drag(s, 38, 600, 90); release(s, 90, 30);
  run(s, 90, 30, 600);
  assert.equal(s.y, 0);
  grab(s, 50, 0); drag(s, 50, 0, 90); drag(s, 30, 400, 90); drag(s, 30, 600, 90); release(s, 90, 30);
  run(s, 90, 30, 600);
  assert.equal(s.y, 30);
});

test('pulled past an end it gives less than the finger moves, and springs back', () => {
  const s = scroller();
  grab(s, 0, 0); drag(s, 0, 0, 60); drag(s, 40, 100, 60);
  assert.ok(s.y < 0 && s.y > -40, `gave ${s.y}`);
  drag(s, 40, 400, 60); release(s, 60, 30); run(s, 60, 30, 400);
  assert.equal(s.y, 0);
});

test('a touch on a gliding grid stops it and is not a tap; on a still one it is', () => {
  const s = scroller();
  nudge(s, 2, 90, 30); stepScroll(s, 0, 90, 30); stepScroll(s, 16, 90, 30); stepScroll(s, 32, 90, 30);
  assert.equal(grab(s, 10, 40), true);
  assert.equal(letGo(s, 90, 30), true);
  run(s, 90, 30, 40);
  assert.equal(s.y % 30, 0);
  grab(s, 10, 5000);
  assert.equal(letGo(s, 90, 30), false);
});

test('the wheel moves a row a notch, and the chosen row is kept in view', () => {
  const s = scroller();
  nudge(s, 1, 60, 30); run(s, 60, 30);
  assert.equal(s.y, 30);
  nudge(s, 5, 60, 30); run(s, 60, 30, 4000);
  assert.equal(s.y, 60);
  keepInView(s, 0, 26, 56, 60, 30); run(s, 60, 30, 8000);
  assert.equal(s.y, 0);
  keepInView(s, 60, 86, 56, 60, 30); run(s, 60, 30, 12000);
  assert.equal(s.y, 30);
});

test('a bag shrunk or a window grown settles back inside the reach', () => {
  const s = scroller();
  s.y = 90; s.rest = 90;
  run(s, 30, 30);
  assert.equal(s.y, 30);
});

// The views measured at D-1010: the smallest phones, a small PC window, and the common phones
const FIT = [[176, 264], [176, 221], [312, 176], [180, 320], [195, 422], [384, 216], [160, 284]];
test('the window shows whole rows, and the chosen find\'s name and count stay above DROP', () => {
  for (const [vw, vh] of FIT) for (const size of [6, 9, 12]) {
    const win = bagWindow(vw, vh, size), shape = bagShape(size), card = cardAt(vw, vh, shape.detail);
    assert.equal((win.h + 4) % win.pitch, 0, `${vw}×${vh}, ${size}: whole rows`);
    assert.equal(win.max % win.pitch, 0);
    if (vh <= vw) continue;
    const { dy } = detailAt(card, vw, vh, shape.detail, HELD_Y, win.top + win.h + 12);
    assert.ok(dy + LINE_H + 7 <= card.drop.y - 2, `${vw}×${vh}, ${size} slots: words end at ${dy + LINE_H + 7}, DROP at ${card.drop.y}`);
  }
});

test('a bag that fits shows as before: only the small upright windows scroll', () => {
  for (const [vw, vh] of [[312, 176], [180, 320], [195, 422], [384, 216], [160, 284]]) for (const size of [6, 9, 12]) assert.equal(bagWindow(vw, vh, size).max, 0, `${vw}×${vh}, ${size}`);
  assert.equal(bagWindow(176, 264, 6).max, 0);
  assert.ok(bagWindow(176, 264, 12).max > 0 && bagWindow(176, 221, 12).max > 0 && bagWindow(176, 221, 6).max > 0);
});

test('a tap picks only a slot showing in the window, scrolled', () => {
  const win = bagWindow(176, 264, 12), { card, top } = win, x = card.x + PAD + 5, y = card.y + top + 5;
  assert.deepEqual(bagAt(x, y, 176, 264, false, false, false, 12, false, false, false, win, 0), { slot: 0 });
  assert.deepEqual(bagAt(x, y, 176, 264, false, false, false, 12, false, false, false, win, 30), { slot: 4 });
  const below = card.y + top + win.h + 10; // where the hidden third row lies, under the window
  const at = bagAt(x, below, 176, 264, false, false, false, 12, false, false, false, win, 0);
  assert.ok(at?.slot === undefined, 'no hidden slot under the window');
  assert.deepEqual(rowSpan(win, 5), [30, 56]);
});

test('a drag starts on the slots or the bar only where they scroll', () => {
  const win = bagWindow(176, 264, 12), { card, top, shape } = win, y = card.y + top + 10;
  assert.equal(grabsAt(win, card.x + PAD + 3, y), 'grid');
  assert.equal(grabsAt(win, card.x + PAD + shape.w + 5, y), 'bar');
  assert.equal(grabsAt(win, card.x + PAD + 3, card.y + top - 6), null);
  assert.equal(grabsAt(bagWindow(195, 422, 12), card.x + PAD + 3, y), null);
});
