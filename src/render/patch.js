// § patch (F-9, D-1003): what a change to the room on screen needs repainted. A chop or
// dig in the woods changes a tile or two, and repainting the whole room and its border
// stalled the screen (0.1 s, 0.4 s on a slow phone). `was` and `now` are { room, place, seed }.
// 'all': the room and its border, as before, for a new room, any look but the woods, or a
// change within NEAR tiles of the edge (its doorways and border may change with it).
// 'none': the woods' tiles are the same (the first turn's `day` changes the room, not its look).
// 'room': the room alone, the border kept, for a change by water, the cave mouth or rock,
// whose ground reads the tiles round it. Else { x, y, w, h }: the tiles to repaint, the changed
// ones and their neighbours, as a tree's crown reaches into the next tile (woods.js).
import { tileAt } from '../core/room.js';

const NEAR = 2, AROUND = 3; // tiles: from the edge; looked round for water, the mouth and rock
const OWN_GROUND = ['water', 'caveMouth', 'outcrop'];

export function repaintOf(was, now) {
  const a = was?.room, b = now.room;
  if (!a || was.place !== now.place || was.seed !== now.seed || b.look !== 'woods' || a.look !== b.look || a.cols !== b.cols || a.rows !== b.rows) return 'all';
  let x0 = b.cols, y0 = b.rows, x1 = -1, y1 = -1;
  for (let y = 0; y < b.rows; y++) {
    if (a.map[y] === b.map[y]) continue;
    for (let x = 0; x < b.cols; x++) if (a.map[y][x] !== b.map[y][x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  }
  if (x1 < 0) return 'none';
  if (x0 < NEAR || y0 < NEAR || x1 >= b.cols - NEAR || y1 >= b.rows - NEAR) return 'all';
  for (let y = y0 - AROUND; y <= y1 + AROUND; y++) for (let x = x0 - AROUND; x <= x1 + AROUND; x++) {
    if (OWN_GROUND.includes(tileAt(a, x, y).id) || OWN_GROUND.includes(tileAt(b, x, y).id)) return 'room';
  }
  return { x: x0 - 1, y: y0 - 1, w: x1 - x0 + 3, h: y1 - y0 + 3 };
}
