// § waystone: a waystone (D-589), look B of the 3 × 3 mock-up (D-620), in its place's look (D-1021):
// a standing stone in each corner tile, resting on its shadow; flagstones with rounded corners set
// into the ground on the cross; a round carved plate in the middle, its rune cut but dark, lit
// violet once woken everywhere alike. Home in the woods: old mossy stones in the grass, crypt stone.
// The cave's grey rock: rough boulders, wider and lower, pebbles at their feet. The warren's earth:
// brown stones with two pale roots wrapped across, dirt at the foot. The dungeon: cut obelisks on a
// plinth, notches carved down the face, in its cold colours (tiles.js), neat square flagstones.
// Lit from the top left. Drawn straight onto the room, with no kept canvas.
import { hash } from '../core/noise.js';
import { TILE as T } from './screen.js';

// § colours: outline, lit, stone, dark, cut; the flagstones and their mortar, by the room's look
const COLD = [0.72, 0.78, 0.95]; // the dungeon's chill (tiles.js, ART-DIRECTION-2.md)
const chill = (col) => '#' + COLD.map((f, k) => Math.round(parseInt(col.slice(1 + 2 * k, 3 + 2 * k), 16) * f).toString(16).padStart(2, '0')).join('');
const CRYPT = { OUT: '#0e0c16', LIT: '#69748b', STONE: '#535d72', DARK: '#3a4050', CUT: '#2b303c', SLAB: '#454c5e', SLAB_DARK: '#3a4050', MORTAR: '#22262f' };
const PAL = {
  rock: { OUT: '#14161d', LIT: '#9aa3b6', STONE: '#7a8396', DARK: '#5a6276', CUT: '#3b4152', SLAB: '#5a6276', SLAB_DARK: '#4b5265', MORTAR: '#23262f' },
  earth: { OUT: '#16110d', LIT: '#8e7a62', STONE: '#6a584a', DARK: '#4e4036', CUT: '#3a2f26', SLAB: '#5a4a3e', SLAB_DARK: '#4e4036', MORTAR: '#2a221c' },
  dungeon: Object.fromEntries(Object.entries(CRYPT).map(([k, v]) => [k, k === 'OUT' ? v : chill(v)])),
};
const palOf = (room) => PAL[room?.look] || CRYPT; // the woods, the crypt and any other: crypt stone
const MOSS = ['#3d5a32', '#4f6b3a', '#5f7d44'], GRASS = ['#3f6b34', '#4a7a3a']; // the woods' greens
const ROOT = '#c4ad8a', ROOT_SHADOW = '#2a221c', DIRT = ['#2e251e', '#3d3229']; // the warren's (earth floor, ART-DIRECTION-2.md)

const rect = (c, x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
const px = (c, x, y, col) => rect(c, x, y, 1, 1, col);

// § body: a stone's rows, [row, first pixel, last pixel] top to foot, outlined and shaded from the
// top left, pitted where `pits` passes
function body(c, x, y, rows, P, pits) {
  for (const [ly, l, r] of rows) rect(c, x + l - 1, y + ly, r - l + 3, 1, P.OUT); // the outline's sides
  rect(c, x + rows[0][1], y + rows[0][0] - 1, rows[0][2] - rows[0][1] + 1, 1, P.OUT); // and top
  rows.forEach(([ly, l, r], i) => {
    for (let lx = l; lx <= r; lx++) {
      let col = lx - l < 2 ? P.LIT : r - lx < 2 ? P.DARK : P.STONE;
      if (i === 0 || (i === 1 && r - lx > 1)) col = P.LIT; // the lit top
      if (col === P.STONE && hash(x + lx, y + ly, 12) > pits) col = P.DARK; // pitted
      if (i > 0 && (lx < rows[i - 1][1] || lx > rows[i - 1][2]) && col !== P.DARK) col = P.LIT; // a shoulder
      px(c, x + lx, y + ly, col);
    }
  });
}

// § stone: one corner stone in its own tile, by the room's look
export function drawStandingStone(c, room, tx, ty) {
  if (room.look === 'dungeon') return drawObelisk(c, tx, ty);
  if (room.look === 'rock') return drawBoulder(c, tx, ty);
  const P = palOf(room), x = tx * T, y = ty * T, foot = 13; // 9 to 11 pixels wide with a rough rounded top, some leaning a pixel
  const top = 1 + Math.floor(hash(tx, ty, 7) * 2), w = 9 + Math.floor(hash(tx, ty, 8) * 2.99);
  const left = Math.round(8 - w / 2), lean = hash(tx, ty, 9) > 0.5 ? 1 : 0;
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + left - 1, y + foot, w + 3, 2); c.fillRect(x + left, y + foot + 2, w + 1, 1); // its shadow
  const rows = [];
  for (let ly = top; ly < foot; ly++) {
    const k = ly - top, cap = [3, 1, 1][k] ?? 0, rough = k < 3;
    const capL = cap + (rough ? Math.floor(hash(tx * 3 + ly, ty, 10) * 2) : 0), capR = cap + (rough ? Math.floor(hash(tx, ty * 3 + ly, 11) * 2) : 0);
    const shift = k < 5 ? lean : 0;
    rows.push([ly, left + capL + shift, left + w - 1 - capR + shift]);
  }
  body(c, x, y, rows, P, 0.9);
  const [, fl, fr] = rows[rows.length - 1];
  if (room.look === 'earth') { // two pale roots wrapped across its face, each with its shadow; dirt heaped at its foot
    for (const [r0, drop] of [[1, 3], [5, 2]]) {
      const [, l, r] = rows[Math.min(r0, rows.length - 1)];
      for (let lx = l - 1; lx <= r + 1; lx++) {
        const ly = top + r0 + Math.round(((lx - l) / Math.max(1, r - l)) * drop) + (hash(lx, ty, 25) > 0.75 ? 1 : 0);
        px(c, x + lx, y + ly, ROOT); px(c, x + lx, y + ly + 1, ROOT_SHADOW);
      }
    }
    for (let lx = fl - 2; lx <= fr + 2; lx++) {
      px(c, x + lx, y + foot - 1, DIRT[1]);
      if (lx > fl - 1 && lx < fr + 1 && hash(x + lx, y, 24) > 0.4) px(c, x + lx, y + foot - 2, DIRT[0]);
    }
    return;
  }
  rows.slice(0, 4).forEach(([ly, l, r], i) => { // moss over the top left
    for (let lx = l; lx <= Math.min(r, l + 4 - i); lx++) if (hash(x + lx, y + ly, 13) > 0.35) px(c, x + lx, y + ly, MOSS[(i + lx) % 3]);
  });
  const cx = left + 4 + lean; // a crack
  px(c, x + cx, y + top + 5, P.CUT); px(c, x + cx + 1, y + top + 6, P.CUT); px(c, x + cx + 1, y + top + 7, P.CUT);
  rect(c, x + fl - 1, y + foot - 1, fr - fl + 3, 1, P.CUT); // its foot
  if (room.look !== 'woods') return;
  for (let lx = fl - 1; lx <= fr + 1; lx++) if (hash(x + lx, y, 14) > 0.55) { // sunk in the grass
    px(c, x + lx, y + foot - 1, GRASS[0]);
    if (hash(x + lx, y, 15) > 0.6) px(c, x + lx, y + foot - 2, GRASS[1]);
  }
}

// § boulder: the cave's, a rough lump wider and lower than a standing stone, two seams, no moss,
// a pebble or two at its foot
function drawBoulder(c, tx, ty) {
  const P = PAL.rock, x = tx * T, y = ty * T, foot = 13, top = 3 + Math.floor(hash(tx, ty, 7) * 2), rows = [];
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x, y + foot, 16, 2);
  for (let ly = top; ly < foot; ly++) {
    const cap = [4, 2, 1][ly - top] ?? 0;
    rows.push([ly, 2 + cap + Math.floor(hash(tx * 3 + ly, ty, 10) * 2), 13 - cap - Math.floor(hash(tx, ty * 3 + ly, 11) * 2)]);
  }
  body(c, x, y, rows, P, 0.8);
  px(c, x + 7, y + top + 3, P.CUT); px(c, x + 8, y + top + 4, P.CUT); px(c, x + 10, y + top + 6, P.CUT);
  for (const [ex, ey] of [[1, 14], [13, 14], [14, 13]]) if (hash(x + ex, y, 30) > 0.3) { px(c, x + ex, y + ey, P.DARK); px(c, x + ex, y + ey - 1, P.LIT); }
}

// § obelisk: the dungeon's, cut stone narrowing to a point, on a wider plinth, a line of notches
// carved down its face
function drawObelisk(c, tx, ty) {
  const P = PAL.dungeon, x = tx * T, y = ty * T, foot = 13, rows = [];
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + 2, y + foot, 13, 2);
  for (let ly = 1; ly < foot; ly++) {
    const half = ly === 1 ? 1 : ly === 2 ? 2 : ly < 11 ? 3 : 5;
    rows.push([ly, 8 - half, 7 + half]);
  }
  body(c, x, y, rows, P, 0.97);
  rect(c, x + 3, y + 11, 10, 1, P.LIT); // the plinth's lit top
  for (const ry of [4, 6, 8]) px(c, x + 7, y + ry, P.CUT);
  px(c, x + 8, y + 5, P.CUT); px(c, x + 8, y + 7, P.CUT);
  rect(c, x + 3, y + foot - 1, 10, 1, P.CUT); // its foot
}

// § path: four worn flagstones, their rounded corners showing the ground under them (the woods'
// grass, or the room's floor drawn first, tiles.js), lighter on their top edges; chipped, more in
// the cave; the dungeon's square, even and whole
export function drawWaystonePath(c, tx, ty, room) {
  const P = palOf(room), x = tx * T, y = ty * T, neat = room?.look === 'dungeon', chips = room?.look === 'rock' ? 0.3 : 0.6;
  const split = neat ? 8 : 6 + Math.floor(hash(tx, ty, 41) * 4), low = neat ? 8 : 7 + Math.floor(hash(tx, ty, 42) * 3);
  for (const [sx, sy, w, h] of [[0, 0, split - 1, 7], [split, 0, T - split, 7], [0, 8, low - 1, 8], [low, 8, T - low, 8]]) {
    const X = x + sx, Y = y + sy;
    rect(c, X + 1, Y, w - 2, h, P.MORTAR); rect(c, X, Y + 1, w, h - 2, P.MORTAR);
    rect(c, X + 1, Y + 1, w - 2, h - 2, hash(tx * 4 + sx, ty * 4 + sy, 43) > 0.5 ? P.SLAB : P.SLAB_DARK);
    rect(c, X + 1, Y + 1, w - 2, 1, P.LIT);
    if (!neat && hash(X, Y, 44) > chips) px(c, X + 2 + Math.floor(hash(X, Y, 45) * (w - 4)), Y + 3 + Math.floor(hash(X, Y, 46) * (h - 5)), P.CUT); // a chip
  }
}

// § plate: a round carved plate on the flagstones, in the place's stone, its rune cut but dark while
// asleep; woken, the rune is the stairs' violet in every place (D-591, mock-up A, D-1021)
export const RUNE = [[7, 4], [8, 4], [7, 5], [6, 6], [7, 6], [9, 6], [7, 7], [8, 8], [7, 9], [8, 9]];
export const AWAKE = '#a58ce0';
export function drawWaystonePlate(c, tx, ty, woken = false, room) {
  const P = palOf(room), x = tx * T, y = ty * T;
  drawWaystonePath(c, tx, ty, room);
  rect(c, x + 2, y + 3, 12, 10, P.OUT); rect(c, x + 3, y + 2, 10, 12, P.OUT);
  rect(c, x + 3, y + 3, 10, 10, P.STONE);
  rect(c, x + 3, y + 3, 10, 1, P.LIT); rect(c, x + 3, y + 3, 1, 10, P.LIT);
  for (const [rx, ry] of RUNE) rect(c, x + rx, y + ry + 1, 1, 1, woken ? AWAKE : P.CUT);
}
