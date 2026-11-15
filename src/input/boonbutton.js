// § boon button (B-007): a round button with the home waystone's violet rune, up and left of the
// lantern, shown in play while the hero stands on the home plate, holding no boon, after arriving
// there by travel or a fall; a tap opens the boon card. Stepping off takes it away, and stepping
// back on opens the card as before (D-596). Thin layer: a tap or click only calls onBoons();
// show(on) shows or hides it in play; hide(on) takes it away off play.
import { drawRuneIcon, RUNE_ICON } from '../render/hud.js';
import { keepFading } from './lantern.js';
import { BUTTON } from '../render/screen.js';
import { keep } from '../render/wipe.js';

export function createBoonButton(canvas, { onBoons }) {
  const button = document.createElement('button');
  button.id = 'boon-button';
  button.type = 'button';
  button.title = 'Choose a boon';
  button.setAttribute('aria-label', 'Choose a boon');
  const icon = document.createElement('canvas');
  icon.width = RUNE_ICON[0].length; icon.height = RUNE_ICON.length;
  keep(icon, () => drawRuneIcon(icon.getContext('2d'))); // and again after a wipe (D-588)
  button.append(icon);
  button.addEventListener('click', () => { button.blur(); onBoons(); });
  document.body.append(button);
  const { area, fade } = keepFading(canvas, button, 7, BUTTON);
  let off = true, now = false;
  const set = () => { button.style.display = off || !now ? 'none' : ''; };
  set();
  return {
    area: () => (now && !off ? area() : { x: 0, y: 0, w: 0, h: 0 }), fade, // its corner's fade (D-442)
    hide(on) { off = on; set(); },
    show(on) { if (on !== now) { now = on; set(); } },
  };
}
