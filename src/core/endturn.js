// § end turn: waiting, and the end of every passed turn (split from turn.js, D-362)
import { say, oilLine } from './lines.js';
import { discover, levelOf } from './xp.js';
import { note } from './events.js';
import { regrow } from './regrow.js';
import { passTurn } from './state.js';
import { enemiesAct } from './creatureturn.js';
import { get } from './registry.js';
import { withTile } from './room.js';

// § wait: stand still for one turn (D-084). It passes a turn like a step,
// so oil burns while the lantern is lit (D-037).
export const wait = (state) => endTurn(state, passTurn(state));
// The end of a passed turn: the oil line, if one was crossed, a new room's
// experience (D-245), the level line if a level was reached, which replaces
// any other line (D-246), then the enemies' turn, but for a room just come
// into: the hero's first step there is their own (D-446). Another room is an `enter`
// event, a new one a `found` too, and a level reached a `level`. Last, what
// was taken here and is due grows back out of sight, or anywhere in a room
// just come into, as it grew while the hero was away (regrow.js, D-307), and a torch
// set down whose time is up goes out (D-478).
export const endTurn = (before, after) => {
  const id = oilLine(before.oil, after.oil), place = after.place;
  let found = discover(before, id ? say(after, id) : after);
  if (place !== before.place) found = note(found, 'enter', { place });
  if (found.found.length > after.found.length) found = note(found, 'found', { place });
  const level = levelOf(found.xp), moved = place !== before.place;
  const done = level > levelOf(before.xp) ? note(say(found, 'levelUp', level), 'level', { n: level }) : found;
  return burnOut(regrow(moved ? done : enemiesAct(done), moved), moved);
};

// § burn out: a torch set down goes out on its `out` turn, leaving bare floor where its
// foot stood, with its line; in a room just come into, one due went out while the hero
// was away, so nothing is said (D-478).
function burnOut(state, came) {
  const out = state.lights.filter((l) => l.out !== undefined && state.turn >= l.out);
  if (!out.length) return state;
  const room = out.reduce((r, l) => withTile(r, l.x, l.y, get('floor')), state.room);
  const next = { ...state, room, lights: state.lights.filter((l) => !out.includes(l)) };
  return came ? next : say(next, 'torchOut');
}
