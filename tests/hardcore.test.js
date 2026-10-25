// § hardcore: one life; a fall starts the world over from the same seed (D-334, MO2, D-344)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld, wait, startOver, FIRST_START } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { eventsSince, has } from '../src/core/events.js';
import { ENDED_MENU, ENDED_HEADING } from '../src/core/menu.js';

// A Hardcore journey well under way, the hero about to fall to a rat's bite
function fallen(mode = 'hardcore') {
  const w = makeWorld('first', 4321, mode);
  const s = { ...w, hero: { x: 3, y: 10 }, health: 1, turn: 140, xp: 35, bag: [{ id: 'flask', n: 2 }], held: 'knife', found: ['first', 'second'], stashes: { 'woods:3,2': [{ id: 'wood', n: 3 }] }, enemies: [{ id: 'rat', x: 2, y: 10 }] };
  return { s, n: wait(s) };
}

test('a Hardcore fall begins the world again from the same seed, as on day one', () => {
  const { s, n } = fallen(), day1 = makeWorld('first', 4321, 'hardcore');
  assert.equal(n.seed, s.seed);
  assert.equal(n.mode, 'hardcore');
  assert.equal(n.place, 'first');
  assert.deepEqual(n.hero, FIRST_START);
  assert.equal(n.turn, 0, 'the time of day too');
  assert.equal(n.xp, 0, 'the level too');
  assert.deepEqual(n.bag, []);
  assert.equal(n.held, null);
  assert.deepEqual(n.found, ['first'], 'the map found too');
  assert.deepEqual(n.stashes, {});
  assert.deepEqual(n.enemies, day1.enemies);
  assert.deepEqual(n.items, day1.items);
  assert.equal(n.health, day1.health);
  assert.equal(n.oil, day1.oil);
});

test('it says "The world begins again." and is a fall, for the Records', () => {
  const { s, n } = fallen();
  assert.equal(shownLine(n).text, 'The world begins again.');
  assert.ok(has(eventsSince(s, n), 'fall'));
});

test('the fall is still shown where it happened (D-234)', () => {
  const { n } = fallen();
  assert.deepEqual(n.fell.hero, { x: 3, y: 10 });
  assert.equal(n.fell.health, 0);
});

test('Gentle and Normal falls keep the world (D-332); Normal leaves the bag (D-345)', () => {
  for (const mode of ['gentle', 'normal']) {
    const { s, n } = fallen(mode);
    assert.deepEqual(n.bag, mode === 'gentle' ? s.bag : []);
    assert.equal(n.xp, s.xp);
    assert.equal(shownLine(n).text, 'You fall, and wake again.');
  }
});

test('New world begins a Hardcore world from another seed', () => {
  const n = startOver(777);
  assert.equal(n.seed, 777);
  assert.equal(n.mode, 'hardcore');
  assert.equal(shownLine(n).text, 'The world begins again.');
});

test('the page after the fall: "Your journey ends.", Same world first', () => {
  assert.equal(ENDED_HEADING, 'Your journey ends.');
  assert.deepEqual(ENDED_MENU.map((l) => l.text), ['Same world', 'New world']);
});
