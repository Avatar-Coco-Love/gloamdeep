// § flank: the Lampeater's step 2 (D-972): while it comes for the hero, chasing and not caught,
// its gloamlings take the free tiles beside the hero away from it, leaving the side toward it open
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { makeState, wait } from '../src/core/turn.js';
import { makeRoom } from '../src/core/room.js';
import { openSide } from '../src/core/flank.js';

const rows = Array.from({ length: 13 }, (_, y) => (y === 0 || y === 12 ? '#'.repeat(15) : `#${'.'.repeat(13)}#`));
const hall = makeRoom(rows);
// The hero at 7,6 in the dark, the Lampeater 3 above, coming for them
const at = (enemies, more = {}) => ({ ...makeState(hall, { x: 7, y: 6 }, [], []), enemies, lit: false, oil: 100, god: true, ...more });
const eater = (e = {}) => ({ id: 'lampeater', x: 7, y: 3, chasing: true, ...e });
const ling = (x, y, e = {}) => ({ id: 'gloamling', x, y, met: true, chasing: true, ...e });
const lings = (s) => s.enemies.filter((e) => e.id === 'gloamling').map(({ x, y }) => [x, y]);

test('the Lampeater names its gloamlings as its flankers', () => {
  assert.equal(get('lampeater').flankers, 'gloamling');
});

test('the open side is the tile beside the hero nearest it, up first on a tie', () => {
  assert.deepEqual(openSide({ x: 7, y: 6 }, { x: 7, y: 3 }), { x: 7, y: 5 });
  assert.deepEqual(openSide({ x: 7, y: 6 }, { x: 10, y: 6 }), { x: 8, y: 6 });
  assert.deepEqual(openSide({ x: 7, y: 6 }, { x: 9, y: 4 }), { x: 7, y: 5 });
});

test('coming from above, a gloamling goes round to a side, never onto the open one', () => {
  let s = at([eater({ x: 7, y: 1 }), ling(7, 3)]);
  const seen = [];
  for (let i = 0; i < 4; i++) { s = wait(s); seen.push(...lings(s)); }
  assert.ok(!seen.some(([x, y]) => x === 7 && y === 5), 'never on the open side');
  const [[x, y]] = lings(s);
  assert.equal(Math.abs(x - 7) + Math.abs(y - 6), 1, 'beside the hero');
});

test('two spread to different sides, away from each other', () => {
  let s = at([eater({ x: 7, y: 1 }), ling(3, 6), ling(11, 6)]);
  for (let i = 0; i < 4; i++) s = wait(s);
  assert.deepEqual(lings(s).sort(), [[6, 6], [8, 6]]);
});

test('one on the open side bites, then steps off it', () => {
  const s = wait(at([eater({ x: 7, y: 2 }), ling(7, 5)]));
  assert.ok(s.events.some((e) => e.type === 'bite' && e.id === 'gloamling'));
  assert.notDeepEqual(lings(s)[0], [7, 5]);
});

test('one beside the hero on another side stays and bites', () => {
  const s = wait(at([eater(), ling(6, 6)]));
  assert.deepEqual(lings(s), [[6, 6]]);
});

test('with it caught, or not coming, they act as ever', () => {
  const ever = (lead) => lings(wait(at([lead, ling(7, 4)])));
  assert.deepEqual(ever(eater({ x: 2, y: 2, chasing: false })), [[7, 5]]);
  assert.deepEqual(ever(eater({ x: 2, y: 2, caught: true })), [[7, 5]]);
});

test('with no Lampeater, a gloamling comes straight on as ever', () => {
  assert.deepEqual(lings(wait(at([ling(7, 3)]))), [[7, 4]]);
});
