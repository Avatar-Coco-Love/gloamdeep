// § bag's window (D-1011, B-014): where a bag's slots don't all fit, they show through a window
// of whole rows that scrolls (scroll.js). Upright, the window ends where the chosen find's name
// and "carried" line still fit above DROP; sideways, at the card's foot. A bag that fits
// shows as before, with no bar. The thin bar stands just right of the slots, lit gold while it
// moves; a finger can drag it too. bag.js draws and picks the slots through the window it's given.
import { bagShape, bagTop, cardAt, isTall, PAD, SLOT_GAP, LINE_H } from './bag.js';

const GOLD = '#ffd66b', CORE = '#efe6cc', LINE = 'rgba(239,230,204,.16)';
const WORDS_ROOM = 12 + 10 + LINE_H + 7 + 2; // the line under the window, the words' drop, the name's row, the "carried" line and a gap above DROP
const BAR_GAP = 4; // from the slots' right edge to the bar
const BAR_W = 2;
const BAR_TAP = 4; // game px each side of the bar that still grab it
const THUMB_MIN = 8;

// The window on a view `vw` × `vh`, from the card's top: its top and height, a row's pitch, how
// far it scrolls (max, 0 when all fit) and the slots' full height
export function bagWindow(vw, vh, size) {
  const shape = bagShape(size), card = cardAt(vw, vh, shape.detail), top = bagTop(vw, vh), pitch = shape.slot + SLOT_GAP;
  const foot = isTall(vw, vh) ? card.drop.y - card.y - WORDS_ROOM : card.h - 4;
  const rows = Math.ceil(size / shape.cols), fit = Math.max(1, Math.min(rows, Math.floor((foot - top + SLOT_GAP) / pitch)));
  return { top, h: fit * pitch - SLOT_GAP, pitch, max: (rows - fit) * pitch, full: shape.h, shape, card };
}
const barX = (win) => win.card.x + PAD + win.shape.w + BAR_GAP;
const thumbH = (win) => Math.max(THUMB_MIN, Math.round(win.h * win.h / win.full));

// § where: 'grid' or 'bar' where a drag may start, or null
export function grabsAt(win, x, y) {
  if (!win.max) return null;
  const { card, top, h, shape } = win, bx = barX(win);
  if (y < card.y + top || y >= card.y + top + h) return null;
  if (x >= bx - BAR_TAP && x < bx + BAR_W + BAR_TAP) return 'bar';
  return x >= card.x + PAD && x < card.x + PAD + shape.w ? 'grid' : null;
}
// The scroll that puts the bar's thumb's middle at y
export function barTo(win, y) {
  const th = thumbH(win), room = win.h - th;
  return Math.max(0, Math.min(win.max, (y - win.card.y - win.top - th / 2) / room * win.max));
}
// Slot i's row's top and foot in the slots, for keepInView
export const rowSpan = (win, i) => { const top = Math.floor(i / win.shape.cols) * win.pitch; return [top, top + win.shape.slot]; };

// § bar: beside the slots when they scroll, `sy` the scroll, `lit` 0 to 1 (gold while it moves)
export function drawBagBar(c, win, sy = 0, lit = 0) {
  if (!win.max) return;
  const { card, top, h } = win, wy = card.y + top, bx = barX(win), th = thumbH(win);
  c.fillStyle = LINE; c.fillRect(bx, wy, BAR_W, h);
  const over = sy < 0 ? -sy : sy > win.max ? sy - win.max : 0, tw = Math.max(4, th - Math.round(over)); // pulled past an end, the thumb squeezes
  const ty = Math.round(wy + Math.max(0, Math.min(win.max, sy)) / win.max * (h - th)) + (sy > win.max ? th - tw : 0);
  c.globalAlpha = 0.45 + 0.55 * lit; c.fillStyle = lit > 0.5 ? GOLD : CORE; c.fillRect(bx, ty, BAR_W, tw); c.globalAlpha = 1;
}
