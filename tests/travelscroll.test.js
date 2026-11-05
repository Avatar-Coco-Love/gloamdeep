// § the travel card's list scrolls inside the card when its rows don't all fit (D-594)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { waysLayout, waysScrollTo, waysPage, waysScrolls, waysAt } from '../src/render/ways.js';

// A sideways phone's room canvas, as the history's tests
const [vw, vh] = [422, 195];
const stones = (n) => Array.from({ length: n }, (_, i) => ({ text: i ? `Depth ${i}` : 'Home', note: i === n - 1 ? 'Not yet woken.' : 'The caves.', dim: i === n - 1 }));
// Whether row i shows whole in the window at scroll s
function whole(menu, i, s) {
  const l = waysLayout(vw, vh, menu), r = l.rows[i];
  return r.y - 4 - l.top >= s && r.y + 22 - l.top <= s + l.h;
}

test('travel scroll: a short list fits; from 6 rows it scrolls sideways', () => {
  assert.ok(!waysScrolls(vw, vh, stones(4)));
  assert.ok(waysScrolls(vw, vh, stones(7)));
  assert.equal(waysScrollTo(0, 3, vw, vh, stones(4)), 0);
});

test('travel scroll: Up and Down keep the chosen row whole in the window', () => {
  const menu = stones(8);
  let s = 0;
  for (let i = 0; i < menu.length; i++) { s = waysScrollTo(s, i, vw, vh, menu); assert.ok(whole(menu, i, s), `down ${i}`); }
  const l = waysLayout(vw, vh, menu);
  assert.equal(s, l.all - l.h); // at the bottom
  for (let i = menu.length - 1; i >= 0; i--) { s = waysScrollTo(s, i, vw, vh, menu); assert.ok(whole(menu, i, s), `up ${i}`); }
  assert.equal(s, 0);
});

test('travel scroll: a page moves the list, the flame to the top row shown', () => {
  const menu = stones(9), down = waysPage(0, 1, 0, vw, vh, menu);
  assert.ok(down.scroll > 0);
  assert.ok(down.chosen > 0 && whole(menu, down.chosen, down.scroll));
  const up = waysPage(down.scroll, -1, down.chosen, vw, vh, menu);
  assert.equal(up.scroll, 0);
  assert.ok(whole(menu, up.chosen, 0));
});

test('travel scroll: a tap picks the row under it, scrolled', () => {
  const menu = stones(9), l = waysLayout(vw, vh, menu), s = waysScrollTo(0, 8, vw, vh, menu), x = l.card.x + 40;
  assert.deepEqual(waysAt(x, l.rows[8].y - s + 2, vw, vh, menu, s), { line: 8 });
  assert.deepEqual(waysAt(x, l.rows[0].y + 2, vw, vh, menu, 0), { line: 0 });
  assert.equal(waysAt(x, l.top + l.h + 1, vw, vh, menu, s), null); // under the window
});
