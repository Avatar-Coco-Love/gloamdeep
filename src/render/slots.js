// § slots card (D-397; was a dark page of its own, D-271): the slot screen opens as a glass card
// like the settings card (D-389) on the title's scene, PROFILES in ember at its top. A framed box
// for each of the 3 slots: a profile's hero in its look on a small lit patch of crypt floor, then
// its name and its deepest depth, its play time at the right (D-290), or Empty (D-287).
// CHANGE LOOK (P3, D-289) as a wide button over RENAME and DELETE at its foot (D-273, D-513), like
// the Explorer's (D-395); each row's taps reach past its buttons, at least 44 px tall (D-513).
// While renaming or deleting, the card's title asks which, and that button reads CANCEL.
// The round cross goes back to the title, shown only when there is one to go back to. The question
// after Delete, Delete …?, is the ask card (askcard.js, D-400).
import { drawText, textWidth } from './font.js';
import { drawMarker } from './menu.js';
import { cardAt, drawCard, drawButton, frame, inCard, onCross, BUTTON, PAD, TAP_PAD } from './bag.js';
import { SLOTS, slotName, playedText } from '../core/profile.js';

const GOLD = '#ffd66b', GREY = '#9790a4', CORE = '#fff5d6', DIM = '#4a4458';
export const BOX_H = 30; const BOX_Y = 30, BOX_GAP = 34; // each slot's box; the first box's top inside the card, and from one box's top to the next
const PATCH = 22, PATCH_X = 4, PATCH_TOP = 4; // the hero's lit patch, at the box's left
export const TEXT_X = PATCH_X + PATCH + 6; // a profile's name and depth, from its box's left; the title's chip too (D-401)

// The buttons along the foot: Rename, Change look and Delete (the one being done reads Cancel);
// text is said, label drawn. picking: null, 'rename', 'look' or 'delete'
export const slotLines = (picking) => [
  { id: 'rename', text: picking === 'rename' ? 'Cancel' : 'Rename', label: picking === 'rename' ? 'CANCEL' : 'RENAME' },
  { id: 'look', text: picking === 'look' ? 'Cancel' : 'Change look', label: picking === 'look' ? 'CANCEL' : 'CHANGE LOOK' },
  { id: 'delete', text: picking === 'delete' ? 'Cancel' : 'Delete', label: picking === 'delete' ? 'CANCEL' : 'DELETE' },
];
const HEADINGS = { rename: 'Rename which?', look: 'Change whose look?', delete: 'Delete which?' };
export const slotsHeading = (picking) => HEADINGS[picking] ?? 'Profiles';

// § layout: on a view `vw` × `vh`, the card, each slot's box { x, y, w } and each line's button
// { x, y, w }: Change look the boxes' width, over Rename at the left and Delete at the right (D-513)
const ROW_GAP = 6; // between Change look and the foot's row
export function slotsLayout(vw, vh, lines) {
  const card = cardAt(vw, vh), x = card.x + PAD, w = card.w - 2 * PAD;
  const boxes = Array.from({ length: SLOTS }, (_, i) => ({ x, y: card.y + BOX_Y + i * BOX_GAP, w }));
  const foot = card.y + card.h - PAD - BUTTON.h, ws = lines.map((l) => textWidth(l.label) + 8);
  const buttons = [{ x, y: foot, w: ws[0] }, { x, y: foot - ROW_GAP - BUTTON.h, w }, { x: x + w - ws[2], y: foot, w: ws[2] }];
  return { card, boxes, buttons };
}

// Arrows on the card: Up and Down through the boxes, onto Change look, then the foot's row, Left
// and Right along it; chosen: a slot's number, else 3 and on for the lines (Rename, Change look, Delete)
const RENAME = SLOTS, LOOK = SLOTS + 1, DELETE = SLOTS + 2;
export function moveSlots(i, dir) {
  if (i < SLOTS) return dir === 'up' ? Math.max(0, i - 1) : dir === 'down' ? (i + 1 < SLOTS ? i + 1 : LOOK) : i;
  if (i === LOOK) return dir === 'up' ? SLOTS - 1 : dir === 'down' ? RENAME : i;
  if (dir === 'up') return LOOK;
  if (dir === 'left') return RENAME;
  if (dir === 'right') return DELETE;
  return i;
}

// What a tap at x, y on the room's canvas picks: a slot's number, a button's id, 'close' (the round
// cross, when `back`), or null; outside the card, 'out'. Change look's band runs from a little over
// it to halfway down the gap; under that to the card's foot, the nearest of Rename and Delete, so no
// tap is lost and each band is at least 22 game pixels, 44 px at the phone's zoom of 2 (D-513)
export function slotsAt(x, y, vw, vh, lines, back) {
  const { card, boxes, buttons } = slotsLayout(vw, vh, lines);
  if (!inCard(card, x, y)) return 'out';
  if (back && onCross(card, x, y)) return 'close';
  const i = boxes.findIndex((b) => y >= b.y - 2 && y < b.y + BOX_H + 2);
  if (i >= 0) return i;
  const look = buttons[1], split = look.y + BUTTON.h + ROW_GAP / 2;
  if (y >= split) return Math.abs(x - buttons[0].x - buttons[0].w / 2) <= Math.abs(x - buttons[2].x - buttons[2].w / 2) ? lines[0].id : lines[2].id;
  if (y >= look.y - 2 * TAP_PAD && y > boxes[SLOTS - 1].y + BOX_H + 2) return lines[1].id;
  return null;
}
// § patch: a small square of crypt floor lit by the hero's lantern, as the Look boxes'; painted once (TECH.md)
let patch = null;
function paint() {
  patch = document.createElement('canvas');
  patch.width = PATCH; patch.height = PATCH;
  const c = patch.getContext('2d');
  c.fillStyle = '#3a4050'; c.fillRect(0, 0, PATCH, PATCH);
  for (let y = 0; y < PATCH; y++) for (let x = 0; x < PATCH; x++) {
    const n = (x * 37 + y * 91 + x * y * 13) % 29; // a fixed speckle, no randomness needed
    if (n === 0) { c.fillStyle = '#454c5e'; c.fillRect(x, y, 1, 1); } else if (n === 7) { c.fillStyle = '#22262f'; c.fillRect(x, y, 1, 1); }
  }
  const glow = c.createRadialGradient(PATCH / 2, PATCH / 2, 1, PATCH / 2, PATCH / 2, PATCH * 0.7);
  glow.addColorStop(0, 'rgba(255,214,107,.18)'); glow.addColorStop(1, 'rgba(14,12,22,.55)');
  c.fillStyle = glow; c.fillRect(0, 0, PATCH, PATCH);
}
// A hero's sprite, 1×, on its patch and shadow, in the box at x, y
export function drawPatchHero(c, hero, x, y) {
  if (!patch) paint();
  const px = x + PATCH_X, py = y + PATCH_TOP, hx = px + 3, hy = py + 2;
  c.drawImage(patch, px, py);
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(hx + 3, hy + 14, 10, 2); c.fillRect(hx + 4, hy + 16, 8, 1); // its shadow
  c.drawImage(hero, hx, hy);
}
// § draw: c, the room's canvas, `vw` × `vh`; ps, the profiles; heroOf: a profile's hero sprite in
// its look (sprites.js, kept out of here so the tests can load this file); chosen: a slot's number,
// else 3 and on for the buttons; picking: as slotLines'; back: whether the round cross shows;
// still: reduced motion
export function drawSlots(c, vw, vh, ps, heroOf, chosen, picking, back, t, still) {
  const lines = slotLines(picking), { boxes, buttons } = slotsLayout(vw, vh, lines);
  drawCard(c, vw, vh, slotsHeading(picking).toUpperCase(), 0, back);
  ps.slots.forEach((p, i) => {
    const { x, y, w } = boxes[i], on = chosen === i;
    frame(c, x, y, w, BOX_H, on ? GOLD : DIM);
    if (p) {
      drawPatchHero(c, heroOf(p), x, y);
      drawText(c, slotName(p, i), x + TEXT_X, y + 6, on ? GOLD : CORE);
      drawText(c, `Deepest  ${p.records.deepest}`, x + TEXT_X, y + 17, GREY);
      drawText(c, String(i + 1), x + w - 8 - textWidth(String(i + 1)), y + 6, DIM);
      const time = playedText(p.played);
      drawText(c, time, x + w - 8 - textWidth(time), y + 17, GREY);
    } else drawText(c, 'Empty', x + Math.floor((w - textWidth('Empty')) / 2), y + 11, DIM);
    if (on) drawMarker(c, x - 7, y + 13, t, still);
  });
  lines.forEach((l, i) => drawButton(c, buttons[i].x, buttons[i].y, l.label, chosen !== SLOTS + i && picking !== l.id, buttons[i].w)); // the chosen one ember, and the one being done
}

