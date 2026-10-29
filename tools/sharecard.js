// § share card: draws share.png, the picture a shared link shows (D-425):
// the title screen without its menu, the hero in the lantern's light and the
// name lit from below, drawn by the game's own code. The one image file in
// the repo; never edited by hand. Run it again when the title art changes.
//
//   node tools/sharecard.js
//
// Not part of the game. It needs Playwright and a Chromium, as on Claude's
// cloud machine; nothing is added to package.json.
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'share.png');

// § picture: 240 × 126 game pixels, each drawn 5 × 5, so 1200 × 630, the
// usual size for a link card; the title's picture (176 wide) in the middle
const PAGE = `<script type="module">
import { view, roomView, W } from '/src/render/screen.js';
import { drawScene, drawName } from '/src/render/title.js';
const GW = 240, GH = 126, Z = 5;
view.w = roomView.w = GW; view.h = roomView.h = GH;
const small = document.createElement('canvas'); small.width = GW; small.height = GH;
const s = small.getContext('2d'); s.imageSmoothingEnabled = false;
drawScene(s, 3, 0, true, (GW - W) / 2, -12); // still: no flicker; the hero lifted to fit the short picture
drawName(s, GW / 2, 8);
const big = document.createElement('canvas'); big.width = GW * Z; big.height = GH * Z;
const b = big.getContext('2d'); b.imageSmoothingEnabled = false;
b.drawImage(small, 0, 0, big.width, big.height);
window.png = big.toDataURL('image/png');
</script>`;

// § serve: the repo's files, and the page above
const TYPES = { '.js': 'text/javascript', '.html': 'text/html' };
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path === '/share.html') return res.writeHead(200, { 'content-type': 'text/html' }).end(PAGE);
  const file = normalize(join(ROOT, path));
  if (!file.startsWith(ROOT)) return res.writeHead(403).end();
  try {
    res.writeHead(200, { 'content-type': TYPES[file.slice(file.lastIndexOf('.'))] ?? 'text/plain' }).end(readFileSync(file));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));

// § draw: in the browser, then saved
const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  page.on('pageerror', (e) => { throw e; });
  await page.goto(`http://127.0.0.1:${server.address().port}/share.html`);
  const png = await page.waitForFunction(() => window.png).then((h) => h.jsonValue());
  writeFileSync(OUT, Buffer.from(png.split(',')[1], 'base64'));
  console.log(`wrote ${OUT}`);
} finally {
  await browser.close();
  server.close();
}
