// § Leap's find (D-971, D-992): the Lampeater's sure find, lying where it fell; stepped on, used up,
// Leap learnt and its card opened; closed, the arena's door sinks open. Never in the bag.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { newJourney } from '../src/core/state.js';
import { bench, arenaPlace } from '../src/core/bossbench.js';
import { step } from '../src/core/turn.js';
import { fall } from '../src/core/fall.js';
import { LAMPEATER_AT } from '../src/core/arena.js';
import { doorAfterLeap } from '../src/core/beaten.js';
import { ABILITY, ABILITY_BUTTON, abilityWords } from '../src/core/opening.js';
import { abilityCard } from '../src/input/cards/opening.js';

const K = get('sealedDoor').letter;
const sealed = (s) => s.room.map.some((row) => row.includes(K));
const beaten = (seed = 1) => {
  const s = bench(newJourney(seed), 'middling'), boss = s.enemies.find((e) => e.id === 'lampeater');
  return step({ ...s, hero: { x: LAMPEATER_AT.x, y: LAMPEATER_AT.y + 1 }, enemies: [{ ...boss, health: 1, met: true }] }, 'up');
};

test('Leap\'s find: a find learnt, never bagged, drawn as the Leap icon', () => {
  const e = get('leapFind');
  assert.deepEqual([e.kind, e.name, e.learns, !!e.bag], ['item', 'Leap', 'leap', false]);
  assert.equal(get('lampeater').sure, 'leapFind');
});

test('the Lampeater always leaves it where it fell, whatever the seed, and says so', () => {
  for (const seed of [1, 2, 3, 4, 5]) {
    const s = beaten(seed);
    assert.ok(s.items.some((it) => it.id === 'leapFind' && it.x === LAMPEATER_AT.x && it.y === LAMPEATER_AT.y), `seed ${seed}`);
    assert.ok(sealed(s));
  }
  assert.ok(['lampeaterDie', 'levelUp'].includes(beaten().line.id));
});

test('stepped on, it is used up: Leap learnt, a learn event, nothing in the bag, the door still sealed', () => {
  const s = beaten(), took = step(s, 'up');
  assert.equal(took.leap, true);
  assert.ok(!took.items.some((it) => it.id === 'leapFind'));
  assert.ok(took.events.some((e) => e.type === 'learn' && e.id === 'leap'));
  assert.deepEqual(took.bag, s.bag);
  assert.equal(took.line.id, 'leapFound');
  assert.ok(sealed(took));
});

test('the card closed, the door sinks open with the vault\'s line; again, nothing more', () => {
  const opened = doorAfterLeap(step(beaten(), 'up'));
  assert.ok(!sealed(opened));
  assert.equal(opened.line.id, 'vaultOpens');
  assert.equal(doorAfterLeap(opened), opened);
  assert.ok(sealed(doorAfterLeap(beaten()))); // not before Leap is learnt
});

test('a journey saved under the card: its next step sinks the door open first', () => {
  const took = step(beaten(), 'up'), next = step(took, 'left');
  assert.ok(!sealed(next));
});

test('fallen before taking it, it still lies there and the way in opens, to come back for it', () => {
  const start = bench(newJourney(2), 'middling'), gap = { x: start.hero.x, y: start.room.rows - 1 };
  const inside = step({ ...start, hero: gap }, 'up'); // a step in: the way in seals behind
  assert.equal(inside.room.map[gap.y][gap.x], K);
  const boss = inside.enemies.find((e) => e.id === 'lampeater');
  const s = step({ ...inside, hero: { x: LAMPEATER_AT.x, y: LAMPEATER_AT.y + 1 }, enemies: [{ ...boss, health: 1, met: true }] }, 'up');
  const kept = fall({ ...s, health: 0 }).elsewhere[arenaPlace(2)];
  assert.ok(kept.items.some((it) => it.id === 'leapFind'));
  assert.equal(kept.room.map[gap.y][gap.x], get('floor').letter);
});

test('the card: its heading, name and use, OK going back to play and sinking the door', () => {
  assert.deepEqual([ABILITY.heading, ABILITY.name, ABILITY_BUTTON], ['A new ability', 'Leap', 'OK']);
  assert.ok(abilityWords().includes(ABILITY.use));
  for (const how of ['pick', 'close']) {
    const shown = [], learnt = [];
    abilityCard({}, { learnt: () => learnt.push(1) }, (sc) => shown.push(sc))[how]();
    assert.deepEqual([shown, learnt.length], [['play'], 1]);
  }
});
