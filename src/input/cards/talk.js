// § talk box (D-1017): a person at home, bumped: their line, Shop (their trade card) and Bye, Shop
// picked. The arrows are the asks' (ask.js); the cross, Esc or a tap outside say bye. `c` holds
// menuOf and openTrade.
import { askDir } from './ask.js';
import { talkCardAt } from '../../render/talkcard.js';
import { view } from '../../render/screen.js';
import { talkOf } from '../../core/chat.js';

export function talkCard(app, ui, show, c) {
  const { menuOf, openTrade } = c;
  function pick(i) { if (menuOf(app.screen)[i]?.id === 'shop') openTrade(); else show('play'); }
  const close = () => show('play'); // Esc or P
  function tap(px, py, held) {
    if (held) return;
    const at = talkCardAt(px, py, view.w, view.h, ...talkOf(app.state, app.talker), menuOf(app.screen));
    if (at === 'out' || at === 'close') close();
    else if (at) { app.chosen = at.line; pick(at.line); }
  }
  return { pick, dir: askDir(app, c), tap, close };
}
