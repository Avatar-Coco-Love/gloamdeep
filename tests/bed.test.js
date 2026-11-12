// § bed: the first home piece, made at the workbench and set down on the surface; bumped at
// night it sleeps until morning, healing to full and leaving one gold heart; by day it asks
// to be taken down (D-488)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY, tileAt } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, setDown, step, takeDown, panelBeside, maxHealth } from '../src/core/turn.js';
import { benchMakes, benchTabOf } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { enemiesAct } from '../src/core/creatureturn.js';
import { tired } from '../src/core/sleep.js';

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const outside = (bag = [{ id: 'bed', n: 1 }]) => ({ ...makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 }), bag });
const inBed = (turn, health = 2) => ({ ...setDown(outside(), 0, 'right'), turn, health, oil: 0.5, line: null });

test('the bed is the BUILD tab\'s fourth slot (D-800, after the Mole Claw Pick, D-810): 4 Wood and 2 Rat Tail, dim with too few; Make takes it', () => {
  const bed = benchMakes([{ id: 'wood', n: 4 }, { id: 'ratTail', n: 2 }], 6, [], benchTabOf('build').makes)[3];
  assert.deepEqual(bed, { item: 'bed', cost: [{ id: 'wood', n: 4, have: 4 }, { id: 'ratTail', n: 2, have: 2 }], dim: false });
  assert.equal(benchMakes([{ id: 'wood', n: 4 }], 6, [], benchTabOf('build').makes)[3].dim, true);
  const made = makeAt(outside([{ id: 'wood', n: 5 }, { id: 'ratTail', n: 2 }]), 'bed');
  assert.deepEqual(made.bag, [{ id: 'wood', n: 1 }, { id: 'bed', n: 1 }]);
  assert.equal(shownLine(made).text, 'You make a bed.');
  assert.equal(shownLine(makeAt(outside([{ id: 'wood', n: 4 }]), 'bed')).text, 'You need 4 Wood, 2 Rat Tail.');
});

test('it is set down on the surface as the bed tile, solid, and taken down whole', () => {
  const set = setDown(outside(), 0, 'right');
  assert.equal(tileAt(set.room, 3, 2).id, 'bedstead');
  assert.equal(get('bedstead').solid, true);
  assert.equal(shownLine(set).text, 'You set down the bed.');
  const back = takeDown(set, 3, 2);
  assert.deepEqual(back.bag, [{ id: 'bed', n: 1 }]);
  assert.equal(tileAt(back.room, 3, 2).id, 'floor');
  assert.equal(shownLine(back).text, 'You take down the bed.');
});

test('the hero is tired from dusk until morning', () => {
  assert.deepEqual([0, 169, 170, 250, 299, 300, 470].map((turn) => tired({ turn })), [false, false, true, true, true, false, true]);
});

test('bumped at night, the hero sleeps until morning, healed and rested, no oil burnt', () => {
  const s = inBed(480);
  assert.equal(panelBeside(s, 'right'), null, 'no card at night');
  const slept = step(s, 'right');
  assert.equal(slept.turn, 600);
  assert.equal(slept.health, maxHealth(s) + 1);
  assert.equal(slept.oil, 0.5);
  assert.equal(shownLine(slept).text, 'You sleep and wake rested.');
  assert.ok(slept.events.some((e) => e.type === 'sleep'));
});

test('with a creature after the hero, the bed won\'t sleep, free, as outside; a shy one doesn\'t stop it (B-002, D-856)', () => {
  const chasedBy = (e) => ({ ...inBed(480), enemies: [e] });
  const bumped = step(chasedBy({ id: 'bat', x: 1, y: 3, health: 1, chasing: true }), 'right');
  assert.equal(bumped.turn, 480, 'no turn passes');
  assert.equal(bumped.health, 2);
  assert.equal(bumped.enemies.length, 1, 'the bat is still there');
  assert.equal(shownLine(bumped).text, 'Not with a creature after you.');
  assert.equal(step(chasedBy({ id: 'bunny', x: 1, y: 3, health: 1 }), 'right').turn, 600, 'a shy bunny near the bed');
});

test('by day the bump opens its card; stepped into it says so, free', () => {
  const s = inBed(100);
  assert.deepEqual(panelBeside(s, 'right'), { x: 3, y: 2 });
  assert.deepEqual(panelBeside(inBed(480), 'right', true), { x: 3, y: 2 }, 'a tap finds it at night too');
  const bumped = step(s, 'right');
  assert.equal(bumped.turn, 100);
  assert.equal(shownLine(bumped).text, "You aren't tired.");
});

test('the gold heart is lost first to a bite', () => {
  const rested = step(inBed(480), 'right'), max = maxHealth(rested);
  const bitten = enemiesAct({ ...rested, enemies: [{ id: 'rat', x: 2, y: 3, health: 2 }] });
  assert.equal(bitten.health, max);
});

test('sleeping counts as being away: what was due to grow back by morning is there on waking (H-07, D-876)', () => {
  const s = { ...inBed(480), taken: [{ id: 'oilcap', x: 3, y: 3, at: 480 - get('oilcap').regrow + 50 }] };
  const slept = step(s, 'right');
  assert.ok(slept.items.some((o) => o.id === 'oilcap' && o.x === 3 && o.y === 3));
  assert.deepEqual(slept.taken, []);
});
