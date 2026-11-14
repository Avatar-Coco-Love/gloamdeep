// § round map: the floor around the hero on a round glass button in the room's
// top right corner (D-383), the hero in its middle. A tap or click opens the
// full map (D-205), whose card has its own cross (D-395; the button was that
// cross before). Thin layer: a tap or click only calls onMap(); hide(on)
// takes it away, show(state, reveal, t,
// still, alpha) draws the floor and fades the button (frame.js), and area()
// is where it sits, in the screen layer's pixels. In the dark it fades with the
// light on the hero's tile and its middle hides, easing over half a second (D-920). Its rim
// turns red while a creature chases the hero, and broken ember while one is close to noticing (D-921).
import { drawPlan, drawRoundMap, RIM, rimPulse } from '../render/map.js';
import { dangerNow } from '../core/danger.js';
import { floorPlan } from '../core/map.js';
import { MAP_DISC } from '../render/screen.js';
import { keepFading } from './lantern.js';
import { onWipe } from '../render/wipe.js';
import { lightHere, shownAt } from '../core/mapdark.js';

const K = 3; // pixels a tile: about 17 tiles across, near the room's own pixel size
const EASE_MS = 500; // the dark's change, eased (D-920)

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
  const { area, fade } = keepFading(canvas, button, 2, MAP_DISC);
  // The plan worked out again only when the state or the reveal changes, and drawn once
  const drawn = document.createElement('canvas'), c = map.getContext('2d');
  let planFor = null, revealed = null, plan = null, goal = { shown: 1, spot: 0 }, shown = 1, spot = 0, last = 0, danger = null;
  const rimRed = (a) => `rgba(${[1, 3, 5].map((i) => parseInt(RIM.chase.slice(i, i + 2), 16)).join(',')},${a})`;
  const ease = (now, want, dt) => now + Math.sign(want - now) * Math.min(Math.abs(want - now), dt / EASE_MS);
  onWipe(() => { planFor = null; }); // drawn again on the next frame (D-588)
  return {
    hide(on) { button.style.display = on ? 'none' : ''; },
    show(state, reveal, t, still, alpha) {
      if (state !== planFor || reveal !== revealed) {
        planFor = state; revealed = reveal; plan = floorPlan(state, reveal);
        drawPlan(drawn, plan, K);
        const here = lightHere(state);
        goal = { shown: shownAt(here.light), spot: here.hide ? 1 : 0 };
        danger = dangerNow(state);
      }
      const dt = Math.max(0, t - last); last = t;
      shown = still ? goal.shown : ease(shown, goal.shown, dt);
      spot = still ? goal.spot : ease(spot, goal.spot, dt);
      drawRoundMap(c, plan, drawn, K, t, still, shown, spot, danger);
      button.style.borderColor = danger === 'chase' ? rimRed(rimPulse(t, still)) : ''; // the CSS rim, red with the ring inside it
      fade(alpha);
    },
    area,
  };
}
