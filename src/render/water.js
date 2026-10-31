// § water (D-500): a still pool, its edge rounding off and wandering like the rock's, in
// 2-pixel steps. Blue-grey, grown from the puddle's colours, the owner's pick of three:
// a dark lip in the bank's shadow, a wet rim catching the light, deeper in the middle.
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
export function inPool(room, x, y) { // a dry tile's middle stays dry, so walking stays by tile
  const tx = floorDiv(x, T), ty = floorDiv(y, T), ix = mod(x), iy = mod(y);
  if (!isWet(room, tx, ty) && ix > 3 && ix < 12 && iy > 3 && iy < 12) return false;
  return wetAt(room, x, y) > 0.5 - (hash(floorDiv(x, 2), floorDiv(y, 2), 31) - 0.5) * 0.45;
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
