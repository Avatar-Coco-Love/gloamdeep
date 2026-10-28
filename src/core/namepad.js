// § name pad: typing a new profile's name (D-272). Split for thumbs (D-420): A to M four
// to a row on the left half, Del after M; N to Z the same on the right, OK after Z. The
// card's round cross goes back (D-398; was a Back row, D-288). Up to 12 letters, kept in
// capitals (D-268). Plain data, no drawing.
import { moveOn } from './seedpad.js';

export const NAME_MAX = 12;
export const NAME_COLS = 8; // two halves of 4; the drawing leaves a gap between them
export const NAME_ROWS = 4;
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const half = (letters, left, last) => [
  ...[...letters].map((l, i) => ({ id: l, text: l, row: Math.floor(i / 4), col: left + (i % 4), span: 1 })),
  { ...last, row: 3, col: left + 1, span: 3 },
];
// Each key: { id, text, row, col, span }, row by row, left half before right, so Left and
// Right walk across the gap
export const NAME_PAD = [...half(LETTERS.slice(0, 13), 0, { id: 'del', text: 'Del' }), ...half(LETTERS.slice(13), 4, { id: 'ok', text: 'OK' })]
  .sort((a, b) => a.row - b.row || a.col - b.col);

// § typing: (entry, key id) → the entry after it; a letter in either case types its capital
export function typeLetter(entry, id) {
  if (id === 'del') return entry.slice(0, -1);
  const l = id.toUpperCase();
  return id.length === 1 && LETTERS.includes(l) && entry.length < NAME_MAX ? entry + l : entry;
}
export const moveName = (i, dir) => moveOn(NAME_PAD, i, dir);
