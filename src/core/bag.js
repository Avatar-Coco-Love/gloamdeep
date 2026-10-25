// § bag: what the hero carries (D-247). Six slots in a row; each holds one
// kind of item, as a stack with its count: [{ id, n }]. Items with `bag` in
// the registry go into it when walked onto. The weapon in hand is apart from
// it, in `state.held`: an item id, or null (D-252). Plain data, no drawing.
import { get } from './registry.js';

export const BAG_SLOTS = 6;
export const STACK_MAX = 3; // a stack holds at most 3; one more stays on the floor (D-250)
const most = (id) => get(id)?.max ?? STACK_MAX; // fewer for an item with `max`, the workbench's 1 (D-320)

// The bag with one more of item `id`: on its stack, else in a new slot; null
// when it has no room, or its stack is full (it never spills to a new slot).
// `form`, when given, is the look the stack shows from now on (D-314).
export function bagAdd(bag, id, form) {
  const i = bag.findIndex((s) => s.id === id), shown = form === undefined ? {} : { form };
  if (i >= 0) return bag[i].n < most(id) ? bag.map((s, j) => (j === i ? { ...s, n: s.n + 1, ...shown } : s)) : null;
  return bag.length < BAG_SLOTS ? [...bag, { id, n: 1, ...shown }] : null;
}

// Whether item `id`'s stack is at its limit
export const stackFull = (bag, id) => bag.some((s) => s.id === id && s.n >= most(id));

// Whether the bag holds at least `of`'s counts, { itemId: n } (a bench craft's cost, CH1)
export const bagHas = (bag, of) => Object.entries(of).every(([id, n]) => bag.filter((s) => s.id === id).reduce((a, s) => a + s.n, 0) >= n);

// The bag with n (one unless said) taken from slot i; an emptied slot is
// gone, and the ones after it move up
export function bagTake(bag, i, n = 1) {
  const s = bag[i];
  if (!s) return bag;
  return s.n > n ? bag.map((o, j) => (j === i ? { ...o, n: o.n - n } : o)) : bag.filter((o, j) => j !== i);
}

// A state from a save older than the bag gets an empty one, and one older
// than the held slot an empty hand (D-252)
export const withBag = (state) => {
  const s = Array.isArray(state.bag) ? state : { ...state, bag: [] };
  return s.held === undefined ? { ...s, held: null } : s;
};
