// § woods: grass and round trees, one tree a tile, lit from the top left
// (step 48 mock-up B, D-209), varied in groves (D-750). Grass colours are the 0.2.3 sketch's.
import { hash } from '../core/noise.js';
import { tileAt } from '../core/room.js';
import { TILE as T } from './screen.js';
import { paintMouths } from './mouth.js';
import { paintOutcrops, wideOutcrops } from './outcrop.js';
import { inPool, wetAt, water, GRASS_LIP } from './water.js';

// Value noise: hash at whole points, mixed between them
function noise(x, y, s) {
  const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0;
  const a = hash(x0, y0, s), b = hash(x0 + 1, y0, s), c = hash(x0, y0 + 1, s), d = hash(x0 + 1, y0 + 1, s);
  return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
}
const RGB = new Map();
const rgb = (hex) => RGB.get(hex) || RGB.set(hex, [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))).get(hex);

// Smooth value noise, eased between whole points, for the grass's soft patches
function smooth(x, y, s) {
  const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  return (hash(x0, y0, s) * (1 - sx) + hash(x0 + 1, y0, s) * sx) * (1 - sy) + (hash(x0, y0 + 1, s) * (1 - sx) + hash(x0 + 1, y0 + 1, s) * sx) * sy;
}

// § grass: three greens in big soft patches, mostly the middle one, and a
// rare paler blade two pixels tall (look B, D-749)
function grass(put, x, y) {
  const n = smooth(x / 13, y / 13, 1) * 0.7 + smooth(x / 6, y / 6, 9) * 0.3, r = hash(x, y, 2);
  put(x, y, n < 0.36 ? '#345a2c' : n > 0.68 ? '#4a7a3a' : '#3f6b34');
  if (r > 0.985 && y > 0) { put(x, y, '#5a8c44'); put(x, y - 1, '#5a8c44'); }
}

// § tree: a ground shadow, a short trunk, and a lumpy round crown with a dark
// rim, lighter toward the top left. `put` sets a pixel, `shade` darkens one.
// Each tree varies (look A3, groves, D-750): its crown 0.78 to 1.1 times the
// old size, moved up to 2 pixels, in one of three greens that neighbouring
// trees share, so the woods shift colour in patches. A crown may reach a
// little past its tile, so trees are painted top row first.
const CROWN = { y: 6, r: 6.6, lump: 1.2, size: [0.78, 1.1], move: 2 };
const GREENS = [ // highlight, light, mid, dark, deepest, rim
  ['#6fb04e', '#4f8a3f', '#36633a', '#2c5230', '#1d3620', '#13241a'], // the old green
  ['#62a067', '#457f52', '#2e5a42', '#244a38', '#162e25', '#0e1e18'], // a deep blue-green
  ['#93b552', '#719440', '#527034', '#415c2c', '#2a3c1e', '#192612'], // a warm olive
];
const groveOf = (tx, ty) => { const n = smooth(tx / 3.2, ty / 3.2, 31); return n < 0.4 ? 1 : n > 0.62 ? 2 : 0; };
export function paintTree(put, shade, tx, ty) {
  const s = tx * 7 + ty * 13, P = GREENS[groveOf(tx, ty)];
  const size = CROWN.size[0] + hash(tx, ty, 23) * (CROWN.size[1] - CROWN.size[0]);
  const dx = Math.round((hash(tx, ty, 24) - 0.5) * 2 * CROWN.move), dy = Math.round((hash(tx, ty, 25) - 0.5) * 2 * CROWN.move);
  const cx = 7.5 + dx + (hash(tx, ty, 3) - 0.5), cy = CROWN.y + dy + (1 - size) * 3, R = CROWN.r * size, lump = CROWN.lump * size;
  const foot = Math.min(T - 1, 14 + Math.max(0, dy));
  for (let ly = -4; ly < T + 2; ly++) for (let lx = -3; lx < T + 3; lx++) {
    const x = tx * T + lx, y = ty * T + ly;
    const sx = (lx - 8 - dx) / (6.5 * size), sy = (ly - 14 - Math.max(0, dy)) / 1.6;
    if (ly < T && sx * sx + sy * sy < 1) shade(x, y, 0.5);
    if ((lx === 7 + dx || lx === 8 + dx) && ly >= 10 + dy && ly <= foot) put(x, y, lx === 7 + dx ? '#6a4c36' : '#3e2c20');
    const r = R + noise(Math.atan2(ly - cy, lx - cx) * 1.6 + 9, s, 4) * lump, d = Math.hypot(lx - cx, ly - cy);
    if (d > r) continue;
    if (d > r - 1) { put(x, y, P[5]); continue; }
    const k = ((lx - cx) * -0.6 + (ly - cy) * -0.8) / r + (noise(x / 2.2, y / 2.2, 14 + s) - 0.5) * 0.7;
    put(x, y, k > 0.45 ? (hash(x, y, 5) > 0.75 ? P[0] : P[1]) : k > 0 ? P[2] : k > -0.4 ? P[3] : P[4]);
  }
}

// § room: the whole woods room at once, pixel by pixel
export function drawWoods(c, room, mouth = 'arch') {
  const w = room.cols * T, h = room.rows * T, img = c.createImageData(w, h), d = img.data;
  const inside = (x, y) => x >= 0 && y >= 0 && x < w && y < h; // a crown reaching past the room's edge is cut there
  const put = (x, y, hex) => { if (!inside(x, y)) return; const [r, g, b] = rgb(hex), i = (y * w + x) * 4; d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = 255; };
  const shade = (x, y, k) => { if (!inside(x, y)) return; const i = (y * w + x) * 4; d[i] *= k; d[i + 1] *= k; d[i + 2] *= k; };
  for (let y = 0; y < room.rows * T; y++) for (let x = 0; x < w; x++) grass(put, x, y);
  paintPond(room, put, shade);
  paintMouths(room, d, put, shade, mouth); // the cave mouth, in its look (D-744), and the rock (D-211, D-738), the trees in front
  for (let ty = 0; ty < room.rows; ty++) for (let tx = 0; tx < room.cols; tx++) {
    if (tileAt(room, tx, ty).id === 'tree') paintTree(put, shade, tx, ty);
  }
  c.putImageData(img, 0, 0);
}

// § pond: the pond at home (D-503), the cave pool's water with a dark grassy lip under its
// bank, the grass beside it darkened as the cave's damp stone is. A tree's tile is left to the tree.
function paintPond(room, put, shade) {
  if (!room.map.some((row) => row.includes('~'))) return;
  for (let y = 0; y < room.rows * T; y++) for (let x = 0; x < room.cols * T; x++) {
    if (tileAt(room, Math.floor(x / T), Math.floor(y / T)).id === 'tree') continue;
    if (inPool(room, x, y)) put(x, y, water(room, x, y, GRASS_LIP));
    else if (wetAt(room, x, y) > 0.22) shade(x, y, 0.82);
  }
}

// § spawned: a tree the dev spawn tool puts in another room, on its floor
export function drawTree(c, room, tx, ty) {
  const put = (x, y, hex) => { c.fillStyle = hex; c.fillRect(x, y, 1, 1); };
  const shade = (x, y, k) => { c.fillStyle = `rgba(0,0,0,${1 - k})`; c.fillRect(x, y, 1, 1); };
  paintTree(put, shade, tx, ty);
}

// § beyond: the grass, rock and trees going on `mx` tiles past the left and right
// edges and `my` past the top and bottom, around `wide`, a room widened by
// openings.js (D-403), into `c`, as big as all that. The room's own pixels
// are left clear, for drawWoods.
export function drawWoodsBeyond(c, wide, mx, my) {
  const ox = mx * T, oy = my * T, w = (wide.cols + 2 * mx) * T, h = (wide.rows + 2 * my) * T;
  const img = c.createImageData(w, h), d = img.data, RW = wide.cols * T, RH = wide.rows * T;
  const mine = (x, y) => (x < 0 || y < 0 || x >= RW || y >= RH) && x >= -ox && y >= -oy && x < w - ox && y < h - oy;
  const put = (x, y, hex) => { if (!mine(x, y)) return; const [r, g, b] = rgb(hex), i = ((y + oy) * w + x + ox) * 4; d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = 255; };
  const shade = (x, y, k) => { if (!mine(x, y)) return; const i = ((y + oy) * w + x + ox) * 4; d[i] *= k; d[i + 1] *= k; d[i + 2] *= k; };
  for (let y = -oy; y < h - oy; y++) for (let x = -ox; x < w - ox; x++) if (mine(x, y)) grass(put, x, y);
  const out = (x, y) => x < -mx || y < -my || x >= wide.cols + mx || y >= wide.rows + my;
  paintOutcrops(wide, { x0: -ox, y0: -oy, w, h }, put, shade, wideOutcrops(wide, out)); // a mountain room's rock going on (D-738)
  for (let ty = -my; ty < wide.rows + my; ty++) for (let tx = -mx; tx < wide.cols + mx; tx++) {
    if (tileAt(wide, tx, ty).id === 'tree' && (tx < 0 || ty < 0 || tx >= wide.cols || ty >= wide.rows)) paintTree(put, shade, tx, ty);
  }
  c.putImageData(img, 0, 0);
}
