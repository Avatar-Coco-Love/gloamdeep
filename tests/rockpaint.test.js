// § rock paint: each tile's walls worked out once, not for every pixel (S1 of D-660's findings, D-685).
// The fingerprints are of the pictures painted before that change, so any changed pixel fails.
// Seeds 11 and 42 at depth 2 were taken again at 0.3.321, as their rooms now hold a pool (H-08, D-876).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { makeWorld } from '../src/core/turn.js';
import { goToDepth } from '../src/core/stairs.js';
import { drawRock, drawRockBeyond } from '../src/render/rock.js';

const canvas = () => ({ createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }), putImageData(img) { this.img = img; } });
const print = (img) => createHash('sha1').update(img.data).digest('hex').slice(0, 16);

const PRINTS = { // seed and depth: the room's look, its own rock, its rock beyond the edge
  '7 2': 'rock 42b7b05f547121e2 ca8617041c57269a', '7 3': 'rock f1eb530e4bb66c2e 4985e401605bd98c',
  '7 5': 'earth 5e1490dab6a38702 c487abb500d939be', '7 6': 'earth 76c47bb62314b00b 143e8126848c1bfa',
  '11 2': 'rock 96a67030baee61e9 89148dbec73e12f9', '11 3': 'rock eb061cf2fc2608bd be97009da075f6c1',
  '11 5': 'earth a4bfc675e46a7659 15a00a27f0168a15', '11 6': 'earth f45f6caa116f7fd9 6b3dffb12bb88dd8',
  '42 2': 'rock d2c2b5797587450e 48bf9b3997548f2d', '42 3': 'rock 97d9889016c2da2c a5826aeddd7c95e4',
  '42 5': 'earth 7173fbe4a931c5d0 c337a53e3d3391de', '42 6': 'earth 777dee326edc99aa 50332e90abba4a41',
};
test('rock and earth rooms are painted pixel for pixel as before', () => {
  const got = {};
  for (const seed of [7, 11, 42]) for (const depth of [2, 3, 5, 6, 8]) {
    const room = goToDepth(makeWorld('first', seed), depth).room;
    if (room.look !== 'rock' && room.look !== 'earth') continue;
    const own = canvas(), beyond = canvas();
    drawRock(own, room); drawRockBeyond(beyond, room, 3, 2);
    got[`${seed} ${depth}`] = `${room.look} ${print(own.img)} ${print(beyond.img)}`;
  }
  assert.ok(Object.values(got).some((v) => v.startsWith('rock')) && Object.values(got).some((v) => v.startsWith('earth')));
  assert.deepEqual(got, PRINTS);
});
