// § way to play card (D-396; was a page over the title or the room, D-334, D-346): the ways to
// play open as a glass card as the settings card (D-389), from New journey on the title's scene
// and from Settings on the room alike, "WAY TO PLAY" at its top and the round cross that goes
// back. Each way is a row, its name and its note under it, wrapped to the card's width; the
// chosen row gold with the menus' flame (D-181). A way that can't be picked is dim (MO4, D-346).
import { drawText } from './font.js';
import { drawMarker } from './menu.js';
import { cardAt, drawCard, inCard, onCross, wrapWords, PAD } from './bag.js';

export const WAYS_TITLE = 'WAY TO PLAY';
const GREY = '#9790a4', GOLD = '#ffd66b', CORE = '#efe6cc', DIM = '#5c566a', DIM_GOLD = '#a08548';
const ROWS_Y = 30; // the first row's top inside the card
const LINE = 11; // from the name's top to its note's, and between the note's lines
const ROW_GAP = 8; // under a row's last line, before the next row's name
const MARK_W = 8; // the flame and its gap, left of each name

// Each row's top and its note's lines, on cardAt's card; menu: [{ text, note }]
function rowsAt(card, menu) {
  const w = card.w - 2 * PAD - MARK_W;
  let y = card.y + ROWS_Y;
  return menu.map((line) => { const lines = wrapWords(line.note, w), at = y; y += LINE * (lines.length + 1) + ROW_GAP; return { y: at, lines }; });
}

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { line: i } for anywhere across
// the card level with row i or its note, 'close' (the round cross), or null; outside the card,
// 'out'. menu: the ways, each with the note it shows.
export function waysAt(x, y, vw, vh, menu) {
  const card = cardAt(vw, vh);
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  const rows = rowsAt(card, menu), half = ROW_GAP / 2;
  const i = rows.findIndex((r) => y >= r.y - half && y < r.y + LINE * (r.lines.length + 1) + half);
  return i >= 0 ? { line: i } : null;
}

// c: the room's canvas, `vw` × `vh`; menu: [{ text, note, dim }], each with the note it shows;
// chosen: its line picked; still: prefers-reduced-motion
export function drawWays(c, vw, vh, menu, chosen, t, still) {
  const card = drawCard(c, vw, vh, WAYS_TITLE, 0), nx = card.x + PAD + MARK_W;
  rowsAt(card, menu).forEach((row, i) => {
    const on = i === chosen, dim = menu[i].dim;
    drawText(c, menu[i].text, nx, row.y, on ? (dim ? DIM_GOLD : GOLD) : dim ? DIM : GREY);
    row.lines.forEach((text, j) => drawText(c, text, nx, row.y + LINE * (j + 1), dim ? DIM : CORE));
    if (on) drawMarker(c, card.x + PAD, row.y + 1, t, still);
  });
}
