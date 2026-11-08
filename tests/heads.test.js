// § heads (D-703): hats and hoods, a sixth tab on the look card, bought with Glints as patterns and lamps are
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { HEADS, HEAD_IDS, DEFAULT_HEAD, headOf, isLocked, rollLook, spentOn, choiceOf } from '../src/core/looks.js';
import { HEADS as REGISTERED } from '../src/core/registry.js';
import { HERO, dressed } from '../src/render/pictures.js';
import { boxesAt } from '../src/render/cloak.js';
import { rng } from '../src/core/rng.js';

const whole = (r) => { r = (r + '........').slice(0, 8); return r + [...r].reverse().join(''); };
const rowsOf = (def) => def.rows.map((r) => (def.mirror ? whole(r) : r));

test('four heads, the study\'s hood first and free; Brim, Ears and Helm locked at 3 Glints; the registry has them', () => {
  assert.deepEqual(HEAD_IDS, ['hood', 'brim', 'ears', 'helm']);
  assert.equal(DEFAULT_HEAD, 'hood');
  assert.ok(!HEADS.hood.locked);
  for (const id of ['brim', 'ears', 'helm']) assert.ok(HEADS[id].locked && HEADS[id].price === 3, id);
  assert.equal(REGISTERED, HEADS);
  assert.equal(choiceOf('helm'), HEADS.helm);
});

test('a profile from before D-703, or with a head it hasn\'t bought, wears the hood', () => {
  assert.equal(headOf({ look: { cloak: 'rust' } }), 'hood');
  assert.equal(headOf(undefined), 'hood');
  assert.equal(headOf({ look: { head: 'ears' }, bought: [] }), 'hood');
  assert.equal(headOf({ look: { head: 'ears' }, bought: ['ears'] }), 'ears');
  assert.ok(isLocked('head', 'brim', ['ears']) && !isLocked('head', 'ears', ['ears']));
});

test('a bought head costs its Glints and can be rolled; one not bought never is', () => {
  assert.equal(spentOn(['zebra', 'dish', 'helm']), 9);
  const r = rng(5), heads = new Set(Array.from({ length: 300 }, () => rollLook(r, ['brim']).head));
  assert.deepEqual([...heads].sort(), ['brim', 'hood']);
});

test('each head changes only the top of the head: the hood is the hero\'s own, the eyes, body and lantern stay', () => {
  const hood = rowsOf(dressed('cloak', 'lantern', 'hood'));
  assert.deepEqual(hood, rowsOf(HERO));
  for (const id of ['brim', 'ears', 'helm']) {
    const def = dressed('belted', 'dish', id), rows = rowsOf(def), plain = rowsOf(dressed('belted', 'dish'));
    assert.notDeepEqual(rows.slice(0, 6), plain.slice(0, 6), id);
    assert.deepEqual(rows.slice(6), plain.slice(6), `${id}: the eyes' row and all under it as they were`);
    assert.equal(rows[6][6] + rows[6][9], 'ee', `${id}: both eyes`);
    assert.deepEqual(def.extra, dressed('belted', 'dish').extra, `${id}: the lamp kept`);
    assert.ok(rows.every((r) => r.length === 16), id);
  }
  assert.ok(rowsOf(dressed('cloak', 'lantern', 'helm')).slice(0, 6).join('').includes('T'), 'the helm in the trim\'s colours');
  assert.ok(rowsOf(dressed('cloak', 'lantern', 'brim'))[4].startsWith('kC'), 'the brim as wide as the sprite');
});

test('six tabs in one row on a wide view; two rows of three on the smallest (D-703)', () => {
  assert.equal(new Set(boxesAt(844, 390).tabs.map((t) => t.y)).size, 1);
  const small = boxesAt(176, 221);
  assert.deepEqual(Object.values(Object.groupBy(small.tabs, (t) => t.y)).map((r) => r.length), [3, 3]);
  assert.ok(small.y + small.shown * small.bh + 4 < small.row.ok.y, 'the boxes clear of the buttons');
});
