// § arrow pad: one round glass disc in the room's bottom left corner, the round
// map's twin, each quarter one arrow (D-406). A press steps that way at once;
// held, the hero keeps walking at the held pace, and a thumb rocked onto another
// quarter turns that way at once; the middle and outside the disc press nothing.
// Shown in play only while the Arrow pad switch is on (off at first). Thin layer:
// it only calls onPress(dir) as a quarter is pressed and onPress(null) as it is
// let go; show(on, alpha) shows or hides it and fades it (frame.js), and area()
// is where it sits, in the room canvas's pixels.
import { drawArrowPad } from '../render/hud.js';
import { PAD_DISC as SIZE } from '../render/screen.js';
import { keepPlaced } from './lantern.js';

const MIDDLE = 10; // CSS px round the middle where no quarter is pressed

export function createArrowPad(canvas, { onPress }) {
  const pad = document.createElement('div');
  pad.id = 'arrow-pad';
  pad.title = 'Arrow pad';
  pad.setAttribute('aria-hidden', 'true'); // the arrow keys do the same (D-042)
  const face = document.createElement('canvas');
  face.width = face.height = SIZE;
  pad.append(face);
  document.body.append(pad);
  let area = { x: 0, y: 0, w: 0, h: 0 };
  keepPlaced(canvas, pad, 5, (top, left, r) => {
    const per = canvas.width / r.width; // room pixels a screen pixel
    area = { x: (left - r.left) * per, y: (top - r.top) * per, w: SIZE * per, h: SIZE * per };
  });

  const c = face.getContext('2d');
  let held = null, finger = null, shown = null, faded = 1;
  const draw = () => drawArrowPad(c, SIZE, held);
  const quarter = (ev) => {
    const b = pad.getBoundingClientRect(), dx = ev.clientX - b.left - b.width / 2, dy = ev.clientY - b.top - b.height / 2;
    if (Math.hypot(dx, dy) > b.width / 2 || Math.hypot(dx, dy) < MIDDLE) return null;
    return Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
  };
  const press = (dir) => { if (dir === held) return; held = dir; draw(); onPress(dir); };
  pad.addEventListener('pointerdown', (ev) => {
    if (finger !== null || (ev.pointerType === 'mouse' && ev.button !== 0)) return;
    ev.preventDefault();
    finger = ev.pointerId; pad.setPointerCapture(ev.pointerId);
    press(quarter(ev));
  });
  pad.addEventListener('pointermove', (ev) => { if (ev.pointerId === finger) press(quarter(ev)); });
  const lift = (ev) => { if (ev.pointerId !== finger) return; finger = null; press(null); };
  pad.addEventListener('pointerup', lift);
  pad.addEventListener('pointercancel', lift);
  draw();
  return {
    show(on, alpha) {
      if (on !== shown) { shown = on; pad.style.display = on ? '' : 'none'; if (!on && held) { finger = null; press(null); } }
      if (on && alpha !== faded) { faded = alpha; pad.style.opacity = alpha < 1 ? alpha : ''; }
    },
    area: () => area,
  };
}
