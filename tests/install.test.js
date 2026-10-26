// The app card that lets a phone install the game (D-375), core/install.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { appBase, buildManifest, manifestHref, lanternFit, ICON_SIZES } from '../src/core/install.js';

test('the app folder drops the page, query and hash', () => {
  assert.equal(appBase('https://x.github.io/gloamdeep/index.html?dev=1#a'), 'https://x.github.io/gloamdeep/');
  assert.equal(appBase('https://x.github.io/gloamdeep/'), 'https://x.github.io/gloamdeep/');
});

test('the card has what browsers need to offer installing', () => {
  const icons = ICON_SIZES.map((size) => ({ size, src: 'data:image/png;base64,AA' }));
  const m = buildManifest('https://x.io/g/', icons);
  assert.equal(m.name, 'Gloamdeep');
  assert.equal(m.start_url, 'https://x.io/g/');
  assert.equal(m.display, 'standalone');
  assert.deepEqual(m.icons.map((i) => i.sizes), ['192x192', '512x512']);
  assert.ok(m.icons.every((i) => i.type === 'image/png' && i.purpose === 'any'));
  assert.deepEqual(JSON.parse(decodeURIComponent(manifestHref(m).split(',')[1])), m);
});

test('the lantern fills the icon with crisp whole pixels and a margin', () => {
  for (const size of [180, 192, 512]) {
    const { zoom, at } = lanternFit(size);
    assert.ok(Number.isInteger(zoom) && zoom > 0);
    assert.ok(at >= size * 0.1 && at + zoom * 5 <= size - size * 0.1 + 1);
  }
});
