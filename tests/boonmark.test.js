// § the boon's mark under the panel (D-604): where a tap finds it, and its line fits the screen
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { markAt, marksSize, MARK, MARK_GAP, MARK_PAD } from '../src/render/marks.js';
import { lineRows } from '../src/render/textline.js';
import { textWidth } from '../src/render/font.js';
import { LINES, say, shownLine } from '../src/core/lines.js';
import { BOONS } from '../src/core/registry.js';

test('boon mark: a tap on it finds it, one beside or under it does not', () => {
  assert.equal(markAt(1, 10, 40, 10, 40), 0);
  assert.equal(markAt(1, 10, 40, 10 + MARK - 1, 40 + MARK - 1), 0);
  assert.equal(markAt(1, 10, 40, 10 + MARK - 1 + MARK_PAD, 40), 0); // the pad round it still finds it (H-36)
  assert.equal(markAt(1, 10, 40, 10 + MARK + MARK_PAD, 40), -1);
  assert.equal(markAt(1, 10, 40, 10, 40 + MARK + MARK_PAD), -1);
  assert.equal(markAt(1, 10, 40, 10 - MARK_PAD - 1, 40), -1);
  assert.equal(markAt(0, 10, 40, 10, 40), -1);
  assert.deepEqual(marksSize(0), { w: 0, h: 0 });
});

test('boon mark: a tap in the gap finds the nearer mark, never the hero (H-36)', () => {
  assert.equal(markAt(2, 0, 0, MARK, 5), 0);
  assert.equal(markAt(2, 0, 0, MARK + MARK_GAP - 1, 5), 1);
});

test('marks: a row too wide for its room goes on to a second row, the taps with it (H-55)', () => {
  const room = 4 * MARK + 3 * MARK_GAP; // four to a row
  assert.deepEqual(marksSize(10, room), { w: room, h: 3 * MARK + 2 * MARK_GAP });
  assert.deepEqual(marksSize(10), { w: 10 * MARK + 9 * MARK_GAP, h: MARK }); // no room given: one row
  assert.equal(markAt(10, 0, 0, 1, MARK + MARK_GAP + 1, room), 4); // the fifth starts the second row
  assert.equal(markAt(10, 0, 0, 4 * (MARK + MARK_GAP) + 1, 1, room), 3); // past the row's end, nothing more there
  assert.deepEqual(marksSize(3, 1), { w: MARK, h: 3 * MARK + 2 * MARK_GAP }); // at least one to a row
});

test('boon mark: every boon\'s name and line wraps to 2 rows at most on the narrowest screen', () => {
  for (const b of Object.values(BOONS)) {
    const rows = lineRows(`${b.name}: ${b.words}`, 176 - 8);
    assert.ok(rows.length <= 2, `${b.name}: ${rows.length} rows`);
    assert.ok(rows.every((r) => textWidth(r) <= 168), b.name);
  }
});

test('boon mark: the line says the name and the card line, and no turn passes', () => {
  const s = say({ turn: 7 }, 'boonHeld', 'Slow Wick: The lantern burns a quarter slower.');
  assert.equal(s.turn, 7);
  assert.equal(shownLine(s).text, 'Slow Wick: The lantern burns a quarter slower.');
  assert.ok(LINES.boonHeld);
});
