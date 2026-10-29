// § camera: the hero in the middle, stopping 1½ tiles past the room's edges (src/core/camera.js, D-195, D-381, D-441)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cameraAt, MARGIN } from '../src/core/camera.js';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';

const W = 176, H = 208; // the screen, 11 × 13 tiles
const big = { cols: 17, rows: 20 };
const at = (room, tx, ty) => cameraAt(tx * 16, ty * 16, room, W, H);

test('a room that fits the screen with its margins never moves (D-441)', () => {
  const room = makeRoom(FIRST_ROOM), w = room.cols * 16 + 2 * MARGIN, h = room.rows * 16 + 2 * MARGIN;
  for (const [x, y] of [[1, 1], [5, 6], [9, 11]]) assert.deepEqual(cameraAt(x * 16, y * 16, room, w, h), { x: -MARGIN, y: -MARGIN });
});

test('in a big room the hero stands on the middle tile of the screen', () => {
  const cam = at(big, 8, 10);
  assert.deepEqual(cam, { x: 8 * 16 - 5 * 16, y: 10 * 16 - 6 * 16 });
});

test('the camera stops 1½ tiles past the room edges (D-441)', () => {
  assert.equal(MARGIN, 24);
  assert.deepEqual(at(big, 1, 1), { x: -MARGIN, y: -MARGIN });
  assert.deepEqual(at(big, 15, 18), { x: (17 - 11) * 16 + MARGIN, y: (20 - 13) * 16 + MARGIN });
  assert.deepEqual(at(big, 4, 7), { x: -16, y: 16 }); // near the left wall, past the edge but not yet at the stop
});

test('the camera glides with the hero between tiles', () => {
  assert.deepEqual(cameraAt(8 * 16 + 5, 10 * 16 + 3, big, W, H), { x: 3 * 16 + 5, y: 4 * 16 + 3 });
});

test('a room narrower than the screen sits in the middle and never moves sideways (D-381)', () => {
  const wide = 368, tall = 176; // a sideways phone, 23 × 11 tiles
  for (const [x, y] of [[1, 1], [9, 11]]) {
    const cam = cameraAt(x * 16, y * 16, makeRoom(FIRST_ROOM), wide, tall);
    assert.equal(cam.x, Math.floor((176 - wide) / 2));
    assert.equal(cam.y, Math.max(-MARGIN, Math.min(208 + MARGIN - tall, y * 16 + 8 - tall / 2)));
  }
});

test('the camera stays on whole pixels on a screen an odd number of pixels wide or tall (D-434)', () => {
  for (const [w, h] of [[211, 97], [177, 209], [175, 97]]) {
    for (let p = 0; p < 20 * 16; p += 3) {
      const cam = cameraAt(p, p, big, w, h);
      assert.ok(Number.isInteger(cam.x) && Number.isInteger(cam.y), `${w} × ${h} at ${p}: ${cam.x}, ${cam.y}`);
    }
  }
});
