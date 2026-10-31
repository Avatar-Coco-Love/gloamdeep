// § herb: walking onto a healing herb heals 2 hearts; at full health it goes in the bag (D-155, D-511)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step, itemAt, HERO_HEALTH } from '../src/core/turn.js';
import { OIL } from '../src/core/oil.js';
import { spawn } from '../src/core/spawn.js';
import { shownLine } from '../src/core/lines.js';
import { generateRoom } from '../src/core/cave.js';
import { eat } from '../src/core/bagturn.js';
import { BAG_SLOTS } from '../src/core/bag.js';

const room = makeRoom(FIRST_ROOM);
// The hero starts at 5,11, so a herb on 5,10 is one step up.
const withHerb = (health) => spawn({ ...makeState(room), health }, 'herb', 5, 10);

test('stepping on a herb heals 2 hearts, says so, and the herb is gone', () => {
  const s = withHerb(2), n = step(s, 'up');
  assert.equal(n.health, 4);
  assert.equal(n.turn, 1);
  assert.equal(n.oil, OIL.start - OIL.burn, 'the step still burns oil');
  assert.deepEqual(n.items, []);
  assert.equal(shownLine(n).text, 'You eat the herb and feel better.');
  assert.equal(itemAt(s, 5, 10).id, 'herb', 'the old state is not changed');
});

test('a herb never heals above full', () => {
  const n = step(withHerb(HERO_HEALTH - 1), 'up');
  assert.equal(n.health, HERO_HEALTH);
  assert.deepEqual(n.items, []);
});

test('at full health a herb goes into the bag, silent, 5 a stack (D-511)', () => {
  const n = step(withHerb(HERO_HEALTH), 'up');
  assert.deepEqual(n.hero, { x: 5, y: 10 });
  assert.equal(n.health, HERO_HEALTH);
  assert.equal(itemAt(n, 5, 10), undefined);
  assert.deepEqual(n.bag.filter((b) => b.id === 'herb'), [{ id: 'herb', n: 1 }]);
  assert.equal(shownLine(n), null);
  const five = step({ ...withHerb(HERO_HEALTH), bag: [{ id: 'herb', n: 5 }] }, 'up');
  assert.deepEqual(five.bag.filter((b) => b.id === 'herb'), [{ id: 'herb', n: 5 }, { id: 'herb', n: 1 }]);
});

test('with no room in the bag a herb stays: "Your bag is full." (D-511)', () => {
  const bag = Array.from({ length: BAG_SLOTS }, () => ({ id: 'stone', n: 20 }));
  const n = step({ ...withHerb(HERO_HEALTH), bag }, 'up');
  assert.equal(itemAt(n, 5, 10).id, 'herb');
  assert.deepEqual(n.bag, bag);
  assert.equal(shownLine(n).text, 'Your bag is full.');
});

test('Eat on a herb in the bag heals 2 with its line; at full health "You aren\'t hurt." (D-511)', () => {
  const s = { ...makeState(room), health: 2, bag: [{ id: 'herb', n: 2 }] }, n = eat(s, 0);
  assert.equal(n.health, 4);
  assert.deepEqual(n.bag, [{ id: 'herb', n: 1 }]);
  assert.equal(shownLine(n).text, 'You eat the herb and feel better.');
  assert.equal(shownLine(eat({ ...s, health: HERO_HEALTH }, 0)).text, "You aren't hurt.");
});

test('a bite on the same turn replaces the herb line, after the heal', () => {
  const s = { ...withHerb(2), enemies: [{ id: 'rat', x: 4, y: 10 }] };
  const n = step(s, 'up');
  assert.equal(n.health, 3); // 2 + 2 - 1
  assert.equal(shownLine(n).text, 'The rat bites you.');
});

test('every generated depth has one herb, at least 3 tiles from the flask and the rat', () => {
  for (let seed = 1; seed <= 300; seed++) {
    const g = generateRoom(seed), herbs = g.items.filter((it) => it.id === 'herb');
    assert.equal(herbs.length, 1, `seed ${seed}`);
    const [h] = herbs, [f] = g.items, [r] = g.enemies;
    assert.ok(Math.abs(h.x - f.x) + Math.abs(h.y - f.y) >= 3, `seed ${seed}: flask`);
    assert.ok(Math.abs(h.x - r.x) + Math.abs(h.y - r.y) >= 3, `seed ${seed}: rat`);
    assert.equal(g.map[h.y][h.x], '.', `seed ${seed}: on plain floor`);
  }
});
