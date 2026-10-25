// § chest: the stash chest's panel (CH3, D-325, D-330). Its 12 slots are two rows
// of the bag's 6 (D-324); `chosen` is a chest slot, 0 to 11, a bag slot, 12 to 17
// (CHEST_BAG + i), or CHEST_CLOSE for its Close line. Plain data, no drawing.
import { BAG_SLOTS, STACK_MAX } from './bag.js';
import { get } from './registry.js';
import { say } from './lines.js';

export const CHEST_SLOTS = 2 * BAG_SLOTS;
export const CHEST_BAG = CHEST_SLOTS; // the bag's first slot on the panel (CH4, D-331)
export const CHEST_CLOSE = CHEST_BAG + BAG_SLOTS;

// What a screen reader hears as the panel opens
export const chestWords = (stash) => `Stash chest. ${stash.length ? `${stash.length} of 12 slots used` : '12 slots, all empty'}. Bag below. Close.`;

// Where an arrow moves the gold frame: Left and Right along a row, Down to the
// second row, the bag's row and then Close, Up back the same way; Up from Close
// reaches the bag's first slot (CH4, D-331)
export function moveChest(i, dir) {
  if (i === CHEST_CLOSE) return dir === 'up' ? CHEST_BAG : i;
  const col = i % BAG_SLOTS, row = Math.floor(i / BAG_SLOTS);
  if (dir === 'left') return col > 0 ? i - 1 : i;
  if (dir === 'right') return col < BAG_SLOTS - 1 ? i + 1 : i;
  if (dir === 'up') return row > 0 ? i - BAG_SLOTS : i;
  if (dir === 'down') return row < 2 ? i + BAG_SLOTS : CHEST_CLOSE;
  return i;
}

// § stashes: what each set-down chest keeps, `state.stashes`, by place and tile
// ("woods:3,2"), each a list of stacks as the bag's, [{ id, n, form? }] (CH4, D-331)
const keyOf = (state, x, y) => `${state.place}:${x},${y}`;
export const stashAt = (state, x, y) => state.stashes?.[keyOf(state, x, y)] || [];

// The list `to` with the whole stack `s` added: on a stack of its kind when all of
// it fits there, else in a new slot when there is none of its kind; null otherwise
function put(to, s, slots) {
  const most = get(s.id)?.max ?? STACK_MAX, j = to.findIndex((o) => o.id === s.id);
  if (j >= 0) return to[j].n + s.n <= most ? to.map((o, k) => (k === j ? { ...o, ...s, n: o.n + s.n } : o)) : null;
  return to.length < slots ? [...to, s] : null;
}

// § move: picking a filled slot on the chest's panel moves its whole stack to the
// other side, free, with no line; the slots after it move up, the bag's way. When it
// can't all go, "Your bag is full." or "The chest is full.", free, and it stays (D-331)
export function moveStack(state, x, y, i) {
  const stash = stashAt(state, x, y), out = i < CHEST_BAG;
  const from = out ? stash : state.bag, at = out ? i : i - CHEST_BAG, s = from[at];
  if (!s) return state;
  const to = put(out ? state.bag : stash, s, out ? BAG_SLOTS : CHEST_SLOTS);
  if (!to) return say(state, out ? 'bagFull' : 'stashFull');
  const left = from.filter((o, k) => k !== at);
  const [bag, kept] = out ? [to, left] : [left, to];
  return { ...state, bag, stashes: { ...state.stashes, [keyOf(state, x, y)]: kept } };
}

// A state from a save older than the stash chest's things gets none kept (D-331)
export const withStashes = (state) => (state.stashes ? state : { ...state, stashes: {} });
