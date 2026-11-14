// § roosts: a tree with a flyer in it (core/roost.js, D-922) gives a small shake now and then,
// its crown drawn again a pixel left and right for SHAKE of every CYCLE ms, each tree on its own
// beat; with reduced motion, a still lean of a pixel instead (Claude's call). Each crown is
// painted once into its own small canvas and kept, painted again after a wipe (D-588).
import { hash } from '../core/noise.js';
import { tileAt } from '../core/room.js';
import { roostsOf } from '../core/roost.js';
import { TILE as T } from './screen.js';
import { paintTree } from './woods.js';
import { onWipe } from './wipe.js';

const CYCLE = 2600, SHAKE = 450, PAD = 4; // the crown reaches up to 4 pixels past its tile
const crowns = new Map();
onWipe(() => crowns.clear());

// The crown of the tree at tx, ty, alone, on a canvas PAD pixels bigger all round
function crownOf(tx, ty) {
  const key = `${tx},${ty}`;
  if (crowns.has(key)) return crowns.get(key);
  const cv = document.createElement('canvas'), c = cv.getContext('2d');
  cv.width = cv.height = T + 2 * PAD;
  const put = (x, y, hex) => { c.fillStyle = hex; c.fillRect(x - tx * T + PAD, y - ty * T + PAD, 1, 1); };
  paintTree(put, () => {}, tx, ty, true);
  crowns.set(key, cv);
  return cv;
}

// The shake's sideways pixel for the tree at tx, ty at time t: -1, 0 or 1
export function shakeOf(tx, ty, t, still) {
  if (still) return 1;
  const k = (t + hash(tx, ty, 81) * CYCLE) % CYCLE;
  return k < SHAKE ? Math.round(Math.sin(k / 45)) : 0;
}

export function drawRoosts(c, room, t, still) {
  for (const { x, y } of roostsOf(room)) {
    if (tileAt(room, x, y).id !== 'tree') continue;
    const dx = shakeOf(x, y, t, still);
    if (dx) c.drawImage(crownOf(x, y), x * T - PAD + dx, y * T - PAD);
  }
}
