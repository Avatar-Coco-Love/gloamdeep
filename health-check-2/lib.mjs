// Shared harness for the second health check. Nothing here changes the repo.
// Usage (from any script in this folder):
//   import { serve, open, core, inject, readSave, shot, keys, tap } from './lib.mjs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';
import { pathToFileURL } from 'node:url';

export const ROOT = '/home/user/gloamdeep';
const require = createRequire(import.meta.url);
let playwright; try { playwright = require('playwright'); } catch { playwright = createRequire('/opt/')('playwright'); }
const { chromium } = playwright;

// Import a game module in Node (src/core is DOM-free): const save = await core('save');
export const core = (name) => import(pathToFileURL(join(ROOT, 'src/core', name + '.js')).href);

const TYPES = { '.js': 'text/javascript', '.html': 'text/html', '.json': 'application/json', '.png': 'image/png', '.ogg': 'audio/ogg' };
export async function serve() {
  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const file = normalize(join(ROOT, path === '/' ? '/index.html' : path));
    if (!file.startsWith(ROOT)) return res.writeHead(403).end();
    try { res.writeHead(200, { 'content-type': TYPES[file.slice(file.lastIndexOf('.'))] ?? 'text/plain' }).end(readFileSync(file)); }
    catch { res.writeHead(404).end(); }
  });
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
  return { url: `http://127.0.0.1:${server.address().port}/`, close: () => server.close() };
}

export const SCREENS = {
  phone: { viewport: { width: 412, height: 915 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 },
  phoneWide: { viewport: { width: 915, height: 412 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 },
  pc: { viewport: { width: 1600, height: 900 }, hasTouch: false, isMobile: false, deviceScaleFactor: 1 },
};
// Opens the game. `storage`: { key: text } put into localStorage before the game boots
// (e.g. from inject()). Returns { browser, page, errors } — errors collects page errors and console errors.
export async function open(url, kind = 'phone', storage = null) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...SCREENS[kind], reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text().slice(0, 300)); });
  if (storage) {
    await page.goto(url + 'reference/README.md'); // same origin, no game running
    await page.evaluate((st) => { for (const [k, v] of Object.entries(st)) localStorage.setItem(k, v); }, storage);
  }
  await page.goto(url);
  await page.waitForTimeout(600);
  return { browser, page, errors };
}

// localStorage texts for a prepared journey: a named profile in slot 0 and the state as its saved journey.
// `profile` overrides fields of the profile (records, glints, bestiary, bought, goals...).
// `settings` overrides Settings; `jumped` true marks the journey as a dev jump.
export async function inject(state, { profile = {}, settings = null, jumped = false } = {}) {
  const save = await core('save'), prof = await core('profile');
  const ps = prof.newProfiles();
  ps.slots[0] = { ...ps.slots[0], name: 'Tess', ...profile };
  const out = { 'gloamdeep-profiles': JSON.stringify(prof.packProfiles(ps)), 'gloamdeep-journey': save.journeyText(state, jumped) };
  if (settings) out['gloamdeep-settings'] = JSON.stringify(settings);
  return out;
}
// The journey as the game last saved it (it saves after every turn): { state, jumped } or null.
export async function readSave(page, slot = 0) {
  const save = await core('save');
  const text = await page.evaluate((k) => localStorage.getItem(k), save.journeyKey(slot));
  return text ? save.readJourney(text) : null;
}
export const readProfiles = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('gloamdeep-profiles')));
// The text line as a screen reader hears it (the words drawn at the foot of the screen)
export const line = (page) => page.evaluate(() => document.getElementById('line')?.textContent ?? '');

export async function shot(page, name) {
  mkdirSync(dirname(name), { recursive: true });
  await page.screenshot({ path: name });
  return name;
}
// Press keys one at a time with a pause so each turn's slide finishes: keys(page, 'ArrowUp ArrowUp Enter')
export async function keys(page, seq, pause = 220) {
  for (const k of seq.split(/\s+/).filter(Boolean)) { await page.keyboard.press(k); await page.waitForTimeout(pause); }
}
// A tap (phone) or click (pc) at page pixel x, y
export async function tap(page, x, y, pause = 300) {
  if (page.context()._options?.hasTouch) await page.touchscreen.tap(x, y); else await page.mouse.click(x, y);
  await page.waitForTimeout(pause);
}
