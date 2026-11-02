// § chest: the stash chest's card (CH3, D-325, D-330; a card, D-387). Its 12 slots
// are a 4 × 3 grid, the bag's beside them (6 a 3 × 2 grid, 9 a 3 × 3, 12 a 4 × 3, D-548);
// `chosen` is a chest slot, 0 to 11, a bag slot, from 12 (CHEST_BAG + i), or CHEST_TAKE
// for its Deconstruct button (CH5), CHEST_STORE for its Store (D-556). Plain data, no drawing.
import { MAX_BAG, bagAdd, bagSize, bagCols, bagPay, carried } from './bag.js';
import { say } from './lines.js';
import { tileAt } from './room.js';

export const CHEST_SLOTS = 12;
export const CHEST_BAG = CHEST_SLOTS; // the bag's first slot on the card (CH4, D-331)
export const CHEST_TAKE = CHEST_BAG + MAX_BAG; // Deconstruct, under the chest's grid (CH5)
export const CHEST_STORE = CHEST_TAKE + 1; // Store, in the card's bottom right corner (D-556)
const COLS = 4, ROWS = 3;

// What a screen reader hears as the card opens
export const chestWords = (stash) => `Stash chest. ${stash.length ? `${stash.length} of 12 slots used` : '12 slots, all empty'}. Bag on the right. Deconstruct chest, Store matching, or Close.`;

// Where an arrow moves the gold frame: around the chest's grid, Right from its right
// column to the bag's grid, Left from the bag's left column back; Down from the bottom
// row of the chest to Deconstruct, Up from it to the chest's bottom row (D-387); Down
// from the bag's bottom row to Store, Up from it to the bag's bottom row, Left and Right
// between the two buttons (D-556). `size`: the bag's slots (D-548)
export function moveChest(i, dir, size = 6) {
  const bc = bagCols(size), bagRows = Math.ceil(size / bc);
  if (i === CHEST_TAKE) return dir === 'up' ? (ROWS - 1) * COLS : dir === 'right' ? CHEST_STORE : i;
  if (i === CHEST_STORE) return dir === 'up' ? CHEST_BAG + (bagRows - 1) * bc : dir === 'left' ? CHEST_TAKE : i;
  const bag = i >= CHEST_BAG, j = bag ? i - CHEST_BAG : i, cols = bag ? bc : COLS, rows = bag ? bagRows : ROWS;
  const col = j % cols, row = Math.floor(j / cols);
  if (dir === 'left') return col > 0 ? i - 1 : bag ? Math.min(row, ROWS - 1) * COLS + COLS - 1 : i;
  if (dir === 'right') return col < cols - 1 && (!bag || j + 1 < size) ? i + 1 : bag ? i : CHEST_BAG + Math.min(row, bagRows - 1) * bc;
  if (dir === 'up') return row > 0 ? i - cols : i;
  if (dir === 'down') return row < rows - 1 && (!bag || j + cols < size) ? i + cols : bag ? CHEST_STORE : CHEST_TAKE;
  return i;
}

// § stashes: what each set-down chest keeps, `state.stashes`, by place and tile
// ("woods:3,2"), each a list of stacks as the bag's, [{ id, n, form? }] (CH4, D-331)
const keyOf = (state, x, y) => `${state.place}:${x},${y}`;
export const stashAt = (state, x, y) => state.stashes?.[keyOf(state, x, y)] || [];
// The stashes without the chest at x, y once it is taken down (CH5), or null when none was kept
export function withoutStash(state, x, y) {
  const key = keyOf(state, x, y);
  if (!state.stashes || !(key in state.stashes)) return null;
  const { [key]: _gone, ...rest } = state.stashes;
  return rest;
}

// The list `to` with as much of stack `s` as fits, one at a time: topping up its
// kind's stacks, then in free slots (D-333); and how many of `s` are left over
function put(to, s, slots) {
  let n = 0;
  for (let more; n < s.n && (more = bagAdd(to, s.id, s.form, slots)); n++) to = more;
  return { to, left: s.n - n };
}

// § move: picking a filled slot on the chest's card moves its stack to the other
// side, free, with no line; an emptied slot is gone and the ones after it move up,
// the bag's way. What can't go stays in its slot, with "Your bag is full." or
// "The chest is full.", free (D-331, D-333)
export function moveStack(state, x, y, i) {
  const stash = stashAt(state, x, y), out = i < CHEST_BAG;
  const from = out ? stash : state.bag, at = out ? i : i - CHEST_BAG, s = from[at];
  if (!s) return state;
  const { to, left } = put(out ? state.bag : stash, s, out ? bagSize(state) : CHEST_SLOTS);
  if (left === s.n) return say(state, out ? 'bagFull' : 'stashFull');
  const rest = left ? from.map((o, k) => (k === at ? { ...o, n: left } : o)) : from.filter((o, k) => k !== at);
  const [bag, kept] = out ? [to, rest] : [rest, to];
  const moved = { ...state, bag, stashes: { ...state.stashes, [keyOf(state, x, y)]: kept } };
  return left ? say(moved, out ? 'bagFull' : 'stashFull') : moved;
}

// § store: Store on the chest's card moves every bag stack whose kind the chest already
// holds onto it, as much as fits, free: "You store 3 stacks.", "Nothing to store.", and
// "The chest is full." after the count when some had to stay in the bag (D-555, D-556)
export function storeMatching(state, x, y) {
  let stash = stashAt(state, x, y), stored = 0, full = false;
  const kinds = new Set(stash.map((s) => s.id)), bag = [];
  for (const s of state.bag) {
    if (!kinds.has(s.id)) { bag.push(s); continue; }
    const { to, left } = put(stash, s, CHEST_SLOTS);
    if (left < s.n) stored++;
    if (left) { full = true; bag.push(left === s.n ? s : { ...s, n: left }); }
    stash = to;
  }
  if (!stored) return say(state, full ? 'stashFull' : 'storeNone');
  const moved = { ...state, bag, stashes: { ...state.stashes, [keyOf(state, x, y)]: stash } };
  return say(moved, `store${stored === 1 ? 'One' : 'Some'}${full ? 'Full' : ''}`, stored);
}

// § store nearby: the bag's own STORE (D-555, D-558) shows on the surface with a stash chest
// within REACH tiles of the hero, across, down or diagonally (a 13 × 13 square); chestsNear
// lists them nearest first. storeNearby sends each bag stack to the chests in reach that
// already hold its kind, the nearest first, as much as fits, free. When some must stay,
// "The chests are full." with more than one chest in reach, "The chest is full." with one
export const REACH = 6;
export function chestsNear(state) {
  const { room, hero } = state;
  if (!room?.dark?.sky) return [];
  const near = [];
  for (let y = Math.max(0, hero.y - REACH); y <= Math.min(room.rows - 1, hero.y + REACH); y++) {
    for (let x = Math.max(0, hero.x - REACH); x <= Math.min(room.cols - 1, hero.x + REACH); x++) {
      if (tileAt(room, x, y).id === 'stash') near.push({ x, y, d: Math.max(Math.abs(x - hero.x), Math.abs(y - hero.y)) });
    }
  }
  return near.sort((a, b) => a.d - b.d).map(({ x, y }) => ({ x, y }));
}
export function storeNearby(state) {
  const near = chestsNear(state);
  if (!near.length) return state;
  const stashes = near.map(({ x, y }) => stashAt(state, x, y)), kinds = stashes.map((st) => new Set(st.map((s) => s.id)));
  let stored = 0, full = false;
  const bag = [];
  for (const s of state.bag) {
    let left = s.n;
    stashes.forEach((st, k) => {
      if (!left || !kinds[k].has(s.id)) return;
      const r = put(st, { ...s, n: left }, CHEST_SLOTS);
      stashes[k] = r.to; left = r.left;
    });
    const held = kinds.some((k) => k.has(s.id));
    if (held && left < s.n) stored++;
    if (held && left) full = true;
    bag.push(left === s.n ? s : left ? { ...s, n: left } : null);
  }
  const many = near.length > 1, fullLine = many ? 'chestsFull' : 'stashFull';
  if (!stored) return say(state, full ? fullLine : 'storeNone');
  const kept = { ...state.stashes };
  near.forEach(({ x, y }, k) => { if (stashes[k].length) kept[keyOf(state, x, y)] = stashes[k]; });
  const moved = { ...state, bag: bag.filter(Boolean), stashes: kept };
  return say(moved, `store${stored === 1 ? 'One' : 'Some'}${full ? (many ? 'Fulls' : 'Full') : ''}`, stored);
}

// § craft from chests: the workbench reads the chests STORE reaches (D-553, D-560).
// nearStacks: every stack in them, nearest chest first, for the bench card's counts.
// payNear: `of`, { itemId: n }, taken from the bag first, then the nearest chest, then
// the next; the caller checks there is enough first. Returns { bag, stashes }.
export const nearStacks = (state) => chestsNear(state).flatMap(({ x, y }) => stashAt(state, x, y));
export function payNear(state, of) {
  const bag = bagPay(state.bag, of), stashes = { ...state.stashes };
  let owed = Object.fromEntries(Object.entries(of).map(([id, n]) => [id, Math.max(0, n - carried(state.bag, id))]));
  for (const { x, y } of chestsNear(state)) {
    if (!Object.values(owed).some(Boolean)) break;
    const st = stashAt(state, x, y), take = Object.fromEntries(Object.entries(owed).map(([id, n]) => [id, Math.min(n, carried(st, id))]));
    if (!Object.values(take).some(Boolean)) continue;
    stashes[keyOf(state, x, y)] = bagPay(st, take);
    owed = Object.fromEntries(Object.entries(owed).map(([id, n]) => [id, n - take[id]]));
  }
  return { bag, stashes };
}

// A state from a save older than the stash chest's things gets none kept (D-331)
export const withStashes = (state) => (state.stashes ? state : { ...state, stashes: {} });
