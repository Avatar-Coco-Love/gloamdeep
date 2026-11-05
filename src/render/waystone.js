// § waystone: the home waystone asleep (D-589, mock-up A): a tall grey standing stone on each
// 2 × 2 corner, worn flagstones on the cross, and a round carved plate in the middle, its rune
// cut but dark. Crypt stone colours (ART-DIRECTION.md), lit from the top left. Drawn straight
// onto the room, with no kept canvas.
import { tileAt } from '../core/room.js';
import { hash } from '../core/noise.js';
import { TILE as T } from './screen.js';

const OUT = '#0e0c16', LIT = '#69748b', STONE = '#535d72', DARK = '#3a4050', CUT = '#2b303c';
const SLAB = '#454c5e', SLAB_DARK = '#3a4050', MORTAR = '#22262f';

const rect = (c, x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };

// § stone: one standing stone fills a 2 × 2 corner; each of its tiles draws its own quarter,
// told by whether the stone goes on to its left and above
export function drawStandingStone(c, room, tx, ty) {
  const same = (x, y) => tileAt(room, x, y).id === 'standingStone';
  const ox = (tx - (same(tx - 1, ty) ? 1 : 0)) * T, oy = (ty - (same(tx, ty - 1) ? 1 : 0)) * T;
  c.save();
  c.beginPath(); c.rect(tx * T, ty * T, T, T); c.clip();
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(ox + 5, oy + 27, 24, 3); c.fillRect(ox + 7, oy + 30, 20, 1); // its shadow
  rect(c, ox + 8, oy + 2, 16, 26, OUT);
  rect(c, ox + 9, oy + 3, 14, 24, STONE);
  rect(c, ox + 9, oy + 3, 3, 24, LIT); // lit from the left
  rect(c, ox + 19, oy + 3, 4, 24, DARK); // shade on the right
  rect(c, ox + 9, oy + 3, 14, 2, LIT); // and on top
  rect(c, ox + 10, oy + 2, 12, 1, OUT);
  rect(c, ox + 14, oy + 10, 4, 1, CUT); rect(c, ox + 15, oy + 15, 2, 1, CUT); rect(c, ox + 13, oy + 20, 1, 3, CUT); // worn cuts
  rect(c, ox + 9, oy + 26, 14, 1, CUT); // its foot
  c.restore();
}

// § path: four worn flagstones with dark mortar, lighter on their top edges
export function drawWaystonePath(c, tx, ty) {
  const x = tx * T, y = ty * T, split = 6 + Math.floor(hash(tx, ty, 41) * 4);
  rect(c, x, y, T, T, MORTAR);
  for (const [sx, sy, w, h] of [[0, 0, split - 1, 7], [split, 0, T - split, 7], [0, 8, 9, 8], [10, 8, 6, 8]]) {
    rect(c, x + sx, y + sy, w, h, hash(tx * 4 + sx, ty * 4 + sy, 43) > 0.5 ? SLAB : SLAB_DARK);
    rect(c, x + sx, y + sy, w, 1, LIT);
  }
}

// § plate: a round carved plate on the flagstones, its rune cut but dark while asleep
const RUNE = [[7, 4], [8, 4], [7, 5], [6, 6], [7, 6], [9, 6], [7, 7], [8, 8], [7, 9], [8, 9]];
export function drawWaystonePlate(c, tx, ty) {
  const x = tx * T, y = ty * T;
  drawWaystonePath(c, tx, ty);
  rect(c, x + 2, y + 3, 12, 10, OUT); rect(c, x + 3, y + 2, 10, 12, OUT);
  rect(c, x + 3, y + 3, 10, 10, STONE);
  rect(c, x + 3, y + 3, 10, 1, LIT); rect(c, x + 3, y + 3, 1, 10, LIT);
  for (const [rx, ry] of RUNE) rect(c, x + rx, y + ry + 1, 1, 1, CUT);
}
