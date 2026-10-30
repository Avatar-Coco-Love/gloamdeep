// § rescue: clearing the rubble that traps a person (step 12b, D-491). Rubble is dug
// as a deposit is, by hand, its `dig.hits` bumps a turn each: the room keeps each
// heap's bumps in `chips`, by tile, as it keeps a deposit's. Before the last bump the
// person trapped beside it calls out, their lines taking turns; with no one there, the
// rubble's own `chips` line. The last bump clears it to floor and gives nothing. A
// person beside it is then free: they thank the hero with their `freed` line and are
// gone from the room, heading home: they stand at once in the woods, beside its middle,
// home (step 12c, D-492). Each bump is a `chip` event, a person freed a `free` one.
// Cleared rubble never comes back.
import { tileAt, withTile } from './room.js';
import { joined } from './regrow.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { note } from './events.js';
import { passTurn } from './state.js';
import { endTurn } from './endturn.js';
import { personAt, personBeside } from './people.js';
import { fresh } from './stairs.js';

export function dig(state, x, y) {
  const tile = tileAt(state.room, x, y), { hits, chips, breaks } = tile.dig;
  const key = `${x},${y}`, n = (state.room.chips?.[key] ?? 0) + 1;
  const { [key]: was, ...rest } = state.room.chips ?? {};
  const person = personBeside(state, x, y), who = person && get(person.id);
  if (n < hits) {
    const room = { ...state.room, chips: { ...rest, [key]: n } };
    return endTurn(state, say(note(passTurn({ ...state, room }), 'chip', { id: tile.id, n }), who?.calls || chips[n - 1]));
  }
  const room = { ...withTile(state.room, x, y, get('floor')), chips: rest };
  const dug = note(passTurn({ ...state, room }), 'chip', { id: tile.id, n });
  if (!person) return endTurn(state, say(dug, breaks));
  const freed = note({ ...dug, people: dug.people.filter((p) => p !== person) }, 'free', { id: person.id });
  return endTurn(state, say(goHome(freed, person.id), who.freed));
}

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
