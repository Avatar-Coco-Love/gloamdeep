// § journal: one book with tabs (D-262, D-270). Records is the first tab, Growth
// the second (D-293); later tabs join the row. Plain data, no drawing.
import { playedText } from './profile.js';
import { embers, told, START_PICK } from './growth.js';
import { BRANCHES } from './upgrades.js';

export const TABS = [{ id: 'records', text: 'Records' }, { id: 'growth', text: 'Growth' }];

// § records: the Records tab's rows, a name and its value, from a profile's records and its
// play time in seconds, written as in its Profiles box (D-290, D-291)
export const recordRows = (r, played = 0) => [
  { text: 'Deepest', value: `depth ${r.deepest}` },
  { text: 'Beaten', value: String(r.beaten) },
  { text: 'Falls', value: String(r.falls) },
  { text: 'Rooms found', value: String(r.found) },
  { text: 'Steps', value: String(r.steps) },
  { text: 'Flasks poured', value: String(r.poured) },
  { text: 'Torches lit', value: String(r.torches) },
  { text: 'Time played', value: playedText(played) },
];
// The words for the screen reader; the card's cross goes back (D-391)
const TURN = 'Left or Right for another tab. Esc or the close button goes back.';
export const journalWords = (r, played = 0) => `Journal, Records tab. ${recordRows(r, played).map((row) => `${row.text}, ${row.value}`).join('. ')}. ${TURN}`;

// § growth: the Growth tab, a tree (D-462, D-481): the embers left, then the picked place's
// branch and what it says beside the tree (growth.js)
const PICK = 'Arrows pick another place, Left past Light for Records.';
export function growthWords(state, pick = START_PICK) {
  const t = told(state, pick), b = t.button;
  const parts = [`Embers, ${embers(state)}`, `${BRANCHES[pick.col].text}, row ${pick.row + 1}, ${t.name}`, t.value, t.words.replace(/\.$/, ''), b && `${b.text}, ${b.cost}${b.can ? '' : ', not now'}`].filter(Boolean);
  return `Journal, Growth tab. ${parts.join('. ')}. ${PICK} Esc or the close button goes back.`;
}
