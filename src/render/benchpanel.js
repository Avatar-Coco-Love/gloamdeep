// § bench panel (WB3, D-323): bumping a set-down workbench dims the room behind
// the pause menu's veil, with a box in the middle of the picture: "WORKBENCH" in
// ember at its top, then its lines, the chosen one gold with the menus' flame.
// A thing made at the bench has its cost on the right; with too few it is dim (CH1, D-326).
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { veil, drawMarker, lineAt, LINE_GAP } from './menu.js';

const K = '#0e0c16', LINE = '#2a2636', EMBER = '#f39a3b', GOLD = '#ffd66b', GREY = '#9790a4';
const DIM = '#5c566a', DIM_GOLD = '#a08548', COST = '#6f6880';
const HEADING = 'WORKBENCH', PAD_X = 14, HEAD_GAP = 14, COST_GAP = 12;
const lineWidth = (l) => textWidth(l.text) + (l.cost ? COST_GAP + textWidth(l.cost) : 0);
// The box around `menu`'s lines and the heading, in the middle of the picture
function box(menu) {
  const w = Math.max(...menu.map(lineWidth)) + 2 * PAD_X;
  const h = 6 + HEAD_GAP + (menu.length - 1) * LINE_GAP + FONT_H + 3;
  return { x: Math.floor((W - w) / 2), y: Math.floor((SCREEN_H - h) / 2), w, h };
}
const linesTop = (b) => b.y + 6 + HEAD_GAP;

// What a tap at x, y picks: a line's index, -1 inside the box off the lines, or 'out'
export function benchAt(menu, x, y) {
  const b = box(menu);
  if (x < b.x || x >= b.x + b.w || y < b.y || y >= b.y + b.h) return 'out';
  return lineAt(y, menu.length, linesTop(b));
}

export function drawBenchPanel(c, menu, chosen, t, still) {
  veil(c);
  const b = box(menu);
  c.fillStyle = K; c.fillRect(b.x, b.y, b.w, b.h);
  c.fillStyle = LINE;
  c.fillRect(b.x, b.y, b.w, 1); c.fillRect(b.x, b.y + b.h - 1, b.w, 1);
  c.fillRect(b.x, b.y, 1, b.h); c.fillRect(b.x + b.w - 1, b.y, 1, b.h);
  drawText(c, HEADING, Math.floor((W - textWidth(HEADING)) / 2), b.y + 6, EMBER);
  menu.forEach((l, i) => {
    const x = b.x + PAD_X, y = linesTop(b) + i * LINE_GAP, on = i === chosen;
    drawText(c, l.text, x, y, on ? (l.dim ? DIM_GOLD : GOLD) : l.dim ? DIM : GREY);
    if (l.cost) drawText(c, l.cost, b.x + b.w - PAD_X - textWidth(l.cost), y, l.dim ? DIM : COST);
    if (on) drawMarker(c, x - 7, y + 1, t, still);
  });
}
