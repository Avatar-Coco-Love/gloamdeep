// § beaten: the Lampeater's step 9, its first part (D-939, D-953). Only beating it opens the arena's
// sealed door: the braziers lit no longer do (bagturn.js, kindle). Beaten, the door sinks open at
// once, with the vault's line and its `open` event, and each gloamling left crumbles away, counting
// nothing (D-949). Left unbeaten, by a doorway or a fall, the arena is whole again when the hero
// comes back: the Lampeater on its own tile with all its hearts, the braziers cold (vault.js,
// coolVault) and the gloamlings gone (stairs.js, arrive). Plain data, no drawing.
import { layoutAt } from './region.js';
import { ARENA_DEPTH, LAMPEATER_AT } from './arena.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { note } from './events.js';
import { tileAt, withTile } from './room.js';

const BOSS = 'lampeater';
// The arena's place id for this seed: the depth-8 cell marked `arena` (region.js, D-940)
export const arenaPlace = (seed) => layoutAt(seed, ARENA_DEPTH).cells.find((c) => c.arena)?.id;
export const inArena = (state) => state.place === arenaPlace(state.seed);
export const hallPlace = (seed) => layoutAt(seed, ARENA_DEPTH).cells.find((c) => c.hall)?.id;
// The arena's way in: the gap in its bottom edge, where the hero walks in from the hallway (arena.js)
const wayIn = (seed) => { const cell = layoutAt(seed, ARENA_DEPTH).cells.find((c) => c.arena); return { x: cell.doors[0].at, y: cell.rows - 1 }; };
const unbeaten = (state) => { const kept = state.elsewhere?.[arenaPlace(state.seed)]; return !kept || kept.enemies.some((e) => e.id === BOSS); };

// § the way in sealed (Q-112, D-956): (state) → the state with a sealed door risen in the arena's
// way in, once the hero has taken a step inside past it with the Lampeater still there; else the
// same state. From then the only ways out are beating it, which sinks every sealed door open, or a fall.
// Its `seal` event names the door's tile, and `first` the first time on this journey (`sealSeen`),
// when the cutscene plays (Q-112, D-957, render/cutscene.js)
export function sealArena(state) {
  if (!inArena(state) || !state.enemies.some((e) => e.id === BOSS)) return state;
  const gap = wayIn(state.seed);
  if ((state.hero.x === gap.x && state.hero.y === gap.y) || tileAt(state.room, gap.x, gap.y).solid) return state;
  const sealed = { ...state, room: withTile(state.room, gap.x, gap.y, get('sealedDoor')), sealSeen: true };
  return say(note(sealed, 'seal', { id: 'sealedDoor', x: gap.x, y: gap.y, first: !state.sealSeen }), 'arenaSeals');
}

// § the fight's bar (D-957, D-959): (state) → { id, name, health, max } while the arena's way in
// is sealed with the Lampeater in it, its hearts now and in all; else null. Beaten (gone from the
// enemies), left or fallen (another place, or the way in open again), it is null
export function bossFight(state) {
  const boss = inArena(state) && state.enemies.find((e) => e.id === BOSS);
  if (!boss) return null;
  const gap = wayIn(state.seed);
  if (tileAt(state.room, gap.x, gap.y).id !== 'sealedDoor') return null;
  const { name, health: max } = get(BOSS);
  return { id: BOSS, name, health: boss.health ?? max, max };
}

// § the hallway's warning (D-956): (state, from) → the state just come into the hallway, from
// anywhere but the arena, with its warning said while the Lampeater is unbeaten; else the same
export const hallWarns = (state, from) => (state.place === hallPlace(state.seed) && from !== arenaPlace(state.seed) && unbeaten(state) ? say(state, 'hallWarning') : state);

// § the quiet (Q-112, D-960): (state) → true in the hallway and the arena while the Lampeater is
// unbeaten, where no music plays; beaten, the dungeon's theme comes back in both
export const quietHere = (state) => (inArena(state) ? state.enemies.some((e) => e.id === BOSS) : state.place === hallPlace(state.seed) && unbeaten(state));

// § open again (D-956): (place, seed, room, enemies) → the room an arena keeps as the hero leaves
// it, by a fall: with the Lampeater still in it, its way in open again; else the same
export function openWayIn(place, seed, room, enemies) {
  if (place !== arenaPlace(seed) || !enemies.some((e) => e.id === BOSS)) return room;
  const gap = wayIn(seed);
  return tileAt(room, gap.x, gap.y).id === 'sealedDoor' ? withTile(room, gap.x, gap.y, get('floor')) : room;
}

// § the door: (state) → the state with the arena's sealed door sunk open and the gloamlings gone,
// once the Lampeater is beaten this action; else the same state
export function lampeaterBeaten(state) {
  if (!inArena(state) || state.enemies.some((e) => e.id === BOSS) || !state.events.some((e) => e.type === 'beat' && e.id === BOSS)) return state;
  const sealed = get('sealedDoor').letter, open = get('openDoor').letter;
  const room = { ...state.room, map: state.room.map.map((row) => row.split(sealed).join(open)) };
  return say(note({ ...state, room, enemies: state.enemies.filter((e) => !e.ash) }, 'open', { id: 'openDoor' }), 'vaultOpens');
}

// § whole again: (place, enemies) → the enemies an arena keeps as the hero leaves it: with the
// Lampeater still in it, only the Lampeater, whole, on its own tile; else the same
export function wholeAgain(place, seed, enemies) {
  const boss = enemies.find((e) => e.id === BOSS);
  if (!boss || place !== arenaPlace(seed)) return enemies;
  return [{ id: BOSS, ...LAMPEATER_AT, ...(boss.met && { met: true }) }];
}
