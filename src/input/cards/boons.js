// § boon card (D-596): the home plate's 3 boons, as the travel card's rows (ways.js); Up and
// Down choose, Enter or a tap picks one, free. The cross, Esc or a tap outside goes on without one.
// `c` holds menuOf.
import { moveChoice } from '../../core/menu.js';
import { waysAt } from '../../render/ways.js';
import { view } from '../../render/screen.js';

export function boonsCard(app, ui, show, c) {
  const rows = () => c.menuOf('boons');
  function pick(i) { const row = rows()[i]; if (!row) return; show('play'); ui.takeBoon(row.id); }
  const dir = (d) => { app.chosen = moveChoice(app.chosen, d, rows().length); };
  const close = () => show('play');
  function tap(px, py, held) {
    if (held) return;
    const at = waysAt(px, py, view.w, view.h, rows(), app.scroll);
    if (at === 'out' || at === 'close') close();
    else if (at) { app.chosen = at.line; pick(at.line); }
  }
  return { pick, dir, tap, close };
}
