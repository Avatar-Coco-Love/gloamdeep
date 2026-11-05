// § boon card (D-596, D-603): the home plate's 3 boons, three cards in a row (render/boons.js);
// Left and Right (or Up and Down) choose, Enter or a tap picks one, free. The cross, Esc or a tap
// outside goes on without one. `c` holds menuOf.
import { moveChoice } from '../../core/menu.js';
import { boonsAt } from '../../render/boons.js';
import { view } from '../../render/screen.js';

const ALONG = { left: 'up', right: 'down', up: 'up', down: 'down' }; // the row runs across

export function boonsCard(app, ui, show, c) {
  const rows = () => c.menuOf('boons');
  function pick(i) { const row = rows()[i]; if (!row) return; show('play'); ui.takeBoon(row.id); }
  const dir = (d) => { app.chosen = moveChoice(app.chosen, ALONG[d], rows().length); };
  const close = () => show('play');
  function tap(px, py, held) {
    if (held) return;
    const at = boonsAt(px, py, view.w, view.h, app.offer || []);
    if (at === 'out' || at === 'close') close();
    else if (at) { app.chosen = at.line; pick(at.line); }
  }
  return { pick, dir, tap, close };
}
