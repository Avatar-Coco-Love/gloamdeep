// § spots: test spots, the dev tools' three slots on this device (D-627). Save puts
// the game as it is now into a slot; Load gives it back, upgraded like a journey
// (save.js), so a spot kept before a change in the state's shape still loads.
// Kept for the device, not for each profile. Plain data, no drawing.
import { journeyText, readJourney } from './save.js';
import { depthOf } from './room.js';

export const SPOTS = 3;
export const spotKey = (i) => `gloamdeep-spot-${i + 1}`;
// What a slot shows: its number, then the depth and the turn, or EMPTY
export const spotLabel = (i, state) => `${i + 1} · ` + (state ? `DEPTH ${depthOf(state.place)} · TURN ${state.turn}` : 'EMPTY');

// § storage: localStorage, wrapped (TECH.md)
export function readSpot(i) {
  try { return readJourney(localStorage.getItem(spotKey(i)))?.state || null; } catch { return null; /* none, or not readable */ }
}
// Whether it was kept: false when storage is full or blocked
export function writeSpot(i, state) {
  try { localStorage.setItem(spotKey(i), journeyText(state, true)); return true; } catch { return false; /* not kept */ }
}
