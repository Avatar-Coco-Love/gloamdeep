// § talk box (D-1017): a person at home, bumped, opens this card on the room: the ask card's glass
// (askcard.js), their name in ember at its top left, the round cross at its top right, and under the
// rule their face, their forward sprite drawn twice its size in a thin frame, their line in grey
// beside it, wrapped; the buttons along its foot, the chosen one ember (look C of the mock-up).
// The cross, Esc and a tap outside close it.
import { drawText, textWidth } from './font.js';
import { drawGlass } from './glass.js';
import { drawButton, frame, inCard, onCross, round, cross, crossAt, drawRule, wrapWords, BUTTON, PAD, CARD_VEIL } from './bag.js';

const K = '#0e0c16', EMBER = '#f39a3b', GREY = '#9790a4', LINE = 'rgba(239,230,204,.16)';
const MIN_W = 160, EDGE = 8; // the card's least width, and its least gap to the screen's sides
const RULE_Y = 20, BODY_Y = 28; // the rule under the name, and the face's top, from the card's top
const FACE = 34, FACE_GAP = 4; // the face's frame (a 16-pixel sprite at twice its size, and its edge), and its gap to the line
const LINE_H = 10, CROSS_ROOM = 36, GAP = 8; // a wrapped line's height; room for the cross; between buttons
const MAX_LINE = 132; // the widest a line runs before it wraps, so a wide screen's card stays small

const buttonW = (menu) => Math.max(BUTTON.w, ...menu.map((l) => textWidth(l.text.toUpperCase()) + 8));
// § layout: the card centred on a view `vw` × `vh`, as wide as its name, line and buttons need, no wider than the view
function talkAt(vw, vh, name, note, menu) {
  const bw = buttonW(menu), row = menu.length * bw + (menu.length - 1) * GAP;
  const room = Math.min(MAX_LINE, vw - 2 * EDGE - 2 * PAD - FACE - FACE_GAP); // the widest the line may run
  const lines = wrapWords(note, room);
  const w = Math.min(vw - 2 * EDGE, Math.max(MIN_W, PAD + textWidth(name.toUpperCase()) + CROSS_ROOM, 2 * PAD + FACE + FACE_GAP + Math.max(...lines.map(textWidth)), 2 * PAD + row));
  const body = Math.max(FACE, lines.length * LINE_H), h = BODY_Y + body + GAP + BUTTON.h + PAD - 4;
  const x = Math.floor((vw - w) / 2), y = Math.floor((vh - h) / 2);
  const bx = x + Math.floor((w - row) / 2), by = y + h - PAD - BUTTON.h + 4;
  return { x, y, w, h, bw, body, lines, close: crossAt(x, y, w), buttons: menu.map((_, i) => ({ x: bx + i * (bw + GAP), y: by })) };
}

// What a tap at x, y on the room's canvas picks: { line: i }, 'close' (the round cross), or null; outside the card, 'out'
export function talkCardAt(x, y, vw, vh, name, note, menu) {
  const card = talkAt(vw, vh, name, note, menu);
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  const i = card.buttons.findIndex((b) => x >= b.x - GAP / 2 && x < b.x + card.bw + GAP / 2 && y >= b.y - GAP / 2 && y < b.y + BUTTON.h + GAP / 2);
  return i >= 0 ? { line: i } : null;
}

// c: the room's canvas, `vw` × `vh`; name: theirs; note: their line; face: their forward sprite's
// canvas, or none; menu: the buttons' lines; chosen: the one picked
export function drawTalkCard(c, vw, vh, name, note, face, menu, chosen) {
  c.fillStyle = K; c.globalAlpha = CARD_VEIL; c.fillRect(0, 0, vw, vh); c.globalAlpha = 1;
  const card = talkAt(vw, vh, name, note, menu), { x, y, w, h, bw, body, lines, close } = card;
  drawGlass(c, x, y, w, h);
  drawText(c, name.toUpperCase(), x + PAD, y + 7, EMBER);
  round(c, close.x, close.y, close.r); cross(c, close.x, close.y);
  c.fillStyle = LINE; drawRule(c, x, y, w, RULE_Y);
  const fy = y + BODY_Y + Math.floor((body - FACE) / 2);
  c.fillStyle = K; c.fillRect(x + PAD, fy, FACE, FACE); frame(c, x + PAD, fy, FACE, FACE, LINE);
  if (face) { c.save(); c.imageSmoothingEnabled = false; c.drawImage(face, x + PAD + 1, fy + 1, FACE - 2, FACE - 2); c.restore(); }
  const tx = x + PAD + FACE + FACE_GAP, ty = y + BODY_Y + Math.floor((body - lines.length * LINE_H) / 2) + 1;
  lines.forEach((l, i) => drawText(c, l, tx, ty + i * LINE_H, GREY));
  menu.forEach((l, i) => drawButton(c, card.buttons[i].x, card.buttons[i].y, l.text.toUpperCase(), i !== chosen, bw));
}
