// § gift: a person at home with a `gift` in the registry gives it once, on a bump (D-1016).
// The Peddler's is one Homestone. With room in the bag (bagAdd: a free slot, or his stack of
// Homestones under its 3), it goes in with their `gives` line, `gifted` set, free, and their
// card stays shut that bump. With none, their `giftWaits` line, and the gift kept for a later
// bump with room; their card opens as ever (main.js). Plain data, no drawing.
import { get } from './registry.js';
import { say } from './lines.js';
import { note } from './events.js';
import { bagAdd, bagSize } from './bag.js';
import { rng, seedFor, pick } from './rng.js';

// Whether person `p` still has a gift to give
export const hasGift = (p) => !!p?.home && !p.gifted && !!get(p.id).gift;

// (state, p) → the state with p's gift given, or their line that it waits; the same state when none
export function bumpGift(state, p) {
  if (!hasGift(p)) return state;
  const who = get(p.id), bag = bagAdd(state.bag, who.gift, undefined, bagSize(state));
  if (!bag) return say(state, who.giftWaits);
  const people = state.people.map((o) => (o === p ? { ...o, gifted: true, giftAt: state.turn } : o));
  return note(say({ ...state, bag, people }, who.gives), 'take', { id: who.gift });
}

// § later (D-1018): after the first, a gift each `giftEvery` turns (3 days) from the last one
// taken (`giftAt`; a save from before has one waiting): one of `gifts`, the seed picking which for
// each gift (`given` counts them), so bumping again never picks another. Given in their talk box,
// its line there and the thing in the bag, free; with no room, their `giftWaits` line, kept.
export const giftReady = (state, p) => !!p?.home && !!p.gifted && !!get(p.id)?.gifts && state.turn - (p.giftAt ?? -Infinity) >= get(p.id).giftEvery;
export const giftWaiting = (state, p) => hasGift(p) || giftReady(state, p); // the mark over them (giftmark.js)
export const nextGift = (state, p) => pick(rng(seedFor(state.seed ?? 1, 7001 + (p.given ?? 0))), Object.keys(get(p.id).gifts));

export function laterGift(state, p) {
  if (!giftReady(state, p)) return state;
  const who = get(p.id), id = nextGift(state, p), bag = bagAdd(state.bag, id, undefined, bagSize(state));
  if (!bag) return say(state, who.giftWaits);
  const people = state.people.map((o) => (o === p ? { ...o, giftAt: state.turn, given: (p.given ?? 0) + 1 } : o));
  return note(say({ ...state, bag, people }, who.gifts[id]), 'take', { id });
}

// § dev: Grow (dev panel) brings every person's next later gift due at once (D-1018)
export const giftsDue = (state) => ({ ...state, people: (state.people || []).map((p) => (p.gifted && get(p.id)?.gifts ? { ...p, giftAt: state.turn - get(p.id).giftEvery } : p)) });
