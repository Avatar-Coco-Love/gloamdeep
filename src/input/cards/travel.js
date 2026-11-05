// § travel card (D-593): the waystones, home first, as the way to play card's rows (ways.js);
// Up and Down choose, Enter or a tap goes to a woken one, a dim one does nothing. The cross,
// Esc or a tap outside goes back. `c` holds menuOf.
import { moveChoice } from '../../core/menu.js';
import { waysAt } from '../../render/ways.js';
import { view } from '../../render/screen.js';

export function travelCard(app, ui, show, c) {
  const rows = () => c.menuOf('travel');
  function pick(i) { const row = rows()[i]; if (!row || row.dim) return; show('play'); ui.goByStone(row.id); }
  const dir = (d) => { app.chosen = moveChoice(app.chosen, d, rows().length); };
  const close = () => show('play'); // Esc or P
  function tap(px, py, held) {
    if (held) return;
    const at = waysAt(px, py, view.w, view.h, rows());
    if (at === 'out' || at === 'close') close();
    else if (at) { app.chosen = at.line; pick(at.line); }
  }
  return { pick, dir, tap, close };
}
