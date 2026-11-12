// § asks (D-400): the ask card's arrows and tap, shared by Start over?, Delete …?, Play …? and
// the bed's, moved word for word from screens.js at the eighth audit (D-575). Each ask's own
// file gives its pick and close. `c` holds screens.js's askOf and menuOf, which the drawing uses too.
import { SURE_MENU, moveChoice } from '../../core/menu.js';
import { askCardAt } from '../../render/askcard.js';
import { view } from '../../render/screen.js';

export const ASKS = new Set(['sure', 'drop', 'easier', 'bed', 'sleepOut']); // and the bed's by day (D-488), or the garden bed's (D-565); Sleep here until morning? (D-758)

// An arrow or swipe: YES and NO side by side (D-400), or your own cold ashes' three (D-853)
export const askDir = (app, c) => (dir) => { app.chosen = moveChoice(app.chosen, { left: 'up', right: 'down' }[dir] ?? dir, (c?.menuOf(app.screen) ?? SURE_MENU).length); };

// A tap: a line picked, or the cross or outside the card closes it
export function askTap(app, c, pick, close) {
  const { askOf, menuOf } = c;
  return function tap(px, py, held) {
    if (held) return;
    const at = askCardAt(px, py, view.w, view.h, ...askOf(app.screen), menuOf(app.screen));
    if (at === 'out' || at === 'close') close(); // the round cross means No (D-400)
    else if (at) { app.chosen = at.line; pick(at.line); }
  };
}
