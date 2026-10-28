// § version history card (D-393; after the journal card, D-391): the page of every version
// (D-254) opens as a glass card as the bag's (D-385), from Settings on the room and on the
// title's scene alike, "VERSION HISTORY" at its top and the round cross that goes back. Under
// the heading one row per version, newest first: its number in ember and its title, with + to
// open it or - while open. An open version shows its date and its changelog lines, wrapped to
// the card's width, below its row. The list scrolls inside the card, a thin bar at its right.
import { drawText, textWidth } from './font.js';
import { drawMarker } from './menu.js';
import { cardAt, drawCard, inCard, onCross, PAD } from './bag.js';
import { HISTORY } from '../core/history.js';

const GOLD = '#ffd66b', GREY = '#9790a4', EMBER = '#f39a3b', CORE = '#fff5d6';
export const ROW_H = 11; // from one row's top to the next
const LIST_Y = 28; // the window's top inside the card, under the heading's rule
const MARK_W = 8; // the flame and its gap, left of the numbers
const NUM_W = Math.max(...HISTORY.map((e) => textWidth(e.v)));
const DOT_W = 5; // a line's dot and its gap, before its words

// § layout: the card on a view `vw` × `vh` game pixels, the list's window in it (whole rows
// only), and the columns: the numbers, the titles, the + or -, and an open version's lines
export function historyLayout(vw, vh) {
  const card = cardAt(vw, vh), top = card.y + LIST_Y, right = card.x + card.w - PAD;
  const numX = card.x + PAD + MARK_W, titleX = numX + NUM_W + 4, signX = right - 3, bodyX = numX + DOT_W;
  return { card, top, h: Math.max(ROW_H, Math.floor((card.h - LIST_Y - 8) / ROW_H) * ROW_H), right, numX, titleX, signX, titleW: signX - 4 - titleX, bodyX, bodyW: right - 6 - bodyX };
}

// § wrap: words into lines no wider than width; a word too wide alone is cut
export function wrap(text, width) {
  const lines = [];
  let line = '';
  for (let word of text.split(' ')) {
    while (textWidth(word) > width) { // cut it where it still fits
      let n = word.length - 1;
      while (n > 1 && textWidth(word.slice(0, n)) > width) n--;
      if (line) { lines.push(line); line = ''; }
      lines.push(word.slice(0, n)); word = word.slice(n);
    }
    const next = line ? `${line} ${word}` : word;
    if (textWidth(next) <= width) line = next;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  return lines;
}

// § rows: one per version, and for each open one its date and lines wrapped to `width`.
// Worked out when a version opens or closes or the card's width changes, never each frame
// (TECH.md); `rows.w` keeps the width they were wrapped to.
// kind: 'head', 'date', 'line' (a change's first line) or 'more'; i: its version
export function historyRows(open, width) {
  const rows = [];
  HISTORY.forEach((e, i) => {
    rows.push({ i, kind: 'head' });
    if (!open.has(e.v)) return;
    rows.push({ i, kind: 'date', text: e.date });
    for (const line of e.lines) wrap(line, width).forEach((text, j) => rows.push({ i, kind: j ? 'more' : 'line', text }));
  });
  rows.w = width;
  return rows;
}
// The row a version's own row is on, and its last row
export const headRow = (rows, i) => rows.findIndex((r) => r.i === i);
export function lastRow(rows, i) { let r = headRow(rows, i); while (rows[r + 1]?.i === i) r++; return r; }

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { row } in the window, 'close'
// (the round cross), or null; outside the card, 'out'
export function historyAt(x, y, vw, vh, scroll, count) {
  const { card, top, h } = historyLayout(vw, vh);
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  if (y < top || y >= top + h) return null;
  const row = Math.floor((y - top + scroll) / ROW_H);
  return row < count ? { row } : null;
}

// § draw: c, the room's canvas, `vw` × `vh`; chosen: a version's index; still: reduced motion
export function drawHistory(c, vw, vh, rows, open, scroll, chosen, t, still) {
  drawCard(c, vw, vh, 'VERSION HISTORY', 0);
  const { card, top, h, right, numX, titleX, signX, bodyX } = historyLayout(vw, vh);
  c.save();
  c.beginPath(); c.rect(card.x, top, card.w, h); c.clip();
  for (let r = Math.floor(scroll / ROW_H); r < rows.length; r++) {
    const y = top + r * ROW_H - scroll + 1;
    if (y >= top + h) break;
    const row = rows[r], e = HISTORY[row.i], on = row.i === chosen;
    if (row.kind === 'head') {
      drawText(c, e.v, numX, y, on ? GOLD : EMBER);
      drawText(c, e.title, titleX, y, on ? GOLD : GREY);
      drawText(c, open.has(e.v) ? '-' : '+', signX, y, on ? GOLD : GREY);
      if (on) drawMarker(c, numX - 7, y + 1, t, still);
    } else if (row.kind === 'date') drawText(c, row.text, bodyX, y, GREY);
    else {
      if (row.kind === 'line') drawText(c, '·', bodyX - 4, y, GREY);
      drawText(c, row.text, bodyX, y, CORE);
    }
  }
  c.restore();
  // § bar: where the window is in the whole list, a thin line at the card's right
  const all = rows.length * ROW_H;
  if (all > h) {
    c.fillStyle = GREY;
    c.fillRect(right + 3, top + Math.round((scroll / all) * h), 1, Math.max(4, Math.round((h / all) * h)));
  }
}
