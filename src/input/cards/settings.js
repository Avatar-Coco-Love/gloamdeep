// § settings card (D-189, D-389): Settings, its pick, arrows, tap and close, moved word for word
// from screens.js at the eighth audit (D-576); its lines, arrows and changes are the menus'
// (menu.js). `c` holds menuOf, closeSettings, turnSettingsTab and openHistory. Its tabs turn with
// a tap on one (D-820), or Tab (main.js).
import { settingsCardAt } from '../../render/settingscard.js';
import { view } from '../../render/screen.js';
import { makeMenu } from './menu.js';

export function settingsCard(app, ui, show, c) {
  const { menuOf, closeSettings, turnSettingsTab, openHistory } = c;
  const { menuPick, menuDir } = makeMenu(app, ui, show, c);
  function tap(px, py, held) {
    if (held) return;
    const at = settingsCardAt(px, py, view.w, view.h, menuOf('settings'));
    if (at === 'out' || at === 'close') closeSettings(); // the round cross goes back (D-389)
    else if (at?.tab) { if (at.tab !== app.settingsTab) turnSettingsTab(at.tab); }
    else if (at === 'history') { app.chosen = menuOf('settings').length - 1; openHistory(); }
    else if (at) { app.chosen = at.line; menuPick(at.line); }
  }
  const close = () => closeSettings(); // Esc or P
  return { pick: menuPick, dir: menuDir, tap, close };
}
