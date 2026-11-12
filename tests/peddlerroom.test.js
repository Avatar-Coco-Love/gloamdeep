// § peddler room: his tile, sealed in his ring of rubble, is left out of the check that a room
// stays joined, so a torch, a glow lamp, a deposit growing back and a flask mimic go there as in
// any room (H-09, D-873)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, placeFor, peddlerRoom, mimicRooms, PEDDLER_DEPTH } from '../src/core/room.js';
import { makeState, setSides } from '../src/core/turn.js';
import { joined, ringed } from '../src/core/regrow.js';

// A room with a person ringed in by rubble at 4,3, the hero at 2,1
const ROOM = ['#########', '#.......#', '#..UUU..#', '#..U.U..#', '#..UUU..#', '#.......#', '#########'];
const him = { id: 'peddler', x: 4, y: 3 };
const there = (people, id = 'bagTorch') => ({ ...makeState(makeRoom(ROOM), { x: 2, y: 1 }), people, bag: [{ id, n: 1 }] });

test('his sealed tile does not cut the room in two while he is ringed in', () => {
  const room = makeRoom(ROOM);
  assert.equal(joined(room), false);
  assert.equal(joined(room, ringed([him])), true);
  assert.deepEqual(ringed([him, { ...him, leaves: 9 }, { ...him, home: true }]), [him]); // freed or home, no longer
});

test('a torch and a glow lamp go down in his room', () => {
  assert.deepEqual(setSides(there([]), 0), []); // with no one to leave out, the room is cut
  assert.deepEqual(setSides(there([him]), 0), ['down', 'left', 'right']);
  assert.deepEqual(setSides(there([him], 'glowLamp'), 0), ['down', 'left', 'right']);
});

test('a set-down that would seal another tile is still refused', () => {
  const nook = ['#####', '#.###', '#...#', '#####'], s = { ...makeState(makeRoom(nook), { x: 2, y: 2 }), people: [], bag: [{ id: 'bagTorch', n: 1 }] };
  assert.deepEqual(setSides(s, 0), ['right']); // left would seal 1,1 in its nook; up is wall
});

test('his room never counts as cut in two, and holds a flask mimic when the seed picks it', () => {
  let mimics = 0;
  for (let seed = 1; seed <= 40; seed++) {
    const id = peddlerRoom(seed), p = placeFor(id, seed);
    assert.ok(joined(makeRoom(p.map), ringed(p.people)), `seed ${seed}`);
    const mimic = p.enemies.find((e) => e.id === 'flaskMimic');
    assert.equal(!!mimic, mimicRooms(seed, PEDDLER_DEPTH).includes(id), `seed ${seed}`);
    if (mimic) { mimics++; assert.ok(Math.abs(mimic.x - p.people[0].x) > 1 || Math.abs(mimic.y - p.people[0].y) > 1); }
  }
  assert.ok(mimics > 0);
});
