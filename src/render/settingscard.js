// § settings card (D-389; after the pause card, D-388): Settings opens as a glass card as
// the bag's (D-385), from the pause card on the room and from the title on its scene alike,
// "SETTINGS" at its top and the round cross that goes back. Each switch is a row, its name
// grey on the left and its value light in a column on the right; the chosen row gold with
// the menus' flame (D-181). VERSION HISTORY is a button in the bottom left corner, the
// flame beside it when chosen, as Deconstruct on the workbench's card (D-387).
import { drawText, textWidth } from './font.js';
import { drawMarker } from './menu.js';
import { cardAt, drawCard, drawButton, inCard, onCross, BUTTON, PAD, TAP_PAD } from './bag.js';

const GREY = '#9790a4', GOLD = '#ffd66b', CORE = '#efe6cc';
const ROWS_Y = 30, ROW_STEP = 16; // the first row's top inside the card, and from one row's top to the next
const MARK_W = 8; // the flame and its gap, left of each name
const VALUE_GAP = 20; // between the longest name and the values' column
export const HISTORY = 'VERSION HISTORY';
export const HISTORY_W = textWidth(HISTORY) + 8;
const historyAt = (card) => ({ x: card.x + PAD, y: card.button.y });
// From one row's top to the next: ROW_STEP, closer on a short card so the last stays above the button
const rowStep = (card, rows) => Math.min(ROW_STEP, Math.floor((card.button.y - 6 - card.y - ROWS_Y) / Math.max(1, rows)));

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { line: i } for anywhere across
// the card level with row i, 'history' (the button), 'close' (the round cross), or null; outside
// the card, 'out'. menu: settingsMenu (core/menu.js), Version history last.
export function settingsCardAt(x, y, vw, vh, menu) {
  const card = cardAt(vw, vh), h = historyAt(card), rows = menu.length - 1, step = rowStep(card, rows);
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  if (y >= h.y - TAP_PAD && y < h.y + BUTTON.h + TAP_PAD && x >= h.x - TAP_PAD && x < h.x + HISTORY_W + TAP_PAD) return 'history';
  const i = Math.floor((y - card.y - ROWS_Y + (step - 9) / 2) / step);
  return i >= 0 && i < rows ? { line: i } : null;
}

// c: the room's canvas, `vw` × `vh`; menu: settingsMenu, each switch's { name, value },
// Version history last; chosen: its line picked; still: prefers-reduced-motion
export function drawSettingsCard(c, vw, vh, menu, chosen, t, still) {
  const card = drawCard(c, vw, vh, 'SETTINGS', 0), { x, y } = card, h = historyAt(card);
  const rows = menu.slice(0, -1), step = rowStep(card, rows.length);
  const nx = x + PAD + MARK_W, vx = nx + Math.max(...rows.map((l) => textWidth(l.name))) + VALUE_GAP;
  rows.forEach((line, i) => {
    const ly = y + ROWS_Y + i * step, on = i === chosen;
    drawText(c, line.name, nx, ly, on ? GOLD : GREY);
    drawText(c, line.value, vx, ly, on ? GOLD : CORE);
    if (on) drawMarker(c, x + PAD, ly + 1, t, still);
  });
  drawButton(c, h.x, h.y, HISTORY, false, HISTORY_W);
  if (chosen === rows.length) drawMarker(c, h.x - 7, h.y + 4, t, still);
}
