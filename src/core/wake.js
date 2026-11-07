// § wake: stepping onto a sleeping waystone's plate wakes it (D-579, D-591). The tile turns
// to what it `wakes` to, for good, in its own room's map, so it is kept wherever the room is.
// The step is the turn: waking costs nothing more. A `stoneWake` event { x, y } for the sound
// and the rune kindling (main.js), and its line, "The waystone wakes."
import { tileAt, withTile } from './room.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { note } from './events.js';

// (state) → the state with the plate under the hero woken, or the same state
export function wakeStone(state) {
  const { x, y } = state.hero, to = tileAt(state.room, x, y).wakes;
  if (!to) return state;
  return note(say({ ...state, room: withTile(state.room, x, y, get(to)) }, 'stoneWakes'), 'stoneWake', { x, y });
}
