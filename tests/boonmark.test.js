// § the boon's mark under the panel (D-604): where a tap finds it, and its line fits the screen
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { markAt, marksSize, MARK } from '../src/render/marks.js';
import { lineRows } from '../src/render/textline.js';
import { textWidth } from '../src/render/font.js';
import { LINES, say, shownLine } from '../src/core/lines.js';
import { BOONS } from '../src/core/registry.js';

test('boon mark: a tap on it finds it, one beside or under it does not', () => {
  assert.equal(markAt(1, 10, 40, 10, 40), 0);
  assert.equal(markAt(1, 10, 40, 10 + MARK - 1, 40 + MARK - 1), 0);
  assert.equal(markAt(1, 10, 40, 10 + MARK, 40), -1);
  assert.equal(markAt(1, 10, 40, 10, 40 + MARK), -1);
  assert.equal(markAt(0, 10, 40, 10, 40), -1);
  assert.deepEqual(marksSize(0), { w: 0, h: 0 });
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
