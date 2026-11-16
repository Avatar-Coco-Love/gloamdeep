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

const BOSS = 'lampeater';
// The arena's place id for this seed: the depth-8 cell marked `arena` (region.js, D-940)
export const arenaPlace = (seed) => layoutAt(seed, ARENA_DEPTH).cells.find((c) => c.arena)?.id;
export const inArena = (state) => state.place === arenaPlace(state.seed);

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
