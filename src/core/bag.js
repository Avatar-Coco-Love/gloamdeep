// § bag: what the hero carries (D-247). Six slots in a row; each holds one
// kind of item, as a stack with its count: [{ id, n }]. Items with `bag` in
// the registry go into it when walked onto. The weapon in hand is apart from
// it, in `state.held`: an item id, or null (D-252). Plain data, no drawing.
import { get, byKind } from './registry.js';

export const BAG_SLOTS = 6;
// § size: the bag's slots, `state.bagSlots`, 6 until the Pouch (9) and the Big Bag (12)
// are made at the workbench (D-545, D-547); a save from before it has 6. Its grid is
// 3 wide, 4 wide for 12 (D-548)
export const MAX_BAG = 12;
export const bagSize = (state) => state.bagSlots ?? BAG_SLOTS;
export const bagCols = (size) => (size > 9 ? 4 : 3);
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

// How many of item `id` the bag holds, in all its stacks (the workbench's card, D-387)
export const carried = (bag, id) => bag.reduce((a, s) => a + (s.id === id ? s.n : 0), 0);
// Whether the bag holds at least `of`'s counts, { itemId: n } (a bench craft's cost, CH1)
export const bagHas = (bag, of) => Object.entries(of).every(([id, n]) => carried(bag, id) >= n);

// Whether Make on bag slot i can make its item's `craft.into`: its `craft.of`
// on that stack for a count of itself (3 oilcaps), or in the whole bag for a
// mixed cost, { itemId: n } (Mimic Glass with oilcaps, D-477)
export function canCraft(bag, i) {
  const s = bag[i], of = s && get(s.id).craft?.of;
  if (!of) return false;
  return typeof of === 'number' ? s.n >= of : bagHas(bag, of);
}

// § flasks: the first slot holding oil to pour, or -1, and how many flasks are
// carried in all, for the quick slot (D-384)
export const firstFlask = (bag) => bag.findIndex((s) => get(s.id)?.oil);
export const flasksIn = (bag) => bag.reduce((a, s) => a + (get(s.id)?.oil ? s.n : 0), 0);

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

// § sort: the bag lined up by kind in the game's own list, items.js's order (D-559); a
// kind's stacks joined, full ones first and the rest last (D-333), each kind keeping its
// first stack's look (D-314). An id the list lacks goes last, in the order it was in
const ORDER = new Map(byKind('item').map((e, i) => [e.id, i]));
export function sortBag(bag) {
  const at = (id) => ORDER.get(id) ?? ORDER.size;
  const kinds = [...new Set(bag.map((s) => s.id))].sort((a, b) => at(a) - at(b));
  return kinds.flatMap((id) => {
    const { form } = bag.find((s) => s.id === id), shown = form === undefined ? {} : { form }, out = [];
    for (let left = carried(bag, id); left > 0; left -= most(id)) out.push({ id, n: Math.min(left, most(id)), ...shown });
    return out;
  });
}
// Whether two bags hold the same stacks in the same order
export const sameBag = (a, b) => a.length === b.length && a.every((s, i) => s.id === b[i].id && s.n === b[i].n && s.form === b[i].form);

// A state from a save older than the bag gets an empty one, and one older
// than the held slot an empty hand (D-252)
export const withBag = (state) => {
  const s = Array.isArray(state.bag) ? state : { ...state, bag: [] };
  return s.held === undefined ? { ...s, held: null } : s;
};
