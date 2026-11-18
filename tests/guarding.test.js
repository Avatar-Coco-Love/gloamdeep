// § guarding: the Lampeater's step 4 (D-972, D-976): only while 6 of its gloamlings are alive, the 2
// nearest it hold its shoulders, leaving its way to the hero open
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeState, wait } from '../src/core/turn.js';
import { makeRoom } from '../src/core/room.js';
import { posts, guardLead } from '../src/core/guarding.js';

const rows = Array.from({ length: 13 }, (_, y) => (y === 0 || y === 12 ? '#'.repeat(15) : `#${'.'.repeat(13)}#`));
const hall = makeRoom(rows);
const at = (enemies, hero = { x: 7, y: 10 }) => ({ ...makeState(hall, hero, [], []), enemies, lit: false, oil: 100, god: true });
const eater = (e = {}) => ({ id: 'lampeater', x: 7, y: 3, chasing: true, ...e });
const ling = (x, y, e = {}) => ({ id: 'gloamling', x, y, met: true, chasing: true, ...e });
const far = [ling(1, 11), ling(2, 11), ling(12, 11), ling(13, 11)];
const lingAt = (s, x, y) => s.enemies.some((e) => e.id === 'gloamling' && e.x === x && e.y === y);
const lead = (s) => s.enemies.find((e) => e.id === 'lampeater');

test('its posts are its shoulders, across from the line to the hero', () => {
  const s = at([]);
  assert.deepEqual(posts(s, { x: 7, y: 3 }).posts, [{ x: 6, y: 3 }, { x: 8, y: 3 }]);
  assert.deepEqual(posts(s, { x: 7, y: 3 }).front, { x: 7, y: 4 });
  assert.deepEqual(posts({ ...s, hero: { x: 12, y: 5 } }, { x: 7, y: 5 }).posts, [{ x: 7, y: 4 }, { x: 7, y: 6 }]);
});

test('a shoulder in a wall gives its place to the side behind', () => {
  const s = at([], { x: 8, y: 5 });
  assert.deepEqual(posts(s, { x: 1, y: 5 }).posts, [{ x: 1, y: 4 }, { x: 1, y: 6 }]);
  assert.deepEqual(posts({ ...s, hero: { x: 1, y: 10 } }, { x: 1, y: 5 }).posts, [{ x: 1, y: 4 }, { x: 2, y: 5 }]);
});

test('with 6 alive, only the 2 nearest guard; with 5, none', () => {
  const six = at([eater(), ling(5, 3), ling(9, 3), ...far]);
  assert.ok(guardLead(six, six.enemies[1]) && guardLead(six, six.enemies[2]));
  assert.equal(guardLead(six, six.enemies[3]), undefined);
  const five = at([eater(), ling(5, 3), ling(9, 3), ...far.slice(1)]);
  assert.equal(guardLead(five, five.enemies[1]), undefined);
});

test('the guards follow it, a step behind as it walks, and hold its shoulders once it stops, never its way to the hero', () => {
  let s = at([eater({ x: 7, y: 2 }), ling(5, 2), ling(9, 2), ...far]);
  for (let i = 0; i < 9; i++) {
    s = wait(s);
    const l = lead(s);
    assert.ok(!lingAt(s, l.x, l.y + 1), 'its front stays open');
  }
  const l = lead(s);
  assert.ok(lingAt(s, l.x - 1, l.y) && lingAt(s, l.x + 1, l.y), 'both shoulders held');
});

test('a guard beside the hero bites, then goes back to its post, not chasing', () => {
  const s = wait(at([eater({ x: 7, y: 4 }), ling(6, 6), ling(9, 4), ...far], { x: 7, y: 6 }));
  assert.ok(s.events.some((e) => e.type === 'bite' && e.id === 'gloamling'));
  assert.deepEqual([lead(s).x, lead(s).y], [7, 5]);
  assert.ok(lingAt(s, 6, 5), 'back at its post beside it');
});

test('with 5 alive, the nearest comes for the hero as ever', () => {
  const s = wait(at([eater({ x: 7, y: 2 }), ling(6, 2), ...far.slice(1)]));
  assert.ok(lingAt(s, 6, 3), 'it came a tile toward the hero');
});
