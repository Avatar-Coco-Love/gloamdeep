// § spark: the guide, a spark of the First Light (LORE.md, D-633), freed from a knot of gloam
// (D-1024; where it lies, knot.js). Plain data, no drawing. Bumped with the lantern lit (an ember
// too, as it lights a torch), a turn passes, the knot melts to floor and the spark is free for
// good, `state.spark`: a `spark` event and its line. With the lantern dark it holds, its line,
// free. The spark then floats beside the hero everywhere, through a fall too (render/guide.js);
// it never lights a room (pillar 1).
import { get } from './registry.js';
import { withTile } from './room.js';
import { say } from './lines.js';
import { note } from './events.js';
import { passTurn } from './state.js';
import { endTurn } from './endturn.js';

// § bump: (state, x, y) → the knot melted and the spark freed, a turn, its line in two halves on
// one line (lines.js's `also`); dark, its line, free
export function bumpKnot(state, x, y) {
  if (!state.lit) return say(state, 'knotHolds');
  const room = withTile(state.room, x, y, get('floor'));
  const freed = say(note(passTurn({ ...state, room, spark: true }), 'spark', { x, y }), 'sparkFreed');
  return endTurn(state, { ...freed, line: { ...freed.line, also: ['sparkWarm'] } }); // the owner's line, too long for one row, in two (D-1024)
}
