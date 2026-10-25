// § bag: what the hero carries (D-247). Six slots in a row; each holds one
// kind of item, as a stack with its count: [{ id, n }]. Items with `bag` in
// the registry go into it when walked onto. The weapon in hand is apart from
// it, in `state.held`: an item id, or null (D-252). Plain data, no drawing.
import { get } from './registry.js';

export const BAG_SLOTS = 6;
// A stack's most by kind, the registry's `max`: 20 of small finds, 5 of flasks
// and potions, 1 workbench or stash chest (D-333)
export const most = (id) => get(id)?.max ?? 1;

// The list `bag` (the bag's or a chest's, `slots` long) with one more of item
// `id`: on its first stack with room, else in a new slot, so a kind can fill
// several (D-333), but only 1 of a kind whose most is 1 (D-320); null when
// there is none. `form`, when given, is the look
// the stack shows from now on (D-314).
export function bagAdd(bag, id, form, slots = BAG_SLOTS) {
  const i = bag.findIndex((s) => s.id === id && s.n < most(id)), shown = form === undefined ? {} : { form };
  if (i >= 0) return bag.map((s, j) => (j === i ? { ...s, n: s.n + 1, ...shown } : s));
  if (most(id) === 1 && bag.some((s) => s.id === id)) return null;
  return bag.length < slots ? [...bag, { id, n: 1, ...shown }] : null;
}

// Whether item `id` has stacks and all of them are at their limit
export const stackFull = (bag, id) => bag.some((s) => s.id === id) && bag.every((s) => s.id !== id || s.n >= most(id));

// Whether the bag holds at least `of`'s counts, { itemId: n } (a bench craft's cost, CH1)
export const bagHas = (bag, of) => Object.entries(of).every(([id, n]) => bag.filter((s) => s.id === id).reduce((a, s) => a + s.n, 0) >= n);

// The bag with n (one unless said) taken from slot i; an emptied slot is
// gone, and the ones after it move up
export function bagTake(bag, i, n = 1) {
  const s = bag[i];
  if (!s) return bag;
  return s.n > n ? bag.map((o, j) => (j === i ? { ...o, n: o.n - n } : o)) : bag.filter((o, j) => j !== i);
}

// The bag with `of`'s counts, { itemId: n }, taken (a bench craft's cost, CH1),
// from a kind's last stacks first, so its first stays full (D-333)
export function bagPay(bag, of) {
  return Object.entries(of).reduce((b, [id, n]) => {
    for (let i = b.length - 1; i >= 0 && n > 0; i--) {
      if (b[i].id !== id) continue;
      const k = Math.min(n, b[i].n);
      b = bagTake(b, i, k); n -= k;
    }
    return b;
  }, bag);
}

// A state from a save older than the bag gets an empty one, and one older
// than the held slot an empty hand (D-252)
export const withBag = (state) => {
  const s = Array.isArray(state.bag) ? state : { ...state, bag: [] };
  return s.held === undefined ? { ...s, held: null } : s;
};
