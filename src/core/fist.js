// § fist (D-885, D-888): the Warden's Fist's knock. A weapon held that `knocks` (items.js) sends the
// creature it hits, still standing, 1 tile straight back, away from the hero; the hero's hit is
// first, so one beaten by it lies where it stood. As the warden's slam knocks the hero (sting.js):
// - a wall (any solid tile: rock, a tree, a boulder, a thing set down, the room's edge, a doorway
//   too, as creatures never leave their room) stops it, and it loses 1 more;
// - another creature there stops it, and both lose 1;
// - a person, water, one under the earth or a pile of bones there only stops it: no hurt.
// The hurt is the hero's blow, so one beaten by it leaves its drop and gives its experience, as a
// hit does (turn.js, Claude's draft). Plain data, no drawing.
import { get } from './registry.js';
import { enemyAt } from './enemies.js';
import { tileAt } from './room.js';
import { personAt } from './people.js';
import { offEdge } from './openings.js';

// Whether the weapon held knocks back what it hits
export const knocks = (state) => !!(state.held && get(state.held)?.knocks);

// (state, foe) → where the hero's blow knocks foe: { to } a free tile; { wall, x, y } with the
// wall's name; { foe, x, y } with the creature there; or null when it only stops
export function knockOf(state, foe) {
  const x = 2 * foe.x - state.hero.x, y = 2 * foe.y - state.hero.y;
  if (offEdge(state.room, x, y)) return { wall: 'wall', x, y };
  const tile = tileAt(state.room, x, y);
  if (tile.solid) return tile.cast ? null : { wall: tile.name.toLowerCase(), x, y }; // water only stops it (`cast`)
  const o = enemyAt(state, x, y);
  if (o) return o.under || o.pile ? null : { foe: o, x, y };
  return personAt(state, x, y) ? null : { to: { x, y } };
}
