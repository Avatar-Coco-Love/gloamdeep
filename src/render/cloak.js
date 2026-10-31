// § look cards (D-399; were dark pages, P3 to P6): choosing a profile's look, each a glass card
// like the name card (D-398) on the title's scene. CLOAK in ember at its top: the hero big (3×) on
// a lit floor, the profile's name over it and the cloak's name under it (D-520); under that the six
// cloaks three to a row, each hero 1× with its name, the picked one framed in gold; sideways the
// big hero sits at the left of the boxes. OK a button in the bottom right corner, ember when the
// arrows are on it; the round cross goes back, as Back did. EYES comes next: each box the hero's
// head at 4×, in the cloak just picked. Then TRIM: each box the lantern hand at 5×, in the cloak
// and eyes picked. Last CLOTHES: the four heroes 2×, two to a row.
// heroIn (sprites.js) comes from frame.js, as the slots card's heroes do, so tests can load this.
import { CLOAK_PAD, EYES_PAD, TRIM_PAD, CLOTHES_PAD } from '../core/looks.js';
import { cardAt, drawCard, drawButton, inCard, onCross, BUTTON, TAP_PAD, isTall } from './bag.js';
import { drawText, textWidth, FONT_H } from './font.js';

const GOLD = '#ffd66b', DIM = '#4a4458', CORE = '#efe6cc', GREY = '#9790a4';
const BOX_W = 42, BOX_H = 48, GAP = 4; // a hero's framed box; boxes' spacing
const SMALL_H = 30; // the cloak card's boxes: the hero 1× and its name (D-520)
const STAGE_W = 64, STAGE_H = 56, BIG = 3; // the big hero's lit floor, and its zoom
const LINE = FONT_H + 2; // a line of text and the gap under it
const RULE = 20; // the card's rule under its heading, from its top

const colsOf = (pad) => pad.find((k) => k.id === 'ok').span; // OK spans the row of boxes
const ROWS = 2;
const bigOf = (pad) => pad === CLOAK_PAD; // the card with the big hero; the others follow (D-517)
// § layout: the boxes' top left on a view `vw` × `vh`, centred under the rule, the space above
// OK; on the cloak card the big hero's stage too, over the boxes, or at their left sideways
function boxesAt(vw, vh, pad) {
  const card = cardAt(vw, vh), cols = colsOf(pad), big = bigOf(pad), boxH = big ? SMALL_H : BOX_H, rowGap = boxH + GAP;
  const w = cols * BOX_W + (cols - 1) * GAP, h = (ROWS - 1) * rowGap + boxH;
  const top = card.y + RULE, room = (big ? card.button.y - 4 : card.y + card.h) - top; // the cloak card stops over OK
  const at = { card, boxH, rowGap };
  if (!big) return { ...at, x: card.x + Math.floor((card.w - w) / 2), y: top + Math.max(4, Math.floor((room - h) / 2)) };
  const stageH = LINE + STAGE_H + LINE; // the name, the hero, the cloak's name
  if (isTall(vw, vh)) {
    const all = stageH + 4 + h, y = top + Math.max(2, Math.floor((room - all) / 2));
    return { ...at, x: card.x + Math.floor((card.w - w) / 2), y: y + stageH + 4, stage: { x: card.x + Math.floor((card.w - STAGE_W) / 2), y } };
  }
  const all = STAGE_W + 12 + w, x = card.x + Math.floor((card.w - all) / 2);
  return { ...at, x: x + STAGE_W + 12, y: top + Math.max(4, Math.floor((room - h) / 2)), stage: { x, y: top + Math.max(2, Math.floor((room - stageH) / 2)) } };
}
const boxAt = (at, k) => ({ x: at.x + k.col * (BOX_W + GAP), y: at.y + k.row * at.rowGap });

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
    return x >= b.x - half && x < b.x + BOX_W + half && y >= b.y - half && y < b.y + at.boxH + half;
  });
  return i >= 0 ? { key: i } : null;
}

// § ground: the crypt floor under each hero, lit by its lantern, `w` × `h`; each size painted
// once (TECH.md)
const grounds = {};
function groundOf(w, h) {
  return (grounds[`${w}x${h}`] ??= paint(w, h));
}
function paint(w, h) {
  const ground = document.createElement('canvas');
  ground.width = w; ground.height = h;
  const c = ground.getContext('2d');
  c.fillStyle = '#3a4050'; c.fillRect(0, 0, w, h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const n = (x * 37 + y * 91 + x * y * 13) % 29; // a fixed speckle, no randomness needed
    if (n === 0) { c.fillStyle = '#454c5e'; c.fillRect(x, y, 1, 1); } else if (n === 7) { c.fillStyle = '#22262f'; c.fillRect(x, y, 1, 1); }
  }
  c.fillStyle = '#22262f'; c.fillRect(0, 13, w, 1); c.fillRect(0, 29, w, 1); c.fillRect(12, 0, 1, 13); c.fillRect(28, 14, 1, 15); c.fillRect(12, 30, 1, h - 30);
  const glow = c.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, w * 0.6);
  glow.addColorStop(0, 'rgba(255,214,107,.18)'); glow.addColorStop(1, 'rgba(14,12,22,.4)');
  c.fillStyle = glow; c.fillRect(0, 0, w, h);
  return ground;
}
const frame = (c, x, y, w, h, colour) => {
  c.fillStyle = colour;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1); c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
};

// § draw: one look card on the room's canvas c, `vw` × `vh`. pad: its keys; drawBox: draws key
// k's choice in its box at x, y
function drawLooks(c, vw, vh, title, pad, drawBox, picked, chosen) {
  drawCard(c, vw, vh, title, 0);
  const at = boxesAt(vw, vh, pad), { button } = at.card, ground = groundOf(BOX_W - 2, at.boxH - 2);
  c.imageSmoothingEnabled = false;
  pad.forEach((k, i) => {
    if (k.id === 'ok') { drawButton(c, button.x, button.y, 'OK', i !== chosen); return; }
    const { x, y } = boxAt(at, k);
    c.drawImage(ground, x + 1, y + 1);
    drawBox(k, x, y);
    frame(c, x, y, BOX_W, at.boxH, k.id === picked ? GOLD : DIM);
  });
  return at;
}
// Text centred on x, its top at y
const centred = (c, text, x, y, colour) => drawText(c, text, x - Math.floor(textWidth(text) / 2), y, colour);

// A whole hero 2× in its box, on its shadow
function drawWhole(c, hero, x, y) {
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + 13, y + 36, 16, 3); c.fillRect(x + 15, y + 39, 12, 1); // its shadow, 2×
  c.drawImage(hero, x + 5, y + 5, 32, 32);
}

// The cloak card's box: the hero 1× on its shadow, its name under it, gold when picked (D-520)
function drawSmall(c, hero, name, x, y, picked) {
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + 15, y + 18, 12, 2);
  c.drawImage(hero, x + 13, y + 3);
  centred(c, name, x + BOX_W / 2, y + 20, picked ? GOLD : GREY);
}
// The big hero 3× on its lit floor, `name` over it and the cloak's name under it (D-520)
function drawStage(c, hero, name, cloakName, { x, y }) {
  if (name) centred(c, name, x + STAGE_W / 2, y, CORE);
  const sy = y + LINE;
  c.drawImage(groundOf(STAGE_W, STAGE_H), x, sy);
  frame(c, x - 1, sy - 1, STAGE_W + 2, STAGE_H + 2, DIM);
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + 20, sy + 47, 24, 4); c.fillRect(x + 23, sy + 51, 18, 2); // its shadow, 3×
  c.drawImage(hero, x + (STAGE_W - 16 * BIG) / 2, sy + 2, 16 * BIG, 16 * BIG);
  centred(c, cloakName, x + STAGE_W / 2, sy + STAGE_H + 2, GOLD);
}

// c: the room's canvas, `vw` × `vh`; picked, the cloak framed in gold; eyes, trim, clothes: what
// the heroes wear; chosen: the key the arrows are on; name: the profile's, over the big hero;
// cloaks: the registry's, for the choices' names
export function drawCloaks(c, vw, vh, heroIn, picked, eyes, trim, clothes, chosen, name = '', cloaks = {}) {
  const nameOf = (id) => cloaks[id]?.name ?? '';
  const at = drawLooks(c, vw, vh, 'CLOAK', CLOAK_PAD, (k, x, y) => drawSmall(c, heroIn(k.id, eyes, trim, clothes), nameOf(k.id), x, y, k.id === picked), picked, chosen);
  drawStage(c, heroIn(picked, eyes, trim, clothes), name, nameOf(picked), at.stage);
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
