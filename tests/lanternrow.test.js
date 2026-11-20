// § lantern row: the lantern's three part slots, Wick, Tank and Glass, shown on the bag's card
// after the gear row, sideways beside it, upright under it (1.02, D-1006)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState } from '../src/core/turn.js';
import { GEAR, LANTERN, KIT, lanternRow, kitRow, lanternWords, canTakeOff, lookGear } from '../src/core/gear.js';
import { shownLine } from '../src/core/lines.js';
import { bagAt, cardAt, bagShape, bagTop, gearSlotAt, slotAt, SMALL, PAD } from '../src/render/bag.js';

const fresh = () => makeState(makeRoom(FIRST_ROOM));
const fitted = () => ({ ...fresh(), parts: { wick: 'copperWick', tank: 'bladderTank' } });

test('the lantern row is Wick, Tank and Glass, after the five gear slots, all empty at the start', () => {
  assert.deepEqual(LANTERN.map((l) => l.name), ['Wick', 'Tank', 'Glass']);
  assert.equal(KIT.length, GEAR.length + 3);
  assert.deepEqual(lanternRow(fresh()), [null, null, null]);
  assert.equal(lanternWords(fresh()), 'Lantern: empty, empty, empty');
});

test('a fitted part shows in its slot; the glass stays empty, none made yet', () => {
  const s = fitted();
  assert.deepEqual(lanternRow(s), ['copperWick', 'bladderTank', null]);
  assert.deepEqual(kitRow(s).slice(GEAR.length), ['copperWick', 'bladderTank', null]);
  assert.equal(lanternWords(s), 'Lantern: Copper Wick, Bladder Tank, empty');
});

test('a lantern slot has nothing to take off (Fit swaps a part, D-483); choosing it says its Look line', () => {
  const s = fitted();
  for (let g = GEAR.length; g < KIT.length; g++) assert.equal(canTakeOff(s, g), false);
  assert.match(shownLine(lookGear(s, GEAR.length)).text, /wick/i);
  assert.equal(lookGear(s, KIT.length - 1), s); // the empty glass says nothing
});

test('sideways, the lantern row sits on the gear row\'s line, right of it, inside the card; a tap chooses it', () => {
  for (const [vw, vh] of [[320, 180], [340, 176], [422, 195]]) {
    const card = cardAt(vw, vh, bagShape().detail), last = gearSlotAt(card, GEAR.length - 1);
    for (let g = GEAR.length; g < KIT.length; g++) {
      const at = gearSlotAt(card, g, false);
      assert.equal(at.y, last.y);
      assert.ok(at.x > last.x + SMALL && at.x + SMALL <= card.x + card.w - PAD, `${vw}×${vh} slot ${g}`);
      assert.deepEqual(bagAt(at.x + 5, at.y + 5, vw, vh), { gear: g });
    }
    assert.equal(bagTop(vw, vh), bagTop(422, 195)); // the bag's slots stay where they were
  }
});

test('upright, the lantern row is under the gear row and the bag\'s slots a row lower; a tap chooses each', () => {
  const vw = 195, vh = 422, card = cardAt(vw, vh, bagShape().detail);
  for (let g = GEAR.length; g < KIT.length; g++) {
    const at = gearSlotAt(card, g, true), over = gearSlotAt(card, g - GEAR.length);
    assert.equal(at.x, over.x);
    assert.ok(at.y >= over.y + SMALL);
    assert.deepEqual(bagAt(at.x + 5, at.y + 5, vw, vh), { gear: g });
  }
  const top = bagTop(vw, vh), s = slotAt(card, 0, top);
  assert.ok(top > bagTop(422, 195));
  assert.ok(s.y > gearSlotAt(card, KIT.length - 1, true).y + SMALL);
  assert.deepEqual(bagAt(s.x + 5, s.y + 5, vw, vh), { slot: 0 });
});
