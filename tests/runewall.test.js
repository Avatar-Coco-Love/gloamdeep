// The rune wall, L3 step 1 (D-927, D-928): one a floor from depth 1, its runes seen only in the dark
import test from 'node:test';
import assert from 'node:assert/strict';
import { runeWallAt, placeFor, beginPlace, vaultAt, stoneRoom, peddlerRoom, PEDDLER_DEPTH, tileAt } from '../src/core/room.js';
import { runeSpotIn } from '../src/core/runewall.js';
import { runesSeen } from '../src/core/sight.js';
import { makeWorld } from '../src/core/state.js';
import { goToPlace } from '../src/core/stairs.js';

test('every floor from depth 1 has one rune wall, never in the vault, the peddler\'s or a waystone\'s room', () => {
  for (let seed = 1; seed <= 30; seed++) for (let d = 1; d <= 12; d++) {
    const r = runeWallAt(seed, d);
    assert.ok(r, `seed ${seed}, depth ${d}`);
    assert.ok(![vaultAt(seed, d), stoneRoom(seed, d), d === PEDDLER_DEPTH && peddlerRoom(seed)].includes(r.id));
    assert.deepEqual(placeFor(r.id, seed).runes, r.at);
  }
});

test('the rune wall is a wall with plain floor in front, and wall all round the tile behind it', () => {
  for (let seed = 1; seed <= 30; seed++) for (const d of [1, 2, 5, 9]) {
    const { id, at: { x, y } } = runeWallAt(seed, d), room = beginPlace(id, seed).room;
    assert.deepEqual(room.runes, { x, y }, 'kept with the room as it begins');
    assert.equal(tileAt(room, x, y).id, 'wall');
    assert.equal(tileAt(room, x, y + 1).id, 'floor');
    for (const [i, j] of [[x, y - 1], [x - 1, y - 1], [x + 1, y - 1], [x, y - 2]]) assert.equal(tileAt(room, i, j).id, 'wall');
  }
});

test('only one room a floor has it, and the surface none', () => {
  const r = runeWallAt(11, 2);
  const others = ['depth2', 'depth2:1,2', 'depth2:2,2', 'depth2:3,0'].filter((id) => id !== r.id);
  for (const id of others) assert.equal(placeFor(id, 11).runes, undefined);
  assert.equal(placeFor('woods', 11).runes, undefined);
  assert.equal(runeSpotIn(['###', '#.#', '###'], 1), null, 'a room with no fitting tile has none');
});

test('the runes are seen only with the lantern off, from in front of the wall along a clear line', () => {
  const seed = 7, { id, at } = runeWallAt(seed, 1), s = goToPlace(makeWorld('first', seed), id);
  const front = { x: at.x, y: at.y + 1 };
  const dark = { ...s, lit: false, hero: front };
  assert.equal(runesSeen(dark), true, 'in front, dark');
  assert.equal(runesSeen({ ...dark, lit: true }), false, 'lit, hidden');
  assert.equal(runesSeen({ ...dark, hero: { x: at.x + 1, y: at.y - 2 } }), false, 'behind the wall');
  const far = { x: at.x + 4, y: at.y + 2 };
  assert.equal(tileAt(s.room, far.x, far.y).id, 'floor');
  assert.equal(runesSeen({ ...dark, hero: far }), true, 'across the room');
  assert.equal(runesSeen({ ...s, lit: false, room: { ...s.room, runes: undefined }, hero: front }), false, 'a room without one');
});
