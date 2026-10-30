// § trade card (step 13a, D-494): bumping the peddler at home opens a glass card on the
// room as the bag's (D-385), "PEDDLER" at its top. On the left, "COINS" and the coins
// carried, and the bag's 6 slots in its 3 × 2 grid, the chosen one framed in gold. On the
// right, the chosen stack's name and count, and what he pays for one, or that he doesn't
// buy it; SELL in the bottom right corner, dim for what he doesn't buy. A tap picks a
// slot, so a stray one never sells; SELL, Enter or Space sell one; the cross closes it.
import { drawText, textWidth } from './font.js';
import { cardAt, drawCard, drawSlot, drawButton, slotAt, gridAt, inCard, onCross, wrapWords, BUTTON, PAD, DETAIL_X, HELD_Y, LINE_H, TAP_PAD } from './bag.js';
import { BAG_SLOTS } from '../core/bag.js';
import { coins, priceOf, priceWords } from '../core/trade.js';
import { get } from '../core/registry.js';

const GREY = '#9790a4', CORE = '#efe6cc', GOLD = '#ffd66b';
const SELL = 'SELL';

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { slot: i } for a bag slot,
// 'sell', 'close' (the round cross), or null; outside the card, 'out'
export function tradeAt(x, y, vw, vh) {
  const card = cardAt(vw, vh), b = card.button;
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  const i = gridAt(card, x, y);
  if (i >= 0) return { slot: i };
  if (y >= b.y - TAP_PAD && y < b.y + BUTTON.h + TAP_PAD && x >= b.x - TAP_PAD && x < b.x + BUTTON.w + TAP_PAD) return 'sell';
  return null;
}

// c: the room's canvas, `vw` × `vh`; state: the game's, for its bag and coins;
// chosen: a bag slot; spriteOf: a slot's sprite (sprites.js)
export function drawTradePanel(c, vw, vh, state, chosen, spriteOf) {
  const card = drawCard(c, vw, vh, 'PEDDLER'), { x, y, w } = card, { bag } = state;
  drawText(c, 'COINS', x + PAD, y + HELD_Y + 11, GREY);
  drawText(c, String(coins(state)), x + PAD + textWidth('COINS') + 6, y + HELD_Y + 11, GOLD);
  for (let i = 0; i < BAG_SLOTS; i++) { const s = slotAt(card, i); drawSlot(c, s.x, s.y, bag[i], i === chosen, spriteOf); }
  const picked = bag[chosen];
  drawButton(c, card.button.x, card.button.y, SELL, !(picked && priceOf(picked.id)));
  if (!picked) return;
  const dx = x + DETAIL_X, dw = x + w - PAD - dx;
  drawText(c, get(picked.id).name, dx, y + HELD_Y, CORE);
  drawText(c, `${picked.n} carried`, dx, y + HELD_Y + LINE_H, GREY);
  wrapWords(priceWords(picked.id), dw).forEach((l, i) => drawText(c, l, dx, y + HELD_Y + 2.5 * LINE_H + i * LINE_H, GREY));
}
