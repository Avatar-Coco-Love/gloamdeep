// § next-move marks: a small arrow just past a creature's tile, in the tile it
// steps onto next, and small fangs in the gap toward the hero when it bites
// (look D of the 0.2.119 mock-up). In the hostile marks' pink, outlined in the
// deepest dark, pulsing like the walk mark; steady with reduced motion.
// Drawn only for the framed creature (framed.js, D-357).
const PINK = '#e8786a', DARK = '#0e0c16';
const ARROW = ['oo...', 'o#o..', 'o##o.', 'o###o', 'o##o.', 'o#o..', 'oo...']; // pointing right
const FANGS = ['ooooooo', 'o#####o', 'o#o.o#o', 'ooo.ooo']; // pointing down
const GLOB = ['.ooo.', 'o###o', 'o###o', 'o###o', '.ooo.']; // a spit to come, the glob's mark (D-688)
const DOT = ['ooo', 'o#o', 'ooo']; // a turn left before a pile of bones stands (D-731)
const STING = ['...o...', '..o#o..', '.o#o#o.', 'o#o.o#o', '.o#o#o.', '..o#o..', '...o...']; // a tile a raised tail will strike (D-729)

// The arrow's rows turned to point dx, dy; the fangs only flip to point up
import { onWipe } from './wipe.js';
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
let ARROWS, BITES, SPIT, STRUCK, PIP; // made on first draw, once, and again after a wipe (D-588)
onWipe(() => { ARROWS = null; });
function make() {
  ARROWS = {}; BITES = {}; SPIT = shape(GLOB); STRUCK = shape(STING); PIP = shape(DOT);
  for (const [dx, dy] of WAYS) { ARROWS[key(dx, dy)] = shape(turned(ARROW, dx, dy)); BITES[key(dx, dy)] = shape(dy === -1 ? [...FANGS].reverse() : FANGS); }
}

// `moves` from nextMoves (core/creatureturn.js); `at(e)` is where creature e is shown, in tiles
export function drawMoves(c, moves, at, t, still) {
  if (!moves.length) return;
  if (!ARROWS) make();
  c.globalAlpha = still ? 1 : 0.6 + 0.4 * (Math.sin(t / 160) + 1) / 2;
  for (const { e, kind, dx, dy } of moves) {
    const p = at(e), img = kind === 'spit' ? SPIT : (kind === 'bite' ? BITES : ARROWS)[key(dx, dy)];
    if (!img) continue;
    // The point on the edge toward dx, dy of the tile it is shown on (sprites sit 2 up);
    // an arrow sits 4 past it, fangs 3 back from it (1 for up and down)
    const k = kind === 'bite' ? (dx ? -3 : -1) : 4; // a spit's glob mark sits where an arrow would
    const x = Math.round(p.x * 16) + 8 + dx * (8 + k), y = Math.round(p.y * 16) + 6 + dy * (8 + k);
    c.drawImage(img, Math.round(x - img.width / 2), Math.round(y - img.height / 2));
  }
  c.globalAlpha = 1;
}

// § strike marks (D-729): a pink diamond on each tile a raised tail will strike, pulsing as the
// marks do, for every raised one, framed or not, so the hero can step aside. `tiles` from struck (core/sting.js)
export function drawStrikes(c, tiles, t, still) {
  if (!tiles.length) return;
  if (!ARROWS) make();
  c.globalAlpha = still ? 1 : 0.6 + 0.4 * (Math.sin(t / 160) + 1) / 2;
  for (const { x, y } of tiles) c.drawImage(STRUCK, x * 16 + 8 - 3, y * 16 + 6 - 3);
  c.globalAlpha = 1;
}

// § pile marks (D-731): over each pile of bones, one small pink dot for each turn before it stands
// (3, 2, 1), in a row centred above the heap, pulsing as the marks do. `piles`: the piles to mark.
export function drawPiles(c, piles, t, still) {
  if (!piles.length) return;
  if (!ARROWS) make();
  c.globalAlpha = still ? 1 : 0.6 + 0.4 * (Math.sin(t / 160) + 1) / 2;
  for (const { x, y, pile } of piles) {
    const left = x * 16 + 8 - Math.floor((4 * pile - 1) / 2);
    for (let i = 0; i < pile; i++) c.drawImage(PIP, left + 4 * i, y * 16 + 2);
  }
  c.globalAlpha = 1;
}
