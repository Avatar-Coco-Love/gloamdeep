// § echo (D-805): with the Echo Charm worn, each echoed creature (core/echo.js) is drawn after the
// light as a pale outline of its shape over the dark: its sprite, as drawEnemy draws it, on a small
// canvas of its own, and every clear pixel beside one of its pixels filled pale. It pulses slowly,
// steady with reduced motion. Nothing inside the outline is drawn, so it reads as an echo, not the
// creature in the light.
import { drawEnemy } from './sprites.js';

const PAD = { x: 4, y: 8 }, W = 16 + 2 * PAD.x, H = 16 + PAD.y + 4; // room for a flyer's lift
const PALE = [200, 214, 232]; // a pale cold grey-blue, between the palette's S and w
let work = null;
const canvas = () => work ??= Object.assign(document.createElement('canvas'), { width: W, height: H });

// (c, enemies, t, still, at) → draws each echoed creature's outline; at: (enemy) → its shown tile
export function drawEchoes(c, enemies, t, still, at = (e) => e) {
  if (!enemies.length) return;
  const w = canvas(), wc = w.getContext('2d', { willReadFrequently: true });
  const a = still ? 0.7 : 0.55 + 0.25 * Math.sin(t / 1000 * Math.PI); // a 2 s swell
  for (const e of enemies) {
    const p = at(e);
    wc.clearRect(0, 0, W, H);
    wc.save(); wc.translate(PAD.x - Math.round(p.x * 16), PAD.y - Math.round(p.y * 16));
    drawEnemy(wc, e, p, t, true, false, null);
    wc.restore();
    const src = wc.getImageData(0, 0, W, H), out = wc.createImageData(W, H), on = (x, y) => x >= 0 && y >= 0 && x < W && y < H && src.data[(y * W + x) * 4 + 3] > 200;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (on(x, y) || !(on(x - 1, y) || on(x + 1, y) || on(x, y - 1) || on(x, y + 1))) continue;
      const i = (y * W + x) * 4; out.data[i] = PALE[0]; out.data[i + 1] = PALE[1]; out.data[i + 2] = PALE[2]; out.data[i + 3] = 255;
    }
    wc.putImageData(out, 0, 0);
    c.save(); c.globalAlpha = a;
    c.drawImage(w, Math.round(p.x * 16) - PAD.x, Math.round(p.y * 16) - PAD.y);
    c.restore();
  }
}
