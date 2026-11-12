import { core } from '../lib.mjs';
const turn = await core('turn'), stairs = await core('stairs'), room = await core('room');
export const base = (seed, depth, extra = {}) => { let st = turn.newJourney(seed, 'normal'); st = stairs.goToDepth(st, depth); return { ...st, lit: true, ...extra }; };
export const inRoom = (seed, id, extra = {}) => { let st = turn.newJourney(seed, 'normal'); st = stairs.goToPlace(st, id); return { ...st, lit: true, ...extra }; };
export const setups = {
  // beside the locket with the warden beaten: hero on the tile next to the locket
  locket: (seed = 55) => { const s = inRoom(seed, room.locketRoom(seed)); return { ...s, enemies: s.enemies.filter((e) => e.id === 'warden'), held: 'knife' }; },
};
