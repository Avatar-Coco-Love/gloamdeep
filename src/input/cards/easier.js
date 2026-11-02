// § easier card (D-400): Play …?, the ask before an easier way to play, its pick and close,
// moved word for word from screens.js at the eighth audit (D-575); its arrows and tap are the
// asks' (ask.js). `c` holds menuOf, askOf and closeEasier.
import { askDir, askTap } from './ask.js';

export function easierCard(app, ui, show, c) {
  const { menuOf, closeEasier } = c;
  function pick(i) { const id = menuOf(app.screen)[i]?.id; closeEasier(id === 'yes'); }
  const close = () => closeEasier(false); // Esc or P
  return { pick, dir: askDir(app), tap: askTap(app, c, pick, close), close };
}
