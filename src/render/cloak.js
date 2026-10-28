// § look cards (D-399; were dark pages, P3 to P6): choosing a profile's look, each a glass card
// like the name card (D-398) on the title's scene. CLOAK in ember at its top: the six heroes three
// to a row, each 2× on a patch of lit crypt floor in its cloak, the picked one framed in gold, both
// rows centred in the card; OK a button in the bottom right corner, ember when the arrows are on
// it; the round cross goes back, as Back did. EYES comes next and has the same shape: each box
// the hero's head at 4×, in the cloak just picked. Then TRIM: each box the lantern hand at 5×, in
// the cloak and eyes picked. Last CLOTHES: the four heroes two to a row, as on the cloak card.
// heroIn (sprites.js) comes from frame.js, as the slots card's heroes do, so tests can load this.
import { CLOAK_PAD, EYES_PAD, TRIM_PAD, CLOTHES_PAD } from '../core/looks.js';
import { cardAt, drawCard, drawButton, inCard, onCross, BUTTON, TAP_PAD } from './bag.js';

const GOLD = '#ffd66b', DIM = '#4a4458';
const BOX_W = 42, BOX_H = 48, GAP = 4, ROW_GAP = 52; // a hero's framed box; boxes' spacing
const RULE = 20; // the card's rule under its heading, from its top

const colsOf = (pad) => pad.find((k) => k.id === 'ok').span; // OK spans the row of boxes
const ROWS = 2;
// § layout: the boxes' top left on a view `vw` × `vh`, centred under the rule
function boxesAt(vw, vh, pad) {
  const card = cardAt(vw, vh), cols = colsOf(pad);
  const w = cols * BOX_W + (cols - 1) * GAP, h = (ROWS - 1) * ROW_GAP + BOX_H;
  return { card, x: card.x + Math.floor((card.w - w) / 2), y: card.y + RULE + Math.max(4, Math.floor((card.h - RULE - h) / 2)) };
}
const boxAt = (at, k) => ({ x: at.x + k.col * (BOX_W + GAP), y: at.y + k.row * ROW_GAP });

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks on the card of pad (CLOAK_PAD,
// or EYES_PAD and TRIM_PAD, the same shape, or CLOTHES_PAD): { key: i }, 'close' (the round
// cross), or null; outside the card, 'out'
export function lookCardAt(x, y, vw, vh, pad = CLOAK_PAD) {
  const at = boxesAt(vw, vh, pad), { card } = at, { button } = card;
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  const i = pad.findIndex((k) => {
    if (k.id === 'ok') return x >= button.x - TAP_PAD && x < button.x + BUTTON.w + TAP_PAD && y >= button.y - TAP_PAD && y < button.y + BUTTON.h + TAP_PAD;
    const b = boxAt(at, k), half = GAP / 2;
    return x >= b.x - half && x < b.x + BOX_W + half && y >= b.y - half && y < b.y + BOX_H + half;
  });
  return i >= 0 ? { key: i } : null;
}

// § ground: the crypt floor under each hero, lit by its lantern; painted once (TECH.md)
let ground = null;
function paint() {
  ground = document.createElement('canvas');
  ground.width = BOX_W - 2; ground.height = BOX_H - 2;
  const c = ground.getContext('2d'), w = ground.width, h = ground.height;
  c.fillStyle = '#3a4050'; c.fillRect(0, 0, w, h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const n = (x * 37 + y * 91 + x * y * 13) % 29; // a fixed speckle, no randomness needed
    if (n === 0) { c.fillStyle = '#454c5e'; c.fillRect(x, y, 1, 1); } else if (n === 7) { c.fillStyle = '#22262f'; c.fillRect(x, y, 1, 1); }
  }
  c.fillStyle = '#22262f'; c.fillRect(0, 13, w, 1); c.fillRect(0, 29, w, 1); c.fillRect(12, 0, 1, 13); c.fillRect(28, 14, 1, 15); c.fillRect(12, 30, 1, h - 30);
  const glow = c.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, w * 0.6);
  glow.addColorStop(0, 'rgba(255,214,107,.18)'); glow.addColorStop(1, 'rgba(14,12,22,.4)');
  c.fillStyle = glow; c.fillRect(0, 0, w, h);
}
const frame = (c, x, y, w, h, colour) => {
  c.fillStyle = colour;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1); c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
};

// § draw: one look card on the room's canvas c, `vw` × `vh`. pad: its keys; drawBox: draws key
// k's choice in its box at x, y
function drawLooks(c, vw, vh, title, pad, drawBox, picked, chosen) {
  if (!ground) paint();
  drawCard(c, vw, vh, title, 0);
  const at = boxesAt(vw, vh, pad), { button } = at.card;
  c.imageSmoothingEnabled = false;
  pad.forEach((k, i) => {
    if (k.id === 'ok') { drawButton(c, button.x, button.y, 'OK', i !== chosen); return; }
    const { x, y } = boxAt(at, k);
    c.drawImage(ground, x + 1, y + 1);
    drawBox(k, x, y);
    frame(c, x, y, BOX_W, BOX_H, k.id === picked ? GOLD : DIM);
  });
}

// A whole hero 2× in its box, on its shadow
function drawWhole(c, hero, x, y) {
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + 13, y + 36, 16, 3); c.fillRect(x + 15, y + 39, 12, 1); // its shadow, 2×
  c.drawImage(hero, x + 5, y + 5, 32, 32);
}

// c: the room's canvas, `vw` × `vh`; picked, the cloak framed in gold; eyes, trim, clothes: what
// the heroes wear; chosen: the key the arrows are on
export function drawCloaks(c, vw, vh, heroIn, picked, eyes, trim, clothes, chosen) {
  drawLooks(c, vw, vh, 'CLOAK', CLOAK_PAD, (k, x, y) => drawWhole(c, heroIn(k.id, eyes, trim, clothes), x, y), picked, chosen);
}

// The head: the sprite's pixels 3 to 12 across and 1 to 8 down, the hood and eyes, not the lantern
const HEAD = { x: 3, y: 1, w: 10, h: 8 };
// cloak: the one just picked; picked, the eyes framed in gold
export function drawEyes(c, vw, vh, heroIn, cloak, picked, chosen) {
  drawLooks(c, vw, vh, 'EYES', EYES_PAD, (k, x, y) => {
    c.drawImage(heroIn(cloak, k.id), HEAD.x, HEAD.y, HEAD.w, HEAD.h, x + 1, y + 8, HEAD.w * 4, HEAD.h * 4);
  }, picked, chosen);
}

// The lantern hand: the sprite's pixels 9 to 15 across and 7 to 12 down, the lantern held out
// from the cloak, at 5× so the cap and base show
const HAND = { x: 9, y: 7, w: 7, h: 6 }, HAND_SCALE = 5;
// cloak, eyes, clothes: the ones picked; picked, the trim framed in gold
export function drawTrims(c, vw, vh, heroIn, cloak, eyes, picked, clothes, chosen) {
  drawLooks(c, vw, vh, 'TRIM', TRIM_PAD, (k, x, y) => {
    c.drawImage(heroIn(cloak, eyes, k.id, clothes), HAND.x, HAND.y, HAND.w, HAND.h, x + 3, y + 9, HAND.w * HAND_SCALE, HAND.h * HAND_SCALE);
  }, picked, chosen);
}

// cloak, eyes, trim: the ones just picked; picked, the clothes framed in gold
export function drawClothes(c, vw, vh, heroIn, cloak, eyes, trim, picked, chosen) {
  drawLooks(c, vw, vh, 'CLOTHES', CLOTHES_PAD, (k, x, y) => drawWhole(c, heroIn(cloak, eyes, trim, k.id), x, y), picked, chosen);
}
