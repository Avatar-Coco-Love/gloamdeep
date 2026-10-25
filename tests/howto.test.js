// § how to play: the pages of the controls (D-193)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { HOWTO_PAGES, nextPage, howtoRows, howtoWords } from '../src/core/howto.js';
import { CONTROLS } from '../src/core/settings.js';
import { howtoAt, PAGE_Y } from '../src/render/howto.js';
import { textWidth } from '../src/render/font.js';
import { W, SCREEN_H } from '../src/render/screen.js';

test('Touch, Mouse, Keyboard and Crafting each have a page, and Left and Right flip round them', () => {
  assert.deepEqual(HOWTO_PAGES, ['touch', 'mouse', 'keyboard', 'crafting']);
  assert.equal(nextPage('touch'), 'mouse');
  assert.equal(nextPage('keyboard'), 'crafting');
  assert.equal(nextPage('crafting'), 'touch');
  assert.equal(nextPage('touch', true), 'crafting');
});

test('every controls page lists Walk, Wait, Lantern, Pause and Frame, and nothing else', () => {
  for (const p of ['touch', 'mouse', 'keyboard']) assert.deepEqual(howtoRows(p, 'both').map((r) => r.action), ['Walk', 'Wait', 'Lantern', 'Pause', 'Frame']);
});

test('Frame says how to frame a creature on each way of playing (D-361)', () => {
  assert.deepEqual(howtoRows('touch', 'swipe')[4].ways, ["Tap a creature's plaque"]);
  assert.deepEqual(howtoRows('mouse', 'tap')[4].ways, ["Click a creature's plaque"]);
  assert.deepEqual(howtoRows('keyboard', 'both')[4].ways, ['Tab']);
});

test('walking by touch follows the Controls switch; a tap on the hero still waits', () => {
  assert.deepEqual(howtoRows('touch', 'both')[0].ways, ['Tap a side of the hero', 'Swipe, or hold a finger']);
  assert.deepEqual(howtoRows('touch', 'tap')[0].ways, ['Tap a side of the hero', 'or hold a finger']);
  assert.deepEqual(howtoRows('touch', 'swipe')[0].ways, ['Swipe']);
  assert.deepEqual(howtoRows('mouse', 'swipe')[0].ways, ['Drag']);
  assert.deepEqual(howtoRows('touch', 'swipe')[1].ways, ['Tap the hero']);
  assert.deepEqual(howtoRows('keyboard', 'swipe')[0].ways, ['Arrows or WASD']);
});

test('every way fits the picture beside its action, and the page fits its height', () => {
  for (const p of HOWTO_PAGES) for (const c of CONTROLS) {
    const rows = howtoRows(p, c.id);
    assert.ok(rows.reduce((n, r) => n + r.ways.length, 0) <= 6);
    for (const r of rows) for (const w of r.ways) assert.ok(textWidth(w) + 38 + 2 * 8 <= W, w);
  }
  assert.ok(PAGE_Y - 16 >= 0 && howtoAt(W / 2, SCREEN_H - 1) === null);
});

test('a tap on the page line flips back on its left third and on elsewhere', () => {
  assert.equal(howtoAt(10, PAGE_Y + 2), 'prev');
  assert.equal(howtoAt(W - 10, PAGE_Y + 2), 'next');
  assert.equal(howtoAt(W / 2, PAGE_Y - 20), null);
});

test('the Crafting page says how Make works, whatever the Controls switch (D-328)', () => {
  assert.deepEqual(howtoRows('crafting', 'swipe').map((r) => r.action), ['Make', 'Oilcap', 'Wood', 'Bench']);
  assert.deepEqual(howtoRows('crafting', 'tap'), howtoRows('crafting', 'both'));
  assert.match(howtoWords('crafting', 'both'), /^How to play, Crafting\. Make: Pick a stack in the bag then press Make\./);
});

test('a screen reader hears the page in words', () => {
  assert.match(howtoWords('keyboard', 'both'), /^How to play, Keyboard\. Walk: Arrows or WASD\. Wait: Space\./);
});
