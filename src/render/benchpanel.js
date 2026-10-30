// § bench card (WB3, D-323; a card, D-387): bumping a set-down workbench opens a glass
// card on the room as the bag's (D-385), "WORKBENCH" at its top. On the left, each thing
// made at it is a slot in a 4 × 3 grid, the stash chest's (D-484), the chosen one framed in gold. On the
// right, its name, a row per cost with its sprite and "3 / 5 Wood" (needed / carried),
// its Look line, and MAKE in the bottom right corner, dim with too few (CH1, D-326).
// DECONSTRUCT is in the bottom left corner, the menus' flame beside it when chosen.
import { drawText, textWidth } from './font.js';
import { drawMarker } from './menu.js';
import { cardAt, drawCard, drawSlot, drawButton, slotAt, gridAt, inCard, onCross, lookLine, wrapWords, BUTTON, PAD, HELD_Y, LINE_H, SLOT, SLOT_GAP, TAP_PAD } from './bag.js';
import { BENCH_TAKE, BENCH_COLS, BENCH_SLOTS } from '../core/menu.js';
import { get } from '../core/registry.js';

const GREY = '#9790a4', CORE = '#efe6cc';
export const TAKE = 'DECONSTRUCT'; // the stash chest's card too (D-387)
export const TAKE_W = textWidth(TAKE) + 8;
const COST_Y = HELD_Y + LINE_H, COST_H = 18; // the cost rows under the name, a sprite each
const TOP = 28, SPLIT = PAD + BENCH_COLS * (SLOT + SLOT_GAP) - SLOT_GAP + 12, DETAIL_X = SPLIT + 9; // the grid's top, the line beside it and the words' left, as the stash chest's
export const take = (card) => ({ x: card.x + PAD, y: card.button.y });

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { slot: i }, 'make', 'take'
// (Deconstruct), 'close' (the round cross), or null; outside the card, 'out'
export function benchAt(x, y, vw, vh) {
  const card = cardAt(vw, vh), t = take(card), { button } = card;
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  const i = gridAt(card, x, y, TOP, BENCH_COLS, BENCH_SLOTS);
  if (i >= 0) return { slot: i };
  if (y < button.y - TAP_PAD || y >= button.y + BUTTON.h + TAP_PAD) return null;
  if (x >= button.x - TAP_PAD && x < button.x + BUTTON.w + TAP_PAD) return 'make';
  if (x >= t.x - TAP_PAD && x < t.x + TAKE_W + TAP_PAD) return 'take';
  return null;
}

// c: the room's canvas, `vw` × `vh`; makes: benchMakes(bag) (core/menu.js); chosen: a slot
// or BENCH_TAKE; spriteOf: a slot's sprite (sprites.js); told: the state's told lines (D-297)
export function drawBenchPanel(c, vw, vh, makes, chosen, spriteOf, told, t, still) {
  const card = drawCard(c, vw, vh, 'WORKBENCH', SPLIT), { x, y, w } = card, at = take(card);
  for (let i = 0; i < BENCH_SLOTS; i++) { const s = slotAt(card, i, TOP, BENCH_COLS); drawSlot(c, s.x, s.y, makes[i] && { id: makes[i].item, n: 1 }, i === chosen, spriteOf); }
  drawButton(c, at.x, at.y, TAKE, false, TAKE_W);
  if (chosen === BENCH_TAKE) drawMarker(c, at.x - 7, at.y + 4, t, still);
  const make = makes[chosen], entry = make && get(make.item);
  if (!entry) return;
  const dx = x + DETAIL_X, dw = x + w - PAD - dx;
  drawText(c, entry.name, dx, y + HELD_Y, CORE);
  make.cost.forEach(({ id, n, have }, i) => {
    const cy = y + COST_Y + i * COST_H;
    c.drawImage(spriteOf({ id, n }), dx, cy);
    drawText(c, `${n} / ${have} ${get(id).name}`, dx + 19, cy + 5, GREY);
  });
  const look = lookLine(entry, told), top = y + COST_Y + make.cost.length * COST_H + 6;
  if (look) wrapWords(look, dw).forEach((l, i) => drawText(c, l, dx, top + i * LINE_H, GREY));
  drawButton(c, card.button.x, card.button.y, 'MAKE', make.dim);
}
