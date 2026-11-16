// § leap button (D-962): a round button on the lantern's arc, left of the quick slot, shown in play
// once Leap is learnt on this journey. A tap gets a leap ready, its arc turning amber, and the next
// way picked (a swipe, the arrow pad, a tap beside the hero, the arrow keys) leaps that way; a
// second tap lets it go. J does the same (input.js). Thin layer: a tap or click only calls
// onLeap(); show(on, ready) shows it and redraws it; hide(on) takes it away off play.
import { drawLeapIcon } from '../render/hud.js';
import { keepFading } from './lantern.js';
import { BUTTON } from '../render/screen.js';
import { onWipe } from '../render/wipe.js';

export function createLeapButton(canvas, { onLeap }) {
  const button = document.createElement('button');
  button.id = 'leap-button';
  button.type = 'button';
  button.title = 'Leap (J)';
  button.setAttribute('aria-label', 'Leap');
  button.setAttribute('aria-pressed', 'false');
  const icon = document.createElement('canvas');
  icon.width = icon.height = 5;
  button.append(icon);
  button.addEventListener('click', (ev) => { onLeap(); if (ev.detail) button.blur(); });
  document.body.append(button);
  const { area, fade } = keepFading(canvas, button, 8, BUTTON);
  let off = true, now = false, shown = null;
  const set = () => { button.style.display = off || !now ? 'none' : ''; };
  set();
  onWipe(() => { shown = null; }); // drawn again on the next frame (D-588)
  return {
    area: () => (now && !off ? area() : { x: 0, y: 0, w: 0, h: 0 }), fade, // its corner's fade (D-442)
    hide(on) { off = on; set(); },
    show(on, ready) {
      if (on !== now) { now = on; set(); }
      if (ready === shown) return;
      shown = ready;
      drawLeapIcon(icon.getContext('2d'), ready);
      button.setAttribute('aria-pressed', String(ready));
    },
  };
}
