// § bag: six slots, a stack in each; kept through a fall and in the save (D-247)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BAG_SLOTS, most, bagAdd, bagTake, bagPay, stackFull, withBag, firstFlask, flasksIn } from '../src/core/bag.js';
import { makeWorld } from '../src/core/turn.js';
import { packJourney, unpackJourney } from '../src/core/save.js';
import { byKind, get } from '../src/core/registry.js';

test('the bag has six slots', () => {
  assert.equal(BAG_SLOTS, 6);
});

test('an item joins its stack, else takes a new slot, else there is no room', () => {
  assert.deepEqual(bagAdd([], 'flask'), [{ id: 'flask', n: 1 }]);
  assert.deepEqual(bagAdd([{ id: 'flask', n: 1 }], 'flask'), [{ id: 'flask', n: 2 }]);
  assert.deepEqual(bagAdd([{ id: 'flask', n: 1 }], 'herb'), [{ id: 'flask', n: 1 }, { id: 'herb', n: 1 }]);
  const ids = ['wood', 'stone', 'oilcap', 'heartcap', 'potion', 'chest'], full = ids.map((id) => ({ id, n: 1 }));
  assert.equal(bagAdd(full, 'flask'), null);
  assert.deepEqual(bagAdd(full, 'stone')[1], { id: 'stone', n: 2 });
});

test('stacks hold 20 small finds, 5 flasks or potions, 1 workbench or stash chest (D-333)', () => {
  for (const id of ['wood', 'stone', 'oilcap', 'heartcap']) assert.equal(most(id), 20);
  for (const id of ['flask', 'potion']) assert.equal(most(id), 5);
  for (const id of ['workbench', 'chest']) assert.equal(most(id), 1);
});

test('a full stack goes on in the next free slot, topping up the first with room (D-333)', () => {
  assert.deepEqual(bagAdd([{ id: 'flask', n: 4 }], 'flask'), [{ id: 'flask', n: 5 }]);
  assert.deepEqual(bagAdd([{ id: 'flask', n: 5 }], 'flask'), [{ id: 'flask', n: 5 }, { id: 'flask', n: 1 }]);
  assert.deepEqual(bagAdd([{ id: 'flask', n: 5 }, { id: 'herb', n: 1 }, { id: 'flask', n: 2 }], 'flask')[2], { id: 'flask', n: 3 });
  const full = Array.from({ length: BAG_SLOTS }, () => ({ id: 'flask', n: 5 }));
  assert.equal(bagAdd(full, 'flask'), null);
  assert.equal(stackFull(full, 'flask'), true);
  assert.equal(stackFull([{ id: 'flask', n: 5 }, { id: 'flask', n: 2 }], 'flask'), false);
  assert.equal(stackFull([], 'flask'), false);
});

test('only 1 workbench or stash chest is carried, a free slot or not (D-320)', () => {
  assert.equal(bagAdd([{ id: 'workbench', n: 1 }], 'workbench'), null);
  assert.equal(bagAdd([{ id: 'chest', n: 1 }], 'chest'), null);
});

test('a cost is paid from a kind\'s last stacks first (D-333)', () => {
  const bag = [{ id: 'wood', n: 20 }, { id: 'stone', n: 3 }, { id: 'wood', n: 2 }];
  assert.deepEqual(bagPay(bag, { wood: 3, stone: 3 }), [{ id: 'wood', n: 19 }]);
});

test('taking one lowers the count; the last empties the slot and the rest move up', () => {
  const bag = [{ id: 'flask', n: 2 }, { id: 'herb', n: 1 }];
  assert.deepEqual(bagTake(bag, 0), [{ id: 'flask', n: 1 }, { id: 'herb', n: 1 }]);
  assert.deepEqual(bagTake(bagTake(bag, 0), 0), [{ id: 'herb', n: 1 }]);
  assert.equal(bagTake(bag, 4), bag);
});

test('the flask and the mushrooms go in the bag', () => {
  assert.deepEqual(byKind('item').filter((e) => e.bag).map((e) => e.id), ['flask', 'oilcap', 'heartcap', 'potion', 'stone', 'wood', 'workbench', 'chest']); // (D-296, D-303, D-309, O2, D-314, D-320, D-326)
});

test('the bag is kept in the save, and an older save gets an empty one', () => {
  const s = { ...makeWorld('first', 3), bag: [{ id: 'flask', n: 2 }] };
  assert.deepEqual(unpackJourney(packJourney(s)).state.bag, [{ id: 'flask', n: 2 }]);
  const { bag, ...old } = s;
  assert.deepEqual(unpackJourney({ format: 1, state: old }).state.bag, []); // saves before the bag were format 1 (D-266)
  assert.deepEqual(withBag(old).bag, []);
});

test('the card sits in the middle, and a tap picks a slot, Pour, the cross, or closes it (D-385)', async () => {
  const { CARD, cardAt, bagAt } = await import('../src/render/bag.js');
  const vw = 312, vh = 176, { x, y } = cardAt(vw, vh);
  assert.ok(x >= 8 && x + CARD.w <= vw - 8 && y >= 8 && y + CARD.h <= vh - 8);
  assert.equal(bagAt(4, 4, vw, vh), 'out');
  const row = y + 56 + 14;
  const slots = Array.from({ length: vw }, (_, px) => bagAt(px, row, vw, vh)).filter((a) => a && a.slot !== undefined).map((a) => a.slot);
  assert.deepEqual([...new Set(slots)], [0, 1, 2, 3, 4, 5]);
  assert.equal(bagAt(x + CARD.w - 14, y + 104, vw, vh), 'act');
  assert.equal(bagAt(x + CARD.w - 11, y + 10, vw, vh), 'close');
  assert.equal(bagAt(x + 20, y + 120, vw, vh), null);
});

test('the card shows the Look line last said, or the first (D-297)', async () => {
  const { lookLine } = await import('../src/render/bag.js');
  assert.equal(lookLine(get('oilcap')), 'Three make an oil flask.');
  assert.equal(lookLine(get('oilcap'), { oilcapLook: 2 }), 'It smells faintly of lamp oil.');
  assert.equal(lookLine(get('flask')), null);
});

test('every name, count, Look line and button fits the card', async () => {
  const { CARD } = await import('../src/render/bag.js');
  const { textWidth } = await import('../src/render/font.js');
  const { LINES } = await import('../src/core/lines.js');
  for (const id of ['flask', 'herb', 'oilcap', 'heartcap', 'potion', 'stone', 'wood', 'workbench', 'chest', 'knife']) {
    const e = get(id);
    const buttons = e.sets ? textWidth('SET DOWN') + 8 : (e.craft && e.eats ? 2 : e.oil || e.eats || e.craft ? 1 : 0) * (textWidth('DRINK') + 8 + 4);
    assert.ok(10 + textWidth(e.name) + 6 + textWidth('20 carried') + 4 + buttons <= CARD.w - 10, id);
    for (const t of (e.look && LINES[e.look].texts) || []) assert.ok(textWidth(t) <= CARD.w - 20, t);
  }
});

test('the quick slot finds the first flask and counts them all (D-384)', () => {
  const bag = [{ id: 'wood', n: 3 }, { id: 'flask', n: 5 }, { id: 'oilcap', n: 2 }, { id: 'flask', n: 2 }];
  assert.equal(firstFlask(bag), 1);
  assert.equal(flasksIn(bag), 7);
  assert.equal(firstFlask([{ id: 'wood', n: 1 }]), -1);
  assert.equal(flasksIn([]), 0);
});
