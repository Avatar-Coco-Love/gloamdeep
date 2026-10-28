// § how to play: the controls, one page per way of playing (D-179, D-193).
// Touch, Mouse and Keyboard, then Crafting; Left and Right flip between them.
// Walking by touch or mouse follows the Controls switch, so only what works is
// shown (D-189). Frame says how to frame a creature (D-359, D-361). Crafting
// says how Make works, the same for every way (D-328).
// Plain data, no drawing.
import { swipesWalk, tapsWalk } from './settings.js';

export const HOWTO_PAGES = ['touch', 'mouse', 'keyboard', 'crafting'];
const NAMES = { touch: 'Touch', mouse: 'Mouse', keyboard: 'Keyboard', crafting: 'Crafting' };
export const pageName = (id) => NAMES[id];

// The next page, or the one before with back; it wraps round
export function nextPage(id, back = false) {
  const i = HOWTO_PAGES.indexOf(id), n = HOWTO_PAGES.length;
  return HOWTO_PAGES[(i + (back ? n - 1 : 1)) % n];
}

// § walking by pointer: a tap or click toward a side, a swipe or drag, a held
// finger or button; a tap or click on the hero always waits (D-085, D-189)
function walkWays(controls, tap, swipe, hold) {
  const taps = tapsWalk(controls), swipes = swipesWalk(controls);
  if (!taps) return [swipe];
  return [`${tap} a side of the hero`, swipes ? `${swipe}, or hold ${hold}` : `or hold ${hold}`];
}

// The page's rows: [{ action, ways: [text, …] }], one text per drawn line
export function howtoRows(page, controls) {
  if (page === 'crafting') {
    return [
      { action: 'Make', ways: ['Pick a stack in the bag', 'then press Make'] },
      { action: 'Oilcap', ways: ['3 make an oil flask'] },
      { action: 'Wood', ways: ['3 make a workbench'] },
      { action: 'Bench', ways: ['Bump it to make more'] },
    ];
  }
  if (page === 'keyboard') {
    return [
      { action: 'Walk', ways: ['Arrows or WASD'] },
      { action: 'Wait', ways: ['Space'] },
      { action: 'Lantern', ways: ['L'] },
      { action: 'Pause', ways: ['Esc or P'] },
      { action: 'Frame', ways: ['Tab'] },
    ];
  }
  const touch = page === 'touch';
  return [
    { action: 'Walk', ways: touch ? walkWays(controls, 'Tap', 'Swipe', 'a finger') : walkWays(controls, 'Click', 'Drag', 'the button') },
    { action: 'Wait', ways: [touch ? 'Tap the hero' : 'Click the hero'] },
    { action: 'Lantern', ways: ['The lantern button'] },
    { action: 'Pause', ways: ['The pause button'] },
    { action: 'Frame', ways: [touch ? "Tap a creature's plaque" : "Click a creature's plaque"] },
  ];
}

// The page in words, for screen readers
export const howtoWords = (page, controls) =>
  `How to play, ${pageName(page)}. ` + howtoRows(page, controls).map((r) => `${r.action}: ${r.ways.join(' ')}.`).join(' ') +
  ' Left or Right for another page. Esc or the close button goes back.';
