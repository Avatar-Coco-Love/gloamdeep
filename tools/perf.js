// § perf: times play on a simulated slow phone (D-430), the same scenes each run:
// a fixed seed, a wide phone's screen held sideways, the processor slowed
// 4 times. Three scenes (H-73): the daylit surface, a dark room on depth 3 by
// lantern light, and the Lampeater's arena (the #lampeater link). One line per
// measure: frames a second standing and walking, and the milliseconds a frame
// spends in all and in the light, against the frame budget in docs/TECH.md.
// Run it before and after any change to drawing.
//
//   node tools/perf.js [slowdown, default 4]
//
// Not part of the game. It needs Playwright and a Chromium, as on Claude's
// cloud machine; nothing is added to package.json. Numbers change from
// machine to machine: compare runs on the same one.
import { openGame, intoPlay, read } from './drive.js';

const SLOW = Number(process.argv[2]) || 4;
const SEED = 4127, SECONDS = 4;
const BUDGET = { frame: 16.7, light: 8 }; // milliseconds, docs/TECH.md "Frame budget"

// § measure: frames counted in the page; where the time went from the profiler.
// "In the light" is every sample with drawLight on its stack, its reads and writes of the pixels too.
async function measure(page, cdp, walking, ways) {
  await cdp.send('Profiler.start');
  let steps = null;
  if (walking) { let k = 0; steps = setInterval(() => page.keyboard.press(ways[k++ % 8 < 4 ? 0 : 1]).catch(() => {}), 150); }
  const frames = await page.evaluate((s) => new Promise((done) => {
    let n = 0; const t0 = performance.now();
    const tick = () => { n++; if (performance.now() - t0 < s * 1000) requestAnimationFrame(tick); else done(n); };
    requestAnimationFrame(tick);
  }), SECONDS);
  clearInterval(steps);
  const { profile } = await cdp.send('Profiler.stop');
  const parent = {}, byId = {};
  for (const n of profile.nodes) { byId[n.id] = n; for (const c of n.children || []) parent[c] = n.id; }
  const inLight = (id) => { for (let i = id; i; i = parent[i]) if (byId[i].callFrame.functionName === 'drawLight') return true; return false; };
  const idle = new Set(['(idle)', '(program)']);
  let busy = 0, light = 0;
  profile.samples.forEach((id, i) => {
    const dt = (profile.timeDeltas[i] || 0) / 1000, name = byId[id].callFrame.functionName;
    if (idle.has(name)) return;
    busy += dt;
    if (inLight(id)) light += dt;
  });
  return { fps: frames / SECONDS, busy: busy / frames, light: light / frames };
}

// § scenes: each a way into play from a freshly opened game
const DARK_DEPTH = 3;
async function goDown(page) { // the dev tools' Go to depth (DEV-TOOLS.md), pressed in the page, no turn passed
  await page.evaluate((d) => {
    const press = (text) => [...document.querySelectorAll('#dev-panel button')].find((b) => b.textContent === text).click();
    const shown = () => Number(document.querySelector('#dev-panel .dev-depth').textContent);
    while (shown() < d) press('+');
    while (shown() > d) press('-');
    press('Go');
  }, DARK_DEPTH);
  await page.waitForFunction(() => !globalThis.gloamdeep.state().room.dark?.sky);
  await page.waitForTimeout(1500); // the arrival settled
  if (!(await read(page, (s) => s.lit))) await page.keyboard.press('l'); // the lantern lit, as a hero below would carry it
  await page.waitForFunction(() => globalThis.gloamdeep.state().lit);
}
async function intoArena(page) { // the playtest's link straight into the boss bench (D-960)
  await page.goto(page.url().split('#')[0] + '#lampeater');
  await page.reload(); // a new hash alone loads nothing
  await page.waitForFunction(() => globalThis.gloamdeep?.screen() === 'play');
  await page.waitForTimeout(8000); // past the cutscene, which holds the keys
}
const SIDEWAYS = ['ArrowRight', 'ArrowLeft']; // the keys walked: 4 steps one way, 4 back
// On the surface, the first way with 4 open tiles from the hero, so the walk times walking, not a tree
// chopped or stone dug (0.3.433, D-995: a bump repaints the room, F-9)
const OPEN = [['ArrowRight', 'ArrowLeft', 1, 0], ['ArrowLeft', 'ArrowRight', -1, 0], ['ArrowUp', 'ArrowDown', 0, -1], ['ArrowDown', 'ArrowUp', 0, 1]];
const openWay = (page) => page.evaluate((ways) => {
  const s = globalThis.gloamdeep.state();
  return ways.find(([, , dx, dy]) => [1, 2, 3, 4].every((n) => s.room.map[s.hero.y + dy * n]?.[s.hero.x + dx * n] === '.'));
}, OPEN);
const SCENES = [
  ['surface', (page) => intoPlay(page), openWay],
  [`dark, depth ${DARK_DEPTH}`, async (page) => { await intoPlay(page); await goDown(page); }, SIDEWAYS],
  ['arena', intoArena, ['ArrowDown', 'ArrowUp']], // it starts in the narrow way in
];

const ms = (v) => v.toFixed(1).padStart(5);
console.log(`processor ${SLOW}× slower · seed ${SEED} · ${SECONDS} s each · budget: frame ${BUDGET.frame} ms, light ${BUDGET.light} ms`);
for (const [scene, into, ways] of SCENES) {
  const game = await openGame({ seed: SEED, scale: 3 }), { page } = game; // the serving and the browser: tools/drive.js (H-107)
  try {
    await into(page);
    const keys = typeof ways === 'function' ? await ways(page) : ways;
    if (!keys) throw new Error(`${scene}: no way with 4 open tiles from the hero`);
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: SLOW });
    await cdp.send('Profiler.enable');
    await cdp.send('Profiler.setSamplingInterval', { interval: 200 });
    for (const [label, walking] of [['standing', false], ['walking ', true]]) {
      const r = await measure(page, cdp, walking, keys);
      const over = [r.busy > BUDGET.frame && 'frame', r.light > BUDGET.light && 'light'].filter(Boolean).map((w) => ` · ${w} over budget`).join('');
      console.log(`${scene.padEnd(14)} ${label}  fps ${r.fps.toFixed(0).padStart(2)} · frame ${ms(r.busy)} ms · light ${ms(r.light)} ms${over}`);
    }
    for (const e of new Set(game.errors)) console.log(`${scene.padEnd(14)} page error: ${e}`); // a frame that fails draws less and times wrong (D-988)
  } finally {
    await game.close();
  }
}
