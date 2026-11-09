// § bed card (D-488, D-566, D-568, D-569): the bed's ask by day, or the garden bed's card, its
// pick and close, moved word for word from screens.js at the eighth audit (D-575); its arrows
// and tap are the asks' (ask.js). `c` holds menuOf, askOf, takeDownBench, shelveBed (D-693), kindleBed (D-757), plantBed, pickBed and feedBed.
import { askDir, askTap } from './ask.js';

export function bedCard(app, ui, show, c) {
  const { menuOf, takeDownBench, shelveBed, kindleBed, plantBed, pickBed, feedBed } = c;
  function pick(i) {
    const id = menuOf(app.screen)[i]?.id;
    if (id === 'yes' || id === 'take') takeDownBench(); else if (id === 'shelve') shelveBed(); else if (id === 'kindle') kindleBed(); else if (id === 'plant') plantBed(); else if (id === 'pick') pickBed(); else if (id === 'feed') feedBed(); else show('play');
  }
  const close = () => show('play'); // Esc or P
  return { pick, dir: askDir(app), tap: askTap(app, c, pick, close), close };
}
