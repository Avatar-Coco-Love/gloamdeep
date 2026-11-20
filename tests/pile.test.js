// § pile: a tile holding several kinds shows one at a time, each with its count, the next
// every PILE_MS; still (reduced motion), the newest with "+2" for the others (D-936)
import { test } from 'node:test';
import assert from 'node:assert/strict';

const any = new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => 0 : any), apply: () => any });
globalThis.document ??= { createElement: () => ({ getContext: () => any }), addEventListener() {}, body: any, documentElement: any };
const { drawItems, spriteOf, PILE_MS } = await import('../src/render/sprites.js');
const { watchText } = await import('../src/render/font.js');

const pile = [{ id: 'wood', n: 5, x: 3, y: 2 }, { id: 'ratTail', n: 3, x: 3, y: 2 }, { id: 'stone', n: 4, x: 3, y: 2 }]; // finds that bob; a rooted one adds its tuft (D-1008)
// What one frame draws: the sprites, and the words
function frame(items, t, still) {
  const drawn = [], words = [];
  const c = new Proxy({}, { get: (o, k) => (k === 'drawImage' ? (img) => drawn.push(img) : () => {}), set: () => true });
  watchText((w) => words.push(w.text));
  drawItems(c, items, t, still);
  watchText(null);
  return { drawn, words };
}

test('each kind in turn, with its own count', () => {
  pile.forEach((it, i) => assert.deepEqual(frame(pile, i * PILE_MS, false), { drawn: [spriteOf(it)], words: [String(it.n)] }));
  assert.deepEqual(frame(pile, 3 * PILE_MS, false).drawn, [spriteOf(pile[0])], 'and round again');
});

test('still, the newest with an ember "+2" for the others', () => {
  assert.deepEqual(frame(pile, 5 * PILE_MS, true), { drawn: [spriteOf(pile[2])], words: ['4', '+2'] });
});

test('a tile with one kind draws as before, and other tiles each their own', () => {
  const two = [{ id: 'flask', x: 1, y: 1 }, { ...pile[0] }];
  assert.deepEqual(frame(two, 0, true), { drawn: [spriteOf(two[0]), spriteOf(two[1])], words: ['5'] });
});
