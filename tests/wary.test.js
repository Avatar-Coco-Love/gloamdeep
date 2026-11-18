// § wary: the Lampeater's step 5 (D-977): struck and free with none to call (no cold brazier, or 6
// out), it keeps just past the lantern's reach for 3 turns, lit or not, then comes on as ever
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { makeState, wait } from '../src/core/turn.js';
import { makeRoom } from '../src/core/room.js';
import { lanternReachOf, litAt } from '../src/core/sight.js';

// A hall with no brazier at all
const hall = makeRoom(Array.from({ length: 13 }, (_, y) => (y === 0 || y === 12 ? '#'.repeat(17) : `#${'.'.repeat(15)}#`)));
const at = (enemies, more = {}) => ({ ...makeState(hall, { x: 8, y: 6 }, [], []), enemies, lit: false, place: 'hall', oil: 1, god: true, ...more });
const eater = (e = {}) => ({ id: 'lampeater', x: 13, y: 6, chasing: true, struck: true, ...e });
const lamp = (s) => s.enemies.find((e) => e.id === 'lampeater');
const past = (s, e) => {
  const reach = lanternReachOf(s);
  return !reach(e.x, e.y) && [[0, -1], [1, 0], [0, 1], [-1, 0]].some(([dx, dy]) => reach(e.x + dx, e.y + dy));
};

test('struck, with no cold brazier, it turns wary for 3 turns and says so', () => {
  const s = wait(at([eater()]));
  assert.equal(lamp(s).wary, 2, '3, one spent as the turn ends');
  assert.equal(s.line.id, 'lampeaterWary');
  assert.equal(lamp(s).call, undefined);
});

test('wary with the lantern off, it keeps just past where its light would reach', () => {
  let s = at([eater()]);
  for (let i = 0; i < 3; i++) s = wait(s);
  assert.ok(past(s, lamp(s)) || lamp(s).wary === undefined);
  s = wait(at([eater()]));
  s = wait(s);
  assert.ok(past(s, lamp(s)), 'on the edge, not beside the hero');
  assert.equal(litAt({ ...s, lit: true }, lamp(s).x, lamp(s).y), false, 'lighting it would not catch it');
});

test('wary with the lantern lit, it waits at the edge and drinks', () => {
  let s = at([eater({ x: 15 })], { lit: true });
  for (let i = 0; i < 2; i++) s = wait(s);
  assert.ok(past(s, lamp(s)));
  assert.ok(lamp(s).drinking, 'drinks at the light\'s edge');
});

test('after 3 turns the struck mark clears and it comes on as ever', () => {
  let s = at([eater()]);
  for (let i = 0; i < 3; i++) s = wait(s);
  assert.equal(lamp(s).wary, undefined);
  assert.equal(lamp(s).struck, undefined);
  const before = lamp(s), next = lamp(wait(s));
  const near = (e) => Math.abs(e.x - 8) + Math.abs(e.y - 6);
  assert.ok(near(next) < near(before), 'it comes for the hero again');
});

test('not struck, it is never wary', () => {
  assert.equal(lamp(wait(at([eater({ struck: false })]))).wary, undefined);
});

test('its Bestiary words and line', () => {
  assert.match(get('lampeater').acts, /With none to call, it waits at your light's edge\.$/);
  assert.equal(get('lampeater').calls.wary, 3);
});
