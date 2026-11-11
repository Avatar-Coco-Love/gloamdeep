// Quick Pour (D-816): Light's row 2 upgrade, a flask poured by hand takes no turn; and the
// line "Growth has a new row." the first time a row opens
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, pour } from '../src/core/turn.js';
import { setOil, OIL } from '../src/core/oil.js';
import { shownLine } from '../src/core/lines.js';
import { openRows } from '../src/core/growth.js';
import { UPGRADES } from '../src/core/upgrades.js';

const carrying = (bag, grown = {}) => ({ ...setOil(makeState(makeRoom(FIRST_ROOM)), 0.25), bag, grown });

test('Quick Pour is Light\'s row 2 upgrade, 1 ember, once (D-814, D-816)', () => {
  const u = UPGRADES.quickPour;
  assert.deepEqual([u.branch, u.row, u.slot, u.cost, u.most, u.look], ['light', 1, 0, 1, 1, 'flask']);
  assert.equal(u.words, 'Pouring a flask takes no turn.');
});

test('with Quick Pour a flask pours with no turn passed, and says so', () => {
  const s = carrying([{ id: 'flask', n: 2 }], { quickPour: 1 }), n = pour(s, 0);
  assert.equal(n.turn, s.turn, 'no turn');
  assert.equal(n.oil, 0.25 + 0.45, 'no oil burnt');
  assert.deepEqual(n.bag, [{ id: 'flask', n: 1 }]);
  assert.equal(shownLine(n).text, 'You pour a flask.');
  assert.deepEqual(n.events, [{ type: 'pour', id: 'flask', by: 'hand' }]);
});

test('without it, and for a minnow even with it, a pour passes a turn', () => {
  assert.equal(pour(carrying([{ id: 'flask', n: 1 }]), 0).turn, 1);
  const n = pour(carrying([{ id: 'pondMinnow', n: 1 }], { quickPour: 1 }), 0);
  assert.equal(n.turn, 1);
  assert.equal(n.oil, 0.25 - OIL.burn + 0.15);
});

test('"Growth has a new row." the first time row 2 opens, once (D-816)', () => {
  const s = { ...makeState(makeRoom(FIRST_ROOM)), place: 'depth9', elsewhere: {}, growthRows: 1 };
  const n = openRows(s);
  assert.equal(n.growthRows, 2);
  assert.equal(shownLine(n).text, 'Growth has a new row.');
  assert.equal(openRows(n), n, 'said once');
  const shallow = { ...s, place: 'depth8' };
  assert.equal(openRows(shallow), shallow);
});
