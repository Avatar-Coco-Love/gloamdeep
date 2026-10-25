// § framed creature (D-357, CL2): the creature whose plaque was tapped, as in
// look A of the CL2 mock-up: amber corners round its tile, its next-move
// arrow (moves.js), and a small dark tag above it with its name and hearts,
// below it when the room's top is too near. Drawn in room pixels.
import { drawText, textWidth } from './font.js';
import { drawMoves } from './moves.js';
import { W } from './screen.js';
import { get } from '../core/registry.js';

const AMBER = '#ffc65c', DARK = '#0e0c16', EDGE = '#2a2636', WORDS = '#c9c2d6';
const CORNER = 4, BOX = 18; // each corner's arm, and the square they mark: the tile and a pixel round it
const HEART = ['.x.x.', 'xxxxx', '.xxx.', '..x..'], HEART_W = 5, TAG_H = 11;

function drawCorners(c, x, y) {
  c.fillStyle = AMBER;
  for (const [cx, sx] of [[x, 1], [x + BOX - 1, -1]]) {
    for (const [cy, sy] of [[y, 1], [y + BOX - 1, -1]]) {
      c.fillRect(sx > 0 ? cx : cx - CORNER + 1, cy, CORNER, 1);
      c.fillRect(cx, sy > 0 ? cy : cy - CORNER + 1, 1, CORNER);
    }
  }
}
// A heart as the strip draws it (hud.js): full in the hostile red over its deeper red, else empty
function drawHeart(c, x0, y0, full) {
  HEART.forEach((row, y) => [...row].forEach((ch, x) => {
    if (ch !== 'x') return;
    const low = y === HEART.length - 1 || HEART[y + 1][x] !== 'x';
    c.fillStyle = !full ? EDGE : low ? '#c4473a' : '#e8786a';
    c.fillRect(x0 + x, y0 + y, 1, 1);
  }));
}
// The name then a heart for each point of health, in a box like the strip's
function drawTag(c, name, health, max, cx, y, left, right) {
  const tw = textWidth(name), w = 3 + tw + 3 + max * (HEART_W + 1) - 1 + 3;
  const x = Math.max(left, Math.min(right - w, Math.round(cx - w / 2)));
  c.fillStyle = EDGE; c.fillRect(x, y, w, TAG_H);
  c.fillStyle = DARK; c.fillRect(x + 1, y + 1, w - 2, TAG_H - 2);
  drawText(c, name, x + 3, y + 2, WORDS);
  for (let i = 0; i < max; i++) drawHeart(c, x + 3 + tw + 3 + i * (HEART_W + 1), y + 4, i < health);
}

// `entry` from creatureList ({ e, move }); `p` where e is shown, in tiles; `cam` the camera
export function drawFramed(c, { e, move }, p, cam, t, still) {
  const x = Math.round(p.x * 16), y = Math.round(p.y * 16) - 2; // sprites sit 2 up
  drawCorners(c, x - 1, y - 1);
  if (move) drawMoves(c, [move], () => p, t, still);
  const def = get(e.id), max = def.health, top = y - 3 - TAG_H;
  drawTag(c, def.name, e.health ?? max, max, x + 8, top >= cam.y ? top : y + BOX + 1, cam.x + 1, cam.x + W - 1);
}
