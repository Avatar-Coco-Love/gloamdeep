// § test spots: three slots on this device; Save keeps the game, Load gives it back (D-627)
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld } from '../src/core/state.js';
import { SPOTS, spotKey, spotLabel, readSpot, writeSpot } from '../src/core/spots.js';

const store = new Map();
globalThis.localStorage = { getItem: (k) => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) };
beforeEach(() => store.clear());

test('there are three slots, each with its own key', () => {
  assert.equal(SPOTS, 3);
  assert.equal(new Set([0, 1, 2].map(spotKey)).size, 3);
});

test('an empty slot reads as nothing and says EMPTY', () => {
  assert.equal(readSpot(0), null);
  assert.equal(spotLabel(0, null), '1 · EMPTY');
});

test('a saved spot comes back as it was, tile memories too', () => {
  const s = { ...makeWorld('first', 7), turn: 120, oil: 0.4, god: true };
  assert.ok(writeSpot(1, s));
  const back = readSpot(1);
  assert.equal(back.turn, 120);
  assert.equal(back.oil, 0.4);
  assert.equal(back.god, true);
  assert.deepEqual(back.hero, s.hero);
  assert.ok(back.seen instanceof Uint8Array);
  assert.equal(readSpot(0), null); // the other slots untouched
  assert.equal(spotLabel(1, back), '2 · DEPTH 0 · TURN 120'); // the crypt is depth 0 (D-212)
});

test('a slot that cannot be read, or blocked storage, gives nothing and no throw', () => {
  store.set(spotKey(2), '{not json');
  assert.equal(readSpot(2), null);
  const was = globalThis.localStorage;
  globalThis.localStorage = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('full'); } };
  assert.equal(readSpot(0), null);
  assert.equal(writeSpot(0, makeWorld('first', 1)), false);
  globalThis.localStorage = was;
});
