// § draft: where the motes drift (D-581, D-605, D-653). Plain data, no drawing.
// Along the way you can walk to the floor's nearest stairs down, through its
// openings and round its bends, never into a wall (D-653, supersedes D-605's
// straight line through walls): the motes aim at the farthest tile of that way
// the hero can see from where they stand, so they turn together at a bend or
// junction. Nothing once any of the floor's stairs down is remembered, or the
// floor has none (not counting the far side of the cave mouth).
import { depthOf, tileAt } from './room.js';
import { partPlan, downsOf } from './map.js';

// § layout: the floor laid out from this room, worked out once per seed and room:
// its rooms with their stairs down, and how many steps each open floor tile is
// from the nearest stairs down (-1 where they can't be walked to)
const laid = new Map();
function layout(state) {
  const k = `${state.seed}:${state.place}`;
  if (!laid.has(k)) {
    const plan = partPlan(state, true, depthOf(state.place), state.place);
    const here = { x: plan.hero.x - state.hero.x, y: plan.hero.y - state.hero.y };
    const rooms = plan.rooms.map(({ id, x, y, room }) => ({ id, x, y, room, downs: downsOf(room) }));
    laid.set(k, { here, rooms, ...steps(plan, rooms) });
  }
  return laid.get(k);
}

// The floor's open tiles and each one's steps to the nearest stairs down
function steps(plan, rooms) {
  const W = plan.cols, H = plan.rows, open = new Uint8Array(W * H), dist = new Int32Array(W * H).fill(-1);
  for (const { x, y, room } of rooms) for (let ty = 0; ty < room.rows; ty++) for (let tx = 0; tx < room.cols; tx++) {
    if (!tileAt(room, tx, ty).solid) open[(y + ty) * W + x + tx] = 1;
  }
  const at = (x, y) => (x >= 0 && y >= 0 && x < W && y < H ? open[y * W + x] : 0);
  for (const s of plan.seams) if (s.ends.every(([ex, ey]) => at(ex, ey))) open[s.y * W + s.x] = 1; // a doorway
  const todo = [];
  for (const { x, y, downs } of rooms) for (const d of downs) { const i = (y + d.y) * W + x + d.x; open[i] = 1; dist[i] = 0; todo.push(i); }
  for (let n = 0; n < todo.length; n++) {
    const i = todo[n], x = i % W, y = (i - x) / W;
    for (const [dx, dy] of SIDES) if (at(x + dx, y + dy) && dist[i + dy * W + dx] < 0) { dist[i + dy * W + dx] = dist[i] + 1; todo.push(i + dy * W + dx); }
  }
  return { W, open, dist, at };
}
const SIDES = [[0, -1], [1, 0], [0, 1], [-1, 0]];

// Whether every tile on the straight line between two tiles' centres is open
function inSight({ at }, ax, ay, bx, by) {
  const n = Math.ceil(Math.max(Math.abs(bx - ax), Math.abs(by - ay)) * 4);
  for (let k = 1; k < n; k++) if (!at(Math.round(ax + ((bx - ax) * k) / n), Math.round(ay + ((by - ay) * k) / n))) return false;
  return true;
}

// § way: (state) → the tile the motes drift toward, in this room's own tiles
// (maybe outside it), or null when there is no draft. Worked out once per tile the hero stands on.
let last = { k: null, to: null };
export function draftTo(state) {
  const known = (id) => (id === state.place ? state : state.elsewhere[id]);
  const f = layout(state);
  for (const { id, downs } of f.rooms) {
    const seen = known(id)?.seen, cols = known(id)?.room.cols;
    if (downs.some((d) => seen?.[d.y * cols + d.x])) return null;
  }
  const k = `${state.seed}:${state.place}:${state.hero.x},${state.hero.y}`;
  if (last.k !== k) last = { k, to: wayFrom(f, state.hero.x + f.here.x, state.hero.y + f.here.y) };
  return last.to && { x: last.to.x - f.here.x, y: last.to.y - f.here.y };
}

// Down the steps from the hero's floor tile, to the farthest tile still in sight
function wayFrom(f, hx, hy) {
  const { W, dist } = f;
  if (!f.at(hx, hy) || dist[hy * W + hx] < 0) return null;
  let x = hx, y = hy, to = { x, y };
  while (dist[y * W + x] > 0) {
    const next = SIDES.map(([dx, dy]) => [x + dx, y + dy]).find(([nx, ny]) => f.at(nx, ny) && dist[ny * W + nx] === dist[y * W + x] - 1);
    [x, y] = next;
    if (!inSight(f, hx, hy, x, y)) break;
    to = { x, y };
  }
  return to.x === hx && to.y === hy ? null : to;
}
