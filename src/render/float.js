// § float: the line's float on the water while it waits, and the bite's "!" (look A of each in
// the fishing step 2 mock-up, D-610), and the nibble's shake (look A, D-613), in room pixels.
// Drawing only; `float` is state.float.
import { drawAlert } from './walk.js';

const FLOAT = ['.k.', 'krk', 'kwk', '.k.'], RIPPLE = '#8aa2cc', BOB_MS = 2000;
// The nibble's shake: once each SHAKE_MS, a pixel left, right, left, each for JERK_MS
const SHAKE_MS = 1200, JERK_MS = 80, JERKS = [-1, 1, -1];
const COLOURS = { k: '#0e0c16', r: '#d8483c', w: '#efe6cc' };

// The small bob, red over white, a ripple line under it, in the middle of its tile. It bobs
// 1 pixel every 2 seconds, still with reduced motion; with a bite it dips 2 pixels. With a
// nibble it stops bobbing and shakes; with reduced motion it holds a pixel to the left.
export const shakeAt = (t, still) => (still ? JERKS[0] : JERKS[Math.floor((t % SHAKE_MS) / JERK_MS)] ?? 0);
export function drawFloat(c, float, t, still) {
  if (!float) return;
  const x = float.x * 16 + 6 + (float.nibble ? shakeAt(t, still) : 0);
  const dip = float.bite ? 2 : still || float.nibble ? 0 : Math.floor(t / BOB_MS) % 2, y = float.y * 16 + 5 + dip;
  c.fillStyle = RIPPLE;
  c.fillRect(x - 1, float.y * 16 + 9, 5, 1);
  FLOAT.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch === '.') return;
    c.fillStyle = COLOURS[ch];
    c.fillRect(x + i, y + j, 1, 1);
  }));
}

// The hero's own amber "!" (walk.js) over the float while a fish is on the line, over the light
export function drawBite(c, float) {
  if (float?.bite) drawAlert(c, float.x * 16, float.y * 16 + 6);
}
