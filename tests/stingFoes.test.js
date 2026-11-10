// § the sting hits creatures too (D-766, D-768)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS } from '../src/core/room.js';
import { makeState, FIRST_START } from '../src/core/turn.js';
import { stingTurn } from '../src/core/sting.js';
import { LINES, shownLine } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
const DOWN = { dx: 0, dy: 1 };
// The first room, lit, the hero at hx,11, a scorpion at 5,9 with its tail raised down (it strikes 5,10 and 5,11)
const at = (hx, ...others) => ({ ...makeState(room, FIRST_START, FIRST_LIGHTS, []), hero: { x: hx, y: 11 }, enemies: [{ id: 'scorpion', x: 5, y: 9, raised: DOWN, chasing: true }, ...others] });

test('a creature on a marked tile takes 2 hearts, with no drop and no experience', () => {
  const s = stingTurn(at(4, { id: 'rat', x: 5, y: 11 }));
  assert.equal(s.enemies.length, 1, 'the rat is beaten');
  assert.equal(s.items.length, at(4).items.length, 'nothing dropped');
  assert.equal(s.xp, 0); assert.equal(s.health, 5);
  assert.ok(!s.events.some((e) => e.type === 'beat' || e.type === 'bite'));
  assert.equal(s.line.id, 'stingsFoe'); assert.equal(shownLine(s).text, 'The sting strikes the rat.');
});

test('a tougher creature is only hurt, by 2', () => {
  const s = stingTurn(at(4, { id: 'mole', x: 5, y: 10 }));
  assert.equal(s.enemies[1].health, 2); assert.ok(s.enemies[1].chasing);
});

test('a creature in front doesn\'t shield the hero behind; the hero\'s line wins', () => {
  const s = stingTurn(at(5, { id: 'rat', x: 5, y: 10 }));
  assert.equal(s.enemies.length, 1); assert.equal(s.health, 3);
  assert.equal(s.line.id, 'scorpionBite');
});

test('one under the earth and a pile of bones are passed over', () => {
  const s = stingTurn(at(4, { id: 'mole', x: 5, y: 10, under: true }, { id: 'boneRat', x: 5, y: 11, pile: 3 }));
  assert.equal(s.enemies[1].health, undefined); assert.equal(s.enemies[2].health, undefined);
  assert.equal(s.line.id, 'scorpionMisses');
});

test('another scorpion is stung too, and stung while raised it strikes no more', () => {
  const s = stingTurn(at(4, { id: 'scorpion', x: 5, y: 10, raised: { dx: -1, dy: 0 } }, { id: 'rat', x: 4, y: 10 }));
  assert.equal(s.enemies.length, 2, 'the second scorpion is beaten, the rat beside it unhurt');
  assert.ok(s.enemies.some((e) => e.id === 'rat' && e.health === undefined));
});

test('the line is there', () => assert.ok(LINES.stingsFoe.text.includes('{n}')));
