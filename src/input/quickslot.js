// § quick slot: a round button left of the lantern, on its arc, that pours a
// flask from the bag, like the bag's Pour, one turn (D-384). It shows how many
// flasks are carried, dim with none, when a tap does nothing. While a line is out
// it reads WAIT, or PULL with a bite, and a tap bumps the float's tile (D-612).
// Thin layer: a tap or click only calls onPour(); show(n, float) redraws it;
// hide(on) takes it away.
import { drawFlaskSlot, drawFishSlot } from '../render/hud.js';
import { keepFading } from './lantern.js';
import { BUTTON } from '../render/screen.js';
import { onWipe } from '../render/wipe.js';

export function createQuickSlot(canvas, { onPour }) {
  const button = document.createElement('button');
  button.id = 'quick-slot';
  button.type = 'button';
  const icon = document.createElement('canvas');
  icon.width = 20; icon.height = 16;
  button.append(icon);
  button.addEventListener('click', (ev) => { onPour(); if (ev.detail) button.blur(); });
  document.body.append(button);
  const { area, fade } = keepFading(canvas, button, 4, BUTTON);
  let shown = null;
  onWipe(() => { shown = null; }); // drawn again on the next frame (D-588)
  return {
    area, fade, // its corner's fade (D-442)
    hide(on) { button.style.display = on ? 'none' : ''; },
    show(n, float = null) {
      const now = float ? (float.bite ? 'pull' : 'wait') : n;
      if (now === shown) return;
      shown = now;
      if (float) drawFishSlot(icon.getContext('2d'), float.bite); else drawFlaskSlot(icon.getContext('2d'), n);
      const words = float ? (float.bite ? 'Pull in the fish' : 'Wait for a bite') : n ? `Pour a flask, ${n} left` : 'No flask to pour';
      button.title = words; button.setAttribute('aria-label', words);
      button.setAttribute('aria-disabled', String(!float && !n));
    },
  };
}
