// § slots card (D-397; was a dark page of its own, D-271): the slot screen opens as a glass card
// like the settings card (D-389) on the title's scene, PROFILES in ember at its top. A framed box
// for each of the 3 slots: a profile's hero in its look on a small lit patch of crypt floor, then
// its name and its deepest depth, its play time at the right (D-290), or Empty (D-287). RENAME,
// LOOK (Change look, P3, D-289) and DELETE as buttons along its foot (D-273), like the Explorer's
// (D-395). While renaming or deleting, the card's title asks which, and that button reads CANCEL.
// The round cross goes back to the title, shown only when there is one to go back to. The question
// after Delete, Delete …?, is still a page of its own, drawn here too, with its note and Yes and No.
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth } from './font.js';
import { drawHeading, drawMarker, drawLines } from './menu.js';
import { cardAt, drawCard, drawButton, frame, inCard, onCross, BUTTON, PAD, TAP_PAD } from './bag.js';
import { SLOTS, slotName, playedText } from '../core/profile.js';

const K = '#0e0c16', GOLD = '#ffd66b', GREY = '#9790a4', CORE = '#fff5d6', DIM = '#4a4458';
const BOX_H = 30, BOX_Y = 30, BOX_GAP = 34; // each slot's box; the first box's top inside the card, and from one box's top to the next
const PATCH = 22, PATCH_X = 4, PATCH_TOP = 4; // the hero's lit patch, at the box's left
const TEXT_X = PATCH_X + PATCH + 6;
const HEADING_Y = 26; // the Delete question's line top, as the Journal page's was
const ASK_TOP = 140; // the question's Yes, with No under it

// The buttons along the foot: Rename, Change look and Delete (the one being done reads Cancel);
// text is said, label drawn. picking: null, 'rename', 'look' or 'delete'
export const slotLines = (picking) => [
  { id: 'rename', text: picking === 'rename' ? 'Cancel' : 'Rename', label: picking === 'rename' ? 'CANCEL' : 'RENAME' },
  { id: 'look', text: picking === 'look' ? 'Cancel' : 'Change look', label: picking === 'look' ? 'CANCEL' : 'LOOK' },
  { id: 'delete', text: picking === 'delete' ? 'Cancel' : 'Delete', label: picking === 'delete' ? 'CANCEL' : 'DELETE' },
];
const HEADINGS = { rename: 'Rename which?', look: 'Change whose look?', delete: 'Delete which?' };
export const slotsHeading = (picking) => HEADINGS[picking] ?? 'Profiles';

// § layout: on a view `vw` × `vh`, the card, each slot's box { x, y, w } and the buttons' row:
// { y, buttons: [{ x, w }] }, left, centred and right, each just wide enough for its word
export function slotsLayout(vw, vh, lines) {
  const card = cardAt(vw, vh), x = card.x + PAD, w = card.w - 2 * PAD;
  const boxes = Array.from({ length: SLOTS }, (_, i) => ({ x, y: card.y + BOX_Y + i * BOX_GAP, w }));
  const ws = lines.map((l) => textWidth(l.label) + 8);
  const xs = [x, card.x + Math.floor((card.w - ws[1]) / 2), x + w - ws[2]];
  return { card, boxes, row: { y: card.y + card.h - PAD - BUTTON.h, buttons: ws.map((bw, i) => ({ x: xs[i], w: bw })) } };
}

// Arrows on the card: Up and Down through the boxes and onto the buttons' row, Left and Right
// along it; chosen: a slot's number, else 3 and on for the buttons
export function moveSlots(i, dir) {
  if (i < SLOTS) return dir === 'up' ? Math.max(0, i - 1) : dir === 'down' ? i + 1 : i;
  if (dir === 'up') return SLOTS - 1;
  if (dir === 'left') return Math.max(SLOTS, i - 1);
  if (dir === 'right') return Math.min(SLOTS + 2, i + 1);
  return i;
}

// What a tap at x, y on the room's canvas picks: a slot's number, a button's id (the nearest in
// its row, so no tap is lost), 'close' (the round cross, when `back`), or null; outside the card, 'out'
export function slotsAt(x, y, vw, vh, lines, back) {
  const { card, boxes, row } = slotsLayout(vw, vh, lines);
  if (!inCard(card, x, y)) return 'out';
  if (back && onCross(card, x, y)) return 'close';
  const i = boxes.findIndex((b) => y >= b.y - 2 && y < b.y + BOX_H + 2);
  if (i >= 0) return i;
  if (y < row.y - TAP_PAD || y >= row.y + BUTTON.h + TAP_PAD) return null;
  const off = (b) => Math.abs(x - b.x - b.w / 2);
  const near = row.buttons.reduce((a, b, j) => (off(b) < off(row.buttons[a]) ? j : a), 0);
  return lines[near].id;
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
function drawPatchHero(c, hero, x, y) {
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
  const lines = slotLines(picking), { boxes, row } = slotsLayout(vw, vh, lines);
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
  lines.forEach((l, i) => drawButton(c, row.buttons[i].x, row.y, l.label, chosen !== SLOTS + i && picking !== l.id, row.buttons[i].w)); // the chosen one ember, and the one being done
}

// § ask: Delete Coco? Lost for good. Yes and No (D-271), as Start over? asks (D-238)
export function drawAsk(c, name, menu, chosen, note, t, still) {
  c.fillStyle = K; c.fillRect(0, 0, W, SCREEN_H);
  drawHeading(c, `Delete ${name}?`, HEADING_Y);
  drawText(c, note, Math.floor((W - textWidth(note)) / 2), HEADING_Y + 4, GREY);
  drawLines(c, menu, chosen, ASK_TOP, t, still);
}
export const askTop = ASK_TOP;
