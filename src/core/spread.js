// § spread: where drops that didn't fit in the bag lie, near the tile they came from
// (W2, D-316); split from turn.js for the garden bed's Pick (D-568). Plain data, no drawing.
import { tileAt } from './room.js';
import { personAt } from './people.js';

// k tiles for what didn't fit: x, y first, then the nearest open ones around it with
// nothing on them and no hero, creature or person (R7), sides before corners; with none
// left, the next ring out, and so on, nearest first (D-869); x, y again when the room has none.
// With `free`, x, y too only when it is open (D-474); with `free` 'stack', open even with
// something lying on it, so a beaten foe's drop lies beside what was there (D-727).
export function spread(state, x, y, k, free = false) {
  const stacks = (t) => free === 'stack' && t.x === x && t.y === y;
  const fits = (t) => (!free && t.x === x && t.y === y) || (!tileAt(state.room, t.x, t.y).solid
    && !(t.x === state.hero.x && t.y === state.hero.y) && (stacks(t) || !state.items.some((o) => o.x === t.x && o.y === t.y))
    && !(state.enemies || []).some((e) => e.x === t.x && e.y === t.y) && !personAt(state, t.x, t.y));
  const open = [], far = Math.max(state.room.cols, state.room.rows);
  for (let r = 0; open.length < k && r < far; r++) open.push(...ringAt(r).map(([dx, dy]) => ({ x: x + dx, y: y + dy })).filter(fits));
  return Array.from({ length: k }, (_, i) => open[i] || { x, y });
}

// The steps r tiles out (diagonals count): the first ring sides before corners, as it always
// was; each further one nearest first
const FIRST = [[0, 1], [-1, 0], [1, 0], [0, -1], [-1, 1], [1, 1], [-1, -1], [1, -1]];
function ringAt(r) {
  if (r === 0) return [[0, 0]];
  if (r === 1) return FIRST;
  const out = [];
  for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) if (Math.max(Math.abs(dx), Math.abs(dy)) === r) out.push([dx, dy]);
  return out.sort((a, b) => Math.abs(a[0]) + Math.abs(a[1]) - Math.abs(b[0]) - Math.abs(b[1]));
}
