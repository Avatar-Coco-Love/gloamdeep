// § trade card (step 13a, D-494): bumping the peddler at home opens a glass card on the
// room as the bag's (D-385), "PEDDLER" at its top. On the left, its tabs, Sell and Buy (step
// 13b, D-495), the open one gold with the menus' flame and underlined as the Journal's, then
// "COINS" and the coins carried, and a 3 × 2 grid, the chosen slot framed in gold: on Sell
// the bag's 6 slots, on Buy his wares. On the right, the chosen thing's name and how many
// are carried, and what he pays for one, or that he doesn't buy it, or what one costs and,
// when it can't be bought, why; SELL or BUY in the bottom right corner, dim when it can't.
// A tap picks a slot or turns a tab, so a stray one never sells or buys; the button, Enter
// or Space sell or buy one; the cross closes it.
import { drawText, textWidth } from './font.js';
import { drawMarker } from './menu.js';
import { cardAt, drawCard, drawSlot, drawButton, frame, slotAt, gridAt, inCard, onCross, wrapWords, BUTTON, PAD, DETAIL_X, HELD_Y, LINE_H, TAP_PAD } from './bag.js';
import { BAG_SLOTS, carried } from '../core/bag.js';
import { coins, priceOf, priceWords, wares, cantBuy, costWords } from '../core/trade.js';
import { get } from '../core/registry.js';

const GREY = '#9790a4', CORE = '#efe6cc', GOLD = '#ffd66b';
export const TABS = [{ id: 'sell', text: 'SELL' }, { id: 'buy', text: 'BUY' }];
const TABS_Y = 28; // the tabs' top inside the card
const COINS_Y = 50; // the coins' line's top inside the card
const MARK_W = 8; // the flame and its gap, left of the open tab
const TAB_GAP = 20; // between the two tabs
function tabXs(card) {
  let x = card.x + PAD + MARK_W;
  return TABS.map((tab) => { const at = x; x += textWidth(tab.text) + TAB_GAP; return at; });
}

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { slot: i } for a slot of the
// open tab's grid, { tab } for a tab, 'act' (Sell or Buy), 'close' (the round cross), or null;
// outside the card, 'out'. tab: the one open.
export function tradeAt(x, y, vw, vh, tab = 'sell') {
  const card = cardAt(vw, vh), b = card.button;
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  const i = gridAt(card, x, y, undefined, undefined, tab === 'buy' ? wares().length : BAG_SLOTS);
  if (i >= 0) return { slot: i };
  if (y >= b.y - TAP_PAD && y < b.y + BUTTON.h + TAP_PAD && x >= b.x - TAP_PAD && x < b.x + BUTTON.w + TAP_PAD) return 'act';
  const xs = tabXs(card);
  if (y >= card.y + TABS_Y - 8 && y < card.y + COINS_Y - 4 && x < xs[1] + textWidth(TABS[1].text) + TAP_PAD) return { tab: x < (xs[0] + textWidth(TABS[0].text) + xs[1]) / 2 ? 'sell' : 'buy' };
  return null;
}

// c: the room's canvas, `vw` × `vh`; state: the game's, for its bag and coins; chosen: a slot
// of the open tab's grid, or -1 for the tabs; spriteOf: a slot's sprite (sprites.js); tab: the
// one open; t and still: the flame's time and prefers-reduced-motion
export function drawTradePanel(c, vw, vh, state, chosen, spriteOf, tab = 'sell', t = 0, still = true) {
  const card = drawCard(c, vw, vh, 'PEDDLER'), { x, y, w } = card, { bag } = state, xs = tabXs(card), buying = tab === 'buy';
  TABS.forEach((s, i) => {
    if (s.id !== tab) { drawText(c, s.text, xs[i], y + TABS_Y, GREY); return; }
    drawText(c, s.text, xs[i], y + TABS_Y, GOLD);
    drawMarker(c, xs[i] - MARK_W, y + TABS_Y + 1, t, still);
    c.fillStyle = GOLD; c.fillRect(xs[i], y + TABS_Y + 11, textWidth(s.text), 1);
    if (chosen < 0) frame(c, xs[i] - MARK_W - 3, y + TABS_Y - 4, textWidth(s.text) + MARK_W + 6, 17, GOLD); // the keys' frame on the tabs
  });
  drawText(c, 'COINS', x + PAD, y + COINS_Y, GREY);
  drawText(c, String(coins(state)), x + PAD + textWidth('COINS') + 6, y + COINS_Y, GOLD);
  const shown = buying ? wares().map((w) => ({ id: w.id, n: 1 })) : bag;
  for (let i = 0; i < BAG_SLOTS; i++) { const s = slotAt(card, i); drawSlot(c, s.x, s.y, shown[i], i === chosen, spriteOf); }
  const picked = shown[chosen];
  drawButton(c, card.button.x, card.button.y, buying ? 'BUY' : 'SELL', buying ? !!cantBuy(state, chosen) : !(picked && priceOf(picked.id)));
  if (!picked) return;
  const dx = x + DETAIL_X, dw = x + w - PAD - dx;
  drawText(c, get(picked.id).name, dx, y + HELD_Y, CORE);
  drawText(c, `${buying ? carried(bag, picked.id) : picked.n} carried`, dx, y + HELD_Y + LINE_H, GREY);
  wrapWords(buying ? costWords(state, chosen) : priceWords(picked.id), dw).forEach((l, i) => drawText(c, l, dx, y + HELD_Y + 2.5 * LINE_H + i * LINE_H, GREY));
}
