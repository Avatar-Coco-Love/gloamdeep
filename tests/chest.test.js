// § chest: the stash chest's line on the workbench panel takes 3 Wood and 3 Stone
// from the bag and puts 1 stash chest in it, a turn; dim with too few, which says
// the cost, free; only 1 carried (CH1, D-324, D-326)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, makeAt } from '../src/core/turn.js';
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
