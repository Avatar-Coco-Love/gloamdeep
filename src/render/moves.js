// § next-move marks: a small arrow just past a creature's tile, in the tile it
// steps onto next, and small fangs in the gap toward the hero when it bites
// (look D of the 0.2.119 mock-up). In the hostile marks' pink, outlined in the
// deepest dark, pulsing like the walk mark; steady with reduced motion.
// Drawn only for the framed creature (framed.js, D-357).
const PINK = '#e8786a', DARK = '#0e0c16';
const ARROW = ['oo...', 'o#o..', 'o##o.', 'o###o', 'o##o.', 'o#o..', 'oo...']; // pointing right
const FANGS = ['ooooooo', 'o#####o', 'o#o.o#o', 'ooo.ooo']; // pointing down

// The arrow's rows turned to point dx, dy; the fangs only flip to point up
function turned(rows, dx, dy) {
  const w = rows[0].length, col = (i) => rows.map((r) => r[i]).join('');
  if (dx === 1) return rows;
  if (dx === -1) return rows.map((r) => [...r].reverse().join(''));
  return [...rows[0]].map((_, i) => col(dy === 1 ? i : w - 1 - i));
}
function shape(rows) {
  const c = document.createElement('canvas'), g = c.getContext('2d');
  c.width = rows[0].length; c.height = rows.length;
  rows.forEach((r, y) => [...r].forEach((ch, x) => {
    if (ch === '.') return;
    g.fillStyle = ch === '#' ? PINK : DARK; g.fillRect(x, y, 1, 1);
  }));
  return c;
}
const key = (dx, dy) => `${dx},${dy}`;
const WAYS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
let ARROWS, BITES; // made on first draw, once
function make() {
  ARROWS = {}; BITES = {};
  for (const [dx, dy] of WAYS) { ARROWS[key(dx, dy)] = shape(turned(ARROW, dx, dy)); BITES[key(dx, dy)] = shape(dy === -1 ? [...FANGS].reverse() : FANGS); }
}

// `moves` from nextMoves (core/turn.js); `at(e)` is where creature e is shown, in tiles
export function drawMoves(c, moves, at, t, still) {
  if (!moves.length) return;
  if (!ARROWS) make();
  c.globalAlpha = still ? 1 : 0.6 + 0.4 * (Math.sin(t / 160) + 1) / 2;
  for (const { e, kind, dx, dy } of moves) {
    const p = at(e), img = (kind === 'bite' ? BITES : ARROWS)[key(dx, dy)];
    if (!img) continue;
    // The point on the edge toward dx, dy of the tile it is shown on (sprites sit 2 up);
    // an arrow sits 4 past it, fangs 3 back from it (1 for up and down)
    const k = kind === 'bite' ? (dx ? -3 : -1) : 4;
    const x = Math.round(p.x * 16) + 8 + dx * (8 + k), y = Math.round(p.y * 16) + 6 + dy * (8 + k);
    c.drawImage(img, Math.round(x - img.width / 2), Math.round(y - img.height / 2));
  }
  c.globalAlpha = 1;
}
