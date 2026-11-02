// § delete card (D-271, D-400): Delete …? for a profile, its pick and close, moved word for
// word from screens.js at the eighth audit (D-575); its arrows and tap are the asks' (ask.js).
// `c` holds menuOf, askOf and closeDrop.
import { askDir, askTap } from './ask.js';

export function dropCard(app, ui, show, c) {
  const { menuOf, closeDrop } = c;
  function pick(i) { const id = menuOf(app.screen)[i]?.id; closeDrop(id === 'yes'); }
  const close = () => closeDrop(false); // Esc or P
  return { pick, dir: askDir(app), tap: askTap(app, c, pick, close), close };
}
