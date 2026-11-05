// § stand-ins (D-585, answers Q-078): no dungeon room falls back to the crypt's second
// room any more; a room no first-round try can make gets a second round, so every
// other room stays as it was; and an old save's stand-in room is made again, once
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { layoutAt } from '../src/core/region.js';
import { placeFor, makeRoom, PLACES, isGenerated, tileAt, stoneRoom } from '../src/core/room.js';
import { upgradeState, UPGRADES } from '../src/core/save.js';
import { restand } from '../src/core/refloor.js';
import { makeWorld } from '../src/core/turn.js';
import { goToDepth, goToPlace } from '../src/core/stairs.js';

const count = (map, ch) => map.join('').split(ch).length - 1;
const fits = (seed, c) => {
  const p = placeFor(c.id, seed);
  return p.map.length === c.rows && p.map[0].length === c.cols && count(p.map, '<') === (c.up ? 1 : 0) && count(p.map, '>') === (c.down ? 1 : 0);
};

test('the rooms that fell back at 0.3.42 are made, stairs and all', () => {
  // depth:seed, each with a stand-in at 0.3.42; the last two are rooms with the stairs down
  for (const [depth, seed] of [[8, 394], [9, 143], [9, 1716], [10, 141], [13, 118], [14, 64], [20, 1760], [10, 1389], [12, 1130]]) {
    for (const c of layoutAt(seed, depth).cells) assert.ok(fits(seed, c), `depth ${depth} seed ${seed} ${c.id}`);
  }
});

test('no dungeon room falls back, seeds 1 to 300, depths 8 to 20', () => {
  for (let depth = 8; depth <= 20; depth++) for (let seed = 1; seed <= 300; seed++) {
    for (const c of layoutAt(seed, depth).cells) assert.ok(fits(seed, c), `depth ${depth} seed ${seed} ${c.id}`);
  }
});

test('rooms that were made before come out exactly as they did', () => {
  let h = 0; // a fingerprint of 360 rooms, taken at 0.3.42, less the waystones' rooms on 8 and 20 (0.3.51, D-594)
  for (let seed = 1; seed <= 20; seed++) for (const d of [8, 14, 20]) for (const c of layoutAt(seed, d).cells) {
    if (c.id === stoneRoom(seed, d)) continue; // made with its stone, every other room as before
    for (const ch of JSON.stringify(placeFor(c.id, seed))) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  }
  assert.equal(h, 508387350);
});

test('an old save\'s stand-in is made again, and the rooms that fit stay as they were', () => {
  assert.equal(UPGRADES[11], restand);
  const seed = 143, at9 = goToDepth(makeWorld('first', seed), 9), other = layoutAt(seed, 9).cells.find((c) => !c.up).id;
  const left = goToPlace(at9, other);
  // the hero back in depth 9's first room, which a 0.3.42 save had as the crypt's second room
  const old = { ...goToPlace(left, 'depth9'), room: makeRoom(PLACES.second.map) };
  const s = upgradeState(11, old);
  assert.equal(s.place, 'depth9');
  assert.deepEqual([s.room.cols, s.room.rows], [17, 20]);
  assert.equal(tileAt(s.room, s.hero.x, s.hero.y).id, 'stairsUp');
  assert.deepEqual(s.elsewhere[other], old.elsewhere[other], 'a room that fits is kept as it was');
  assert.ok(Object.keys(s.elsewhere).some(isGenerated), 'other generated rooms stay');
});

test('a save with no stand-in comes through unchanged', () => {
  const old = goToDepth(makeWorld('first', 7), 9);
  assert.deepEqual(restand(old), old);
});
