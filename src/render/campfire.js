// § campfire: a burning campfire's flames and coals (D-757), drawn after the light so they show
// bright in the dark, as a torch's flame does (torches.js). Blazing: a flame of three frames
// over the logs, swaying, 110 ms each; embers: the coals between the logs pulsing slowly.
// A lit brazier's flame is the blazing one, in its bowl (D-893). Still with reduced motion. The stones and logs are its tile's picture (pictures.js).
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

// § breath (D-947): a brazier the Lampeater breathes on, its flame shuddering, swaying a pixel each
// 90 ms: with 2 turns left its tips gone, with 1 only its foot and core; a dashed ring round the tile
// in the strike marks' warning red, a dot a turn left at its foot. Snuffed, a curl of grey smoke
// rising from the cold bowl for 2 turns. Steady with reduced motion.
const WARN = '#e8786a', SMOKE = 'rgba(185,175,200,0.6)';
const SHUDDER = { 2: (r) => r[1] >= 4, 1: (r) => r[1] >= 6 };
function drawWarn(c, tx, ty, left) {
  const x = tx * T, y = ty * T;
  c.fillStyle = WARN;
  for (let i = 1; i < T - 1; i += 3) { c.fillRect(x + i, y + 1, 2, 1); c.fillRect(x + i, y + T - 2, 2, 1); c.fillRect(x + 1, y + i, 1, 2); c.fillRect(x + T - 2, y + i, 1, 2); }
  for (let i = 0; i < left; i++) c.fillRect(x + T - 6 - i * 3, y + T - 6, 2, 2);
}
const CURL = [[8, 4], [7, 3], [7, 2], [8, 1], [9, 0], [9, -1], [8, -2]];
function drawSmoke(c, tx, ty, t, still) {
  const rise = still ? 0 : Math.floor(t / 300) % 2;
  c.fillStyle = SMOKE;
  for (const [dx, dy] of CURL) c.fillRect(tx * T + dx, ty * T + dy - rise, 1, 1);
}

export function drawFires(c, room, t, still, breaths = [], smoke = []) {
  const blazing = [get('campfire').letter, get('ownCampfire').letter], embers = [get('campfireEmbers').letter, get('ownEmbers').letter]; // your own too (D-853)
  const bowl = get('brazierLit').letter; // a lit brazier: the blazing flame, a pixel higher, in its bowl (D-893)
  room.map.forEach((row, ty) => {
    for (let tx = 0; tx < row.length; tx++) {
      const ch = row[tx];
      if (!blazing.includes(ch) && !embers.includes(ch) && ch !== bowl) continue;
      const x = tx * T, y = ty * T - (ch === bowl ? 3 : 2);
      const breath = ch === bowl && breaths.find((b) => b.x === tx && b.y === ty);
      if (breath) {
        const keep = SHUDDER[Math.min(2, breath.left)] || SHUDDER[1], sway = still ? 0 : (Math.floor(t / 90) % 2 ? 1 : -1);
        for (const [dx, dy, w, h, col] of BLAZE[0].filter(keep)) { c.fillStyle = col; c.fillRect(x + dx + sway, y + dy, w, h); }
        drawWarn(c, tx, ty, breath.left);
      } else if (blazing.includes(ch) || ch === bowl) {
        for (const [dx, dy, w, h, col] of BLAZE[still ? 0 : Math.floor(t / 110 + tx + ty) % 3]) { c.fillStyle = col; c.fillRect(x + dx, y + dy, w, h); }
      } else {
        const bright = still || Math.sin(t / 700 + tx * 1.3 + ty) > -0.2;
        c.fillStyle = bright ? FLAME_y : FLAME_Y;
        for (const [dx, dy, w, h] of COALS) c.fillRect(x + dx, y + dy, w, h);
      }
    }
  });
  for (const p of smoke) drawSmoke(c, p.x, p.y, t, still);
}
