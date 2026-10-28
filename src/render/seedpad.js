// § seed card (D-394; was a page over the darkened title or room, D-191): the seed pad opens
// as a glass card as the settings card (D-389), from Settings and from the Explorer alike,
// "SEED" at its top and the round cross that goes back. The digits typed so far in an ember
// box with a cursor, the keys under it as buttons on the pad's 4-column grid, both centred
// in the card; the chosen key ember and gold as a button that can be pressed, the rest dim.
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

// § layout: the box's and the keys' top left on a view `vw` × `vh`, centred under the rule
function padAt(vw, vh) {
  const card = cardAt(vw, vh);
  const x = card.x + Math.floor((card.w - GRID_W) / 2), y = card.y + RULE + Math.max(4, Math.floor((card.h - RULE - BLOCK_H) / 2));
  return { card, x, y, keysY: y + FIELD_H + FIELD_GAP };
}
const keyBox = (pad, k) => ({ x: pad.x + k.col * (CELL + GAP), y: pad.keysY + k.row * ROW, w: k.span * CELL + (k.span - 1) * GAP });

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { key: i }, 'close' (the round
// cross), or null; outside the card, 'out'
export function seedCardAt(x, y, vw, vh) {
  const pad = padAt(vw, vh);
  if (!inCard(pad.card, x, y)) return 'out';
  if (onCross(pad.card, x, y)) return 'close';
  const i = PAD.findIndex((k) => {
    const b = keyBox(pad, k), half = GAP / 2;
    return x >= b.x - half && x < b.x + b.w + half && y >= b.y - half && y < b.y + BUTTON.h + half;
  });
  return i >= 0 ? { key: i } : null;
}

// c: the room's canvas, `vw` × `vh`; entry: the digits typed; chosen: a key's index;
// still: reduced motion (the cursor stays lit)
export function drawSeedCard(c, vw, vh, entry, chosen, t, still) {
  drawCard(c, vw, vh, 'SEED', 0);
  const pad = padAt(vw, vh), { x, y } = pad;
  c.fillStyle = K; c.fillRect(x, y, GRID_W, FIELD_H);
  c.fillStyle = EMBER;
  c.fillRect(x + 1, y, GRID_W - 2, 1); c.fillRect(x + 1, y + FIELD_H - 1, GRID_W - 2, 1);
  c.fillRect(x, y + 1, 1, FIELD_H - 2); c.fillRect(x + GRID_W - 1, y + 1, 1, FIELD_H - 2);
  const w = textWidth(entry), cursor = entry.length < 5, tx = x + Math.floor((GRID_W - w - (cursor ? 5 : 0)) / 2);
  drawText(c, entry, tx, y + 4, GOLD);
  if (cursor && (still || Math.floor(t / 500) % 2 === 0)) { c.fillStyle = GOLD; c.fillRect(tx + w + (entry ? 1 : 0), y + 11, 4, 1); }
  PAD.forEach((k, i) => { const b = keyBox(pad, k); drawButton(c, b.x, b.y, k.text.toUpperCase(), i !== chosen, b.w); });
}
