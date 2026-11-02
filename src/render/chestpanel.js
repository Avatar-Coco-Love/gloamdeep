// § chest card (CH3, D-330; a card, D-387): bumping a set-down stash chest opens a glass
// card on the room as the bag's (D-385), "STASH CHEST" at its top. On the left, its 12
// slots in a 4 × 3 grid; on the right, "BAG" and the bag's 6 in its 3 × 2 grid, the chosen
// stack's name and count under them, and that a tap moves it (CH4, D-331). The chosen slot,
// the chest's or the bag's, is framed in gold. DECONSTRUCT is in the bottom left corner,
// the menus' flame beside it when chosen (CH5); STORE in the bottom right (D-556); the
// round cross closes the card.
import { drawText, textWidth } from './font.js';
import { drawMarker } from './menu.js';
import { cardAt, drawCard, drawSlot, drawButton, slotAt, gridAt, inCard, onCross, wrapWords, isTall, BUTTON, PAD, SLOT, SLOT_GAP, LINE_H, TAP_PAD } from './bag.js';
import { TAKE, TAKE_W, TALL_SPLIT, take } from './benchpanel.js';
import { BAG_SLOTS } from '../core/bag.js';
import { bagShape } from './bag.js';
import { CHEST_SLOTS, CHEST_BAG, CHEST_TAKE, CHEST_STORE } from '../core/chest.js';
import { get } from '../core/registry.js';

const GREY = '#9790a4', CORE = '#efe6cc';
export const STORE = 'STORE', STORE_W = textWidth(STORE) + 8;
// Store's top left: the card's bottom right corner, where Take off is on the bag's (D-556)
export const store = (card) => ({ x: card.button.x + BUTTON.w - STORE_W, y: card.button.y });
const COLS = 4, TOP = 28; // the chest's grid, 4 × 3, its top under the card's rule
export const SPLIT = PAD + COLS * (SLOT + SLOT_GAP) - SLOT_GAP + 12; // the line between the chest and the bag
// The bag's words, grid and the chosen stack's name: right of the line sideways; upright,
// under the line across the card, at the card's left (D-505); its grid the bag's shape (D-548)
function sides(vw, vh, size = BAG_SLOTS) {
  const tall = isTall(vw, vh), x = tall ? PAD : SPLIT + 13, label = tall ? TALL_SPLIT + 10 : TOP, shape = bagShape(size);
  return { x, label, grid: label + 12, name: label + 12 + shape.h + 10, shape };
}

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { slot: i } for a chest slot
// (0 to 11) or a bag slot (CHEST_BAG + i), 'take' (Deconstruct), 'store' (D-556), 'close' (the round cross),
// or null; outside the card, 'out'
export function chestAt(x, y, vw, vh, size = BAG_SLOTS) {
  const card = cardAt(vw, vh), t = take(card), st = store(card), b = sides(vw, vh, size);
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  const i = gridAt(card, x, y, TOP, COLS, CHEST_SLOTS);
  if (i >= 0) return { slot: i };
  const j = gridAt(card, x, y, b.grid, b.shape.cols, size, b.x, b.shape.slot);
  if (j >= 0) return { slot: CHEST_BAG + j };
  if (y >= t.y - TAP_PAD && y < t.y + BUTTON.h + TAP_PAD && x >= t.x - TAP_PAD && x < t.x + TAKE_W + TAP_PAD) return 'take';
  if (y >= st.y - TAP_PAD && y < st.y + BUTTON.h + TAP_PAD && x >= st.x - TAP_PAD && x < st.x + STORE_W + TAP_PAD) return 'store';
  return null;
}

// c: the room's canvas, `vw` × `vh`; stash, bag: [{ id, n, form? }]; chosen: a chest slot,
// CHEST_BAG + a bag slot, CHEST_TAKE or CHEST_STORE; spriteOf: a slot's sprite (sprites.js)
export function drawChestPanel(c, vw, vh, stash, bag, chosen, spriteOf, t, still, size = BAG_SLOTS) {
  const card = drawCard(c, vw, vh, 'STASH CHEST', SPLIT, true, TALL_SPLIT), { x, y, w } = card, at = take(card), b = sides(vw, vh, size);
  for (let i = 0; i < CHEST_SLOTS; i++) { const s = slotAt(card, i, TOP, COLS); drawSlot(c, s.x, s.y, stash[i], i === chosen, spriteOf); }
  drawText(c, 'BAG', x + b.x, y + b.label, GREY);
  for (let i = 0; i < size; i++) { const s = slotAt(card, i, b.grid, b.shape.cols, b.x, b.shape.slot); drawSlot(c, s.x, s.y, bag[i], CHEST_BAG + i === chosen, spriteOf, b.shape.slot); }
  drawButton(c, at.x, at.y, TAKE, false, TAKE_W);
  if (chosen === CHEST_TAKE) drawMarker(c, at.x - 7, at.y + 4, t, still);
  const st = store(card);
  drawButton(c, st.x, st.y, STORE, false, STORE_W);
  if (chosen === CHEST_STORE) drawMarker(c, st.x - 7, st.y + 4, t, still);
  if (chosen >= CHEST_TAKE) return;
  const out = chosen < CHEST_BAG, s = out ? stash[chosen] : bag[chosen - CHEST_BAG];
  if (!s) return;
  const dx = x + b.x, dw = x + w - PAD - dx;
  const lines = [[`${get(s.id).name}, ${s.n} in the ${out ? 'chest' : 'bag'}`, CORE], [`Tap to move to the ${out ? 'bag' : 'chest'}.`, GREY]];
  let ly = y + b.name;
  for (const [text, colour] of lines) for (const l of wrapWords(text, dw)) { drawText(c, l, dx, ly, colour); ly += LINE_H; }
}
