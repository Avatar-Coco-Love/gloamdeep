// § ability card (D-971, D-992): a new ability learnt, on the opening's glass card (openingcard.js),
// the room dim around it: its heading in ember, the Leap button's icon 4 × its size in gold, its
// name bone white, its use wrapped and centred below, OK centred along its foot.
import { drawText, textWidth, FONT_H } from './font.js';
import { drawGlass } from './glass.js';
import { drawButton, wrapWords, BUTTON, PAD, CARD_VEIL, EDGE_GAP } from './bag.js';
import { LEAP_ICON } from './hud.js';
import { ABILITY, ABILITY_BUTTON } from '../core/opening.js';

const K = '#0e0c16', CORE = '#efe6cc', EMBER = '#f39a3b', GOLD = '#ffc65c';
const MAX_W = 200, ROW_H = FONT_H + 2, GAP = 6, DOT = 4; // the icon's dots, game pixels each
const ICON_H = LEAP_ICON.length * DOT, ICON_W = LEAP_ICON[0].length * DOT;

// § layout: the card centred on a view `vw` × `vh`
export function abilityAt(vw, vh, card = ABILITY, word = ABILITY_BUTTON) {
  const w = Math.min(MAX_W, vw - 2 * EDGE_GAP), lines = wrapWords(card.use, w - 2 * PAD);
  const bw = Math.max(BUTTON.w, textWidth(word.toUpperCase()) + 8);
  const h = PAD + ROW_H + GAP + ICON_H + GAP + ROW_H + GAP + lines.length * ROW_H + 10 + BUTTON.h + PAD;
  const x = Math.floor((vw - w) / 2), y = Math.floor((vh - h) / 2);
  return { x, y, w, h, lines, button: { x: x + Math.floor((w - bw) / 2), y: y + h - PAD - BUTTON.h, w: bw } };
}

export function drawAbility(c, vw, vh, card = ABILITY, word = ABILITY_BUTTON) {
  c.fillStyle = K; c.globalAlpha = CARD_VEIL; c.fillRect(0, 0, vw, vh); c.globalAlpha = 1;
  const { x, y, w, h, lines, button } = abilityAt(vw, vh, card, word);
  const mid = (s) => x + Math.floor((w - textWidth(s)) / 2);
  drawGlass(c, x, y, w, h);
  let ty = y + PAD;
  const heading = card.heading.toUpperCase();
  drawText(c, heading, mid(heading), ty, EMBER); ty += ROW_H + GAP;
  const ix = x + Math.floor((w - ICON_W) / 2);
  c.fillStyle = GOLD;
  LEAP_ICON.forEach((row, iy) => [...row].forEach((ch, jx) => { if (ch === 'x') c.fillRect(ix + jx * DOT, ty + iy * DOT, DOT, DOT); }));
  ty += ICON_H + GAP;
  drawText(c, card.name, mid(card.name), ty, CORE); ty += ROW_H + GAP;
  for (const line of lines) { drawText(c, line, mid(line), ty, CORE); ty += ROW_H; }
  drawButton(c, button.x, button.y, word.toUpperCase(), false, button.w);
}
