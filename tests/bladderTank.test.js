// § bladder tank: the lantern's first tank, the Oil Bladder's first use, made at the workbench's
// GEAR tab and fitted from the bag (D-1005)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, wait, pour } from '../src/core/turn.js';
import { benchMakes, benchTabOf } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { fit, tankOf, burnOf } from '../src/core/parts.js';
import { reach, setOil, OIL } from '../src/core/oil.js';
import { pourByItself } from '../src/core/bagturn.js';
import { refills, itemNumbers } from '../src/core/numbers.js';
import { segsOf, panelW, panelWidest } from '../src/render/panelsize.js';

const start = (bag) => ({ ...makeState(makeRoom(FIRST_ROOM)), bag });
const tanked = (oil, bag = []) => ({ ...start(bag), parts: { tank: 'bladderTank' }, oil });

test('the Bladder Tank is the GEAR tab\'s slot before the Homestone (D-1015): 2 Oil Bladder and 2 Copper Ore, dim with too few', () => {
  assert.equal(get('bladderTank').name, 'Bladder Tank');
  const gear = (bag) => benchMakes(bag, 6, [], benchTabOf('gear').makes).at(-2);
  assert.deepEqual(gear([{ id: 'oilBladder', n: 2 }, { id: 'copperOre', n: 2 }]), { item: 'bladderTank', cost: [{ id: 'oilBladder', n: 2, have: 2 }, { id: 'copperOre', n: 2, have: 2 }], dim: false });
  assert.equal(gear([{ id: 'oilBladder', n: 1 }, { id: 'copperOre', n: 2 }]).dim, true);
});

test('Make takes its cost, a turn; too few, or one carried or fitted, is free with its line', () => {
  const s = start([{ id: 'oilBladder', n: 3 }, { id: 'copperOre', n: 2 }]);
  const made = makeAt(s, 'bladderTank');
  assert.deepEqual(made.bag, [{ id: 'oilBladder', n: 1 }, { id: 'bladderTank', n: 1 }]);
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'You make a bladder tank.');
  assert.equal(shownLine(makeAt(start([{ id: 'oilBladder', n: 1 }]), 'bladderTank')).text, 'Need 2 Oil Bladder, 2 Copper Ore.');
  const more = [{ id: 'oilBladder', n: 2 }, { id: 'copperOre', n: 2 }];
  const inLantern = makeAt({ ...s, bag: more, parts: { tank: 'bladderTank' } }, 'bladderTank');
  assert.equal(inLantern.turn, s.turn);
  assert.equal(shownLine(inLantern).text, 'You already have a bladder tank.');
});

test('Fit puts it in the lantern\'s tank slot beside the wick, free; a turn burns the same', () => {
  const s = { ...start([{ id: 'bladderTank', n: 1 }]), parts: { wick: 'copperWick' } };
  const n = fit(s, 0);
  assert.deepEqual(n.parts, { wick: 'copperWick', tank: 'bladderTank' });
  assert.deepEqual(n.bag, []);
  assert.equal(n.turn, s.turn);
  assert.equal(shownLine(n).text, 'You fit the bladder tank.');
  assert.equal(burnOf(n), burnOf(s), 'a tank holds more; it burns no slower');
  assert.equal(tankOf(s), 1);
  assert.equal(tankOf(n), 1.25);
});

test('a full bladder tank lasts 75 turns, not 60; the light reaches no further past a plain tank', () => {
  const lasts = (state) => { let t = 0; for (let x = state; x.oil > 0; x = wait(x)) t++; return t; };
  assert.equal(lasts({ ...start([]), oil: 1 }), 60);
  assert.equal(lasts(tanked(1.25)), 75);
  assert.equal(reach(1.25), reach(1), 'the reserve lights no further (D-1005)');
  assert.ok(reach(0.5) < reach(1));
});

test('pours and the dev setter fill to the bigger tank, never past it', () => {
  assert.equal(pour(tanked(1, [{ id: 'flask', n: 1 }]), 0).oil, 1.25);
  assert.equal(pour({ ...start([{ id: 'flask', n: 1 }]), oil: 1 }, 0).oil, 1, 'a plain lantern still stops at full');
  const before = tanked(0.8, [{ id: 'flask', n: 1 }]), after = wait(before);
  assert.ok(Math.abs(pourByItself(before, after).oil - (after.oil + 0.45)) < 1e-9, 'by itself, it pours once none would spill: sooner');
  const plain = { ...before, parts: {} }, plainAfter = wait(plain);
  assert.equal(pourByItself(plain, plainAfter).oil, plainAfter.oil, 'a plain lantern waits for 55%');
  assert.equal(setOil(tanked(0), Infinity, 1.25).oil, 1.25);
  assert.equal(setOil(start([]), Infinity).oil, 1);
});

test('the oil bar runs on to 13 segments, and the bag card shows it and its number', () => {
  assert.equal(segsOf(1), 10);
  assert.equal(segsOf(1.25), 13);
  assert.ok(panelW(1, 'LV 1', 'SURFACE', 13) >= panelW(1, 'LV 1', 'SURFACE'));
  assert.ok(panelWidest() >= panelW(5, 'LV 99', 'DEPTH 99', 13));
  const [oil] = refills(tanked(1, [{ id: 'flask', n: 1 }]), get('flask'));
  assert.equal(oil.max, 1.25);
  assert.ok(Math.abs(oil.after - 1.25) < 1e-9);
  assert.deepEqual(itemNumbers(get('bladderTank')), [{ icon: 'drop', label: 'Full lantern lasts', value: `${Math.round(1.25 / OIL.burn)} turns` }]);
});
