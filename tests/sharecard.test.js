// The card a shared link shows (D-425): index.html's tags and share.png, drawn by tools/sharecard.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const page = readFileSync('index.html', 'utf8');
const tag = (key) => page.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)">`))?.[1];

test('the page names its card: title, line, picture and its size', () => {
  assert.equal(tag('og:title'), 'Gloamdeep');
  assert.equal(tag('og:description'), 'Carry a lantern down through the gloam.');
  assert.equal(tag('description'), tag('og:description'));
  assert.equal(tag('og:image'), `${tag('og:url')}share.png`);
  assert.equal(tag('twitter:card'), 'summary_large_image');
  assert.deepEqual([tag('og:image:width'), tag('og:image:height')], ['1200', '630']);
});

test('share.png is a 1200 × 630 PNG, the one image file in the repo', () => {
  const png = readFileSync('share.png');
  assert.equal(png.toString('latin1', 1, 4), 'PNG');
  assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], [1200, 630]); // IHDR's width and height
  const images = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const path = dir === '.' ? d.name : `${dir}/${d.name}`;
    if (d.isDirectory()) return ['.git', 'node_modules'].includes(path) ? [] : images(path);
    return /\.(png|jpe?g|gif|webp|svg)$/i.test(path) ? [path] : [];
  });
  assert.deepEqual(images('.'), ['share.png']);
});
