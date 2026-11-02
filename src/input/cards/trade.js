// § trade card (D-494, D-495): the peddler's card, its pick, arrows, taps and close, moved
// word for word from screens.js at the eighth audit (D-573). `c` holds cardscreens.js's
// helpers: tradeChosen, moveTrade, turnTrade and pickTrade.
import { bagSize } from '../../core/bag.js';
import { tradeAt } from '../../render/tradepanel.js';
import { view } from '../../render/screen.js';

export function tradeCard(app, ui, show, c) {
  const { tradeChosen, moveTrade, turnTrade, pickTrade } = c;
  const pick = () => { tradeChosen(); }; // Sell or Buy one, or on the tabs turn them
  const dir = (dir) => { moveTrade(dir); }; // the grid, the tabs above it (D-495)
  function tap(px, py, held) {
    if (held) return;
    const at = tradeAt(px, py, view.w, view.h, app.tab, bagSize(app.state));
    if (at === 'out' || at === 'close') show('play');
    else if (at === 'act') { if (app.chosen >= 0) tradeChosen(); }
    else if (at?.tab) turnTrade(at.tab, false);
    else if (at) pickTrade(at.slot);
  }
  const close = () => show('play'); // Esc or P
  return { pick, dir, tap, close };
}
