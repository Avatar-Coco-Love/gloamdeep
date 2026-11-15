// The rune wall, L3 step 1 (D-927, D-928): one a floor from depth 1, its runes seen only in the dark
import test from 'node:test';
import assert from 'node:assert/strict';
import { runeWallAt, placeFor, beginPlace, vaultAt, stoneRoom, peddlerRoom, PEDDLER_DEPTH, tileAt } from '../src/core/room.js';
import { runeSpotIn } from '../src/core/runewall.js';
import { runesSeen } from '../src/core/sight.js';
import { makeWorld } from '../src/core/state.js';
import { goToPlace } from '../src/core/stairs.js';
import { step } from '../src/core/turn.js';
import { runePrize } from '../src/core/runedoor.js';

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

// Step 2 (D-927, D-929): a dark bump opens it for good, a vault's prize in the nook

const inFront = (seed, depth) => {
  const { id, at } = runeWallAt(seed, depth), s = goToPlace(makeWorld('first', seed), id);
  return { s: { ...s, hero: { x: at.x, y: at.y + 1 }, enemies: [] }, at };
};

test('bumped lit, it says its line, free, and stays a wall', () => {
  const { s, at } = inFront(7, 2), next = step({ ...s, lit: true }, 'up');
  assert.equal(next.turn, s.turn, 'free');
  assert.equal(tileAt(next.room, at.x, at.y).id, 'wall');
  assert.deepEqual(next.room.runes, at);
  assert.equal(next.line.id, 'runesLit');
});

test('bumped dark, it sinks open for good: a gap, the prize on a plinth behind, the runes gone, no oil', () => {
  for (let seed = 1; seed <= 12; seed++) for (const d of [1, 3, 8]) {
    const { s, at } = inFront(seed, d), dark = { ...s, lit: false }, next = step(dark, 'up');
    assert.equal(tileAt(next.room, at.x, at.y).id, 'floor');
    const prize = runePrize(seed, d);
    assert.deepEqual(next.room.prize, prize);
    assert.equal(tileAt(next.room, at.x, at.y - 1).id, prize.id === 'ember' ? 'plinthEmber' : 'plinth');
    assert.equal(next.room.runes, null);
    assert.equal(runesSeen({ ...next, hero: dark.hero }), false, 'the runes show no more');
    assert.equal(next.oil, dark.oil, 'no oil');
    assert.equal(next.turn, dark.turn + 1, 'a turn');
    assert.equal(next.line.id, 'runesOpen');
    const inside = step(next, 'up');
    assert.deepEqual(inside.hero, at, 'walked into the gap');
    const taken = step(inside, 'up');
    assert.equal(tileAt(taken.room, at.x, at.y - 1).id, 'plinthBare', 'the prize taken as a vault\'s');
  }
});

test('bumped from the side, it is a wall as any other', () => {
  const { s, at } = inFront(5, 2);
  for (const [dx, dir] of [[-1, 'right'], [1, 'left']]) {
    const by = { ...s, lit: false, hero: { x: at.x + dx, y: at.y } };
    if (tileAt(s.room, by.hero.x, by.hero.y).id !== 'floor') continue;
    assert.equal(tileAt(step(by, dir).room, at.x, at.y).id, 'wall');
  }
});

test('each floor\'s nook draws its own prize, ember 1 in 4 or so', () => {
  let embers = 0, n = 0;
  for (let seed = 1; seed <= 100; seed++) for (const d of [1, 2, 3]) { n++; if (runePrize(seed, d).id === 'ember') embers++; }
  assert.ok(embers > n * 0.15 && embers < n * 0.35, `${embers} of ${n}`);
});
