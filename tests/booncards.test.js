// § boon cards (D-603): three cards in a row, each inside the room's edge, and what a tap picks
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { boonsLayout, boonsAt, KIND_LOOKS } from '../src/render/boons.js';
import { BOONS, BOON_SORTS } from '../src/core/registry.js';

const IDS = ['slowWick', 'greedyHands', 'farSight'];
const SIZES = [[176, 221], [176, 260], [300, 190], [240, 221]];

test('boon cards: every kind has a colour and a 9 × 9 picture', () => {
  for (const k of Object.keys(BOON_SORTS)) {
    assert.ok(KIND_LOOKS[k]?.tint, k);
    assert.equal(KIND_LOOKS[k].icon.length, 9, k);
    assert.ok(KIND_LOOKS[k].icon.every((r) => r.length === 9), k);
  }
});

test('boon cards: three in a row, side by side, inside the edge, at every size', () => {
  for (const [vw, vh] of SIZES) {
    const { box, cards } = boonsLayout(vw, vh, IDS);
    assert.equal(cards.length, 3);
    cards.forEach((k, i) => {
      assert.ok(k.x >= box.x && k.x + k.w <= box.x + box.w, `${vw}×${vh} card ${i} across`);
      assert.ok(k.y - 3 >= box.y && k.y + k.h <= box.y + box.h, `${vw}×${vh} card ${i} down`);
      if (i) assert.ok(k.x >= cards[i - 1].x + cards[i - 1].w, 'no overlap');
    });
  }
});

test('boon cards: every boon\'s words fit a card at the upright size', () => {
  for (const id of Object.keys(BOONS)) {
    const { box, cards } = boonsLayout(176, 221, [id, id, id]);
    assert.ok(cards[0].y + cards[0].h <= box.y + box.h, id);
  }
});

test('boon cards: a tap picks the card under it, the cross closes, past the edge goes on', () => {
  const { box, cards } = boonsLayout(176, 221, IDS);
  cards.forEach((k, i) => assert.deepEqual(boonsAt(k.x + 5, k.y + 20, 176, 221, IDS), { line: i }));
  assert.equal(boonsAt(box.close.x, box.close.y, 176, 221, IDS), 'close');
  assert.equal(boonsAt(2, 2, 176, 221, IDS), 'out');
  assert.equal(boonsAt(cards[0].x + 5, box.y + box.h - 3, 176, 221, IDS), null);
});
