// § campfire: a burning campfire's flames and coals (D-757), drawn after the light so they show
// bright in the dark, as a torch's flame does (torches.js). Blazing: a flame of three frames
// over the logs, swaying, 110 ms each; embers: the coals between the logs pulsing slowly.
// Still with reduced motion. The stones and logs are its tile's picture (pictures.js).
import { get } from '../core/registry.js';
import { TILE as T } from './screen.js';

const FLAME_Y = '#f39a3b', FLAME_y = '#ffd66b', CORE = '#fff5d6'; // the torch's flame (torches.js)
// [x, y, w, h, colour] a frame, over the tile drawn 2 pixels up
const BLAZE = [
  [[5, 6, 6, 3, FLAME_Y], [6, 4, 4, 4, FLAME_y], [7, 2, 1, 2, FLAME_y], [9, 3, 1, 1, FLAME_Y], [7, 6, 2, 2, CORE]],
  [[5, 6, 6, 3, FLAME_Y], [6, 4, 4, 4, FLAME_y], [8, 1, 1, 3, FLAME_y], [6, 3, 1, 1, FLAME_Y], [7, 6, 2, 2, CORE]],
  [[5, 6, 6, 3, FLAME_Y], [6, 4, 4, 4, FLAME_y], [7, 2, 2, 2, FLAME_y], [10, 4, 1, 1, FLAME_Y], [7, 6, 2, 2, CORE]],
];
const COALS = [[5, 10, 1, 1], [10, 10, 1, 1], [7, 10, 2, 1], [7, 11, 2, 1]]; // the embers picture's coals

export function drawFires(c, room, t, still) {
  const blazing = get('campfire').letter, embers = get('campfireEmbers').letter;
  room.map.forEach((row, ty) => {
    for (let tx = 0; tx < row.length; tx++) {
      const ch = row[tx];
      if (ch !== blazing && ch !== embers) continue;
      const x = tx * T, y = ty * T - 2;
      if (ch === blazing) {
        for (const [dx, dy, w, h, col] of BLAZE[still ? 0 : Math.floor(t / 110 + tx + ty) % 3]) { c.fillStyle = col; c.fillRect(x + dx, y + dy, w, h); }
      } else {
        const bright = still || Math.sin(t / 700 + tx * 1.3 + ty) > -0.2;
        c.fillStyle = bright ? FLAME_y : FLAME_Y;
        for (const [dx, dy, w, h] of COALS) c.fillRect(x + dx, y + dy, w, h);
      }
    }
  });
}
