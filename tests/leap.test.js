// § leap (D-962): chapter 1's found ability. Beating the Lampeater gives it, kept on the journey
// only; the hero leaps 2 tiles over floor, a creature or a low thing, a turn; blocked, free
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { newJourney, makeState } from '../src/core/state.js';
import { bench } from '../src/core/bossbench.js';
import { step, leap } from '../src/core/turn.js';
import { LAMPEATER_AT } from '../src/core/arena.js';
import { shownLine } from '../src/core/lines.js';

const room = (rows) => ({ cols: rows[0].length, rows: rows.length, map: rows, dark: {} });
const at = (rows, hero, more = {}) => ({ ...makeState(room(rows), hero), leap: true, ...more });

test('beating the Lampeater gives Leap, said with the door', () => {
  const s0 = bench(newJourney(1), 'middling'), boss = s0.enemies.find((e) => e.id === 'lampeater');
  const s = step({ ...s0, hero: { x: LAMPEATER_AT.x, y: LAMPEATER_AT.y + 1 }, enemies: [{ ...boss, health: 1, met: true }] }, 'up');
  assert.equal(s.leap, true);
  assert.ok(['doorLeap', 'levelLeap'].includes(s.line.id));
  assert.match(shownLine(s).text, /You learn Leap\./);
});

test('a new journey starts without Leap', () => {
  assert.equal(newJourney(1).leap, undefined);
});

test('without Leap nothing happens', () => {
  const s = { ...at(['.....'], { x: 0, y: 0 }), leap: undefined };
  assert.equal(leap(s, 'right'), s);
});

test('it leaps 2 tiles over open floor in one turn', () => {
  const s = at(['.....'], { x: 0, y: 0 }), next = leap(s, 'right');
  assert.deepEqual(next.hero, { x: 2, y: 0 });
  assert.equal(next.turn, s.turn + 1);
  assert.ok(next.events.some((e) => e.type === 'leap'));
});

test('it leaps over a creature and a low thing, never a wall', () => {
  const rat = at(['.....'], { x: 0, y: 0 }, { enemies: [{ id: 'rat', x: 1, y: 0, asleep: true }] });
  assert.deepEqual(leap(rat, 'right').hero, { x: 2, y: 0 });
  const W = get('water').letter, wall = get('wall').letter;
  assert.deepEqual(leap(at([`.${W}...`], { x: 0, y: 0 }), 'right').hero, { x: 2, y: 0 });
  const walled = at([`.${wall}...`], { x: 0, y: 0 }), next = leap(walled, 'right');
  assert.deepEqual(next.hero, { x: 0, y: 0 });
  assert.equal(next.turn, walled.turn);
  assert.equal(next.line.id, 'leapTooTall');
});

test('no room to land: a creature there, a wall or the room\'s edge, free', () => {
  for (const s of [at(['.....'], { x: 0, y: 0 }, { enemies: [{ id: 'rat', x: 2, y: 0 }] }), at([`..${get('wall').letter}..`], { x: 0, y: 0 }), at(['..'], { x: 0, y: 0 })]) {
    const next = leap(s, 'right');
    assert.deepEqual(next.hero, s.hero);
    assert.equal(next.turn, s.turn);
    assert.equal(next.line.id, 'leapNoRoom');
  }
});
