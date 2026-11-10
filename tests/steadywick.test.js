// § steady wick: Light's first upgrade, 1 ember, bought once; with it a lit turn burns 9/10 of
// its oil, for good, a full tank lasting about 66 turns, not 60, added to the rest (D-798)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { embers, canBuy, buy, buyAt, told, upgradeAt, movePick, START_PICK } from '../src/core/growth.js';
import { burnOf } from '../src/core/parts.js';
import { OIL } from '../src/core/oil.js';
import { UPGRADES, grown } from '../src/core/upgrades.js';

const STEADY = { col: 0, row: 0, slot: 0 };

test('Steady Wick is Light\'s first, left of the heart', () => {
  assert.equal(upgradeAt(STEADY), UPGRADES.steadyWick);
  assert.deepEqual(movePick(START_PICK, 'left'), STEADY);
});

test('Steady Wick costs 1 ember, is bought once, and its button goes', () => {
  const s = { xp: 10, health: 5 };
  assert.equal(told(s, STEADY).button.can, true);
  assert.equal(told({ xp: 0, health: 5 }, STEADY).button.can, false);
  const n = buyAt(s, STEADY);
  assert.equal(grown(n, 'steadyWick'), 1);
  assert.equal(embers(n), 0);
  assert.equal(canBuy({ ...n, xp: 60 }, 'steadyWick'), false);
  assert.equal(buy(n, 'steadyWick'), n);
  assert.equal(told(n, STEADY).button, null);
  assert.equal(told(n, STEADY).value, 'Bought');
  assert.equal(n.health, 5, 'no heart and no turn');
});

test('with Steady Wick a lit turn burns 9/10, a full tank lasting about 66 turns', () => {
  assert.equal(burnOf({}), OIL.burn);
  const b = burnOf({ grown: { steadyWick: 1 } });
  assert.ok(Math.abs(b - OIL.burn * 0.9) < 1e-12);
  assert.equal(Math.ceil(1 / b - 1e-9), 67);
  assert.equal(Math.floor(1 / b), 66);
});

test('it stacks with the copper wick', () => {
  const plain = burnOf({ parts: { wick: 'copperWick' } }), steady = burnOf({ parts: { wick: 'copperWick' }, grown: { steadyWick: 1 } });
  assert.ok(Math.abs(steady - plain * 0.9) < 1e-12);
});
