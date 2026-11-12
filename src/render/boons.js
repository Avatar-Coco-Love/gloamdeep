// § boon cards (D-603; were the travel card's rows, D-596): the home plate's 3 boons as three
// upright cards side by side on the darkened room, "PICK A BOON" over them and the round cross
// that goes on without one. Each card has its kind's picture and colour (amber light and oil,
// red hearts and fighting, bone finding things, violet getting around) in a tinted band at its
// top, then its name and, under a rule, its line. The chosen card lifts and turns gold.
// "Lasts until you are back at the waystone." under them (H-35, D-865). Mock-ups: https://claude.ai/artifact/9Ab8N8New9hya5ynghrjjA
import { drawText, textWidth } from './font.js';
import { cardAt, round, cross, wrapWords, CARD_VEIL } from './bag.js';
import { BOONS } from '../core/registry.js';

export const BOONS_TITLE = 'PICK A BOON';
export const BOONS_FOOT = 'Lasts until you are back at the waystone.';
const K = '#0e0c16', EMBER = '#f39a3b', GOLD = '#ffd66b', GREY = '#9790a4', CORE = '#efe6cc', DIM = '#5c566a';
const RULE = 'rgba(239,230,204,.16)', FILL = 'rgba(14,12,22,.7)', LIT = 'rgba(40,32,22,.9)';
// Each kind's colour and its 9 × 9 picture, drawn twice as big: a flame, a heart, a gem, footsteps
export const KIND_LOOKS = {
  light: { tint: '#ffd66b', icon: ['....#....', '...##....', '...###...', '..#####..', '..##.##..', '.##...##.', '.##...##.', '..#####..', '...###...'] },
  hearts: { tint: '#e8786a', icon: ['.........', '.##...##.', '####.####', '#########', '#########', '.#######.', '..#####..', '...###...', '....#....'] },
  finding: { tint: '#efe6cc', icon: ['.........', '..#####..', '.#.#.#.#.', '#########', '.#.....#.', '..#...#..', '...#.#...', '....#....', '.........'] },
  around: { tint: '#a58ce0', icon: ['......##.', '.....####', '.##..####', '####..##.', '####.....', '.##...##.', '.....####', '.##..####', '####..##.'] },
};
const CARD_W = 52, GAP = 4, LIFT = 3, BAND = 26, NAME_Y = 30, LINE_H = 10, SIDE = 4, TITLE_Y = 14;

// § layout: the three cards' places on the screen layer, `vw` × `vh`; ids: the boons offered.
// Every card is as tall as the tallest one's words, the row in the middle of the room's height.
export function boonsLayout(vw, vh, ids) {
  const box = cardAt(vw, vh), w = Math.min(CARD_W, Math.floor((box.w - 2 * GAP) / Math.max(1, ids.length)));
  const texts = ids.map((id) => ({ name: wrapWords(BOONS[id].name, w - 6), words: wrapWords(BOONS[id].words, w - 9) }));
  const names = Math.max(1, ...texts.map((t) => t.name.length)), words = Math.max(1, ...texts.map((t) => t.words.length));
  const h = NAME_Y + names * LINE_H + 7 + words * LINE_H + 4;
  const all = ids.length * w + (ids.length - 1) * GAP, x0 = box.x + Math.floor((box.w - all) / 2);
  const y = Math.max(box.y + TITLE_Y + 16, box.y + Math.floor((box.h - h) / 2));
  return { box, h, names, cards: texts.map((t, i) => ({ ...t, x: x0 + i * (w + GAP), y, w, h })) };
}

// What a tap at x, y picks: { line: i } on card i, 'close' on the cross, 'out' past the room's
// edge around it, else null
export function boonsAt(x, y, vw, vh, ids) {
  const { box, cards } = boonsLayout(vw, vh, ids);
  if (x < box.x || y < box.y || x >= box.x + box.w || y >= box.y + box.h) return 'out';
  if (Math.hypot(x - box.close.x, y - box.close.y) <= box.close.r + 4) return 'close';
  const i = cards.findIndex((k) => x >= k.x && x < k.x + k.w && y >= k.y - LIFT && y < k.y + k.h);
  return i >= 0 ? { line: i } : null;
}

const frame = (c, x, y, w, h, colour) => {
  c.fillStyle = colour;
  c.fillRect(x + 1, y, w - 2, 1); c.fillRect(x + 1, y + h - 1, w - 2, 1); c.fillRect(x, y + 1, 1, h - 2); c.fillRect(x + w - 1, y + 1, 1, h - 2);
};
function icon(c, rows, x, y, colour) {
  c.fillStyle = colour;
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) if (row[i] === '#') c.fillRect(x + 2 * i, y + 2 * j, 2, 2); });
}

// c: the screen layer, `vw` × `vh`; ids: the boons offered; chosen: the card picked
export function drawBoons(c, vw, vh, ids, chosen) {
  c.fillStyle = K; c.globalAlpha = CARD_VEIL; c.fillRect(0, 0, vw, vh); c.globalAlpha = 1;
  const { box, cards, names } = boonsLayout(vw, vh, ids);
  drawText(c, BOONS_TITLE, box.x + Math.floor((box.w - textWidth(BOONS_TITLE)) / 2), box.y + TITLE_Y, EMBER);
  round(c, box.close.x, box.close.y, box.close.r); cross(c, box.close.x, box.close.y);
  cards.forEach((k, i) => {
    const on = i === chosen, look = KIND_LOOKS[BOONS[ids[i]].sort], y = k.y - (on ? LIFT : 0);
    c.fillStyle = on ? LIT : FILL; c.fillRect(k.x + 1, y + 1, k.w - 2, k.h - 2);
    c.globalAlpha = 0.18; c.fillStyle = look.tint; c.fillRect(k.x + 1, y + 1, k.w - 2, BAND); c.globalAlpha = 1;
    if (on) frame(c, k.x, y, k.w, k.h, GOLD);
    else { c.globalAlpha = 0.55; frame(c, k.x, y, k.w, k.h, look.tint); c.globalAlpha = 1; }
    icon(c, look.icon, k.x + Math.floor((k.w - 18) / 2), y + 5, look.tint);
    let ty = y + NAME_Y + Math.floor(((names - k.name.length) * LINE_H) / 2); // a one-line name beside a two-line one sits in the middle
    for (const l of k.name) { drawText(c, l, k.x + Math.floor((k.w - textWidth(l)) / 2), ty, on ? GOLD : CORE); ty += LINE_H; }
    ty = y + NAME_Y + names * LINE_H; // the rules line up across the cards
    c.fillStyle = RULE; c.fillRect(k.x + 6, ty + 2, k.w - 12, 1); ty += 7;
    for (const l of k.words) { drawText(c, l, k.x + SIDE, ty, on ? CORE : GREY); ty += LINE_H; }
  });
  const under = (cards[0]?.y ?? box.y) + (cards[0]?.h ?? 0) + 10;
  const foot = textWidth(BOONS_FOOT) <= box.w - 8 ? [BOONS_FOOT] : wrapWords(BOONS_FOOT, box.w - 8); // two lines on a narrow screen (H-35)
  if (under + foot.length * LINE_H - LINE_H + 9 <= box.y + box.h) foot.forEach((l, j) => drawText(c, l, box.x + Math.floor((box.w - textWidth(l)) / 2), under + j * LINE_H, DIM));
}
