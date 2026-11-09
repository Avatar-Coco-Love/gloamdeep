// § seal: the broken seal, the crypt's way in from the woods (D-745). The Lightkeepers
// sealed their road and laid their dead in the crypt over it (LORE.md); its doorway
// was bricked up, and a hole has been broken through. On the top edge it faces you:
// crypt-brick jambs, a pale stone lintel with a carved flame, the bricks between
// broken open, black inside. On another edge you see the wall's top from above,
// along the edge: pale stone posts at each end, the bricks between broken open,
// black beyond. Fallen bricks lie on the grass in front. Drawn over the small
// arch's ground and rock (mouth.js), so the worn path in front stays.
import { hash } from '../core/noise.js';
import { TILE as T } from './screen.js';

// The crypt's bricks (tiles.js, ART-DIRECTION.md) and the dressed stone of its lintel
const BRICK = '#535d72', BTOP = '#69748b', MORT = '#2b303c', BDARK = '#475064', BDTOP = '#58627a';
const PALE = '#8a93a6', SLAB = '#6a7489', SLABD = '#4b5468', CAPL = '#56607a';
const SHADOW = '#07060a', BLACK = '#0c0b12', FOOT = '#14161d', SILL = '#3a4050';

// (room, mouths, put): each mouth { x, y, dir } in its look
export function paintSeals(room, mouths, put) {
  const W = room.cols * T, H = room.rows * T;
  for (const { x: tx, y: ty, dir } of mouths) {
    // u: across the tile, v: in from the room's edge, in the tile's own pixels
    const p = (u, v, col) => {
      const [x, y] = { up: [u, v], left: [v, u], right: [T - 1 - v, u], down: [u, T - 1 - v] }[dir];
      const px = tx * T + x, py = ty * T + y;
      if (px >= 0 && py >= 0 && px < W && py < H) put(px, py, col);
    };
    if (dir === 'up') face(p); else top(p);
    for (const [u, v] of dir === 'up' ? [[-1, 19], [11, 20], [15, 18], [4, 22]] : [[4, 9], [10, 11], [-1, 14], [14, 18]]) { // fallen bricks
      p(u, v, BTOP); p(u + 1, v, BTOP); p(u + 2, v, BRICK); p(u, v + 1, BRICK); p(u + 1, v + 1, BRICK); p(u + 2, v + 1, FOOT);
    }
  }
}

// § face: the sealed doorway seen face on, on the top edge
function face(p) {
  bricks(p, -3, 18, 4, 15);
  for (let u = -4; u <= 19; u++) { p(u, 0, PALE); p(u, 1, SLAB); p(u, 2, SLAB); p(u, 3, SLABD); } // the lintel
  p(-4, 1, PALE); p(-4, 2, PALE);
  for (const [u, v] of [[7, 0], [8, 1], [7, 1], [8, 2], [6, 2]]) p(u, v, SLABD); // its carved flame
  for (let u = 1; u <= 14; u++) p(u, 4, MORT);
  for (let v = 4; v <= 15; v++) { p(1, v, SILL); p(14, v, SILL); } // the doorway's edges
  const hole = (u, v) => Math.hypot((u - 7.5) / 4.6, (v - 11.5) / 5) + (hash(u, v, 7) - 0.5) * 0.35 < 1 || (v >= 13 && u >= 3 && u <= 12);
  for (let v = 5; v <= 15; v++) for (let u = 2; u <= 13; u++) if (hole(u, v)) p(u, v, hole(u, v - 1) && hole(u - 1, v) ? BLACK : SHADOW);
  for (let u = -3; u <= 18; u++) p(u, 16, FOOT);
}

// Crypt brick courses, 3 pixels tall, staggered
function bricks(p, u0, u1, v0, v1) {
  for (let v = v0; v <= v1; v++) for (let u = u0; u <= u1; u++) p(u, v, MORT);
  for (let row = 0, v = v0; v + 1 <= v1; row++, v += 3) {
    for (let bu = u0 - 6 + (row % 2 ? 3 : 0); bu <= u1; bu += 6) {
      const dark = hash(bu + 40, row, 93) < 0.3;
      for (let u = Math.max(u0, bu); u <= Math.min(u1, bu + 4); u++) { p(u, v, dark ? BDTOP : BTOP); if (v + 1 <= v1) p(u, v + 1, dark ? BDARK : BRICK); }
    }
  }
}

// § top: the sealed wall's top from above, along a side or bottom edge
function top(p) {
  const D = 6; // how far in from the edge the wall reaches
  for (let u = -3; u <= 18; u++) for (let v = 0; v < D; v++) {
    const post = u <= 1 || u >= 14, hole = u >= 3 && u <= 12 && v < D - 1 - (hash(u, 3, 5) < 0.4 ? 1 : 0);
    if (post) p(u, v, v === D - 1 || u === -3 || u === 18 ? PALE : (u + v) % 5 === 0 ? SLABD : SLAB);
    else if (hole) p(u, v, v < 3 ? BLACK : SHADOW);
    else p(u, v, v === D - 1 ? CAPL : hash(u, v, 9) < 0.5 ? BRICK : MORT);
  }
  for (let u = -3; u <= 18; u++) p(u, D, u >= 3 && u <= 12 ? SHADOW : FOOT); // shade at its foot
}
