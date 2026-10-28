// § walk: a tap or held finger on a tile walks the hero there around walls
// (D-219, D-406, D-408). Plain data, no drawing. The way goes only over tiles the
// hero remembers, around enemies, and onto stairs only when they are the goal.
import { tileAt } from './room.js';
import { enemyAt } from './enemies.js';
import { litAt } from './sight.js';
import { DIRS } from './turn.js';
import { creatureList } from './creatureturn.js';

// (state, x, y) → the tiles of the shortest way to tile x, y, first step first, as
// [{ x, y }, …]. When no remembered way leads there (unknown dark, a wall, a
// creature), the way goes as far as remembered ground goes: to the tile it can
// reach nearest the goal, if nearer than the hero stands. [] when there is none.
// Ties go up, down, left, right, so the same room always gives the same way.
export function wayTo(state, x, y) {
  const { room, seen, hero } = state, cols = room.cols, goal = y * cols + x;
  const open = (tx, ty) => {
    if (tx < 0 || ty < 0 || tx >= cols || ty >= room.rows || !seen[ty * cols + tx]) return false;
    const tile = tileAt(room, tx, ty);
    if (tile.solid || enemyAt(state, tx, ty)) return false;
    return !tile.leads || ty * cols + tx === goal; // stairs are taken, so only as the goal
  };
  const far = (n) => Math.abs((n % cols) - x) + Math.abs(Math.floor(n / cols) - y);
  const start = hero.y * cols + hero.x, from = new Map([[start, null]]), queue = [start];
  let best = start;
  for (let i = 0; i < queue.length && best !== goal; i++) {
    const c = queue[i];
    for (const [dx, dy] of Object.values(DIRS)) {
      const nx = (c % cols) + dx, ny = Math.floor(c / cols) + dy, n = ny * cols + nx;
      if (from.has(n) || !open(nx, ny)) continue;
      from.set(n, c);
      queue.push(n);
      if (far(n) < far(best)) best = n;
      if (n === goal) break;
    }
  }
  const way = [];
  for (let n = best; n !== start; n = from.get(n)) way.unshift({ x: n % cols, y: Math.floor(n / cols) });
  return way;
}

// § in view: the creatures and items on lit tiles now
export const inView = (state) => [...state.enemies, ...state.items].filter((t) => litAt(state, t.x, t.y));

// (before, after) → true when an item came into view with the step. It counts by itself.
const findCame = (before, after) => {
  const was = inView(before);
  return inView(after).some((t) => after.items.includes(t) && !was.includes(t));
};
// A creature by how many are in view, since a turn makes each one anew
const foesSeen = (s) => inView(s).filter((t) => s.enemies.includes(t)).length;

// (before, after) → true when a creature or an item came into view with the step (D-219)
export const cameIntoView = (before, after) => foesSeen(after) > foesSeen(before) || findCame(before, after);

// (before, after, stop) → true when the walk stops by itself after the step (D-407,
// D-408): a find coming into view, and a creature as it comes into view ('sight'),
// or once more creatures have noticed the hero ('noticed', as the plaques show them)
export function stopsWalk(before, after, stop) {
  if (stop !== 'noticed') return cameIntoView(before, after);
  return findCame(before, after) || creatureList(after).length > creatureList(before).length;
}
