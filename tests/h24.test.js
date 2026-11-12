// § H-24's three risks (D-869): a boulder never grows back on a waystone's ring; a drop with no
// open tile beside it looks further out; dev Spawn never puts a thing or a wall on a person
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, tileAt, withTile } from '../src/core/room.js';
import { makeState } from '../src/core/turn.js';
import { regrow } from '../src/core/regrow.js';
import { spread } from '../src/core/spread.js';
import { spawn } from '../src/core/spawn.js';
import { get } from '../src/core/registry.js';
import { DAY_TURNS } from '../src/core/daytime.js';

// An open 15 × 13 room with a waystone in the middle of its right half, at 10, 6
const box = (inner) => Array.from({ length: 13 }, (_, y) => (y === 0 || y === 12 ? '#'.repeat(15) : '#' + inner(y) + '#'));
const stoneRoom = makeRoom(box((y) => '.'.repeat(8) + ({ 5: 'YXY', 6: 'XZX', 7: 'YXY' }[y] || '...') + '..'));
// A deposit broken at 6, 6, 3 days ago: where it grows back over many seeds
const grownAt = (place) => Array.from({ length: 60 }, (_, i) => {
  const s = { ...makeState(stoneRoom), hero: { x: 1, y: 11 }, place, seed: i + 1, taken: [{ id: 'deposit', x: 6, y: 6, at: 0 }], turn: 3 * DAY_TURNS };
  const g = regrow(s, true).room;
  return g.map.flatMap((row, y) => [...row].flatMap((ch, x) => (ch === 'O' ? [{ x, y }] : [])))[0];
});

test('in a generated room a boulder grows back off the 2 tiles kept open round the waystone', () => {
  const xs = grownAt(undefined).map((t) => t.x);
  assert.ok(xs.every((x) => x <= 6), xs.join());
});

test('round the home waystone it keeps off 1 tile, so it may grow back 2 from the stone', () => {
  const xs = grownAt('woods').map((t) => t.x);
  assert.ok(xs.every((x) => x <= 7), xs.join());
  assert.ok(xs.includes(7), 'some on the tile 2 from the stone');
});

test('a drop with only water round it lies on the nearest open tile further out, not on the water', () => {
  const pond = makeRoom(box((y) => (y >= 4 && y <= 8 ? '...~~~~~.....' : '.'.repeat(13))));
  const s = { ...makeState(withTile(pond, 6, 6, get('bareBush'))), hero: { x: 1, y: 11 }, items: [], enemies: [], people: [] };
  const [at] = spread(s, 6, 6, 1, true);
  assert.equal(tileAt(s.room, at.x, at.y).solid, false, JSON.stringify(at));
  assert.equal(Math.max(Math.abs(at.x - 6), Math.abs(at.y - 6)), 3);
});

test('Spawn puts no item, creature or wall on a person, and floor still goes there', () => {
  const s = { ...makeState(stoneRoom), hero: { x: 1, y: 11 }, people: [{ id: 'peddler', x: 3, y: 3 }] };
  for (const id of ['oilcap', 'rat', 'wall']) assert.equal(spawn(s, id, 3, 3), s, id);
  assert.notEqual(spawn(s, 'oilcap', 4, 3), s, 'beside them it still can');
});
