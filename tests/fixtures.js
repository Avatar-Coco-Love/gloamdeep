// § fixtures: what new tests share (H-105), so a setup is written once, not copied.
// Older tests keep their own; a test touched for another reason may move to these.
import { makeState } from '../src/core/state.js';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';

// § seeds: a sweep's seeds, 1 to n. `npm run quick` sets GLOAMDEEP_QUICK and each sweep runs
// a tenth of its seeds, at least 10, while working; `npm test` runs them all, before the
// handoff and in every PR (H-103).
export const QUICK = !!process.env.GLOAMDEEP_QUICK;
export const sweep = (n) => (QUICK ? Math.min(n, Math.max(10, Math.ceil(n / 10))) : n);
export const seeds = (n) => Array.from({ length: sweep(n) }, (_, i) => i + 1);

// § states: the first room, alone, as most tests begin
export const firstRoom = () => makeRoom(FIRST_ROOM);
// the first room's state with anything changed: start({ bag, oil: 1 })
export const start = (more = {}) => ({ ...makeState(firstRoom()), ...more });
// the hero standing at x, y in a state (the first room's if none)
export const at = (x, y, s = start()) => ({ ...s, hero: { x, y } });

// § walking: the four sides, the four ways by name, and every tile reached from `from`
// through tiles `open(x, y)` allows. Moved from leapgap.test.js (H-106).
export const SIDES = [[1, 0], [-1, 0], [0, 1], [0, -1]];
export const WAYS = { right: [1, 0], left: [-1, 0], down: [0, 1], up: [0, -1] };
export const walk = (room, from, open) => {
  const seen = new Set([`${from.x},${from.y}`]), queue = [from];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of SIDES) {
      const x = t.x + dx, y = t.y + dy, k = `${x},${y}`;
      if (x >= 0 && y >= 0 && x < room.cols && y < room.rows && !seen.has(k) && open(x, y)) { seen.add(k); queue.push({ x, y }); }
    }
  }
  return seen;
};
