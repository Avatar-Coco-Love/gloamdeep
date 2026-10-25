// § chest: the stash chest's line on the workbench panel takes 3 Wood and 3 Stone
// from the bag and puts 1 stash chest in it, a turn; dim with too few, which says
// the cost, free; only 1 carried (CH1, D-324, D-326)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, SKY, tileAt } from '../src/core/room.js';
import { makeState, makeAt, setDown, setSides, step, panelBeside } from '../src/core/turn.js';
import { benchMenu } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { get } from '../src/core/registry.js';
import { CHEST_SLOTS, CHEST_BAG, CHEST_CLOSE, chestWords, moveChest, moveStack, stashAt, withStashes } from '../src/core/chest.js';
import { chestAt } from '../src/render/chestpanel.js';

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

test('its line on the bench panel sits above Deconstruct, its cost on the right, dim with too few', () => {
  assert.deepEqual(benchMenu(PAID).map((l) => l.id), ['make', 'deconstruct', 'close']);
  assert.deepEqual({ ...benchMenu(PAID)[0] }, { id: 'make', item: 'chest', text: 'Stash chest', cost: '3 Wood · 3 Stone', dim: false });
  assert.equal(benchMenu([{ id: 'wood', n: 3 }])[0].dim, true);
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

// § panel (CH3, D-330): 12 slots in two rows of 6, a gold frame moved by the arrows, then Close
test('its panel has 12 slots, two rows of the bag\'s 6, the bag\'s 6, and Close after them', () => {
  assert.equal(CHEST_SLOTS, 12);
  assert.equal(CHEST_BAG, 12);
  assert.equal(CHEST_CLOSE, 18);
  assert.equal(chestWords([]), 'Stash chest. 12 slots, all empty. Bag below. Close.');
  assert.equal(chestWords([{ id: 'wood', n: 2 }]), 'Stash chest. 1 of 12 slots used. Bag below. Close.');
});

test('Left and Right move along a row and stop at its ends', () => {
  assert.equal(moveChest(0, 'right'), 1);
  assert.equal(moveChest(0, 'left'), 0);
  assert.equal(moveChest(5, 'right'), 5);
  assert.equal(moveChest(6, 'left'), 6);
  assert.equal(moveChest(11, 'left'), 10);
});

test('Down goes to the second row, the bag\'s row, then Close; Up comes back the same way (CH4, D-331)', () => {
  assert.equal(moveChest(2, 'down'), 8);
  assert.equal(moveChest(8, 'down'), 14);
  assert.equal(moveChest(14, 'down'), CHEST_CLOSE);
  assert.equal(moveChest(CHEST_CLOSE, 'down'), CHEST_CLOSE);
  assert.equal(moveChest(CHEST_CLOSE, 'left'), CHEST_CLOSE);
  assert.equal(moveChest(CHEST_CLOSE, 'up'), CHEST_BAG);
  assert.equal(moveChest(14, 'up'), 8);
  assert.equal(moveChest(8, 'up'), 2);
  assert.equal(moveChest(2, 'up'), 2);
  assert.equal(moveChest(17, 'right'), 17);
});

test('a tap picks a chest slot, a bag slot or Close; outside the box closes', () => {
  assert.deepEqual(chestAt(20, 70), { slot: 0 });
  assert.deepEqual(chestAt(45, 95), { slot: 7 });
  assert.deepEqual(chestAt(20, 140), { slot: CHEST_BAG });
  assert.equal(chestAt(88, 166), CHEST_CLOSE);
  assert.equal(chestAt(20, 120), null);
  assert.equal(chestAt(2, 2), 'out');
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

test('when it can\'t all go it says so, free, and nothing moves', () => {
  const full = atChest([{ id: 'wood', n: 2 }], [{ id: 'wood', n: 2 }]);
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
