// § locket fall: the locket on the shelf keeps one stack on a Normal fall (step 20, D-691, D-694)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld, wait } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { keptStack } from '../src/core/fall.js';
import { ITEMS } from '../src/core/items.js';
import { hasGlyph, textWidth } from '../src/render/font.js';
import { W } from '../src/render/screen.js';

// A journey in the first room, the hero at 3,10 about to fall to the rat at 2,10; with
// `shelf`, a room elsewhere holds the shelf with the locket on it (letter N)
function fallen(bag, { mode = 'normal', shelf = true } = {}) {
  const w = makeWorld('first', 4321, mode);
  const elsewhere = shelf ? { ...w.elsewhere, woods: { room: { map: ['TTT', 'TNT', 'TTT'] } } } : w.elsewhere;
  return wait({ ...w, elsewhere, hero: { x: 3, y: 10 }, health: 1, bag, enemies: [{ id: 'rat', x: 2, y: 10 }] });
}
const lost = (s) => s.items.find((it) => it.id === 'lostbag')?.holds;
const BAG = [{ id: 'ratTail', n: 4 }, { id: 'venomSac', n: 3 }, { id: 'mimicHeart', n: 1 }, { id: 'flask', n: 2 }];

test('the stack worth most in all comes home; the rest is left where the hero fell', () => {
  const n = fallen(BAG);
  assert.deepEqual(n.bag, [{ id: 'venomSac', n: 3 }]); // 3 × 5 beats 4 × 1 and 1 × 5
  assert.deepEqual(lost(n), [{ id: 'ratTail', n: 4 }, { id: 'mimicHeart', n: 1 }, { id: 'flask', n: 2 }]);
  assert.equal(shownLine(n).text, 'The locket kept Venom Sac ×3.');
});

test('a tie goes to the stack first in the bag; one alone is named without a count', () => {
  assert.deepEqual(keptStack([{ id: 'ratTail', n: 5 }, { id: 'mimicHeart', n: 1 }]), { id: 'ratTail', n: 5 });
  const n = fallen([{ id: 'flask', n: 1 }, { id: 'mimicHeart', n: 1 }, { id: 'venomSac', n: 1 }]);
  assert.deepEqual(n.bag, [{ id: 'mimicHeart', n: 1 }]);
  assert.equal(shownLine(n).text, 'The locket kept Mimic Heart.');
});

test('with nothing the peddler buys, nothing is kept', () => {
  const n = fallen([{ id: 'flask', n: 2 }]);
  assert.deepEqual(n.bag, []);
  assert.deepEqual(lost(n), [{ id: 'flask', n: 2 }]);
  assert.equal(shownLine(n).text, 'You fall, and wake again.');
});

test('a bag holding only the kept stack is not left behind', () => {
  const n = fallen([{ id: 'venomSac', n: 2 }]);
  assert.deepEqual(n.bag, [{ id: 'venomSac', n: 2 }]);
  assert.equal(lost(n), undefined);
});

test('without the locket on a shelf, or outside Normal, nothing changes', () => {
  assert.deepEqual(fallen(BAG, { shelf: false }).bag, []);
  assert.equal(fallen(BAG, { mode: 'gentle' }).bag.length, 4);
});

test('the line fits the strip for every find the peddler buys, a full stack of it', () => {
  for (const it of Object.values(ITEMS).filter((i) => i.sells)) {
    const text = `The locket kept ${it.name} ×${it.max}.`;
    assert.ok([...text].every(hasGlyph) && textWidth(text) <= W - 4, text);
  }
});
