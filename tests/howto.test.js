// § how to play: the pages of the controls (D-193)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { HOWTO_PAGES, nextPage, howtoRows, howtoWords } from '../src/core/howto.js';
const SWITCHES = ['on', 'off'].flatMap((swipe) => ['on', 'off'].map((tapwalk) => ({ swipe, tapwalk }))); // every Swipe and Tap to walk pick
import { howtoAt } from '../src/render/howto.js';
import { cardAt } from '../src/render/bag.js';
import { textWidth } from '../src/render/font.js';

test('Touch, Mouse, Keyboard and Crafting each have a page, and Left and Right flip round them', () => {
  assert.deepEqual(HOWTO_PAGES, ['touch', 'mouse', 'keyboard', 'crafting']);
  assert.equal(nextPage('touch'), 'mouse');
  assert.equal(nextPage('keyboard'), 'crafting');
  assert.equal(nextPage('crafting'), 'touch');
  assert.equal(nextPage('touch', true), 'crafting');
});

test('every controls page lists Walk, Wait, Lantern, Pause and Frame, and nothing else', () => {
  for (const p of ['touch', 'mouse', 'keyboard']) assert.deepEqual(howtoRows(p, { swipe: 'on', tapwalk: 'on' }).map((r) => r.action), ['Walk', 'Wait', 'Lantern', 'Pause', 'Frame']);
});

test('Frame says how to frame a creature on each way of playing (D-361)', () => {
  assert.deepEqual(howtoRows('touch', { swipe: 'on', tapwalk: 'off' })[4].ways, ["Tap a creature's plaque"]);
  assert.deepEqual(howtoRows('mouse', { swipe: 'off', tapwalk: 'on' })[4].ways, ["Click a creature's plaque"]);
  assert.deepEqual(howtoRows('keyboard', { swipe: 'on', tapwalk: 'on' })[4].ways, ['Tab']);
});

test('walking by touch follows the Swipe and Tap to walk switches; a tap on the hero still waits (D-408)', () => {
  assert.deepEqual(howtoRows('touch', { swipe: 'on', tapwalk: 'on' })[0].ways, ['Tap where to go', 'or swipe']);
  assert.deepEqual(howtoRows('mouse', { swipe: 'on', tapwalk: 'on' })[0].ways, ['Click where to go', 'or drag']);
  assert.deepEqual(howtoRows('touch', { swipe: 'off', tapwalk: 'on' })[0].ways, ['Tap where to go', 'Tap again to stop']);
  assert.deepEqual(howtoRows('touch', { swipe: 'on', tapwalk: 'off' })[0].ways, ['Swipe']);
  assert.deepEqual(howtoRows('mouse', { swipe: 'on', tapwalk: 'off' })[0].ways, ['Drag']);
  assert.deepEqual(howtoRows('touch', { swipe: 'off', tapwalk: 'off' })[0].ways, ['Turn on in Settings']);
  assert.deepEqual(howtoRows('touch', { swipe: 'on', tapwalk: 'off' })[1].ways, ['Tap the hero']);
  assert.deepEqual(howtoRows('keyboard', { swipe: 'on', tapwalk: 'off' })[0].ways, ['Arrows or WASD']);
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
  assert.deepEqual(howtoAt(x + w - 24, y + 30, VW, VH), { page: 'crafting' });
  assert.equal(howtoAt(close.x, close.y, VW, VH), 'close');
  assert.equal(howtoAt(2, 2, VW, VH), 'out');
  assert.equal(howtoAt(x + w / 2, y + 80, VW, VH), null);
});

test('the Crafting page says how Make works, whatever the Controls switch (D-328)', () => {
  assert.deepEqual(howtoRows('crafting', { swipe: 'on', tapwalk: 'off' }).map((r) => r.action), ['Make', 'Oilcap', 'Wood', 'Bench']);
  assert.deepEqual(howtoRows('crafting', { swipe: 'off', tapwalk: 'on' }), howtoRows('crafting', { swipe: 'on', tapwalk: 'on' }));
  assert.match(howtoWords('crafting', 'both'), /^How to play, Crafting\. Make: Pick a stack in the bag then press Make\./);
});

test('a screen reader hears the page in words', () => {
  assert.match(howtoWords('keyboard', 'both'), /^How to play, Keyboard\. Walk: Arrows or WASD\. Wait: Space\..* Esc or the close button goes back\.$/);
});
