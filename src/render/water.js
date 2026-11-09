// § water (D-500): a still pool, its edge rounding off and wandering like the rock's; an
// outside pond's rounder and smooth (D-748). Blue-grey, grown from the puddle's colours,
// the owner's pick of three: a dark lip in the bank's shadow, a wet rim catching the light, deeper in the middle.
// Shared by the cave's rock (rock.js) and the pond at home (woods.js, D-503).
import { hash } from '../core/noise.js';
import { tileAt } from '../core/room.js';
import { TILE as T } from './screen.js';

const WATER = { bank: ['#0d1119', '#151d2e'], rim: '#56688c', shallow: '#2c3a58', glint: '#3f5175', deep: '#1f2a44', body: '#25324f', ripple: ['#8aa2cc', '#62789f', '#45587c'] };
// The pond's dark grassy lip under its bank: the woods' own darkest greens, a tree's rim and shade (D-503)
export const GRASS_LIP = ['#13241a', '#1d3620'];
const floorDiv = (a, n) => Math.floor(a / n), mod = (a) => ((a % T) + T) % T; // right for pixels left of or above the room too
const isWet = (room, tx, ty) => (tx >= 0 && ty >= 0 && tx < room.cols && ty < room.rows && tileAt(room, tx, ty).id === 'water' ? 1 : 0);
export function wetAt(room, x, y) { // tile middles 1 (water) or 0, mixed between them, as the rock's mask
  const fx = (x + 0.5) / T - 0.5, fy = (y + 0.5) / T - 0.5, x0 = Math.floor(fx), y0 = Math.floor(fy), ax = fx - x0, ay = fy - y0;
  return (isWet(room, x0, y0) * (1 - ax) + isWet(room, x0 + 1, y0) * ax) * (1 - ay) + (isWet(room, x0, y0 + 1) * (1 - ax) + isWet(room, x0 + 1, y0 + 1) * ax) * ay;
}
// A dry tile's middle stays dry, so walking stays by tile. A cave pool's edge wobbles in
// 2-pixel steps as the rock's did; an outside pond's is the owner's pick B (D-748), below.
export function inPool(room, x, y) {
  if (room.look === 'woods') return inPond(room, x, y);
  if (dryMiddle(room, x, y)) return false;
  return wetAt(room, x, y) > 0.5 - (hash(floorDiv(x, 2), floorDiv(y, 2), 31) - 0.5) * 0.45;
}
const dryMiddle = (room, x, y) => { const ix = mod(x), iy = mod(y); return !isWet(room, floorDiv(x, T), floorDiv(y, T)) && ix > 3 && ix < 12 && iy > 3 && iy < 12; };

// § pond shape (D-748): halfway between the cave pool's outline and a round one. Each water
// tile is also a soft round blob, blobs side by side melting together; the outline is half
// that, half the tiles' blend, and wobbles smoothly, not in steps. A lone pixel or a spike
// is cleaned off and a notch filled, so the rim never drips.
const ROUND = 0.5, WOBBLE = 0.45;
function roundAt(room, x, y) {
  const fx = (x + 0.5) / T - 0.5, fy = (y + 0.5) / T - 0.5, cx = Math.round(fx), cy = Math.round(fy);
  let s = 0;
  for (let ty = cy - 1; ty <= cy + 1; ty++) for (let tx = cx - 1; tx <= cx + 1; tx++) {
    if (!isWet(room, tx, ty)) continue;
    const d2 = ((fx - tx) ** 2 + (fy - ty) ** 2) / 1.69; // a blob reaches 1.3 tiles from its middle
    if (d2 < 1) s += (1 - d2) ** 2;
  }
  return Math.min(1, s);
}
function smooth(x, y, s) { // value noise, eased between whole points
  const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  return (hash(x0, y0, s) * (1 - sx) + hash(x0 + 1, y0, s) * sx) * (1 - sy) + (hash(x0, y0 + 1, s) * (1 - sx) + hash(x0 + 1, y0 + 1, s) * sx) * sy;
}
const softNoise = (x, y) => smooth(x / 6, y / 6, 31) * 0.65 + smooth(x / 6 * 2.1, y / 6 * 2.1, 32) * 0.35; // about 6 pixels a bump
function pondAt(room, x, y) {
  if (dryMiddle(room, x, y)) return 0;
  const v = wetAt(room, x, y) * (1 - ROUND) + roundAt(room, x, y) * ROUND;
  return v > 0.5 - (softNoise(x, y) - 0.5) * WOBBLE ? 1 : 0;
}
// Each pixel worked out once a room, as the cleaning and the colours ask about each one several times
const known = new WeakMap();
function rawPond(room, x, y) {
  const w = room.cols * T, h = room.rows * T;
  if (x < 0 || y < 0 || x >= w || y >= h) return pondAt(room, x, y);
  let m = known.get(room);
  if (!m) known.set(room, (m = new Int8Array(w * h).fill(-1)));
  const i = y * w + x;
  if (m[i] < 0) m[i] = pondAt(room, x, y);
  return m[i];
}
function inPond(room, x, y) {
  const n = rawPond(room, x - 1, y) + rawPond(room, x + 1, y) + rawPond(room, x, y - 1) + rawPond(room, x, y + 1);
  if (n <= 1) return false;
  if (n >= 3) return !dryMiddle(room, x, y);
  return rawPond(room, x, y) === 1;
}
// A pool pixel's colour; `lip`, the two rows under the bank, dark rock's or the woods' grass
export function water(room, x, y, lip = WATER.bank) {
  if (!inPool(room, x, y - 1)) return lip[0];
  if (!inPool(room, x, y - 2)) return lip[1];
  if (!inPool(room, x - 1, y) || !inPool(room, x + 1, y) || !inPool(room, x, y + 1)) return WATER.rim;
  const v = wetAt(room, x, y);
  if (v < 0.6) return WATER.shallow;
  if (hash(floorDiv(x, 5) + (y % 4), y, 33) < 0.025) return WATER.glint;
  return v > 0.9 ? WATER.deep : WATER.body;
}

// § ripples: drawn each frame over the still water, under the light. `lamp`, the lantern's
// foot when lit, puts its warm light on the water below it, broken by the surface. Then a
// slow shimmer, and on about 1 tile in 5 a ring that widens and fades every 7 seconds,
// calm, not bubbling (D-503; was half the tiles every 2.6 s). Still with reduced motion.
const RING_MS = 7000, RING_SHARE = 0.2, SHIMMER_MS = [1440, 1120];
export function drawRipples(c, room, t, still, lamp) {
  if (lamp) {
    let y0 = lamp.y;
    while (y0 < lamp.y + 40 && !inPool(room, lamp.x, y0)) y0++;
    if (inPool(room, lamp.x, y0)) for (let d = 3; d < 22; d += 2) {
      const y = y0 + d, w = d < 8 ? 3 : 2, x = lamp.x - 1 + Math.round(still ? 0 : Math.sin(t / 380 + d * 0.9) * (1 + d / 10));
      if (!inPool(room, x, y) || !inPool(room, x + w - 1, y) || !inPool(room, x, y - 3)) continue;
      c.fillStyle = d < 7 ? '#ffd889' : d < 13 ? '#e0a050' : '#9a6234'; c.fillRect(x, y, w, 1);
    }
  }
  for (let ty = 0; ty < room.rows; ty++) for (let tx = 0; tx < room.cols; tx++) {
    if (!isWet(room, tx, ty)) continue;
    for (let i = 0; i < 2; i++) {
      const bx = tx * T + 2 + (hash(tx, ty, 50 + i) * 10 | 0), by = ty * T + 4 + (hash(tx, ty, 60 + i) * 9 | 0), ph = hash(tx, ty, 70 + i) * 6.28;
      const x = bx + Math.round(still ? 0 : Math.sin(t / SHIMMER_MS[0] + ph) * 2), w = 2 + ((Math.sin(t / SHIMMER_MS[1] + ph) + 1) * 1.5 | 0);
      if (!inPool(room, x, by) || !inPool(room, x + w, by) || !inPool(room, x, by - 3)) continue;
      c.fillStyle = WATER.glint; c.fillRect(x, by, w, 1);
    }
    if (hash(tx, ty, 44) < 1 - RING_SHARE) continue;
    const k = still ? 0.35 : (t / RING_MS + hash(tx, ty, 43)) % 1;
    if (k > 0.8) continue;
    const cx = tx * T + 5 + (hash(tx, ty, 41) * 6 | 0), cy = ty * T + 6 + (hash(tx, ty, 42) * 5 | 0), r = 1 + k * 5, n = Math.max(6, Math.round(r * 6));
    c.fillStyle = WATER.ripple[k < 0.35 ? 0 : k < 0.6 ? 1 : 2];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r * 0.45);
      if (inPool(room, x, y) && inPool(room, x, y - 2)) c.fillRect(x, y, 1, 1);
    }
  }
}
