// § the timer rim (D-847): a lasting effect's mark shows its time left on its square's edge, no number
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LONGEST, shareLeft } from '../src/core/lasting.js';
import { RIM, rimLit, MARK, marksSize, POISON_MARK, STIFF_MARK, WARM_MARK, GLOW_MARK } from '../src/render/marks.js';

test('Each lasting effect is full at its longest time, from the registry (D-847)', () => {
  assert.equal(LONGEST.warmed, 60); // a blazing fire's, not embers' 30
  for (const k of ['glow', 'slowburn', 'mending', 'ward', 'spitproof', 'shade']) assert.equal(LONGEST[k], 60, k);
  assert.equal(shareLeft({ warmed: 30 }, 'warmed'), 0.5); // embers start it half lit
  assert.equal(shareLeft({ glow: 60 }, 'glow'), 1);
  assert.equal(shareLeft({}, 'ward'), 0);
});

test('The rim runs round the square from the top middle, like a clock (D-847)', () => {
  assert.equal(RIM.length, 4 * (MARK - 2)); // every edge dot but the corners
  assert.equal(new Set(RIM.map(String)).size, RIM.length);
  assert.deepEqual(RIM[0], [Math.floor(MARK / 2), 0]);
  assert.ok(RIM.every(([x, y]) => (x === 0 || x === MARK - 1) !== (y === 0 || y === MARK - 1))); // no corners
  assert.equal(rimLit(1).length, RIM.length);
  assert.equal(rimLit(0.5).length, RIM.length / 2);
  assert.equal(rimLit(0.001).length, 1); // any time left shows
  assert.equal(rimLit(0).length, 0);
  assert.deepEqual(marksSize([{ left: 1 }, { left: 0.5 }]), { w: 2 * MARK + 2, h: MARK }); // no number beside it any more
});

test('Poisoned and stiff get the rim, full at 6 and 20, on dark red glass (D-848)', () => {
  assert.equal(LONGEST.poisoned, 6);
  assert.equal(LONGEST.stiff, 20);
  assert.equal(shareLeft({ poisoned: 3 }, 'poisoned'), 0.5);
  assert.equal(shareLeft({ stiff: 20 }, 'stiff'), 1);
  assert.ok(POISON_MARK.bad && STIFF_MARK.bad); // the bad ones
  assert.ok(!WARM_MARK.bad && !GLOW_MARK.bad); // the good ones keep the night glass
});
