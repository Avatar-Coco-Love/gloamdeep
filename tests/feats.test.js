// § feats (D-284, D-467, D-695): the Beaten Feat's 3 tiers, the Glints they pay, the tab and its note
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FEATS, featRows, featsWords, featNote, glints, glintsText } from '../src/core/feats.js';
import { journalAt } from '../src/render/journal.js';
import { cardAt, PAD } from '../src/render/bag.js';
import { textWidth } from '../src/render/font.js';
import { LINES } from '../src/core/lines.js';

const at = (beaten) => ({ deepest: 0, beaten, falls: 0, found: 0, steps: 0, poured: 0, torches: 0 });

test('the first Feat is Beaten: 10, 50 and 200 creatures, paying 1, 2 and 3 Glints (D-695)', () => {
  assert.deepEqual(FEATS.map((f) => [f.text, f.record, f.tiers, f.pays]), [['Beaten', 'beaten', [10, 50, 200], [1, 2, 3]]]);
});

test('Glints come from the tiers reached, counts made before Feats came too', () => {
  assert.deepEqual([0, 9, 10, 49, 50, 199, 200, 999].map((n) => glints(at(n))), [0, 0, 1, 1, 3, 3, 6, 6]);
  assert.equal(glintsText(at(10)), '1 Glint');
  assert.equal(glintsText(at(0)), '0 Glints');
});

test('a row says the count toward the next tier and how many marks are lit', () => {
  assert.deepEqual(featRows(at(12))[0], { id: 'beaten', text: 'Beaten', value: '12 of 50', reached: 1, tiers: 3 });
  assert.deepEqual(featRows(at(3))[0].value, '3 of 10');
  assert.deepEqual(featRows(at(250))[0], { id: 'beaten', text: 'Beaten', value: '200', reached: 3, tiers: 3 });
  assert.equal(featsWords(at(12)), 'Journal, Feats tab. 1 Glint. Beaten, 12 of 50, 1 of 3 reached. Left for the Bestiary. Esc or the close button goes back.');
});

test('reaching a tier gives a note, once (D-467)', () => {
  assert.equal(featNote(at(9), at(10)), 'Beaten 10. +1 Glint');
  assert.equal(featNote(at(49), at(50)), 'Beaten 50. +2 Glints');
  assert.equal(featNote(at(10), at(11)), null);
  assert.equal(LINES.featReached.text.replace('{n}', featNote(at(9), at(10))), 'Feat reached: Beaten 10. +1 Glint.');
});

test('the Feats tab is tapped on every card, one row sideways, two upright, and its row fits', () => {
  for (const [vw, vh, dy] of [[300, 176, 0], [390, 208, 0], [176, 370, 16]]) {
    const card = cardAt(vw, vh), xs = [...Array(card.w).keys()];
    const tabs = xs.map((x) => journalAt(card.x + x, card.y + 32 + dy, vw, vh)).filter((a) => a?.tab).map((a) => a.tab);
    assert.equal(tabs.at(-1), 'feats', `${vw}×${vh}`);
    const vx = PAD + 8 + textWidth('Beaten') + 20, marks = 3 * 9;
    assert.ok(vx + textWidth('199 of 200') + 4 <= card.w - PAD - marks, `${vw}×${vh}`);
  }
});
