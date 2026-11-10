// § miners' camp (D-770, the second landmark): one a seed, 3 × 2, in a mountain room, never the
// campfire's or the lamppost's; solid, light passing it; bumped, Take the pick?, No picked; Yes
// puts the Stone Pick in the bag and the camp turns bare; bare, its words, free
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';
import { makeRoom, SKY, PLACES, tileAt } from '../src/core/room.js';
import { makeState, step, takeDown, panelBeside, makeWorld } from '../src/core/turn.js';
import { TAKE_ASKS } from '../src/core/menu.js';
import { campRoom, campTiles, IN } from '../src/core/camp.js';
import { campfireOf } from '../src/core/campfire.js';
import { lamppostRoom } from '../src/core/lamppost.js';
import { ROOMS, isMountain } from '../src/core/hearthwood.js';
import { joinedFrom, depthIn } from '../src/core/woods.js';
import { recamp } from '../src/core/recamp.js';
import { FORMAT, UPGRADES } from '../src/core/save.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i * 7919 + 3);
const cornerIn = (map) => { for (let y = 0; y < map.length; y++) { const x = map[y].indexOf('c'); if (x >= 0) return { x, y }; } return null; };
const CAMP = ['TTTTTTT', 'T...ccc', 'T...ccc', 'TTTTTTT'];

test("the Miners' camp is in the registry, both its tiles solid, light passing them, with its words", () => {
  for (const id of ['minersCamp', 'minersCampBare']) {
    const t = get(id);
    assert.equal(t.name, "Miners' camp"); assert.equal(t.kind, 'tile');
    assert.equal(t.solid, true); assert.equal(t.blocksLight, false);
  }
  assert.equal(get('minersCamp').letter, 'c'); assert.equal(get('minersCampBare').letter, 'd');
  assert.equal(LINES.minersCamp.text, "A miners' camp, long left.");
  assert.deepEqual(TAKE_ASKS.minersCamp, ['Take the pick?', 'An old pick leans on the crate.']);
  assert.deepEqual(get('minersCamp').takes, { item: 'pick', into: 'minersCampBare', says: 'campPickTaken' });
});

test('one camp a seed, 3 × 2, in a mountain room, never the campfire\'s or the lamppost\'s, on open grass, never cutting the room', () => {
  const rooms = new Set();
  for (const seed of SEEDS) {
    const room = campRoom(seed);
    rooms.add(room);
    assert.ok(isMountain(room), `${seed}`);
    assert.notEqual(room, campfireOf(seed).room, `${seed}`); assert.notEqual(room, lamppostRoom(seed), `${seed}`);
    for (const id of ROOMS) {
      const made = PLACES[id].make(null, seed), at = cornerIn(made.map);
      if (id !== room) { assert.equal(at, null, `${seed} ${id}`); continue; }
      assert.ok(at, `${seed} ${id}: it fits`);
      const tiles = campTiles(at.x, at.y);
      assert.equal(made.map.join('').split('c').length - 1, 6, `${seed}: its 6 tiles`);
      for (const t of tiles) {
        assert.equal(made.map[t.y][t.x], 'c');
        assert.ok(depthIn(t.x, t.y) >= IN);
        assert.ok(!(t.x === made.start.x && t.y === made.start.y));
        assert.ok(!made.items.some((it) => it.x === t.x && it.y === t.y));
      }
      assert.ok(joinedFrom(made.map.map((l) => l.split('')), made.start));
    }
  }
  assert.equal(rooms.size, 3);
});

test('bumped, it says its first words and opens Take the pick?, free', () => {
  const s = makeState(makeRoom(CAMP, SKY, 'woods'), { x: 3, y: 1 });
  assert.deepEqual(panelBeside(s, 'right'), { x: 4, y: 1 });
  assert.equal(get('minersCamp').says, 'minersCamp');
  const one = step(s, 'right');
  assert.equal(one.turn, s.turn); assert.deepEqual([one.hero.x, one.hero.y], [3, 1]);
});

test('Yes puts the Stone Pick in the bag and every tile of the camp turns bare, in a turn, with its line', () => {
  const s = makeState(makeRoom(CAMP, SKY, 'woods'), { x: 3, y: 1 }), n = takeDown(s, 4, 2);
  assert.deepEqual(n.bag, [{ id: 'pick', n: 1 }]);
  for (const t of campTiles(4, 1)) assert.equal(tileAt(n.room, t.x, t.y).id, 'minersCampBare');
  assert.equal(n.turn, s.turn + 1);
  assert.equal(shownLine(n).text, 'You take the old pick.');
  assert.ok(n.events.some((e) => e.type === 'take' && e.id === 'pick'));
});

test('with a pick already carried, in the bag or held, or the bag full, it says so, free, and keeps its pick', () => {
  const s = makeState(makeRoom(CAMP, SKY, 'woods'), { x: 3, y: 1 });
  for (const [had, line] of [[{ bag: [{ id: 'pick', n: 1 }] }, 'You already carry a stone pick.'], [{ tool: 'pick' }, 'You already carry a stone pick.'],
    [{ bag: Array.from({ length: 6 }, () => ({ id: 'flask', n: 5 })) }, 'Your bag is full.']]) {
    const n = takeDown({ ...s, ...had }, 4, 1);
    assert.equal(n.turn, s.turn); assert.equal(n.room, s.room);
    assert.equal(shownLine(n).text, line);
  }
});

test('bare, a bump says its words, free, with no card', () => {
  const s = makeState(makeRoom(['TTTTTTT', 'T...ddd', 'T...ddd', 'TTTTTTT'], SKY, 'woods'), { x: 3, y: 1 });
  assert.equal(panelBeside(s, 'right'), null);
  const one = step(s, 'right');
  assert.equal(one.turn, s.turn);
  assert.equal(shownLine(one).text, "A miners' camp, long left.");
});

test('an older save gets it in its room when unseen and untouched; a seen room stays (D-266)', () => {
  assert.equal(FORMAT, 29); assert.equal(UPGRADES[28], recamp);
  for (const seed of SEEDS.slice(0, 8)) {
    const w = makeWorld('first', seed), id = campRoom(seed);
    assert.ok(cornerIn(w.elsewhere[id].room.map), `${seed}: a new journey has it`);
    const bare = { ...w.elsewhere[id], room: { ...w.elsewhere[id].room, map: w.elsewhere[id].room.map.map((l) => l.replaceAll('c', '.')) } };
    const up = recamp({ ...w, elsewhere: { ...w.elsewhere, [id]: bare } });
    assert.deepEqual(up.elsewhere[id].room.map, w.elsewhere[id].room.map, `${seed}: unseen gets it`);
    assert.deepEqual(recamp(up).elsewhere[id].room.map, up.elsewhere[id].room.map, 'never two');
    const seen = { ...bare, seen: [1] };
    assert.deepEqual(recamp({ ...w, elsewhere: { ...w.elsewhere, [id]: seen } }).elsewhere[id], seen, 'seen stays');
    const taken = { ...bare, taken: [{ x: 1, y: 1 }] };
    assert.deepEqual(recamp({ ...w, elsewhere: { ...w.elsewhere, [id]: taken } }).elsewhere[id], taken, 'taken from stays');
  }
});
