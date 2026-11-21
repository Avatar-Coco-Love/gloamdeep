// § gift: a person at home with a `gift` in the registry gives it once, on a bump (D-1016).
// The Peddler's is one Homestone. With room in the bag (bagAdd: a free slot, or his stack of
// Homestones under its 3), it goes in with their `gives` line, `gifted` set, free, and their
// card stays shut that bump. With none, their `giftWaits` line, and the gift kept for a later
// bump with room; their card opens as ever (main.js). Plain data, no drawing.
import { get } from './registry.js';
import { say } from './lines.js';
import { note } from './events.js';
import { bagAdd, bagSize } from './bag.js';

// Whether person `p` still has a gift to give
export const hasGift = (p) => !!p?.home && !p.gifted && !!get(p.id).gift;

// (state, p) → the state with p's gift given, or their line that it waits; the same state when none
export function bumpGift(state, p) {
  if (!hasGift(p)) return state;
  const who = get(p.id), bag = bagAdd(state.bag, who.gift, undefined, bagSize(state));
  if (!bag) return say(state, who.giftWaits);
  const people = state.people.map((o) => (o === p ? { ...o, gifted: true } : o));
  return note(say({ ...state, bag, people }, who.gives), 'take', { id: who.gift });
}
