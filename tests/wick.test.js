// § wick: the Copper Wick, the first lantern part, made at the workbench and fitted from the bag (D-483)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, wait } from '../src/core/turn.js';
import { benchMakes } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { fit, fitted, burnOf } from '../src/core/parts.js';
import { OIL } from '../src/core/oil.js';

const start = (bag) => ({ ...makeState(makeRoom(FIRST_ROOM)), bag });

test('the Copper Wick is the bench\'s third slot: 3 Copper Ore and 1 Wood, dim with too few', () => {
  assert.equal(get('copperWick').name, 'Copper Wick');
  const [, , wick] = benchMakes([{ id: 'copperOre', n: 3 }, { id: 'wood', n: 1 }]);
  assert.deepEqual(wick, { item: 'copperWick', cost: [{ id: 'copperOre', n: 3, have: 3 }, { id: 'wood', n: 1, have: 1 }], dim: false });
  assert.equal(benchMakes([{ id: 'copperOre', n: 2 }, { id: 'wood', n: 1 }])[2].dim, true);
});

test('Make takes its cost for a wick, a turn; too few, one carried or one fitted is free', () => {
  const s = start([{ id: 'copperOre', n: 4 }, { id: 'wood', n: 1 }]);
  const made = makeAt(s, 'copperWick');
  assert.deepEqual(made.bag, [{ id: 'copperOre', n: 1 }, { id: 'copperWick', n: 1 }]);
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'You make a copper wick.');
  assert.equal(shownLine(makeAt(start([{ id: 'copperOre', n: 3 }]), 'copperWick')).text, 'You need 3 Copper Ore and 1 Wood.');
  const more = [{ id: 'copperOre', n: 3 }, { id: 'wood', n: 1 }];
  const carried = makeAt({ ...made, bag: [...made.bag, ...more] }, 'copperWick');
  assert.equal(shownLine(carried).text, 'You already have a copper wick.');
  const inLantern = makeAt({ ...s, bag: more, parts: { wick: 'copperWick' } }, 'copperWick');
  assert.equal(inLantern.turn, s.turn);
  assert.equal(shownLine(inLantern).text, 'You already have a copper wick.');
});

test('Fit puts the wick in the lantern from the bag, free, with its line', () => {
  const s = start([{ id: 'stone', n: 2 }, { id: 'copperWick', n: 1 }]);
  assert.deepEqual(fitted(s), {});
  const n = fit(s, 1);
  assert.deepEqual(n.parts, { wick: 'copperWick' });
  assert.deepEqual(n.bag, [{ id: 'stone', n: 2 }]);
  assert.equal(n.turn, s.turn);
  assert.equal(shownLine(n).text, 'You fit the copper wick.');
  assert.equal(fit(s, 0), s, 'stone is no part');
});

test('fitted, a full tank lasts 75 turns, not 60; oil alone still sets the reach (D-014)', () => {
  const s = start([]);
  assert.equal(burnOf(s), OIL.burn);
  const lasts = (state) => { let t = 0; for (let x = { ...state, oil: 1 }; x.oil > 0; x = wait(x)) t++; return t; };
  assert.equal(lasts(s), 60);
  const w = { ...s, parts: { wick: 'copperWick' } };
  assert.equal(burnOf(w), 1 / 75);
  assert.equal(lasts(w), 75);
});
