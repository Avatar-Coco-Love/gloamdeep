// § endless oil: a dev switch on the state; no oil burns or is drunk (D-626)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, wait, FIRST_START } from '../src/core/turn.js';
import { journeyText, readJourney } from '../src/core/save.js';

const room = makeRoom(FIRST_ROOM);
// The first room, the hero at 5,11 and the creatures given; `oil` the lantern's
const at = (enemies, oil, endless) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies, oil, endless });

test('a new game starts with Endless oil off', () => {
  assert.ok(!makeState(room).endless);
});

test('with Endless oil on, lit turns burn nothing and the oil stays where it was', () => {
  let s = at([], 0.3, true);
  for (let i = 0; i < 100; i++) s = wait(s);
  assert.equal(s.oil, 0.3);
  assert.ok(s.lit);
});

test('an oil tick still drinks, with its line and event, but takes no oil', () => {
  const n = wait(at([{ id: 'oilTick', x: 5, y: 10 }], 0.5, true));
  assert.equal(n.oil, 0.5);
  assert.equal(n.line.id, 'oilTickDrinks');
  assert.deepEqual(n.events.filter((e) => e.type === 'drink'), [{ type: 'drink', id: 'oilTick', oil: 0.05 }]);
});

test('switched off, the oil burns again', () => {
  assert.ok(wait(at([], 0.5, false)).oil < 0.5);
});

test('Endless oil is kept in the save', () => {
  assert.equal(readJourney(journeyText(at([], 1, true))).state.endless, true);
});
