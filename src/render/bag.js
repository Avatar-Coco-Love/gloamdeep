// § bag card: a glass card filling the room's canvas but for a thin edge, the
// room nearly dark around it, so its buttons sit near the thumbs (D-385; was a
// box over the room's foot, D-247). "BAG" in ember at its top left and a round
// cross at its top right that closes it. On the left, the held slot with
// "HELD" beside it, the weapon in hand (D-252), and the six slots in a 3 × 2
// grid, each an item's sprite with its count when more than one, the chosen
// slot framed in gold. On the right, the chosen item's name, how many are
// carried and its Look line (D-297), and in the bottom right corner Pour for
// one that pours, Make for one that crafts, dim with too few (D-299), or Eat
// (Drink for a potion) for one that heals, dim at full health (D-308);
// heartcaps both make and heal, so Make sits left of Eat (D-309). The
// workbench has Set down, wider, at the same right end (WB2, D-322).
import { drawText, textWidth } from './font.js';
import { drawGlass, GLASS, GLASS_EDGE as EDGE } from './glass.js';
import { BAG_SLOTS, canCraft } from '../core/bag.js';
import { get } from '../core/registry.js';
import { LINES } from '../core/lines.js';

const K = '#0e0c16', EMBER = '#f39a3b', GOLD = '#ffd66b', GREY = '#9790a4', CORE = '#efe6cc';
const LINE = 'rgba(239,230,204,.16)', SLOT_FILL = 'rgba(14,12,22,.55)';
export const EDGE_GAP = 8; // the room's edge left showing around the card
export const CARD_VEIL = 0.85; // the room's dimming around and under the card
export const SLOT = 30;
export const SLOT_GAP = 4;
const COLS = 3;
export const PAD = 12;
export const HELD_Y = 30; // the held slot's top, and the item's name's on the right
export const LINE_H = 12;
const RULE_Y = 20, GRID_Y = 70;
const GRID_W = COLS * SLOT + (COLS - 1) * SLOT_GAP;
const HELD = 'HELD', HELD_X = PAD + textWidth(HELD) + 6;
export const SPLIT_X = PAD + GRID_W + 12; // the line between the slots and the item, from the card's left
export const DETAIL_X = SPLIT_X + 9;
// The button for an item: Pour, Make, Eat, Drink, Hold (a weapon, D-479), Fit (a lantern part, D-483) or Wear (armour, D-484),
// the same size, in the bottom right corner;
// Make, for an item that also heals, just left of it
export const BUTTON = { w: Math.max(textWidth('POUR'), textWidth('MAKE'), textWidth('EAT'), textWidth('DRINK'), textWidth('HOLD'), textWidth('FIT'), textWidth('WEAR')) + 8, h: 13 };
const SET = 'SET DOWN', SET_W = textWidth(SET) + 8; // Set down's own width
const buttonText = (entry) => (entry.oil ? 'POUR' : entry.eats ? entry.verb ?? 'EAT' : entry.craft ? 'MAKE' : entry.sets ? SET : entry.hold ? 'HOLD' : entry.part ? 'FIT' : entry.wear ? 'WEAR' : null);
// Whether an item shows Make beside its Eat
export const twoButtons = (entry) => !!(entry?.craft && entry.eats);
export const TAP_PAD = 4; // game pixels around a slot, the cross or a button that still pick it

// § tall: a view taller than wide, a phone held upright (D-505). A card's two sides
// stand one above the other there, the line between them across the card
export const isTall = (vw, vh) => vh > vw;
export const TALL_SPLIT_Y = GRID_Y + 2 * SLOT + SLOT_GAP + 12; // upright, the line under the bag's slots, from the card's top
// Where the chosen thing's words start: right of the line sideways, `left` from the card's
// left and `top` from its top; upright, under the line across, `splitY` from its top
export const detailAt = (card, vw, vh, left = DETAIL_X, top = HELD_Y, splitY = TALL_SPLIT_Y) => (isTall(vw, vh)
  ? { dx: card.x + PAD, dy: card.y + splitY + 10 } : { dx: card.x + left, dy: card.y + top });

// § layout: the card and its parts on a view `vw` × `vh` game pixels
export function cardAt(vw, vh) {
  const x = EDGE_GAP, y = EDGE_GAP, w = Math.max(0, vw - 2 * EDGE_GAP), h = Math.max(0, vh - 2 * EDGE_GAP);
  const by = y + h - PAD - BUTTON.h, bx = x + w - PAD - BUTTON.w;
  return { x, y, w, h, tall: isTall(vw, vh), close: { x: x + w - 12, y: y + 11, r: 8 }, button: { x: bx, y: by }, make: { x: bx - 4 - BUTTON.w, y: by }, set: { x: bx + BUTTON.w - SET_W, y: by } };
}
// Slot i's top left in the 3 × 2 grid, whose top is `top` and left `left` inside the card's,
// `cols` wide (the stash chest's 4 × 3, D-387)
export const slotAt = (card, i, top = GRID_Y, cols = COLS, left = PAD) => ({ x: card.x + left + (i % cols) * (SLOT + SLOT_GAP), y: card.y + top + Math.floor(i / cols) * (SLOT + SLOT_GAP) });
// The grid's slot at x, y, or -1, for a grid of `count` slots
export function gridAt(card, x, y, top = GRID_Y, cols = COLS, count = BAG_SLOTS, left = PAD) {
  for (let i = 0; i < count; i++) {
    const s = slotAt(card, i, top, cols, left), half = SLOT_GAP / 2;
    if (x >= s.x - half && x < s.x + SLOT + half && y >= s.y - half && y < s.y + SLOT + half) return i;
  }
  return -1;
}
export const inCard = (card, x, y) => x >= card.x && x < card.x + card.w && y >= card.y && y < card.y + card.h;
export const onCross = ({ close }, x, y) => Math.hypot(x - close.x, y - close.y) <= close.r + TAP_PAD;

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { slot: i }, 'act' (Pour,
// Make, Eat, Drink, or Set down, when `wide`), 'make' (Make beside Eat, when `two`),
// 'close' (the round cross), or null; outside the card, 'out'
export function bagAt(x, y, vw, vh, two = false, wide = false) {
  const card = cardAt(vw, vh), { button, make, set } = card;
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  const i = gridAt(card, x, y);
  if (i >= 0) return { slot: i };
  const foot = y >= button.y - TAP_PAD && y < button.y + BUTTON.h + TAP_PAD;
  if (foot && x >= (wide ? set.x : button.x) - (two ? 2 : TAP_PAD) && x < button.x + BUTTON.w + TAP_PAD) return 'act';
  if (two && foot && x >= make.x - TAP_PAD && x < button.x) return 'make';
  return null;
}

// § wrap: words into lines no wider than `w` game pixels
export function wrapWords(text, w) {
  const lines = [];
  for (const word of text.split(' ')) {
    const last = lines.length - 1;
    if (last >= 0 && textWidth(`${lines[last]} ${word}`) <= w) lines[last] += ` ${word}`;
    else lines.push(word);
  }
  return lines;
}

// The item's Look line last said, or its first before any (D-297); null for an item with none
export function lookLine(entry, told = {}) {
  const texts = entry?.look && LINES[entry.look]?.texts;
  if (!texts) return null;
  return texts[((told[entry.look] ?? 1) - 1 + texts.length) % texts.length];
}

export function frame(c, x, y, w, h, colour) {
  c.fillStyle = colour;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1);
  c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
}

// § round: a pixel disc on the glass with its light edge, as the corner buttons; edge: its rim's colour
export function round(c, cx, cy, r, edge = EDGE) {
  for (let dy = -r; dy <= r; dy++) {
    const w = Math.floor(Math.sqrt(r * r - dy * dy));
    c.fillStyle = GLASS; c.fillRect(cx - w, cy + dy, 2 * w + 1, 1);
    c.fillStyle = edge; c.fillRect(cx - w, cy + dy, 1, 1); c.fillRect(cx + w, cy + dy, 1, 1);
  }
  c.fillStyle = edge;
  for (let dx = -r; dx <= r; dx++) { const h = Math.floor(Math.sqrt(r * r - dx * dx)); c.fillRect(cx + dx, cy - h, 1, 1); c.fillRect(cx + dx, cy + h, 1, 1); }
}
// The cross on it, as the close icon's 5 × 5 (hud.js), its middle at cx, cy
export function cross(c, cx, cy) {
  c.fillStyle = GREY;
  for (let i = 0; i < 5; i++) { c.fillRect(cx - 2 + i, cy - 2 + i, 1, 1); c.fillRect(cx + 2 - i, cy - 2 + i, 1, 1); }
}

export function drawSlot(c, x, y, item, chosen, spriteOf) {
  c.fillStyle = SLOT_FILL; c.fillRect(x + 1, y + 1, SLOT - 2, SLOT - 2);
  frame(c, x, y, SLOT, SLOT, chosen ? GOLD : LINE);
  if (!item) return;
  c.drawImage(spriteOf(item), x + 7, y + 7);
  if (item.n > 1) {
    const n = String(item.n), nw = textWidth(n);
    c.fillStyle = K; c.fillRect(x + SLOT - 4 - nw, y + SLOT - 11, nw + 2, 9);
    drawText(c, n, x + SLOT - 3 - nw, y + SLOT - 10, CORE);
  }
}

// § card: the room nearly dark, the glass card on it with `title` in ember top left, the round
// cross top right, a rule under them and the line between the slots and the item, `split` from
// the card's left (none for 0, Settings' one column, D-389), the cross left out when `crossed` is
// false (the profiles at the game's start, D-397); gives cardAt's card. Upright (isTall), the
// line goes across instead, `splitY` from the card's top (D-505), none when that is 0
export function drawCard(c, vw, vh, title, split = SPLIT_X, crossed = true, splitY = TALL_SPLIT_Y) {
  c.fillStyle = K; c.globalAlpha = CARD_VEIL; c.fillRect(0, 0, vw, vh); c.globalAlpha = 1;
  const card = cardAt(vw, vh), { x, y, w, h, close } = card;
  drawGlass(c, x, y, w, h);
  drawText(c, title, x + PAD, y + 7, EMBER);
  if (crossed) { round(c, close.x, close.y, close.r); cross(c, close.x, close.y); }
  c.fillStyle = LINE; c.fillRect(x + 8, y + RULE_Y, w - 16, 1);
  if (split && isTall(vw, vh)) { if (splitY) c.fillRect(x + 8, y + splitY, w - 16, 1); }
  else if (split) c.fillRect(x + split, y + RULE_Y + 8, 1, h - RULE_Y - 16);
  return card;
}

// c: the room's canvas, `vw` × `vh`; bag: [{ id, n, form? }]; chosen: the slot picked;
// spriteOf: a slot's or item's sprite (sprites.js); held: the weapon in hand's id, or
// null; full: whether the hero is at full health; told: the state's told lines (D-297)
export function drawBag(c, vw, vh, bag, chosen, spriteOf, held = null, full = false, told = {}) {
  const card = drawCard(c, vw, vh, 'BAG'), { x, y, w } = card;
  drawText(c, HELD, x + PAD, y + HELD_Y + 11, GREY);
  drawSlot(c, x + HELD_X, y + HELD_Y, held && { id: held, n: 1 }, false, spriteOf);
  for (let i = 0; i < BAG_SLOTS; i++) { const s = slotAt(card, i); drawSlot(c, s.x, s.y, bag[i], i === chosen, spriteOf); }
  const entry = bag[chosen] && get(bag[chosen].id);
  if (!entry) return;
  const { dx, dy } = detailAt(card, vw, vh), dw = x + w - PAD - dx; // upright, under the slots, the card's width (D-505)
  drawText(c, entry.name, dx, dy, CORE);
  drawText(c, `${bag[chosen].n} carried`, dx, dy + LINE_H, GREY);
  const look = lookLine(entry, told);
  if (look) wrapWords(look, dw).forEach((l, i) => drawText(c, l, dx, dy + 2.5 * LINE_H + i * LINE_H, GREY));
  const text = buttonText(entry);
  if (!text) return;
  const few = entry.craft && !canCraft(bag, chosen);
  if (text === SET) { drawButton(c, card.set.x, card.set.y, text, false, SET_W); return; }
  drawButton(c, card.button.x, card.button.y, text, entry.eats ? full : few);
  if (twoButtons(entry)) drawButton(c, card.make.x, card.make.y, 'MAKE', few);
}

// h and size: a taller button and bigger letters (the name pad's keys, D-420)
export function drawButton(c, bx, by, text, dim, w = BUTTON.w, h = BUTTON.h, size = 1) {
  c.fillStyle = K; c.fillRect(bx, by, w, h);
  frame(c, bx, by, w, h, dim ? LINE : EMBER);
  drawText(c, text, bx + Math.floor((w - textWidth(text) * size) / 2), by + Math.floor((h - 7 * size) / 2), dim ? GREY : GOLD, size);
}
