// § journal: one book with tabs, Records first (J1, D-262, D-270)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TABS, recordRows, journalWords, growthRows, growthWords } from '../src/core/journal.js';
import { counted } from '../src/core/record.js';
import { newProfile } from '../src/core/profile.js';
import { journalAt, HEART, HEART_W } from '../src/render/journal.js';
import { cardAt, PAD } from '../src/render/bag.js';
import { textWidth } from '../src/render/font.js';

const records = { deepest: 3, beaten: 12, falls: 4, found: 27, steps: 1843, poured: 6, torches: 2 };

test('Records is the first tab, Growth the second (D-293)', () => {
  assert.deepEqual(TABS.map((t) => t.text), ['Records', 'Growth']);
});

test('the Growth tab shows the embers left and the hearts in all, then Add a heart (D-293)', () => {
  const s = { xp: 30, hearts: 1, health: 6 }; // level 3: two embers, one spent
  assert.deepEqual(growthRows(s).map((r) => [r.text, r.value]), [['Embers', '1'], ['Hearts', '6 of 10']]);
  assert.equal(growthWords(s), 'Journal, Growth tab. Embers, 1. Hearts, 6 of 10. Add a heart, 1 ember each. Left or Right for another tab. Esc or the close button goes back.');
  assert.equal(growthWords({ xp: 0, health: 5 }), 'Journal, Growth tab. Embers, 0. Hearts, 5 of 10. Add a heart, 1 ember each, not now. Left or Right for another tab. Esc or the close button goes back.');
});

test('the Records tab shows the deepest depth, creatures beaten, falls, rooms found, steps, flasks poured, torches lit and time played (D-283, D-285, D-286, D-291)', () => {
  assert.deepEqual(recordRows(records, 5025).map((r) => [r.text, r.value]), [['Deepest', 'depth 3'], ['Beaten', '12'], ['Falls', '4'], ['Rooms found', '27'], ['Steps', '1843'], ['Flasks poured', '6'], ['Torches lit', '2'], ['Time played', '1h 23m']]);
  assert.equal(journalWords(records, 1380), 'Journal, Records tab. Deepest, depth 3. Beaten, 12. Falls, 4. Rooms found, 27. Steps, 1843. Flasks poured, 6. Torches lit, 2. Time played, 23m. Left or Right for another tab. Esc or the close button goes back.');
});

test('the counts rise with each beat, fall, found, step, pour and torch event, on any journey', () => {
  const r = newProfile().records;
  const after = counted(r, [{ type: 'hit', id: 'rat' }, { type: 'beat', id: 'rat' }, { type: 'found', place: 'second' }, { type: 'fall' }, { type: 'step' }, { type: 'pour', id: 'flask', by: 'hand' }, { type: 'pour', id: 'flask', by: 'self' }, { type: 'torch' }]);
  assert.deepEqual(after, { deepest: 0, beaten: 1, falls: 1, found: 1, steps: 1, poured: 2, torches: 1 });
  assert.deepEqual(r, { deepest: 0, beaten: 0, falls: 0, found: 0, steps: 0, poured: 0, torches: 0 }); // the old one left as it was
});

test('nothing counted is the same Records, and a dev jump stops the counting (D-232)', () => {
  const r = newProfile().records;
  assert.equal(counted(r, [{ type: 'hit', id: 'rat' }]), r);
  assert.equal(counted(r, [{ type: 'beat', id: 'rat' }], true), r);
});

// A sideways phone's room (D-377), and the narrowest a card is drawn on
const VW = 300, VH = 176;

test('Records fits the card under the tabs, and Add a heart with its cost fits Growth (D-391)', () => {
  const card = cardAt(VW, VH), rows = recordRows({ ...records, steps: 999999 }, 359999 * 60);
  assert.ok(52 + rows.length * 11 <= card.h - 12);
  const vx = PAD + 8 + Math.max(...rows.map((r) => textWidth(r.text))) + 20;
  for (const r of rows) assert.ok(vx + textWidth(r.value) <= card.w - PAD, r.value);
  assert.equal(HEART, 'ADD A HEART');
  assert.ok(PAD + 8 + textWidth('Hearts') + 20 + textWidth('10 of 10') < card.w - PAD - HEART_W - 8 - textWidth('1 ember each'));
});

test('a tap on a tab turns to it; the cross or a tap outside goes back (D-391)', () => {
  const { x, y, close } = cardAt(VW, VH);
  assert.deepEqual(journalAt(x + 24, y + 30, VW, VH), { tab: 'records' });
  assert.deepEqual(journalAt(x + 80, y + 30, VW, VH), { tab: 'growth' });
  assert.equal(journalAt(close.x, close.y, VW, VH), 'close');
  assert.equal(journalAt(2, 2, VW, VH), 'out');
  assert.equal(journalAt(x + 40, y + 80, VW, VH), null);
});

test('on Growth a tap on ADD A HEART picks it; on Records it is not there (D-391)', () => {
  const { x, w, button } = cardAt(VW, VH), at = [x + w - PAD - HEART_W / 2, button.y + 6];
  assert.equal(journalAt(...at, VW, VH, 'growth'), 'heart');
  assert.equal(journalAt(...at, VW, VH, 'records'), null);
});
