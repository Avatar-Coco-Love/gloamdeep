// § creature list (D-357, CL1): a plaque for each creature that has noticed
// the hero, from creatureList (core/creatureturn.js), as in the round 3 mock-up: its
// face, and its next move in the hostile pink (fangs for a bite, an arrow the
// way it steps; nothing while it waits). A column under the glass panel, down
// the room's left (D-380). Newest last; past
// the room left, the last spot says how many more ("+2"). The framed one's
// plaque has an amber edge (CL2).
import { drawText, textWidth } from './font.js';
import { faceOf } from './sprites.js';

export const PLAQUE_W = 22;
export const PLAQUE_H = 13;
const GAP = 2, FACE_W = 12; // the face sits 2 in, the icon centred 17 in
const PINK = '#e8786a', AMBER = '#ffc65c', EDGE = '#3a3448', FILL = '#1b1824', GREY = '#9790a4';
const ARROW = ['#..', '##.', '###', '##.', '#..']; // pointing right
const FANGS = ['#####', '.#.#.', '.#.#.'];

function shape(rows) {
  const c = document.createElement('canvas'), g = c.getContext('2d');
  c.width = rows[0].length; c.height = rows.length;
  g.fillStyle = PINK;
  rows.forEach((r, y) => [...r].forEach((ch, x) => { if (ch === '#') g.fillRect(x, y, 1, 1); }));
  return c;
}
// The arrow's rows turned to point dx, dy
function turned(dx, dy) {
  if (dx === 1) return ARROW;
  if (dx === -1) return ARROW.map((r) => [...r].reverse().join(''));
  const col = (i) => ARROW.map((r) => r[i]).join('');
  return [0, 1, 2].map((i) => col(dy === 1 ? i : 2 - i));
}
let ICONS; // made on first draw, once
function icons() {
  ICONS = { bite: shape(FANGS) };
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) ICONS[`${dx},${dy}`] = shape(turned(dx, dy));
  return ICONS;
}
const iconOf = (move) => (ICONS || icons())[move.kind === 'bite' ? 'bite' : `${move.dx},${move.dy}`];

// The drawn part of a 16 × 16 sprite, found once per sprite
const boxes = new Map();
function boxOf(img) {
  if (boxes.has(img)) return boxes.get(img);
  const { data } = img.getContext('2d').getImageData(0, 0, img.width, img.height);
  let x0 = img.width, y0 = img.height, x1 = -1, y1 = -1;
  for (let i = 3; i < data.length; i += 4) {
    if (!data[i]) continue;
    const x = (i >> 2) % img.width, y = Math.floor((i >> 2) / img.width);
    x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
  }
  const box = { x: x0, y: y0, w: Math.max(0, x1 - x0 + 1), h: Math.max(0, y1 - y0 + 1) };
  boxes.set(img, box);
  return box;
}

function drawPlaque(c, x, y, framed = false) {
  c.fillStyle = framed ? AMBER : EDGE; c.fillRect(x, y, PLAQUE_W, PLAQUE_H);
  c.fillStyle = FILL; c.fillRect(x + 1, y + 1, PLAQUE_W - 2, PLAQUE_H - 2);
}
function drawEntry(c, { e, move }, x, y, framed) {
  drawPlaque(c, x, y, framed);
  // A face wider than its spot keeps its middle (the lampmoth's wingtips go), a taller one its top
  const img = faceOf(e), b = boxOf(img), w = Math.min(b.w, FACE_W), h = Math.min(b.h, PLAQUE_H - 2);
  c.drawImage(img, b.x + ((b.w - w) >> 1), b.y, w, h, x + 2, y + 1 + ((PLAQUE_H - 2 - h) >> 1), w, h);
  if (!move) return;
  const icon = iconOf(move);
  c.drawImage(icon, x + 17 - (icon.width >> 1), y + 6 - (icon.height >> 1));
}
function drawMore(c, n, x, y) {
  drawPlaque(c, x, y);
  const text = `+${n}`;
  drawText(c, text, x + ((PLAQUE_W - textWidth(text)) >> 1), y + 3, GREY);
}

// Where the plaques go for n creatures, from x, y across (upright) or down (sideways),
// as many as fit before `end` (the row's right edge, or the column's foot):
// `shown` plaques, then "+N" in the next spot when `more`
function layout(n, x, y, across, end) {
  const step = (across ? PLAQUE_W : PLAQUE_H) + GAP, start = across ? x : y;
  const fit = Math.max(0, Math.floor((end - start + GAP) / step));
  const more = n > fit && fit > 0, shown = n > fit ? Math.max(0, fit - 1) : n;
  return { shown, more, at: (i) => (across ? [x + i * step, y] : [x, y + i * step]) };
}

// `list` in order, newest last; `framed(e)` whether e's plaque has the amber edge
export function drawCreatureList(c, list, x, y, across, end, framed = () => false) {
  const { shown, more, at } = layout(list.length, x, y, across, end);
  for (let i = 0; i < shown; i++) drawEntry(c, list[i], ...at(i), framed(list[i].e));
  if (more) drawMore(c, list.length - shown, ...at(shown));
}
// How many plaques show, the "+N" left out
export const plaquesShown = (n, x, y, across, end) => layout(n, x, y, across, end).shown;
// The index of the shown plaque under px, py (in the list's own pixels), or -1; "+N" is none
export function plaqueAt(n, x, y, across, end, px, py) {
  const { shown, at } = layout(n, x, y, across, end);
  for (let i = 0; i < shown; i++) {
    const [qx, qy] = at(i);
    if (px >= qx && px < qx + PLAQUE_W && py >= qy && py < qy + PLAQUE_H) return i;
  }
  return -1;
}
