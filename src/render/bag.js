// § bag card: a glass card in the middle of the room's canvas, the room dimmed
// around it (D-385; was a box over the room's foot, D-247). "BAG" in ember at
// its top and a round cross at its top right that closes it, then the held
// slot with "HELD" beside it, the weapon in hand (D-252), then the six slots in
// a row, each an item's sprite with its count when more than one, the chosen
// slot framed in gold. Under a line: the chosen item's name and how many are
// carried, its Look line under them (D-297), and on the right Pour for one that
// pours, Make for one that crafts, dim with too few (D-299), or Eat (Drink for
// a potion) for one that heals, dim at full health (D-308); heartcaps both make
// and heal, so Make sits left of Eat (D-309). The workbench has Set down,
// wider, at the same right end (WB2, D-322).
import { drawText, textWidth } from './font.js';
import { drawGlass, GLASS, GLASS_EDGE as EDGE } from './glass.js';
import { BAG_SLOTS } from '../core/bag.js';
import { get } from '../core/registry.js';
import { LINES } from '../core/lines.js';

const K = '#0e0c16', EMBER = '#f39a3b', GOLD = '#ffd66b', GREY = '#9790a4', CORE = '#efe6cc';
const LINE = 'rgba(239,230,204,.16)', SLOT_FILL = 'rgba(14,12,22,.55)';
export const CARD = { w: 212, h: 132 };
export const CARD_VEIL = 0.55; // the room's dimming around the card
const SLOT = 28, SLOT_GAP = 4, PAD = 10;
const HELD_Y = 20, ROW_Y = 56, RULE_Y = 92, FOOT_Y = 100, LOOK_Y = 113;
const ROW_X = Math.floor((CARD.w - (BAG_SLOTS * SLOT + (BAG_SLOTS - 1) * SLOT_GAP)) / 2);
const HELD_X = Math.floor((CARD.w - SLOT) / 2), HELD = 'HELD';
const CLOSE = { x: CARD.w - 11, y: 10, r: 8 }; // the round cross, from the card's corner
// The button for an item: Pour, Make, Eat or Drink, the same size, at the foot's right end;
// Make, for an item that also heals, just left of it
const BUTTON = { w: Math.max(textWidth('POUR'), textWidth('MAKE'), textWidth('EAT'), textWidth('DRINK')) + 8, h: 13 };
BUTTON.x = CARD.w - PAD - BUTTON.w;
const MAKE_X = BUTTON.x - 4 - BUTTON.w;
const SET = 'SET DOWN', SET_W = textWidth(SET) + 8, SET_X = BUTTON.x + BUTTON.w - SET_W; // Set down's own width
const buttonText = (entry) => (entry.oil ? 'POUR' : entry.eats ? entry.verb ?? 'EAT' : entry.craft ? 'MAKE' : entry.sets ? SET : null);
// Whether an item shows Make beside its Eat
export const twoButtons = (entry) => !!(entry?.craft && entry.eats);
const slotX = (i) => ROW_X + i * (SLOT + SLOT_GAP);
const TAP_PAD = 4; // game pixels around a slot, the cross or a button that still pick it

// The card's top left on a view `vw` × `vh` game pixels: in the middle
export const cardAt = (vw, vh) => ({ x: Math.max(0, Math.floor((vw - CARD.w) / 2)), y: Math.max(0, Math.floor((vh - CARD.h) / 2)) });

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { slot: i }, 'act' (Pour,
// Make, Eat, Drink, or Set down, when `wide`), 'make' (Make beside Eat, when `two`),
// 'close' (the round cross), or null; outside the card, 'out'
export function bagAt(x, y, vw, vh, two = false, wide = false) {
  const at = cardAt(vw, vh), cx = x - at.x, cy = y - at.y;
  if (cx < 0 || cx >= CARD.w || cy < 0 || cy >= CARD.h) return 'out';
  if (Math.hypot(cx - CLOSE.x, cy - CLOSE.y) <= CLOSE.r + TAP_PAD) return 'close';
  if (cy >= ROW_Y - TAP_PAD && cy < ROW_Y + SLOT + TAP_PAD) {
    const i = Math.floor((cx - ROW_X + SLOT_GAP / 2) / (SLOT + SLOT_GAP));
    return i >= 0 && i < BAG_SLOTS ? { slot: i } : null;
  }
  const foot = cy >= FOOT_Y - 2 - TAP_PAD && cy < FOOT_Y - 2 + BUTTON.h + TAP_PAD;
  if (foot && cx >= (wide ? SET_X : BUTTON.x) - (two ? 2 : TAP_PAD)) return 'act';
  if (two && foot && cx >= MAKE_X - TAP_PAD) return 'make';
  return null;
}

// The item's Look line last said, or its first before any (D-297); null for an item with none
export function lookLine(entry, told = {}) {
  const texts = entry?.look && LINES[entry.look]?.texts;
  if (!texts) return null;
  return texts[((told[entry.look] ?? 1) - 1 + texts.length) % texts.length];
}

function frame(c, x, y, w, h, colour) {
  c.fillStyle = colour;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1);
  c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
}

// § round: a pixel disc on the glass with its light edge, as the corner buttons
function round(c, cx, cy, r) {
  for (let dy = -r; dy <= r; dy++) {
    const w = Math.floor(Math.sqrt(r * r - dy * dy));
    c.fillStyle = GLASS; c.fillRect(cx - w, cy + dy, 2 * w + 1, 1);
    c.fillStyle = EDGE; c.fillRect(cx - w, cy + dy, 1, 1); c.fillRect(cx + w, cy + dy, 1, 1);
  }
  c.fillStyle = EDGE;
  for (let dx = -r; dx <= r; dx++) { const h = Math.floor(Math.sqrt(r * r - dx * dx)); c.fillRect(cx + dx, cy - h, 1, 1); c.fillRect(cx + dx, cy + h, 1, 1); }
}
// The cross on it, as the close icon's 5 × 5 (hud.js), its middle at cx, cy
function cross(c, cx, cy) {
  c.fillStyle = GREY;
  for (let i = 0; i < 5; i++) { c.fillRect(cx - 2 + i, cy - 2 + i, 1, 1); c.fillRect(cx + 2 - i, cy - 2 + i, 1, 1); }
}

function slot(c, x, y, item, chosen, spriteOf) {
  c.fillStyle = SLOT_FILL; c.fillRect(x + 1, y + 1, SLOT - 2, SLOT - 2);
  frame(c, x, y, SLOT, SLOT, chosen ? GOLD : LINE);
  if (!item) return;
  c.drawImage(spriteOf(item), x + 6, y + 6);
  if (item.n > 1) {
    const n = String(item.n), nw = textWidth(n);
    c.fillStyle = K; c.fillRect(x + SLOT - 4 - nw, y + SLOT - 11, nw + 2, 9);
    drawText(c, n, x + SLOT - 3 - nw, y + SLOT - 10, CORE);
  }
}

// c: the room's canvas, `vw` × `vh`; bag: [{ id, n, form? }]; chosen: the slot picked;
// spriteOf: a slot's or item's sprite (sprites.js); held: the weapon in hand's id, or
// null; full: whether the hero is at full health; told: the state's told lines (D-297)
export function drawBag(c, vw, vh, bag, chosen, spriteOf, held = null, full = false, told = {}) {
  c.fillStyle = K; c.globalAlpha = CARD_VEIL; c.fillRect(0, 0, vw, vh); c.globalAlpha = 1;
  const { x, y } = cardAt(vw, vh), { w, h } = CARD;
  drawGlass(c, x, y, w, h);
  drawText(c, 'BAG', x + Math.floor((w - textWidth('BAG')) / 2), y + 6, EMBER);
  round(c, x + CLOSE.x, y + CLOSE.y, CLOSE.r);
  cross(c, x + CLOSE.x, y + CLOSE.y);
  drawText(c, HELD, x + HELD_X - 5 - textWidth(HELD), y + HELD_Y + 10, GREY);
  slot(c, x + HELD_X, y + HELD_Y, held && { id: held, n: 1 }, false, spriteOf);
  for (let i = 0; i < BAG_SLOTS; i++) slot(c, x + slotX(i), y + ROW_Y, bag[i], i === chosen, spriteOf);
  c.fillStyle = LINE; c.fillRect(x + 8, y + RULE_Y, w - 16, 1);
  const entry = bag[chosen] && get(bag[chosen].id);
  if (!entry) return;
  drawText(c, entry.name, x + PAD, y + FOOT_Y, CORE);
  drawText(c, `${bag[chosen].n} carried`, x + PAD + textWidth(entry.name) + 6, y + FOOT_Y, GREY);
  const look = lookLine(entry, told);
  if (look) drawText(c, look, x + PAD, y + LOOK_Y, GREY);
  const text = buttonText(entry);
  if (!text) return;
  const few = entry.craft && bag[chosen].n < entry.craft.of;
  if (text === SET) { button(c, x + SET_X, y + FOOT_Y - 2, text, false, SET_W); return; }
  button(c, x + BUTTON.x, y + FOOT_Y - 2, text, entry.eats ? full : few);
  if (twoButtons(entry)) button(c, x + MAKE_X, y + FOOT_Y - 2, 'MAKE', few);
}

function button(c, bx, by, text, dim, w = BUTTON.w) {
  c.fillStyle = K; c.fillRect(bx, by, w, BUTTON.h);
  frame(c, bx, by, w, BUTTON.h, dim ? LINE : EMBER);
  drawText(c, text, bx + Math.floor((w - textWidth(text)) / 2), by + 3, dim ? GREY : GOLD);
}
