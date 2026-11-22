// § guide: the knot of gloam and the spark it holds, then the spark freed (D-1024; rules, core/spark.js
// and core/knot.js). The knot is a tangle of dark threads round a dim spark, on a deposit's shadow
// 2 pixels up: its dark threads are drawn into the room's picture (tiles.js), its violet edges
// over them each frame, creeping along the threads, a slow writhe, before the light so the light
// shades them; still with reduced motion. The spark inside glimmers over the dark, dim. Freed, the
// spark floats by the hero's shoulder, away from the lantern, not held to the grid (D-034): it
// eases after the hero and bobs slowly, a pale warm core in a small dithered halo drawn over the
// dark, lighting nothing (pillar 1). With reduced motion it stays still beside the hero.
// Claude's pixels and colours, from the mock-up.
import { get } from '../core/registry.js';
import { halo } from './sprites.js';

const DARK = '#0e0c16', THREAD = '#241d33', EDGE = '#6e58a8', EDGE_LIT = '#8a72c8';
const CORE = '#fff3c8', RAYS = '#ffe9a8', DIM = '#b9ab88';
const HALO = { reach: 5, inner: 'rgb(112,92,50)', outer: 'rgb(64,52,32)', cut: 0.3 }; // warm, dim, small
const HELD_HALO = { reach: 3, inner: 'rgb(70,58,36)', outer: 'rgb(46,38,26)', cut: 0.4 };
// The threads: loops round the middle (8, 7), each an ellipse turned by `a`, its pixels kept once
const ARCS = [{ a: 0.2, rx: 5, ry: 3 }, { a: 1.3, rx: 5, ry: 3 }, { a: 2.4, rx: 5, ry: 2.5 }, { a: 0.8, rx: 3.5, ry: 4.5 }, { a: 2.0, rx: 4, ry: 2 }];
const CX = 8, CY = 7, STEPS = 40;
const PIXELS = ARCS.flatMap(({ a, rx, ry }, i) => {
  const seen = new Set(), out = [];
  for (let k = 0; k < STEPS; k++) {
    const u = (k / STEPS) * Math.PI * 2, ex = Math.cos(u) * rx, ey = Math.sin(u) * ry;
    const x = Math.round(CX + ex * Math.cos(a) - ey * Math.sin(a)), y = Math.round(CY + ex * Math.sin(a) + ey * Math.cos(a));
    if (seen.has(`${x},${y}`) || (Math.abs(x - CX) <= 1 && Math.abs(y - CY) <= 1)) continue; // the spark's gap in the middle
    seen.add(`${x},${y}`); out.push({ x, y, arc: i, k: k / STEPS });
  }
  return out;
});

// § base: the knot's dark threads on its shadow, into the room's picture (tiles.js)
export function drawKnotBase(c, tx, ty) {
  const x = tx * 16, y = ty * 16 - 2;
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + 2, y + 14, 12, 2); c.fillRect(x + 3, y + 16, 10, 1);
  for (const p of PIXELS) { c.fillStyle = p.arc % 2 ? THREAD : DARK; c.fillRect(x + p.x, y + p.y, 1, 1); }
}

// The room's knots, by tile, found by their letter
function knotsIn(room, each) {
  const mark = get('gloamKnot').letter;
  room.map.forEach((row, ty) => { for (let tx = row.indexOf(mark); tx >= 0; tx = row.indexOf(mark, tx + 1)) each(tx, ty); });
}

// § writhe: each thread's violet edge, a third of its loop, creeping round (before the light)
export function drawKnots(c, room, t, still) {
  knotsIn(room, (tx, ty) => {
    const x = tx * 16, y = ty * 16 - 2;
    for (const p of PIXELS) {
      const at = (p.k + (still ? 0 : t / (5200 + p.arc * 900)) + p.arc * 0.37) % 1;
      if (at < 0.3) { c.fillStyle = at < 0.08 ? EDGE_LIT : EDGE; c.fillRect(x + p.x, y + p.y, 1, 1); }
    }
  });
}

// § held: the dim spark in the knot's middle, glimmering over the dark (after the light)
export function drawHeldSparks(c, room, t, still) {
  knotsIn(room, (tx, ty) => {
    const x = tx * 16 + CX, y = ty * 16 - 2 + CY, pulse = still ? 0.8 : 0.65 + 0.25 * Math.sin(t / 700);
    halo(c, x, y, HELD_HALO, pulse);
    c.fillStyle = DIM; c.fillRect(x, y, 1, 1);
  });
}

// § freed: the spark beside the hero, hx, hy the hero's drawn tile corner in room pixels
let at = null, came = null;
const SIDE = { x: 1, y: -3 }, EASE = 0.06, SNAP = 48; // by the left shoulder, the lantern on the right
// `from`, the turn's `spark` event as it is freed: it rises from the knot's middle and drifts over
export function drawGuide(c, hx, hy, t, still, from) {
  if (from && from !== came) { came = from; if (!still) at = { x: from.x * 16 + CX, y: from.y * 16 - 2 + CY }; }
  const bob = still ? 0 : Math.sin(t / 760) * 1.5, sway = still ? 0 : Math.sin(t / 1900) * 1.5;
  const want = { x: hx + SIDE.x + sway, y: hy + SIDE.y + bob };
  if (!at || still || (!from && Math.hypot(want.x - at.x, want.y - at.y) > SNAP)) at = { ...want }; // a new room: there at once
  else { at.x += (want.x - at.x) * EASE; at.y += (want.y - at.y) * EASE; }
  const x = Math.round(at.x), y = Math.round(at.y), pulse = still ? 0.9 : 0.8 + 0.15 * Math.sin(t / 500);
  halo(c, x, y, HALO, pulse);
  c.fillStyle = RAYS; c.fillRect(x - 1, y, 3, 1); c.fillRect(x, y - 1, 1, 3);
  c.fillStyle = CORE; c.fillRect(x, y, 1, 1);
}
