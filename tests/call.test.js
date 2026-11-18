// § call: the Lampeater's step 3 (D-974): struck and free again, it goes to the nearest cold brazier
// and calls a gloamling out over 2 turns; caught, it stops; that brazier lit, the call is spoilt
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { makeState, wait } from '../src/core/turn.js';
import { makeRoom, withTile } from '../src/core/room.js';
import { hitEnemy } from '../src/core/enemies.js';
import { calls } from '../src/core/call.js';

const J = get('brazier').letter;
// A hall with a cold brazier at 2,2 and another at 12,10
const rows = Array.from({ length: 13 }, (_, y) => (y === 0 || y === 12 ? '#'.repeat(15) : `#${'.'.repeat(13)}#`))
  .map((r, y) => (y === 2 ? r.slice(0, 2) + J + r.slice(3) : y === 10 ? r.slice(0, 12) + J + r.slice(13) : r));
const hall = makeRoom(rows);
const at = (enemies, more = {}) => ({ ...makeState(hall, { x: 12, y: 2 }, [], []), enemies, lit: false, place: 'hall', oil: 100, god: true, ...more });
const eater = (e = {}) => ({ id: 'lampeater', x: 5, y: 5, chasing: true, struck: true, ...e });
const lings = (s) => s.enemies.filter((e) => e.id === 'gloamling');
const lamp = (s) => s.enemies.find((e) => e.id === 'lampeater');

test('a blow that hurts it marks it struck', () => {
  const foe = { id: 'lampeater', x: 1, y: 1 };
  assert.equal(hitEnemy([foe], foe, get('lampeater'), 1)[0].struck, true);
  const rat = { id: 'rat', x: 1, y: 1, health: 3 };
  assert.equal(hitEnemy([rat], rat, get('rat'), 1)[0].struck, undefined);
});

test('struck and free, it heads for the nearest cold brazier, not the hero', () => {
  const s = wait(at([eater()]));
  const { x, y } = lamp(s);
  assert.ok(Math.abs(x - 2) + Math.abs(y - 2) < Math.abs(5 - 2) + Math.abs(5 - 2), 'nearer the brazier');
});

test('beside it, it calls for 2 turns, and a gloamling crawls out', () => {
  let s = wait(at([eater({ x: 3, y: 2 })]));
  assert.deepEqual(lamp(s).call, { x: 2, y: 2, left: 2 });
  assert.equal(s.line.id, 'lampeaterCalls');
  s = wait(s);
  assert.equal(lamp(s).call.left, 1);
  assert.equal(lings(s).length, 0);
  s = wait(s);
  assert.equal(lamp(s).call, undefined);
  assert.equal(lamp(s).struck, undefined, 'one call a blow');
  assert.equal(lings(s).length, 1);
  const [g] = lings(s);
  assert.equal(Math.abs(g.x - 2) + Math.abs(g.y - 2), 1, 'beside the bowl');
});

test('that brazier lit, the call is spoilt, and it still wants to call', () => {
  const s = wait(at([eater({ x: 3, y: 2 })]));
  const lit = calls({ ...s, room: withTile(s.room, 2, 2, get('brazierLit')) });
  assert.equal(lamp(lit).call, undefined);
  assert.equal(lamp(lit).struck, true);
});

test('caught in light, the call stops, and it tries again once free', () => {
  const s = wait(at([eater({ x: 3, y: 2 })]));
  const caught = calls({ ...s, enemies: s.enemies.map((e) => (e.id === 'lampeater' ? { ...e, caught: true } : e)) });
  assert.equal(lamp(caught).call, undefined);
  assert.equal(lamp(caught).struck, true);
});

test('never from a lit brazier', () => {
  const room = withTile(withTile(hall, 2, 2, get('brazierLit')), 12, 10, get('brazierLit'));
  const s = wait(at([eater({ x: 3, y: 2 })], { room }));
  assert.equal(lamp(s).call, undefined);
});

test('with 6 gloamlings alive it does not call, but is wary (D-977)', () => {
  const six = Array.from({ length: 6 }, (_, i) => ({ id: 'gloamling', x: 7 + i, y: 11, met: true }));
  const s = wait(at([eater({ x: 3, y: 2 }), ...six], { oil: 1 }));
  assert.equal(lamp(s).call, undefined);
  assert.equal(lamp(s).wary, 2, '3, one spent as the turn ends');
  assert.equal(get('lampeater').calls.most, 6);
});

test('its Bestiary words tell of the call', () => {
  assert.match(get('lampeater').acts, /Struck, it goes to a cold brazier and calls one out\./);
});

// § phases (D-978): its call waits for the phase's snuff, then is from another cold brazier
test('owing a phase snuff, or breathing it, it neither calls nor is wary', () => {
  for (const owe of [{ owes: 1 }, { breath: { x: 9, y: 9, left: 2 } }]) {
    const s = calls(at([eater({ x: 3, y: 2, ...owe })]));
    assert.ok(!lamp(s).call && !lamp(s).wary);
  }
});

test('after a phase snuff it calls from another cold brazier, and the mark clears when the call ends', () => {
  let s = calls(at([eater({ x: 3, y: 2, phaseBowl: { x: 2, y: 2 } })]));
  assert.ok(!lamp(s).call, 'not from the bowl just snuffed');
  s = calls(at([eater({ x: 11, y: 10, phaseBowl: { x: 2, y: 2 } })]));
  assert.deepEqual(lamp(s).call, { x: 12, y: 10, left: 2 });
  s = calls(calls(s));
  assert.ok(!lamp(s).call && !lamp(s).struck && !lamp(s).phaseBowl);
  assert.equal(lamp(s).bowls.length, 1);
});
