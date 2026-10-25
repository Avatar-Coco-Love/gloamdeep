// § chest panel (CH3, D-330, look B of the mock-up): bumping a set-down stash chest
// dims the room behind the pause menu's veil, with a box in the middle of the
// picture: "STASH CHEST" in ember, its 12 slots in two rows of 6, "BAG" and the
// bag's 6 slots under them, then Close. The chosen slot is framed in gold; on
// Close, Close is gold with the menus' flame. The bag's row only shows until CH4.
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { veil, drawMarker } from './menu.js';
import { BAG_SLOTS } from '../core/bag.js';
import { CHEST_SLOTS, CHEST_CLOSE } from '../core/chest.js';

const K = '#0e0c16', LINE = '#2a2636', EMBER = '#f39a3b', GOLD = '#ffd66b', GREY = '#9790a4', CORE = '#fff5d6';
const SLOT = 22, SLOT_GAP = 3, PAD = 6, TAP_PAD = 4; // TAP_PAD: game pixels around Close that still pick it
const ROW_W = BAG_SLOTS * SLOT + (BAG_SLOTS - 1) * SLOT_GAP;
const BOX = { w: ROW_W + 2 * PAD, h: 6 + 14 + 2 * SLOT + SLOT_GAP + 8 + 14 + SLOT + 8 + FONT_H + 3 };
BOX.x = Math.floor((W - BOX.w) / 2); BOX.y = Math.floor((SCREEN_H - BOX.h) / 2);
const ROW_X = BOX.x + PAD, CHEST_Y = BOX.y + 20, BAG_HEAD = CHEST_Y + 2 * SLOT + SLOT_GAP + 8, BAG_Y = BAG_HEAD + 14;
const CLOSE = 'Close', CLOSE_X = Math.floor((W - textWidth(CLOSE)) / 2), CLOSE_Y = BAG_Y + SLOT + 8;
const slotX = (col) => ROW_X + col * (SLOT + SLOT_GAP);

// What a tap at x, y picks: { slot: i } for a chest slot, CHEST_CLOSE, null inside the box
// off them (the bag's row too, for now), or 'out'
export function chestAt(x, y) {
  if (x < BOX.x || x >= BOX.x + BOX.w || y < BOX.y || y >= BOX.y + BOX.h) return 'out';
  if (y >= CLOSE_Y - TAP_PAD) return CHEST_CLOSE;
  const row = Math.floor((y - CHEST_Y + SLOT_GAP / 2) / (SLOT + SLOT_GAP)), col = Math.floor((x - ROW_X + SLOT_GAP / 2) / (SLOT + SLOT_GAP));
  return y >= CHEST_Y - SLOT_GAP && row >= 0 && row < 2 && col >= 0 && col < BAG_SLOTS ? { slot: row * BAG_SLOTS + col } : null;
}

function frame(c, x, y, w, h, colour) {
  c.fillStyle = colour;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1);
  c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
}
const heading = (c, text, y) => drawText(c, text, Math.floor((W - textWidth(text)) / 2), y, EMBER);

// bag: [{ id, n, form? }]; chosen: a chest slot or CHEST_CLOSE; spriteOf: a slot's sprite (sprites.js)
export function drawChestPanel(c, bag, chosen, spriteOf, t, still) {
  veil(c);
  c.fillStyle = K; c.fillRect(BOX.x, BOX.y, BOX.w, BOX.h);
  frame(c, BOX.x, BOX.y, BOX.w, BOX.h, LINE);
  heading(c, 'STASH CHEST', BOX.y + 6);
  for (let i = 0; i < CHEST_SLOTS; i++) {
    const row = Math.floor(i / BAG_SLOTS);
    frame(c, slotX(i % BAG_SLOTS), CHEST_Y + row * (SLOT + SLOT_GAP), SLOT, SLOT, i === chosen ? GOLD : LINE);
  }
  heading(c, 'BAG', BAG_HEAD);
  for (let i = 0; i < BAG_SLOTS; i++) {
    const sx = slotX(i), s = bag[i];
    frame(c, sx, BAG_Y, SLOT, SLOT, LINE);
    if (!s) continue;
    c.drawImage(spriteOf(s), sx + 3, BAG_Y + 3);
    if (s.n > 1) {
      const n = String(s.n), nw = textWidth(n);
      c.fillStyle = K; c.fillRect(sx + SLOT - 3 - nw, BAG_Y + SLOT - 10, nw + 2, 8);
      drawText(c, n, sx + SLOT - 2 - nw, BAG_Y + SLOT - 9, CORE);
    }
  }
  const on = chosen === CHEST_CLOSE;
  drawText(c, CLOSE, CLOSE_X, CLOSE_Y, on ? GOLD : GREY);
  if (on) drawMarker(c, CLOSE_X - 7, CLOSE_Y + 1, t, still);
}
