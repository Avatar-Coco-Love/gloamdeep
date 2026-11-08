// § opening card (D-628): a new journey's first words, on a glass card in the middle of the
// room, the crypt dim around it, as the ask card (D-400). Each sentence its own paragraph,
// bone white and centred; BEGIN, a button like Make (D-299), centred along its foot.
// A tap anywhere, Enter, Space or Esc begins.
import { drawText, textWidth, FONT_H } from './font.js';
import { drawGlass } from './glass.js';
import { drawButton, wrapWords, BUTTON, PAD, CARD_VEIL, EDGE_GAP } from './bag.js';
import { OPENING, OPENING_BUTTON } from '../core/opening.js';

const K = '#0e0c16', CORE = '#efe6cc';
const MAX_W = 200; // the card's widest, on a wide screen
const ROW_H = FONT_H + 2; // from one line's top to the next
const PARA_GAP = 6; // more between two paragraphs
const BUTTON_GAP = 10; // from the last line to BEGIN

// § layout: the card centred on a view `vw` × `vh`, its paragraphs wrapped to fit
export function openingAt(vw, vh, paras = OPENING, word = OPENING_BUTTON) {
  const w = Math.min(MAX_W, vw - 2 * EDGE_GAP);
  const lines = paras.map((p) => wrapWords(p, w - 2 * PAD));
  const textH = lines.reduce((n, l) => n + l.length * ROW_H, 0) + PARA_GAP * (lines.length - 1);
  const bw = Math.max(BUTTON.w, textWidth(word.toUpperCase()) + 8);
  const h = PAD + textH + BUTTON_GAP + BUTTON.h + PAD;
  const x = Math.floor((vw - w) / 2), y = Math.floor((vh - h) / 2);
  return { x, y, w, h, lines, button: { x: x + Math.floor((w - bw) / 2), y: y + h - PAD - BUTTON.h, w: bw } };
}

// c: the room's canvas, `vw` × `vh`
// paras and word: the boons card's (D-712) or the opening's
export function drawOpening(c, vw, vh, paras = OPENING, word = OPENING_BUTTON) {
  c.fillStyle = K; c.globalAlpha = CARD_VEIL; c.fillRect(0, 0, vw, vh); c.globalAlpha = 1;
  const { x, y, w, h, lines, button } = openingAt(vw, vh, paras, word);
  drawGlass(c, x, y, w, h);
  let ty = y + PAD;
  for (const para of lines) {
    for (const line of para) { drawText(c, line, x + Math.floor((w - textWidth(line)) / 2), ty, CORE); ty += ROW_H; }
    ty += PARA_GAP;
  }
  drawButton(c, button.x, button.y, word.toUpperCase(), false, button.w);
}
