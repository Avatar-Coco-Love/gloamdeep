// § journey ends card (MO2, D-344): a Hardcore fall's page, its pick, tap and close, moved word
// for word from screens.js at the eighth audit (D-576); its arrows are the menus' (menu.js).
// `c` holds menuOf, menuTop and titleAt; menuTop stays in screens.js, as render/title.js needs a page.
import { lineAt } from '../../render/menu.js';
import { makeMenu } from './menu.js';

export function endedCard(app, ui, show, c) {
  const { menuOf, menuTop, titleAt } = c;
  const { menuDir } = makeMenu(app, ui, show, c);
  function pick(i) { const id = menuOf(app.screen)[i]?.id; ui.beginAgain(id === 'other'); show('play'); }
  function tap(px, py) {
    const i = lineAt(py, menuOf(app.screen).length, menuTop());
    if (i >= 0) { app.chosen = i; pick(i); }
  }
  const close = () => titleAt('continue'); // the world begun again is saved, for Continue (D-344)
  return { pick, dir: menuDir, tap, close };
}
