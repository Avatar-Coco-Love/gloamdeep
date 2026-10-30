// § rescue: clearing the rubble that traps a person (step 12b, D-491). Rubble is dug
// as a deposit is, by hand, its `dig.hits` bumps a turn each: the room keeps each
// heap's bumps in `chips`, by tile, as it keeps a deposit's. Before the last bump the
// person trapped beside it calls out, their lines taking turns; with no one there, the
// rubble's own `chips` line. The last bump clears it to floor and gives nothing. A
// person beside it is then free: they thank the hero with their `freed` line and are
// gone from the room, heading home. Each bump is a `chip` event, a person freed a
// `free` one. Cleared rubble never comes back.
import { tileAt, withTile } from './room.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { note } from './events.js';
import { passTurn } from './state.js';
import { endTurn } from './endturn.js';
import { personBeside } from './people.js';

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
  return endTurn(state, say(freed, who.freed));
}
