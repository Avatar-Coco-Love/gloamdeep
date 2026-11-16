// § crumble (Q-113, D-965): as the floor gives way round the stairs down, the old seal's stones
// stand a moment over the new Gap, cracks running across them, then all fall together into the
// dark, smaller and darker as they drop; over by the end of the room's shake (main.js, QUAKE_MS).
// The room already holds the Gap (beaten.js); this only draws the stones going, over its tiles.
// None with reduced motion: the stones are simply gone, as frame.js draws none then. Plain drawing.
import { SPRITES } from './sprites.js';
import { drawFloor } from './tiles.js';
import { tileAt } from '../core/room.js';

const T = 16;
export const CRACK_MS = 200; // the cracks run across the stones; then they fall until the shake ends
// Each crack's pixels on a stone, from its top edge down and across; the first half shows first
const CRACKS = [[5, 1], [5, 2], [6, 3], [6, 4], [7, 5], [10, 2], [10, 3], [11, 4], [3, 9], [4, 10],
  [8, 6], [8, 7], [9, 8], [9, 9], [8, 10], [12, 6], [12, 7], [5, 11], [6, 12], [10, 11], [10, 12], [11, 13], [4, 13], [3, 14]];
const DARK = '#07060a'; // the Gap's black (tiles.js)

// c: the room's canvas, in room pixels; quake: { start, shakeUntil }; room: the room, its Gap tiles
// the stones that were; t: now
export function drawCrumble(c, quake, room, t) {
  if (!quake || quake.start === undefined) return;
  const at = t - quake.start, end = quake.shakeUntil - quake.start;
  if (at < 0 || at >= end) return;
  for (let ty = 0; ty < room.rows; ty++) {
    for (let tx = 0; tx < room.cols; tx++) {
      if (tileAt(room, tx, ty).id !== 'gap') continue;
      const x = tx * T, y = ty * T;
      if (at < CRACK_MS) { // standing, cracking
        drawFloor(c, room, tx, ty);
        c.drawImage(SPRITES.sealStone, x, y);
        const n = at < CRACK_MS / 2 ? CRACKS.length / 2 : CRACKS.length;
        c.fillStyle = DARK;
        for (let i = 0; i < n; i++) c.fillRect(x + CRACKS[i][0], y + CRACKS[i][1], 1, 1);
        continue;
      }
      const f = (at - CRACK_MS) / (end - CRACK_MS), size = Math.round(T * (1 - 0.6 * f)); // falling
      const ox = Math.floor((T - size) / 2), oy = Math.round(ox + 3 * f);
      c.save(); c.imageSmoothingEnabled = false;
      c.beginPath(); c.rect(x, y, T, T); c.clip(); // into its own tile's dark
      c.globalAlpha = 1 - f;
      c.drawImage(SPRITES.sealStone, x + ox, y + oy, size, size);
      c.fillStyle = DARK; c.globalAlpha = (1 - f) * f;
      c.fillRect(x + ox, y + oy, size, size); // darker as it drops
      c.restore();
    }
  }
}
