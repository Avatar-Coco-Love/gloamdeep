// § stuck (D-937): the warden's two small moments, in room pixels, from its mock-up. A blow that
// rings off its stone shows a grey spark at the blow's point instead of the white hurt flash: a
// small cross with a white heart, then four flecks flying out. As its fists sink into the floor,
// stone chips spring up from each fist and fall back (take C; its jolt is sprites.js's); no chips
// with reduced motion, as main.js starts none then. The warden stands 2 pixels up on its tile,
// as every creature does (sprites.js, `enemies`). Plain timing and drawing.
import { PAL } from './pictures.js';

export const SPARK_MS = 220, CHIPS_MS = 300; // each moment's length
const CROSS = [[1, 0], [2, 0], [-1, 0], [-2, 0], [0, 1], [0, 2], [0, -1], [0, -2]];
const FLECKS = [[1, 1], [-1, 1], [1, -1], [-1, -1]];
const FISTS = [1, 14]; // each fist's pixel column

// `spark`: { x, y, start }, the warden's tile as the blow rang
export function drawSpark(c, spark, t) {
  if (!spark) return;
  const at = t - spark.start, cx = spark.x * 16 + 8, cy = spark.y * 16 + 6;
  if (at < 0 || at >= SPARK_MS) return;
  if (at < 90) {
    c.fillStyle = PAL.w; c.fillRect(cx, cy, 1, 1);
    c.fillStyle = PAL.S; for (const [a, b] of CROSS) c.fillRect(cx + a, cy + b, 1, 1);
    return;
  }
  const r = at < 150 ? 2 : 3;
  c.fillStyle = at < 150 ? PAL.S : PAL.s;
  for (const [a, b] of FLECKS) c.fillRect(cx + a * r, cy + b * r, 1, 1);
}

// `sunk`: { x, y, start }, the warden's tile as its fists sank
export function drawChips(c, sunk, t) {
  if (!sunk) return;
  const at = t - sunk.start;
  if (at < 0 || at >= CHIPS_MS) return;
  const h = Math.round(4 * Math.sin(Math.PI * at / CHIPS_MS)), x = sunk.x * 16, y = sunk.y * 16 - 2;
  c.fillStyle = PAL.S;
  for (const dx of FISTS) { c.fillRect(x + dx - 1, y + 13 - h, 1, 1); c.fillRect(x + dx + 1, y + 12 - h, 1, 1); }
}
