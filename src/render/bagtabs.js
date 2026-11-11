// § bag tabs (D-787): BAG and MAKE in the bag card's title row, where its title was, the open
// one in ember and the other grey, as the peddler's tabs (D-494). Drawn on `card`, cardAt's.
// The workbench's BUILD and GEAR are drawn the same way (D-800): `tabs`, a list of { id, text }.
import { drawText, textWidth } from './font.js';

const EMBER = '#f39a3b', GREY = '#9790a4';
export const BAG_TABS = [{ id: 'bag', text: 'BAG' }, { id: 'make', text: 'MAKE' }];
const PAD = 12, TOP = 7, GAP = 14, STRIP = 20, TAP = 4; // the card's padding, the words' top, between two, the title strip's height, the tap's margin
export const TAB_ROW = 12; // from one row of tabs to the next
// § rows: each tab's left and top, in a row from the left; when the row would reach the round
// cross (upright, Settings' four, D-820), in two rows, half on each, the first row the longer
function tabXs(card, tabs) {
  const row = (list, top) => { let x = card.x + PAD; return list.map((tab) => { const at = { x, y: card.y + top }; x += textWidth(tab.text) + GAP; return at; }); };
  const one = row(tabs, TOP), last = tabs.length - 1;
  if (one[last].x + textWidth(tabs[last].text) <= card.close.x - card.close.r - TAP) return one;
  const half = Math.ceil(tabs.length / 2);
  return [...row(tabs.slice(0, half), TOP), ...row(tabs.slice(half), TOP + TAB_ROW)];
}
// How many rows of tabs: 1, or 2 on a card too narrow for one
export const tabRows = (card, tabs) => (tabXs(card, tabs).at(-1).y > card.y + TOP ? 2 : 1);
// c: a canvas; open: the open tab's id
export function drawTabs(c, card, open, tabs) {
  tabXs(card, tabs).forEach((at, i) => drawText(c, tabs[i].text, at.x, at.y, tabs[i].id === open ? EMBER : GREY));
}
// The id of the tab under a tap at x, y, or null: each tab's words and half the gap either side
// in its row, the row's last to its end and a tap's margin
export function tabAt(card, x, y, tabs) {
  const xs = tabXs(card, tabs), rows = tabRows(card, tabs);
  if (y < card.y || y >= card.y + STRIP + (rows - 1) * TAB_ROW + TAP || x < card.x) return null;
  const top = rows > 1 && y >= card.y + TOP + TAB_ROW - 3 ? card.y + TOP + TAB_ROW : card.y + TOP;
  const inRow = tabs.map((t, i) => i).filter((i) => xs[i].y === top), last = inRow.at(-1);
  if (x >= xs[last].x + textWidth(tabs[last].text) + TAP) return null;
  const i = inRow.find((j, k) => j === last || x < (xs[j].x + textWidth(tabs[j].text) + xs[inRow[k + 1]].x) / 2);
  return tabs[i].id;
}
export const drawBagTabs = (c, card, open) => drawTabs(c, card, open, BAG_TABS);
// The tab under a tap at x, y, 'bag' or 'make', or null
export const bagTabAt = (card, x, y) => tabAt(card, x, y, BAG_TABS);
