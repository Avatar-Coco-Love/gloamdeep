// § round map: the floor around the hero on a round glass button in the room's
// top right corner (D-383), the hero in its middle. A tap or click opens the
// full map (D-205), whose card has its own cross (D-395; the button was that
// cross before). Thin layer: a tap or click only calls onMap(); hide(on)
// takes it away, show(state, reveal, t,
// still, alpha) draws the floor and fades the button (frame.js), and area()
// is where it sits, in the room canvas's pixels.
import { drawPlan, drawRoundMap } from '../render/map.js';
import { floorPlan } from '../core/map.js';
import { MAP_DISC } from '../render/screen.js';
import { keepPlaced } from './lantern.js';

const K = 3; // pixels a tile: about 17 tiles across, near the room's own pixel size

export function createMapButton(canvas, { onMap }) {
  const button = document.createElement('button');
  button.id = 'map-button';
  button.type = 'button';
  button.title = 'Map (M)';
  button.setAttribute('aria-label', 'Map');
  const map = document.createElement('canvas');
  map.width = map.height = MAP_DISC / 2;
  button.append(map);
  button.addEventListener('click', () => { button.blur(); onMap(); });
  document.body.append(button);
  let area = { x: 0, y: 0, w: 0, h: 0 };
  keepPlaced(canvas, button, 2, (top, left, r) => {
    const per = canvas.width / r.width; // room pixels a screen pixel
    area = { x: (left - r.left) * per, y: (top - r.top) * per, w: MAP_DISC * per, h: MAP_DISC * per };
  });
  // The plan worked out again only when the state or the reveal changes, and drawn once
  const drawn = document.createElement('canvas'), c = map.getContext('2d');
  let planFor = null, revealed = null, plan = null, faded = 1;
  return {
    hide(on) { button.style.display = on ? 'none' : ''; },
    show(state, reveal, t, still, alpha) {
      if (state !== planFor || reveal !== revealed) {
        planFor = state; revealed = reveal; plan = floorPlan(state, reveal);
        drawPlan(drawn, plan, K);
      }
      drawRoundMap(c, plan, drawn, K, t, still);
      if (alpha !== faded) { faded = alpha; button.style.opacity = alpha < 1 ? alpha : ''; }
    },
    area: () => area,
  };
}
