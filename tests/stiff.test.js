// § stiff: waking on the cold ground leaves the hero stiff for 20 turns, and 1 hit in 3 misses (D-759)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY, FIRST_ROOM } from '../src/core/room.js';
import { makeState, sleepOut, step, wait, FIRST_START } from '../src/core/turn.js';
import { shownLine, LINES } from '../src/core/lines.js';
import { STIFF, stiffLeft, misses } from '../src/core/stiff.js';
import { fall } from '../src/core/fall.js';

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const outside = (turn) => ({ ...makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 }), turn, health: 2, oil: 0.5, line: null });
const room = makeRoom(FIRST_ROOM);
// The first room, the hero at 5,11, stiff, a rat beside them at 5,10, on turn t
const facing = (t, stiff = STIFF.turns) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies: [{ id: 'rat', x: 5, y: 10, health: 2 }], turn: t, stiff });

test('sleeping out wakes the hero stiff for 20 turns, with its line', () => {
  const s = sleepOut(outside(250));
  assert.equal(STIFF.turns, 20);
  assert.equal(stiffLeft(s), 20);
  assert.equal(shownLine(s).text, 'You wake on the cold ground, stiff.');
  for (const id of ['stiffMiss', 'stiffEnds', 'stiffHeld']) assert.ok(LINES[id], id);
});

test('each passed turn counts it down; as it wears off, its line', () => {
  let s = { ...outside(10), stiff: 2 };
  s = wait(s); assert.equal(stiffLeft(s), 1);
  s = wait(s); assert.equal(stiffLeft(s), 0);
  assert.equal(shownLine(s).text, 'The stiffness wears off.');
  assert.equal(stiffLeft(wait(s)), 0);
});

test('a fall ends it', () => {
  assert.equal(stiffLeft(fall({ ...facing(10), health: 0 })), 0);
});

test('while stiff, about 1 swing in 3 misses: the turn passes, nothing is hurt, its line', () => {
  const turns = Array.from({ length: 300 }, (_, t) => t), missed = turns.filter((t) => misses(facing(t)));
  assert.ok(missed.length > 70 && missed.length < 130, `${missed.length} of 300`);
  const s = facing(missed[0]), n = step(s, 'up');
  assert.equal(n.turn, s.turn + 1);
  assert.equal(n.enemies.find((e) => e.id === 'rat').health, 2);
  assert.ok(n.events.some((e) => e.type === 'miss'));
  assert.ok(!n.events.some((e) => e.type === 'hit'));
  assert.ok(['stiffMiss', 'ratBite'].includes(n.line.id), n.line.id); // the rat's bite after says its own line
  const hitTurn = turns.find((t) => !misses(facing(t))), h = step(facing(hitTurn), 'up');
  assert.ok(h.events.some((e) => e.type === 'hit'));
});

test('never misses when not stiff', () => {
  for (let t = 0; t < 300; t++) assert.equal(misses(facing(t, 0)), false);
});
