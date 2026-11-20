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
import { LAMPEATER_AT, arenaOwn } from '../src/core/arena.js';
import { hallWarns, doorAfterLeap } from '../src/core/beaten.js';

const K = get('sealedDoor').letter, M = get('openDoor').letter, J = get('brazier').letter;
const has = (s, ch) => s.room.map.some((row) => row.includes(ch));
const boss = (s) => s.enemies.find((e) => e.id === 'lampeater');
// The hero lit just below the Lampeater on 1 heart, a gloamling from a snuffed bowl in a corner
const lastBlow = (seed = 1) => {
  const s = bench(newJourney(seed), 'middling');
  const at = { x: LAMPEATER_AT.x, y: LAMPEATER_AT.y + 1 };
  return { ...s, hero: at, enemies: [{ ...boss(s), health: 1, met: true }, { id: 'gloamling', x: 1, y: 13, ash: { x: 2, y: 11, turn: 0 }, met: true }] };
};

// Beaten from below, then Leap's find taken where it fell and its card closed (D-992)
const won = (s) => doorAfterLeap(step(step(s, 'up'), 'up'));

test('beaten, the gloamlings crumble, counting nothing, and the door waits for Leap\'s find (D-992)', () => {
  const s = step(lastBlow(), 'up');
  assert.equal(boss(s), undefined);
  assert.ok(has(s, K) && !has(s, M));
  assert.equal(s.enemies.filter((e) => e.id === 'gloamling').length, 0);
  assert.ok(!s.events.some((e) => e.type === 'open'));
  assert.equal(s.events.filter((e) => e.type === 'beat').length, 1);
  const opened = won(lastBlow());
  assert.ok(!has(opened, K) && has(opened, M));
  assert.ok(opened.events.some((e) => e.type === 'open'));
});

test('the 4 braziers lit no longer open the door while it lives', () => {
  let s = bench(newJourney(2), 'middling');
  const bowls = s.room.map.flatMap((row, y) => [...row].map((ch, x) => ({ ch, x, y }))).filter((t) => t.ch === J);
  assert.equal(bowls.length, 4);
  for (const b of bowls.slice(0, 3)) s = { ...s, room: withTile(s.room, b.x, b.y, get('brazierLit')) };
  const b = bowls[3], next = kindle({ ...s, hero: { x: b.x, y: b.y + 1 } }, b.x, b.y);
  assert.ok(!has(next, J) && has(next, K));
});

test('walked out of unbeaten, it is whole again on its own tile, the braziers cold, the gloamlings crawled out gone, its own 4 and 2 wisps back (D-971, D-1002)', () => {
  const s0 = lastBlow(3), s = { ...s0, enemies: s0.enemies.map((e) => (e.id === 'lampeater' ? { ...e, x: 3, y: 9, caught: 1 } : e)), room: withTile(s0.room, 2, 5, get('brazierLit')) };
  const away = arrive(s, 'elsewhere', fresh(arenaPlace(3), 3), { x: 1, y: 1 }), kept = away.elsewhere[s.place];
  assert.deepEqual(kept.enemies, [{ id: 'lampeater', ...LAMPEATER_AT, met: true }, ...arenaOwn()]);
  assert.ok(!kept.room.map.some((row) => row.includes(get('brazierLit').letter)));
});

test('after a fall in the fight it is whole again; beaten, it stays beaten', () => {
  const fell = fall({ ...lastBlow(4), health: 0 }), kept = fell.elsewhere[arenaPlace(4)];
  assert.equal(boss(kept).health, undefined);
  assert.deepEqual([boss(kept).x, boss(kept).y], [LAMPEATER_AT.x, LAMPEATER_AT.y]);
  const left = fall({ ...won(lastBlow(4)), health: 0 }).elsewhere[arenaPlace(4)];
  assert.equal(boss(left), undefined);
  assert.ok(left.room.map.some((row) => row.includes(M)));
});

// § the way in sealed (D-956): a step inside past the way in seals it behind the hero; a fall opens
// it again; beaten, it sinks open with the top door; the hallway warns while the Lampeater lives
const wayIn = (s) => ({ x: s.hero.x, y: s.room.rows - 1 });
const inGap = (seed = 1) => { const s = bench(newJourney(seed), 'middling'); return { ...s, hero: wayIn(s) }; };

test('one step inside past the way in, a sealed door rises there, with its line', () => {
  const s = inGap(), gap = wayIn(s), next = step(s, 'up');
  assert.equal(next.room.map[gap.y][gap.x], K);
  assert.ok(next.events.some((e) => e.type === 'seal'));
  assert.equal(next.line.id, 'arenaSeals');
  assert.deepEqual(step(next, 'down').hero, next.hero); // no way back out
});

test('standing in the way in, nothing seals and the hero can step back out', () => {
  const s = inGap();
  assert.equal(s.room.map[wayIn(s).y][wayIn(s).x], get('floor').letter);
  assert.notEqual(step(s, 'down').place, s.place);
});

test('a fall opens the way in again; beaten, it sinks open with the top door', () => {
  const s = inGap(), gap = wayIn(s), sealed = step(s, 'up');
  const back = fall({ ...sealed, health: 0 }).elsewhere[arenaPlace(s.seed)];
  assert.equal(back.room.map[gap.y][gap.x], get('floor').letter);
  const opened = won({ ...lastBlow(), room: sealed.room });
  assert.equal(opened.room.map[gap.y][gap.x], M);
  assert.ok(!has(opened, K));
});

test('the hallway warns as the hero comes in, but not from the arena, nor once the Lampeater is beaten', () => {
  const s = inGap(), hall = step(s, 'down');
  assert.notEqual(hall.line?.id, 'hallWarning'); // walked back out of the arena: no warning
  assert.equal(hallWarns(hall, 'below').line.id, 'hallWarning');
  const beaten = { ...hall, elsewhere: { ...hall.elsewhere, [s.place]: { ...hall.elsewhere[s.place], enemies: [] } } };
  assert.notEqual(hallWarns(beaten, 'below').line?.id, 'hallWarning');
});

// § the cutscene (Q-112, D-957): the seal's event names the door's tile, and `first` only the
// first time on a journey; after a fall the way seals again with no cutscene
test('the seal is first only once a journey, a fall and the way back in after it not again', () => {
  const s = inGap(), gap = wayIn(s), sealed = step(s, 'up');
  const seal = sealed.events.find((e) => e.type === 'seal');
  assert.deepEqual([seal.x, seal.y, seal.first], [gap.x, gap.y, true]);
  const after = fall({ ...sealed, health: 0 });
  assert.equal(after.sealSeen, true);
  const again = step({ ...s, sealSeen: after.sealSeen }, 'up').events.find((e) => e.type === 'seal');
  assert.equal(again.first, false);
});
