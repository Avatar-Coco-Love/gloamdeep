// § heart charm: the Heart Charm, the second charm, made at the workbench and worn beside the
// Wisp Charm; worn, a full tank lasts about 70 turns, not 60 (D-487)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt } from '../src/core/turn.js';
import { benchMakes } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { wear, rareOf, SLOTS } from '../src/core/worn.js';
import { burnOf } from '../src/core/parts.js';
import { OIL } from '../src/core/oil.js';
import { UPGRADES } from '../src/core/save.js';

const room = makeRoom(FIRST_ROOM);
const start = (bag) => ({ ...makeState(room), bag });
const tank = (state) => Math.round(1 / burnOf(state));

test('the Heart Charm is the bench\'s sixth slot: 1 Mimic Heart and 1 Copper Ore, dim with too few', () => {
  assert.equal(get('heartCharm').name, 'Heart Charm');
  const charm = benchMakes([{ id: 'mimicHeart', n: 1 }, { id: 'copperOre', n: 1 }])[5];
  assert.deepEqual(charm, { item: 'heartCharm', cost: [{ id: 'mimicHeart', n: 1, have: 1 }, { id: 'copperOre', n: 1, have: 1 }], dim: false });
  assert.equal(benchMakes([{ id: 'copperOre', n: 1 }])[5].dim, true);
});

test('Make takes its cost for the heart charm, a turn; too few or one worn is free', () => {
  const s = start([{ id: 'mimicHeart', n: 2 }, { id: 'copperOre', n: 1 }]);
  const made = makeAt(s, 'heartCharm');
  assert.deepEqual(made.bag, [{ id: 'mimicHeart', n: 1 }, { id: 'heartCharm', n: 1 }]);
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'You make a heart charm.');
  assert.equal(shownLine(makeAt(start([{ id: 'copperOre', n: 1 }]), 'heartCharm')).text, 'You need 1 Mimic Heart, 1 Copper Ore.');
  const worn = makeAt({ ...s, worn: { charm: ['wispCharm', 'heartCharm'] } }, 'heartCharm');
  assert.equal(worn.turn, s.turn);
  assert.equal(shownLine(worn).text, 'You already have a heart charm.');
});

test('two charms are worn together, free; both work', () => {
  assert.equal(SLOTS.charm, 2);
  const s = { ...start([{ id: 'heartCharm', n: 1 }]), worn: { armour: ['ratVest'], charm: ['wispCharm'] } };
  const n = wear(s, 0);
  assert.deepEqual(n.worn, { armour: ['ratVest'], charm: ['wispCharm', 'heartCharm'] });
  assert.deepEqual(n.bag, []);
  assert.equal(n.turn, s.turn);
  assert.equal(shownLine(n).text, 'You put on the heart charm.');
  assert.equal(rareOf(n, 0.1), 0.2);
  assert.equal(tank(n), 70);
});

test('worn, a full tank lasts about 70 turns, not 60; about 87 with the Copper Wick', () => {
  const s = start([]);
  assert.equal(burnOf(s), OIL.burn);
  assert.equal(tank({ ...s, worn: { charm: ['heartCharm'] } }), 70);
  assert.equal(Math.floor(1 / burnOf({ ...s, parts: { wick: 'copperWick' }, worn: { charm: ['heartCharm'] } })), 87);
});

test('a full slot gives back the piece worn there longest', () => {
  const s = { ...start([{ id: 'ratVest', n: 1 }]), worn: { armour: ['otherVest'] } };
  const n = wear(s, 0);
  assert.deepEqual(n.worn.armour, ['ratVest']);
  assert.deepEqual(n.bag, [{ id: 'otherVest', n: 1 }]);
});

test('step 7 → 8 puts each worn piece in a list, kept as it was', () => {
  assert.deepEqual(UPGRADES[7]({ hero: 1, worn: { armour: 'ratVest', charm: 'wispCharm' } }).worn, { armour: ['ratVest'], charm: ['wispCharm'] });
  assert.deepEqual(UPGRADES[7]({ hero: 1 }), { hero: 1 });
});
