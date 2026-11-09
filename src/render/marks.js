// § marks: a row of small glass squares under the hearts panel (D-604), each with a 9 × 9
// picture in its colour: the boon held, its kind's picture from its card (render/boons.js); the
// place for what else the hero carries for a while: poisoned, a pale green drop (D-654); stiff, a Zz in the moon's pale blue (D-759). marks: [{ icon, tint }].
import { drawGlass } from './glass.js';

const PAD = 3; // as on the panel
export const MARK = 2 * PAD + 9, MARK_GAP = 2;
// § poisoned's mark: a drop in venom's pale green, as in its mock-up (D-654)
export const POISON_MARK = { id: 'poisoned', tint: '#b6e07a', icon: ['....#....', '...###...', '...###...', '..#####..', '..##.##..', '.###.###.', '.#######.', '..#####..', '...###...'] };
// § stiff's mark: Zz in the moon button's pale blue, as in its mock-up (D-759)
export const STIFF_MARK = { id: 'stiff', tint: '#b0bcf0', icon: ['#####....', '...#.....', '..#......', '.#.......', '#####....', '....####.', '......#..', '.....#...', '....####.'] };
export const marksSize = (n) => (n ? { w: n * MARK + (n - 1) * MARK_GAP, h: MARK } : { w: 0, h: 0 });
// Which mark is at px, py, or -1
export function markAt(n, x, y, px, py) {
  if (py < y || py >= y + MARK || px < x) return -1;
  const i = Math.floor((px - x) / (MARK + MARK_GAP));
  return i < n && px - x - i * (MARK + MARK_GAP) < MARK ? i : -1;
}
export function drawMarks(c, marks, x, y, alpha = 1) {
  c.save();
  c.globalAlpha = alpha;
  marks.forEach((m, k) => {
    const mx = x + k * (MARK + MARK_GAP);
    drawGlass(c, mx, y, MARK, MARK);
    c.fillStyle = m.tint;
    m.icon.forEach((row, j) => { for (let i = 0; i < row.length; i++) if (row[i] === '#') c.fillRect(mx + PAD + i, y + PAD + j, 1, 1); });
  });
  c.restore();
  return marksSize(marks.length);
}
