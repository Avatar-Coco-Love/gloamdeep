// § fur bedroll: the Bunny Fur's first use (D-799, D-803): made on the bench's BUILD tab from
// 4 Bunny Fur and 1 Spider Silk; in the bag, sleeping out heals 2 hearts and leaves the hero not stiff
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, sleepOut } from '../src/core/turn.js';
import { benchMakes, benchTabOf, SLEEP_OUT_ASK, SLEEP_OUT_ROLL_ASK } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { rolled } from '../src/core/sleepout.js';
import { stiffLeft } from '../src/core/stiff.js';
import { maxHealth } from '../src/core/state.js';

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const outside = (bag, more = {}) => ({ ...makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 }), turn: 480, health: 2, oil: 0.5, line: null, bag, ...more });
const ROLL = [{ id: 'furBedroll', n: 1 }];

test('the Fur Bedroll is the BUILD tab\'s last slot: 4 Bunny Fur and 1 Spider Silk; Make takes it, a turn', () => {
  const roll = get('furBedroll');
  assert.equal(roll.name, 'Fur Bedroll');
  assert.equal(roll.max, 1);
  const last = (bag) => benchMakes(bag, 6, [], benchTabOf('build').makes).at(-1);
  assert.deepEqual(last([{ id: 'bunnyFur', n: 4 }, { id: 'spiderSilk', n: 1 }]), { item: 'furBedroll', cost: [{ id: 'bunnyFur', n: 4, have: 4 }, { id: 'spiderSilk', n: 1, have: 1 }], dim: false });
  assert.equal(last([{ id: 'bunnyFur', n: 3 }, { id: 'spiderSilk', n: 1 }]).dim, true);
  const s = outside([{ id: 'bunnyFur', n: 5 }, { id: 'spiderSilk', n: 1 }], { turn: 10 }), made = makeAt(s, 'furBedroll');
  assert.deepEqual(made.bag, [{ id: 'bunnyFur', n: 1 }, { id: 'furBedroll', n: 1 }]);
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'You make a fur bedroll.');
  assert.equal(shownLine(makeAt(outside([{ id: 'bunnyFur', n: 3 }]), 'furBedroll')).text, 'You need 4 Bunny Fur, 1 Spider Silk.');
  assert.equal(shownLine(makeAt(outside([...ROLL, { id: 'bunnyFur', n: 4 }, { id: 'spiderSilk', n: 1 }]), 'furBedroll')).text, 'You already have a fur bedroll.');
});

test('sleeping out with it in the bag: 2 hearts back, not stiff, its own line, kept in the bag', () => {
  const slept = sleepOut(outside(ROLL));
  assert.equal(slept.turn, 600);
  assert.equal(slept.health, 4);
  assert.equal(stiffLeft(slept), 0);
  assert.equal(shownLine(slept).text, 'You wake warm in your fur bedroll.');
  assert.deepEqual(slept.bag, ROLL, 'never used up');
  const full = outside(ROLL, { health: maxHealth(outside(ROLL)) - 1 });
  assert.equal(sleepOut(full).health, maxHealth(full), 'never above full');
});

test('without it, the cold ground: no hearts, stiff; the moon\'s ask names it when carried', () => {
  const bare = sleepOut(outside([]));
  assert.equal(bare.health, 2);
  assert.ok(stiffLeft(bare) > 0);
  assert.equal(rolled(outside([])), null);
  assert.equal(rolled(outside(ROLL)).id, 'furBedroll');
  assert.equal(SLEEP_OUT_ASK[1], 'The ground is hard and cold.');
  assert.deepEqual(SLEEP_OUT_ROLL_ASK, ['Sleep here until morning?', 'Your fur bedroll is warm.']);
});
