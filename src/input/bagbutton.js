// § bag button: opens the bag during play (D-247). It sits on the lantern's
// arc, up and left of it (D-384), round on the glass; while the bag is open it hides, and the
// card's own cross closes it (D-385). Thin layer: a tap or click only calls onBag(); hide(on) takes it away.
import { drawBagIcon } from '../render/hud.js';
import { keepPlaced } from './lantern.js';

export function createBagButton(canvas, { onBag }) {
  const button = document.createElement('button');
  button.id = 'bag-button';
  button.type = 'button';
  button.title = 'Bag (I)';
  button.setAttribute('aria-label', 'Bag');
  const icon = document.createElement('canvas');
  icon.width = icon.height = 5;
  drawBagIcon(icon.getContext('2d'));
  button.append(icon);
  button.addEventListener('click', () => { button.blur(); onBag(); });
  document.body.append(button);
  keepPlaced(canvas, button, 3);
  return {
    hide(on) { button.style.display = on ? 'none' : ''; },
  };
}
