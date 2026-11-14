// § numbers' rows (D-902): under an item's name on the bag card, one row for each thing it does
// (core/numbers.js): its 7 × 7 icon, what it does in grey and its number in gold at the row's
// right end; a row whose words and number don't fit side by side puts the number on a row of its
// own, still at the right. A faint rule under them, above the item's Look line.
import { drawText, textWidth } from './font.js';

const GREY = '#9790a4', GOLD = '#ffd66b', LINE = 'rgba(239,230,204,.16)';
export const ROW_H = 13; // a row's height: the text line's 12 and 1 between
const ICON_W = 7, ICON_GAP = 4, VALUE_GAP = 6;
// § icons: '#' the icon's colour; the colours are the hearts', the oil's and the HUD's
const ICONS = {
  blade: ['#efe6cc', ['......#', '.....#.', '....#..', '#..#...', '.##....', '.##....', '#..#...']],
  through: ['#efe6cc', ['.......', '..#....', '...#...', '#####.#', '...#...', '..#....', '.......']],
  knock: ['#efe6cc', ['.......', '...#...', '....#..', '######.', '....#..', '...#...', '.......']],
  heart: ['#e8786a', ['.......', '.##.##.', '#######', '#######', '.#####.', '..###..', '...#...']],
  drop: ['#ffc65c', ['...#...', '...#...', '..###..', '.#####.', '#######', '#######', '.#####.']],
  time: ['#a58ce0', ['#######', '.#...#.', '..#.#..', '...#...', '..#.#..', '.#.#.#.', '#######']],
  shield: ['#c9b48a', ['#######', '#######', '#######', '#######', '.#####.', '..###..', '...#...']],
  star: [GOLD, ['...#...', '...#...', '#######', '.#####.', '..###..', '.##.##.', '#.....#']],
  eye: ['#b6e07a', ['.......', '..###..', '.#...#.', '#..#..#', '.#...#.', '..###..', '.......']],
  cure: ['#b6e07a', ['..###..', '..###..', '#######', '#######', '#######', '..###..', '..###..']],
  sun: ['#ffc65c', ['#..#..#', '.#.#.#.', '..###..', '#######', '..###..', '.#.#.#.', '#..#..#']],
  coin: [GOLD, ['..###..', '.#####.', '##.####', '##.####', '##.####', '.#####.', '..###..']],
  pick: ['#c9b48a', ['.####..', '#....#.', '...#..#', '..#....', '.#.....', '#......', '.......']],
  bag: ['#c9b48a', ['..###..', '.#...#.', '#######', '#.....#', '#.....#', '#.....#', '#######']],
};
export const ICON_NAMES = Object.keys(ICONS);
function drawIcon(c, name, x, y) {
  const [colour, rows] = ICONS[name];
  c.fillStyle = colour;
  rows.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '#') c.fillRect(x + i, y + j, 1, 1); }));
}
// Whether a row's words and number fit side by side in `w`
const oneLine = (r, w) => !r.value || ICON_W + ICON_GAP + textWidth(r.label) + VALUE_GAP + textWidth(r.value) <= w;
// The rows' height in `w`, the rule under them with its gap included; 0 for none
export const numbersH = (rows, w) => (rows.length ? rows.reduce((h, r) => h + (oneLine(r, w) ? 1 : 2) * ROW_H, 0) + 4 : 0);
// rows: itemNumbers' (core/numbers.js), drawn from x, y, `w` wide; gives the height used
export function drawNumbers(c, rows, x, y, w) {
  let ry = y;
  for (const r of rows) {
    drawIcon(c, r.icon, x, ry);
    drawText(c, r.label, x + ICON_W + ICON_GAP, ry, GREY);
    if (!oneLine(r, w)) ry += ROW_H;
    if (r.value) drawText(c, r.value, x + w - textWidth(r.value), ry, GOLD);
    ry += ROW_H;
  }
  if (rows.length) { c.fillStyle = LINE; c.fillRect(x, ry, w, 1); }
  return numbersH(rows, w);
}
