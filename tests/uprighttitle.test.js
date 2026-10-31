// § upright title screens (D-506): the title's round buttons in a row, the pads at the card's foot
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { titleLayout, chipOf } from '../src/render/titlecard.js';
import { titleMenu } from '../src/core/menu.js';
import { nameCardAt } from '../src/render/namepad.js';
import { seedCardAt } from '../src/render/seedpad.js';
import { NAME_PAD } from '../src/core/namepad.js';
import { PAD } from '../src/core/seedpad.js';

const VW = 195, VH = 422; // an upright phone's title scene
// The box a key's taps cover, found by tapping every game pixel
function keyBox(cardAt, i) {
  let x0 = Infinity, y0 = Infinity, x1 = -1, y1 = -1;
  for (let y = 0; y < VH; y++) for (let x = 0; x < VW; x++) {
    if (cardAt(x, y, VW, VH)?.key !== i) continue;
    x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
  }
  assert.ok(x1 >= 0, 'the key is on the card');
  return { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}

test('upright, Journal, How to play and Settings stand in a row under the big button', () => {
  for (const saved of [false, true]) {
    const boxes = titleLayout(VW, VH, titleMenu(saved), chipOf('Profile 1', 3));
    const rounds = boxes.filter((b) => ['journal', 'howto', 'settings'].includes(b.id)), last = boxes[saved ? 1 : 0];
    assert.equal(new Set(rounds.map((b) => b.my)).size, 1);
    assert.ok(rounds[0].y > last.y + last.h, 'under the big button and New journey');
    assert.equal(rounds[1].mx, Math.floor(VW / 2));
  }
});

test('upright, the name pad\'s keys are square and at the card\'s foot', () => {
  const a = keyBox(nameCardAt, NAME_PAD.findIndex((k) => k.id === 'A'));
  assert.equal(a.w, a.h);
  assert.ok(a.y > VH / 2);
});

test('upright, the seed pad\'s keys fill the card\'s width at its foot', () => {
  const one = keyBox(seedCardAt, PAD.findIndex((k) => k.id === '1')), four = keyBox(seedCardAt, PAD.findIndex((k) => k.id === '4'));
  assert.ok(one.x < 20 && four.x + four.w > VW - 20);
  assert.ok(one.y > VH / 2);
});
