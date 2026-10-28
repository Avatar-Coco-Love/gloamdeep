// § ask card (D-400; were pages of their own, D-238, D-271, D-334): Start over?, Delete …?
// and Play …? open as a small glass card in the middle of the screen, the scene or the room
// showing dim around it. The question in ember at its top left, as the other cards' names,
// the round cross at its top right; the grey note centred under the rule, YES and NO as
// buttons like Make (D-299) centred along its foot, the chosen one ember. The cross, Esc
// and a tap outside mean No.
import { drawText, textWidth } from './font.js';
import { drawGlass } from './glass.js';
import { drawButton, inCard, onCross, round, cross, BUTTON, PAD, CARD_VEIL } from './bag.js';

const K = '#0e0c16', EMBER = '#f39a3b', GREY = '#9790a4', LINE = 'rgba(239,230,204,.16)';
const MIN_W = 160, H = 72; // the card's least width, and its height
const RULE_Y = 20, NOTE_Y = 30; // the rule under the question, and the note's top, from the card's top
const CROSS_ROOM = 28; // the question's gap to the card's right edge, room for the cross
const GAP = 8; // between YES and NO

// § layout: the card centred on a view `vw` × `vh`, as wide as its question and note need
function askAt(vw, vh, heading, note) {
  const w = Math.max(MIN_W, PAD + textWidth(heading.toUpperCase()) + CROSS_ROOM, 2 * PAD + textWidth(note));
  const x = Math.floor((vw - w) / 2), y = Math.floor((vh - H) / 2);
  const bx = x + Math.floor((w - 2 * BUTTON.w - GAP) / 2), by = y + H - PAD - BUTTON.h;
  return { x, y, w, h: H, close: { x: x + w - 12, y: y + 11, r: 8 }, buttons: [bx, bx + BUTTON.w + GAP].map((b) => ({ x: b, y: by })) };
}

// What a tap at x, y on the room's canvas picks: { line: i } (0 YES, 1 NO, as SURE_MENU),
// 'close' (the round cross), or null; outside the card, 'out'
export function askCardAt(x, y, vw, vh, heading, note) {
  const card = askAt(vw, vh, heading, note);
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  const i = card.buttons.findIndex((b) => x >= b.x - GAP / 2 && x < b.x + BUTTON.w + GAP / 2 && y >= b.y - GAP / 2 && y < b.y + BUTTON.h + GAP / 2);
  return i >= 0 ? { line: i } : null;
}

// c: the room's canvas, `vw` × `vh`; heading: the question; note: its grey line; menu: SURE_MENU;
// chosen: its line picked
export function drawAskCard(c, vw, vh, heading, note, menu, chosen) {
  c.fillStyle = K; c.globalAlpha = CARD_VEIL; c.fillRect(0, 0, vw, vh); c.globalAlpha = 1;
  const card = askAt(vw, vh, heading, note), { x, y, w, h, close } = card;
  drawGlass(c, x, y, w, h);
  drawText(c, heading.toUpperCase(), x + PAD, y + 7, EMBER);
  round(c, close.x, close.y, close.r); cross(c, close.x, close.y);
  c.fillStyle = LINE; c.fillRect(x + 8, y + RULE_Y, w - 16, 1);
  drawText(c, note, x + Math.floor((w - textWidth(note)) / 2), y + NOTE_Y, GREY);
  menu.forEach((l, i) => drawButton(c, card.buttons[i].x, card.buttons[i].y, l.text.toUpperCase(), i !== chosen));
}
