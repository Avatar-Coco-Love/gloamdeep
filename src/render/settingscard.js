// § settings card (D-389; after the pause card, D-388): Settings opens as a glass card as
// the bag's (D-385), from the pause card on the room and from the title on its scene alike,
// "SETTINGS" at its top and the round cross that goes back. Each switch is a row, its name
// grey on the left and its value light in a column on the right; the chosen row gold with
// the menus' flame (D-181). VERSION HISTORY is a button in the bottom left corner, the
// flame beside it when chosen, as Deconstruct on the workbench's card (D-387).
import { drawText, textWidth } from './font.js';
import { drawMarker } from './menu.js';
import { cardAt, drawCard, drawButton, inCard, onCross, wrapWords, BUTTON, PAD, TAP_PAD } from './bag.js';

const GREY = '#9790a4', GOLD = '#ffd66b', CORE = '#efe6cc';
const ROWS_Y = 30, ROW_STEP = 16; // the first row's top inside the card, and from one row's top to the next
const MARK_W = 8; // the flame and its gap, left of each name
const VALUE_GAP = 20; // between the longest name and the values' column
export const HISTORY = 'VERSION HISTORY';
export const HISTORY_W = textWidth(HISTORY) + 8;
const historyAt = (card) => ({ x: card.x + PAD, y: card.button.y });
// From one line's top to the next: ROW_STEP, closer on a short card so the last stays above the button
const rowStep = (card, lines) => Math.min(ROW_STEP, Math.floor((card.button.y - 6 - card.y - ROWS_Y) / Math.max(1, lines)));
// § rows: each switch's name's left, its value's left, and its value's lines: one, or, on a
// card too narrow for it (upright, D-505), wrapped under each other, the next row below them;
// each row's top and its lines' step
function layout(card, rows) {
  const nx = card.x + PAD + MARK_W, vx = nx + Math.max(...rows.map((l) => textWidth(l.name))) + VALUE_GAP;
  const values = rows.map((l) => wrapWords(String(l.value), card.x + card.w - PAD - vx));
  const step = rowStep(card, values.reduce((n, v) => n + v.length, 0));
  let top = card.y + ROWS_Y;
  const tops = values.map((v) => { const at = top; top += v.length * step; return at; });
  return { nx, vx, values, tops, step };
}

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { line: i } for anywhere across
// the card level with row i, 'history' (the button), 'close' (the round cross), or null; outside
// the card, 'out'. menu: settingsMenu (core/menu.js), Version history last.
export function settingsCardAt(x, y, vw, vh, menu) {
  const card = cardAt(vw, vh), h = historyAt(card), { tops, values, step } = layout(card, menu.slice(0, -1));
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  if (y >= h.y - TAP_PAD && y < h.y + BUTTON.h + TAP_PAD && x >= h.x - TAP_PAD && x < h.x + HISTORY_W + TAP_PAD) return 'history';
  const half = (step - 9) / 2, i = tops.findIndex((top, j) => y >= top - half && y < top - half + values[j].length * step);
  return i >= 0 ? { line: i } : null;
}

// c: the room's canvas, `vw` × `vh`; menu: settingsMenu, each switch's { name, value },
// Version history last; chosen: its line picked; still: prefers-reduced-motion
export function drawSettingsCard(c, vw, vh, menu, chosen, t, still) {
  const card = drawCard(c, vw, vh, 'SETTINGS', 0), { x, y } = card, h = historyAt(card);
  const rows = menu.slice(0, -1), { nx, vx, values, tops, step } = layout(card, rows);
  rows.forEach((line, i) => {
    const ly = tops[i], on = i === chosen;
    drawText(c, line.name, nx, ly, on ? GOLD : GREY);
    values[i].forEach((v, k) => drawText(c, v, vx, ly + k * step, on ? GOLD : CORE));
    if (on) drawMarker(c, x + PAD, ly + 1, t, still);
  });
  drawButton(c, h.x, h.y, HISTORY, false, HISTORY_W);
  if (chosen === rows.length) drawMarker(c, h.x - 7, h.y + 4, t, still);
}
