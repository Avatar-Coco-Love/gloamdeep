// § name pad: typing a new profile's name (D-272). Split for thumbs (D-420): A to M four
// to a row on the left half, Del after M; N to Z the same on the right, then Space, 123 and OK
// after Z (D-765). 123 swaps the letters for the digits 1 to 8 across the top row and 9 and 0
// under them, ABC swaps back; the bottom row stays as it is. The card's round cross goes back
// (D-398; was a Back row, D-288). Up to 12 letters, digits and spaces, kept in capitals (D-268).
// Plain data, no drawing.
import { moveOn } from './seedpad.js';

export const NAME_MAX = 12;
export const NAME_ROWS = 4;
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '1234567890';
const grid = (chars, left) => [...chars].map((l, i) => ({ id: l, text: l, row: Math.floor(i / 4), col: left + (i % 4), span: 1 }));
// The bottom row, the same on both pads: M, Del, then Z, Space, the swap key and OK
const bottom = (swap) => [
  { id: 'M', text: 'M', row: 3, col: 0, span: 1 }, { id: 'del', text: 'Del', row: 3, col: 1, span: 3 },
  { id: 'Z', text: 'Z', row: 3, col: 4, span: 1 }, { id: 'space', text: 'Spc', row: 3, col: 5, span: 1 },
  swap, { id: 'ok', text: 'OK', row: 3, col: 7, span: 1 },
];
const sorted = (keys) => keys.sort((a, b) => a.row - b.row || a.col - b.col);
// Each key: { id, text, row, col, span }, row by row, left half before right, so Left and
// Right walk across the gap
export const NAME_PAD = sorted([...grid(LETTERS.slice(0, 12), 0), ...grid(LETTERS.slice(13, 25), 4), ...bottom({ id: 'digits', text: '123', row: 3, col: 6, span: 1 })]);
// The digits' pad (D-765): 1 to 4 left and 5 to 8 right on the top row, 9 and 0 under 1 and 2
export const DIGIT_PAD = sorted([...grid(DIGITS.slice(0, 4), 0), ...grid(DIGITS.slice(4, 8), 4), ...grid(DIGITS.slice(8), 0).map((k) => ({ ...k, row: 1 })), ...bottom({ id: 'letters', text: 'ABC', row: 3, col: 6, span: 1 })]);
export const padOf = (digits) => (digits ? DIGIT_PAD : NAME_PAD);

// § typing: (entry, key id) → the entry after it; a letter in either case types its capital,
// a digit itself. Space (D-765) never starts a name or follows a space; finished, a space at the
// end is dropped.
export function typeLetter(entry, id) {
  if (id === 'del') return entry.slice(0, -1);
  if (entry.length >= NAME_MAX) return entry;
  if (id === 'space' || id === ' ') return entry && !entry.endsWith(' ') ? entry + ' ' : entry;
  const l = id.toUpperCase();
  return id.length === 1 && (LETTERS.includes(l) || DIGITS.includes(l)) ? entry + l : entry;
}
export const finishName = (entry) => entry.trimEnd();
export const moveName = (i, dir, digits = false) => moveOn(padOf(digits), i, dir);
