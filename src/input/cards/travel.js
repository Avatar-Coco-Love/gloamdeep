// § travel card (D-593): the waystones, home first, as the way to play card's rows (ways.js);
// Up and Down choose, Enter or a tap goes to a woken one, a dim one does nothing. The cross,
// Esc or a tap outside goes back. When the rows don't all fit, the list scrolls inside the card
// as the version history's (D-594): the chosen row kept in view, a swipe, Page Up or Page Down
// a page. `c` holds menuOf.
import { moveChoice } from '../../core/menu.js';
import { waysAt, waysScrollTo, waysPage, waysScrolls } from '../../render/ways.js';
import { view } from '../../render/screen.js';

export function travelCard(app, ui, show, c) {
  const rows = () => c.menuOf('travel');
  function pick(i) { const row = rows()[i]; if (!row || row.dim) return; show('play'); ui.goByStone(row.id); }
  function choose(i) { app.chosen = i; app.scroll = waysScrollTo(app.scroll, i, view.w, view.h, rows()); }
  function page(by) { ({ scroll: app.scroll, chosen: app.chosen } = waysPage(app.scroll, by, app.chosen, view.w, view.h, rows())); }
  const dir = (d, how) => {
    if (how === 'swipe' && waysScrolls(view.w, view.h, rows())) page(d === 'up' ? 1 : -1); // the list follows the finger
    else choose(moveChoice(app.chosen, d, rows().length));
  };
  const close = () => show('play'); // Esc or P
  function tap(px, py, held) {
    if (held) return;
    const at = waysAt(px, py, view.w, view.h, rows(), app.scroll);
    if (at === 'out' || at === 'close') close();
    else if (at) { app.chosen = at.line; pick(at.line); }
  }
  return { pick, dir, tap, close, page };
}
