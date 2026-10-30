// § quick slot: a round button left of the lantern, on its arc, that pours a
// flask from the bag, like the bag's Pour, one turn (D-384). It shows how many
// flasks are carried, dim with none, when a tap does nothing. Thin layer: a tap
// or click only calls onPour(); show(n) redraws the count; hide(on) takes it away.
import { drawFlaskSlot } from '../render/hud.js';
import { keepFading } from './lantern.js';
import { BUTTON } from '../render/screen.js';

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
  return {
    area, fade, // its corner's fade (D-442)
    hide(on) { button.style.display = on ? 'none' : ''; },
    show(n) {
      if (n === shown) return;
      shown = n;
      drawFlaskSlot(icon.getContext('2d'), n);
      const words = n ? `Pour a flask, ${n} left` : 'No flask to pour';
      button.title = words; button.setAttribute('aria-label', words);
      button.setAttribute('aria-disabled', String(!n));
    },
  };
}
