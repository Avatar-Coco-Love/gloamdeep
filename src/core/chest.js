// § chest: the stash chest's panel (CH3, D-325, D-330). Its 12 slots are two rows
// of the bag's 6 (D-324); `chosen` is a slot, 0 to 11, or CHEST_CLOSE for its Close
// line. Plain data, no drawing.
import { BAG_SLOTS } from './bag.js';

export const CHEST_SLOTS = 2 * BAG_SLOTS;
export const CHEST_CLOSE = CHEST_SLOTS;
export const CHEST_WORDS = 'Stash chest. 12 slots, all empty. Close.'; // for a screen reader

// Where an arrow moves the gold frame: Left and Right along a row, Down to the
// second row and then Close, Up from Close to the second row's first slot
export function moveChest(i, dir) {
  if (i === CHEST_CLOSE) return dir === 'up' ? BAG_SLOTS : i;
  const col = i % BAG_SLOTS, row = Math.floor(i / BAG_SLOTS);
  if (dir === 'left') return col > 0 ? i - 1 : i;
  if (dir === 'right') return col < BAG_SLOTS - 1 ? i + 1 : i;
  if (dir === 'up') return row > 0 ? i - BAG_SLOTS : i;
  if (dir === 'down') return row < 1 ? i + BAG_SLOTS : CHEST_CLOSE;
  return i;
}
