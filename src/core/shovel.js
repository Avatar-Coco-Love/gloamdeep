// § shovel: with the Shovel in the Tool slot, walking onto a stump digs it out
// instead, a turn, the hero staying put (D-926, Q-106's first step). The tile
// becomes plain grass for good: the tree waiting on the room's taken list to grow
// back on that stump is struck off it (regrow.js). A `dig` event, the soft earth's
// sound. Plain data, no drawing.
import { tileAt, withTile } from './room.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { note } from './events.js';
import { passTurn } from './state.js';
import { endTurn } from './endturn.js';

// Whether walking onto x, y digs a stump out: the shovel held and a stump there
export const digsStump = (state, x, y) => state.tool === 'shovel' && tileAt(state.room, x, y).id === 'stump';

export function digStump(state, x, y) {
  const room = withTile(state.room, x, y, get('floor'));
  const taken = (state.taken || []).filter((t) => !(t.id === 'tree' && t.x === x && t.y === y)); // it never grows back
  return endTurn(state, say(note(passTurn({ ...state, room, taken }), 'dig', { x, y }), 'stumpDug'));
}
