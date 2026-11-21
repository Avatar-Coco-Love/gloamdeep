// § grid's scroll (D-1011): a card's scrolling grid's press, drag and lift on its window or its
// bar, and the wheel, shared by the bag card and the stash chest's (moved word for word from
// bag.js). win(): the grid's window (bagscroll.js, chestscroll.js); sc(): its scroller (scroll.js).
// Gives the card's grabs, scroll and wheel, as input.js asks for them.
import { grabsAt, barTo } from '../../render/bagscroll.js';
import { grab, drag, release, letGo, nudge, settle, snap } from '../../render/scroll.js';

export function gridScroll(win, sc) {
  const grabs = (x, y) => !!grabsAt(win(), x, y);
  function scroll(phase, x, y, t) {
    const w = win(), s = sc();
    if (phase === 'down') { s.bar = grabsAt(w, x, y) === 'bar'; if (s.bar) { s.moving = false; s.v = 0; s.y = barTo(w, y); } else grab(s, y, t); return false; }
    if (s.bar) { if (phase === 'move') s.y = barTo(w, y); else { s.bar = false; settle(s, snap(s.y, w.max, w.pitch)); } return phase === 'let'; } // a tap on the bar's track only moves it
    if (phase === 'move') drag(s, y, t, w.max);
    else if (phase === 'up') release(s, w.max, w.pitch);
    else if (phase === 'let') return letGo(s, w.max, w.pitch);
    return false;
  }
  const wheel = (by) => { const w = win(); if (!w.max) return false; nudge(sc(), by, w.max, w.pitch); return true; };
  return { grabs, scroll, wheel };
}
