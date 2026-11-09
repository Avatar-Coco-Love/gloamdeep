// § mouth: the cave mouth and its rocks in the woods (step 49, mock-up C,
// D-211). The rock is the surface's grey rock (outcrop.js), rounded since
// D-738. The mouth is bare earth going black toward the edge; on the top edge
// it is an arch in the rock. The tile in front of it is worn to earth. Drawn
// into the woods' pixels, after the grass, before the trees (woods.js).
import { hash } from '../core/noise.js';
import { tileAt } from '../core/room.js';
import { TILE as T } from './screen.js';
import { paintOutcrops, roomOutcrops } from './outcrop.js';

const EARTH = [[58, 46, 36], [70, 56, 44]], PATH = ['#3e3126', '#4a3a2c'];

// The way into a mouth at tile x, y: the edge it is on, up when on none
const wayIn = (room, x, y) => (y === room.rows - 1 ? 'down' : x === 0 ? 'left' : x === room.cols - 1 ? 'right' : 'up');
// Inside the arch, in a tile's own pixels
const inArch = (px, py) => { const dx = Math.abs(px - 7.5); return py >= 6 && (dx < 5 && py >= 9 || Math.hypot(dx, py - 9.5) < 5); };

// (room, d, put, shade): d is the woods' pixel data, W pixels wide
export function paintMouths(room, d, put, shade) {
  const W = room.cols * T, H = room.rows * T, mouths = [];
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
    if (tileAt(room, x, y).id === 'caveMouth') mouths.push({ x, y, dir: wayIn(room, x, y) });
  }
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
