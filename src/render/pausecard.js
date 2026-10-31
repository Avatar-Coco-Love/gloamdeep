// § pause card (D-388; step 7 of D-380): the pause menu opens as a glass card on the
// room as the bag's (D-385), "PAUSED" at its top and the round cross that resumes. On
// the left its lines, the chosen one gold with the menus' flame (D-181); on the right,
// "THIS JOURNEY" and its facts (pauseFacts, core/menu.js), each a grey name and its value.
// Upright, the facts stand under the lines instead (D-505).
import { drawText, textWidth } from './font.js';
import { drawMarker } from './menu.js';
import { cardAt, drawCard, inCard, onCross, isTall, PAD } from './bag.js';

const GREY = '#9790a4', GOLD = '#ffd66b', EMBER = '#f39a3b', CORE = '#efe6cc';
const LINES_Y = 34, LINE_STEP = 22; // the first line's top inside the card, and from one line's top to the next
const FACTS_Y = 30, FACT_STEP = 16; // "THIS JOURNEY"'s top, and from one fact's top to the next
const MARK_W = 8; // the flame and its gap, left of each line
export const SPLIT = 132; // the line between the menu and the facts, from the card's left
const FACTS_X = SPLIT + 9;
// Upright (D-505), the facts stand under the lines, past a line across the card
const factsTop = (count) => LINES_Y + count * LINE_STEP + 4; // that line, from the card's top

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { line: i } for anywhere
// across the left side level with line i, 'close' (the round cross), or null; outside the card, 'out'
export function pauseCardAt(x, y, vw, vh, count) {
  const card = cardAt(vw, vh);
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  if (isTall(vw, vh) ? y >= card.y + factsTop(count) : x >= card.x + SPLIT) return null;
  const i = Math.floor((y - card.y - LINES_Y + (LINE_STEP - 9) / 2) / LINE_STEP);
  return i >= 0 && i < count ? { line: i } : null;
}

// c: the room's canvas, `vw` × `vh`; menu: [{ text }]; chosen: its line picked;
// facts: [[name, value]]; still: prefers-reduced-motion
export function drawPauseCard(c, vw, vh, menu, chosen, facts, t, still) {
  const tall = isTall(vw, vh), top = factsTop(menu.length);
  const { x, y } = drawCard(c, vw, vh, 'PAUSED', SPLIT, true, top);
  menu.forEach((line, i) => {
    const ly = y + LINES_Y + i * LINE_STEP;
    drawText(c, line.text, x + PAD + MARK_W, ly, i === chosen ? GOLD : GREY);
    if (i === chosen) drawMarker(c, x + PAD, ly + 1, t, still);
  });
  const fx = x + (tall ? PAD : FACTS_X), vx = fx + Math.max(...facts.map(([name]) => textWidth(name))) + 24;
  const fy0 = y + (tall ? top + 10 : FACTS_Y);
  drawText(c, 'THIS JOURNEY', fx, fy0, EMBER);
  facts.forEach(([name, value], i) => {
    const fy = fy0 + 18 + i * FACT_STEP;
    drawText(c, name, fx, fy, GREY); drawText(c, value, vx, fy, CORE);
  });
}
