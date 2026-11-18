// § clear of the hero (H-75, D-988): the text line covering the hero stands just above its tile
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lineAt } from '../src/render/textline.js';

test('a line over the hero rises 2 px above its tile; one clear of it stays put', () => {
  const line = [100, 200, 80, 12]; // x, y, w, h on the screen layer
  assert.equal(lineAt(...line, null), 200, 'no hero: along the bottom');
  assert.equal(lineAt(...line, { x: 130, y: 196, size: 16 }), 196 - 2 - 12, 'under it: above the tile');
  assert.equal(lineAt(...line, { x: 130, y: 150, size: 16 }), 200, 'higher up: clear');
  assert.equal(lineAt(...line, { x: 20, y: 196, size: 16 }), 200, 'beside it: clear');
  assert.equal(lineAt(...line, { x: 180, y: 196, size: 16 }), 200, 'touching its end only: clear');
  assert.equal(lineAt(100, 2, 80, 12, { x: 130, y: 4, size: 16 }), 0, 'never off the top');
});
