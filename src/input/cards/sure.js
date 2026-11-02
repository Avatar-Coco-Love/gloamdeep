// § start over card (D-400): Start over? on the title, asked while a journey is saved, its pick
// and close, moved word for word from screens.js at the eighth audit (D-575); its arrows and tap
// are the asks' (ask.js). `c` holds menuOf, askOf and titleAt.
import { MODE_FIRST } from '../../core/menu.js';
import { askDir, askTap } from './ask.js';

export function sureCard(app, ui, show, c) {
  const { menuOf, titleAt } = c;
  function pick(i) {
    const id = menuOf(app.screen)[i]?.id;
    if (id === 'yes') show('mode', MODE_FIRST); // the way to play asked first (D-334)
    else if (id === 'no') titleAt('new');
  }
  const close = () => titleAt('new'); // Esc or P
  return { pick, dir: askDir(app), tap: askTap(app, c, pick, close), close };
}
