// § line clock: a line at the bottom also goes after its seconds (B-009, D-932)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createLineClock, lineMs, LINE_MS, ROW_MS } from '../src/render/textline.js';

const short = { text: 'You take the knife.' };
const long = { text: 'Stiff: 1 hit in 3 misses, 4 turns left. And a lot more words here.' };

test('4 seconds, 2 more for each row past the first', () => {
  assert.equal(LINE_MS, 4000); assert.equal(ROW_MS, 2000);
  assert.equal(lineMs(1), 4000); assert.equal(lineMs(3), 8000);
});

test('a one-row line goes after 4 seconds, standing still', () => {
  const clock = createLineClock(() => 1000), saying = { id: 'knifeTake', turn: 3 };
  assert.equal(clock(short, saying, 100), short);
  assert.equal(clock(short, saying, 4099), short);
  assert.equal(clock(short, saying, 4100), null);
});

test('a line on more rows stays longer', () => {
  const clock = createLineClock(() => 120), saying = { id: 'stiffHeld', turn: 1 }; // narrow: 3 rows or more
  assert.equal(clock(long, saying, 0), long);
  assert.equal(clock(long, saying, 5000), long);
});

test('said again, its seconds start again; no line, nothing', () => {
  const clock = createLineClock(() => 1000);
  clock(short, { id: 'knifeTake', turn: 1 }, 0);
  assert.equal(clock(short, { id: 'knifeTake', turn: 1 }, 5000), short); // a new saying, same words
  assert.equal(clock(null, null, 6000), null);
});
