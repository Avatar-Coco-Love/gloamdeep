// § mouth: the cave mouth and its rocks in the woods (step 49, mock-up C,
// D-211). The rock is the surface's grey rock (outcrop.js), rounded since
// D-738. The mouth is bare earth going black toward the edge; on the top edge
// it is an arch in the rock. The tile in front of it is worn to earth. Or, as
// the seed picks (D-744), a craggy cave (§ craggy). Drawn into the woods'
// pixels, after the grass, before the trees (woods.js).
import { hash } from '../core/noise.js';
import { tileAt } from '../core/room.js';
import { TILE as T } from './screen.js';
import { paintOutcrops, roomOutcrops } from './outcrop.js';

const EARTH = [[58, 46, 36], [70, 56, 44]], PATH = ['#3e3126', '#4a3a2c'];

// The way into a mouth at tile x, y: the edge it is on, up when on none
const wayIn = (room, x, y) => (y === room.rows - 1 ? 'down' : x === 0 ? 'left' : x === room.cols - 1 ? 'right' : 'up');
// Inside the arch, in a tile's own pixels
const inArch = (px, py) => { const dx = Math.abs(px - 7.5); return py >= 6 && (dx < 5 && py >= 9 || Math.hypot(dx, py - 9.5) < 5); };

// (room, d, put, shade, look): d is the woods' pixel data, W pixels wide; `look`
// the mouth's, one of the registry's (D-744)
export function paintMouths(room, d, put, shade, look = 'arch') {
  const W = room.cols * T, H = room.rows * T, mouths = [];
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
    if (tileAt(room, x, y).id === 'caveMouth') mouths.push({ x, y, dir: wayIn(room, x, y) });
  }
  if (look === 'craggy') return paintCraggy(room, mouths, put, shade);
  const dark = (x, y, rgb, k) => { const i = (y * W + x) * 4; d[i] = rgb[0] * k; d[i + 1] = rgb[1] * k; d[i + 2] = rgb[2] * k; };
  // § ground: the mouth's earth, black at the edge, and worn earth in front
  for (const { x: tx, y: ty, dir } of mouths) {
    const [fx, fy] = { up: [0, 1], down: [0, -1], left: [1, 0], right: [-1, 0] }[dir];
    for (let py = 0; py < T; py++) for (let px = 0; px < T; px++) {
      const x = tx * T + px, y = ty * T + py, f = px / (T - 1), g = py / (T - 1);
      const toward = { up: g, down: 1 - g, left: f, right: 1 - f }[dir]; // 0 at the edge, 1 at the woods
      dark(x, y, EARTH[hash(x, y, 41) < 0.12 ? 1 : 0], Math.max(0, Math.min(1, (toward - 0.15) / 0.85)) ** 1.6);
    }
    const nx = tx + fx, ny = ty + fy;
    if (tileAt(room, nx, ny).id !== 'floor') continue;
    for (let py = 0; py < T; py++) for (let px = 0; px < T; px++) {
      const x = nx * T + px, y = ny * T + py, across = Math.abs((fx ? py : px) - 7.5);
      const near = { up: py < 8, down: py > 7, left: px < 8, right: px > 7 }[dir];
      if (near && across < 3.5 + noiseAt(x, y) * 2 && hash(x, y, 42) > 0.25) put(x, y, PATH[hash(x, y, 44) < 0.3 ? 1 : 0]);
    }
  }
  // § rock: the rounded rock, and the rock round an arch on the top edge
  const arch = (x, y) => { const m = mouths.find((o) => o.dir === 'up' && o.x === (x / T | 0) && o.y === (y / T | 0)); return !!m && !inArch(x % T, y % T); };
  paintOutcrops(room, { x0: 0, y0: 0, w: W, h: H }, put, shade, roomOutcrops(room), arch);
  // § arch: dark inside, blacker toward its back
  for (const { x: tx, y: ty, dir } of mouths) {
    if (dir !== 'up') continue;
    for (let py = 0; py < T; py++) for (let px = 0; px < T; px++) {
      if (inArch(px, py)) dark(tx * T + px, ty * T + py, [40, 32, 26], Math.max(0, (py - 9) / 7) ** 1.5);
    }
  }
}

// Soft noise for the worn edge of the path
function noiseAt(x, y) {
  const fx = x / 3, fy = y / 3, x0 = Math.floor(fx), y0 = Math.floor(fy), ax = fx - x0, ay = fy - y0;
  const a = hash(x0, y0, 43), b = hash(x0 + 1, y0, 43), c = hash(x0, y0 + 1, 43), e = hash(x0 + 1, y0 + 1, 43);
  return (a * (1 - ax) + b * ax) * (1 - ay) + (c * (1 - ax) + e * ax) * ay;
}

// § craggy: the craggy cave (round 3 mock-up E, D-744). On the top edge, a wide, rough
// mouth in the rock face, black inside, rock teeth hanging from its top. On another edge
// the rock roofs over the outer part of the mouth's tile, joining the rocks either side,
// and the ground dives black beneath it. A few fallen pebbles lie on the grass in front.
const SHADOW = '#07060a', BLACK = '#0c0b12', DEEP = ['#3a2f26', '#2a221c', '#16110d'];
const toward = (px, py, dir) => ({ up: 1 - py / 15, down: py / 15, left: 1 - px / 15, right: px / 15 })[dir]; // 1 at the edge
const acrossOf = (px, py, dir) => (dir === 'left' || dir === 'right' ? py : px);
// The roof over a side mouth, in its tile's own pixels
const roofAt = (px, py, dir) => px >= 0 && py >= 0 && px < T && py < T && toward(px, py, dir) > 0.62 + (noiseAt(acrossOf(px, py, dir) * 1.5, 3) - 0.5) * 0.25;
// The top edge's opening, from the tile's foot: 10 pixels either side of the middle, 13 tall
const OPEN = { hw: 10, h: 13, jag: 1.5 };
function inOpening(cx, bot, x, y) {
  const dx = x - cx; if (Math.abs(dx) >= OPEN.hw || y >= bot) return false;
  return y >= Math.round(bot - OPEN.h * Math.sqrt(Math.max(0, 1 - (dx / OPEN.hw) ** 2)) ** 0.55 + (noiseAt(x * 2, 9) - 0.5) * OPEN.jag * 2);
}
function paintCraggy(room, mouths, put, shade) {
  const W = room.cols * T, H = room.rows * T, at = (x, y, hex) => { if (x >= 0 && y >= 0 && x < W && y < H) put(x, y, hex); };
  const rock = (x, y) => { const m = mouths.find((o) => o.x === (x / T | 0) && o.y === (y / T | 0)); return !!m && (m.dir === 'up' || roofAt(x % T, y % T, m.dir)); };
  paintOutcrops(room, { x0: 0, y0: 0, w: W, h: H }, put, shade, roomOutcrops(room), rock);
  for (const { x: tx, y: ty, dir } of mouths) {
    const cx = tx * T + 7.5, bot = ty * T + T;
    // pebbles at the rocks' feet, beside the tile in front, clear of its middle: [into it, across]
    const pebbles = (fx, fy) => { for (const [u, v] of [[1, -11], [2, 10], [3, 12]]) { const x = Math.round(cx + fx * (8 + u) + (fy ? v : 0)), y = Math.round(ty * T + 7.5 + fy * (8 + u) + (fx ? v : 0)); at(x, y, '#5f697e'); at(x + 1, y, '#434b5d'); at(x, y + 1, '#14161d'); } };
    if (dir !== 'up') { // the ground diving under the roof, blacker toward it
      const [sx, sy] = { down: [0, 1], left: [-1, 0], right: [1, 0] }[dir];
      for (let py = 0; py < T; py++) for (let px = 0; px < T; px++) {
        if (roofAt(px, py, dir) || Math.abs(acrossOf(px, py, dir) - 7.5) > 7.2) continue;
        let near = 0; // pixels on to the roof
        while (near < 9 && !roofAt(px + sx * (near + 1), py + sy * (near + 1), dir) && px + sx * (near + 1) >= 0 && px + sx * (near + 1) < T && py + sy * (near + 1) < T) near++;
        const a = acrossOf(px, py, dir), tooth = near < 2 && hash(a >> 1, 7, 112) < 0.4; // the roof's ragged edge of shadow
        put(tx * T + px, ty * T + py, tooth || near < 2 ? SHADOW : near < 5 ? BLACK : near < 7 ? DEEP[2] : near < 8 ? DEEP[1] : DEEP[0]);
        if (near === 0 && hash(a >> 1, 8, 113) < 0.35) put(tx * T + px, ty * T + py, '#4b5468'); // a rock tooth's tip
      }
      pebbles(-sx, -sy);
      continue;
    }
    for (let x = Math.floor(cx - OPEN.hw); x <= cx + OPEN.hw; x++) for (let y = bot - OPEN.h - 4; y < bot; y++) { // the lit lip over it
      if (inOpening(cx, bot, x, y)) { at(x, y - 1, x < cx ? '#7a8499' : '#5f697e'); break; }
    }
    for (let y = bot - OPEN.h - 4; y < bot; y++) for (let x = Math.floor(cx - OPEN.hw); x <= cx + OPEN.hw; x++) { // black inside, the earth floor going in
      if (!inOpening(cx, bot, x, y)) continue;
      let up = 0; while (up < 4 && inOpening(cx, bot, x, y - up - 1)) up++;
      const fromBot = bot - 1 - y, left = !inOpening(cx, bot, x - 1, y);
      at(x, y, up === 0 ? SHADOW : fromBot < 3 ? DEEP[fromBot] : left && up > 1 ? '#262a35' : BLACK);
    }
    for (let x = Math.floor(cx - 8); x <= cx + 8; x += 3) { // teeth down from its top
      let y0 = bot - 16; while (y0 < bot && !inOpening(cx, bot, x, y0)) y0++;
      const len = 2 + Math.floor(hash(x, 6, 104) * 3);
      for (let k = 0; k < len; k++) { at(x, y0 + k, k === len - 1 ? '#262a35' : '#4b5468'); if (k < len - 1) at(x + 1, y0 + k, '#262a35'); }
      at(x, y0, '#6a7489');
    }
    pebbles(0, 1);
  }
}
