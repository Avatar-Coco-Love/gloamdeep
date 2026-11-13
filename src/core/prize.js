// § prize: the vault's plinth bumped (L1 step 4, D-896). Its prize, the room's `prize` (vault.js),
// is taken at once and a turn passes: an ember, 1 more to spend in Growth (`foundEmbers`,
// growth.js), "An ember! Spend it in Growth."; a rare material, its 2 into the bag with its own
// take line. The plinth is left bare. With no room in the bag for both, nothing is taken, free,
// with the bag's full line, and the prize stays. A `take` event. Plain data, no drawing.
import { tileAt, withTile } from './room.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { bagAdd, bagSize, noRoom } from './bag.js';
import { note } from './events.js';
import { passTurn } from './state.js';
import { endTurn } from './endturn.js';

export function takePrize(state, x, y) {
  const prize = state.room.prize;
  if (!tileAt(state.room, x, y).prize || !prize) return state;
  let gained;
  if (prize.id === 'ember') gained = { foundEmbers: (state.foundEmbers || 0) + 1 };
  else {
    let bag = state.bag;
    for (let i = 0; i < prize.n && bag; i++) bag = bagAdd(bag, prize.id, undefined, bagSize(state));
    if (!bag) return say(state, noRoom(state.bag, prize.id, bagSize(state)));
    gained = { bag };
  }
  const room = { ...withTile(state.room, x, y, get('plinthBare')), prize: null };
  return endTurn(state, note(say(passTurn({ ...state, ...gained, room }), get(prize.id).says), 'take', { id: prize.id }));
}
