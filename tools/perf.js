// § perf: times play on a simulated slow phone (D-430), the same scene each run:
// a fixed seed, a wide phone's screen held sideways, the processor slowed
// 4 times. One line per measure: frames a second standing and walking, and
// the milliseconds a frame spends in all and in the light, against the frame
// budget in docs/TECH.md. Run it before and after any change to drawing.
//
//   node tools/perf.js [slowdown, default 4]
//
// Not part of the game. It needs Playwright and a Chromium, as on Claude's
// cloud machine; nothing is added to package.json. Numbers change from
// machine to machine: compare runs on the same one.
import { openGame, intoPlay } from './drive.js';

const SLOW = Number(process.argv[2]) || 4;
const SEED = 4127, SECONDS = 4;
const BUDGET = { frame: 16.7, light: 8 }; // milliseconds, docs/TECH.md "Frame budget"

// § measure: frames counted in the page; where the time went from the profiler.
// "In the light" is every sample with drawLight on its stack, its reads and writes of the pixels too.
async function measure(page, cdp, walking) {
  await cdp.send('Profiler.start');
  let steps = null;
  if (walking) { let k = 0; steps = setInterval(() => page.keyboard.press(k++ % 8 < 4 ? 'ArrowRight' : 'ArrowLeft').catch(() => {}), 150); }
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

const game = await openGame({ seed: SEED, scale: 3 }), { page } = game; // the serving and the browser: tools/drive.js (H-107)
try {
  await intoPlay(page); // on the surface
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: SLOW });
  await cdp.send('Profiler.enable');
  await cdp.send('Profiler.setSamplingInterval', { interval: 200 });
  const ms = (v) => v.toFixed(1).padStart(5);
  console.log(`processor ${SLOW}× slower · seed ${SEED} · ${SECONDS} s each · budget: frame ${BUDGET.frame} ms, light ${BUDGET.light} ms`);
  for (const [label, walking] of [['standing', false], ['walking ', true]]) {
    const r = await measure(page, cdp, walking);
    const over = r.light > BUDGET.light ? ' · light over budget' : '';
    console.log(`${label}  fps ${r.fps.toFixed(0).padStart(2)} · frame ${ms(r.busy)} ms · light ${ms(r.light)} ms${over}`);
  }
} finally {
  await game.close();
}
