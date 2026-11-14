// § follow: creatures through doorways (D-925). The first room's doorway is at 5,12, the south room's at 5,0.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld, step, wait } from '../src/core/turn.js';
import { dangerNow } from '../src/core/danger.js';
import { fall } from '../src/core/fall.js';

const rat = (x, y, more = {}) => ({ id: 'rat', x, y, chasing: true, health: 2, ...more });
const at = (enemies) => ({ ...makeWorld(), hero: { x: 5, y: 12 }, enemies });
const ratAt = (s, x, y) => s.enemies.find((e) => e.id === 'rat' && e.x === x && e.y === y);

test('a chasing rat 2 steps from the doorway comes in 2 turns after the hero, on the doorway, chasing', () => {
  const n = step(at([rat(5, 10)]), 'down');
  assert.equal(n.place, 'south');
  assert.deepEqual(n.elsewhere.first.enemies, []);
  const one = step(n, 'down');
  assert.equal(ratAt(one, 5, 0), undefined);
  const two = wait(one);
  assert.equal(ratAt(two, 5, 0)?.chasing, true);
  assert.deepEqual(two.coming, []);
});

test('one beside the doorway comes in the turn after, and does not act that turn', () => {
  const n = step(step(at([rat(5, 11)]), 'down'), 'down');
  assert.ok(ratAt(n, 5, 0));
  assert.equal(n.health, makeWorld().health);
});

test('with the hero on the doorway, it comes in on the nearest free tile', () => {
  const n = wait(step(at([rat(5, 11)]), 'down'));
  const r = n.enemies.find((e) => e.chasing && e.id === 'rat');
  assert.ok(r);
  assert.equal(Math.abs(r.x - 5) + Math.abs(r.y - 0), 1);
});

test('none follows from 4 steps, nor one not chasing, nor the warden, nor a bat', () => {
  const far = step(at([rat(5, 8)]), 'down');
  assert.equal(far.elsewhere.first.enemies.length, 1);
  const calm = step(at([rat(5, 11, { chasing: false })]), 'down');
  assert.equal(calm.elsewhere.first.enemies.length, 1);
  const warden = step(at([{ id: 'warden', x: 5, y: 11, chasing: true, health: 4 }]), 'down');
  assert.equal(warden.elsewhere.first.enemies.length, 1);
  const bat = step(at([{ id: 'bat', x: 5, y: 11, chasing: true, health: 2 }]), 'down');
  assert.equal(bat.elsewhere.first.enemies.length, 1);
});

test('the rim stays red while a follower is on its way', () => {
  const n = step(at([rat(5, 9)]), 'down');
  assert.equal(dangerNow({ ...n, enemies: [] }), 'chase');
});

test('leaving before it comes: it gives up, in one room or the other, not chasing', () => {
  const back = step(step(at([rat(5, 9)]), 'down'), 'up');
  assert.equal(back.place, 'first');
  assert.deepEqual(back.coming, []);
  const all = [...back.enemies, ...back.elsewhere.south.enemies].filter((e) => e.id === 'rat' && e.health === 2 && !e.chasing);
  assert.ok(all.length >= 1);
});

test('a fall gives up every follower on its way', () => {
  const n = fall(step(at([rat(5, 9)]), 'down'));
  assert.deepEqual(n.coming, []);
});
