// § spit (D-659, D-688): the Spit grub's way, `spits`, and the globs it sends. A glob is
// plain data in `state.globs`, { x, y, dx, dy, id }: where it is, the way it flies and the
// creature that spat it. They belong to the room in play: a room left or a fall clears them.
// Each creature turn, before the others bite or move (creatureturn.js):
// 1. Every glob in flight flies 1 tile down its line. One on the hero's tile, or a creature's
//    (the hero or the creature stepped onto it), hits that one where it is. Else it moves on,
//    and breaks on whatever blocks light (walls, rubble), or on a person, unharmed; flying into
//    the hero or a creature, it hits. A hit takes its spitter's `bite`: from the hero 1 heart
//    (none in god mode), a creature hurt as a blow hurts it, beaten with no drop and no
//    experience (Claude's draft). It is a `bite` event for the hero, with the hit line.
// 2. Every one that spits and is awake, resting no more, sees the lit lantern along a clear
//    row or column, no tile that blocks light between, up to its way's `range` tiles: it spits.
//    The glob starts on the tile beside it toward the hero, so beside the hero it hits at once
//    (D-688). It then rests its way's `rest` turns. With the lantern off it sees nothing.
//    Its line is said unless a glob hit the hero this turn, whose line stays.
import { get } from './registry.js';
import { traits } from './behaviours.js';
import { tileAt } from './room.js';
import { enemyAt, hitEnemy } from './enemies.js';
import { personAt } from './people.js';
import { clearLine } from './sight.js';
import { say } from './lines.js';
import { note } from './events.js';
import { fall } from './fall.js';

export function spitTurn(state) {
  if (!state.globs?.length && !state.enemies.some((e) => traits(get(e.id)).spits)) return state;
  let s = { ...state, globs: [] };
  for (const g of state.globs ?? []) s = fly(s, g);
  for (const e of state.enemies) {
    const now = s.enemies.find((o) => o.x === e.x && o.y === e.y && o.id === e.id);
    if (now) s = spit(s, now);
    if (s.health <= 0) break;
  }
  return s.health > 0 || state.god ? s : fall(s);
}

// § aim: (state, e) → the way { dx, dy } creature e spits this turn, or null: it spits, is
// awake and resting no more, the lantern is lit, and the hero stands in its row or column
// within its range, with a clear line (sight.js). Read by nextMoves for its mark too.
export function aim(state, e) {
  const way = traits(get(e.id)).spits;
  if (!way || e.asleep || e.stirs || e.rests > 0 || !state.lit) return null;
  const dx = state.hero.x - e.x, dy = state.hero.y - e.y, far = Math.abs(dx) + Math.abs(dy);
  if ((dx && dy) || !far || far > way.range || !clearLine(state.room, e, state.hero)) return null;
  return { dx: Math.sign(dx), dy: Math.sign(dy) };
}

function spit(state, e) {
  const to = aim(state, e);
  if (!to) return e.rests > 0 ? swap(state, e, { ...e, rests: e.rests - 1 }) : state;
  const facing = to.dx < 0 ? 'left' : to.dx > 0 ? 'right' : e.facing; // it turns to spit, as a step left or right turns one (D-158)
  const rested = swap(state, e, { ...e, rests: traits(get(e.id)).spits.rest, ...(facing && { facing }) }), hit = state.events.some((v) => v.type === 'bite');
  const s = note(hit ? rested : say(rested, get(e.id).spitsSay), 'spit', { id: e.id }); // a hit's line this turn stays
  return land(s, { x: e.x + to.dx, y: e.y + to.dy, dx: to.dx, dy: to.dy, id: e.id });
}
const swap = (state, e, next) => ({ ...state, enemies: state.enemies.map((o) => (o === e ? next : o)) });

// A glob flies a tile on: it hits what stands on its own tile first, else moves on and lands
function fly(state, g) {
  const here = strikes(state, g);
  return here || land(state, { ...g, x: g.x + g.dx, y: g.y + g.dy });
}
// A glob come onto tile g.x, g.y: it breaks on what blocks light or a person, hits the hero or
// a creature there, or stays in flight
function land(state, g) {
  if (tileAt(state.room, g.x, g.y).blocksLight || personAt(state, g.x, g.y)) return note(state, 'splash', { x: g.x, y: g.y });
  return strikes(state, g) || { ...state, globs: [...state.globs, g] };
}
// The state with glob g's hit on the hero or the creature on its tile, or null with neither there
function strikes(state, g) {
  const hurt = get(g.id).bite;
  if (state.hero.x === g.x && state.hero.y === g.y) {
    const health = state.god ? state.health : Math.max(0, state.health - hurt);
    return note(note(say({ ...state, health }, get(g.id).hitSay), 'bite', { id: g.id, hurt }), 'splash', { x: g.x, y: g.y });
  }
  const foe = enemyAt(state, g.x, g.y);
  if (!foe) return null;
  return note({ ...state, enemies: hitEnemy(state.enemies, foe, get(foe.id), hurt) }, 'splash', { x: g.x, y: g.y });
}
