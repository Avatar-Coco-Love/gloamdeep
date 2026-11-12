// § fireside: sitting by a burning campfire (D-844, Q-088's buff, step 1; Warmed, step 2, D-845). Bumped, a blazing
// fire or embers opens Sit by the fire?, No picked; Yes passes a turn and gives the tile's
// `sits.heal` hearts back, blazing 2, embers 1, never above full, ends stiff (stiff.js), and
// leaves the hero Warmed for `sits.warm` turns, blazing 60, embers 30 (warmed.js),
// the fire burning down one level, its `sits.into`: blazing to embers, embers to cold ashes,
// lit again with the lantern's oil (bagturn.js `kindle`). Yes is grey with full hearts, not
// stiff, and Warmed already as long or longer, so a fire is never used up for nothing. A `sit` event. Plain data, no drawing.
import { tileAt, withTile } from './room.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { note } from './events.js';
import { passTurn, maxHealth, healed } from './state.js';
import { endTurn } from './endturn.js';
import { stiffLeft } from './stiff.js';
import { warmLeft, warming } from './warmed.js';
import { bagTake } from './bag.js';

// Whether sitting by the tile at x, y would help now: it `sits`, and the hero is hurt or stiff,
// or its warmth would last longer than the Warmed left (D-845)
export function canSit(state, x, y) {
  const sits = tileAt(state.room, x, y)?.sits;
  return !!sits && (state.health < maxHealth(state) || stiffLeft(state) > 0 || (sits.warm ?? 0) > warmLeft(state));
}

// § sit: (state, x, y) → the state a turn later, warmed by the fire, the fire a level lower
export function sit(state, x, y) {
  const sits = tileAt(state.room, x, y)?.sits;
  if (!sits || !canSit(state, x, y)) return state;
  const room = withTile(state.room, x, y, get(sits.into));
  const rested = { ...state, room, health: healed(state, sits.heal), stiff: 0 }; // the gold heart kept (D-863)
  const next = note(passTurn(rested), 'sit', { id: sits.into });
  const after = endTurn(state, say(next, sits.says));
  return after.fell === state.fell ? warming(after, sits.warm) : after; // after the turn, as a draught starts: its full count shown; a fall that turn loses it (H-56, D-879)
}

// § stoke: Add wood on a burning fire's card (Q-088, feeding): 1 of its `stokes` item, Wood, from
// the bag raises embers a level, to blazing, and passes a turn, with its line. A blazing fire
// takes no more, and cold ashes are still lit with the lantern's oil. A `stoke` event.
export function stoke(state, x, y) {
  const stokes = tileAt(state.room, x, y)?.stokes, i = stokes ? state.bag.findIndex((s) => s.id === stokes.item) : -1;
  if (i < 0) return state;
  const room = withTile(state.room, x, y, get(stokes.into));
  const next = note(passTurn({ ...state, room, bag: bagTake(state.bag, i) }), 'stoke', { id: stokes.into });
  return endTurn(state, say(next, stokes.says));
}
// Whether the fire at x, y can take wood now: it `stokes`, with its item in the bag
export const canStoke = (state, x, y) => { const stokes = tileAt(state.room, x, y)?.stokes; return !!stokes && state.bag.some((s) => s.id === stokes.item); };
