// § name pad: typing a new profile's name (D-272)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { NAME_PAD, DIGIT_PAD, NAME_MAX, typeLetter, finishName, moveName } from '../src/core/namepad.js';
import { nameCard } from '../src/input/cards/name.js';

const at = (id, pad = NAME_PAD) => pad.findIndex((k) => k.id === id);

test('letters and digits type in capitals up to 12, Del takes the last, others are skipped', () => {
  let e = '';
  for (const k of ['c', 'O', '1', '-', 'c', 'o']) e = typeLetter(e, k);
  assert.equal(e, 'CO1CO');
  assert.equal(typeLetter(e, 'del'), 'CO1C');
  assert.equal(typeLetter('', 'del'), '');
  assert.equal(typeLetter('ABCDEFGHIJKL', 'M').length, NAME_MAX);
  assert.equal(typeLetter('ABCDEFGHIJKL', 'space').length, NAME_MAX);
});

test('spaces are tidy: never first, never two in a row, one at the end dropped on OK (D-765)', () => {
  assert.equal(typeLetter('', 'space'), '');
  assert.equal(typeLetter('OLD', 'space'), 'OLD ');
  assert.equal(typeLetter('OLD ', 'space'), 'OLD ');
  assert.equal(typeLetter('OLD ', 'T'), 'OLD T');
  assert.equal(finishName('OLD TOM '), 'OLD TOM');
});

test('the pad holds A to Z, Del, Space, 123 and OK; the digits pad 0 to 9, Del, Space, ABC and OK', () => {
  assert.equal(NAME_PAD.length, 30);
  assert.equal(NAME_PAD.filter((k) => /^[A-Z]$/.test(k.id)).length, 26);
  assert.deepEqual(DIGIT_PAD.filter((k) => /^[0-9]$/.test(k.id)).map((k) => k.id).join(''), '1234567890');
  assert.ok(['del', 'space', 'ok', 'M', 'Z'].every((id) => at(id) >= 0 && at(id, DIGIT_PAD) >= 0));
  assert.ok(at('digits') >= 0 && at('letters', DIGIT_PAD) >= 0);
});

test('the pad is split for thumbs: A to M left, N to Z right, Del, Space, 123 and OK at the bottom (D-420, D-765)', () => {
  const k = (id, pad = NAME_PAD) => pad[at(id, pad)];
  assert.deepEqual([k('A').col, k('D').col, k('M').row], [0, 3, 3]);
  assert.deepEqual([k('N').col, k('Q').col, k('Z').row], [4, 7, 3]);
  assert.deepEqual([k('del').row, k('del').col, k('space').col, k('digits').col, k('ok').row, k('ok').col], [3, 1, 5, 6, 3, 7]);
  assert.deepEqual([k('1', DIGIT_PAD).col, k('5', DIGIT_PAD).col, k('9', DIGIT_PAD).row, k('0', DIGIT_PAD).col], [0, 4, 1, 1]);
});

test('arrows walk the grid, across the split, and stop at its edges', () => {
  assert.equal(moveName(at('A'), 'left'), at('A'));
  assert.equal(moveName(at('A'), 'up'), at('A'));
  assert.equal(moveName(at('D'), 'right'), at('N'));
  assert.equal(moveName(at('N'), 'left'), at('D'));
  assert.equal(moveName(at('Q'), 'right'), at('Q'));
  assert.equal(moveName(at('C'), 'down'), at('G'));
  assert.equal(moveName(at('L'), 'down'), at('del'));
  assert.equal(moveName(at('I'), 'down'), at('M'));
  assert.equal(moveName(at('X'), 'down'), at('digits'));
  assert.equal(moveName(at('del'), 'right'), at('Z'));
  assert.equal(moveName(at('del'), 'up'), at('J'));
  assert.equal(moveName(at('ok'), 'up'), at('Y'));
  assert.equal(moveName(at('ok'), 'down'), at('ok'));
});

test('on the digits pad, arrows step over its empty rows', () => {
  const d = (id) => at(id, DIGIT_PAD);
  assert.equal(moveName(d('9'), 'down', true), d('M'));
  assert.equal(moveName(d('M'), 'up', true), d('9'));
  assert.equal(moveName(d('1'), 'down', true), d('9'));
});

// § Space on the name pad (D-765; did nothing, D-683): it types a space, so "ANNA MAE" stays
// whole; Enter still presses the lit key

test('Space on the name pad types a space; Enter still presses OK', () => {
  const pressed = [], app = { chosen: 0 };
  const card = nameCard(app, {}, () => {}, { pressName: (id) => pressed.push(id), closeName: () => {} });
  for (const k of ['a', 'n', 'n', 'a']) card.type(k);
  assert.equal(app.chosen, at('ok'));
  card.space();
  assert.deepEqual(pressed, ['a', 'n', 'n', 'a', 'space']);
  assert.equal(card.type('7'), true);
  card.pick(app.chosen);
  assert.deepEqual(pressed, ['a', 'n', 'n', 'a', 'space', '7', 'ok']);
});
