// § bench card (WB3, D-323; a card, D-387): bumping a set-down workbench opens a glass
// card on the room as the bag's (D-385), "WORKBENCH" at its top. On the left, each thing
// made at it is a slot in a 4 × 3 grid, the stash chest's (D-484), the chosen one framed in gold. On the
// right, its name, a row per cost with its sprite and "3 / 5 Wood" (needed / in the bag and
// the chests in reach, D-560),
// its Look line, and MAKE in the bottom right corner, dim with too few (CH1, D-326).
// DECONSTRUCT is in the bottom left corner, the menus' flame beside it when chosen.
// The workbench's card has two tabs where its title was, BUILD and GEAR (D-800); the mortar's keeps its title.
import { drawText, textWidth } from './font.js';
import { drawMarker } from './menu.js';
import { cardAt, drawCard, drawSlot, drawButton, slotAt, gridAt, inCard, onCross, lookLine, wrapWords, detailAt, BUTTON, PAD, HELD_Y, LINE_H, SLOT, SLOT_GAP, TAP_PAD } from './bag.js';
import { BENCH_TAKE, BENCH_COLS, BENCH_SLOTS, BENCH_TABS } from '../core/menu.js';
import { drawTabs, tabAt } from './bagtabs.js';
import { get } from '../core/registry.js';

const GREY = '#9790a4', CORE = '#efe6cc';
export const TAKE = 'DECONSTRUCT'; // the stash chest's card too (D-387)
export const TAKE_W = textWidth(TAKE) + 8;
const COST_H = 18; // the cost rows under the name, a sprite each
// the grid's top, the line beside it and the words' left, as the stash chest's; the Make tab's too (D-787)
export const TOP = 28;
export const SPLIT = PAD + BENCH_COLS * (SLOT + SLOT_GAP) - SLOT_GAP + 12;
export const DETAIL_X = SPLIT + 9;
export const TALL_SPLIT = TOP + (BENCH_SLOTS / BENCH_COLS) * (SLOT + SLOT_GAP) - SLOT_GAP + 10; // upright, the line under the grid (D-505), the stash chest's too
export const take = (card) => ({ x: card.x + PAD, y: card.button.y });

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { slot: i }, { tab } (BUILD or
// GEAR, given `tabbed`, D-800), 'make', 'take' (Deconstruct), 'close' (the round cross), or null;
// outside the card, 'out'
export function benchAt(x, y, vw, vh, tabbed = false) {
  const card = cardAt(vw, vh), t = take(card), { button } = card;
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  const tab = tabbed && tabAt(card, x, y, BENCH_TABS);
  if (tab) return { tab };
  const i = gridAt(card, x, y, TOP, BENCH_COLS, BENCH_SLOTS);
  if (i >= 0) return { slot: i };
  if (y < button.y - TAP_PAD || y >= button.y + BUTTON.h + TAP_PAD) return null;
  if (x >= button.x - TAP_PAD && x < button.x + BUTTON.w + TAP_PAD) return 'make';
  if (x >= t.x - TAP_PAD && x < t.x + TAKE_W + TAP_PAD) return 'take';
  return null;
}

// c: the room's canvas, `vw` × `vh`; makes: benchMakes(bag) (core/menu.js); chosen: a slot
// or BENCH_TAKE; spriteOf: a slot's sprite (sprites.js); told: the state's told lines (D-297);
// title: the station's, WORKBENCH or MORTAR; none: the grey line while nothing is listed (D-786);
// tab: the workbench's open tab, 'build' or 'gear', drawn in place of its title, or null (D-800)
export function drawBenchPanel(c, vw, vh, makes, chosen, spriteOf, told, t, still, title = 'WORKBENCH', none = '', tab = null) {
  const card = drawCard(c, vw, vh, tab ? '' : title, SPLIT, true, TALL_SPLIT), { x, y, w } = card, at = take(card);
  if (tab) drawTabs(c, card, tab, BENCH_TABS);
  for (let i = 0; i < BENCH_SLOTS; i++) { const s = slotAt(card, i, TOP, BENCH_COLS); drawSlot(c, s.x, s.y, makes[i] && { id: makes[i].item, n: 1 }, i === chosen, spriteOf); }
  drawButton(c, at.x, at.y, TAKE, false, TAKE_W);
  if (chosen === BENCH_TAKE) drawMarker(c, at.x - 7, at.y + 4, t, still);
  const make = makes[chosen], entry = make && get(make.item);
  const { dx, dy } = detailAt(card, vw, vh, DETAIL_X, HELD_Y, TALL_SPLIT), dw = x + w - PAD - dx; // upright, under the grid (D-505)
  if (!entry) { if (!makes.length && none) wrapWords(none, dw).forEach((l, i) => drawText(c, l, dx, dy + i * LINE_H, GREY)); return; } // the mortar's, empty (D-786)
  drawText(c, entry.name, dx, dy, CORE);
  make.cost.forEach(({ id, n, have }, i) => {
    const cy = dy + LINE_H + i * COST_H;
    c.drawImage(spriteOf({ id, n }), dx, cy);
    drawText(c, `${n} / ${have} ${get(id).name}`, dx + 19, cy + 5, GREY);
  });
  const look = lookLine(entry, told), top = dy + LINE_H + make.cost.length * COST_H + 6;
  if (look) wrapWords(look, dw).forEach((l, i) => drawText(c, l, dx, top + i * LINE_H, GREY));
  drawButton(c, card.button.x, card.button.y, 'MAKE', make.dim);
}
