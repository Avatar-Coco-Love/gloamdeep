// § spark: the guide, a spark of the First Light (LORE.md, D-633), freed from a knot of gloam
// (D-1024; where it lies, knot.js). Plain data, no drawing. Bumped with the lantern lit (an ember
// too, as it lights a torch), a turn passes, the knot melts to floor and the spark is free for
// good, `state.spark`: a `spark` event and its line. With the lantern dark it holds, its line,
// free. The spark then floats beside the hero everywhere, through a fall too (render/guide.js);
// it never lights a room (pillar 1). It speaks in light (D-1025): `sparkMood` says how it glows.
import { get } from './registry.js';
import { withTile, depthOf } from './room.js';
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

// § mood: (state) → { chill, warmth }, each 0 to 1, how the freed spark glows (D-1025; drawn in
// render/guide.js). `chill`, the nearest creature of the gloam (`gloam` in the registry, seen or
// not): 1 within a tile of the hero, fading to 0 at CHILL_REACH + 1 tiles. `warmth`, how far down
// the hero is toward the First Light, at the bottom of depth FIRST_LIGHT_DEPTH (D-635): 0 on the
// surface and in the crypt.
export const CHILL_REACH = 3, FIRST_LIGHT_DEPTH = 32;
export function sparkMood(state) {
  const { x, y } = state.hero;
  const near = Math.min(Infinity, ...(state.enemies ?? []).filter((e) => get(e.id)?.gloam).map((e) => Math.hypot(e.x - x, e.y - y)));
  const chill = Math.max(0, Math.min(1, (CHILL_REACH + 1 - near) / CHILL_REACH));
  const depth = depthOf(state.place) || 0;
  return { chill, warmth: Math.max(0, Math.min(1, depth / FIRST_LIGHT_DEPTH)) };
}
