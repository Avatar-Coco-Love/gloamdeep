// § sleep button: a round moon above the lantern, shown in play only outside from dusk until
// morning with nothing after the hero (D-758). A tap asks "Sleep here until morning?" first.
// Thin layer: a tap or click only calls onSleep(); show(on) shows or hides it in play;
// hide(on) takes it away off play.
import { drawMoonIcon } from '../render/hud.js';
import { keepFading } from './lantern.js';
import { BUTTON } from '../render/screen.js';
import { keep } from '../render/wipe.js';

export function createSleepButton(canvas, { onSleep }) {
  const button = document.createElement('button');
  button.id = 'sleep-button';
  button.type = 'button';
  button.title = 'Sleep until morning';
  button.setAttribute('aria-label', 'Sleep until morning');
  const icon = document.createElement('canvas');
  icon.width = icon.height = 5;
  keep(icon, () => drawMoonIcon(icon.getContext('2d'))); // and again after a wipe (D-588)
  button.append(icon);
  button.addEventListener('click', () => { button.blur(); onSleep(); });
  document.body.append(button);
  const { area, fade } = keepFading(canvas, button, 6, BUTTON);
  let off = true, now = false;
  const set = () => { button.style.display = off || !now ? 'none' : ''; };
  set();
  return {
    area: () => (now && !off ? area() : { x: 0, y: 0, w: 0, h: 0 }), fade, // its corner's fade (D-442)
    hide(on) { off = on; set(); },
    show(on) { if (on !== now) { now = on; set(); } },
  };
}
