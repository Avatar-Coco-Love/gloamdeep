// § chest: the stash chest's line on the workbench panel takes 3 Wood and 3 Stone
// from the bag and puts 1 stash chest in it, a turn; dim with too few, which says
// the cost, free; only 1 carried (CH1, D-324, D-326)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, SKY, tileAt } from '../src/core/room.js';
import { makeState, makeAt, setDown, setSides, step, panelBeside, takeDown } from '../src/core/turn.js';
import { benchMakes, moveBench, BENCH_TAKE } from '../src/core/menu.js';
import { benchAt } from '../src/render/benchpanel.js';
import { cardAt, slotAt, HELD_Y } from '../src/render/bag.js';
import { shownLine } from '../src/core/lines.js';
import { get } from '../src/core/registry.js';
import { CHEST_SLOTS, CHEST_BAG, CHEST_TAKE, chestWords, moveChest, moveStack, stashAt, withStashes } from '../src/core/chest.js';
import { chestAt, SPLIT } from '../src/render/chestpanel.js';

const withBag = (bag) => ({ ...makeState(makeRoom(FIRST_ROOM)), bag });
const PAID = [{ id: 'wood', n: 3 }, { id: 'oilcap', n: 2 }, { id: 'stone', n: 3 }];

test('it takes 3 Wood and 3 Stone and puts a stash chest in the bag, a turn', () => {
  const n = makeAt(withBag(PAID), 'chest');
  assert.deepEqual(n.bag, [{ id: 'oilcap', n: 2 }, { id: 'chest', n: 1 }]);
  assert.equal(n.turn, 1);
  assert.equal(shownLine(n).text, 'You make a stash chest.');
});

test('with too few it says the cost, free, and the bag stays', () => {
  for (const bag of [[{ id: 'wood', n: 3 }, { id: 'stone', n: 2 }], [{ id: 'stone', n: 3 }], []]) {
    const s = withBag(bag), n = makeAt(s, 'chest');
    assert.equal(n.bag, s.bag);
    assert.equal(n.turn, 0);
    assert.equal(shownLine(n).text, 'You need 3 Wood and 3 Stone.');
  }
});

test('only 1 is carried: a second says so, free, and the Wood and Stone stay', () => {
  const s = withBag([...PAID, { id: 'chest', n: 1 }]), n = makeAt(s, 'chest');
  assert.equal(n.bag, s.bag);
  assert.equal(n.turn, 0);
  assert.equal(shownLine(n).text, 'You already carry a stash chest.');
});

test('its slot on the bench card has its cost with how many are carried, dim with too few (D-387)', () => {
  assert.deepEqual(benchMakes(PAID), [{ item: 'chest', cost: [{ id: 'wood', n: 3, have: 3 }, { id: 'stone', n: 3, have: 3 }], dim: false }]);
  assert.equal(benchMakes([{ id: 'wood', n: 3 }])[0].dim, true);
  assert.equal(benchMakes([{ id: 'wood', n: 3 }])[0].cost[1].have, 0);
});

test('the arrows move in the bench card\'s grid, Down from its bottom row to Deconstruct (D-387)', () => {
  assert.equal(moveBench(0, 'right'), 1);
  assert.equal(moveBench(0, 'down'), 3);
  assert.equal(moveBench(4, 'down'), BENCH_TAKE);
  assert.equal(moveBench(BENCH_TAKE, 'up'), 3);
  assert.equal(moveBench(BENCH_TAKE, 'left'), BENCH_TAKE);
  assert.equal(moveBench(0, 'up'), 0);
});

test('a tap on the bench card picks a slot, Make, Deconstruct or the cross; outside it closes (D-387)', () => {
  const vw = 360, vh = 176, card = cardAt(vw, vh), s = slotAt(card, 1, HELD_Y);
  assert.deepEqual(benchAt(s.x + 5, s.y + 5, vw, vh), { slot: 1 });
  assert.equal(benchAt(card.button.x + 2, card.button.y + 2, vw, vh), 'make');
  assert.equal(benchAt(card.x + 14, card.button.y + 2, vw, vh), 'take');
  assert.equal(benchAt(card.close.x, card.close.y, vw, vh), 'close');
  assert.equal(benchAt(2, 2, vw, vh), 'out');
});

test('in the bag it is one of a kind, with its lines in turn', () => {
  assert.equal(get('chest').max, 1);
  assert.ok(get('chest').bag);
  assert.equal(get('chest').look, 'chestLook');
});

// § set down: the stash chest goes down the bench's way, a turn, with its line;
// solid, light passing over it, and bumping it opens its panel (CH2, D-329; CH3, D-330)
const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const outside = () => ({ ...makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 }), bag: [{ id: 'chest', n: 1 }] });

test('it is set down on the side picked, from the bag, passing a turn', () => {
  const n = setDown(outside(), 0, 'right');
  assert.equal(tileAt(n.room, 3, 2).id, 'stash');
  assert.deepEqual(n.bag, []);
  assert.equal(n.turn, 1);
  assert.equal(shownLine(n).text, 'You set down the stash chest.');
});

test('set down, it blocks the way, light passes over it, and a bump opens its panel, free', () => {
  const n = setDown(outside(), 0, 'right'), bump = step(n, 'right');
  assert.deepEqual(bump.hero, { x: 2, y: 2 });
  assert.equal(bump.turn, n.turn);
  assert.deepEqual(panelBeside(n, 'right'), { x: 3, y: 2 });
  assert.equal(get('stash').panel, 'chest');
  assert.equal(get('bench').panel, 'bench');
  assert.ok(get('stash').solid && !get('stash').blocksLight);
});

test('it keeps the bench\'s rules: only on the surface, only where there is room', () => {
  const below = { ...makeState(makeRoom(FIRST_ROOM)), bag: [{ id: 'chest', n: 1 }] };
  assert.equal(shownLine(setDown(below, 0, 'right')).text, 'Only on the surface.');
  assert.deepEqual(setSides(outside(), 0), setSides({ ...outside(), bag: [{ id: 'workbench', n: 1 }] }, 0));
  assert.equal(shownLine(setDown({ ...outside(), hero: { x: 3, y: 1 } }, 0, 'right')).text, 'There is no room there.'); // a tree at 4,1
});

test('a set-down chest frees the bag, so another can be made', () => {
  const n = setDown({ ...outside(), bag: [{ id: 'chest', n: 1 }, ...PAID] }, 0, 'right');
  assert.deepEqual(makeAt(n, 'chest').bag.at(-1), { id: 'chest', n: 1 });
});

// § card (CH3, D-330; a card, D-387): 12 slots in a 4 × 3 grid, the bag's 3 × 2 beside them, Deconstruct
test('its card has 12 slots, the bag\'s 6, and Deconstruct after them', () => {
  assert.equal(CHEST_SLOTS, 12);
  assert.equal(CHEST_BAG, 12);
  assert.equal(CHEST_TAKE, 18);
  assert.equal(chestWords([]), 'Stash chest. 12 slots, all empty. Bag on the right. Deconstruct chest, or Close.');
  assert.equal(chestWords([{ id: 'wood', n: 2 }]), 'Stash chest. 1 of 12 slots used. Bag on the right. Deconstruct chest, or Close.');
});

test('Left and Right move along a row, Right from the chest\'s right column to the bag and Left back (D-387)', () => {
  assert.equal(moveChest(0, 'right'), 1);
  assert.equal(moveChest(0, 'left'), 0);
  assert.equal(moveChest(3, 'right'), CHEST_BAG);
  assert.equal(moveChest(7, 'right'), CHEST_BAG + 3);
  assert.equal(moveChest(11, 'right'), CHEST_BAG + 3);
  assert.equal(moveChest(CHEST_BAG, 'left'), 3);
  assert.equal(moveChest(CHEST_BAG + 3, 'left'), 7);
  assert.equal(moveChest(CHEST_BAG + 2, 'right'), CHEST_BAG + 2);
  assert.equal(moveChest(4, 'left'), 4);
});

test('Up and Down move in each grid, Down from a bottom row to Deconstruct, Up from it to the chest (D-387; CH5)', () => {
  assert.equal(moveChest(2, 'down'), 6);
  assert.equal(moveChest(6, 'down'), 10);
  assert.equal(moveChest(10, 'down'), CHEST_TAKE);
  assert.equal(moveChest(CHEST_BAG + 1, 'down'), CHEST_BAG + 4);
  assert.equal(moveChest(CHEST_BAG + 4, 'down'), CHEST_TAKE);
  assert.equal(moveChest(CHEST_BAG + 4, 'up'), CHEST_BAG + 1);
  assert.equal(moveChest(CHEST_BAG + 1, 'up'), CHEST_BAG + 1);
  assert.equal(moveChest(CHEST_TAKE, 'up'), 8);
  assert.equal(moveChest(CHEST_TAKE, 'down'), CHEST_TAKE);
  assert.equal(moveChest(CHEST_TAKE, 'left'), CHEST_TAKE);
  assert.equal(moveChest(2, 'up'), 2);
});

test('a tap on the chest card picks a chest slot, a bag slot, Deconstruct or the cross; outside it closes (D-387)', () => {
  const vw = 320, vh = 176, card = cardAt(vw, vh), s = slotAt(card, 5, 28, 4);
  assert.deepEqual(chestAt(s.x + 5, s.y + 5, vw, vh), { slot: 5 });
  const b = slotAt(card, 0, 40, 3, SPLIT + 13);
  assert.deepEqual(chestAt(b.x + 5, b.y + 5, vw, vh), { slot: CHEST_BAG });
  assert.deepEqual(chestAt(b.x + 40, b.y + 40, vw, vh), { slot: CHEST_BAG + 4 });
  assert.equal(chestAt(card.x + 14, card.button.y + 2, vw, vh), 'take');
  assert.equal(chestAt(card.close.x, card.close.y, vw, vh), 'close');
  assert.equal(chestAt(card.x + SPLIT, card.y + 60, vw, vh), null);
  assert.equal(chestAt(2, 2, vw, vh), 'out');
});

test('the chest card\'s slots stay above Deconstruct on a room 11 tiles tall (D-387)', () => {
  const card = cardAt(320, 176), last = slotAt(card, 11, 28, 4);
  assert.ok(last.y + 30 < card.button.y);
});

// § putting in and taking out (CH4, D-331): a whole stack moves to the other side, free
const atChest = (bag, stash = []) => ({ ...setDown({ ...outside(), bag: [{ id: 'chest', n: 1 }, ...bag] }, 0, 'right'), stashes: stash.length ? { 'first:3,2': stash } : {} });

test('picking a bag slot puts its whole stack in the chest, free, with no line', () => {
  const s = atChest([{ id: 'wood', n: 3 }, { id: 'stone', n: 2 }]), n = moveStack(s, 3, 2, CHEST_BAG);
  assert.deepEqual(n.bag, [{ id: 'stone', n: 2 }]);
  assert.deepEqual(stashAt(n, 3, 2), [{ id: 'wood', n: 3 }]);
  assert.equal(n.turn, s.turn);
  assert.equal(n.line, s.line);
});

test('picking a chest slot takes its stack out into the bag; the slots after it move up', () => {
  const s = atChest([], [{ id: 'wood', n: 3 }, { id: 'stone', n: 1 }]), n = moveStack(s, 3, 2, 0);
  assert.deepEqual(n.bag, [{ id: 'wood', n: 3 }]);
  assert.deepEqual(stashAt(n, 3, 2), [{ id: 'stone', n: 1 }]);
  assert.equal(n.turn, s.turn);
});

test('a stack joins one of its kind when it all fits there, its look going with it', () => {
  const s = atChest([{ id: 'wood', n: 1, form: 2 }], [{ id: 'wood', n: 2, form: 0 }]);
  assert.deepEqual(stashAt(moveStack(s, 3, 2, CHEST_BAG), 3, 2), [{ id: 'wood', n: 3, form: 2 }]);
  assert.deepEqual(moveStack(s, 3, 2, 0).bag, [{ id: 'wood', n: 3, form: 0 }]);
});

test('when none of it can go it says so, free, and nothing moves', () => {
  const full = atChest([{ id: 'workbench', n: 1 }], [{ id: 'workbench', n: 1 }]);
  for (const [i, text] of [[0, 'Your bag is full.'], [CHEST_BAG, 'The chest is full.']]) {
    const n = moveStack(full, 3, 2, i);
    assert.equal(n.bag, full.bag);
    assert.equal(n.stashes, full.stashes);
    assert.equal(n.turn, full.turn);
    assert.equal(shownLine(n).text, text);
  }
  const ids = ['wood', 'stone', 'oilcap', 'heartcap', 'flask', 'potion'];
  const bagFull = atChest(ids.map((id) => ({ id, n: 1 })), [{ id: 'workbench', n: 1 }]);
  assert.equal(shownLine(moveStack(bagFull, 3, 2, 0)).text, 'Your bag is full.');
  const chestFull = atChest([{ id: 'stone', n: 1 }], Array.from({ length: 12 }, (_, i) => ({ id: `x${i}`, n: 1 })));
  assert.equal(shownLine(moveStack(chestFull, 3, 2, CHEST_BAG)).text, 'The chest is full.');
});

test('an empty slot does nothing, and each chest keeps its own things', () => {
  const s = atChest([{ id: 'wood', n: 3 }]);
  assert.equal(moveStack(s, 3, 2, 5), s);
  assert.equal(moveStack(s, 3, 2, CHEST_BAG + 4), s);
  const n = moveStack(s, 3, 2, CHEST_BAG);
  assert.deepEqual(stashAt(n, 1, 2), []);
  assert.deepEqual(stashAt({ ...n, place: 'woods' }, 3, 2), []);
});

test('an older save keeps nothing in chests; one already kept is left as it is', () => {
  assert.deepEqual(withStashes({ bag: [] }).stashes, {});
  const kept = { stashes: { 'first:3,2': [{ id: 'wood', n: 1 }] } };
  assert.equal(withStashes(kept), kept);
});

test('a stack tops up its kind and takes free slots; what can\'t go stays, with the line (D-333)', () => {
  const five = Array.from({ length: 5 }, () => ({ id: 'stone', n: 20 }));
  const s = atChest([{ id: 'wood', n: 15 }, ...five], [{ id: 'wood', n: 20 }]);
  const n = moveStack(s, 3, 2, 0);
  assert.deepEqual(n.bag, [{ id: 'wood', n: 20 }, ...five]);
  assert.deepEqual(stashAt(n, 3, 2), [{ id: 'wood', n: 15 }]);
  assert.equal(n.turn, s.turn);
  assert.equal(shownLine(n).text, 'Your bag is full.');
  const all = moveStack(atChest([{ id: 'wood', n: 15 }], [{ id: 'wood', n: 20 }]), 3, 2, 0);
  assert.deepEqual(all.bag, [{ id: 'wood', n: 20 }, { id: 'wood', n: 15 }]);
  assert.deepEqual(stashAt(all, 3, 2), []);
  assert.equal(shownLine(all).text, 'You set down the stash chest.'); // no line of its own
});

// § take down (CH5): Deconstruct chest puts an empty chest back in the bag, a turn,
// the bench's way; with anything inside it says so, free, and stays
test('an empty chest goes back into the bag whole, floor left, a turn, with its line', () => {
  const s = moveStack(moveStack(atChest([{ id: 'wood', n: 3 }]), 3, 2, CHEST_BAG), 3, 2, 0);
  const n = takeDown(s, 3, 2);
  assert.equal(tileAt(n.room, 3, 2).id, 'floor');
  assert.deepEqual(n.bag, [{ id: 'wood', n: 3 }, { id: 'chest', n: 1 }]);
  assert.equal(n.turn, s.turn + 1);
  assert.equal(shownLine(n).text, 'You take down the stash chest.');
  assert.ok(!('first:3,2' in n.stashes));
});

test('with anything inside it says "Empty the chest first.", free, and stays', () => {
  const s = atChest([], [{ id: 'stone', n: 1 }]), n = takeDown(s, 3, 2);
  assert.equal(tileAt(n.room, 3, 2).id, 'stash');
  assert.equal(n.bag, s.bag);
  assert.equal(n.turn, s.turn);
  assert.equal(shownLine(n).text, 'Empty the chest first.');
});

test('with a chest carried or the bag full it says so, free, and stays', () => {
  const s = atChest([]);
  const carried = takeDown({ ...s, bag: [{ id: 'chest', n: 1 }] }, 3, 2);
  assert.equal(tileAt(carried.room, 3, 2).id, 'stash');
  assert.equal(carried.turn, s.turn);
  assert.equal(shownLine(carried).text, 'You already carry a stash chest.');
  const six = ['wood', 'stone', 'oilcap', 'heartcap', 'workbench', 'flask'].map((id) => ({ id, n: 1 }));
  const full = takeDown({ ...s, bag: six }, 3, 2);
  assert.equal(tileAt(full.room, 3, 2).id, 'stash');
  assert.equal(full.turn, s.turn);
  assert.equal(shownLine(full).text, 'Your bag is full.');
});
