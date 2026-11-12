// § marks: a row of small glass squares under the hearts panel (D-604), each with a 9 × 9
// picture in its colour: the boon held, its kind's picture from its card (render/boons.js); the
// place for what else the hero carries for a while: poisoned, a pale green drop (D-654); stiff, a Zz in the moon's pale blue (D-759);
// Warmed, a small flame in the campfire's orange (D-845);
// the Glow Draught, a gold bottle (D-791);
// Slowburn, the same bottle in deep amber (D-792); the Mending Draught's in moss green (D-794); the Ward Draught's in pale green-white (D-795); the Spitproof Draught's in dusty rose (D-802); the Shade Draught's in dusky violet (D-806).
// Each of those shows its time left on its square's rim, no number (D-847): the edge's 52 dots, from
// the top middle going round like a clock, lit in its colour for the share left; poisoned and stiff too,
// and those two, the bad ones, on dark red glass (D-848). marks: [{ icon, tint, left?, bad? }].
import { drawGlass } from './glass.js';

export const BAD_GLASS = 'rgba(120,24,30,.75)'; // a bad mark's dark red glass (D-848)

const PAD = 3; // as on the panel
export const MARK = 2 * PAD + 9;
export const MARK_GAP = 2;
// § poisoned's mark: a drop in venom's pale green, as in its mock-up (D-654)
export const POISON_MARK = { id: 'poisoned', bad: true, tint: '#b6e07a', icon: ['....#....', '...###...', '...###...', '..#####..', '..##.##..', '.###.###.', '.#######.', '..#####..', '...###...'] };
// § stiff's mark: Zz in the moon button's pale blue, as in its mock-up (D-759)
export const STIFF_MARK = { id: 'stiff', bad: true, tint: '#b0bcf0', icon: ['#####....', '...#.....', '..#......', '.#.......', '#####....', '....####.', '......#..', '.....#...', '....####.'] };
// § Warmed's mark: a small flame in the campfire's orange, with its turns left (D-845)
export const WARM_MARK = { id: 'warmed', tint: '#f39a3b', icon: ['....#....', '....##...', '...###...', '..####...', '..#####..', '.###.###.', '.##...##.', '.###.###.', '..#####..'] };
// § glow's mark: a round bottle in the lantern's gold, the potion's shape (D-791)
export const GLOW_MARK = { id: 'glow', tint: '#ffd66b', icon: ['...###...', '....#....', '...###...', '..#####..', '.##.####.', '.#.######', '.########', '..#######', '...####..'] };
// § Slowburn's mark: the same bottle in the oil bar's deep amber (D-792)
export const SLOW_MARK = { ...GLOW_MARK, id: 'slowburn', tint: '#e9a94a' };
// § the Mending Draught's mark: the same bottle in the moss green (D-794)
export const MEND_MARK = { ...GLOW_MARK, id: 'mending', tint: '#6fb04e' };
// § the Ward Draught's mark: the same bottle in pale green-white, apart from poison's drop (D-795)
export const WARD_MARK = { ...GLOW_MARK, id: 'ward', tint: '#dcf0d4' };
// § the Spitproof Draught's mark: the same bottle in dusty rose, the spit grub's eye (D-802)
export const SPIT_MARK = { ...GLOW_MARK, id: 'spitproof', tint: '#e0a0aa' };
// § the Shade Draught's mark: the same bottle in dusky violet, the rim lurker's (D-806)
export const SHADE_MARK = { ...GLOW_MARK, id: 'shade', tint: '#b39ad0' };
// § rim: the square's edge dots, clockwise from the top middle, its corners left out as the glass's
const E = MARK - 1, MID = Math.floor(MARK / 2);
export const RIM = [
  ...Array.from({ length: E - MID }, (_, k) => [MID + k, 0]), ...Array.from({ length: E - 1 }, (_, k) => [E, 1 + k]),
  ...Array.from({ length: E - 1 }, (_, k) => [E - 1 - k, E]), ...Array.from({ length: E - 1 }, (_, k) => [0, E - 1 - k]),
  ...Array.from({ length: MID - 1 }, (_, k) => [1 + k, 0]),
];
// The rim's dots lit for `left`, a share from 0 to 1: any time left lights at least one
export const rimLit = (left) => RIM.slice(0, left > 0 ? Math.max(1, Math.ceil(left * RIM.length)) : 0);
// § layout (H-55): marks: a list of marks, or a count of plain ones; room: how wide the row may be.
// A row stops before it would pass room, the rest go on rows under it, at least one to a row.
export const MARK_PAD = 4; // a tap this far past a mark's edge still finds it, the gaps split (H-36)
export function marksPlaced(marks, room = Infinity) {
  const n = typeof marks === 'number' ? marks : marks.length, out = [];
  let x = 0, y = 0;
  for (let i = 0; i < n; i++) {
    if (x > 0 && x + MARK > room) { x = 0; y += MARK + MARK_GAP; }
    out.push({ x, y });
    x += MARK + MARK_GAP;
  }
  return out;
}
export const marksSize = (marks, room) => {
  const at = marksPlaced(marks, room);
  return at.length ? { w: Math.max(...at.map((p) => p.x)) + MARK, h: at[at.length - 1].y + MARK } : { w: 0, h: 0 };
};
// Which mark is at px, py, or -1: the nearest whose square, MARK_PAD bigger all round, holds it (H-36)
export function markAt(marks, x, y, px, py, room) {
  let best = -1, far = Infinity;
  marksPlaced(marks, room).forEach((p, i) => {
    const dx = Math.max(x + p.x - px, px - (x + p.x + MARK - 1), 0), dy = Math.max(y + p.y - py, py - (y + p.y + MARK - 1), 0);
    const d = Math.max(dx, dy);
    if (d <= MARK_PAD && d < far) { best = i; far = d; }
  });
  return best;
}
export function drawMarks(c, marks, x, y, alpha = 1, room) {
  c.save();
  c.globalAlpha = alpha;
  const at = marksPlaced(marks, room);
  marks.forEach((m, k) => {
    const mx = x + at[k].x, my = y + at[k].y;
    drawGlass(c, mx, my, MARK, MARK, m.bad ? BAD_GLASS : undefined);
    if (m.left !== undefined) { c.fillStyle = m.tint; rimLit(m.left).forEach(([i, j]) => c.fillRect(mx + i, my + j, 1, 1)); }
    c.fillStyle = m.tint;
    m.icon.forEach((row, j) => { for (let i = 0; i < row.length; i++) if (row[i] === '#') c.fillRect(mx + PAD + i, my + PAD + j, 1, 1); });
  });
  c.restore();
  return marksSize(marks, room);
}
