// § trade card (D-494, D-495): the peddler's card, its pick, arrows, taps and close, moved
// word for word from screens.js at the eighth audit (D-573). `c` holds cardscreens.js's
// helpers: tradeChosen, moveTrade, turnTrade and pickTrade.
// Where the grid's slots don't all fit, their window scrolls as the bag card's (D-1011, D-1013):
// a drag or flick on it or its bar, the wheel a row a notch, and an arrow or a tap keeps the
// chosen slot's row in view; app.tradeScroll is its scroller, both tabs'.
import { bagSize } from '../../core/bag.js';
import { tradeAt } from '../../render/tradepanel.js';
import { tradeWindow } from '../../render/tradescroll.js';
import { rowSpan } from '../../render/bagscroll.js';
import { scroller, keepInView } from '../../render/scroll.js';
import { gridScroll } from './gridscroll.js';
import { view } from '../../render/screen.js';

export function tradeCard(app, ui, show, c) {
  const { tradeChosen, moveTrade, turnTrade, pickTrade } = c;
  const win = () => tradeWindow(view.w, view.h, bagSize(app.state));
  const sc = () => (app.tradeScroll ??= scroller());
  function inView() { const w = win(); if (w.max && app.chosen >= 0) keepInView(sc(), ...rowSpan(w, app.chosen), w.h, w.max, w.pitch); }
  const pick = () => { tradeChosen(); inView(); }; // Sell or Buy one, or on the tabs turn them
  const dir = (dir) => { moveTrade(dir); inView(); }; // the grid, the tabs above it (D-495)
  function tap(px, py, held) {
    if (held) return;
    const at = tradeAt(px, py, view.w, view.h, app.tab, bagSize(app.state), win(), sc().y);
    if (at === 'out' || at === 'close') show('play');
    else if (at === 'act') { if (app.chosen >= 0) tradeChosen(); }
    else if (at?.tab) turnTrade(at.tab, false);
    else if (at) { pickTrade(at.slot); inView(); } // a row half showing glides into view
  }
  const close = () => show('play'); // Esc or P
  const { grabs, scroll, wheel } = gridScroll(win, sc); // § scroll (D-1011), gridscroll.js
  return { pick, dir, tap, close, grabs, scroll, wheel };
}
