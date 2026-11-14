// § flyers into trees (D-900, D-922): a hurt lampmoth or bat fleeing, or one at dawn, goes into an
// inner tree beside it and vanishes; the first chop drives it out beside the tree, stirring
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, withTile } from '../src/core/room.js';
import { makeState, step, wait, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { leaveByLight } from '../src/core/nightfall.js';
import { ROUND_HOME } from '../src/core/hearthwood.js';
import { roostsOf, driveOut } from '../src/core/roost.js';

// The first room with a tree at 6,8, the hero at 5,11
const wood = withTile(makeRoom(FIRST_ROOM), 6, 8, get('tree'));
const at = (enemies, more = {}) => ({ ...makeState(wood, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies, ...more });

test('the lampmoth and the bat roost; the lure wisp does not', () => {
  for (const id of ['lampmoth', 'bat']) assert.ok(get(id).roosts, id);
  assert.ok(!get('lureWisp').roosts);
});

test('a hurt bat fleeing, a tree beside it, goes into the tree', () => {
  const s = wait(at([{ id: 'bat', x: 5, y: 8, flees: 4, health: 1 }]));
  assert.deepEqual(s.enemies, []);
  assert.deepEqual(roostsOf(s.room).map(({ x, y, e }) => [x, y, e.id, e.health, e.flees]), [[6, 8, 'bat', 1, undefined]]);
  assert.ok(s.events.some((e) => e.type === 'roost' && e.id === 'bat'));
});

test('one not fleeing, or a lure wisp, stays out', () => {
  for (const e of [{ id: 'bat', x: 5, y: 8 }, { id: 'lureWisp', x: 5, y: 8, flees: 4 }]) {
    assert.equal(roostsOf(wait(at([e])).room).length, 0, e.id);
  }
});

test('never into an edge tree, and one flyer a tree', () => {
  const edge = withTile(makeRoom(FIRST_ROOM), 0, 8, get('tree'));
  const s = wait({ ...at([{ id: 'bat', x: 1, y: 8, flees: 4 }]), room: edge });
  assert.equal(roostsOf(s.room).length, 0);
  const two = wait(at([{ id: 'bat', x: 5, y: 8, flees: 4 }, { id: 'bat', x: 7, y: 8, flees: 4 }]));
  assert.equal(roostsOf(two.room).length, 1);
  assert.equal(two.enemies.length, 1);
});

test('the first chop drives it out beside the tree, nearest the hero, stirring', () => {
  const s = { ...at([]), hero: { x: 6, y: 10 }, room: { ...wood, roosts: [{ x: 6, y: 8, e: { id: 'bat', facing: 'left' } }] } };
  const chopped = step({ ...s, hero: { x: 6, y: 9 } }, 'up');
  assert.equal(roostsOf(chopped.room).length, 0);
  assert.equal(chopped.enemies.length, 1);
  const bat = chopped.enemies[0];
  assert.equal(bat.id, 'bat');
  assert.equal(Math.abs(bat.x - 6) + Math.abs(bat.y - 8), 1);
  assert.ok(chopped.events.some((e) => e.type === 'unroost'));
  assert.equal(chopped.room.chips['6,8'], 1);
});

test('with no free tile it stays in, and a felled tree lets it out onto the stump', () => {
  let room = { ...wood, roosts: [{ x: 6, y: 8, e: { id: 'bat' } }] };
  for (const [x, y] of [[5, 8], [7, 8], [6, 7]]) room = withTile(room, x, y, get('tree'));
  const s = { ...at([]), hero: { x: 6, y: 9 }, room };
  assert.equal(driveOut(s, 6, 8), s);
  const out = driveOut(s, 6, 8, true);
  assert.deepEqual(out.enemies.map(({ x, y }) => [x, y]), [[6, 8]]);
});

test('at dawn a night flyer beside a tree goes into it instead of going', () => {
  const s = { ...at([{ id: 'bat', x: 5, y: 8, night: true }, { id: 'lampmoth', x: 2, y: 2, night: true }]), place: ROUND_HOME[0], turn: 290 };
  const next = leaveByLight(s);
  assert.deepEqual(next.enemies, []);
  assert.deepEqual(roostsOf(next.room).map(({ e }) => e.id), ['bat']);
});

test('driven out by day, it keeps to the day', () => {
  const s = { ...at([]), hero: { x: 6, y: 10 }, turn: 100, room: { ...wood, roosts: [{ x: 6, y: 8, e: { id: 'bat', night: true } }] } };
  const out = driveOut(s, 6, 8);
  assert.equal(out.enemies[0].night, undefined);
  assert.ok(out.enemies[0].stirs);
});
