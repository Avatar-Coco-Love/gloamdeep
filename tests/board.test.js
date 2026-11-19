// § board: the planning board's script reads every idea and check line in docs/planning/ (D-996).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { parse, page } from '../tools/board.js';

test('every idea becomes one card with one check, and the page carries them', { skip: !existsSync('docs/planning') }, () => {
  const { cards, problems, html } = page('.');
  assert.deepEqual(problems, []);
  assert.ok(cards.length > 100, `only ${cards.length} cards`);
  for (const c of cards) assert.ok(c.horizon && c.size && c.text && c.tag, `${c.id} is missing a part`);
  assert.ok(!html.includes('/*CARDS*/') && html.includes(`"id":"${cards[0].id}"`));
  assert.equal(parse('.').cards.length, cards.length);
});
