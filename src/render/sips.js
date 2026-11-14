// § sips (D-902, D-909): a draught's turns, under its rows on the bag card (look A): "Now" over
// "After", its own HUD mark (marks.js) twice as big, the rim lit for the share of its time left,
// as on the HUD (D-847). With none working, "Now" is the mark with its rim dark.
import { drawText, textWidth } from './font.js';
import { drawMarks, MARK, GLOW_MARK, SLOW_MARK, MEND_MARK, WARD_MARK, SPIT_MARK, SHADE_MARK } from './marks.js';

const GREY = '#9790a4', Z = 2, LABEL_GAP = 6, ROW_GAP = 4;
const LABELS = ['Now', 'After'];
const MARKS = Object.fromEntries([GLOW_MARK, SLOW_MARK, MEND_MARK, WARD_MARK, SPIT_MARK, SHADE_MARK].map((m) => [m.id, m]));
const labelW = () => Math.max(...LABELS.map(textWidth)) + LABEL_GAP;
// The picture's height and width; 0 for none
export const sipsH = (sips) => (sips && MARKS[sips.key] ? 2 * Z * MARK + ROW_GAP : 0);
export const sipsW = (sips) => (sipsH(sips) ? labelW() + Z * MARK : 0);
// sips: draughtTurns' (core/numbers.js), drawn from x, y; gives the height used
export function drawSips(c, sips, x, y) {
  const mark = MARKS[sips?.key];
  if (!mark) return 0;
  [sips.now, sips.after].forEach((left, j) => {
    const ry = y + j * (Z * MARK + ROW_GAP);
    drawText(c, LABELS[j], x, ry + Math.floor((Z * MARK - 7) / 2), GREY);
    c.save(); c.translate(x + labelW(), ry); c.scale(Z, Z); drawMarks(c, [{ ...mark, left }], 0, 0); c.restore();
  });
  return sipsH(sips);
}
