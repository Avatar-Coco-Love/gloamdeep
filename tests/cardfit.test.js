// § card fit: on a 4:3 or near-square screen held sideways, a card open in play is drawn
// smaller, so its wide layout fits (D-671, D1 of D-660's findings); on an upright tablet too,
// so the bag's words clear DROP (D-681, D2)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cardZoom, CARD_W, CARD_H, TILE, VIEW_ROWS } from '../src/render/screen.js';
import { bagShape, cardAt, detailAt, wrapWords, lookLine, HELD_Y, PAD, LINE_H } from '../src/render/bag.js';
import { ITEMS } from '../src/core/items.js';
import { LINES } from '../src/core/lines.js';

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

test('a phone held sideways or upright keeps play\'s size', () => {
  for (const [bw, bh] of [[844, 390], [740, 360], [390, 844], [360, 640], [320, 568]]) assert.equal(cardZoom(play(bw, bh), bw, bh), play(bw, bh), `${bw}×${bh}`);
});

const TABLETS = [[768, 1024], [810, 1080], [820, 1180], [834, 1194], [1024, 1366]];
test('an upright tablet gets a card at least CARD_H game pixels tall, in whole pixels', () => {
  for (const [bw, bh] of TABLETS) {
    const z = cardZoom(play(bw, bh), bw, bh);
    assert.ok(Number.isInteger(z) && z >= 2 && bh / z >= CARD_H, `${bw}×${bh}: zoom ${z}`);
  }
});

test('on an upright tablet, every item\'s words in the bag end above DROP, whatever the bag\'s size', () => {
  for (const [bw, bh] of TABLETS) {
    const z = cardZoom(play(bw, bh), bw, bh), vw = Math.floor(bw / z), vh = Math.floor(bh / z);
    for (const size of [6, 9, 12]) {
      const shape = bagShape(size), card = cardAt(vw, vh, shape.detail);
      const { dx, dy } = detailAt(card, vw, vh, shape.detail, HELD_Y, shape.tallSplit), dw = card.x + card.w - PAD - dx;
      for (const [id, entry] of Object.entries(ITEMS)) {
        const texts = entry.look && LINES[entry.look]?.texts;
        for (let i = 0; texts && i < texts.length; i++) {
          const n = wrapWords(lookLine(entry, { [entry.look]: i + 1 }), dw).length;
          assert.ok(dy + 2.5 * LINE_H + n * LINE_H <= card.drop.y, `${bw}×${bh}, ${size} slots, ${id}`);
        }
      }
    }
  }
});
