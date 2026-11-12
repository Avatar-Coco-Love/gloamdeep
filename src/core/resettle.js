// § resettle: an older save's Peddler, freed and at home in Hearthwood's middle room, moved
// once to the home waystone's room (B-001, D-855), as a newly freed one stands since
// 0.3.300. He keeps whether he has greeted the hero, and simply stands there, not beaming
// in. Anyone else there stays. Plain data, no drawing.
import { goHome, HOME } from './homeward.js';
import { stoneHome } from './mouth.js';

// (state) → the state with each person at home in the middle room moved to the stone's room
export function resettle(s) {
  if (stoneHome(s.seed) === HOME) return s;
  const here = s.place === HOME, there = here ? s : s.elsewhere?.[HOME];
  const moving = (there?.people || []).filter((p) => p.home);
  if (!moving.length) return s;
  const people = there.people.filter((p) => !p.home);
  const out = here ? { ...s, people } : { ...s, elsewhere: { ...s.elsewhere, [HOME]: { ...there, people } } };
  return moving.reduce((st, { id, x, y, home, arrives, ...keep }) => goHome(st, id, keep), out);
}
