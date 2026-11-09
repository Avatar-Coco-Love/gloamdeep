// § lamps (D-702): the lantern's shapes, a fifth tab on the look card, bought with Glints as patterns are
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LAMPS, LAMP_IDS, DEFAULT_LAMP, lampOf, isLocked, rollLook, spentOn, LOOK_PADS, LOOK_SHOWN, lookScrollTo } from '../src/core/looks.js';
import { LAMPS as REGISTERED } from '../src/core/registry.js';
import { HERO, dressed } from '../src/render/pictures.js';
import { boxesAt, lookCardAt, barAt } from '../src/render/cloak.js';
import { rng } from '../src/core/rng.js';

test('four lamps, the study\'s lantern first; it and Carriage free (D-715); Dish and Pierced locked at 3 Glints; the registry has them', () => {
  assert.deepEqual(LAMP_IDS, ['lantern', 'carriage', 'dish', 'pierced']);
  assert.equal(DEFAULT_LAMP, 'lantern');
  assert.ok(!LAMPS.lantern.locked && !LAMPS.carriage.locked);
  for (const id of ['dish', 'pierced']) assert.ok(LAMPS[id].locked && LAMPS[id].price === 3, id);
  assert.equal(REGISTERED, LAMPS);
});

test('a profile from before D-702, or with a lamp it hasn\'t bought, carries the lantern', () => {
  assert.equal(lampOf({ look: { cloak: 'rust' } }), 'lantern');
  assert.equal(lampOf(undefined), 'lantern');
  assert.equal(lampOf({ look: { lamp: 'dish' }, bought: [] }), 'lantern');
  assert.equal(lampOf({ look: { lamp: 'dish' }, bought: ['dish'] }), 'dish');
  assert.ok(isLocked('lamp', 'pierced', ['dish']) && !isLocked('lamp', 'dish', ['dish']));
});

test('a bought lamp costs its Glints and can be rolled; one not bought never is', () => {
  assert.equal(spentOn(['cow', 'dish']), 6);
  const r = rng(5), lamps = new Set(Array.from({ length: 300 }, () => rollLook(r, ['dish']).lamp));
  assert.deepEqual([...lamps].sort(), ['carriage', 'dish', 'lantern']);
});

test('each lamp is drawn in place of the lantern: the lantern\'s own pixels kept, the others their own, the flame in each', () => {
  assert.equal(dressed('cloak', 'lantern').extra, HERO.extra);
  for (const id of ['carriage', 'dish', 'pierced']) {
    const extra = dressed('belted', id).extra;
    assert.notDeepEqual(extra, HERO.extra, id);
    assert.ok(extra.every(([x, y]) => x >= 11 && x <= 15 && y >= 6 && y <= 11), `${id}: inside the lantern's corner`);
    assert.ok(extra.some(([, , ch]) => ch === 'y') && extra.some(([, , ch]) => ch === 'T'), `${id}: a flame and the trim's cap`);
  }
});

test('five tabs in one row on a wide view; two rows and a window of 3 on the smallest (D-702)', () => {
  const wide = boxesAt(844, 390);
  assert.equal(new Set(wide.tabs.map((t) => t.y)).size, 1);
  assert.equal(wide.shown, LOOK_SHOWN);
  const small = boxesAt(176, 221);
  assert.equal(new Set(small.tabs.map((t) => t.y)).size, 2);
  assert.equal(small.shown, 3);
  assert.ok(small.y + 3 * small.bh + 4 < small.row.ok.y, 'the boxes clear of the buttons');
  assert.ok(barAt(small, 0, 4), 'the cloak\'s four rows scroll there, with the bar');
  const moth = LOOK_PADS.cloak.findIndex((k) => k.id === 'moth');
  assert.equal(lookScrollTo('cloak', 0, moth, small.shown), 1); // the flame on the fourth row scrolls one
  const third = (scroll) => LOOK_PADS.cloak[lookCardAt(small.x + 2, small.y + 2 * (small.bh + 2) + 2, 176, 221, 'cloak', scroll)?.key]?.id;
  assert.equal(third(0), 'zebra'); // the window's foot: the third row
  assert.equal(third(1), 'tiger'); // scrolled a row: the fourth
});
