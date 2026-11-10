// § bag tabs (D-787): BAG and MAKE in the bag card's title row, where its title was, the open
// one in ember and the other grey, as the peddler's tabs (D-494). Drawn on `card`, cardAt's.
// The workbench's BUILD and GEAR are drawn the same way (D-800): `tabs`, a list of { id, text }.
import { drawText, textWidth } from './font.js';

const EMBER = '#f39a3b', GREY = '#9790a4';
export const BAG_TABS = [{ id: 'bag', text: 'BAG' }, { id: 'make', text: 'MAKE' }];
const PAD = 12, TOP = 7, GAP = 14, STRIP = 20, TAP = 4; // the card's padding, the words' top, between two, the title strip's height, the tap's margin
function tabXs(card, tabs) {
  let x = card.x + PAD;
  return tabs.map((tab) => { const at = x; x += textWidth(tab.text) + GAP; return at; });
}
// c: a canvas; open: the open tab's id
export function drawTabs(c, card, open, tabs) {
  tabXs(card, tabs).forEach((x, i) => drawText(c, tabs[i].text, x, card.y + TOP, tabs[i].id === open ? EMBER : GREY));
}
// The id of the tab under a tap at x, y, or null: each tab's words and half the gap either side
export function tabAt(card, x, y, tabs) {
  if (y < card.y || y >= card.y + STRIP + TAP) return null;
  const xs = tabXs(card, tabs), last = tabs.length - 1, end = xs[last] + textWidth(tabs[last].text) + TAP;
  if (x < card.x || x >= end) return null;
  const i = xs.findIndex((at, j) => j === last || x < (at + textWidth(tabs[j].text) + xs[j + 1]) / 2);
  return tabs[i].id;
}
export const drawBagTabs = (c, card, open) => drawTabs(c, card, open, BAG_TABS);
// The tab under a tap at x, y, 'bag' or 'make', or null
export const bagTabAt = (card, x, y) => tabAt(card, x, y, BAG_TABS);
