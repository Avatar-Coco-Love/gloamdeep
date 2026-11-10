// § lamppost (D-769, the first landmark): one dead lamppost a seed, in one of Hearthwood's 8 rooms
// outside home, never the campfire's; solid, light passing it; bumped, it says its words, free
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';
import { makeRoom, SKY, PLACES } from '../src/core/room.js';
import { makeState, step, makeWorld } from '../src/core/turn.js';
import { lamppostRoom, IN } from '../src/core/lamppost.js';
import { campfireOf, FIRE_ROOMS } from '../src/core/campfire.js';
import { ROOMS } from '../src/core/hearthwood.js';
import { joinedFrom, depthIn } from '../src/core/woods.js';
import { relamp } from '../src/core/relamp.js';
import { FORMAT, UPGRADES } from '../src/core/save.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i * 7919 + 3);
const postIn = (map) => { for (let y = 0; y < map.length; y++) { const x = map[y].indexOf('b'); if (x >= 0) return { x, y }; } return null; };

test('the Lamppost is in the registry, solid, light passing it, with its words', () => {
  const t = get('lamppost');
  assert.equal(t.name, 'Lamppost'); assert.equal(t.kind, 'tile');
  assert.equal(t.solid, true); assert.equal(t.blocksLight, false); assert.equal(t.letter, 'b');
  assert.deepEqual(LINES[t.bump].texts, ['An old lamppost.', 'Its lamp went out long ago.']);
});

test('one lamppost a seed, in one of the 8 rooms outside home, never the campfire\'s, on open grass, never cutting the room', () => {
  const rooms = new Set();
  for (const seed of SEEDS) {
    const room = lamppostRoom(seed);
    rooms.add(room);
    assert.ok(FIRE_ROOMS.includes(room)); assert.notEqual(room, campfireOf(seed).room, `${seed}`);
    for (const id of ROOMS) {
      const made = PLACES[id].make(null, seed), at = postIn(made.map);
      if (id !== room) { assert.equal(at, null, `${seed} ${id}`); continue; }
      assert.ok(at, `${seed} ${id}`);
      assert.ok(depthIn(at.x, at.y) >= IN);
      assert.notDeepEqual(at, made.start);
      assert.ok(!made.items.some((t) => t.x === at.x && t.y === at.y));
      assert.ok(joinedFrom(made.map.map((l) => l.split('')), made.start));
    }
  }
  assert.ok(rooms.size >= 6);
});

test('bumped, it says its words a sentence a bump, free, and the hero stays put', () => {
  const s = makeState(makeRoom(['TTTTT', 'T..bT', 'TTTTT'], SKY, 'woods'), { x: 2, y: 1 });
  const one = step(s, 'right'), two = step(one, 'right');
  assert.equal(one.turn, s.turn);
  assert.deepEqual([one.hero.x, one.hero.y], [2, 1]);
  assert.equal(shownLine(one).text, 'An old lamppost.');
  assert.equal(shownLine(two).text, 'Its lamp went out long ago.');
});

test('an older save gets it in its room when unseen and untouched; a seen room stays (D-266)', () => {
  assert.ok(FORMAT >= 28); assert.equal(UPGRADES[27], relamp);
  for (const seed of SEEDS.slice(0, 8)) {
    const w = makeWorld('first', seed), id = lamppostRoom(seed), at = postIn(w.elsewhere[id].room.map);
    assert.ok(at, `${seed}: a new journey has it`);
    const bare = { ...w.elsewhere[id], room: { ...w.elsewhere[id].room, map: w.elsewhere[id].room.map.map((l) => l.replace('b', '.')) } };
    const up = relamp({ ...w, elsewhere: { ...w.elsewhere, [id]: bare } });
    assert.deepEqual(up.elsewhere[id].room.map, w.elsewhere[id].room.map, `${seed}: unseen gets it`);
    assert.deepEqual(relamp(up).elsewhere[id].room.map, up.elsewhere[id].room.map, 'never two');
    const seen = { ...bare, seen: [1] };
    assert.deepEqual(relamp({ ...w, elsewhere: { ...w.elsewhere, [id]: seen } }).elsewhere[id], seen, 'seen stays');
    const taken = { ...bare, taken: [{ x: 1, y: 1 }] };
    assert.deepEqual(relamp({ ...w, elsewhere: { ...w.elsewhere, [id]: taken } }).elsewhere[id], taken, 'taken from stays');
  }
});
