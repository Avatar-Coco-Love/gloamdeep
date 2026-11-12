// § glow lamp: Make on a Glow Gland turns 1 with 1 Wood into a Glow Lamp; set down the
// torch's way, on its stone foot, it lights 3 tiles in steady green for 300 turns (D-808)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, tileAt } from '../src/core/room.js';
import { makeState, makeFrom, setDown, wait } from '../src/core/turn.js';
import { setOil } from '../src/core/oil.js';
import { bagAdd } from '../src/core/bag.js';
import { lightsNow } from '../src/core/sight.js';
import { mountAt } from '../src/core/mount.js';
import { shownLine } from '../src/core/lines.js';
import { get } from '../src/core/registry.js';

const ROOM = ['######', '#....#', '#....#', '#....#', '######'];
const inside = (bag) => ({ ...setOil(makeState(makeRoom(ROOM), { x: 2, y: 2 }), 0.5), bag });
const lampDown = () => setDown(inside([{ id: 'glowLamp', n: 1 }]), 0, 'right');

test('1 glow gland and 1 wood make a glow lamp, passing a turn', () => {
  const n = makeFrom(inside([{ id: 'glowGland', n: 2 }, { id: 'wood', n: 1 }]), 'glowGland');
  assert.deepEqual(n.bag, [{ id: 'glowGland', n: 1 }, { id: 'glowLamp', n: 1 }]);
  assert.equal(n.turn, 1);
  assert.equal(shownLine(n).text, 'You make a glow lamp.');
  const few = inside([{ id: 'glowGland', n: 3 }]);
  assert.equal(makeFrom(few, 'glowGland'), few); // no wood: dim
});

test('glow lamps stack 5 to a slot', () => {
  assert.equal(get('glowLamp').max, 5);
  assert.deepEqual(bagAdd([{ id: 'glowLamp', n: 4 }], 'glowLamp'), [{ id: 'glowLamp', n: 5 }]);
});

test('set down, it stands on the torch foot, lit green and steady, 3 tiles', () => {
  const n = lampDown(), e = get('glowLampLight');
  assert.equal(tileAt(n.room, 3, 2).id, 'torchStand');
  assert.deepEqual(n.lights, [{ id: 'glowLampLight', x: 3, y: 2, out: 301 }]);
  assert.deepEqual(n.bag, []);
  assert.equal(shownLine(n).text, 'You set down the glow lamp.');
  assert.equal(mountAt(n.room, 3, 2), 'stand');
  assert.equal(e.reach, 3); assert.equal(e.flicker, 0);
  assert.ok(e.cg > e.cr && e.cg > e.cb); // green
  assert.ok(lightsNow(n).some((l) => l.x === 3 * 16 + 8 && l.y === 2 * 16 + 7 && l.r === 3 * 16));
});

test('it glows 300 turns, then goes dark, leaving bare floor, with its line', () => {
  let n = lampDown();
  for (let i = 0; i < 299; i++) n = wait(n);
  assert.equal(n.lights.length, 1);
  n = wait(n);
  assert.equal(n.lights.length, 0);
  assert.equal(tileAt(n.room, 3, 2).id, 'floor');
  assert.equal(shownLine(n).text, 'Your glow lamp goes dark.');
});
