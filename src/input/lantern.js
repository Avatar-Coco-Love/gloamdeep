// § lantern button: the on-screen lantern switch, in the buttons' column
// just outside the game picture, beside it (D-080, D-199, D-377). Thin layer: a tap or
// click only calls onSwitch(); show(lit) redraws its icon and tells screen
// readers whether it is on; hide(on) takes it away on the title screen.
import { drawLanternIcon } from '../render/hud.js';
import { BUTTON as SIZE, BUTTON_GAP as GAP } from '../render/screen.js';

// § place: the button's spot (D-199, D-377): slot 0 the lantern, 1 the
// pause button, 2 the map (D-205), 3 the bag (D-247), -1 the dev wrench. The
// wrench stands left of the picture's top, pause right of it with the map
// and the bag under it, and the lantern at the bottom right, under the
// thumb. `canvas` is the picture. Placed again whenever the page or the
// picture changes size; then(top, left, picture) hears where it went.
export function keepPlaced(canvas, button, slot, then) {
  const place = () => {
    const r = canvas.getBoundingClientRect(), s = button.style;
    const top = slot === 0 ? r.bottom - SIZE : r.top + Math.max(slot - 1, 0) * (SIZE + GAP);
    const x = slot < 0 ? r.left - SIZE - GAP : r.right + GAP;
    s.top = top + 'px'; s.left = x + 'px';
    then?.(top, x, r);
  };
  const watch = new ResizeObserver(place);
  watch.observe(document.documentElement); watch.observe(canvas);
}

export function createLanternButton(canvas, { onSwitch }) {
  const button = document.createElement('button');
  button.id = 'lantern-button';
  button.type = 'button';
  button.title = 'Lantern (L)';
  button.setAttribute('aria-label', 'Lantern');
  const icon = document.createElement('canvas');
  icon.width = icon.height = 5;
  button.append(icon);
  button.addEventListener('click', (ev) => { onSwitch(); if (ev.detail) button.blur(); }); // a tap or click lets go of the focus; Enter or Space keeps it
  document.body.append(button);

  keepPlaced(canvas, button, 0);

  let shown = null;
  return {
    hide(on) { button.style.display = on ? 'none' : ''; },
    show(lit) {
      if (lit === shown) return;
      shown = lit;
      drawLanternIcon(icon.getContext('2d'), lit);
      button.setAttribute('aria-pressed', String(lit));
    },
  };
}
