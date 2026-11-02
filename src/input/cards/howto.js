// § how to play card (D-193, D-390, D-507): its tabs, its pick, arrows, tap and close, moved
// word for word from screens.js at the eighth audit (D-577). It opens on Basics (screens.js's
// openHowTo). `c` holds closeHowTo.
import { howtoAt } from '../../render/howto.js';
import { nextPage, howtoWords } from '../../core/howto.js';
import { view } from '../../render/screen.js';

export function howtoCard(app, ui, show, c) {
  const { spoken } = ui;
  const { closeHowTo } = c;
  function openPage(id) { app.page = id; spoken.textContent = howtoWords(app.page, app.settings); }
  const flipPage = (back = false) => openPage(nextPage(app.page, back));
  const pick = () => { flipPage(); }; // Enter turns to the next tab
  const dir = (dir) => { if (dir === 'left' || dir === 'right') flipPage(dir === 'left'); }; // the tabs (D-390)
  function tap(px, py, held) {
    if (held) return;
    const at = howtoAt(px, py, view.w, view.h);
    if (at === 'out' || at === 'close') closeHowTo(); // the round cross goes back (D-390)
    else if (at) openPage(at.page);
  }
  const close = () => closeHowTo(); // Esc or P
  return { pick, dir, tap, close };
}
