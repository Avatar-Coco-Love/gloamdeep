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
import { passTurn, maxHealth } from './state.js';
import { endTurn } from './endturn.js';
import { stiffLeft } from './stiff.js';
import { warmLeft, warming } from './warmed.js';

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
  const rested = { ...state, room, health: Math.min(maxHealth(state), state.health + sits.heal), stiff: 0 };
  const next = note(passTurn(rested), 'sit', { id: sits.into });
  return warming(endTurn(state, say(next, sits.says)), sits.warm); // after the turn, as a draught starts: its full count shown
}
