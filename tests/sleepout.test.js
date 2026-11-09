// § sleeping out: the moon button outside at night (D-758). Under the sky from dusk until
// morning, with nothing after the hero, they can sleep until morning: no oil burnt, but no
// healing and no gold heart, and the spot isn't remembered as a bed
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY, CAVE } from '../src/core/room.js';
import { makeState, sleepOut, canSleepOut } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const outside = (turn, more = {}) => ({ ...makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 }), turn, health: 2, oil: 0.5, line: null, ...more });

test('the button shows under the sky from dusk until morning, not by day or below ground', () => {
  assert.deepEqual([100, 169, 170, 250, 299, 300].map((t) => canSleepOut(outside(t))), [false, false, true, true, true, false]);
  const below = { ...makeState(makeRoom(WOODS, CAVE), { x: 2, y: 2 }), turn: 250 };
  assert.equal(canSleepOut(below), false);
});

test('not while a creature chases the hero, even in the dark', () => {
  const rat = { id: 'rat', x: 4, y: 3, health: 1, chasing: true };
  assert.equal(canSleepOut(outside(250, { enemies: [rat] })), false);
  const { chasing, ...still } = rat;
  assert.equal(canSleepOut(outside(250, { lit: true, enemies: [still] })), false, 'one in the light that notices the hero');
  assert.equal(canSleepOut(outside(250, { lit: false, enemies: [still] })), true, 'one in the dark that has not noticed');
});

test('Yes sleeps until morning: no oil burnt, no healing, no gold heart, no bed remembered', () => {
  const slept = sleepOut(outside(480));
  assert.equal(slept.turn, 600);
  assert.equal(slept.oil, 0.5);
  assert.equal(slept.health, 2);
  assert.equal(slept.bed, undefined);
  assert.equal(shownLine(slept).text, 'You wake on the cold ground.');
  assert.ok(slept.events.some((e) => e.type === 'sleep'));
});

test('by day it does nothing', () => {
  const s = outside(100);
  assert.equal(sleepOut(s), s);
});
