// § hud: the hearts, oil, depth and level on a glass panel over the room's
// top left (D-378, was a strip or column beside the room, D-198, D-199), and
// the buttons' icons.
import { drawText, textWidth } from './font.js';
import { SPRITES } from './sprites.js';

// § panel: hearts with the level at the right, the oil bar under them, then
// the depth, as in the D-378 mock-up. Drawn in game pixels: a see-through
// night fill and a soft light edge, its corner pixels left out so it looks
// round (pixel glass, D-380). `alpha` fades it while the hero is under it.
// Gives the panel's { w, h }, for the creature list under it (D-357).
const PAD = 3, LINE = 7, GAP_Y = 3;
const GLASS = 'rgba(14,12,22,.6)', GLASS_EDGE = 'rgba(239,230,204,.28)';
export function drawStatus(c, { oil, health, max, depth, level }, x, y, alpha = 1) {
  const lv = `LV ${level}`, where = depth === 0 ? 'SURFACE' : `DEPTH ${depth}`; // SURFACE until places have names (D-209)
  const top = Math.max(heartsH(max), LINE), w = 2 * PAD + Math.max(heartsW(max) + 4 + textWidth(lv), BAR_W, textWidth(where));
  const h = 2 * PAD + top + GAP_Y + SEG_H + GAP_Y + LINE;
  c.save();
  c.globalAlpha = alpha;
  drawGlass(c, x, y, w, h);
  drawHearts(c, health, max, x + PAD, y + PAD + (top > LINE ? 0 : 1));
  drawText(c, lv, x + w - PAD - textWidth(lv), y + PAD, '#9790a4'); // the study's --muted
  drawOilBar(c, oil, x + PAD, y + PAD + top + GAP_Y);
  drawText(c, where, x + PAD, y + PAD + top + GAP_Y + SEG_H + GAP_Y, '#9790a4');
  c.restore();
  return { w, h };
}

// § glass: the see-through night fill and its soft light edge, corners left out;
// the panel's, and the text line's at the bottom (D-381)
export function drawGlass(c, x, y, w, h) {
  c.fillStyle = GLASS; c.fillRect(x + 1, y + 1, w - 2, h - 2);
  c.fillStyle = GLASS_EDGE;
  c.fillRect(x + 1, y, w - 2, 1); c.fillRect(x + 1, y + h - 1, w - 2, 1);
  c.fillRect(x, y + 1, 1, h - 2); c.fillRect(x + w - 1, y + 1, 1, h - 2);
}

// § oil bar: style study 1's 10 amber segments (study lines 37–40, 522). A
// segment is lit while the oil is above its share, as in the study.
const SEG_W = 3, SEG_H = 4, GAP = 1, SEGS = 10, BAR_W = SEGS * SEG_W + (SEGS - 1) * GAP;
function drawOilBar(c, oil, bx, by) {
  for (let i = 0; i < SEGS; i++) {
    const x = bx + i * (SEG_W + GAP);
    if (oil > i / SEGS + 0.001) {
      c.fillStyle = '#ffc65c'; c.fillRect(x, by, SEG_W, SEG_H - 1); // --amber
      c.fillStyle = '#a8642c'; c.fillRect(x, by + SEG_H - 1, SEG_W, 1); // --amber-deep, its lower edge
    } else {
      c.fillStyle = '#2a2636'; c.fillRect(x, by, SEG_W, SEG_H);
    }
  }
}

// § hearts: the hero's health as small pixel hearts (D-116). A full heart is
// the hostile red with the study's deeper red (PAL p, R) under it; an empty
// one is an empty oil segment's colour. Past 5, hearts bought (D-293) fill a
// second row below, up to 10.
const HEART = ['.x.x.', 'xxxxx', '.xxx.', '..x..'], HEART_W = 5, ROW_HEARTS = 5;
const heartsW = (max) => Math.min(max, ROW_HEARTS) * HEART_W + (Math.min(max, ROW_HEARTS) - 1) * GAP;
const heartsH = (max) => Math.ceil(max / ROW_HEARTS) * (HEART.length + GAP) - GAP;
function drawHearts(c, health, max, bx, by) {
  for (let i = 0; i < max; i++) {
    const x0 = bx + (i % ROW_HEARTS) * (HEART_W + GAP), y0 = by + Math.floor(i / ROW_HEARTS) * (HEART.length + GAP), full = i < health;
    HEART.forEach((row, y) => [...row].forEach((ch, x) => {
      if (ch !== 'x') return;
      const low = y === HEART.length - 1 || HEART[y + 1][x] !== 'x'; // the heart's lower edge
      c.fillStyle = !full ? '#2a2636' : low ? '#c4473a' : '#e8786a';
      c.fillRect(x0 + x, y0 + y, 1, 1);
    }));
  }
}

// § lantern icon: the hero's lantern pixels (sprites.js) for the switch button,
// a 5 × 5 map. The flame is lit, or the empty oil segments' colour when off (D-080).
// Lit, it is the home-screen icon too (render/appicon.js, D-375).
export const LANTERN_ICON = ['..k..', '.kak.', 'kywyk', 'kYyYk', '.kOk.'];
export const LANTERN_ON = { k: '#9790a4', a: '#e8d5a0', y: '#ffd66b', w: '#efe6cc', Y: '#f39a3b', O: '#a8642c' };
const OFF = { ...LANTERN_ON, a: '#3a3446', y: '#2a2636', w: '#2a2636', Y: '#2a2636', O: '#3a3446' };
export function drawLanternIcon(c, lit) {
  const pal = lit ? LANTERN_ON : OFF;
  c.clearRect(0, 0, 5, 5);
  LANTERN_ICON.forEach((row, y) => [...row].forEach((ch, x) => {
    if (pal[ch]) { c.fillStyle = pal[ch]; c.fillRect(x, y, 1, 1); }
  }));
}

// § pause icon: two bars in the lantern icon's stone grey, a 5 × 5 map (D-187)
export function drawPauseIcon(c) {
  c.clearRect(0, 0, 5, 5);
  c.fillStyle = '#9790a4'; c.fillRect(1, 0, 1, 5); c.fillRect(3, 0, 1, 5);
}

// § map icon: three rooms in an L, like a floor of the grid, in the stone grey (D-205)
const MAP_ICON = ['xx.xx', 'xx.xx', '.....', 'xx...', 'xx...'];
export function drawMapIcon(c) {
  c.clearRect(0, 0, 5, 5);
  c.fillStyle = '#9790a4';
  MAP_ICON.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === 'x') c.fillRect(x, y, 1, 1); }));
}

// § close icon: the map button while the map is open, a cross in the same grey (D-205)
export function drawCloseIcon(c) {
  c.clearRect(0, 0, 5, 5);
  c.fillStyle = '#9790a4';
  for (let i = 0; i < 5; i++) { c.fillRect(i, i, 1, 1); c.fillRect(4 - i, i, 1, 1); }
}

// § bag icon: a pouch tied at the neck, in the same grey (D-247)
const BAG_ICON = ['.x.x.', '..x..', '.xxx.', 'xxxxx', '.xxx.'];
export function drawBagIcon(c) {
  c.clearRect(0, 0, 5, 5);
  c.fillStyle = '#9790a4';
  BAG_ICON.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === 'x') c.fillRect(x, y, 1, 1); }));
}

// § flask slot icon: the quick slot (D-384), the bag's flask sprite with how
// many are carried at its lower right, light on a dark rim; dim with none.
// A 20 × 16 map.
export function drawFlaskSlot(c, n) {
  c.clearRect(0, 0, 20, 16);
  c.globalAlpha = n ? 1 : 0.35; c.drawImage(SPRITES.flask, -2, 0); c.globalAlpha = 1;
  if (!n) return;
  const text = String(n), x = 20 - textWidth(text) - 1, y = 7;
  for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) drawText(c, text, x + dx, y + dy, '#0e0c16');
  drawText(c, text, x, y, '#efe6cc');
}
