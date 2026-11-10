// § marks: a row of small glass squares under the hearts panel (D-604), each with a 9 × 9
// picture in its colour: the boon held, its kind's picture from its card (render/boons.js); the
// place for what else the hero carries for a while: poisoned, a pale green drop (D-654); stiff, a Zz in the moon's pale blue (D-759);
// the Glow Draught, a gold bottle with its turns left beside it, the glass wider (D-791). marks: [{ icon, tint, n? }].
import { drawGlass } from './glass.js';
import { drawText, textWidth } from './font.js';

const PAD = 3; // as on the panel
export const MARK = 2 * PAD + 9, MARK_GAP = 2;
// § poisoned's mark: a drop in venom's pale green, as in its mock-up (D-654)
export const POISON_MARK = { id: 'poisoned', tint: '#b6e07a', icon: ['....#....', '...###...', '...###...', '..#####..', '..##.##..', '.###.###.', '.#######.', '..#####..', '...###...'] };
// § stiff's mark: Zz in the moon button's pale blue, as in its mock-up (D-759)
export const STIFF_MARK = { id: 'stiff', tint: '#b0bcf0', icon: ['#####....', '...#.....', '..#......', '.#.......', '#####....', '....####.', '......#..', '.....#...', '....####.'] };
// § glow's mark: a round bottle in the lantern's gold, the potion's shape (D-791)
export const GLOW_MARK = { id: 'glow', tint: '#ffd66b', icon: ['...###...', '....#....', '...###...', '..#####..', '.##.####.', '.#.######', '.########', '..#######', '...####..'] };
// A mark's width: its square, and a number's room after the picture when it has one
const NUM_GAP = 2;
export const markW = (m) => (m && m.n !== undefined ? MARK + NUM_GAP + textWidth(String(m.n)) : MARK);
// marks: a list of marks, or a count of plain ones
const widths = (marks) => (typeof marks === 'number' ? Array(marks).fill(MARK) : marks.map(markW));
export const marksSize = (marks) => { const ws = widths(marks); return ws.length ? { w: ws.reduce((a, b) => a + b, 0) + (ws.length - 1) * MARK_GAP, h: MARK } : { w: 0, h: 0 }; };
// Which mark is at px, py, or -1
export function markAt(marks, x, y, px, py) {
  if (py < y || py >= y + MARK || px < x) return -1;
  let left = x;
  for (const [i, w] of widths(marks).entries()) { if (px < left + w) return i; left += w + MARK_GAP; if (px < left) return -1; }
  return -1;
}
export function drawMarks(c, marks, x, y, alpha = 1) {
  c.save();
  c.globalAlpha = alpha;
  let mx = x;
  marks.forEach((m) => {
    const w = markW(m);
    drawGlass(c, mx, y, w, MARK);
    c.fillStyle = m.tint;
    m.icon.forEach((row, j) => { for (let i = 0; i < row.length; i++) if (row[i] === '#') c.fillRect(mx + PAD + i, y + PAD + j, 1, 1); });
    if (m.n !== undefined) drawText(c, String(m.n), mx + MARK - PAD + NUM_GAP, y + PAD + 1, m.tint);
    mx += w + MARK_GAP;
  });
  c.restore();
  return marksSize(marks);
}
