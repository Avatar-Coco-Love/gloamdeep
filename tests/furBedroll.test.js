// § fur bedroll: the Bunny Fur's first use (D-799, D-803): made on the bench's BUILD tab from
// 4 Bunny Fur and 1 Spider Silk; in the bag, sleeping out heals 2 hearts and leaves the hero not stiff
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY, CAVE } from '../src/core/room.js';
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

// § laid out and SLEEP (D-804): SET DOWN lays it beside the hero as the bedroll tile; bumped from
// dusk it asks to sleep, by day to roll it up; SLEEP in the bag asks the moon's way, or says why not
import { setDown, takeDown, panelBeside, step, campAsks, noSleepOut } from '../src/core/turn.js';
import { tileAt } from '../src/core/room.js';
import { bagAt, cardAt, secondText } from '../src/render/bag.js';
import { TAKE_ASKS } from '../src/core/menu.js';

const laid = (turn) => setDown(outside(ROLL, { turn }), 0, 'right');

test('SET DOWN lays it out beside the hero, a turn; by day a bump opens Roll up the bedroll?, Yes takes it back', () => {
  const s = laid(100);
  assert.equal(tileAt(s.room, 3, 2).id, 'bedroll');
  assert.deepEqual(s.bag, []);
  assert.equal(shownLine(s).text, 'You lay out the fur bedroll.');
  assert.deepEqual(panelBeside(s, 'right'), { x: 3, y: 2 });
  assert.equal(campAsks(s, 'right'), false);
  assert.equal(TAKE_ASKS.bedroll[0], 'Roll up the bedroll?');
  const back = takeDown(s, 3, 2);
  assert.deepEqual(back.bag, ROLL);
  assert.equal(tileAt(back.room, 3, 2).id, 'floor');
  assert.equal(shownLine(back).text, 'You roll up the fur bedroll.');
});

test('from dusk a bump asks to sleep; with a creature after the hero it says why, free', () => {
  const s = laid(250);
  assert.equal(panelBeside(s, 'right'), null);
  assert.equal(campAsks(s, 'right'), true);
  const rat = { id: 'rat', x: 1, y: 3, health: 1, chasing: true }, hunted = { ...s, enemies: [rat] };
  assert.equal(campAsks(hunted, 'right'), false);
  const told = step(hunted, 'right');
  assert.equal(shownLine(told).text, 'Not with a creature after you.');
  assert.equal(told.turn, hunted.turn);
});

test('sleeping beside the laid-out bedroll is warm: 2 hearts, not stiff; it is no bed for a fall', () => {
  const slept = sleepOut(laid(250));
  assert.equal(slept.health, 4);
  assert.equal(stiffLeft(slept), 0);
  assert.equal(shownLine(slept).text, 'You wake warm in your fur bedroll.');
  assert.equal(slept.bed, undefined);
});

test('SLEEP sits left of SET DOWN; it says why not: by day, below ground, a creature after the hero', () => {
  assert.equal(secondText(get('furBedroll')), 'SLEEP');
  const vw = 360, vh = 176, card = cardAt(vw, vh);
  assert.ok(card.rest.x + 32 <= card.set.x, 'clear of SET DOWN');
  assert.equal(bagAt(card.rest.x + 4, card.rest.y + 4, vw, vh, true, true, true, 6, false, false, true), 'make');
  assert.equal(bagAt(card.set.x + 4, card.set.y + 4, vw, vh, true, true, true, 6, false, false, true), 'act');
  assert.equal(noSleepOut(outside(ROLL, { turn: 100 })), 'notTired');
  assert.equal(noSleepOut(outside(ROLL)), null);
  assert.equal(noSleepOut({ ...makeState(makeRoom(WOODS, CAVE), { x: 2, y: 2 }), turn: 250 }), 'sleepUnder');
  assert.equal(noSleepOut(outside(ROLL, { enemies: [{ id: 'rat', x: 1, y: 3, health: 1, chasing: true }] })), 'sleepChased');
});
