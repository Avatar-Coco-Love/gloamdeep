// § trade's window (D-1011, D-1013): on the peddler's card, where the grid's slots don't all fit,
// they show through a window of whole rows that scrolls, as the bag card's (bagscroll.js, whose
// bar and grab helpers it shares). Upright, the window ends where the chosen thing's name, its
// "carried" line and the price line still fit above SELL or BUY (the owner's pick); sideways, at
// the card's foot. Both tabs share it: the grid is the bag's shape on Sell and Buy (D-548).
import { bagShape, cardAt, isTall, PAD, SLOT_GAP, LINE_H } from './bag.js';

export const TRADE_TOP = 70; // the grid's top inside the card, the bag card's GRID_Y
const WORDS_ROOM = 12 + 10 + 2.5 * LINE_H + LINE_H + 4; // the line under the window, the words' drop, the name's and carried rows, the price line and a gap above the button

// The window on a view `vw` × `vh`, from the card's top: as bagWindow's
export function tradeWindow(vw, vh, size) {
  const shape = bagShape(size), card = cardAt(vw, vh, shape.detail), pitch = shape.slot + SLOT_GAP;
  const foot = isTall(vw, vh) ? card.button.y - card.y - WORDS_ROOM : card.h - 4;
  const rows = Math.ceil(size / shape.cols), fit = Math.max(1, Math.min(rows, Math.floor((foot - TRADE_TOP + SLOT_GAP) / pitch)));
  return { top: TRADE_TOP, left: PAD, h: fit * pitch - SLOT_GAP, pitch, max: (rows - fit) * pitch, full: shape.h, shape, card };
}
