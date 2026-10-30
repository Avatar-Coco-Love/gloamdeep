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
  assert.deepEqual(byKind('item').filter((e) => e.bag).map((e) => e.id), ['flask', 'oilcap', 'heartcap', 'potion', 'stone', 'ratTail', 'mothDust', 'stinger', 'mimicGlass', 'gloamWisp', 'venomSac', 'mimicHeart', 'gloamEye', 'wood', 'workbench', 'chest', 'bagTorch']); // (D-296, D-303, D-309, O2, D-474, D-475, D-476, D-314, D-320, D-326, D-478)
});

test('the bag is kept in the save, and an older save gets an empty one', () => {
  const s = { ...makeWorld('first', 3), bag: [{ id: 'flask', n: 2 }] };
  assert.deepEqual(unpackJourney(packJourney(s)).state.bag, [{ id: 'flask', n: 2 }]);
  const { bag, ...old } = s;
  assert.deepEqual(unpackJourney({ format: 1, state: old }).state.bag, []); // saves before the bag were format 1 (D-266)
  assert.deepEqual(withBag(old).bag, []);
});

test('the card fills the screen, and a tap picks a slot, Pour, the cross, or closes it (D-385)', async () => {
  const { cardAt, bagAt, EDGE_GAP } = await import('../src/render/bag.js');
  for (const vw of [234, 312, 380]) {
    const vh = 176, card = cardAt(vw, vh);
    assert.equal(card.x, EDGE_GAP); assert.equal(card.x + card.w, vw - EDGE_GAP); assert.equal(card.y + card.h, vh - EDGE_GAP);
    assert.equal(bagAt(2, 2, vw, vh), 'out');
    const picked = [];
    for (let y = 0; y < vh; y++) for (let x = 0; x < vw; x++) { const a = bagAt(x, y, vw, vh); if (a && a.slot !== undefined) picked.push(a.slot); }
    assert.deepEqual([...new Set(picked)].sort(), [0, 1, 2, 3, 4, 5]);
    assert.equal(bagAt(card.button.x + 4, card.button.y + 4, vw, vh), 'act');
    assert.ok(card.button.x > vw / 2 && card.button.y > vh / 2); // near the right thumb
    assert.equal(bagAt(card.close.x, card.close.y, vw, vh), 'close');
  }
});

test('the card shows the Look line last said, or the first (D-297)', async () => {
  const { lookLine } = await import('../src/render/bag.js');
  assert.equal(lookLine(get('oilcap')), 'Three make an oil flask.');
  assert.equal(lookLine(get('oilcap'), { oilcapLook: 2 }), 'It smells faintly of lamp oil.');
  assert.equal(lookLine(get('flask')), null);
});

test('every name, count, Look line and button fits the card, on a 4:3 screen too', async () => {
  const { cardAt, SPLIT_X, wrapWords } = await import('../src/render/bag.js');
  const { textWidth } = await import('../src/render/font.js');
  const { LINES } = await import('../src/core/lines.js');
  const card = cardAt(234, 176), dw = card.w - 12 - (SPLIT_X + 9);
  for (const id of ['flask', 'herb', 'oilcap', 'heartcap', 'potion', 'stone', 'wood', 'workbench', 'chest', 'knife']) {
    const e = get(id);
    assert.ok(textWidth(e.name) <= dw && textWidth('20 carried') <= dw, id);
    for (const t of (e.look && LINES[e.look].texts) || []) {
      const lines = wrapWords(t, dw);
      assert.ok(lines.every((l) => textWidth(l) <= dw) && 30 + 30 + lines.length * 12 < card.button.y - card.y, t);
    }
    assert.ok(card.make.x > card.x + SPLIT_X, id);
  }
});

test('the quick slot finds the first flask and counts them all (D-384)', () => {
  const bag = [{ id: 'wood', n: 3 }, { id: 'flask', n: 5 }, { id: 'oilcap', n: 2 }, { id: 'flask', n: 2 }];
  assert.equal(firstFlask(bag), 1);
  assert.equal(flasksIn(bag), 7);
  assert.equal(firstFlask([{ id: 'wood', n: 1 }]), -1);
  assert.equal(flasksIn([]), 0);
});
