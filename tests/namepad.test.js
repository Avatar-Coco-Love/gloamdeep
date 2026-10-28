// § name pad: typing a new profile's name (D-272)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { NAME_PAD, NAME_MAX, typeLetter, moveName } from '../src/core/namepad.js';

const at = (id) => NAME_PAD.findIndex((k) => k.id === id);

test('letters type in capitals up to 12, Del takes the last, others are skipped', () => {
  let e = '';
  for (const k of ['c', 'O', '1', ' ', 'c', 'o']) e = typeLetter(e, k);
  assert.equal(e, 'COCO');
  assert.equal(typeLetter(e, 'del'), 'COC');
  assert.equal(typeLetter('', 'del'), '');
  assert.equal(typeLetter('ABCDEFGHIJKL', 'M').length, NAME_MAX);
});

test('the pad holds A to Z, Del and OK; the round cross goes back (D-398)', () => {
  assert.equal(NAME_PAD.length, 28);
  assert.equal(NAME_PAD.filter((k) => /^[A-Z]$/.test(k.id)).length, 26);
});

test('the pad is split for thumbs: A to M left, N to Z right, Del and OK at the bottom (D-420)', () => {
  const k = (id) => NAME_PAD[at(id)];
  assert.deepEqual([k('A').col, k('D').col, k('M').row], [0, 3, 3]);
  assert.deepEqual([k('N').col, k('Q').col, k('Z').row], [4, 7, 3]);
  assert.deepEqual([k('del').row, k('del').col, k('ok').row, k('ok').col], [3, 1, 3, 5]);
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
  assert.equal(moveName(at('X'), 'down'), at('ok'));
  assert.equal(moveName(at('del'), 'right'), at('Z'));
  assert.equal(moveName(at('del'), 'up'), at('J'));
  assert.equal(moveName(at('ok'), 'up'), at('W'));
  assert.equal(moveName(at('ok'), 'down'), at('ok'));
});
