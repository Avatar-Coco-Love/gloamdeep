// § goal line: the teaching goal under the hearts panel, below the boon's mark (D-706): on one
// piece of glass as wide as its words, the goal in amber and how in grey under it; once done,
// both gold, the how line the reward paid, for a few turns (goals.js). It fades with the panel.
// line: { goal, how, done } (goals.js's goalLine) or null.
import { drawText, textWidth } from './font.js';
import { drawGlass } from './glass.js';

const PAD = 3, ROW = 10; // as the panel's; one row of words to the next
const AMBER = '#ffc65c', GREY = '#9790a4', GOLD = '#ffd66b';
export const goalSize = (line) => (line ? { w: 2 * PAD + Math.max(textWidth(line.goal), textWidth(line.how)), h: 2 * PAD + 2 * ROW - 3 } : { w: 0, h: 0 });
export const onGoal = (line, x, y, px, py) => { const { w, h } = goalSize(line); return !!line && px >= x && px < x + w && py >= y && py < y + h; };
export function drawGoalLine(c, line, x, y, alpha = 1) {
  if (!line) return goalSize(null);
  const size = goalSize(line);
  c.save();
  c.globalAlpha = alpha;
  drawGlass(c, x, y, size.w, size.h);
  drawText(c, line.goal, x + PAD, y + PAD, line.done ? GOLD : AMBER);
  drawText(c, line.how, x + PAD, y + PAD + ROW, line.done ? GOLD : GREY);
  c.restore();
  return size;
}
