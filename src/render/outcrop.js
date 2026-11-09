// § outcrop: the surface's grey rock, by the cave mouth and in the mountain
// rooms, drawn rounded as the cave's walls are (D-738, D-739): the same mask
// (rock.js), its corners rounded and edges wandering, a sunlit cap, a front face
// of piled chunks where open ground lies below, and shade on the grass under it.
// Walking is still by tile, and an open tile's middle is never covered. In a
// room whose edge is rock (mountain.js), the rock goes on past the edge but
// for the ways out; elsewhere it stops at the edge, where the trees go on.
import { hash } from '../core/noise.js';
import { tileAt } from '../core/room.js';
import { rockGoesOn } from '../core/mountain.js';
import { TILE as T } from './screen.js';
import { mask, chunks, FACE_H } from './rock.js';

// Lit by day (D-739): a sunlit grey cap, not the cave's near-black, and fuller,
// so a lone rock tile stays a lump; the face and its foot as the cave's
const CAP = '#4a5266', GRIT = '#555e73', EDGE = '#7a8499', FOOT = '#14161d';
const WOBBLE = 0.45, LEVEL = 0.32; // the cave's are 0.55 and 0.5

// (room) → the tiles' rock for the room's own drawing: past the edge, rock
// in a room whose edge is rock but straight out from its open edge tiles
export function roomOutcrops(room) {
  const goes = rockGoesOn(room), edge = (v, n) => Math.max(0, Math.min(n - 1, v));
  const wall = (x, y) => x >= 0 && y >= 0 && x < room.cols && y < room.rows ? +(tileAt(room, x, y).id === 'outcrop')
    : +(goes && tileAt(room, edge(x, room.cols), edge(y, room.rows)).id !== 'floor');
  const gap = (x, y) => (x === 0 || y === 0 || x === room.cols - 1 || y === room.rows - 1) && tileAt(room, x, y).id === 'floor';
  return { wall, gap, solidAt: (x, y) => wall(x, y) === 1 };
}
// (wide) → the same for the drawing past the edge, from the widened room
// (openings.js); `out(x, y)`: a tile past what is drawn, rock if the rock goes on
export function wideOutcrops(wide, out) {
  const goes = rockGoesOn(wide), wall = (x, y) => (out(x, y) ? +goes : +(tileAt(wide, x, y).id === 'outcrop'));
  return { wall, gap: () => false, solidAt: (x, y) => wall(x, y) === 1 };
}

// (room, win, put, shade, walls, more): paint the rock into the pixels of
// `win`, { x0, y0, w, h }. `more(x, y)`: more pixels of rock (the arch, mouth.js).
export function paintOutcrops(room, win, put, shade, walls, more = () => false) {
  const { x0: X0, y0: Y0, w: W, h: H } = win, m = mask(room, WOBBLE, win, { ...walls, level: LEVEL });
  const rock = (x, y) => (x < X0 || y < Y0 || x >= X0 + W || y >= Y0 + H ? walls.wall(Math.floor(x / T), Math.floor(y / T)) === 1 : m[(y - Y0) * W + x - X0] === 1 || more(x, y));
  for (let y = Y0; y < Y0 + H; y++) for (let x = X0; x < X0 + W; x++) {
    if (!rock(x, y)) {
      for (let k = 1; k <= 4; k++) if (rock(x, y - k)) { shade(x, y, k <= 2 ? 0.55 : 0.78); break; } // shade under the face
      continue;
    }
    let down = 0; // rock pixels below this one, down to open ground
    while (down < FACE_H && rock(x, y + down + 1)) down++;
    if (down < FACE_H) put(x, y, down === FACE_H - 1 ? EDGE : down === 0 ? FOOT : chunks(x, y));
    else put(x, y, !rock(x - 1, y) || !rock(x + 1, y) || !rock(x, y - 1) ? EDGE : hash(x >> 1, y >> 1, 9) < 0.15 ? GRIT : CAP);
  }
}
