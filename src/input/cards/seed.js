// § seed pad card (D-191, D-394): its pick, arrows, tap, close and typed digits, moved word for
// word from screens.js at the eighth audit (D-578), from Settings or the Explorer. Opening it and
// its keys' work stay in explorerscreens.js. `c` holds pressKey and closePad from there.
import { PAD, moveKey } from '../../core/seedpad.js';
import { seedCardAt } from '../../render/seedpad.js';
import { view } from '../../render/screen.js';

export function seedCard(app, ui, show, c) {
  const { pressKey, closePad } = c;
  const pick = (i) => { pressKey(PAD[i].id); };
  const dir = (dir) => { app.chosen = moveKey(app.chosen, dir); };
  function tap(px, py, held) {
    if (held) return;
    const at = seedCardAt(px, py, view.w, view.h);
    if (at === 'out' || at === 'close') closePad(); // the round cross goes back (D-394)
    else if (at) { app.chosen = at.key; pick(at.key); }
  }
  const close = () => closePad(); // Esc or P
  // Digits and Backspace type on the seed pad from a keyboard; the flame moves to OK, so Enter keeps it
  function type(key) {
    if (!/^[0-9]$|^backspace$/.test(key)) return false;
    pressKey(key === 'backspace' ? 'del' : key);
    app.chosen = PAD.findIndex((k) => k.id === 'ok');
    return true;
  }
  return { pick, dir, tap, close, type };
}
