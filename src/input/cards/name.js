// § name pad card (D-272, D-273, D-398): its pick, arrows, tap, close and typed letters, moved
// word for word from screens.js at the eighth audit (D-578). Opening it and its spoken words stay
// in profilescreens.js. `c` holds pressName and closeName from there.
import { padOf, moveName } from '../../core/namepad.js';
import { nameCardAt } from '../../render/namepad.js';
import { view } from '../../render/screen.js';

export function nameCard(app, ui, show, c) {
  const { pressName, closeName } = c;
  const pick = (i) => { pressName(padOf(app.digits)[i].id); };
  const dir = (dir) => { app.chosen = moveName(app.chosen, dir, app.digits); };
  function tap(px, py, held) {
    if (held) return;
    const at = nameCardAt(px, py, view.w, view.h, app.digits);
    if (at === 'out' || at === 'close') closeName(); // the round cross goes back (D-398)
    else if (at) { app.chosen = at.key; pick(at.key); }
  }
  const close = () => closeName(); // Esc or P
  // Letters, digits and Backspace type from a keyboard (D-765); the flame moves to OK, so Enter keeps it
  const toOk = () => { app.chosen = padOf(app.digits).findIndex((k) => k.id === 'ok'); };
  function type(key) {
    if (key !== 'backspace' && !/^[a-z0-9]$/.test(key)) return false;
    pressName(key === 'backspace' ? 'del' : key);
    toOk();
    return true;
  }
  // Space types a space (D-765; did nothing, D-683, so "ANNA MAE" no longer made "ANNA");
  // Enter still presses the lit key
  const space = () => { pressName('space'); toOk(); };
  return { pick, dir, tap, close, type, space };
}
