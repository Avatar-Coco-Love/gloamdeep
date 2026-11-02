// § pause card (D-187, D-388): the pause menu over the room, its pick, arrows, tap and close,
// moved word for word from screens.js at the eighth audit (D-576); its lines and arrows are the
// menus' (menu.js). `c` holds menuOf.
import { PAUSE_MENU } from '../../core/menu.js';
import { pauseCardAt } from '../../render/pausecard.js';
import { view } from '../../render/screen.js';
import { makeMenu } from './menu.js';

export function pausedCard(app, ui, show, c) {
  const { menuPick, menuDir } = makeMenu(app, ui, show, c);
  function tap(px, py, held) {
    if (held) return;
    const at = pauseCardAt(px, py, view.w, view.h, PAUSE_MENU.length);
    if (at === 'out' || at === 'close') show('play'); // the round cross resumes (D-388)
    else if (at) { app.chosen = at.line; menuPick(at.line); }
  }
  const close = () => show('play'); // Esc or P again resumes
  return { pick: menuPick, dir: menuDir, tap, close };
}
