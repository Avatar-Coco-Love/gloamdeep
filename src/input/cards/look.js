// § look card (D-399, D-517, D-521; the screen 'cloak'): its pick, arrows, tap and close, moved
// word for word from screens.js at the eighth audit (D-578). Opening it, its moves and its spoken
// words stay in profilescreens.js. `c` holds pressLook, moveLookBy and closeCloak from there.
import { lookCardAt } from '../../render/cloak.js';
import { view } from '../../render/screen.js';

export function lookCard(app, ui, show, c) {
  const { pressLook, moveLookBy, closeCloak } = c;
  const pick = (i) => { pressLook(i); };
  const dir = (dir) => { moveLookBy(dir); };
  function tap(px, py, held) {
    if (held) return;
    const at = lookCardAt(px, py, view.w, view.h, app.lookTab);
    if (at === 'out' || at === 'close') closeCloak(); // the round cross goes back, as Back did (D-399)
    else if (at) pressLook(at.key, true);
  }
  const close = () => closeCloak(); // Esc or P
  return { pick, dir, tap, close };
}
