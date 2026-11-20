// F-10 (D-1001): an arena kept in an older save brought up to today's shape, once
import test from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld } from '../src/core/state.js';
import { get } from '../src/core/registry.js';
import { layoutAt } from '../src/core/region.js';
import { goToPlace } from '../src/core/stairs.js';
import { ARENA_DEPTH, LAMPEATER_AT, arenaOwn } from '../src/core/arena.js';
import { withArenaToday } from '../src/core/fixups/arenatoday.js';
import { UPGRADES, FORMAT } from '../src/core/save.js';

const seed = 3, id = layoutAt(seed, ARENA_DEPTH).cells.find((c) => c.arena).id;
const inside = () => goToPlace(makeWorld('first', seed), id);
const swap = (room, a, b) => ({ ...room, map: room.map.map((r) => r.split(get(a).letter).join(get(b).letter)) });
// 0.3.394's shape: its braziers lit opened the door, the Lampeater still there, hurt, no gloamlings
const opened = (s) => ({ ...s, room: swap(swap(s.room, 'brazier', 'brazierLit'), 'sealedDoor', 'openDoor'), enemies: [{ id: 'lampeater', ...LAMPEATER_AT, health: 5 }] });
const has = (room, tile) => room.map.some((r) => r.includes(get(tile).letter));

test('a save step 37 → 38 brings an older arena up to date (F-10)', () => {
  assert.ok(FORMAT >= 38); assert.equal(UPGRADES[37], withArenaToday); // at least: a later save step keeps this one (H-104)
});

test('kept away, door open with the Lampeater alive: sealed, cold, whole, with its gloamlings', () => {
  const away = goToPlace(opened(inside()), 'depth3');
  const old = { ...away, elsewhere: { ...away.elsewhere, [id]: opened(away.elsewhere[id]) } }, s = withArenaToday(old), a = s.elsewhere[id];
  assert.equal(a.room.map[4][6], get('sealedDoor').letter);
  assert.ok(!has(a.room, 'brazierLit') && has(a.room, 'brazier'));
  assert.deepEqual(a.enemies, [{ id: 'lampeater', ...LAMPEATER_AT }, ...arenaOwn()]);
  assert.deepEqual(withArenaToday(s), s);
});

test('the hero inside: sealed and cold, the Lampeater keeps its hearts, no gloamling onto the hero', () => {
  const first = arenaOwn()[0], old = { ...opened(inside()), hero: { x: first.x, y: first.y } }, s = withArenaToday(old);
  assert.equal(s.room.map[4][6], get('sealedDoor').letter);
  assert.ok(!has(s.room, 'brazierLit'));
  assert.deepEqual(s.enemies, [{ id: 'lampeater', ...LAMPEATER_AT, health: 5 }, ...arenaOwn().slice(1)]);
  const gap = layoutAt(seed, ARENA_DEPTH).cells.find((c) => c.arena).doors[0].at;
  assert.equal(s.room.map[s.room.rows - 1][gap], get('floor').letter); // the way in still open
  assert.deepEqual(withArenaToday(s), s);
});

test('beaten with no find and Leap not learnt: its find lies on its own tile, once; learnt, nothing', () => {
  const old = { ...inside(), enemies: [], items: [] }, s = withArenaToday(old);
  assert.deepEqual(s.items, [{ id: 'leapFind', ...LAMPEATER_AT }]);
  assert.equal(withArenaToday(s), s);
  const learnt = { ...old, leap: true };
  assert.equal(withArenaToday(learnt), learnt);
  const away = goToPlace(old, 'depth3'), kept = withArenaToday(away);
  assert.deepEqual(kept.elsewhere[id].items, [{ id: 'leapFind', ...LAMPEATER_AT }]);
});

test('today\'s arena and an arena never made stay as they are', () => {
  const now = inside(), never = makeWorld('first', seed);
  assert.deepEqual(withArenaToday(now), now);
  assert.equal(withArenaToday(never), never);
});
