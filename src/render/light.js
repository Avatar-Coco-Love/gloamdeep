// § light: multiply every pixel by the light reaching it; darkness is the
// default (ART-DIRECTION.md, "Light"; style study 1, lines 403–429).
// Shadow edges blend over one 4 × 4 cell into the dithered bands (D-053).
// The room sets the darkness and the remembered tiles' look (D-063); their
// edge fades over one cell (D-060). Lights and cells are in room pixels; the
// camera picks which of them land on the screen (D-195). Past a small room's
// edges, a room widened by openings.js is lit like the room: as remembered as
// the nearest edge tile, and lights reach on only down a doorway's passage
// (D-403). A room not widened keeps the deepest dark there (D-381).
import { CELL, seenCells } from '../core/light.js';
import { tileAt } from '../core/room.js';
import { TILE, roomView as view } from './screen.js';

let CW = 0, CH = 0; // the room's size in cells
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const BANDS = 5;
let known = new Uint8Array(0); // cells on remembered tiles

// § blend: how much of `cells` covers pixel x, y (0 to 1): the four nearest cell
// centres mixed by distance, so an edge fades across one cell. Past the edge, the
// edge's own cells (D-403). Cells only ever hold 0 or 1, so there are 256 answers:
// the four cells' pattern by where the pixel sits in its cell, worked once (D-429).
// Per room column and row: the two cells mixed (rows times CW).
const MIX = new Float64Array(256);
for (let q = 0; q < 16; q++) for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) {
  const ax = (i + 0.5) / CELL - 0.5 - Math.floor((i + 0.5) / CELL - 0.5), ay = (j + 0.5) / CELL - 0.5 - Math.floor((j + 0.5) / CELL - 0.5);
  const a = q >> 3, b = (q >> 2) & 1, c = (q >> 1) & 1, d = q & 1;
  MIX[(q << 4) | (j << 2) | i] = (a * (1 - ax) + b * ax) * (1 - ay) + (c * (1 - ax) + d * ax) * ay;
}
let colA = new Int32Array(0), colB = colA, rowA = colA, rowB = colA;
function blend(cells, x, y) { // a pixel inside the room
  const ya = rowA[y], yb = rowB[y], xa = colA[x], xb = colB[x];
  return MIX[(cells[ya + xa] << 7) | (cells[ya + xb] << 6) | (cells[yb + xa] << 5) | (cells[yb + xb] << 4) | ((y & 3) << 2) | (x & 3)];
}
function blendPast(cells, x, y) { // any pixel, past the edge too
  const cx = x < 0 ? 0 : x >= CW * CELL ? CW * CELL - 1 : x, cy = y < 0 ? 0 : y >= CH * CELL ? CH * CELL - 1 : y; // past the edge both cells are the edge's
  const ya = rowA[cy], yb = rowB[cy], xa = colA[cx], xb = colB[cx];
  return MIX[(cells[ya + xa] << 7) | (cells[ya + xb] << 6) | (cells[yb + xa] << 5) | (cells[yb + xb] << 4) | ((y & 3) << 2) | (x & 3)];
}

// `lights`: [{ x, y, r, cr, cg, cb }] in screen pixels: the lantern and any
// torches (D-101). r 0 is no light at all, the lantern switched off (D-082).
// `memory`: one byte per tile, 1 when remembered; null shows every tile remembered.
// `cam`: the room pixel at the screen's top-left (src/core/camera.js).
// `dark`: the darkness now, the room's own unless the sky's changes it (core/daytime.js);
// `lamp`: how much the lights add, less as daylight outshines them (D-217).
const NO_SHIFT = { x: 0, y: 0 }; // a screen-sized room, as on the title, lit whole
let seenBy = []; // one cell buffer per light, reused every frame
// § speed (D-427): the same picture as working every light at every pixel, in less
// time. A tile whose neighbours are all remembered, or all not, needs no blend, nor
// does a pixel past the edge beside such a tile;
// each light only works over the square it can reach; and what the lights add up
// to is kept per screen pixel, added in the same order as before. f to the 1.25
// is worked as f × √√f, many times quicker than Math.pow, and the same picture.
const NONE = {}; // no memory worked out yet
let even = new Uint8Array(0), evenBy = NONE; // per tile: 0 or 1 when it and its 8 neighbours match, else 2; the memory it is for
let addR = new Float64Array(0), addG = addR, addB = addR; // the lights' sum per screen pixel
let spanLo = new Int32Array(0), spanHi = spanLo; // per screen row, the first and last column the lights can reach
const ALPHA = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1 ? 0xff000000 : 0xff; // a pixel's alpha, as one number of four bytes
let shade = new Uint8Array(0); // per room pixel, 1 where remembered tiles' darkness shows (D-429); worked with `even`
// and a border EDGE pixels wide around the room (D-436): past the edge the darkness is the nearest edge pixel's,
// with the dither's own pattern, so it repeats every 4 pixels and the border holds every answer
const EDGE = 4, SW = (RW) => RW + 2 * EDGE;
export function drawLight(ctx, room, lights, memory, cam = NO_SHIFT, dark = room.dark, lamp = 1) {
  if (room.cols * TILE / CELL !== CW || room.rows * TILE / CELL !== CH) { // a new room size: new buffers
    CW = room.cols * TILE / CELL; CH = room.rows * TILE / CELL;
    known = new Uint8Array(CW * CH); seenBy = [];
    even = new Uint8Array(room.cols * room.rows); evenBy = NONE;
    const RW = CW * CELL, RH = CH * CELL, cell = (c, n) => (c < 0 ? 0 : c >= n ? n - 1 : c);
    shade = new Uint8Array(SW(RW) * (RH + 2 * EDGE));
    colA = new Int32Array(RW); colB = new Int32Array(RW); rowA = new Int32Array(RH); rowB = new Int32Array(RH);
    for (let x = 0; x < RW; x++) { const x0 = Math.floor((x + 0.5) / CELL - 0.5); colA[x] = cell(x0, CW); colB[x] = cell(x0 + 1, CW); }
    for (let y = 0; y < RH; y++) { const y0 = Math.floor((y + 0.5) / CELL - 0.5); rowA[y] = cell(y0, CH) * CW; rowB[y] = cell(y0 + 1, CH) * CW; }
  }
  const lit = [];
  for (const L of lights) {
    if (L.r <= 0) continue;
    const cells = seenBy[lit.length] || (seenBy[lit.length] = new Uint8Array(CW * CH));
    seenCells(room, L.x, L.y, L.r, cells);
    lit.push({ L, cells });
  }
  const RW = CW * CELL, RH = CH * CELL;
  if (memory !== evenBy) {
    for (let cy = 0; cy < CH; cy++) for (let cx = 0; cx < CW; cx++) {
      known[cy * CW + cx] = memory ? memory[(cy >> 2) * room.cols + (cx >> 2)] : 1;
    }
    const at = (tx, ty) => known[(Math.max(0, Math.min(room.rows - 1, ty)) * 4) * CW + Math.max(0, Math.min(room.cols - 1, tx)) * 4];
    for (let ty = 0; ty < room.rows; ty++) for (let tx = 0; tx < room.cols; tx++) {
      const v = at(tx, ty);
      let same = true;
      for (let j = -1; j <= 1 && same; j++) for (let i = -1; i <= 1; i++) if (at(tx + i, ty + j) !== v) { same = false; break; }
      even[ty * room.cols + tx] = same ? v : 2;
    }
    for (let y = -EDGE, k = 0; y < RH + EDGE; y++) for (let x = -EDGE; x < RW + EDGE; x++, k++) { // kept per pixel, the border too
      const tx = x >> 4, ty = y >> 4; // past the edge, the edge tile's: the blend only sees the edge's cells
      const e = even[(ty < 0 ? 0 : ty >= room.rows ? room.rows - 1 : ty) * room.cols + (tx < 0 ? 0 : tx >= room.cols ? room.cols - 1 : tx)];
      shade[k] = e === 2 ? (blendPast(known, x, y) > BAYER[((y & 3) << 2) | (x & 3)] ? 1 : 0) : e;
    }
    evenBy = memory;
  }
  const [W, H] = cam === NO_SHIFT ? [CW * CELL, CH * CELL] : [view.w, view.h]; // the title's room is its screen
  if (addR.length < W * H) { addR = new Float64Array(W * H); addG = new Float64Array(W * H); addB = new Float64Array(W * H); }
  // § spans (D-436): per screen row, the columns the lights' squares cover; only these are
  // cleared, summed and read, the rest add nothing
  if (spanLo.length < H) { spanLo = new Int32Array(H); spanHi = new Int32Array(H); }
  spanLo.fill(W, 0, H); spanHi.fill(-1, 0, H);
  for (const at of lit) {
    const { L } = at;
    at.x0 = Math.max(0, Math.floor(L.x - L.r - cam.x)); at.x1 = Math.min(W - 1, Math.ceil(L.x + L.r - cam.x));
    at.y0 = Math.max(0, Math.floor(L.y - L.r - cam.y)); at.y1 = Math.min(H - 1, Math.ceil(L.y + L.r - cam.y));
    if (at.x0 > at.x1) continue;
    for (let sy = at.y0; sy <= at.y1; sy++) { if (at.x0 < spanLo[sy]) spanLo[sy] = at.x0; if (at.x1 > spanHi[sy]) spanHi[sy] = at.x1; }
  }
  for (let sy = 0; sy < H; sy++) if (spanLo[sy] <= spanHi[sy]) {
    const a = sy * W + spanLo[sy], b = sy * W + spanHi[sy] + 1;
    addR.fill(0, a, b); addG.fill(0, a, b); addB.fill(0, a, b);
  }
  // § lights: each over the screen pixels its reach can touch, in the list's order
  for (const { L, cells, x0, x1, y0, y1 } of lit) {
    let tx = NaN, ty = NaN, open = true; // the tile past the edge last looked at, and whether light goes on into it
    for (let sy = y0; sy <= y1; sy++) for (let sx = x0; sx <= x1; sx++) {
      const x = sx + cam.x, y = sy + cam.y; // the room pixel; the dither keeps to the room, not the screen
      const out = x < 0 || y < 0 || x >= RW || y >= RH;
      if (out) {
        if (!room.beyond) continue; // beyond a room not widened
        if (x >> 4 !== tx || y >> 4 !== ty) { tx = x >> 4; ty = y >> 4; open = !tileAt(room, tx, ty).blocksLight; }
        if (!open) continue;
      }
      const s = out ? blendPast(cells, x, y) : blend(cells, x, y);
      if (s <= 0) continue;
      const dx = x - L.x, dy = y - L.y;
      let f = 1 - Math.sqrt(dx * dx + dy * dy) / L.r;
      if (f <= 0) continue;
      f = Math.floor(f * Math.sqrt(Math.sqrt(f)) * s * BANDS + BAYER[((y & 3) << 2) | (x & 3)]) / BANDS;
      const k = sy * W + sx;
      addR[k] += f * L.cr * lamp; addG[k] += f * L.cg * lamp; addB[k] += f * L.cb * lamp;
    }
  }
  // § every pixel: the room's darkness, remembered or unseen, plus what the lights add.
  // Inside and past the edge alike, the darkness kept with the memory (D-436).
  const img = ctx.getImageData(0, 0, W, H), d = img.data, px = new Uint32Array(d.buffer, d.byteOffset, W * H);
  const { unseen, remembered } = dark;
  const black = (c) => c[0] === 0 && c[1] === 0 && c[2] === 0; // a pixel times nothing is 0, written straight (D-429)
  const unseenBlack = black(unseen), rememberedBlack = black(remembered);
  const PW = SW(RW);
  for (let sy = 0; sy < H; sy++) {
    const y = sy + cam.y, inRows = y >= 0 && y < RH;
    if (!inRows && !room.beyond) continue; // beyond a room not widened, left as is
    const xa = inRows ? Math.min(W, Math.max(0, -cam.x)) : W, xb = inRows ? Math.min(W, Math.max(xa, RW - cam.x)) : W; // the room's columns on screen
    const lo = spanLo[sy], hi = spanHi[sy], row = (EDGE + (y < 0 ? (y & 3) - EDGE : y >= RH ? RH + (y & 3) : y)) * PW + EDGE; // past the edge, the border's pixel with the same pattern
    for (let sx = room.beyond ? 0 : xa, end = room.beyond ? W : xb, j = sy * W + sx; sx < end; sx++, j++) {
      const x = sx + cam.x, mem = shade[row + (x < 0 ? (x & 3) - EDGE : x >= RW ? RW + (x & 3) : x)], amb = mem ? remembered : unseen, k = j * 4;
      if (sx < lo || sx > hi) { // no light reaches
        if (mem ? rememberedBlack : unseenBlack) px[j] &= ALPHA;
        else { d[k] = d[k] * amb[0]; d[k + 1] = d[k + 1] * amb[1]; d[k + 2] = d[k + 2] * amb[2]; }
        continue;
      }
      if ((mem ? rememberedBlack : unseenBlack) && addR[j] === 0 && addG[j] === 0 && addB[j] === 0) { px[j] &= ALPHA; continue; }
      d[k] = d[k] * (amb[0] + addR[j]); d[k + 1] = d[k + 1] * (amb[1] + addG[j]); d[k + 2] = d[k + 2] * (amb[2] + addB[j]); // the pixels clamp at 255 themselves
    }
  }
  ctx.putImageData(img, 0, 0);
}

// § flicker: a sum of three sine waves, about ±3.5% for the lantern, ±9% for torches (study line 333)
export function flicker(t, seed, amount) {
  return 1 + amount * (Math.sin(t * 0.011 + seed) * 0.5 + Math.sin(t * 0.023 + seed * 2.3) * 0.3 + Math.sin(t * 0.047 + seed * 5.1) * 0.2);
}
