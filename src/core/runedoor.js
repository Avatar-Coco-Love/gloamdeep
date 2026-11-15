// § rune door: L3, the dark door, step 2 (D-927, D-929). The rune wall (runewall.js) bumped from
// the tile in front of its face: lit, it says its line, free; dark, it sinks open for good, a
// turn, costing no oil. The wall tile becomes the room's plain floor, a 1-tile gap, and the tile
// behind it, walled on its other 3 sides, a plinth with a vault's prize draw on it (vault.js),
// taken as a vault's is (prize.js). The room's `runes` are cleared, so they show no more. The
// plinth is set as it opens, so a room already seen before this step opens the same way. An
// `open` event, with no sound yet (as the vault door's, D-895). Plain data, no drawing.
import { withTile, depthOf } from './room.js';
import { seedAt } from './region.js';
import { prizeOf, plinthFor } from './vault.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { note } from './events.js';
import { passTurn } from './state.js';
import { endTurn } from './endturn.js';

// (seed, depth) → the nook's prize, a vault's draw ({ id, n }), its own for each floor
export const runePrize = (seed, depth) => prizeOf((seedAt(seed, depth) ^ 0x6c1e4a27) >>> 0);

// (state, x, y) → the state after bumping the rune wall at x, y, or null when it is not one, or
// not bumped from in front of its face (then it is a wall as any other)
export function bumpRunes(state, x, y) {
  const r = state.room.runes, h = state.hero;
  if (!r || r.x !== x || r.y !== y || h.x !== x || h.y !== y + 1) return null;
  if (state.lit) return say(state, 'runesLit');
  const prize = runePrize(state.seed, depthOf(state.place));
  const room = { ...withTile(withTile(state.room, x, y, get('floor')), x, y - 1, plinthFor(prize)), prize, runes: null };
  return endTurn(state, say(note(passTurn({ ...state, room }), 'open', { id: 'floor' }), 'runesOpen'));
}
