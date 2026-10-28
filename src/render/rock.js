// § rock: the raw rock of generated depths, grey (D-164) or earth (D-165),
// by the room's look. Same view as the crypt
// (ART-DIRECTION.md, "View"): a dark cap, a front face where open floor lies
// below, shade on the floor under it. But the rock's edges don't keep to the
// tiles: corners round off and edges wander a few pixels. Walking is still by
// tile, and a floor tile's middle is never covered. Drawn once per room;
// tiles.js draws the stairs on top. Past a small room's edge the rock goes on
// (drawRockBeyond, D-403), in the same pixels' places, so no seam shows.
import { hash } from '../core/noise.js';
import { isWall, tileAt } from '../core/room.js';
import { TILE as T } from './screen.js';

// § palette: grey is the study's cool blue-greys, as rock; earth is packed
// brown earth with banded strata (ART-DIRECTION.md)
const LOOKS = {
  rock: {
    cap: '#1c1f28', grit: '#252935', edge: '#5a6478', foot: '#14161d', wobble: 0.55, // wobble: how far an edge wanders, as a share of half a tile
    floor: ['#363b48', '#404656', '#282c36', '#4a5163'], face: chunks, spot: puddle,
  },
  earth: {
    cap: '#1e1814', grit: '#261e18', edge: '#6e5a48', foot: '#16110d', wobble: 0.5,
    floor: ['#3d3229', '#47392e', '#2e251e', '#544435'], face: strata, spot: stone,
  },
};
const FACE_H = 11; // the front face's height in pixels, the crypt's 5 to 15
const PUDDLES = 0.12; // the share of grey floor tiles with a puddle
const STONES = 0.5; // the share of earth floor tiles with a stone

// § mask: 1 for rock, for every pixel. Tile middles are 1 (wall) or 0, mixed
// between middles and cut at a level that wobbles in 3-pixel steps, so edges
// stay chunky pixel art. An opening in the room's edge stays clear to the
// edge: the tile beyond it counts as floor, and its own tile has no rock (D-201).
// `win`: the pixels to work out, { x0, y0, w, h }, the room's own or wider.
const floorDiv = (a, n) => Math.floor(a / n), mod = (a) => ((a % T) + T) % T; // right for pixels left of or above the room too
function roomWalls(room) {
  const inside = (x, y) => x >= 0 && y >= 0 && x < room.cols && y < room.rows;
  const gap = (x, y) => !isWall(room, x, y) && (x === 0 || y === 0 || x === room.cols - 1 || y === room.rows - 1);
  const wall = (x, y) => inside(x, y) ? +isWall(room, x, y) : +!gap(Math.max(0, Math.min(room.cols - 1, x)), Math.max(0, Math.min(room.rows - 1, y)));
  return { wall, gap };
}
function mask(room, wobble, win, { wall, gap }) {
  const { x0: X0, y0: Y0, w: W, h: H } = win, m = new Uint8Array(W * H);
  for (let y = Y0; y < Y0 + H; y++) for (let x = X0; x < X0 + W; x++) {
    const tx = floorDiv(x, T), ty = floorDiv(y, T), ix = mod(x), iy = mod(y);
    const fx = (x + 0.5) / T - 0.5, fy = (y + 0.5) / T - 0.5, x0 = Math.floor(fx), y0 = Math.floor(fy), ax = fx - x0, ay = fy - y0;
    const v = (wall(x0, y0) * (1 - ax) + wall(x0 + 1, y0) * ax) * (1 - ay) + (wall(x0, y0 + 1) * (1 - ax) + wall(x0 + 1, y0 + 1) * ax) * ay;
    let rock = v > 0.5 - (hash(floorDiv(x, 3), floorDiv(y, 3), 7) - 0.5) * wobble;
    if (isWall(room, tx, ty) && v > 0.95) rock = true;
    if (!isWall(room, tx, ty) && (tileAt(room, tx, ty).leads || gap(tx, ty) || ix > 3 && ix < 12 && iy > 3 && iy < 12)) rock = false;
    m[(y - Y0) * W + x - X0] = rock ? 1 : 0;
  }
  return m;
}

// § face: grey is piled chunks of rock, each the nearest of a few hashed
// points, with dark seams between and the top of each chunk catching the light
const FACE = ['#4b5468', '#555e73', '#434b5d'], FACE_TOP = ['#6a7489', '#5f697e'], SEAM = '#262a35';
function chunks(x, y) {
  let best = 1e9, second = 1e9, id = 0;
  const cx = floorDiv(x, 7), cy = floorDiv(y, 6);
  for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
    const px = (cx + i) * 7 + hash(cx + i, cy + j, 21) * 7, py = (cy + j) * 6 + hash(cx + i, cy + j, 22) * 6;
    const d = (x - px) ** 2 + ((y - py) * 1.3) ** 2;
    if (d < best) { second = best; best = d; id = hash(cx + i, cy + j, 23); } else if (d < second) second = d;
  }
  if (second - best < 10) return SEAM;
  if (second - best < 22 && y % 6 < 3) return FACE_TOP[id < 0.5 ? 0 : 1];
  return FACE[Math.min(2, id * 3 | 0)];
}
// Earth is uneven bands of rock, like a cut through the ground, with dark lines between
const STRATA = ['#5a4a3e', '#6a584a', '#4e4036'], STRATA_LINE = ['#3a2f26', '#2a221c'];
function strata(x, y) {
  const k = hash(floorDiv(y + (hash(floorDiv(x, 5), floorDiv(y, 3), 3) * 2 | 0), 3), floorDiv(x, 9), 11);
  if (((y + (hash(floorDiv(x, 5), 0, 3) * 2 | 0)) % 3 + 3) % 3 === 0) return STRATA_LINE[k < 0.3 ? 0 : 1];
  return STRATA[Math.min(2, k * 3 | 0)];
}

// § floor: uneven ground with gravel and pebbles, and on some tiles a spot:
// a puddle on grey rock, a stone on earth
function floor(look, x, y) {
  const tx = floorDiv(x, T), ty = floorDiv(y, T), h = hash(x, y, 5), [base, light, dark, pebble] = look.floor;
  return look.spot(x, y, tx, ty) || (h < 0.06 ? pebble : h < 0.14 ? dark : hash(floorDiv(x, 3), floorDiv(y, 3), 6) < 0.3 ? light : base);
}
function puddle(x, y, tx, ty) {
  if (hash(tx, ty, 12) >= PUDDLES) return null;
  const px = mod(x) - 8, py = mod(y) - 9, e = px * px / 16 + py * py / 6;
  return e < 0.3 && py < 0 ? '#3a4660' : e < 1 ? '#262d3d' : null;
}
function stone(x, y, tx, ty) {
  if (hash(tx, ty, 13) >= STONES) return null;
  const px = mod(x) - (3 + hash(tx, ty, 14) * 9 | 0), py = mod(y) - (4 + hash(tx, ty, 15) * 8 | 0);
  return px * px + py * py < 3 ? (py < 0 ? '#6a5848' : '#544435') : null;
}

const rgb = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const RGB = new Map();
const toRgb = (h) => RGB.get(h) || (RGB.set(h, rgb(h)), RGB.get(h));

export function drawRock(c, room) {
  const win = { x0: 0, y0: 0, w: room.cols * T, h: room.rows * T }; // the whole room, which can be bigger than the screen (D-195)
  c.putImageData(paint(c, room, win, roomWalls(room), false), 0, 0);
}

// § beyond: the rock going on `mx` tiles past the left and right edges and
// `my` past the top and bottom, around `wide`, a room widened by openings.js
// (D-403), into `c`, as big as all that. The room's own pixels are left clear.
export function drawRockBeyond(c, wide, mx, my) {
  const win = { x0: -mx * T, y0: -my * T, w: (wide.cols + 2 * mx) * T, h: (wide.rows + 2 * my) * T };
  const out = (x, y) => x < -mx || y < -my || x >= wide.cols + mx || y >= wide.rows + my;
  c.putImageData(paint(c, wide, win, { wall: (x, y) => (out(x, y) ? 1 : +isWall(wide, x, y)), gap: () => false }, true), 0, 0);
}

function paint(c, room, win, walls, beyond) {
  const { x0: X0, y0: Y0, w: W, h: H } = win, RW = room.cols * T, RH = room.rows * T;
  const look = LOOKS[room.look] || LOOKS.rock, m = mask(room, look.wobble, win, walls);
  const rock = (x, y) => x < X0 || y < Y0 || x >= X0 + W || y >= Y0 + H || m[(y - Y0) * W + x - X0] === 1;
  const img = c.createImageData(W, H), d = img.data;
  for (let y = Y0; y < Y0 + H; y++) for (let x = X0; x < X0 + W; x++) {
    if (beyond && x >= 0 && y >= 0 && x < RW && y < RH) continue; // the room's own, drawn by drawRock
    let col, shade = 1;
    if (rock(x, y)) {
      let down = 0; // rock pixels below this one, down to open floor
      while (down < FACE_H && y + down + 1 < Y0 + H && rock(x, y + down + 1)) down++;
      if (down < FACE_H && y + down + 1 < Y0 + H) col = down === FACE_H - 1 ? look.edge : down === 0 ? look.foot : look.face(x, y);
      else col = !rock(x - 1, y) || !rock(x + 1, y) || !rock(x, y - 1) ? look.edge : hash(x >> 1, y >> 1, 9) < 0.15 ? look.grit : look.cap;
    } else {
      col = floor(look, x, y);
      for (let k = 1; k <= 4; k++) if (rock(x, y - k)) { shade = k <= 2 ? 0.55 : 0.78; break; } // shade under the face
    }
    const [r, g, b] = toRgb(col), k = ((y - Y0) * W + x - X0) * 4;
    d[k] = r * shade; d[k + 1] = g * shade; d[k + 2] = b * shade; d[k + 3] = 255;
  }
  return img;
}
