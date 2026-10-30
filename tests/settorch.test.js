// § set torch: Make on Moth Dust turns 1 with 1 Wood into a torch; set down beside the
// hero anywhere, the bench's way, it lights 3 tiles and burns 100 turns, then goes out (D-478)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, tileAt } from '../src/core/room.js';
import { makeState, craft, setDown, setSides, step, wait } from '../src/core/turn.js';
import { endTurn } from '../src/core/endturn.js';
import { setOil } from '../src/core/oil.js';
import { canCraft, bagAdd } from '../src/core/bag.js';
import { lightsNow } from '../src/core/sight.js';
import { mountAt } from '../src/core/mount.js';
import { shownLine } from '../src/core/lines.js';
import { get } from '../src/core/registry.js';

// A small room under a roof, the hero at 2,2
const ROOM = ['######', '#....#', '#....#', '#....#', '######'];
const inside = (bag) => ({ ...setOil(makeState(makeRoom(ROOM), { x: 2, y: 2 }), 0.5), bag });
const torchDown = () => setDown(inside([{ id: 'bagTorch', n: 1 }]), 0, 'right');

test('1 moth dust and 1 wood make a torch, passing a turn', () => {
  const n = craft(inside([{ id: 'mothDust', n: 2 }, { id: 'wood', n: 1 }]), 0);
  assert.deepEqual(n.bag, [{ id: 'mothDust', n: 1 }, { id: 'bagTorch', n: 1 }]);
  assert.equal(n.turn, 1);
  assert.equal(shownLine(n).text, 'You make a torch.');
  assert.equal(canCraft([{ id: 'mothDust', n: 3 }], 0), false); // no wood: dim
});

test('torches stack 5 to a slot', () => {
  assert.equal(get('bagTorch').max, 5);
  assert.deepEqual(bagAdd([{ id: 'bagTorch', n: 4 }], 'bagTorch'), [{ id: 'bagTorch', n: 5 }]);
});

test('it goes down under a roof too, beside the hero, lit, passing a turn', () => {
  assert.deepEqual(setSides(inside([{ id: 'bagTorch', n: 1 }]), 0), ['up', 'down', 'left', 'right']);
  const n = torchDown();
  assert.equal(tileAt(n.room, 3, 2).id, 'torchStand');
  assert.deepEqual(n.lights, [{ id: 'torch', x: 3, y: 2, out: 101 }]);
  assert.deepEqual(n.bag, []);
  assert.equal(n.turn, 1);
  assert.equal(shownLine(n).text, 'You set down the torch.');
  assert.equal(mountAt(n.room, 3, 2), 'stand');
  assert.ok(lightsNow(n).some((l) => l.x === 3 * 16 + 8 && l.y === 2 * 16 + 7 && l.r === 3 * 16));
});

test('set down, it blocks the way', () => {
  const n = torchDown(), bump = step(n, 'right');
  assert.deepEqual(bump.hero, { x: 2, y: 2 });
  assert.equal(bump.turn, n.turn);
});

test('it burns 100 turns, then goes out, leaving bare floor, with its line', () => {
  let n = torchDown();
  for (let i = 0; i < 99; i++) n = wait(n);
  assert.equal(n.turn, 100);
  assert.equal(n.lights.length, 1);
  n = wait(n);
  assert.equal(n.lights.length, 0);
  assert.equal(tileAt(n.room, 3, 2).id, 'floor');
  assert.equal(shownLine(n).text, 'Your torch burns out.');
});

test('in a room just come into, one due is already out, with no line', () => {
  const before = { ...torchDown(), place: 'away' }, after = { ...before, turn: 200, place: 'first' };
  const n = endTurn(before, after);
  assert.equal(n.lights.length, 0);
  assert.equal(tileAt(n.room, 3, 2).id, 'floor');
  assert.notEqual(shownLine(n)?.text, 'Your torch burns out.');
});
