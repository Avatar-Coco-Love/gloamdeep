// § name card (D-398; was a dark page, D-272, D-288): the name pad opens as a glass card as
// the seed card (D-394), on the title's scene, "NAME" at its top (or "RENAME", D-273) and the
// round cross that goes back. The letters typed so far in an ember box with a cursor across
// the card, the keys under it split for thumbs (D-420): A to M hugging the card's left side,
// N to Z its right, the middle left open. Keys grow to fill the card, their letters and the
// typed name twice as big; the chosen key ember and gold as a button that can be pressed,
// the rest dim. Upright (D-506), the keys are square and closer, the box and keys at the
// card's foot, in thumb reach. The hero big over the box, the typed name over it, and two dots
// for a new hero's steps (D-517, D-524); RENAME shows the profile's own hero, with no dots.
import { NAME_PAD, NAME_ROWS, NAME_MAX } from '../core/namepad.js';
import { drawText, textWidth } from './font.js';
import { cardAt, drawCard, drawButton, inCard, onCross } from './bag.js';
import { drawStage, stageSize, drawDots } from './cloak.js';

const GOLD = '#ffd66b', EMBER = '#f39a3b', K = '#0e0c16';
const SIZE = 2; // the letters' pixel, twice the game's (D-420)
const GAP = 5; // between keys
const SIDE = 12, TOP = 4; // the pad's inset from the card's sides, and under its rule
const MID = 24; // the open middle between the halves, at least
const MAX_W = 48, MAX_H = 32; // a key's largest width and height, on a big card
const FIELD_H = 24, FIELD_GAP = 8; // the letters' box, and the gap under it
const RULE = 20; // the card's rule under its heading, from its top
const TALL = { side: 6, mid: 12, gap: 3, foot: 12 }; // upright: the insets, the open middle, between keys, and under the keys

// § layout: the box's top left and width, the keys' top, a key's width and height and each
// half's left, on a view `vw` × `vh`
function padAt(vw, vh) {
  const card = cardAt(vw, vh), tall = card.tall;
  const side = tall ? TALL.side : SIDE, mid = tall ? TALL.mid : MID, gap = tall ? TALL.gap : GAP;
  const room = card.h - RULE - 2 * TOP - FIELD_H - FIELD_GAP + gap;
  const cell = Math.min(MAX_W, Math.floor((card.w - 2 * side - mid - 6 * gap) / 8));
  const keyH = Math.min(tall ? cell : MAX_H, Math.floor(room / NAME_ROWS) - gap);
  const halfW = 4 * cell + 3 * gap, x = card.x + side, w = card.w - 2 * side;
  const block = FIELD_H + FIELD_GAP + NAME_ROWS * (keyH + gap) - gap;
  const y = tall ? card.y + card.h - TALL.foot - block : card.y + RULE + TOP + Math.max(0, Math.floor((room - NAME_ROWS * (keyH + GAP)) / 2));
  return { card, x, y, w, gap, keysY: y + FIELD_H + FIELD_GAP, cell, keyH, lefts: [x, x + w - halfW] };
}
const keyBox = (pad, k) => {
  const side = k.col < 4 ? 0 : 1;
  return { x: pad.lefts[side] + (k.col - 4 * side) * (pad.cell + pad.gap), y: pad.keysY + k.row * (pad.keyH + pad.gap), w: k.span * pad.cell + (k.span - 1) * pad.gap };
};

// § hero: the big hero over the pad (D-517, D-524), as big as fits, 2× to 6×: upright just under
// the rule, as in mock-up A; sideways in the open middle between the halves; null if it can't fit
const ZOOMS = [6, 5, 4, 3, 2];
function stageAt(pad) {
  const { card } = pad, tall = card.tall;
  const top = tall ? card.y + RULE + 4 : pad.keysY, bottom = tall ? pad.y - 4 : pad.keysY + NAME_ROWS * (pad.keyH + pad.gap) - pad.gap;
  const left = tall ? card.x + 8 : pad.lefts[0] + 4 * pad.cell + 3 * pad.gap + 4, right = tall ? card.x + card.w - 8 : pad.lefts[1] - 4;
  const z = ZOOMS.find((k) => { const s = stageSize(k); return s.w + 2 <= right - left && s.h + 2 <= bottom - top; });
  if (!z) return null;
  const s = stageSize(z);
  return { x: Math.floor((left + right - s.w) / 2), y: tall ? top + 6 : top + Math.floor((bottom - top - s.h) / 2), z };
}

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { key: i }, 'close' (the round
// cross), or null; outside the card, 'out'
export function nameCardAt(x, y, vw, vh) {
  const pad = padAt(vw, vh);
  if (!inCard(pad.card, x, y)) return 'out';
  if (onCross(pad.card, x, y)) return 'close';
  const i = NAME_PAD.findIndex((k) => {
    const b = keyBox(pad, k), half = pad.gap / 2;
    return x >= b.x - half && x < b.x + b.w + half && y >= b.y - half && y < b.y + pad.keyH + half;
  });
  return i >= 0 ? { key: i } : null;
}

// c: the room's canvas, `vw` × `vh`; entry: the letters typed; chosen: a key's index;
// still: reduced motion (the cursor stays lit); renaming: RENAME at its top instead of NAME;
// hero: the hero's sprite in its look (sprites.js), or null for none
export function drawNameCard(c, vw, vh, entry, chosen, t, still, renaming, hero = null) {
  const title = renaming ? 'RENAME' : 'NAME', card = drawCard(c, vw, vh, title, 0);
  if (!renaming) drawDots(c, card, title, 0, 2); // a new hero's first step of two
  const pad = padAt(vw, vh), { x, y, w: fw } = pad;
  const stage = hero && stageAt(pad);
  if (stage) { c.imageSmoothingEnabled = false; drawStage(c, hero, entry, '', stage); }
  c.fillStyle = K; c.fillRect(x, y, fw, FIELD_H);
  c.fillStyle = EMBER;
  c.fillRect(x + 1, y, fw - 2, 1); c.fillRect(x + 1, y + FIELD_H - 1, fw - 2, 1);
  c.fillRect(x, y + 1, 1, FIELD_H - 2); c.fillRect(x + fw - 1, y + 1, 1, FIELD_H - 2);
  const w = textWidth(entry) * SIZE, cursor = entry.length < NAME_MAX, tx = x + Math.floor((fw - w - (cursor ? 5 * SIZE : 0)) / 2);
  const ty = y + Math.floor((FIELD_H - 7 * SIZE) / 2);
  drawText(c, entry, tx, ty, GOLD, SIZE);
  if (cursor && (still || Math.floor(t / 500) % 2 === 0)) { c.fillStyle = GOLD; c.fillRect(tx + w + (entry ? SIZE : 0), ty + 7 * SIZE + 1, 4 * SIZE, SIZE); }
  NAME_PAD.forEach((k, i) => { const b = keyBox(pad, k); drawButton(c, b.x, b.y, k.text.toUpperCase(), i !== chosen, b.w, pad.keyH, SIZE); });
}
