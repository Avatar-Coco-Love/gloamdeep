// § its end's cutscene (D-1014): about 3 s, on the Lampeater then back to the hero; its eyes flare,
// it fades, Leap's find shows; with reduced motion the same shots cut
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { shotAt, cutOver, END } from '../src/render/cutscene.js';

const cs = { start: 0, end: true, boss: { x: 6, y: 4 }, brood: [] }, hero = { x: 6, y: 9 };
for (const still of [false, true]) {
  test(`its end, ${still ? 'cut' : 'gliding'}: on it, flaring, fading, the find, then back`, () => {
    const at = (t) => shotAt(cs, t, still, hero);
    assert.deepEqual(at(END.inEnd + 50).focus, cs.boss);
    assert.equal(at(800).flare > 0, true);
    assert.deepEqual([at(900).fade, at(900).find], [0, 0]);
    assert.deepEqual([at(END.fadeEnd).fade, at(END.findEnd).find], [1, 1]);
    assert.deepEqual(at(END.end).focus, hero);
    assert.equal(at(END.end).bars, 0);
    assert.ok(!cutOver(cs, END.end - 1) && cutOver(cs, END.end));
  });
}
