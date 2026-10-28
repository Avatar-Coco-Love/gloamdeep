// § journal card (D-391; after the how to play card, D-390): the Journal (D-262, D-270) opens
// as a glass card as the bag's (D-385), from the pause card on the room and from the title on
// its scene alike, "JOURNAL" at its top and the round cross that goes back. Under the heading
// its tabs, Records and Growth (D-293), the open one gold with the menus' flame (D-181) and
// underlined; under them the tab's rows, each name grey on the left and its value light in a
// column on the right. Growth has ADD A HEART as a button in the bottom right corner, as Make
// on the bag's card, its cost grey beside it, dim while no ember can buy one.
import { drawText, textWidth } from './font.js';
import { drawMarker } from './menu.js';
import { cardAt, drawCard, drawButton, inCard, onCross, BUTTON, PAD, TAP_PAD } from './bag.js';
import { TABS, recordRows, growthRows, ADD_HEART } from '../core/journal.js';
import { canAddHeart } from '../core/growth.js';

const GREY = '#9790a4', GOLD = '#ffd66b', CORE = '#efe6cc', LINE = 'rgba(239,230,204,.16)';
const TABS_Y = 28, TABS_RULE_Y = 44; // inside the card: the tabs' top and the rule under them
const ROWS_Y = 52, ROW_H = 11; // Records' first row's top, and from one row's top to the next
const GROWTH_Y = 54, GROWTH_H = 16; // Growth's two rows, spaced wider
const MARK_W = 8; // the flame and its gap, left of the open tab and of the names
const TAB_GAP = 24; // between two tabs
const VALUE_GAP = 20; // between the longest name and the values' column
const COST_GAP = 8; // between the cost and the button
export const HEART = ADD_HEART.text.toUpperCase();
export const HEART_W = textWidth(HEART) + 8;
const tabsLeft = (card) => card.x + PAD + MARK_W;
// Each tab's left edge, in a row from the left
function tabXs(card) {
  let x = tabsLeft(card);
  return TABS.map((tab) => { const at = x; x += textWidth(tab.text) + TAB_GAP; return at; });
}
const heartAt = (card) => ({ x: card.x + card.w - PAD - HEART_W, y: card.button.y });

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { tab } for a tab (anywhere from
// halfway to the tab before to halfway to the next, between the two rules), 'heart' (the button,
// on Growth), 'close' (the round cross), or null; outside the card, 'out'. tab: the one open.
export function journalAt(x, y, vw, vh, tab = 'records') {
  const card = cardAt(vw, vh), h = heartAt(card);
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  if (tab === 'growth' && y >= h.y - TAP_PAD && y < h.y + BUTTON.h + TAP_PAD && x >= h.x - TAP_PAD && x < h.x + HEART_W + TAP_PAD) return 'heart';
  if (y < card.y + TABS_Y - 8 || y >= card.y + TABS_RULE_Y) return null;
  const xs = tabXs(card);
  let i = 0;
  while (i < xs.length - 1 && x >= (xs[i] + textWidth(TABS[i].text) + xs[i + 1]) / 2) i++;
  return { tab: TABS[i].id };
}

// c: the room's canvas, `vw` × `vh`; records and played, the profile's; state, the journey's;
// tab, the one open; still: prefers-reduced-motion
export function drawJournal(c, vw, vh, records, played, state, tab, t, still) {
  const card = drawCard(c, vw, vh, 'JOURNAL', 0), { x, y, w } = card, xs = tabXs(card);
  TABS.forEach((s, i) => {
    const on = s.id === tab;
    drawText(c, s.text, xs[i], y + TABS_Y, on ? GOLD : GREY);
    if (!on) return;
    drawMarker(c, xs[i] - MARK_W, y + TABS_Y + 1, t, still);
    c.fillStyle = GOLD; c.fillRect(xs[i], y + TABS_Y + 11, textWidth(s.text), 1);
  });
  c.fillStyle = LINE; c.fillRect(x + 8, y + TABS_RULE_Y, w - 16, 1);
  // § rows: one values' column for both tabs, after Records' longest name
  const recs = recordRows(records, played), nx = tabsLeft(card), vx = nx + Math.max(...recs.map((r) => textWidth(r.text))) + VALUE_GAP;
  const growth = tab === 'growth', rows = growth ? growthRows(state) : recs, top = y + (growth ? GROWTH_Y : ROWS_Y), step = growth ? GROWTH_H : ROW_H;
  rows.forEach((row, i) => {
    drawText(c, row.text, nx, top + i * step, GREY);
    drawText(c, row.value, vx, top + i * step, CORE);
  });
  if (!growth) return;
  const h = heartAt(card);
  drawButton(c, h.x, h.y, HEART, !canAddHeart(state), HEART_W);
  drawText(c, ADD_HEART.cost, h.x - COST_GAP - textWidth(ADD_HEART.cost), h.y + 3, GREY);
}
