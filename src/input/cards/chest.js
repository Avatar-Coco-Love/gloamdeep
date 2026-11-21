// § chest card (CH3, CH4, D-330, D-331, D-387): a set-down stash chest's card, its pick,
// arrows, taps and close, moved word for word from screens.js at the eighth audit (D-573).
// `c` holds cardscreens.js's helpers: pickChest and takeDownBench.
// Where the bag's slots don't all fit, their window scrolls as the bag card's (D-1011): a drag or
// flick on it or its bar, the wheel a row a notch, and an arrow or a tap keeps the chosen bag
// slot's row in view; app.chestScroll is its scroller.
import { bagSize } from '../../core/bag.js';
import { CHEST_BAG, CHEST_TAKE, CHEST_STORE, moveChest } from '../../core/chest.js';
import { chestAt } from '../../render/chestpanel.js';
import { chestWindow } from '../../render/chestscroll.js';
import { rowSpan } from '../../render/bagscroll.js';
import { scroller, keepInView } from '../../render/scroll.js';
import { gridScroll } from './gridscroll.js';
import { view } from '../../render/screen.js';

export function chestCard(app, ui, show, c) {
  const { pickChest, takeDownBench } = c;
  const win = () => chestWindow(view.w, view.h, bagSize(app.state));
  const sc = () => (app.chestScroll ??= scroller());
  function inView() { const w = win(), i = app.chosen - CHEST_BAG; if (w.max && i >= 0 && app.chosen < CHEST_TAKE) keepInView(sc(), ...rowSpan(w, i), w.h, w.max, w.pitch); }
  // A slot's stack moved to the other side; Store matching; Deconstruct, only when empty (CH5)
  function pick(i) { if (i === CHEST_TAKE) takeDownBench(); else if (i === CHEST_STORE) ui.store(app.bench.x, app.bench.y); else { ui.stash(app.bench.x, app.bench.y, i); pickChest(i); } }
  const dir = (dir) => { pickChest(moveChest(app.chosen, dir, bagSize(app.state))); inView(); };
  function tap(px, py, held) {
    if (held) return;
    const at = chestAt(px, py, view.w, view.h, bagSize(app.state), win(), sc().y);
    if (at === 'out' || at === 'close') show('play');
    else if (at === 'take') { app.chosen = CHEST_TAKE; pick(CHEST_TAKE); }
    else if (at === 'store') { pickChest(CHEST_STORE); pick(CHEST_STORE); }
    else if (at) { pick(at.slot); inView(); } // a row half showing glides into view
  }
  const close = () => show('play'); // Esc or P
  const { grabs, scroll, wheel } = gridScroll(win, sc); // § scroll (D-1011), gridscroll.js
  return { pick, dir, tap, close, grabs, scroll, wheel };
}
