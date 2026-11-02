// § name pad card (D-272, D-273, D-398): its pick, arrows, tap, close and typed letters, moved
// word for word from screens.js at the eighth audit (D-578). Opening it and its spoken words stay
// in profilescreens.js. `c` holds pressName and closeName from there.
import { NAME_PAD, moveName } from '../../core/namepad.js';
import { nameCardAt } from '../../render/namepad.js';
import { view } from '../../render/screen.js';

export function nameCard(app, ui, show, c) {
  const { pressName, closeName } = c;
  const pick = (i) => { pressName(NAME_PAD[i].id); };
  const dir = (dir) => { app.chosen = moveName(app.chosen, dir); };
  function tap(px, py, held) {
    if (held) return;
    const at = nameCardAt(px, py, view.w, view.h);
    if (at === 'out' || at === 'close') closeName(); // the round cross goes back (D-398)
    else if (at) { app.chosen = at.key; pick(at.key); }
  }
  const close = () => closeName(); // Esc or P
  // Letters and Backspace type from a keyboard; the flame moves to OK, so Enter keeps it
  function type(key) {
    if (key !== 'backspace' && !/^[a-z]$/.test(key)) return false;
    pressName(key === 'backspace' ? 'del' : key);
    app.chosen = NAME_PAD.findIndex((k) => k.id === 'ok');
    return true;
  }
  return { pick, dir, tap, close, type };
}
