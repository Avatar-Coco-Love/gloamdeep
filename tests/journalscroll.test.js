// § journal scroll (D-743): a Journal list taller than its card scrolls a row at a time; upright
// the Bestiary is one table; a quest's how wraps, its reward under it when there's no room beside
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fitFrom, lastFirst, clampFirst, questsList } from '../src/render/journalrows.js';
import { journalAt, scrollJournal, showBeastRow, bestiaryTables } from '../src/render/journal.js';
import { cardAt } from '../src/render/bag.js';
import { ALL } from '../src/core/registry.js';

const all = Object.fromEntries(ALL.filter((e) => e.kind === 'enemy').map((e) => [e.id, { met: 1, beaten: 0 }]));
const p = (bestiary = {}, goals = {}) => ({ records: {}, played: 0, bestiary, goals });

test('rows fit from the top row shown, and scrolling stops where the rest all fit', () => {
  const hs = [10, 10, 10, 10, 10];
  assert.equal(fitFrom(hs, 0, 35), 3);
  assert.equal(fitFrom(hs, 3, 35), 2);
  assert.equal(lastFirst(hs, 35), 2);
  assert.equal(lastFirst(hs, 50), 0);
  assert.equal(clampFirst(9, hs, 35), 2);
  assert.equal(clampFirst(-1, hs, 35), 0);
  assert.equal(fitFrom([40], 0, 30), 1, 'a row taller than the window still shows');
});

test('upright, every creature met is one table that scrolls; a short list does not', () => {
  const n = Object.keys(all).length;
  assert.equal(bestiaryTables(cardAt(180, 390), n).xs.length, 1);
  assert.equal(scrollJournal(0, 1, 180, 390, 'bestiary', p({ rat: { met: 1, beaten: 0 } })), null);
  assert.equal(scrollJournal(0, 1, 180, 390, 'bestiary', p(all)), 1);
  assert.equal(scrollJournal(0, -1, 180, 390, 'bestiary', p(all)), 0);
  assert.equal(scrollJournal(0, 1, 180, 390, 'growth', p(all)), null);
});

test('a tap on a scrolled table picks the row shown there, and a picked row is kept in view', () => {
  const card = cardAt(180, 390), y = card.y + 16 + 62 + 5; // under the second row of tabs, the first row shown
  assert.deepEqual(journalAt(card.x + 30, y, 180, 390, 'bestiary', null, null, all, null, {}, 1), { beast: 1 });
  const n = Object.keys(all).length;
  assert.ok(showBeastRow(0, n - 1, 180, 390, all) > 0);
  assert.equal(showBeastRow(5, 0, 180, 390, all), 0);
});

test('upright, a quest\'s how wraps and a done goal\'s reward goes under it; sideways beside the goal', () => {
  const goals = { rat: { done: false }, home: { done: true, paid: 'flask' } }; // newest first: home, then rat
  const up = questsList(cardAt(180, 390), goals, 'crypt-1').rows, wide = questsList(cardAt(400, 190), goals, 'crypt-1').rows;
  assert.equal(up[0].hows.length, 2, 'Leave by the gap in the crypt wall. takes two lines upright');
  assert.equal(up[0].beside, false, '+1 Oil flask goes under it');
  assert.equal(up[0].h, 4 * 11 + 4);
  assert.equal(wide[0].beside, true);
  assert.equal(wide[0].h, 26);
});
