// § seed card (D-394; was a page over the darkened title or room, D-191): the seed pad opens
// as a glass card as the settings card (D-389), from Settings and from the Explorer alike,
// "SEED" at its top and the round cross that goes back. The digits typed so far in an ember
// box with a cursor, the keys under it as buttons on the pad's 4-column grid, both centred
// in the card; the chosen key ember and gold as a button that can be pressed, the rest dim.
// Upright (D-506), as the name pad: the keys grow to fill the card's width, the digits twice
// as big, the box and keys at the card's foot, in thumb reach.
import { PAD, PAD_ROWS, PAD_COLS } from '../core/seedpad.js';
import { drawText, textWidth } from './font.js';
import { cardAt, drawCard, drawButton, inCard, onCross, BUTTON } from './bag.js';

const GOLD = '#ffd66b', EMBER = '#f39a3b', K = '#0e0c16';
const CELL = 34, GAP = 4; // a key's width on the grid, and the gap between keys
const ROW = BUTTON.h + GAP; // from one row of keys' top to the next
const FIELD_H = 15, FIELD_GAP = 10; // the digits' box, and the gap under it
const RULE = 20; // the card's rule under its heading, from its top
const GRID_W = PAD_COLS * CELL + (PAD_COLS - 1) * GAP;
const BLOCK_H = FIELD_H + FIELD_GAP + PAD_ROWS * ROW - GAP;
const TALL = { side: 6, gap: 3, field: 24, keyH: 32, size: 2, foot: 12 }; // upright: the inset, between keys, the box's height, a key's tallest, the digits' pixel, under the keys

// § layout: the box's and the keys' top left on a view `vw` × `vh`, centred under the rule
function padAt(vw, vh) {
  const card = cardAt(vw, vh);
  if (card.tall) {
    const g = TALL.gap, cell = Math.floor((card.w - 2 * TALL.side - (PAD_COLS - 1) * g) / PAD_COLS), keyH = Math.min(TALL.keyH, cell);
    const w = PAD_COLS * cell + (PAD_COLS - 1) * g, x = card.x + Math.floor((card.w - w) / 2);
    const y = card.y + card.h - TALL.foot - (TALL.field + FIELD_GAP + PAD_ROWS * (keyH + g) - g);
    return { card, x, y, w, cell, gap: g, keyH, fieldH: TALL.field, size: TALL.size, keysY: y + TALL.field + FIELD_GAP };
  }
  const x = card.x + Math.floor((card.w - GRID_W) / 2), y = card.y + RULE + Math.max(4, Math.floor((card.h - RULE - BLOCK_H) / 2));
  return { card, x, y, w: GRID_W, cell: CELL, gap: GAP, keyH: BUTTON.h, fieldH: FIELD_H, size: 1, keysY: y + FIELD_H + FIELD_GAP };
}
const keyBox = (pad, k) => ({ x: pad.x + k.col * (pad.cell + pad.gap), y: pad.keysY + k.row * (pad.keyH + pad.gap), w: k.span * pad.cell + (k.span - 1) * pad.gap });

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { key: i }, 'close' (the round
// cross), or null; outside the card, 'out'
export function seedCardAt(x, y, vw, vh) {
  const pad = padAt(vw, vh);
  if (!inCard(pad.card, x, y)) return 'out';
  if (onCross(pad.card, x, y)) return 'close';
  const i = PAD.findIndex((k) => {
    const b = keyBox(pad, k), half = pad.gap / 2;
    return x >= b.x - half && x < b.x + b.w + half && y >= b.y - half && y < b.y + pad.keyH + half;
  });
  return i >= 0 ? { key: i } : null;
}

// c: the room's canvas, `vw` × `vh`; entry: the digits typed; chosen: a key's index;
// still: reduced motion (the cursor stays lit)
export function drawSeedCard(c, vw, vh, entry, chosen, t, still) {
  drawCard(c, vw, vh, 'SEED', 0);
  const pad = padAt(vw, vh), { x, y, w: fw, fieldH: fh, size } = pad;
  c.fillStyle = K; c.fillRect(x, y, fw, fh);
  c.fillStyle = EMBER;
  c.fillRect(x + 1, y, fw - 2, 1); c.fillRect(x + 1, y + fh - 1, fw - 2, 1);
  c.fillRect(x, y + 1, 1, fh - 2); c.fillRect(x + fw - 1, y + 1, 1, fh - 2);
  const w = textWidth(entry) * size, cursor = entry.length < 5, tx = x + Math.floor((fw - w - (cursor ? 5 * size : 0)) / 2);
  const ty = y + Math.floor((fh - 7 * size) / 2);
  drawText(c, entry, tx, ty, GOLD, size);
  if (cursor && (still || Math.floor(t / 500) % 2 === 0)) { c.fillStyle = GOLD; c.fillRect(tx + w + (entry ? size : 0), ty + 7 * size, 4 * size, size); }
  PAD.forEach((k, i) => { const b = keyBox(pad, k); drawButton(c, b.x, b.y, k.text.toUpperCase(), i !== chosen, b.w, pad.keyH, size); });
}
