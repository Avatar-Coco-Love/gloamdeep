// § a held Space off play (D-669): Space's key-repeat waits turn after turn only in play (D-085);
// on the title, a menu or a card, one press picks once, as Enter does (audit finding I2)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createInput } from '../src/input/input.js';

// A stand-in page: keydowns sent by hand, the waits counted
function rig(playing) {
  let keydown = null, waits = 0;
  globalThis.addEventListener = (k, fn) => { if (k === 'keydown') keydown = fn; };
  const area = { addEventListener: () => {} }, none = () => {};
  createInput(area, {}, { onDir: none, onPoint: none, onLantern: none, onWait: () => { waits++; }, onChoose: none, onPause: none, onMap: none, onBag: none, onFloor: none, onType: () => false, onTab: () => false, repeats: () => playing });
  const space = (repeat) => keydown({ key: ' ', repeat, target: { closest: () => null }, preventDefault: () => {} });
  return { hold: (n) => { space(false); for (let i = 1; i < n; i++) space(true); return waits; } };
}

test('off play, holding Space picks once', () => {
  assert.equal(rig(false).hold(6), 1);
});

test('off play, each fresh press of Space still picks', () => {
  const r = rig(false);
  r.hold(1);
  assert.equal(r.hold(1), 2);
});

test('in play, holding Space keeps waiting turns (D-085)', () => {
  assert.equal(rig(true).hold(6), 6);
});
