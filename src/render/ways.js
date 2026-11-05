// § way to play card (D-396; was a page over the title or the room, D-334, D-346): the ways to
// play open as a glass card as the settings card (D-389), from New journey on the title's scene
// and from Settings on the room alike, "WAY TO PLAY" at its top and the round cross that goes
// back. Each way is a row, its name and its note under it, wrapped to the card's width; the
// chosen row gold with the menus' flame (D-181). A way that can't be picked is dim (MO4, D-346).
import { drawText } from './font.js';
import { drawMarker } from './menu.js';
import { cardAt, drawCard, inCard, onCross, wrapWords, PAD } from './bag.js';

export const WAYS_TITLE = 'WAY TO PLAY';
export const TRAVEL_TITLE = 'WAYSTONES'; // the travel card (D-593)
const GREY = '#9790a4', GOLD = '#ffd66b', CORE = '#efe6cc', DIM = '#5c566a', DIM_GOLD = '#a08548';
const ROWS_Y = 30; // the first row's top inside the card
const LINE = 11; // from the name's top to its note's, and between the note's lines
const ROW_GAP = 8; // under a row's last line, before the next row's name
const MARK_W = 8; // the flame and its gap, left of each name

const WIN_Y = ROWS_Y - ROW_GAP / 2; // the list's window's top inside the card
const WIN_FOOT = 4; // under the window, inside the card

// § rows: each row's top and its note's lines, on cardAt's card, unscrolled; menu: [{ text, note }]
function rowsAt(card, menu) {
  const w = card.w - 2 * PAD - MARK_W;
  let y = card.y + ROWS_Y;
  return menu.map((line) => { const lines = wrapWords(line.note, w), at = y; y += LINE * (lines.length + 1) + ROW_GAP; return { y: at, lines }; });
}
// A row's band, from half a gap over its name to half a gap under its note
// (a tap's), and `shown`, under its note's words: the window holds rows to there
const bandOf = (r) => ({ top: r.y - ROW_GAP / 2, bottom: r.y + LINE * (r.lines.length + 1) + ROW_GAP / 2, shown: r.y + LINE * (r.lines.length + 1) });

// § window: the list scrolls inside the card when its rows don't all fit (the travel card from
// depth 12, D-594), as the version history's (D-393): the card, the window's top and height,
// and the whole list's height
export function waysLayout(vw, vh, menu) {
  const card = cardAt(vw, vh), top = card.y + WIN_Y, rows = rowsAt(card, menu);
  const room = Math.max(0, card.y + card.h - WIN_FOOT - top), all = rows.length ? bandOf(rows[rows.length - 1]).shown - top : 0;
  const step = rows.length ? bandOf(rows[0]).bottom - bandOf(rows[0]).top : 0; // the travel card's rows are all one height
  const tail = ROW_GAP / 2; // a row's band under its words
  const h = all > room && step ? Math.max(step - tail, Math.floor((room + tail) / step) * step - tail) : room; // scrolling, whole rows only
  return { card, top, h, all, rows };
}
const clamp = (s, l) => Math.max(0, Math.min(s, l.all - l.h));
// The scroll that shows row i whole, moving as little as it can (its top when it can't all fit)
export function waysScrollTo(scroll, i, vw, vh, menu) {
  const l = waysLayout(vw, vh, menu), r = l.rows[i];
  if (!r) return clamp(scroll, l);
  const b = bandOf(r), top = b.top - l.top, bottom = b.shown - l.top;
  let s = Math.max(scroll, bottom - l.h);
  if (top < s) s = top;
  return clamp(s, l);
}
// A page down (by > 0) or up, its top on a row's band; { scroll, chosen }: the flame moved to the
// top row shown when the chosen one scrolled out of the window
export function waysPage(scroll, by, chosen, vw, vh, menu) {
  const l = waysLayout(vw, vh, menu);
  const tops = l.rows.map((r) => bandOf(r).top - l.top), step = l.rows.length ? Math.max(...l.rows.map((r) => bandOf(r).bottom - bandOf(r).top)) : 0;
  let s = clamp(scroll + by * Math.max(step, l.h - step), l);
  if (s < l.all - l.h) s = by > 0 ? Math.max(...tops.filter((t) => t <= s)) : Math.min(...tops.filter((t) => t >= s));
  s = clamp(s, l);
  const whole = (i) => tops[i] >= s && bandOf(l.rows[i]).shown - l.top <= s + l.h;
  if (whole(chosen)) return { scroll: s, chosen };
  const first = tops.findIndex((t, i) => whole(i));
  return { scroll: s, chosen: first >= 0 ? first : chosen };
}
// Whether the list is longer than its window
export const waysScrolls = (vw, vh, menu) => { const l = waysLayout(vw, vh, menu); return l.all > l.h; };

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { line: i } for anywhere across
// the card level with row i or its note, 'close' (the round cross), or null; outside the card,
// 'out'. menu: the ways, each with the note it shows; scroll: the list's, in game pixels.
export function waysAt(x, y, vw, vh, menu, scroll = 0) {
  const card = cardAt(vw, vh);
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  const l = waysLayout(vw, vh, menu);
  if (y < l.top || y >= l.top + l.h) return null;
  const at = y + clamp(scroll, l);
  const i = l.rows.findIndex((r) => { const b = bandOf(r); return at >= b.top && at < b.bottom; });
  return i >= 0 ? { line: i } : null;
}

// c: the room's canvas, `vw` × `vh`; menu: [{ text, note, dim }], each with the note it shows;
// chosen: its line picked; still: prefers-reduced-motion; title: the card's name, as the travel
// card's, which shares its rows (D-593); scroll: the list's, in game pixels (D-594)
export function drawWays(c, vw, vh, menu, chosen, t, still, title = WAYS_TITLE, scroll = 0) {
  drawCard(c, vw, vh, title, 0);
  const l = waysLayout(vw, vh, menu), { card } = l, nx = card.x + PAD + MARK_W, s = clamp(scroll, l);
  c.save();
  c.beginPath(); c.rect(card.x, l.top, card.w, l.h); c.clip();
  l.rows.forEach((row, i) => {
    const y = row.y - s, b = bandOf(row);
    if (b.bottom - s <= l.top || b.top - s >= l.top + l.h) return; // out of the window
    const on = i === chosen, dim = menu[i].dim;
    drawText(c, menu[i].text, nx, y, on ? (dim ? DIM_GOLD : GOLD) : dim ? DIM : GREY);
    row.lines.forEach((text, j) => drawText(c, text, nx, y + LINE * (j + 1), dim ? DIM : CORE));
    if (on) drawMarker(c, card.x + PAD, y + 1, t, still);
  });
  c.restore();
  // § bar: where the window is in the whole list, a thin line at the card's right, as the history's
  if (l.all > l.h) {
    c.fillStyle = GREY;
    c.fillRect(card.x + card.w - PAD + 3, l.top + Math.round((s / l.all) * l.h), 1, Math.max(4, Math.round((l.h / l.all) * l.h)));
  }
}
