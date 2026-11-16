// § the escape, its first step (D-963): beaten, the Lampeater's old seal stones round the stairs
// down fall away into a gap with the door's sinking, the stairs left alone; no step into the gap,
// but a leap from the open door over it lands on the stairs and takes them
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { newJourney } from '../src/core/state.js';
import { bench } from '../src/core/bossbench.js';
import { step, leap } from '../src/core/turn.js';
import { LAMPEATER_AT, ARENA_DOWN } from '../src/core/arena.js';
import { shownLine } from '../src/core/lines.js';

const count = (s, id) => s.room.map.reduce((n, row) => n + row.split(get(id).letter).length - 1, 0);
const beaten = (seed = 1) => {
  const s = bench(newJourney(seed), 'middling'), boss = s.enemies.find((e) => e.id === 'lampeater');
  return step({ ...s, hero: { x: LAMPEATER_AT.x, y: LAMPEATER_AT.y + 1 }, enemies: [{ ...boss, health: 1, met: true }] }, 'up');
};
const door = { x: ARENA_DOWN.x, y: ARENA_DOWN.y + 2 };

test('before the last blow the seal stones stand and there is no gap', () => {
  const s = bench(newJourney(1), 'middling');
  assert.deepEqual([count(s, 'sealStone'), count(s, 'gap')], [8, 0]);
});

test('beaten, the seal stones fall away into a gap round the stairs, said with the door', () => {
  const s = beaten();
  assert.deepEqual([count(s, 'sealStone'), count(s, 'gap'), count(s, 'stairsDown')], [0, 8, 1]);
  assert.equal(s.room.map[ARENA_DOWN.y][ARENA_DOWN.x], get('stairsDown').letter);
  assert.ok(['leapLearnt', 'levelLeap'].includes(s.line.id));
  if (s.line.id === 'leapLearnt') assert.equal(shownLine(s).text, 'The floor gives way. You learn Leap.');
});

test('the gap stops a step, free, with its line', () => {
  const s = { ...beaten(), hero: door }, next = step(s, 'up');
  assert.deepEqual(next.hero, door);
  assert.equal(next.turn, s.turn);
  assert.equal(next.line.id, 'gapBump');
});

test('from the open door a leap over the gap lands on the stairs and takes them', () => {
  const s = { ...beaten(), hero: door }, next = leap(s, 'up');
  assert.notEqual(next.place, s.place);
  assert.ok(next.events.some((e) => e.type === 'leap'));
});

test('light passes over the gap', () => {
  assert.equal(get('gap').blocksLight, false);
});
