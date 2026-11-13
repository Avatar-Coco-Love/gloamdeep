// § refetch: an older save's freed Peddler, lost by its upgrade, sent home once (H-57,
// D-880). A save of formats 9 to 17 kept while he waited, freed, in his room had him sent
// home by refloor to the room he goes home to today, and a later step (renew, regrove)
// made that room again without him: he stood in no room. Once his room has been begun,
// he is always in some room (trapped, waiting or at home); one in none stands in the
// home waystone's room (homeward.js), not yet having greeted the hero, so he greets them
// when they come near. Plain data, no drawing.
import { goHome } from './homeward.js';
import { peddlerRoom } from './room.js';

// (state) → the state with a lost Peddler at home, or as it was
export function refetch(s) {
  const rooms = [[s.place, s], ...Object.entries(s.elsewhere || {})];
  if (!rooms.some(([id]) => id === peddlerRoom(s.seed))) return s; // his room not begun: still trapped there
  if (rooms.some(([, p]) => (p.people || []).some((q) => q.id === 'peddler'))) return s;
  return goHome(s, 'peddler', {});
}
