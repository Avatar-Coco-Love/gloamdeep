// § wrench: on a phone so narrow that the hearts and oil panel at its widest would come
// within 8 px of the dev wrench, the wrench stands under pause instead (D-682, D3 of D-660's findings)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wrenchLow, BUTTON, BUTTON_GAP, MAP_DISC } from '../src/render/screen.js';

const wrenchX = (bw) => bw - BUTTON_GAP - MAP_DISC - BUTTON_GAP - BUTTON - BUTTON_GAP - BUTTON; // its usual left edge

test('a 320 px wide phone puts the wrench under pause, at any pixel ratio', () => {
  for (const dpr of [1, 2, 3]) {
    globalThis.devicePixelRatio = dpr;
    assert.ok(wrenchLow(wrenchX(320), 0, 320, 568), `dpr ${dpr}`);
  }
});

test('wider phones, phones held sideways and tablets keep the wrench left of pause', () => {
  for (const dpr of [1, 2, 3]) {
    globalThis.devicePixelRatio = dpr;
    for (const [bw, bh] of [[360, 640], [375, 667], [390, 844], [412, 915], [568, 320], [844, 390], [768, 1024], [1280, 800]]) {
      assert.ok(!wrenchLow(wrenchX(bw), 0, bw, bh), `${bw}×${bh}, dpr ${dpr}`);
    }
  }
});
