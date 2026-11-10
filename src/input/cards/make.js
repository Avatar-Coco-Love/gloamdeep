// § make card (D-787): the bag card's Make tab, its pick, arrows, taps and close. `c` holds
// cardscreens.js's helpers: pickMake, makeChosen and turnBagTab.
import { MAKE_SLOTS, MAKE_COLS } from '../../core/bagmake.js';
import { makeCardAt } from '../../render/makecard.js';
import { view } from '../../render/screen.js';

export function makeCard(app, ui, show, c) {
  const { pickMake, makeChosen, turnBagTab } = c;
  const pick = () => { makeChosen(); }; // Enter, Space or MAKE: the chosen recipe made, a turn
  function dir(dir) { // the workbench card's 4 × 3 grid (D-387), its edges kept
    const to = app.chosen + { left: -1, right: 1, up: -MAKE_COLS, down: MAKE_COLS }[dir];
    pickMake(to >= 0 && to < MAKE_SLOTS ? to : app.chosen);
  }
  function tap(px, py, held) {
    if (held) return;
    const at = makeCardAt(px, py, view.w, view.h);
    if (at === 'out' || at === 'close') show('play');
    else if (at === 'make') makeChosen();
    else if (at?.tab) turnBagTab(at.tab);
    else if (at) pickMake(at.slot);
  }
  const close = () => show('play'); // Esc or P
  // C makes, as on the Bag tab (D-309)
  const type = (key) => { if (key === 'c') { makeChosen(); return true; } return false; };
  return { pick, dir, tap, close, type };
}
