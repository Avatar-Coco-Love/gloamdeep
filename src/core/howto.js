// § how to play: the controls, one page per way of playing (D-179, D-193).
// Touch, Mouse and Keyboard, then crafting's two, Bag and Bench (D-484); Left and Right flip between them.
// Walking by touch or mouse follows the Swipe and Tap lines, so only
// what works is shown, and the arrow pad's line (D-189, D-408). Frame says how to frame a creature (D-359, D-361). Bag and
// Bench say how making works, the same for every way (D-328): in the bag, and at the workbench.
// Plain data, no drawing.
import { swipesWalk, tapsWalk, tapsStep, padShown } from './settings.js';

export const HOWTO_PAGES = ['touch', 'mouse', 'keyboard', 'bag', 'bench'];
const NAMES = { touch: 'Touch', mouse: 'Mouse', keyboard: 'Keyboard', bag: 'Bag', bench: 'Bench' };
export const pageName = (id) => NAMES[id];

// The next page, or the one before with back; it wraps round
export function nextPage(id, back = false) {
  const i = HOWTO_PAGES.indexOf(id), n = HOWTO_PAGES.length;
  return HOWTO_PAGES[(i + (back ? n - 1 : 1)) % n];
}

// § walking by pointer: a tap or click on a tile walks there, another stops (Tap: Walk),
// or steps once toward it, held keeps stepping (Tap: Step), and a swipe or drag steps once
// (D-406, D-408, D-449); a tap or click on the hero always waits (D-085). A last line names
// the arrow pad, or where to turn it on (D-408)
function walkWays(settings, tap, swipe) {
  const walks = tapsWalk(settings), steps = tapsStep(settings), swipes = swipesWalk(settings), pad = padShown(settings);
  if (!walks && !steps && !swipes) return [pad ? 'The arrow pad' : 'Turn on in Settings'];
  const ways = walks ? [`${tap} where to go`, swipes ? `or ${swipe.toLowerCase()}` : `${tap} again to stop`]
    : steps ? [`${tap} toward a tile`, swipes ? `or ${swipe.toLowerCase()}` : 'Hold to keep going'] : [swipe];
  return [...ways, pad ? 'or the arrow pad' : 'Arrow pad in Settings'];
}

// The page's rows: [{ action, ways: [text, …] }], one text per drawn line
export function howtoRows(page, settings) {
  if (page === 'bag') {
    return [
      { action: 'Make', ways: ['Pick a stack in the bag', 'then press Make'] },
      { action: 'Oilcap', ways: ['3 make an oil flask'] },
      { action: 'Glass', ways: ['With 2 oilcaps, a flask'] },
      { action: 'Dust', ways: ['With 1 wood, a torch'] },
      { action: 'Wood', ways: ['3 make a workbench'] },
    ];
  }
  if (page === 'bench') {
    return [
      { action: 'Bench', ways: ['Bump it to make more'] },
      { action: 'Make', ways: ['Choose a thing, then Make'] },
      { action: 'Pick', ways: ['In the bag, breaks veins'] },
      { action: 'Wick', ways: ['Fit it in the bag'] },
      { action: 'Vest', ways: ['Wear it from the bag'] },
      { action: 'Charm', ways: ['Wear two from the bag'] },
      { action: 'Bed', ways: ['Bump it at night to sleep'] },
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
    { action: 'Walk', ways: touch ? walkWays(settings, 'Tap', 'Swipe') : walkWays(settings, 'Click', 'Drag') },
    { action: 'Wait', ways: [touch ? 'Tap the hero' : 'Click the hero'] },
    { action: 'Lantern', ways: ['The lantern button'] },
    { action: 'Pause', ways: ['The pause button'] },
    { action: 'Frame', ways: [touch ? "Tap a creature's plaque" : "Click a creature's plaque"] },
  ];
}

// The page in words, for screen readers
export const howtoWords = (page, settings) =>
  `How to play, ${pageName(page)}. ` + howtoRows(page, settings).map((r) => `${r.action}: ${r.ways.join(' ')}.`).join(' ') +
  ' Left or Right for another page. Esc or the close button goes back.';
