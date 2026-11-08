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

const LOCKED = ['helm', 'horned', 'pointed', 'bobble', 'circlet', 'scarf'];
test('nine heads: Hood, Brim and Ears free (D-704); Helm and the five added locked at 3 Glints; the registry has them', () => {
  assert.deepEqual(HEAD_IDS, ['hood', 'brim', 'ears', ...LOCKED]);
  assert.equal(DEFAULT_HEAD, 'hood');
  for (const id of ['hood', 'brim', 'ears']) assert.ok(!HEADS[id].locked && !HEADS[id].price, id);
  for (const id of LOCKED) assert.ok(HEADS[id].locked && HEADS[id].price === 3, id);
  assert.equal(REGISTERED, HEADS);
  assert.equal(choiceOf('helm'), HEADS.helm);
});

test('a profile from before D-703, or with a head it hasn\'t bought, wears the hood', () => {
  assert.equal(headOf({ look: { cloak: 'rust' } }), 'hood');
  assert.equal(headOf(undefined), 'hood');
  assert.equal(headOf({ look: { head: 'horned' }, bought: [] }), 'hood');
  assert.equal(headOf({ look: { head: 'horned' }, bought: ['horned'] }), 'horned');
  assert.equal(headOf({ look: { head: 'ears' }, bought: [] }), 'ears', 'Ears free');
  assert.ok(isLocked('head', 'helm', ['horned']) && !isLocked('head', 'horned', ['horned']) && !isLocked('head', 'brim', []));
});

test('a bought head costs its Glints and can be rolled; one not bought never is', () => {
  assert.equal(spentOn(['zebra', 'dish', 'helm']), 9);
  assert.equal(spentOn(['brim', 'ears']), 0, 'Brim and Ears bought before D-704 cost nothing now');
  const r = rng(5), heads = new Set(Array.from({ length: 400 }, () => rollLook(r, ['scarf']).head));
  assert.deepEqual([...heads].sort(), ['brim', 'ears', 'hood', 'scarf']);
});

test('each head changes only the top of the head: the hood is the hero\'s own, the eyes, body and lantern stay', () => {
  const hood = rowsOf(dressed('cloak', 'lantern', 'hood'));
  assert.deepEqual(hood, rowsOf(HERO));
  for (const id of HEAD_IDS.slice(1)) {
    const def = dressed('belted', 'dish', id), rows = rowsOf(def), plain = rowsOf(dressed('belted', 'dish'));
    assert.notDeepEqual(rows.slice(0, 6), plain.slice(0, 6), id);
    assert.equal(rows[6].slice(0, 12), plain[6].slice(0, 12), `${id}: the face's row as it was (the scarf's ends hang past it)`);
    assert.deepEqual(rows.slice(7), plain.slice(7), `${id}: all under the eyes as it was`);
    assert.equal(rows[6][6] + rows[6][9], 'ee', `${id}: both eyes`);
    assert.deepEqual(def.extra, dressed('belted', 'dish').extra, `${id}: the lamp kept`);
    assert.ok(rows.every((r) => r.length === 16), id);
  }
  assert.ok(rowsOf(dressed('cloak', 'lantern', 'helm')).slice(0, 6).join('').includes('T'), 'the helm in the trim\'s colours');
  const brim = rowsOf(dressed('cloak', 'lantern', 'brim'));
  assert.ok(brim[4].startsWith('kT') && !/[CcBb]/.test(brim.slice(0, 6).join('')), 'the brim as wide as the sprite, all in the trim\'s colours (D-704)');
  const horned = rowsOf(dressed('cloak', 'lantern', 'horned')).slice(0, 4).join('');
  assert.ok(horned.includes('w') && horned.includes('A'), 'the horns in bone, whatever the cloak and trim');
});

test('six tabs in one row on a wide view; two rows of three on the smallest (D-703)', () => {
  assert.equal(new Set(boxesAt(844, 390).tabs.map((t) => t.y)).size, 1);
  const small = boxesAt(176, 221);
  assert.deepEqual(Object.values(Object.groupBy(small.tabs, (t) => t.y)).map((r) => r.length), [3, 3]);
  assert.ok(small.y + small.shown * small.bh + 4 < small.row.ok.y, 'the boxes clear of the buttons');
});
