// § leap: chapter 1's found ability, given by beating the Lampeater (beaten.js; D-939, D-954, D-962). Kept on
// the journey only (`state.leap`), never the profile: a new journey has to earn it again, and a
// hardcore fall's fresh start loses it. Plain data, no drawing.
import { tileAt } from './room.js';
import { enemyAt } from './enemies.js';
import { personAt } from './people.js';
import { offEdge } from './openings.js';
import { say } from './lines.js';
import { note } from './events.js';
import { DIRS } from './state.js';

// § over: the tile between can be open floor, a creature or person, or a low thing (water, rubble,
// the bench, a brazier); never a wall or a tall solid thing (D-962)
const over = (state, x, y) => !offEdge(state.room, x, y) && (!tileAt(state.room, x, y).solid || tileAt(state.room, x, y).low);
// § land: the tile 2 on must be open: in the room, not solid, no creature or person on it
const lands = (state, x, y) => !offEdge(state.room, x, y) && !tileAt(state.room, x, y).solid && !enemyAt(state, x, y) && !personAt(state, x, y);

// § leap: (state, dir, step) → the state with the hero 2 tiles on, one turn, as a step onto the
// landing tile from the tile between does: what lies there taken, stairs taken, the creatures'
// turn after (`step`, passed in from turn.js). Blocked, the same state with its line, free (D-962)
export function leap(state, dir, step) {
  if (!state.leap) return state;
  const [dx, dy] = DIRS[dir], h = state.hero;
  const mid = { x: h.x + dx, y: h.y + dy }, x = h.x + 2 * dx, y = h.y + 2 * dy;
  if (!over(state, mid.x, mid.y)) return say(state, 'leapTooTall');
  if (!lands(state, x, y)) return say(state, 'leapNoRoom');
  return note(step({ ...state, hero: mid }, dir), 'leap', { from: h, x, y });
}
