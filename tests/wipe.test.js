// § wiped canvases (D-588): what is kept is drawn again when the browser hands a canvas back blank
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { keep, onWipe, onCheck, redrawAll, checkWiped } from '../src/render/wipe.js';

// A stand-in canvas: counts its paints and clears, and can be told it reads blank
function fakeCanvas() {
  const cv = { width: 16, height: 16, cleared: 0, blank: false, listeners: {} };
  cv.addEventListener = (kind, fn) => { cv.listeners[kind] = fn; };
  cv.getContext = () => ({ clearRect: () => { cv.cleared++; }, isContextLost: () => false, getImageData: () => ({ data: [0, 0, 0, cv.blank ? 0 : 255] }) });
  return cv;
}

test('a kept canvas is painted once when made, then cleared and painted again after a wipe', () => {
  const cv = fakeCanvas();
  let paints = 0;
  keep(cv, () => { paints++; });
  assert.equal(paints, 1);
  redrawAll();
  assert.equal(paints, 2); assert.equal(cv.cleared, 1);
});

test('a canvas handed back (contextrestored) is watched, and an emptied cache is emptied again', () => {
  const cv = fakeCanvas();
  let emptied = 0;
  keep(cv, () => {});
  onWipe(() => { emptied++; });
  assert.equal(typeof cv.listeners.contextrestored, 'function');
  redrawAll();
  assert.equal(emptied, 1);
});

test('when the page shows again, only a canvas read blank where it is always painted redraws everything', () => {
  const cv = fakeCanvas();
  let paints = 0, wiped = false;
  keep(cv, () => { paints++; }, [3, 4]);
  onCheck(() => wiped);
  checkWiped();
  assert.equal(paints, 1);
  cv.blank = true;
  checkWiped();
  assert.equal(paints, 2);
  cv.blank = false; wiped = true;
  checkWiped();
  assert.equal(paints, 3);
});
