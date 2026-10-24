// § deposit: three boulders in each Cave room, depths 2 to 4, solid but
// letting light over them, never cutting a room in two (D-311)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeFor, makeRoom, tileAt, FIRST_ROOM, withTile } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';
import { get } from '../src/core/registry.js';
import { makeState, step } from '../src/core/turn.js';
import { clearLine } from '../src/core/sight.js';
import { markAt } from '../src/core/map.js';
import { look } from '../src/core/turn.js';
import { LINES } from '../src/core/lines.js';
import { readJourney, journeyText } from '../src/core/save.js';

const SEEDS = Array.from({ length: 40 }, (_, i) => i + 1);
const deposits = (map) => map.flatMap((row, y) => [...row].flatMap((ch, x) => (ch === 'O' ? [{ x, y }] : [])));

// Every tile the hero could stand on, joined or not
function joined(room) {
  const open = [];
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) if (!tileAt(room, x, y).solid) open.push({ x, y });
  const seen = new Set([`${open[0].x},${open[0].y}`]), queue = [open[0]];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = { x: t.x + dx, y: t.y + dy }, k = `${n.x},${n.y}`;
      if (n.x < 0 || n.y < 0 || n.x >= room.cols || n.y >= room.rows || tileAt(room, n.x, n.y).solid || seen.has(k)) continue;
      seen.add(k); queue.push(n);
    }
  }
  return seen.size === open.length;
}

test('every Cave room holds 3 deposits, off the edge and clear of what lies, stands or starts there', () => {
  for (const seed of SEEDS) for (const depth of [2, 3, 4]) for (const { id } of layoutAt(seed, depth).cells) {
    const p = placeFor(id, seed), found = deposits(p.map), room = makeRoom(p.map);
    assert.equal(found.length, 3, `seed ${seed}, ${id}`);
    for (const d of found) {
      assert.ok(d.x > 0 && d.y > 0 && d.x < room.cols - 1 && d.y < room.rows - 1);
      assert.ok(![p.start, ...p.items, ...p.enemies].some((o) => o.x === d.x && o.y === d.y));
    }
    assert.ok(joined(room), `seed ${seed}, ${id} is cut in two`);
  }
});

test('warrens, the dungeon and the hand-made rooms hold none', () => {
  for (const seed of SEEDS.slice(0, 10)) for (const depth of [5, 8]) {
    assert.equal(deposits(placeFor(`depth${depth}`, seed).map).length, 0);
  }
  for (const id of ['first', 'second', 'south']) assert.equal(deposits(placeFor(id, 1).map).length, 0);
});

test('the same seed gives the same deposits', () => {
  assert.deepEqual(placeFor('depth3', 4127).map, placeFor('depth3', 4127).map);
});

test('a deposit is a solid tile the hero bumps against, staying put, and light passes over it', () => {
  const entry = get('deposit');
  assert.equal(entry.kind, 'tile');
  assert.equal(entry.solid, true);
  assert.equal(entry.blocksLight, false);
  // The hero starts at 5,11 in the first room; a deposit on 5,10 is just above.
  const room = withTile(makeRoom(FIRST_ROOM), 5, 10, entry), s = { ...makeState(room), hero: { x: 5, y: 11 } };
  const n = step(s, 'up');
  assert.deepEqual(n.hero, { x: 5, y: 11 });
  assert.equal(n.turn, s.turn + 1); // a bump mines it, a turn (O2)
  assert.ok(clearLine(room, { x: 5, y: 11 }, { x: 5, y: 9 }));
});

test('the map outlines a deposit, as it does a wall', () => {
  const room = withTile(makeRoom(FIRST_ROOM), 5, 10, get('deposit'));
  assert.equal(markAt(room, null, 5, 10), 'wall');
});

// § mining: three bumps break a deposit, a turn each, and a stone goes into the bag (O2)
const beside = (bag = []) => {
  const room = withTile(makeRoom(FIRST_ROOM), 5, 10, get('deposit'));
  return { ...makeState(room), hero: { x: 5, y: 11 }, bag };
};
const shown = (s) => (LINES[s.line.id].texts ? LINES[s.line.id].texts[s.line.i] : LINES[s.line.id].text);

test('the first two bumps chip and crack it, a turn each, and it stands', () => {
  const one = step(beside(), 'up'), two = step(one, 'up');
  assert.equal(one.turn, 1); assert.equal(two.turn, 2);
  assert.equal(shown(one), 'You chip at the boulder.');
  assert.equal(shown(two), 'The boulder cracks.');
  assert.equal(tileAt(two.room, 5, 10).id, 'deposit');
  assert.deepEqual(two.hero, { x: 5, y: 11 });
  assert.deepEqual(two.events.filter((e) => e.type === 'chip'), [{ type: 'chip', id: 'deposit', n: 2 }]);
});

test('the third bump breaks it to floor and a stone goes into the bag, with its lines in turn', () => {
  let s = beside();
  for (let i = 0; i < 3; i++) s = step(s, 'up');
  assert.equal(s.turn, 3);
  assert.equal(tileAt(s.room, 5, 10).id, 'floor');
  assert.deepEqual(s.bag, [{ id: 'stone', n: 1 }]);
  assert.equal(shown(s), 'The boulder breaks. You take a stone.');
  assert.ok(s.events.some((e) => e.type === 'take' && e.id === 'stone'));
  assert.deepEqual(s.room.chips, {});
  assert.equal(get('stone').name, 'Stone');
  assert.equal(shown(look(s, 0)), 'A plain stone, for crafting later.');
});

test('with 3 stones carried, the third bump holds, free, with its line', () => {
  let s = beside([{ id: 'stone', n: 3 }]);
  for (let i = 0; i < 3; i++) s = step(s, 'up');
  assert.equal(s.turn, 2);
  assert.equal(tileAt(s.room, 5, 10).id, 'deposit');
  assert.equal(shown(s), "You can't carry more stones.");
  assert.deepEqual(s.bag, [{ id: 'stone', n: 3 }]);
});

test('each deposit keeps its own bumps, and a saved journey keeps them', () => {
  const room = withTile(withTile(makeRoom(FIRST_ROOM), 5, 10, get('deposit')), 6, 11, get('deposit'));
  let s = { ...makeState(room), hero: { x: 5, y: 11 } };
  s = step(step(s, 'up'), 'right');
  assert.deepEqual(s.room.chips, { '5,10': 1, '6,11': 1 });
  assert.deepEqual(readJourney(journeyText(s)).state.room.chips, s.room.chips);
});
