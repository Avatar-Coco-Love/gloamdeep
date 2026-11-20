// The arena's lure wisps (3.04, D-939, D-1002): 2 of today's wisps, either side of the Lampeater,
// luring toward it only; the arena's own, as its gloamlings: they drop nothing and fade when it is beaten
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { newJourney } from '../src/core/state.js';
import { bench } from '../src/core/bossbench.js';
import { step } from '../src/core/turn.js';
import { enemiesAct } from '../src/core/creatureturn.js';
import { LAMPEATER_AT, arenaOwn } from '../src/core/arena.js';

const wisps = () => arenaOwn().filter((e) => e.id === 'lureWisp');
const at = (enemies, hero) => ({ ...bench(newJourney(1), 'middling'), hero, enemies });

test('2 wisps start either side of the Lampeater, the arena\'s own', () => {
  assert.deepEqual(wisps().map(({ x, y }) => ({ x, y })), [{ x: LAMPEATER_AT.x - 1, y: LAMPEATER_AT.y }, { x: LAMPEATER_AT.x + 1, y: LAMPEATER_AT.y }]);
  assert.ok(wisps().every((w) => w.ash && w.lure === 'lampeater'));
});

test('with the hero near, a wisp drifts toward the Lampeater, never the nearer gloamling', () => {
  const wisp = { ...wisps()[0], x: 5, y: 9 }, gloam = { id: 'gloamling', x: 3, y: 9, met: true, asleep: true }, boss = { id: 'lampeater', x: 8, y: 9 };
  const moved = (w) => enemiesAct(at([w, gloam, boss], { x: 5, y: 11 })).enemies[0];
  assert.deepEqual([moved(wisp).x, moved(wisp).y], [6, 9]);
  const { lure, ...plain } = wisp; // today's wisp anywhere else: the nearest creature
  assert.deepEqual([moved(plain).x, moved(plain).y], [4, 9]);
});

test('put out, a wisp drops nothing; the Lampeater beaten, the wisps fade', () => {
  const wisp = { ...wisps()[0], x: 5, y: 9 }, s = at([wisp, { id: 'lampeater', x: 10, y: 12 }], { x: 5, y: 10 });
  const hit = step(s, 'up');
  assert.ok(!hit.enemies.some((e) => e.id === 'lureWisp'));
  assert.deepEqual(hit.items, s.items);
  const last = at([{ id: 'lampeater', x: 6, y: 7, health: 1, met: true }, ...wisps()], { x: 6, y: 8 });
  const beaten = step(last, 'up');
  assert.ok(beaten.events.some((e) => e.type === 'beat' && e.id === 'lampeater'));
  assert.ok(!beaten.enemies.some((e) => e.id === 'lureWisp'));
});
