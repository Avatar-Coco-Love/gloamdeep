// § movestone (D-753): an older save's home waystone moved to the cave mouth's room
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';
import { beginPlace } from '../src/core/room.js';
import { UPGRADES } from '../src/core/save.js';
import { mouthOf, stoneHome } from '../src/core/mouth.js';
import { HOME_ID, isMountain } from '../src/core/hearthwood.js';
import { generateWoods, STONE_UP } from '../src/core/woods.js';
import { seedFor } from '../src/core/rng.js';
import { LANDMARKS } from '../src/core/registry.js';
import { around } from '../src/core/landmarks.js';

const move = UPGRADES[21];
const plateIn = (room) => { for (let y = 0; y < room.map.length; y++) { const x = room.map[y].search(/[ZA]/); if (x >= 0) return { x, y, ch: room.map[y][x] }; } return null; };
// A save from before D-753: home with its stone as it grew, the mouth's room without one
function oldSave(seed, { woken = false, place = 'first' } = {}) {
  const w = makeWorld('first', seed), id = stoneHome(seed), home = w.elsewhere[HOME_ID], there = w.elsewhere[id];
  let map = generateWoods(seedFor(seed, 0), mouthOf(seed)).map.map((l, y) => [...l].map((ch, x) => (/[XYZ]/.test(ch) ? ch : home.room.map[y][x])).join(''));
  if (woken) map = map.map((l) => l.replace('Z', 'A'));
  const bare = there.room.map.map((l) => l.replace(/[XYZ]/g, '.'));
  const s = { ...w, elsewhere: { ...w.elsewhere, [HOME_ID]: { ...home, room: { ...home.room, map } }, [id]: { ...there, room: { ...there.room, map: bare } } } };
  return place === 'first' ? s : goToPlace(s, place);
}

test('movestone: the stone leaves home for the cave mouth\'s room, near its middle; home\'s spot is grass', () => {
  for (const seed of [1, 2, 4, 9, 4127]) {
    const id = stoneHome(seed), s = move(oldSave(seed)), there = s.elsewhere[id].room, at = plateIn(there);
    assert.equal(plateIn(s.elsewhere[HOME_ID].room), null, `seed ${seed}: none at home`);
    assert.deepEqual(s.elsewhere[HOME_ID].room.map, beginPlace(HOME_ID, seed).room.map, `seed ${seed}: home as a new game's`);
    assert.ok(at, `seed ${seed}: in ${id}`);
    assert.equal(at.ch, 'Z', 'asleep, as it was');
    assert.ok(Math.abs(at.x - (there.cols >> 1)) <= 2 && Math.abs(at.y - ((there.rows >> 1) - STONE_UP)) <= 2, `seed ${seed}: near the middle`);
    assert.deepEqual(move(s), s, 'once');
  }
});

test('movestone: woken at home, it is woken in its new room', () => {
  const s = move(oldSave(4, { woken: true })), id = stoneHome(4);
  assert.equal(plateIn(s.elsewhere[id].room).ch, 'A');
});

test('movestone: things set down on the old stone stay; a hero standing there stays', () => {
  const w = oldSave(1, { place: HOME_ID }), at = plateIn(w.room);
  const s = move({ ...w, hero: { x: at.x, y: at.y }, items: [...w.items, { id: 'flask', x: at.x + 1, y: at.y }] });
  assert.deepEqual(s.hero, { x: at.x, y: at.y });
  assert.ok(s.items.some((it) => it.id === 'flask' && it.x === at.x + 1 && it.y === at.y));
  for (const t of around(LANDMARKS.waystone, at.x, at.y)) assert.equal(s.room.map[t.y][t.x], '.');
});

test('movestone: standing in the cave mouth\'s room, the stone is never set under the hero', () => {
  const id = stoneHome(9), w = oldSave(9, { place: id }), cx = w.room.cols >> 1, cy = (w.room.rows >> 1) - STONE_UP;
  const s = move({ ...w, hero: { x: cx, y: cy } }), at = plateIn(s.room);
  assert.ok(at);
  assert.ok(Math.abs(at.x - cx) > 1 || Math.abs(at.y - cy) > 1);
});

test('movestone: a cave mouth\'s room not kept yet is made, so a woken stone stays woken', () => {
  const w = oldSave(2, { woken: true }), id = stoneHome(2), elsewhere = { ...w.elsewhere };
  delete elsewhere[id];
  const s = move({ ...w, elsewhere });
  assert.equal(plateIn(s.elsewhere[id].room).ch, 'A');
  assert.equal(plateIn(s.elsewhere[HOME_ID].room), null);
});

test('movestone: a new game\'s mountain mouth room keeps the stone\'s ring clear of boulders', () => {
  let checked = 0;
  for (let seed = 1; seed <= 200; seed++) {
    const id = stoneHome(seed);
    if (!isMountain(id)) continue;
    const room = beginPlace(id, seed).room, at = plateIn(room);
    for (const t of around(LANDMARKS.waystone, at.x, at.y, 1)) assert.notEqual(room.map[t.y][t.x], 'O', `seed ${seed}`);
    checked++;
  }
  assert.ok(checked > 20);
});
