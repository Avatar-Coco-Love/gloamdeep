// § chest panel (CH3, D-330, look B of the mock-up): bumping a set-down stash chest
// dims the room behind the pause menu's veil, with a box in the middle of the
// picture: "STASH CHEST" in ember, its 12 slots in two rows of 6, "BAG" and the
// bag's 6 slots under them, then Close. The chosen slot, the chest's or the bag's
// (CH4, D-331), is framed in gold; on Close, Close is gold with the menus' flame.
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { veil, drawMarker } from './menu.js';
import { BAG_SLOTS } from '../core/bag.js';
import { CHEST_SLOTS, CHEST_BAG, CHEST_CLOSE } from '../core/chest.js';

const K = '#0e0c16', LINE = '#2a2636', EMBER = '#f39a3b', GOLD = '#ffd66b', GREY = '#9790a4', CORE = '#fff5d6';
const SLOT = 22, SLOT_GAP = 3, PAD = 6, TAP_PAD = 4; // TAP_PAD: game pixels around Close that still pick it
const ROW_W = BAG_SLOTS * SLOT + (BAG_SLOTS - 1) * SLOT_GAP;
const BOX = { w: ROW_W + 2 * PAD, h: 6 + 14 + 2 * SLOT + SLOT_GAP + 8 + 14 + SLOT + 8 + FONT_H + 3 };
BOX.x = Math.floor((W - BOX.w) / 2); BOX.y = Math.floor((SCREEN_H - BOX.h) / 2);
const ROW_X = BOX.x + PAD, CHEST_Y = BOX.y + 20, BAG_HEAD = CHEST_Y + 2 * SLOT + SLOT_GAP + 8, BAG_Y = BAG_HEAD + 14;
const CLOSE = 'Close', CLOSE_X = Math.floor((W - textWidth(CLOSE)) / 2), CLOSE_Y = BAG_Y + SLOT + 8;
const slotX = (col) => ROW_X + col * (SLOT + SLOT_GAP);

// What a tap at x, y picks: { slot: i } for a chest slot (0 to 11) or a bag slot
// (CHEST_BAG + i), CHEST_CLOSE, null inside the box off them, or 'out'
export function chestAt(x, y) {
  if (x < BOX.x || x >= BOX.x + BOX.w || y < BOX.y || y >= BOX.y + BOX.h) return 'out';
  if (y >= CLOSE_Y - TAP_PAD) return CHEST_CLOSE;
  const col = Math.floor((x - ROW_X + SLOT_GAP / 2) / (SLOT + SLOT_GAP));
  if (col < 0 || col >= BAG_SLOTS) return null;
  if (y >= BAG_Y - SLOT_GAP && y < BAG_Y + SLOT + SLOT_GAP) return { slot: CHEST_BAG + col };
  const row = Math.floor((y - CHEST_Y + SLOT_GAP / 2) / (SLOT + SLOT_GAP));
  return y >= CHEST_Y - SLOT_GAP && row >= 0 && row < 2 ? { slot: row * BAG_SLOTS + col } : null;
}

function frame(c, x, y, w, h, colour) {
  c.fillStyle = colour;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1);
  c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
}
const heading = (c, text, y) => drawText(c, text, Math.floor((W - textWidth(text)) / 2), y, EMBER);

// One slot at x, y, framed gold when chosen, with its stack's sprite and count
function slot(c, x, y, s, on, spriteOf) {
  frame(c, x, y, SLOT, SLOT, on ? GOLD : LINE);
  if (!s) return;
  c.drawImage(spriteOf(s), x + 3, y + 3);
  if (s.n > 1) {
    const n = String(s.n), nw = textWidth(n);
    c.fillStyle = K; c.fillRect(x + SLOT - 3 - nw, y + SLOT - 10, nw + 2, 8);
    drawText(c, n, x + SLOT - 2 - nw, y + SLOT - 9, CORE);
  }
}

// stash, bag: [{ id, n, form? }]; chosen: a chest slot, CHEST_BAG + a bag slot, or
// CHEST_CLOSE; spriteOf: a slot's sprite (sprites.js)
export function drawChestPanel(c, stash, bag, chosen, spriteOf, t, still) {
  veil(c);
  c.fillStyle = K; c.fillRect(BOX.x, BOX.y, BOX.w, BOX.h);
  frame(c, BOX.x, BOX.y, BOX.w, BOX.h, LINE);
  heading(c, 'STASH CHEST', BOX.y + 6);
  for (let i = 0; i < CHEST_SLOTS; i++) slot(c, slotX(i % BAG_SLOTS), CHEST_Y + Math.floor(i / BAG_SLOTS) * (SLOT + SLOT_GAP), stash[i], i === chosen, spriteOf);
  heading(c, 'BAG', BAG_HEAD);
  for (let i = 0; i < BAG_SLOTS; i++) slot(c, slotX(i), BAG_Y, bag[i], CHEST_BAG + i === chosen, spriteOf);
  const on = chosen === CHEST_CLOSE;
  drawText(c, CLOSE, CLOSE_X, CLOSE_Y, on ? GOLD : GREY);
  if (on) drawMarker(c, CLOSE_X - 7, CLOSE_Y + 1, t, still);
}
