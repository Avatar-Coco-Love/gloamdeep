// § chest card (CH3, D-330; a card, D-387): bumping a set-down stash chest opens a glass
// card on the room as the bag's (D-385), "STASH CHEST" at its top. On the left, its 12
// slots in a 4 × 3 grid; on the right, "BAG" and the bag's 6 in its 3 × 2 grid, the chosen
// stack's name and count under them, and that a tap moves it (CH4, D-331). The chosen slot,
// the chest's or the bag's, is framed in gold. DECONSTRUCT is in the bottom left corner,
// the menus' flame beside it when chosen (CH5); the round cross closes the card.
import { drawText } from './font.js';
import { drawMarker } from './menu.js';
import { cardAt, drawCard, drawSlot, drawButton, slotAt, gridAt, inCard, onCross, wrapWords, BUTTON, PAD, SLOT, SLOT_GAP, LINE_H, TAP_PAD } from './bag.js';
import { TAKE, TAKE_W, take } from './benchpanel.js';
import { BAG_SLOTS } from '../core/bag.js';
import { CHEST_SLOTS, CHEST_BAG, CHEST_TAKE } from '../core/chest.js';
import { get } from '../core/registry.js';

const GREY = '#9790a4', CORE = '#efe6cc';
const COLS = 4, BAG_COLS = 3, TOP = 28; // the chest's grid, 4 × 3, its top under the card's rule
export const SPLIT = PAD + COLS * (SLOT + SLOT_GAP) - SLOT_GAP + 12; // the line between the chest and the bag
const BAG_X = SPLIT + 13, BAG_Y = TOP + 12, NAME_Y = BAG_Y + 2 * (SLOT + SLOT_GAP) + 6;

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { slot: i } for a chest slot
// (0 to 11) or a bag slot (CHEST_BAG + i), 'take' (Deconstruct), 'close' (the round cross),
// or null; outside the card, 'out'
export function chestAt(x, y, vw, vh) {
  const card = cardAt(vw, vh), t = take(card);
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  const i = gridAt(card, x, y, TOP, COLS, CHEST_SLOTS);
  if (i >= 0) return { slot: i };
  const j = gridAt(card, x, y, BAG_Y, BAG_COLS, BAG_SLOTS, BAG_X);
  if (j >= 0) return { slot: CHEST_BAG + j };
  if (y >= t.y - TAP_PAD && y < t.y + BUTTON.h + TAP_PAD && x >= t.x - TAP_PAD && x < t.x + TAKE_W + TAP_PAD) return 'take';
  return null;
}

// c: the room's canvas, `vw` × `vh`; stash, bag: [{ id, n, form? }]; chosen: a chest slot,
// CHEST_BAG + a bag slot, or CHEST_TAKE; spriteOf: a slot's sprite (sprites.js)
export function drawChestPanel(c, vw, vh, stash, bag, chosen, spriteOf, t, still) {
  const card = drawCard(c, vw, vh, 'STASH CHEST', SPLIT), { x, y, w } = card, at = take(card);
  for (let i = 0; i < CHEST_SLOTS; i++) { const s = slotAt(card, i, TOP, COLS); drawSlot(c, s.x, s.y, stash[i], i === chosen, spriteOf); }
  drawText(c, 'BAG', x + BAG_X, y + TOP, GREY);
  for (let i = 0; i < BAG_SLOTS; i++) { const s = slotAt(card, i, BAG_Y, BAG_COLS, BAG_X); drawSlot(c, s.x, s.y, bag[i], CHEST_BAG + i === chosen, spriteOf); }
  drawButton(c, at.x, at.y, TAKE, false, TAKE_W);
  if (chosen === CHEST_TAKE) drawMarker(c, at.x - 7, at.y + 4, t, still);
  const out = chosen < CHEST_BAG, s = out ? stash[chosen] : bag[chosen - CHEST_BAG];
  if (!s) return;
  const dx = x + BAG_X, dw = x + w - PAD - dx;
  const lines = [[`${get(s.id).name}, ${s.n} in the ${out ? 'chest' : 'bag'}`, CORE], [`Tap to move to the ${out ? 'bag' : 'chest'}.`, GREY]];
  let ly = y + NAME_Y;
  for (const [text, colour] of lines) for (const l of wrapWords(text, dw)) { drawText(c, l, dx, ly, colour); ly += LINE_H; }
}
