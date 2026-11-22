// § trip: the waystone trip (D-1021, D-1022), look A of the mock-up, "rise and fall". The hero
// breaks into their own pixels, which turn violet and drift up like embers (0.7 s); the room
// fades to the dark and the far one in (0.3 s); the far stone stands empty, its rune glowing
// (0.3 s); then violet sparks drift down and settle into the hero, each taking back its colour
// (0.7 s). About 2 s, a tap or a key skips it (main.js). With reduced motion no sparks: the
// stairs' quick fade, about 0.4 s. Plain timing, and drawing in room pixels over the light.
import { hash } from '../core/noise.js';

export const TRIP = { leave: 700, fade: 300, empty: 300, gather: 700 };
export const TRIP_MS = TRIP.leave + TRIP.fade + TRIP.empty + TRIP.gather;
export const TRIP_STILL_MS = 400; // with reduced motion: the stairs' fade, 200 ms each way (D-135)
const FLIGHT = 0.5; // a pixel's flight, of the leave or the gather
const VIOLET = [165, 140, 224], BRIGHT = [216, 200, 255]; // the woken rune's violet, and a paler spark

const clamp = (v) => Math.max(0, Math.min(1, v));

// (start, still) → the trip's times, as app.travel holds them: the dark's middle, its end, and how
// long each half of the dark is
export function tripTimes(start, still) {
  if (still) return { mid: start + TRIP_STILL_MS / 2, end: start + TRIP_STILL_MS, fade: TRIP_STILL_MS / 2 };
  return { mid: start + TRIP.leave + TRIP.fade / 2, end: start + TRIP_MS, fade: TRIP.fade / 2, trip: { start } };
}

// (trip, t) → { phase, k }: 'leave', 'dark', 'empty' or 'gather', k 0 to 1 through it; null after
export function tripAt(trip, t) {
  let d = t - trip.start;
  for (const phase of ['leave', 'fade', 'empty', 'gather']) {
    if (d < TRIP[phase]) return { phase: phase === 'fade' ? 'dark' : phase, k: clamp(d / TRIP[phase]) };
    d -= TRIP[phase];
  }
  return null;
}

// The hero's pixels, { x, y, col, r, s }, from its sprite; r and s fixed by where each one is
export function heroPixels(sprite) {
  const d = sprite.getContext('2d').getImageData(0, 0, 16, 16).data, out = [];
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
    const o = (y * 16 + x) * 4;
    if (d[o + 3] > 0) out.push({ x, y, col: [d[o], d[o + 1], d[o + 2]], r: hash(x, y, 1021), s: hash(y, x, 1022) });
  }
  return out;
}

// (pixel, lift) → where it is: lift 0 to 1 through the leave (the gather runs it backward).
// The head lifts first; { x, y } from the sprite's top left, a: how bright, 0 gone, tint: how violet
const delayOf = (p) => (1 - p.y / 16) * 0.35 + p.r * 0.15;
export function sparkAt(p, lift) {
  const delay = delayOf(p);
  const k = clamp((lift - delay) / FLIGHT), tint = clamp((lift - delay + 0.12) / 0.12);
  if (k <= 0) return { x: p.x, y: p.y, a: 1, tint: tint * 0.85, home: true };
  const e = k * k;
  return { x: p.x + (p.s - 0.5) * 14 * e + Math.sin(k * 6 + p.r * 9) * 1.5 * k, y: p.y - 44 * e - 8 * k * p.r, a: 1 - clamp((k - 0.55) / 0.45), tint: 1, k };
}

const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
const rgb = (a, al = 1) => `rgba(${a[0]},${a[1]},${a[2]},${al.toFixed(2)})`;

// § glow: a soft violet over the plate, brightening as the trip starts, fullest on the empty stone
function glow(c, x, y, amount) {
  if (amount <= 0) return;
  const g = c.createRadialGradient(x, y, 0, x, y, 14);
  g.addColorStop(0, `rgba(190,160,255,${(0.55 * amount).toFixed(2)})`); g.addColorStop(1, 'rgba(165,140,224,0)');
  c.fillStyle = g; c.fillRect(x - 14, y - 14, 28, 28);
}

// § sparks: the hero's pixels at `lift`; `landing`, the gather: a pixel home is turning back from violet
function sparks(c, pixels, x, y, lift, landing) {
  for (const p of pixels) {
    const at = sparkAt(p, lift);
    if (at.a <= 0) continue;
    if (at.home) { // landed, its colour coming back over a quarter of the gather; or about to lift, going violet
      c.fillStyle = rgb(mix(p.col, VIOLET, landing ? 1 - clamp((delayOf(p) - lift) / 0.25) : at.tint));
      c.fillRect(x + p.x, y + p.y, 1, 1); continue;
    }
    const px = Math.round(x + at.x), py = Math.round(y + at.y);
    c.fillStyle = rgb(Math.floor(at.k * 20 + p.r * 10) % 3 === 0 ? BRIGHT : VIOLET, at.a);
    c.fillRect(px, py, 1, 1);
    if (p.s > 0.8) { c.fillStyle = rgb(VIOLET, 0.25 * at.a); c.fillRect(px - 1, py, 3, 1); c.fillRect(px, py - 1, 1, 3); } // a few with a faint cross of light
  }
}

// § draw: the trip at t, the hero's sprite drawn at x, y (its tile's top left, 2 pixels up as
// drawHero draws it); false once it is over, when the hero is drawn as always
export function drawTrip(c, trip, sprite, x, y, t) {
  const at = trip && tripAt(trip, t);
  if (!at) return false;
  if (!trip.pixels) trip.pixels = heroPixels(sprite); // at its start, the hero as they look now
  const mx = x + 8, my = y + 8;
  if (at.phase === 'leave') { glow(c, mx, my, clamp(at.k * 5) * (1 - at.k * 0.3)); sparks(c, trip.pixels, x, y - 2, at.k, false); }
  else if (at.phase === 'dark') glow(c, mx, my, 0.5);
  else if (at.phase === 'empty') glow(c, mx, my, 0.5 + 0.5 * at.k);
  else { glow(c, mx, my, 1 - at.k * 0.6); sparks(c, trip.pixels, x, y - 2, 1 - at.k, true); }
  return true;
}

// Whether the hero's own picture is hidden: from the trip's start to its end
export const tripHides = (travel, t) => !!travel?.trip && t < travel.end;
