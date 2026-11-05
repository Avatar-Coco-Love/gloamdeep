// § far sight: the Far Sight boon (D-602, builds on D-596). Arriving in a room never seen, the
// part of its floor nearest the hero, counted in steps, is remembered at once: the boon's
// `shows` of the room's floor tiles (a third), with the walls and water beside them.
// It is remembered as if the lantern had found it, and stays when the boon ends; stairs in it
// count as found, so their glow lights (D-194). A room with anything remembered is unchanged.
// Plain data, no drawing.
import { tileAt } from './room.js';
import { boonOf } from './boon.js';

// (state) → the same state, or one with the third nearest the hero remembered
export function farSight(state) {
  const shows = boonOf(state)?.shows, { room, hero, seen } = state;
  if (!shows || seen.some(Boolean)) return state;
  const { cols, rows } = room, open = (x, y) => x >= 0 && y >= 0 && x < cols && y < rows && !tileAt(room, x, y).solid;
  let floor = 0;
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if (open(x, y)) floor++;
  const want = Math.ceil(floor * shows), near = [], been = new Uint8Array(cols * rows), queue = [[hero.x, hero.y]];
  been[hero.y * cols + hero.x] = 1;
  while (queue.length && near.length < want) {
    const [x, y] = queue.shift();
    near.push([x, y]);
    for (const [dx, dy] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
      const nx = x + dx, ny = y + dy;
      if (open(nx, ny) && !been[ny * cols + nx]) { been[ny * cols + nx] = 1; queue.push([nx, ny]); }
    }
  }
  const out = seen.slice();
  for (const [x, y] of near) for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    const nx = x + dx, ny = y + dy;
    if (dx === 0 && dy === 0) out[y * cols + x] = 1;
    else if (nx >= 0 && ny >= 0 && nx < cols && ny < rows && !open(nx, ny)) out[ny * cols + nx] = 1; // walls, not more floor
  }
  return { ...state, seen: out };
}
