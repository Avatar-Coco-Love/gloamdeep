// § bag tabs (D-787): BAG and MAKE in the bag card's title row, where its title was, the open
// one in ember and the other grey, as the peddler's tabs (D-494). Drawn on `card`, cardAt's.
import { drawText, textWidth } from './font.js';

const EMBER = '#f39a3b', GREY = '#9790a4';
export const BAG_TABS = [{ id: 'bag', text: 'BAG' }, { id: 'make', text: 'MAKE' }];
const PAD = 12, TOP = 7, GAP = 14, STRIP = 20, TAP = 4; // the card's padding, the words' top, between the two, the title strip's height, the tap's margin
function tabXs(card) {
  let x = card.x + PAD;
  return BAG_TABS.map((tab) => { const at = x; x += textWidth(tab.text) + GAP; return at; });
}
// c: a canvas; open: 'bag' or 'make'
export function drawBagTabs(c, card, open) {
  tabXs(card).forEach((x, i) => drawText(c, BAG_TABS[i].text, x, card.y + TOP, BAG_TABS[i].id === open ? EMBER : GREY));
}
// The tab under a tap at x, y, 'bag' or 'make', or null
export function bagTabAt(card, x, y) {
  if (y < card.y || y >= card.y + STRIP + TAP) return null;
  const xs = tabXs(card), end = xs[1] + textWidth(BAG_TABS[1].text) + TAP;
  if (x < card.x || x >= end) return null;
  return x < (xs[0] + textWidth(BAG_TABS[0].text) + xs[1]) / 2 ? 'bag' : 'make';
}
