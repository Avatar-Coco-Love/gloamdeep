// § how to play card (D-390; after the settings card, D-389): How to play opens as a glass
// card as the bag's (D-385), from the pause card on the room and from the title on its scene
// alike, "HOW TO PLAY" at its top and the round cross that goes back. Under the heading the
// pages are tabs, Touch, Mouse, Keyboard and Crafting, the open one gold with the menus'
// flame (D-181) and underlined; under them the page's rows, the action grey on the left and
// its ways light on the right (D-193).
import { drawText, textWidth } from './font.js';
import { drawMarker } from './menu.js';
import { cardAt, drawCard, inCard, onCross, PAD } from './bag.js';
import { HOWTO_PAGES, howtoRows, pageName } from '../core/howto.js';

const GREY = '#9790a4', GOLD = '#ffd66b', CORE = '#efe6cc', LINE = 'rgba(239,230,204,.16)';
const TABS_Y = 28, TABS_RULE_Y = 44, ROWS_Y = 52; // inside the card: the tabs' top, the rule under them, the first row's top
const ROW_H = 11; // from one row line's top to the next
const MARK_W = 8; // the flame and its gap, left of the open tab and of the actions
const WAYS_X = 44; // the ways' left edge from the actions'
const MIN_GAP = 10; // between two tabs on a narrow card
const tabsLeft = (card) => card.x + PAD + MARK_W;
// Each tab's left edge, spread across the card
function tabXs(card) {
  const ws = HOWTO_PAGES.map((p) => textWidth(pageName(p))), room = card.w - 2 * PAD - MARK_W - ws.reduce((a, b) => a + b, 0);
  const gap = Math.max(MIN_GAP, Math.floor(room / (ws.length - 1)));
  let x = tabsLeft(card);
  return ws.map((w) => { const at = x; x += w + gap; return at; });
}

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { page } for a tab (anywhere
// from halfway to the tab before to halfway to the next, between the two rules), 'close' (the
// round cross), or null; outside the card, 'out'.
export function howtoAt(x, y, vw, vh) {
  const card = cardAt(vw, vh);
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  if (y < card.y + TABS_Y - 8 || y >= card.y + TABS_RULE_Y) return null;
  const xs = tabXs(card);
  let i = 0;
  while (i < xs.length - 1 && x >= (xs[i] + textWidth(pageName(HOWTO_PAGES[i])) + xs[i + 1]) / 2) i++;
  return { page: HOWTO_PAGES[i] };
}

// c: the room's canvas, `vw` × `vh`; page: the open tab's id; settings: the walking switches;
// still: prefers-reduced-motion
export function drawHowTo(c, vw, vh, page, settings, t, still) {
  const card = drawCard(c, vw, vh, 'HOW TO PLAY', 0), { x, y, w } = card, xs = tabXs(card);
  HOWTO_PAGES.forEach((p, i) => {
    const on = p === page, name = pageName(p);
    drawText(c, name, xs[i], y + TABS_Y, on ? GOLD : GREY);
    if (!on) return;
    drawMarker(c, xs[i] - MARK_W, y + TABS_Y + 1, t, still);
    c.fillStyle = GOLD; c.fillRect(xs[i], y + TABS_Y + 11, textWidth(name), 1);
  });
  c.fillStyle = LINE; c.fillRect(x + 8, y + TABS_RULE_Y, w - 16, 1);
  const ax = tabsLeft(card);
  let ly = y + ROWS_Y;
  for (const row of howtoRows(page, settings)) {
    drawText(c, row.action, ax, ly, GREY);
    for (const way of row.ways) { drawText(c, way, ax + WAYS_X, ly, CORE); ly += ROW_H; }
  }
}
