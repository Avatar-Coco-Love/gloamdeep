// § beam: look A of the leaving mock-up, the lantern beam (D-496). A column of warm light
// drops onto a person; they come apart in thin bands from the top down, the bands rising up
// the beam, before it narrows to a line and goes out. Arriving plays it backwards. Drawn in
// room pixels; none with reduced motion, as main.js starts no beam then.
import { personSprite, drawShadow } from './sprites.js';

export const BEAM_MS = 1000; // the mock-up's second
const BEAM_UP = 40; // how far above the head the beam reaches, and the bands rise, in pixels
const GOLD = '#ffd66b', PALE = '#ffe9a8', SPECK = '#fff3c8'; // the flame's yellow, and two paler

const clamp = (v) => Math.max(0, Math.min(1, v));
// § pixels: a sprite's opaque pixels as { x, y, r, g, b }, each with its own drift, made once
const PIXELS = new WeakMap();
function pixelsOf(cv) {
  if (!PIXELS.has(cv)) {
    const data = cv.getContext('2d').getImageData(0, 0, 16, 16).data, out = [];
    let seed = 7;
    const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
    for (let i = 0; i < 256; i++) if (data[i * 4 + 3]) out.push({ x: i % 16, y: i >> 4, r: data[i * 4], g: data[i * 4 + 1], b: data[i * 4 + 2], drift: rnd() * 2 - 1 });
    PIXELS.set(cv, out);
  }
  return PIXELS.get(cv);
}
// A pixel's colour mixed toward the beam's pale gold by k
const PALE_RGB = [0xff, 0xe9, 0xa8];
const toward = (q, k) => `rgb(${[q.r, q.g, q.b].map((v, i) => Math.round(v + (PALE_RGB[i] - v) * k)).join(',')})`;

// § drawBeam: (c, beam, hero, t) with beam { id, x, y, start, arriving }. Leaving, p runs 0 → 1
// over BEAM_MS; arriving, 1 → 0. Outside that time nothing is drawn.
export function drawBeam(c, beam, hero, t) {
  if (!beam || t < beam.start || t >= beam.start + BEAM_MS) return;
  const run = (t - beam.start) / BEAM_MS, p = beam.arriving ? 1 - run : run;
  const ox = beam.x * 16, oy = beam.y * 16 - 2, cx = ox + 8, top = oy - BEAM_UP, foot = oy + 16;
  const open = clamp(p / 0.2), shut = clamp((p - 0.8) / 0.2), w = Math.round((10 - 9 * shut) * open);
  if (w > 0 && shut < 1) {
    c.globalAlpha = 0.28 * (1 - shut * 0.5); c.fillStyle = GOLD; c.fillRect(cx - w, top, w * 2, foot - top);
    const core = Math.max(1, w >> 2);
    c.globalAlpha = 0.55; c.fillStyle = PALE; c.fillRect(cx - core, top, core * 2, foot - top);
    c.globalAlpha = 0.35; c.fillStyle = GOLD; c.fillRect(cx - w - 2, foot - 1, w * 2 + 4, 1);
  }
  c.globalAlpha = 1 - clamp((p - 0.2) / 0.6);
  drawShadow(c, beam.x * 16, beam.y * 16, 8);
  for (const q of pixelsOf(personSprite(beam, hero))) {
    const t0 = 0.2 + 0.45 * (q.y / 15), k = clamp((p - t0) / 0.25);
    if (k >= 1) continue;
    c.globalAlpha = 1 - k; c.fillStyle = toward(q, clamp((p - t0 + 0.12) / 0.12));
    c.fillRect(ox + q.x + Math.round(q.drift * k * 2), oy + q.y - Math.round(k * k * BEAM_UP), 1, 1);
  }
  c.globalAlpha = 1;
  if (p > 0.15 && p < 0.85 && w > 0) { // specks rising in the beam, the same for a few frames
    let seed = Math.floor(p * 30) + 1;
    const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
    c.fillStyle = SPECK;
    for (let i = 0; i < 6; i++) c.fillRect(cx - w + Math.floor(rnd() * w * 2), top + Math.floor(rnd() * (foot - top)), 1, 1);
  }
}
