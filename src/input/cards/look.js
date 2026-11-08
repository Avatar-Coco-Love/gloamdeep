// § look card (D-399, D-517, D-521; the screen 'cloak'): its pick, arrows, tap and close, moved
// word for word from screens.js at the eighth audit (D-578). Opening it, its moves and its spoken
// words stay in profilescreens.js. `c` holds pressLook, moveLookBy, scrollLookBy and closeCloak from there.
// A swipe up or down, or the wheel, scrolls a tab's choices a row when they don't all fit (D-701).
import { lookCardAt } from '../../render/cloak.js';
import { view } from '../../render/screen.js';

export function lookCard(app, ui, show, c) {
  const { pressLook, moveLookBy, scrollLookBy, closeCloak } = c;
  const pick = (i) => { pressLook(i); };
  const dir = (dir, how) => { if (how === 'swipe' && (dir === 'up' || dir === 'down') && scrollLookBy(dir === 'up' ? 1 : -1)) return; moveLookBy(dir); }; // the list follows the finger
  const wheel = (by) => scrollLookBy(by);
  function tap(px, py, held) {
    if (held) return;
    const at = lookCardAt(px, py, view.w, view.h, app.lookTab, app.lookScroll);
    if (at === 'out' || at === 'close') closeCloak(); // the round cross goes back, as Back did (D-399)
    else if (at) pressLook(at.key, true);
  }
  const close = () => closeCloak(); // Esc or P
  return { pick, dir, tap, close, wheel };
}
