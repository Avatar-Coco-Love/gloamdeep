// § make card (D-787): the bag card's Make tab. BAG and MAKE in its title row, MAKE open. On
// the left, each recipe made in the bag that has shown, a slot in a 4 × 3 grid as the
// workbench card's (D-387), the chosen one framed in gold. On the right, its name, a row per
// cost with its sprite and "3 / 5 Oilcap" (needed / in the bag), its Look line, and MAKE in
// the bottom right corner, dim with too few. With none shown yet, a grey line says why.
import { drawText } from './font.js';
import { cardAt, drawCard, drawSlot, drawButton, slotAt, gridAt, inCard, onCross, lookLine, wrapWords, detailAt, BUTTON, PAD, HELD_Y, LINE_H, TAP_PAD } from './bag.js';
import { TOP, SPLIT, DETAIL_X, TALL_SPLIT } from './benchpanel.js';
import { drawBagTabs, bagTabAt } from './bagtabs.js';
import { MAKE_COLS, MAKE_SLOTS } from '../core/bagmake.js';
import { get } from '../core/registry.js';

const GREY = '#9790a4', CORE = '#efe6cc';
const COST_H = 18; // the cost rows under the name, a sprite each
export const NONE_YET = 'Nothing to make yet. Recipes show once you have held their finds.';

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { slot: i }, { tab } (BAG or
// MAKE), 'make', 'close' (the round cross), or null; outside the card, 'out'
export function makeCardAt(x, y, vw, vh) {
  const card = cardAt(vw, vh), { button } = card;
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  const tab = bagTabAt(card, x, y);
  if (tab) return { tab };
  const i = gridAt(card, x, y, TOP, MAKE_COLS, MAKE_SLOTS);
  if (i >= 0) return { slot: i };
  if (y >= button.y - TAP_PAD && y < button.y + BUTTON.h + TAP_PAD && x >= button.x - TAP_PAD && x < button.x + BUTTON.w + TAP_PAD) return 'make';
  return null;
}

// c: the room's canvas, `vw` × `vh`; makes: bagMakes(state) (core/bagmake.js); chosen: a
// slot; spriteOf: a slot's sprite (sprites.js); told: the state's told lines (D-297)
export function drawMakeCard(c, vw, vh, makes, chosen, spriteOf, told) {
  const card = drawCard(c, vw, vh, '', SPLIT, true, TALL_SPLIT), { x, w } = card;
  drawBagTabs(c, card, 'make');
  for (let i = 0; i < MAKE_SLOTS; i++) { const s = slotAt(card, i, TOP, MAKE_COLS); drawSlot(c, s.x, s.y, makes[i] && { id: makes[i].item, n: 1 }, i === chosen, spriteOf); }
  const { dx, dy } = detailAt(card, vw, vh, DETAIL_X, HELD_Y, TALL_SPLIT), dw = x + w - PAD - dx; // upright, under the grid (D-505)
  const make = makes[chosen], entry = make && get(make.item);
  if (!entry) {
    if (!makes.length) wrapWords(NONE_YET, dw).forEach((l, i) => drawText(c, l, dx, dy + i * LINE_H, GREY));
    return;
  }
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
