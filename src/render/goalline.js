// § goal line: the teaching goal under the hearts panel, below the boon's mark (D-706): on one
// piece of glass as wide as its words, the goal in amber and how in grey under it; once done,
// both gold, the how line the reward paid, for a few turns (goals.js). It fades with the panel.
// line: { goal, how, done } (goals.js's goalLine) or null. maxW: the widest the glass may be, so
// it stays left of the round map; longer words wrap onto more lines (D-743).
import { drawText, textWidth } from './font.js';
import { drawGlass } from './glass.js';
import { wrap } from './history.js';

const PAD = 3, ROW = 10; // as the panel's; one row of words to the next
const AMBER = '#ffc65c', GREY = '#9790a4', GOLD = '#ffd66b';
// The goal's and the how's lines, each no wider than the glass allows; the last kept, as the
// line is drawn every frame and nothing new is made then (TECH.md)
let kept = null;
export function goalLines(line, maxW = Infinity) {
  if (kept?.goal !== line.goal || kept.how !== line.how || kept.maxW !== maxW) kept = { goal: line.goal, how: line.how, maxW, lines: { goals: wrap(line.goal, maxW - 2 * PAD), hows: wrap(line.how, maxW - 2 * PAD) } };
  return kept.lines;
}
export function goalSize(line, maxW = Infinity) {
  if (!line) return { w: 0, h: 0 };
  const { goals, hows } = goalLines(line, maxW);
  let w = 0;
  for (const l of goals) w = Math.max(w, textWidth(l));
  for (const l of hows) w = Math.max(w, textWidth(l));
  return { w: 2 * PAD + w, h: 2 * PAD + (goals.length + hows.length) * ROW - 3 };
}
export const onGoal = (line, x, y, px, py, maxW = Infinity) => { const { w, h } = goalSize(line, maxW); return !!line && px >= x && px < x + w && py >= y && py < y + h; };
export function drawGoalLine(c, line, x, y, alpha = 1, maxW = Infinity) {
  if (!line) return goalSize(null);
  const size = goalSize(line, maxW), { goals, hows } = goalLines(line, maxW);
  c.save();
  c.globalAlpha = alpha;
  drawGlass(c, x, y, size.w, size.h);
  let ty = y + PAD;
  for (const l of goals) { drawText(c, l, x + PAD, ty, line.done ? GOLD : AMBER); ty += ROW; }
  for (const l of hows) { drawText(c, l, x + PAD, ty, line.done ? GOLD : GREY); ty += ROW; }
  c.restore();
  return size;
}
