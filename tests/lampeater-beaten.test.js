// § lampeater beaten: the Lampeater's step 9, its first part (D-953): only beating it opens the arena's
// sealed door, the gloamlings left crumbling; left unbeaten, by a doorway or a fall, it is whole
// again on its own tile, the braziers cold
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { newJourney } from '../src/core/state.js';
import { bench, arenaPlace } from '../src/core/bossbench.js';
import { step } from '../src/core/turn.js';
import { kindle } from '../src/core/bagturn.js';
import { fall } from '../src/core/fall.js';
import { arrive, fresh } from '../src/core/stairs.js';
import { withTile } from '../src/core/room.js';
import { LAMPEATER_AT } from '../src/core/arena.js';

const K = get('sealedDoor').letter, M = get('openDoor').letter, J = get('brazier').letter;
const has = (s, ch) => s.room.map.some((row) => row.includes(ch));
const boss = (s) => s.enemies.find((e) => e.id === 'lampeater');
// The hero lit just below the Lampeater on 1 heart, a gloamling from a snuffed bowl in a corner
const lastBlow = (seed = 1) => {
  const s = bench(newJourney(seed), 'middling');
  const at = { x: LAMPEATER_AT.x, y: LAMPEATER_AT.y + 1 };
  return { ...s, hero: at, enemies: [{ ...boss(s), health: 1, met: true }, { id: 'gloamling', x: 1, y: 13, ash: { x: 2, y: 11, turn: 0 }, met: true }] };
};

test('beaten, its door sinks open at once and the gloamlings crumble, counting nothing', () => {
  const s = step(lastBlow(), 'up');
  assert.equal(boss(s), undefined);
  assert.ok(!has(s, K) && has(s, M));
  assert.equal(s.enemies.filter((e) => e.id === 'gloamling').length, 0);
  assert.ok(s.events.some((e) => e.type === 'open'));
  assert.equal(s.events.filter((e) => e.type === 'beat').length, 1);
});

test('the 4 braziers lit no longer open the door while it lives', () => {
  let s = bench(newJourney(2), 'middling');
  const bowls = s.room.map.flatMap((row, y) => [...row].map((ch, x) => ({ ch, x, y }))).filter((t) => t.ch === J);
  assert.equal(bowls.length, 4);
  for (const b of bowls.slice(0, 3)) s = { ...s, room: withTile(s.room, b.x, b.y, get('brazierLit')) };
  const b = bowls[3], next = kindle({ ...s, hero: { x: b.x, y: b.y + 1 } }, b.x, b.y);
  assert.ok(!has(next, J) && has(next, K));
});

test('walked out of unbeaten, it is whole again on its own tile, the braziers cold, the gloamlings gone', () => {
  const s0 = lastBlow(3), s = { ...s0, enemies: s0.enemies.map((e) => (e.id === 'lampeater' ? { ...e, x: 3, y: 9, caught: 1 } : e)), room: withTile(s0.room, 2, 5, get('brazierLit')) };
  const away = arrive(s, 'elsewhere', fresh(arenaPlace(3), 3), { x: 1, y: 1 }), kept = away.elsewhere[s.place];
  assert.deepEqual(kept.enemies, [{ id: 'lampeater', ...LAMPEATER_AT, met: true }]);
  assert.ok(!kept.room.map.some((row) => row.includes(get('brazierLit').letter)));
});

test('after a fall in the fight it is whole again; beaten, it stays beaten', () => {
  const fell = fall({ ...lastBlow(4), health: 0 }), kept = fell.elsewhere[arenaPlace(4)];
  assert.equal(boss(kept).health, undefined);
  assert.deepEqual([boss(kept).x, boss(kept).y], [LAMPEATER_AT.x, LAMPEATER_AT.y]);
  const won = step(lastBlow(4), 'up'), left = fall({ ...won, health: 0 }).elsewhere[arenaPlace(4)];
  assert.equal(boss(left), undefined);
  assert.ok(left.room.map.some((row) => row.includes(M)));
});
