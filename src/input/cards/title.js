// § title card (D-177, D-401): the title's buttons, their pick, arrows and tap, moved word for
// word from screens.js at the eighth audit (D-576); its lines and arrows are the menus' (menu.js).
// Esc or P do nothing here. `c` holds menuOf and chip, which the drawing uses too.
import { titleCardAt } from '../../render/titlecard.js';
import { view } from '../../render/screen.js';
import { makeMenu } from './menu.js';

export function titleCard(app, ui, show, c) {
  const { menuOf, chip } = c;
  const { menuPick, menuDir } = makeMenu(app, ui, show, c);
  function tap(px, py) {
    const i = titleCardAt(px, py, view.w, view.h, menuOf('title'), chip()); // the title's buttons (D-401)
    if (i >= 0) { app.chosen = i; menuPick(i); }
  }
  const close = () => {}; // Esc or P: nothing on the title
  return { pick: menuPick, dir: menuDir, tap, close };
}
