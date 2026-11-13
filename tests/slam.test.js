// § the warden's slam (D-885, step 1): beside the hero its fists go up for a turn, then it slams,
// its bite and the hero knocked 3 tiles straight back; it rests a turn after
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeState, wait, step } from '../src/core/turn.js';
import { makeRoom, SKY } from '../src/core/room.js';
import { stingTurn, struck } from '../src/core/sting.js';
import { nextMoves } from '../src/core/creatureturn.js';

const map = ['TTTTTTTTTT', 'T........T', 'T........T', 'T........T', 'TTTTTTTTTT'];
const room = makeRoom(map, SKY, 'woods');
const at = (hx, enemy, more = []) => ({ ...makeState(room, { x: hx, y: 2 }, [], []), lit: true, oil: 99, enemies: [enemy, ...more] });
const warden = (x, extra = {}) => ({ id: 'warden', x, y: 2, chasing: true, ...extra });
const LEFT = { dx: -1, dy: 0 };

test('beside the hero, its fists go up instead of a bite, with its line and a raise event', () => {
  const s = wait(at(5, warden(6)));
  assert.deepEqual(s.enemies[0].raised, LEFT);
  assert.equal(s.health, at(5, warden(6)).health, 'no bite yet');
  assert.equal(s.line.id, 'wardenRaises');
  assert.deepEqual(s.events.find((e) => e.type === 'raise'), { type: 'raise', id: 'warden' });
});

test('fists up, the mark is on the hero\'s tile and the next move is the slam', () => {
  const s = at(5, warden(6, { raised: LEFT }));
  assert.deepEqual(struck(s, s.enemies[0]), [{ x: 5, y: 2 }]);
  assert.ok(nextMoves(s).some((m) => m.kind === 'bite' && m.dx === -1));
});

test('the slam bites and knocks the hero 3 tiles back, then it rests', () => {
  const s = stingTurn(at(5, warden(6, { raised: LEFT })));
  assert.deepEqual(s.hero, { x: 2, y: 2 });
  assert.equal(s.health, at(5, warden(6)).health - 1);
  assert.equal(s.line.id, 'wardenBite');
  assert.deepEqual(s.events.find((e) => e.type === 'knock'), { type: 'knock', from: { x: 5, y: 2 }, to: { x: 2, y: 2 } });
  assert.ok(!s.enemies[0].raised); assert.equal(s.enemies[0].rests, 2);
});

test('a tree stops the slide short; for now with no hurt more', () => {
  const s = stingTurn(at(2, warden(3, { raised: LEFT })));
  assert.deepEqual(s.hero, { x: 1, y: 2 });
  assert.equal(s.health, at(2, warden(3)).health - 1);
});

test('a creature in the way stops the slide before it', () => {
  const s = stingTurn(at(5, warden(6, { raised: LEFT }), [{ id: 'rat', x: 3, y: 2 }]));
  assert.deepEqual(s.hero, { x: 4, y: 2 });
  assert.ok(s.enemies.some((e) => e.id === 'rat' && e.x === 3));
});

test('stepped out of its way, the slam hits the floor and the hero stays', () => {
  const s = stingTurn(at(5, warden(6, { raised: { dx: 0, dy: 1 } })));
  assert.deepEqual(s.hero, { x: 5, y: 2 });
  assert.equal(s.line.id, 'wardenMisses');
  assert.ok(!s.events.some((e) => e.type === 'knock'));
});

test('a whole turn: fists up, then the slam as the hero waits', () => {
  let s = wait(at(5, warden(6)));
  s = wait(s);
  assert.deepEqual(s.hero, { x: 2, y: 2 });
  assert.equal(s.health, at(5, warden(6)).health - 1);
});

test('fists up, it does not settle back to sleep before it slams', () => {
  const s = wait(at(5, warden(6, { awake: 1 })));
  assert.ok(s.enemies[0].raised); assert.ok(!s.enemies[0].asleep);
});

test('god mode: knocked back all the same, no heart taken', () => {
  const s = stingTurn({ ...at(5, warden(6, { raised: LEFT })), god: true });
  assert.deepEqual(s.hero, { x: 2, y: 2 }); assert.equal(s.health, at(5, warden(6)).health);
});
