// § kindle: look A of the waking mock-up (D-591). As the home waystone wakes, its rune lights
// from the bottom up, then one soft violet ring spreads out over the cross and fades. Drawn in
// room pixels; none with reduced motion, as main.js starts none then. Plain timing and drawing.
import { RUNE } from './waystone.js';

export const KINDLE_MS = 1600; // the whole moment
const RUNE_MS = 500, RING_AT = 400; // the rune's lighting, and when the ring sets out
const RING_FROM = 6, RING_TO = 50, SQUASH = 0.75; // the ring's size in pixels, flattened a little
const CUT = '#2b303c', RING = '165,140,224'; // the rune's dark cut; the stairs' violet

const clamp = (v) => Math.max(0, Math.min(1, v));
// RUNE's pixels from the bottom row up
const UPWARD = RUNE.slice().sort((a, b) => b[1] - a[1]);

// § under the light: the rune's pixels not yet lit drawn dark again over the woken plate
export function drawKindle(c, kindle, t) {
  if (!kindle || t < kindle.start || t >= kindle.start + KINDLE_MS) return;
  const lit = Math.round(clamp((t - kindle.start) / RUNE_MS) * UPWARD.length);
  c.fillStyle = CUT;
  for (const [rx, ry] of UPWARD.slice(lit)) c.fillRect(kindle.x * 16 + rx, kindle.y * 16 + ry + 1, 1, 1);
}

// § over the light: the ring, so it shows in the dusk like the stairs' glow
export function drawRing(c, kindle, t) {
  if (!kindle) return;
  const p = (t - kindle.start - RING_AT) / (KINDLE_MS - RING_AT);
  if (p < 0 || p >= 1) return;
  const r = RING_FROM + p * (RING_TO - RING_FROM);
  c.strokeStyle = `rgba(${RING},${((1 - p) * 0.8).toFixed(2)})`;
  c.lineWidth = 1;
  c.beginPath(); c.ellipse(kindle.x * 16 + 8, kindle.y * 16 + 8, r, r * SQUASH, 0, 0, Math.PI * 2); c.stroke();
}
