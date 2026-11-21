// § chest's bag window (D-1011, B-014): on the stash chest's card, where the bag's slots don't
// all fit, they show through a window of whole rows that scrolls, as the bag card's (bagscroll.js,
// whose bar and grab helpers it shares). Only with DECONSTRUCT and STORE raised to the title
// strip (D-1010), upright on a small screen: the window then ends where the chosen find's name
// and count still fit above the card's foot (the owner's pick). Elsewhere every bag fits, so no
// bar. The chest's own 12 slots fit every screen measured, so they don't scroll.
import { cardAt, SLOT_GAP } from './bag.js';
import { sides, raised } from './chestpanel.js';

const NAME_ROOM = 10 + 7 + 6; // the name's drop under the slots, its row's room and the card's foot gap

// The window on a view `vw` × `vh`, from the card's top: as bagWindow's, `left` the slots' left
export function chestWindow(vw, vh, size) {
  const card = cardAt(vw, vh), b = sides(vw, vh, size), shape = b.shape, pitch = shape.slot + SLOT_GAP;
  const rows = Math.ceil(size / shape.cols);
  const fit = raised(vw, vh, size) ? Math.max(1, Math.min(rows, Math.floor((card.h - NAME_ROOM - b.grid + SLOT_GAP) / pitch))) : rows;
  return { top: b.grid, left: b.x, h: fit * pitch - SLOT_GAP, pitch, max: (rows - fit) * pitch, full: shape.h, shape, card };
}
