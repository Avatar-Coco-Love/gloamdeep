// § rescue: clearing the rubble that traps a person (step 12b, D-491). Rubble is dug
// as a deposit is, by hand, its `dig.hits` bumps a turn each: the room keeps each
// heap's bumps in `chips`, by tile, as it keeps a deposit's. Before the last bump the
// person trapped beside it calls out: their `calls` line while nothing beside them is
// dug yet, then their `digging` lines, taking turns (D-496); with no one there, the
// rubble's own `chips` line. The last bump clears it to floor and gives nothing. A
// person straight up, down, left or right of it is then free, a corner opening no way (D-498): they thank the hero with their `freed` line and stay,
// `leaves` set, until their turns are up (homeward.js, D-496); then they head home: they
// stand at once in the woods, beside its middle (step 12c, D-492). Each bump is a `chip`
// event, a person freed a `free` one, a person gone a `leave` one.
// Cleared rubble never comes back.
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
    const call = who && (dugBeside(state, person) ? who.digging : who.calls);
    return endTurn(state, say(note(passTurn({ ...state, room }), 'chip', { id: tile.id, n }), call || chips[n - 1]));
  }
  const room = { ...withTile(state.room, x, y, get('floor')), chips: rest };
  const dug = note(passTurn({ ...state, room }), 'chip', { id: tile.id, n });
  if (!person || Math.abs(person.x - x) + Math.abs(person.y - y) !== 1) return endTurn(state, say(dug, breaks)); // a corner opens no way to them (D-498)
  const people = dug.people.map((p) => (p === person ? { ...p, leaves: dug.turn + who.waits[0] } : p));
  return endTurn(state, say(note({ ...dug, people }, 'free', { id: person.id }), who.freed));
}

// Whether any rubble beside person p has been bumped already, or a heap there cleared (D-498)
const dugBeside = (state, p) => Object.keys(state.room.chips ?? {}).some((k) => {
  const [x, y] = k.split(',').map(Number);
  return Math.max(Math.abs(p.x - x), Math.abs(p.y - y)) === 1;
}) || AROUND.some(([dx, dy]) => tileAt(state.room, p.x + dx, p.y + dy).id !== 'rubble');
const AROUND = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

// § waiting: a freed person bumped says their `waiting` lines, taking turns, free, and
// stays `waits[1]` turns from now (D-496)
export function talk(state, person) {
  const who = get(person.id), people = state.people.map((p) => (p === person ? { ...p, leaves: state.turn + who.waits[1] } : p));
  return say({ ...state, people }, who.waiting);
}
