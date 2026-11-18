// § drive: what every playtest script shares (H-107). It serves the repo's files, opens the game
// in Playwright's Chromium on a phone held sideways, walks into play, and reads the running game
// through window.gloamdeep (src/dev/dev.js), so a script need not guess from pixels.
// Not part of the game; like perf.js it needs Playwright and a Chromium, as on Claude's cloud machine.
//
//   import { openGame, intoPlay, look, read } from './drive.js';
//   const game = await openGame({ seed: 4127 });
//   await intoPlay(game.page);
//   console.log(await look(game.page)); // { screen, place, hero, turn, oil, health }
//   if (game.errors.length) console.log(game.errors); // errors the page logged
//   await game.close();
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// § serve: the repo's files on a free port
const TYPES = { '.js': 'text/javascript', '.html': 'text/html', '.json': 'application/json', '.png': 'image/png', '.ogg': 'audio/ogg', '.mp3': 'audio/mpeg', '.wav': 'audio/wav' };
export async function serve() {
  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const file = normalize(join(ROOT, path === '/' ? '/index.html' : path));
    if (!file.startsWith(ROOT)) return res.writeHead(403).end();
    try {
      res.writeHead(200, { 'content-type': TYPES[file.slice(file.lastIndexOf('.'))] ?? 'text/plain' }).end(readFileSync(file));
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
  return { url: `http://127.0.0.1:${server.address().port}/`, close: () => server.close() };
}

// § open: the game in a browser, its seed typed in Settings before it starts (D-191)
export async function openGame({ seed, viewport = { width: 844, height: 390 }, scale = 1, settings = {} } = {}) {
  const site = await serve();
  const { chromium } = createRequire(import.meta.url)('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport, deviceScaleFactor: scale, hasTouch: true });
  page.on('pageerror', (e) => { throw e; });
  const errors = []; // what the game's safety net logged (D-557): a frame that failed, kept for the script to report (D-988)
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().split('\n')[0]); });
  const kept = { ...(seed ? { seed } : {}), taps: 2, ...settings };
  await page.addInitScript((s) => { try { localStorage.setItem('gloamdeep-settings', JSON.stringify(s)); } catch { /* not kept */ } }, kept);
  await page.goto(site.url);
  await page.waitForFunction(() => globalThis.gloamdeep);
  return { browser, page, errors, close: async () => { await browser.close(); site.close(); } };
}

// § into play: Enter until the game is being played, from the slot screen on a fresh device
export async function intoPlay(page, tries = 6) {
  for (let i = 0; i < tries && (await screen(page)) !== 'play'; i++) { await page.keyboard.press('Enter'); await page.waitForTimeout(400); }
  if ((await screen(page)) !== 'play') throw new Error(`not in play: on ${await screen(page)}`);
}

// § read: the running game, read only
export const screen = (page) => page.evaluate(() => globalThis.gloamdeep.screen());
// pick(state) runs in the page and its answer comes back: read(page, (s) => s.bag.length)
export const read = (page, pick) => page.evaluate((src) => (0, eval)(src)(globalThis.gloamdeep.state()), String(pick));
// the few things most checks want
export const look = (page) => page.evaluate(() => {
  const g = globalThis.gloamdeep, s = g.state();
  return { screen: g.screen(), place: s?.place, hero: s?.hero, turn: s?.turn, oil: s?.oil, health: s?.health };
});
