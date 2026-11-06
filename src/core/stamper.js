// § stamper: a landmark (landmarks.js) set aside in a generated room before its finds are
// placed (D-587). First a spot: the middle nearest the room's, its plan, its pad (D-620) and a
// ring of one open tile around it two tiles in from the edges, with no stairs on it or beside it. Then,
// as each try of the room is dug (cave.js), the whole patch is opened and joined by a tunnel
// to the rest; the doors and stairs are dug; then the plan is stamped in the middle of the
// patch, its ring left open so every arm can be walked to. The finds go where they fit
// after that, and the try is made again if anything is cut off. The tunnel takes its own
// seed, so a room without a landmark stays as it was. Plain data, no drawing.
import { stamp, around } from './landmarks.js';

// The open ring around the plan, as the home stone's trees are cleared one tile (D-589)
export const RING = 1;
// How far in from the room's edges the patch keeps
const EDGE = 2;
// The open ring around a landmark's plan in a generated room: RING, and its own pad (D-620)
export const ringOf = (mark) => RING + (mark.pad || 0);

// (mark, cols, rows, keep) → the middle { x, y } nearest the room's middle where the patch fits,
// none of `keep` (the stairs, as { x, y }) on it or beside it; null when none fits
export function spotIn(mark, cols, rows, keep = []) {
  const hw = (mark.plan[0].length >> 1) + ringOf(mark), hh = (mark.plan.length >> 1) + ringOf(mark), mid = { x: cols >> 1, y: rows >> 1 };
  const spots = [];
  for (let y = EDGE + hh; y < rows - EDGE - hh; y++) for (let x = EDGE + hw; x < cols - EDGE - hw; x++) spots.push({ x, y });
  spots.sort((a, b) => Math.hypot(a.x - mid.x, a.y - mid.y) - Math.hypot(b.x - mid.x, b.y - mid.y) || a.y - b.y || a.x - b.x);
  const clear = (s) => keep.every((k) => Math.abs(k.x - s.x) > hw + 1 || Math.abs(k.y - s.y) > hh + 1);
  return spots.find(clear) || null;
}

// The patch opened on g (rows of letters, as arrays) and joined by `dig` (r, g, from, to) from
// its tile nearest the open floor outside it, when there is any
export function setAside(r, g, mark, at, dig) {
  const patch = around(mark, at.x, at.y, ringOf(mark)), on = (t) => patch.some((p) => p.x === t.x && p.y === t.y);
  const outside = [];
  for (let y = 0; y < g.length; y++) for (let x = 0; x < g[0].length; x++) if (g[y][x] === '.' && !on({ x, y })) outside.push({ x, y });
  for (const t of patch) g[t.y][t.x] = '.';
  if (!outside.length) return g;
  const d = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  let best = null;
  for (const p of patch) for (const o of outside) if (!best || d(p, o) < best.d) best = { p, o, d: d(p, o) };
  dig(r, g, best.p, best.o);
  return g;
}

// The plan stamped in the middle of its patch, its pad (D-620) laid while the room is made as the
// old 5 × 5 stone was, its arms walked on and stone the rest, so the room comes out as it did
export function stampIn(g, mark, at) {
  for (const t of padOf(mark, at)) g[t.y][t.x] = t.x === at.x || t.y === at.y ? 'X' : 'Y';
  stamp(g, mark, at.x, at.y);
  return g;
}
// Once the room is made, the pad is plain floor again (map: rows of letters)
export function unpad(map, mark, at) {
  const g = map.map((line) => [...line]);
  for (const t of padOf(mark, at)) g[t.y][t.x] = '.';
  return g.map((row) => row.join(''));
}
const padOf = (mark, at) => {
  const inPlan = (t) => Math.abs(t.x - at.x) <= mark.plan[0].length >> 1 && Math.abs(t.y - at.y) <= mark.plan.length >> 1;
  return around(mark, at.x, at.y, mark.pad || 0).filter((t) => !inPlan(t));
};
