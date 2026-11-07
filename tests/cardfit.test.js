// § card fit: on a 4:3 or near-square screen held sideways, a card open in play is drawn
// smaller, so its wide layout fits (D-671, D1 of D-660's findings)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cardZoom, CARD_W, TILE, VIEW_ROWS } from '../src/render/screen.js';

globalThis.devicePixelRatio = 1;
const play = (bw, bh) => Math.floor(Math.min(bw, bh) / (VIEW_ROWS * TILE)); // play's whole-pixel zoom at dpr 1

test('a 4:3 or near-square screen gets a card at least CARD_W game pixels wide, in whole pixels', () => {
  for (const [bw, bh] of [[1024, 768], [900, 820], [1280, 1024], [800, 600]]) {
    const z = cardZoom(play(bw, bh), bw, bh);
    assert.ok(Number.isInteger(z) && z >= 2, `${bw}×${bh}: zoom ${z}`);
    assert.ok(bw / z >= CARD_W, `${bw}×${bh}: ${Math.floor(bw / z)} game pixels wide`);
    assert.ok(z < play(bw, bh), `${bw}×${bh}: smaller than play`);
  }
});

test('a phone held sideways or upright, and an upright tablet, keep play\'s size', () => {
  for (const [bw, bh] of [[844, 390], [740, 360], [390, 844], [768, 1024]]) assert.equal(cardZoom(play(bw, bh), bw, bh), play(bw, bh), `${bw}×${bh}`);
});
