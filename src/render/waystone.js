// § waystone: a waystone (D-589), look B of the 3 × 3 mock-up (D-620): an old, mossy standing
// stone in each corner tile, each a little different, resting 2 pixels up on its shadow;
// flagstones with rounded corners set into the ground on the cross; a round carved plate in
// the middle, its rune cut but dark. Crypt stone colours (ART-DIRECTION.md), lit from the top
// left. Drawn straight onto the room, with no kept canvas.
import { hash } from '../core/noise.js';
import { TILE as T } from './screen.js';

const OUT = '#0e0c16', LIT = '#69748b', STONE = '#535d72', DARK = '#3a4050', CUT = '#2b303c';
const SLAB = '#454c5e', SLAB_DARK = '#3a4050', MORTAR = '#22262f';
const MOSS = ['#3d5a32', '#4f6b3a', '#5f7d44'], GRASS = ['#3f6b34', '#4a7a3a']; // the woods' greens

const rect = (c, x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
const px = (c, x, y, col) => rect(c, x, y, 1, 1, col);

// § stone: one standing stone in its own tile, 9 to 11 pixels wide with a rough rounded top,
// some leaning a pixel; moss on its lit top left, a crack, and in the woods grass at its foot
export function drawStandingStone(c, room, tx, ty) {
  const x = tx * T, y = ty * T, foot = 13;
  const top = 1 + Math.floor(hash(tx, ty, 7) * 2), w = 9 + Math.floor(hash(tx, ty, 8) * 2.99);
  const left = Math.round(8 - w / 2), lean = hash(tx, ty, 9) > 0.5 ? 1 : 0;
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + left - 1, y + foot, w + 3, 2); c.fillRect(x + left, y + foot + 2, w + 1, 1); // its shadow
  const rows = []; // [row, first pixel, last pixel], top to foot
  for (let ly = top; ly < foot; ly++) {
    const k = ly - top, cap = [3, 1, 1][k] ?? 0, rough = k < 3;
    const capL = cap + (rough ? Math.floor(hash(tx * 3 + ly, ty, 10) * 2) : 0), capR = cap + (rough ? Math.floor(hash(tx, ty * 3 + ly, 11) * 2) : 0);
    const shift = k < 5 ? lean : 0;
    rows.push([ly, left + capL + shift, left + w - 1 - capR + shift]);
  }
  for (const [ly, l, r] of rows) rect(c, x + l - 1, y + ly, r - l + 3, 1, OUT); // the outline's sides
  rect(c, x + rows[0][1], y + top - 1, rows[0][2] - rows[0][1] + 1, 1, OUT); // and top
  rows.forEach(([ly, l, r], i) => {
    for (let lx = l; lx <= r; lx++) {
      let col = lx - l < 2 ? LIT : r - lx < 2 ? DARK : STONE;
      if (i === 0 || (i === 1 && r - lx > 1)) col = LIT; // the lit top
      if (col === STONE && hash(x + lx, y + ly, 12) > 0.9) col = DARK; // pitted
      if (i > 0 && (lx < rows[i - 1][1] || lx > rows[i - 1][2]) && col !== DARK) col = LIT; // a shoulder
      px(c, x + lx, y + ly, col);
    }
  });
  rows.slice(0, 4).forEach(([ly, l, r], i) => { // moss over the top left
    for (let lx = l; lx <= Math.min(r, l + 4 - i); lx++) if (hash(x + lx, y + ly, 13) > 0.35) px(c, x + lx, y + ly, MOSS[(i + lx) % 3]);
  });
  const cx = left + 4 + lean; // a crack
  px(c, x + cx, y + top + 5, CUT); px(c, x + cx + 1, y + top + 6, CUT); px(c, x + cx + 1, y + top + 7, CUT);
  const [, fl, fr] = rows[rows.length - 1];
  rect(c, x + fl - 1, y + foot - 1, fr - fl + 3, 1, CUT); // its foot
  if (room.look !== 'woods') return;
  for (let lx = fl - 1; lx <= fr + 1; lx++) if (hash(x + lx, y, 14) > 0.55) { // sunk in the grass
    px(c, x + lx, y + foot - 1, GRASS[0]);
    if (hash(x + lx, y, 15) > 0.6) px(c, x + lx, y + foot - 2, GRASS[1]);
  }
}

// § path: four worn flagstones, their rounded corners showing the ground under them (the woods'
// grass, or the room's floor drawn first, tiles.js), lighter on their top edges, some chipped
export function drawWaystonePath(c, tx, ty) {
  const x = tx * T, y = ty * T, split = 6 + Math.floor(hash(tx, ty, 41) * 4), low = 7 + Math.floor(hash(tx, ty, 42) * 3);
  for (const [sx, sy, w, h] of [[0, 0, split - 1, 7], [split, 0, T - split, 7], [0, 8, low - 1, 8], [low, 8, T - low, 8]]) {
    const X = x + sx, Y = y + sy;
    rect(c, X + 1, Y, w - 2, h, MORTAR); rect(c, X, Y + 1, w, h - 2, MORTAR);
    rect(c, X + 1, Y + 1, w - 2, h - 2, hash(tx * 4 + sx, ty * 4 + sy, 43) > 0.5 ? SLAB : SLAB_DARK);
    rect(c, X + 1, Y + 1, w - 2, 1, LIT);
    if (hash(X, Y, 44) > 0.6) px(c, X + 2 + Math.floor(hash(X, Y, 45) * (w - 4)), Y + 3 + Math.floor(hash(X, Y, 46) * (h - 5)), CUT); // a chip
  }
}

// § plate: a round carved plate on the flagstones, its rune cut but dark while asleep;
// woken, the rune is the stairs' violet (D-591, mock-up A)
export const RUNE = [[7, 4], [8, 4], [7, 5], [6, 6], [7, 6], [9, 6], [7, 7], [8, 8], [7, 9], [8, 9]];
export const AWAKE = '#a58ce0';
export function drawWaystonePlate(c, tx, ty, woken = false) {
  const x = tx * T, y = ty * T;
  drawWaystonePath(c, tx, ty);
  rect(c, x + 2, y + 3, 12, 10, OUT); rect(c, x + 3, y + 2, 10, 12, OUT);
  rect(c, x + 3, y + 3, 10, 10, STONE);
  rect(c, x + 3, y + 3, 10, 1, LIT); rect(c, x + 3, y + 3, 1, 10, LIT);
  for (const [rx, ry] of RUNE) rect(c, x + rx, y + ry + 1, 1, 1, woken ? AWAKE : CUT);
}
