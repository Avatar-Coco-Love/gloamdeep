// § homeward: a freed person heading home (split from rescue.js, D-496). Freed, they wait,
// `leaves` set; their turns up, they say their `leaving` line and stand at once at home in
// the woods (D-492); the hero leaving the room first, they go home too.
import { tileAt, withTile } from './room.js';
import { joined } from './regrow.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { note } from './events.js';
import { personAt } from './people.js';
import { fresh } from './stairs.js';

// § leave: at the end of a turn, each freed person whose turns are up says their `leaving`
// line and goes home, a `leave` event where they stood (D-496)
export function leave(state) {
  const going = (state.people || []).filter((p) => p.leaves !== undefined && state.turn >= p.leaves);
  return going.reduce((s, p) => note(say(goHome(s, p.id), get(p.id).leaving), 'leave', { id: p.id, x: p.x, y: p.y }), without(state, going));
}
// § send: the hero gone from place `from`, those still waiting there go home too, saying
// nothing (D-496)
export function send(state, from) {
  const left = state.elsewhere[from], going = (left?.people || []).filter((p) => p.leaves !== undefined);
  if (!going.length) return state;
  const there = { ...left, people: left.people.filter((p) => !going.includes(p)) };
  return going.reduce((s, p) => goHome(s, p.id), { ...state, elsewhere: { ...state.elsewhere, [from]: there } });
}
const without = (state, going) => (going.length ? { ...state, people: state.people.filter((p) => !going.includes(p)) } : state);

// § home: (state, id) → the state with person `id` standing in the woods, `home` set, on
// the open tile nearest its middle by steps (up, down, left, right): not the middle
// itself, where Go outside lands, nothing solid, no item, no one else there, and the
// room left joined around them (D-492). The woods wait in `elsewhere` (stairs.js).
export const HOME = 'woods';
export function goHome(state, id) {
  const here = state.place === HOME, there = here ? state : state.elsewhere[HOME] || fresh(HOME, state.seed);
  const spot = homeSpot(there);
  if (!spot) return state;
  const people = [...(there.people || []), { id, ...spot, home: true }];
  return here ? { ...state, people } : { ...state, elsewhere: { ...state.elsewhere, [HOME]: { ...there, people } } };
}

function homeSpot(there) {
  const { room } = there, start = { x: room.cols >> 1, y: room.rows >> 1 }, seen = new Set([`${start.x},${start.y}`]), queue = [start];
  const taken = (x, y) => (there.items || []).some((it) => it.x === x && it.y === y) || personAt(there, x, y);
  for (let i = 0; i < queue.length; i++) {
    for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
      const x = queue[i].x + dx, y = queue[i].y + dy;
      if (seen.has(`${x},${y}`) || x < 1 || y < 1 || x > room.cols - 2 || y > room.rows - 2 || tileAt(room, x, y).solid) continue;
      seen.add(`${x},${y}`);
      queue.push({ x, y });
      if (!taken(x, y) && joined(withTile(room, x, y, get('rubble')))) return { x, y };
    }
  }
  return null;
}
