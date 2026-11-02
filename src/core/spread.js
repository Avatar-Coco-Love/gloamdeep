// § spread: where drops that didn't fit in the bag lie, near the tile they came from
// (W2, D-316); split from turn.js for the garden bed's Pick (D-568). Plain data, no drawing.
import { tileAt } from './room.js';

// k tiles for what didn't fit: x, y first, then the nearest open ones around it with
// nothing on them and no hero, sides before corners; x, y again when none is left.
// With `free`, x, y too only when nothing lies on it (a drop, D-474).
export function spread(state, x, y, k, free = false) {
  const around = [[0, 0], [0, 1], [-1, 0], [1, 0], [0, -1], [-1, 1], [1, 1], [-1, -1], [1, -1]].map(([dx, dy]) => ({ x: x + dx, y: y + dy }));
  const open = around.filter((t) => (!free && t.x === x && t.y === y) || (!tileAt(state.room, t.x, t.y).solid
    && !(t.x === state.hero.x && t.y === state.hero.y) && !state.items.some((o) => o.x === t.x && o.y === t.y)));
  return Array.from({ length: k }, (_, i) => open[i] || { x, y });
}
