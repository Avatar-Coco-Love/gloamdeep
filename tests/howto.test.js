// § how to play: the pages of the controls (D-193)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { HOWTO_PAGES, nextPage, howtoRows, howtoWords, pageName } from '../src/core/howto.js';
const SWITCHES = ['on', 'off'].flatMap((swipe) => ['off', 'step', 'walk'].flatMap((tap) => ['on', 'off'].map((pad) => ({ swipe, tap, pad })))); // every Swipe, Tap and Arrow pad pick
import { howtoAt } from '../src/render/howto.js';
import { cardAt } from '../src/render/bag.js';
import { textWidth } from '../src/render/font.js';

test('Touch, Mouse, Keyboard, Bag and Bench each have a page, and Left and Right flip round them (D-484)', () => {
  assert.deepEqual(HOWTO_PAGES, ['touch', 'mouse', 'keyboard', 'bag', 'bench']);
  assert.equal(nextPage('touch'), 'mouse');
  assert.equal(nextPage('keyboard'), 'bag');
  assert.equal(nextPage('bag'), 'bench');
  assert.equal(nextPage('bench'), 'touch');
  assert.equal(nextPage('touch', true), 'bench');
});

test('every controls page lists Walk, Wait, Lantern, Pause and Frame, and nothing else', () => {
  for (const p of ['touch', 'mouse', 'keyboard']) assert.deepEqual(howtoRows(p, { swipe: 'on', tap: 'walk' }).map((r) => r.action), ['Walk', 'Wait', 'Lantern', 'Pause', 'Frame']);
});

test('Frame says how to frame a creature on each way of playing (D-361)', () => {
  assert.deepEqual(howtoRows('touch', { swipe: 'on', tap: 'off' })[4].ways, ["Tap a creature's plaque"]);
  assert.deepEqual(howtoRows('mouse', { swipe: 'off', tap: 'walk' })[4].ways, ["Click a creature's plaque"]);
  assert.deepEqual(howtoRows('keyboard', { swipe: 'on', tap: 'walk' })[4].ways, ['Tab']);
});

test('walking by touch follows the Swipe, Tap and Arrow pad lines; a tap on the hero still waits (D-408, D-449)', () => {
  assert.deepEqual(howtoRows('touch', { swipe: 'on', tap: 'step' })[0].ways, ['Tap toward a tile', 'or swipe', 'Arrow pad in Settings']);
  assert.deepEqual(howtoRows('mouse', { swipe: 'off', tap: 'step', pad: 'on' })[0].ways, ['Click toward a tile', 'Hold to keep going', 'or the arrow pad']);
  assert.deepEqual(howtoRows('touch', { swipe: 'on', tap: 'walk' })[0].ways, ['Tap where to go', 'or swipe', 'Arrow pad in Settings']);
  assert.deepEqual(howtoRows('mouse', { swipe: 'on', tap: 'walk', pad: 'on' })[0].ways, ['Click where to go', 'or drag', 'or the arrow pad']);
  assert.deepEqual(howtoRows('touch', { swipe: 'off', tap: 'walk' })[0].ways, ['Tap where to go', 'Tap again to stop', 'Arrow pad in Settings']);
  assert.deepEqual(howtoRows('touch', { swipe: 'on', tap: 'off' })[0].ways, ['Swipe', 'Arrow pad in Settings']);
  assert.deepEqual(howtoRows('mouse', { swipe: 'on', tap: 'off', pad: 'on' })[0].ways, ['Drag', 'or the arrow pad']);
  assert.deepEqual(howtoRows('touch', { swipe: 'off', tap: 'off' })[0].ways, ['Turn on in Settings']);
  assert.deepEqual(howtoRows('touch', { swipe: 'off', tap: 'off', pad: 'on' })[0].ways, ['The arrow pad']);
  assert.deepEqual(howtoRows('touch', { swipe: 'on', tap: 'off' })[1].ways, ['Tap the hero']);
  assert.deepEqual(howtoRows('keyboard', { swipe: 'on', tap: 'off', pad: 'on' })[0].ways, ['Arrows or WASD']);
});

// A sideways phone's room (D-377), and the narrowest a card is drawn on
const VW = 300, VH = 176;

test('every way fits the card beside its action, and the page fits under the tabs (D-390)', () => {
  const card = cardAt(VW, VH);
  for (const p of HOWTO_PAGES) for (const c of SWITCHES) {
    const rows = howtoRows(p, c);
    assert.ok(52 + rows.reduce((n, r) => n + r.ways.length, 0) * 11 <= card.h - 12);
    for (const r of rows) for (const w of r.ways) assert.ok(12 + 8 + 44 + textWidth(w) <= card.w - 12, w);
  }
});

test('a tap on a tab opens its page; the cross or a tap outside goes back (D-390)', () => {
  const { x, y, w, close } = cardAt(VW, VH);
  assert.deepEqual(howtoAt(x + 24, y + 30, VW, VH), { page: 'touch' });
  assert.deepEqual(howtoAt(x + w - 24, y + 30, VW, VH), { page: 'bench' });
  assert.equal(howtoAt(close.x, close.y, VW, VH), 'close');
  assert.equal(howtoAt(2, 2, VW, VH), 'out');
  assert.equal(howtoAt(x + w / 2, y + 80, VW, VH), null);
});

test('the Bag and Bench pages say how making works, whatever the Controls switch (D-328, D-484, D-488)', () => {
  assert.deepEqual(howtoRows('bag', { swipe: 'on', tap: 'off' }).map((r) => r.action), ['Make', 'Oilcap', 'Glass', 'Dust', 'Wood']);
  assert.deepEqual(howtoRows('bench', { swipe: 'on', tap: 'off' }).map((r) => r.action), ['Bench', 'Make', 'Pick', 'Wick', 'Vest', 'Charm', 'Bed']);
  for (const p of ['bag', 'bench']) assert.deepEqual(howtoRows(p, { swipe: 'off', tap: 'walk' }), howtoRows(p, { swipe: 'on', tap: 'walk' }));
  assert.match(howtoWords('bag', 'both'), /^How to play, Bag\. Make: Pick a stack in the bag then press Make\./);
  assert.match(howtoWords('bench', 'both'), /^How to play, Bench\. Bench: Bump it to make more\./);
});

test('a screen reader hears the page in words', () => {
  assert.match(howtoWords('keyboard', 'both'), /^How to play, Keyboard\. Walk: Arrows or WASD\. Wait: Space\..* Esc or the close button goes back\.$/);
});

test('the five tabs fit the narrowest card, one gap apart at least (D-484)', () => {
  const card = cardAt(VW, VH), ws = HOWTO_PAGES.map((p) => textWidth(pageName(p)));
  assert.ok(12 + 8 + ws.reduce((a, b) => a + b, 0) + 10 * (ws.length - 1) <= card.w - 12);
});
