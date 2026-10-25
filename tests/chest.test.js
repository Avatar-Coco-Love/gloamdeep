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
// solid, light passing over it, and bumping it does nothing yet (CH2, D-329)
const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const outside = () => ({ ...makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 }), bag: [{ id: 'chest', n: 1 }] });

test('it is set down on the side picked, from the bag, passing a turn', () => {
  const n = setDown(outside(), 0, 'right');
  assert.equal(tileAt(n.room, 3, 2).id, 'stash');
  assert.deepEqual(n.bag, []);
  assert.equal(n.turn, 1);
  assert.equal(shownLine(n).text, 'You set down the stash chest.');
});

test('set down, it blocks the way, light passes over it, and a bump does nothing, free', () => {
  const n = setDown(outside(), 0, 'right'), bump = step(n, 'right');
  assert.deepEqual(bump.hero, { x: 2, y: 2 });
  assert.equal(bump.turn, n.turn);
  assert.equal(panelBeside(n, 'right'), null);
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
