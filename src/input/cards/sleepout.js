// § sleep-out card (D-758): "Sleep here until morning?", the moon button's ask, No picked; Yes
// sleeps until morning. Its arrows and tap are the asks' (ask.js). `c` holds menuOf and askOf.
import { askDir, askTap } from './ask.js';

export function sleepOutCard(app, ui, show, c) {
  const { menuOf } = c;
  function pick(i) { const yes = menuOf(app.screen)[i]?.id === 'yes'; show('play'); if (yes) ui.sleepOut(); }
  const close = () => show('play'); // Esc or P
  return { pick, dir: askDir(app), tap: askTap(app, c, pick, close), close };
}
