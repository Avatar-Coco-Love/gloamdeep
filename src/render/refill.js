// § refill (D-902, D-908): hearts or oil now and after, under an item's rows on the bag card
// (look A): "Now" over "After", each row the HUD's own hearts (hearts.js) and oil bar, twice as
// big. In "After" the hearts or segments it adds are pale, and what would pass the top is drawn
// faint past the end. A minnow's hearts and oil sit side by side, or one under the other when
// side by side won't fit the card.
import { drawText, textWidth } from './font.js';
import { drawHearts, HEART, HEART_W, ROW_HEARTS } from './hearts.js';
import { SEG_W, SEG_GAP, SEGS } from './panelsize.js';

const GREY = '#9790a4', Z = 2, GAP = 4, LABEL_GAP = 6, ROW_GAP = 4, PIECE_GAP = 4; // GAP: between pieces, at 1x
const LABELS = ['Now', 'After'];
const labelW = () => Math.max(...LABELS.map(textWidth)) + LABEL_GAP;
const lit = (oil, i) => oil > i / SEGS + 0.001; // as the HUD's oil bar lights a segment
const lostSegs = (r) => { let n = 0; while (lit(r.after + r.lost, SEGS + n)) n++; return n; };
const shown = (r) => Math.max(r.max, r.now, r.after); // the hearts drawn, rows of 5 as on the HUD
const lostFrom = (r) => (shown(r) - 1) % ROW_HEARTS + 1; // the faint ones run on along the last row
// a piece's size at 1x
function pieceW(r) {
  if (r.kind === 'oil') return (SEGS + lostSegs(r)) * (SEG_W + SEG_GAP) - SEG_GAP;
  return Math.max(Math.min(shown(r), ROW_HEARTS), lostFrom(r) + r.lost) * (HEART_W + 1) - 1;
}
function pieceH(r) { return r.kind === 'oil' ? 4 : Math.ceil(shown(r) / ROW_HEARTS) * (HEART.length + 1) - 1; }
const side = (rows) => labelW() + Z * (rows.reduce((w, r) => w + pieceW(r), 0) + GAP * (rows.length - 1));
const stacked = (rows, w) => side(rows) > w; // one under the other when side by side won't fit `w`
const rowH = (rows, w) => Z * (stacked(rows, w) ? rows.reduce((h, r) => h + pieceH(r), 0) + PIECE_GAP * (rows.length - 1) : Math.max(...rows.map(pieceH)));
// The picture's height and width in `w`; 0 for none
export const refillH = (rows, w) => (rows.length ? 2 * Math.max(rowH(rows, w), 9) + ROW_GAP : 0);
export const refillW = (rows, w) => (!rows.length ? 0 : stacked(rows, w) ? labelW() + Z * Math.max(...rows.map(pieceW)) : side(rows));
function pale(c, x0, y0, top, low) {
  HEART.forEach((row, y) => [...row].forEach((ch, x) => {
    if (ch !== 'x') return;
    c.fillStyle = y === HEART.length - 1 || HEART[y + 1][x] !== 'x' ? low : top; c.fillRect(x0 + x, y0 + y, 1, 1);
  }));
}
const heartAt = (i) => [(i % ROW_HEARTS) * (HEART_W + 1), Math.floor(i / ROW_HEARTS) * (HEART.length + 1)];
// one piece at 1x from 0, 0: `after` false for the "Now" row
function piece(c, r, after) {
  if (r.kind === 'hearts') {
    drawHearts(c, after ? r.after : r.now, r.max, 0, 0);
    if (!after) return;
    for (let i = r.now; i < r.after; i++) pale(c, ...heartAt(i), '#efe6cc', '#b8ad90');
    const y = heartAt(shown(r) - 1)[1];
    for (let i = 0; i < r.lost; i++) pale(c, (lostFrom(r) + i) * (HEART_W + 1), y, 'rgba(232,120,106,.3)', 'rgba(196,71,58,.3)');
    return;
  }
  const oil = after ? r.after : r.now, extra = after ? lostSegs(r) : 0;
  for (let i = 0; i < SEGS + extra; i++) {
    const x = i * (SEG_W + SEG_GAP);
    if (i >= SEGS) { c.fillStyle = 'rgba(255,198,92,.28)'; c.fillRect(x, 0, SEG_W, 4); continue; }
    if (!lit(oil, i)) { c.fillStyle = '#2a2636'; c.fillRect(x, 0, SEG_W, 4); continue; }
    const fresh = after && !lit(r.now, i); // added by this one, pale
    c.fillStyle = fresh ? '#efe6cc' : '#ffc65c'; c.fillRect(x, 0, SEG_W, 3);
    c.fillStyle = fresh ? '#b8ad90' : '#a8642c'; c.fillRect(x, 3, SEG_W, 1);
  }
}
// rows: refills' (core/numbers.js), drawn from x, y in `w`; gives the height used
export function drawRefill(c, rows, x, y, w) {
  const h = Math.max(rowH(rows, w), 9), down = stacked(rows, w), px = x + labelW();
  LABELS.forEach((label, j) => {
    const ry = y + j * (h + ROW_GAP);
    drawText(c, label, x, ry + Math.floor((h - 7) / 2), GREY);
    let ox = 0, oy = 0;
    for (const r of rows) {
      c.save(); c.translate(px + Z * ox, ry + Z * oy); c.scale(Z, Z); piece(c, r, j === 1); c.restore();
      if (down) oy += pieceH(r) + PIECE_GAP; else ox += pieceW(r) + GAP;
    }
  });
  return refillH(rows, w);
}
