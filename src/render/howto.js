// § how to play card (D-390; after the settings card, D-389): How to play opens as a glass
// card as the bag's (D-385), from the pause card on the room and from the title on its scene
// alike, "HOW TO PLAY" at its top and the round cross that goes back. Under the heading the
// pages are tabs, Touch, Mouse, Keyboard, Bag and Bench (D-484), in two rows on a narrow card
// (upright, D-505), the open one gold with the menus' flame (D-181) and underlined; under them the page's rows, the action grey on the left and
// its ways light on the right (D-193).
import { drawText, textWidth } from './font.js';
import { drawMarker } from './menu.js';
import { cardAt, drawCard, inCard, onCross, wrapWords, PAD } from './bag.js';
import { HOWTO_PAGES, howtoRows, pageName } from '../core/howto.js';

const GREY = '#9790a4', GOLD = '#ffd66b', CORE = '#efe6cc', LINE = 'rgba(239,230,204,.16)';
const TABS_Y = 28, TABS_RULE_Y = 44, ROWS_Y = 52; // inside the card: the tabs' top, the rule under them, the first row's top
const ROW_H = 11; // from one row line's top to the next
const MARK_W = 8; // the flame and its gap, left of the open tab and of the actions
const WAYS_X = 44; // the ways' left edge from the actions'
const MIN_GAP = 10; // between two tabs on a narrow card
const TAB_ROW = 16; // from one row of tabs to the next
const tabsLeft = (card) => card.x + PAD + MARK_W;
// § tabs: each tab's left edge and top, spread across the card in one row, or, on a card
// too narrow for that (upright, D-505), in two, the second's under the first's; `down`, how much
// lower than one row's the rule under them and the page's rows go
function tabsAt(card) {
  const ws = HOWTO_PAGES.map((p) => textWidth(pageName(p))), wide = card.w - 2 * PAD - MARK_W;
  const fits = (n, from) => ws.slice(from, from + n).reduce((a, b) => a + b, 0) + (n - 1) * (MIN_GAP + MARK_W) <= wide;
  const first = fits(ws.length, 0) ? ws.length : Math.ceil(ws.length / 2), spots = [];
  const room = wide - ws.slice(0, first).reduce((a, b) => a + b, 0), gap = first > 1 ? Math.max(MIN_GAP, Math.floor(room / (first - 1))) : 0;
  let x = tabsLeft(card);
  for (let i = 0; i < first; i++) { spots.push({ x, y: card.y + TABS_Y, row: 0 }); x += ws[i] + gap; }
  for (let i = first; i < ws.length; i++) spots.push({ x: spots[i - first].x, y: card.y + TABS_Y + TAB_ROW, row: 1 }); // under the first row's

  return { spots, down: (spots.at(-1).row) * TAB_ROW };
}

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { page } for a tab (anywhere
// from halfway to the tab before to halfway to the next, between the two rules), 'close' (the
// round cross), or null; outside the card, 'out'.
export function howtoAt(x, y, vw, vh) {
  const card = cardAt(vw, vh);
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  const { spots, down } = tabsAt(card);
  if (y < card.y + TABS_Y - 8 || y >= card.y + TABS_RULE_Y + down) return null;
  const row = Math.max(0, Math.min(spots.at(-1).row, Math.floor((y - card.y - TABS_Y + 8) / TAB_ROW)));
  const inRow = spots.map((s, i) => ({ ...s, i })).filter((s) => s.row === row);
  let k = 0;
  while (k < inRow.length - 1 && x >= (inRow[k].x + textWidth(pageName(HOWTO_PAGES[inRow[k].i])) + inRow[k + 1].x) / 2) k++;
  return { page: HOWTO_PAGES[inRow[k].i] };
}

// c: the room's canvas, `vw` × `vh`; page: the open tab's id; settings: the walking switches;
// still: prefers-reduced-motion
export function drawHowTo(c, vw, vh, page, settings, t, still) {
  const card = drawCard(c, vw, vh, 'HOW TO PLAY', 0), { x, y, w } = card, { spots, down } = tabsAt(card);
  HOWTO_PAGES.forEach((p, i) => {
    const on = p === page, name = pageName(p), s = spots[i];
    drawText(c, name, s.x, s.y, on ? GOLD : GREY);
    if (!on) return;
    drawMarker(c, s.x - MARK_W, s.y + 1, t, still);
    c.fillStyle = GOLD; c.fillRect(s.x, s.y + 11, textWidth(name), 1);
  });
  c.fillStyle = LINE; c.fillRect(x + 8, y + TABS_RULE_Y + down, w - 16, 1);
  const ax = tabsLeft(card);
  let ly = y + ROWS_Y + down;
  for (const row of howtoRows(page, settings)) {
    drawText(c, row.action, ax, ly, GREY);
    for (const way of row.ways) for (const l of wrapWords(way, x + w - PAD - ax - WAYS_X)) { drawText(c, l, ax + WAYS_X, ly, CORE); ly += ROW_H; } // wrapped on a narrow card (D-505)
  }
}
