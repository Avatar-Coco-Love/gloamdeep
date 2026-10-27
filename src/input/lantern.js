// § lantern button: the on-screen lantern switch, in the room's bottom right
// corner (D-080, D-199, D-377, D-381). Thin layer: a tap or
// click only calls onSwitch(); show(lit) redraws its icon and tells screen
// readers whether it is on; hide(on) takes it away on the title screen.
import { drawLanternIcon } from '../render/hud.js';
import { BUTTON as SIZE, BUTTON_GAP as GAP, MAP_DISC as DISC } from '../render/screen.js';

// § place: the button's spot (D-199, D-377, D-381, D-383): slot 0 the lantern,
// 1 the pause button, 2 the round map (D-205), 3 the bag (D-247), -1 the dev
// wrench. On the room, which fills the screen: the round map in the top right
// corner, pause left of it and the wrench left of pause, clear of the glass
// panel top left, the bag under pause, and the lantern in the bottom right
// corner, under the thumb. `canvas` is the room's. Placed again whenever the
// page or the room changes size; then(top, left, picture) hears where it went.
export function keepPlaced(canvas, button, slot, then) {
  const place = () => {
    const r = canvas.getBoundingClientRect(), s = button.style;
    const right = r.right - GAP, row = right - DISC - GAP - SIZE; // pause's left edge
    const top = slot === 0 ? r.bottom - SIZE - GAP : slot === 3 ? r.top + GAP + SIZE + GAP : r.top + GAP;
    const x = slot === 0 ? right - SIZE : slot === 2 ? right - DISC : slot < 0 ? row - GAP - SIZE : row;
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
