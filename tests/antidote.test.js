// § antidote: made in the bag from 1 Snapcap Gill and 1 herb; Drink ends poisoned, healing
// nothing, and only while poisoned; with it in, poison can take the last heart (D-655)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, craft, eat, wait, FIRST_START } from '../src/core/turn.js';
import { canCraft } from '../src/core/bag.js';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';
import { poisonLeft } from '../src/core/poison.js';

const room = makeRoom(FIRST_ROOM);
const carrying = (bag, more = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, bag, ...more });

test('the Antidote is a made find of 5 a stack, drunk, with its lines', () => {
  const e = get('antidote');
  assert.equal(e.name, 'Antidote'); assert.equal(e.kind, 'item'); assert.equal(e.max, 5);
  assert.equal(e.cures, true); assert.equal(e.verb, 'DRINK'); assert.equal(e.heal, undefined);
  for (const line of ['antidoteMake', 'antidoteFull', 'antidoteDrink', 'notPoisoned']) assert.ok(LINES[line], line);
});

test('1 Snapcap Gill and 1 herb make an Antidote, passing a turn, with its line', () => {
  const n = craft(carrying([{ id: 'snapcapGill', n: 2 }, { id: 'herb', n: 1 }]), 0);
  assert.deepEqual(n.bag, [{ id: 'snapcapGill', n: 1 }, { id: 'antidote', n: 1 }]);
  assert.equal(n.turn, 1);
  assert.equal(shownLine(n).text, 'You make an antidote.');
});

test('without a herb the gill makes nothing', () => {
  const bag = [{ id: 'snapcapGill', n: 3 }], s = carrying(bag);
  assert.equal(canCraft(bag, 0), false);
  assert.equal(craft(s, 0), s);
});

test('drunk while poisoned it ends poisoned, heals nothing, and passes a turn', () => {
  const s = carrying([{ id: 'antidote', n: 2 }], { health: 3, poisoned: 5 }), n = eat(s, 0);
  assert.equal(poisonLeft(n), 0);
  assert.equal(n.health, 3);
  assert.deepEqual(n.bag, [{ id: 'antidote', n: 1 }]);
  assert.equal(n.turn, s.turn + 1);
  assert.ok(LINES.antidoteDrink.texts.includes(shownLine(n).text));
});

test('not poisoned, it stays, with its line, free', () => {
  const s = carrying([{ id: 'antidote', n: 1 }], { health: 2 }), n = eat(s, 0);
  assert.deepEqual(n.bag, s.bag); assert.equal(n.turn, s.turn);
  assert.equal(shownLine(n).text, "You aren't poisoned.");
});

test('with the Antidote in, poison takes the last heart, and the hero falls', () => {
  let s = carrying([], { health: 1, poisoned: 4 });
  s = wait(s); // 3 left: a hurt
  assert.ok(s.fell, 'fell');
  assert.equal(s.health, s.maxHealth ?? s.health); assert.ok(s.health > 0);
  assert.equal(poisonLeft(s), 0);
  assert.ok(s.events.some((e) => e.type === 'fall'));
});
