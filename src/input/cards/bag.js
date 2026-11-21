// § bag card (D-247, D-385, D-546, D-548, D-554, D-558, D-559): the bag's card, its pick,
// arrows, taps and close, moved word for word from screens.js at the eighth audit (D-573).
// `c` holds cardscreens.js's helpers: useChosen, moveBag, canStore, pickStore, storeNear,
// pickSort, sortBag, dropChosen, pickGear, pickSlot and turnBagTab (its tabs, D-787). Its C and X keys moved from onType (D-578); E eats a minnow (D-615).
// Where its slots don't all fit, their window scrolls (D-1011): a drag or flick on it or its bar, the wheel
// a row a notch, and an arrow or a tap keeps the chosen slot's row in view; app.bagScroll is its scroller.
import { bagSize } from '../../core/bag.js';
import { get } from '../../core/registry.js';
import { bagAt, twoButtons, gearChosen, cardAt } from '../../render/bag.js';
import { bagTabAt } from '../../render/bagtabs.js';
import { view } from '../../render/screen.js';
import { bagWindow, grabsAt, barTo, rowSpan } from '../../render/bagscroll.js';
import { scroller, grab, drag, release, letGo, nudge, keepInView, settle, snap } from '../../render/scroll.js';

export function bagCard(app, ui, show, c) {
  const { useChosen, moveBag, canStore, pickStore, storeNear, pickSort, sortBag, dropChosen, pickGear, pickSlot, turnBagTab } = c;
  const pick = () => { useChosen(); };
  const win = () => bagWindow(view.w, view.h, bagSize(app.state));
  const sc = () => (app.bagScroll ??= scroller());
  function inView() { const w = win(); if (w.max && app.chosen >= 0) keepInView(sc(), ...rowSpan(w, app.chosen), w.h, w.max, w.pitch); }
  const dir = (dir) => { moveBag(dir); inView(); }; // a 3 × 2 grid (D-385), bigger with the Pouch (D-548), the gear row above it (D-554)
  function tap(px, py, held) {
    if (held) return;
    const tab = bagTabAt(cardAt(view.w, view.h), px, py); // BAG and MAKE in the title row (D-787)
    if (tab) { turnBagTab(tab); return; }
    const s = app.state.bag[app.chosen], g = gearChosen(app.chosen); // a gear slot chosen: only Take off's corner (D-554)
    const at = bagAt(px, py, view.w, view.h, twoButtons(s && get(s.id)), !!(s && get(s.id).sets), !!s, bagSize(app.state), g >= 0, canStore(), !!(s && get(s.id).rest), win(), sc().y);
    if (at === 'out' || at === 'close') show('play');
    else if (at === 'store') { pickStore(); storeNear(); }
    else if (at === 'sort') { pickSort(); sortBag(); }
    else if (at === 'drop') dropChosen();
    else if (at === 'act' || at === 'make') useChosen(at === 'make');
    else if (at?.gear !== undefined) pickGear(at.gear);
    else if (at) { pickSlot(at.slot); inView(); } // a row half showing glides into view
  }
  // § scroll (D-1011): the press, drag and lift on the slots' window or its bar
  const grabs = (x, y) => !!grabsAt(win(), x, y);
  function scroll(phase, x, y, t) {
    const w = win(), s = sc();
    if (phase === 'down') { s.bar = grabsAt(w, x, y) === 'bar'; if (s.bar) { s.moving = false; s.v = 0; s.y = barTo(w, y); } else grab(s, y, t); return false; }
    if (s.bar) { if (phase === 'move') s.y = barTo(w, y); else { s.bar = false; settle(s, snap(s.y, w.max, w.pitch)); } return phase === 'let'; } // a tap on the bar's track only moves it
    if (phase === 'move') drag(s, y, t, w.max);
    else if (phase === 'up') release(s, w.max, w.pitch);
    else if (phase === 'let') return letGo(s, w.max, w.pitch);
    return false;
  }
  const wheel = (by) => { const w = win(); if (!w.max) return false; nudge(sc(), by, w.max, w.pitch); return true; };
  const close = () => show('play'); // Esc or P
  // C makes (D-309), E eats a minnow (D-615), X drops (D-546)
  const chosen = () => { const s = app.state.bag[app.chosen]; return s && get(s.id); };
  function type(key) {
    if (key === 'c') { if (!chosen()?.oil) useChosen(true); return true; } // C never eats a minnow
    if (key === 'e') { if (chosen()?.oil && chosen().eats) useChosen(true); return true; }
    if (key === 'x') { dropChosen(); return true; }
    return false;
  }
  return { pick, dir, tap, close, type, grabs, scroll, wheel };
}
