// § a slow tap off play (D-661): a still press held past the hold time is a hold only in play;
// on a menu or card, letting go is a tap, however long it was held (audit finding I1)
import { test, mock, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { createInput } from '../src/input/input.js';

// A stand-in page: the press area and canvas, with pointer events sent by hand
function rig(playing) {
  const on = {}, area = { addEventListener: (k, fn) => { on[k] = fn; }, setPointerCapture: () => {} };
  const canvas = { width: 100, height: 100, getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }) };
  globalThis.addEventListener = () => {};
  const points = [], none = () => {};
  createInput(area, canvas, { onDir: none, onPoint: (x, y, held) => points.push({ x, y, held: !!held }), onLantern: none, onWait: none, onChoose: none, onPause: none, onMap: none, onBag: none, onFloor: none, onType: () => false, onTab: () => false, holds: () => playing });
  const ev = { pointerId: 1, pointerType: 'touch', button: 0, clientX: 40, clientY: 60 };
  return { points, press: (ms) => { on.pointerdown(ev); mock.timers.tick(ms); on.pointerup(ev); } };
}

beforeEach(() => mock.timers.enable({ apis: ['setTimeout'] }));
afterEach(() => mock.timers.reset());

test('off play, a press held 400 ms sends one tap when it lifts', () => {
  const r = rig(false);
  r.press(400);
  assert.deepEqual(r.points, [{ x: 40, y: 60, held: false }]);
});

test('off play, a quick press is a tap, as before', () => {
  const r = rig(false);
  r.press(80);
  assert.deepEqual(r.points, [{ x: 40, y: 60, held: false }]);
});

test('in play, a press held 400 ms is a hold, and lifting it sends no tap (D-408)', () => {
  const r = rig(true);
  r.press(400);
  assert.deepEqual(r.points, [{ x: 40, y: 60, held: true }]);
});
