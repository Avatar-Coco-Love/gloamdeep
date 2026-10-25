// § next moves: every creature the hero can see shows what it does if the hero waits (D-349, D-357)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, FIRST_ENEMIES } from '../src/core/room.js';
import { makeState, wait, switchLantern, nextMoves, FIRST_START } from '../src/core/turn.js';

const room = makeRoom(FIRST_ROOM);
const start = () => makeState(room, FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES);
const with_ = (hero, enemies) => ({ ...start(), hero, enemies });
const shown = (s) => nextMoves(s).map(({ e, kind, dx, dy }) => [e.id, kind, dx, dy]);

test('a rat in the lantern light shows its step toward the hero, the one a wait makes', () => {
  const s = start(); // hero 5,11, rat 2,10
  assert.deepEqual(shown(s), [['rat', 'step', 1, 0]]);
  const n = wait(s);
  assert.deepEqual([n.enemies[0].x, n.enemies[0].y], [3, 10]);
});

test('next to the hero it shows a bite toward them', () => {
  assert.deepEqual(shown(with_({ x: 5, y: 11 }, [{ id: 'rat', x: 5, y: 10 }])), [['rat', 'bite', 0, 1]]);
});

test('a creature on an unlit tile shows nothing, though it moves (D-349)', () => {
  const s = { ...with_({ x: 5, y: 11 }, [{ id: 'lampmoth', x: 9, y: 1 }]), lights: [] }; // far off in the dark, no torch, and it comes
  assert.deepEqual(shown(s), []);
  assert.notDeepEqual(wait(s).enemies.map(({ x, y }) => [x, y]), [[9, 1]]);
});

test('one that stays shows nothing: a rat that has not noticed the hero', () => {
  const s = switchLantern(with_({ x: 9, y: 11 }, [{ id: 'rat', x: 4, y: 5 }])); // torchlit, a wall between (D-226)
  assert.deepEqual(shown(s), []);
});

test('a lampmoth in torchlight shows its step toward the torch with the lantern off', () => {
  const s = switchLantern({ ...with_({ x: 5, y: 11 }, [{ id: 'lampmoth', x: 4, y: 6 }]), lights: FIRST_LIGHTS.filter((l) => l.x === 4 && l.y === 4) });
  assert.deepEqual(shown(s), [['lampmoth', 'step', 0, -1]]);
});

test('showing the moves changes nothing', () => {
  const s = start(), before = JSON.stringify(s.enemies);
  nextMoves(s);
  assert.equal(JSON.stringify(s.enemies), before);
});
