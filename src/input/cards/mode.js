// § mode card (D-334, D-396): the way to play, asked before a new journey, its pick, tap and
// close, moved word for word from screens.js at the eighth audit (D-576); its arrows are the
// menus' (menu.js). `c` holds menuOf and titleAt.
import { waysAt } from '../../render/ways.js';
import { view } from '../../render/screen.js';
import { makeMenu } from './menu.js';

export function modeCard(app, ui, show, c) {
  const { menuOf, titleAt } = c;
  const { menuDir } = makeMenu(app, ui, show, c);
  function pick(i) { const id = menuOf(app.screen)[i]?.id; ui.newJourney(id); show('opening'); } // the first words' card first (D-628)
  const close = () => titleAt('new'); // Esc or P
  function tap(px, py, held) {
    if (held) return;
    const at = waysAt(px, py, view.w, view.h, menuOf(app.screen));
    if (at === 'out' || at === 'close') close(); // the round cross goes back (D-396)
    else if (at) { app.chosen = at.line; pick(at.line); }
  }
  return { pick, dir: menuDir, tap, close };
}
