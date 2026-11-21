// § recall: the Homestone, a chip of waystone that carries the hero home (D-1015). Made at the workbench's
// GEAR tab from 5 Duskstar and 5 Stone once the home waystone is woken (its `bench.after`), at
// most 3 carried. USE, in the bag, spends one and goes to the home waystone's plate as travel
// by waystone does (travel.js): free, no turn passing, the creatures there not acting before the
// hero's first move. One way only: the way back down is the waystones. Barred, free and kept,
// while a creature awake stands beside the hero or chases them, as travel is (D-593); in the home
// waystone's room already, or with its stone asleep, its own line, free. Plain data, no drawing.
import { say } from './lines.js';
import { bagTake } from './bag.js';
import { stonesOf, creatureNear, travel } from './travel.js';
import { knownOf } from './bagmake.js';

// Whether the home waystone is woken
export const homeWoken = (state) => !!stonesOf(state)[0]?.woken;

// The finds the workbench's card counts as known (knownOf), with 'homeWoken' added once the home
// waystone is woken, so a recipe `after: 'homeWoken'` shows from then on (D-1015)
export const benchKnown = (state) => { const known = knownOf(state); if (homeWoken(state)) known.add('homeWoken'); return known; };

// (state, i) → the state on the home plate, the Homestone in bag slot i spent; or the same state with why not
export function goHome(state, i) {
  const home = stonesOf(state)[0];
  if (creatureNear(state)) return say(state, 'stoneNear');
  if (!home?.woken) return say(state, 'homestoneAsleep');
  if (home.here) return say(state, 'homestoneHere');
  const went = travel({ ...state, bag: bagTake(state.bag, i) }, home.place);
  return went.place === state.place ? state : say(went, 'homestoneUse');
}
