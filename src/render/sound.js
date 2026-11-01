// § sound: the game's sounds, made in code with Web Audio (TECH.md), no audio files.
// The first is the footstep (D-255): a soft tap each time the hero moves a tile;
// then the lantern's tick, on or off (D-257), the hit on a creature (D-258) and
// a rat's bite, of teeth (D-259), the flask mimic's, of glass (D-367), and the
// scorpion's sting (D-370), the cave spider's hiss (D-536), the bat's squeak (D-538), the mole's snuffle (D-542), the snapcap's snap (D-544), the herb mimic's rustle (D-550), and the bone rat's rattle (D-551).
// A browser plays sound only after a tap, click or key, so the sound maker starts
// on the first one; until then, and with Sound: Off, nothing plays.
import { rng } from '../core/rng.js';

// Each step plays its own slice of a second of noise, at its own pitch and loudness,
// so no two sound alike (seconds and hertz; changed after the playtest: no thump, half as loud)
const STEP = { gain: 0.11, attack: 0.006, end: 0.08, low: 480, high: 720, quiet: 0.7, rate: 0.12 };
// The lantern's tick: a ringing slice of noise, higher for on and lower for off (hertz, seconds)
const TICK = { on: 1200, off: 850, ring: 3, gain: 0.12, attack: 0.002, end: 0.04, from: 0.3 };
// The hit: a low tone falling, under a muffled slice of noise, a soft "dmp"; the knife adds a
// small tick. Each hit's pitch and loudness vary a little, like the steps (hertz, seconds)
const HIT = {
  thud: { from: 110, to: 60, gain: 0.12, attack: 0.006, end: 0.1 },
  dull: { freq: 350, gain: 0.06, attack: 0.004, end: 0.05, from: 0.2 },
  knife: { freq: 1000, ring: 3, gain: 0.06, attack: 0.002, end: 0.035, from: 0.3 },
  pitch: 0.1, quiet: 0.7,
};
// A bite of teeth: two low, dry snaps and a hint of breath, a moment after the hero's own
// hit when both come in one turn. Each varies a little, like the hit (hertz, seconds)
const TEETH = {
  snap: { freq: 700, ring: 3, gain: 0.07, attack: 0.002, end: 0.018, from: 0.35 }, snaps: [0, 0.04],
  breath: { freq: 600, sweepTo: 250, gain: 0.03, attack: 0.008, end: 0.08, from: 0.7 }, breathAt: 0.06,
  afterHit: 0.18,
};
// A bite of glass: a bright ringing clink, then one dry snap of teeth, the flask
// mimic's. Each varies a little, like the hit (hertz, seconds)
const GLASS = {
  clink: { freq: 3400, ring: 18, gain: 0.08, attack: 0.002, end: 0.22, from: 0.5 },
  ping: { from: 2600, to: 2500, gain: 0.025, attack: 0.002, end: 0.25 },
  snapAt: 0.07,
};
// A sting: a dry double click of claws, then a short sharp stab falling in pitch,
// the scorpion's. Each varies a little, like the hit (hertz, seconds)
const STING = {
  click: { freq: 2400, ring: 6, gain: 0.06, attack: 0.001, end: 0.012, from: 0.15 }, clicks: [0, 0.035],
  stab: { freq: 1800, sweepTo: 700, ring: 4, gain: 0.08, attack: 0.002, end: 0.06, from: 0.55 }, stabAt: 0.08,
};
// A hiss: a soft breathy hiss rising and falling, then one dry click of fangs, the
// cave spider's. Each varies a little, like the hit (hertz, seconds)
const HISS = {
  hiss: { freq: 5200, sweepTo: 3800, ring: 1.2, gain: 0.05, attack: 0.03, end: 0.16, from: 0.45 },
  click: { freq: 2000, ring: 6, gain: 0.07, attack: 0.001, end: 0.015, from: 0.8 }, clickAt: 0.13,
};
// A squeak: a quick high chirp rising in pitch, then one soft leathery flap of
// wings, the bat's. Each varies a little, like the hit (hertz, seconds)
const SQUEAK = {
  chirp: { from: 3800, to: 5200, gain: 0.04, attack: 0.004, end: 0.06 },
  flap: { freq: 900, sweepTo: 400, ring: 0.8, gain: 0.06, attack: 0.01, end: 0.09, from: 0.25 }, flapAt: 0.08,
};
// A snuffle: a short low snuffle of breath, then one gritty scrape of claws in dirt,
// the mole's. Each varies a little, like the hit (hertz, seconds)
const SNUFFLE = {
  sniff: { freq: 500, sweepTo: 800, ring: 2, gain: 0.07, attack: 0.01, end: 0.07, from: 0.6 }, sniffs: [0, 0.05],
  scrape: { freq: 1500, sweepTo: 900, ring: 1.5, gain: 0.06, attack: 0.008, end: 0.12, from: 0.1, rate: 0.6 }, scrapeAt: 0.13,
};
// A snap: a soft wet squelch, then the quick snap of a cap closing, the snapcap's.
// Each varies a little, like the hit (hertz, seconds)
const SNAP = {
  squelch: { freq: 900, sweepTo: 260, ring: 3, gain: 0.08, attack: 0.006, end: 0.09, from: 0.35 },
  shut: { from: 1400, to: 520, gain: 0.05, attack: 0.002, end: 0.035 }, click: { freq: 2600, ring: 4, gain: 0.05, attack: 0.002, end: 0.025, from: 0.8 }, shutAt: 0.06,
};
// A rustle: a dry leafy rustle, then the rat's snap of teeth, the herb mimic's.
// Each varies a little, like the hit (hertz, seconds)
const RUSTLE = {
  leaf: { freq: 4200, sweepTo: 2800, ring: 1.2, gain: 0.05, attack: 0.004, end: 0.05, from: 0.2 }, leaves: [0, 0.04, 0.075],
  snapAt: 0.13,
};
// A rattle: a dry clatter of little bones, each knock a touch lower, then the rat's
// snap of teeth, the bone rat's. Each varies a little, like the hit (hertz, seconds)
const RATTLE = {
  knock: { freq: 1700, ring: 9, gain: 0.07, attack: 0.001, end: 0.02, from: 0.3 }, knocks: [0, 0.03, 0.055, 0.085], drop: 0.9,
  snapAt: 0.14,
};
const NOISE_S = 1; // the noise's length, in seconds
const SEED = 255; // the noise and the steps' variety, the same on every visit
const between = (r, lo, hi) => lo + r() * (hi - lo);

export function createSound(isOn) {
  let ac = null, noise = null;
  const vary = rng(SEED + 1); // each step's slice, pitch and loudness
  const varyHit = rng(SEED + 2); // each hit's pitch and loudness
  const varyBite = rng(SEED + 3); // each bite's pitch and loudness
  // § start: on the first tap, click or key, the sound maker and its noise are made once
  function start() {
    if (!ac) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ac = new AC();
      noise = ac.createBuffer(1, Math.ceil(ac.sampleRate * NOISE_S), ac.sampleRate);
      const r = rng(SEED), data = noise.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = r() * 2 - 1;
    }
    if (ac.state === 'suspended') ac.resume();
  }
  addEventListener('pointerdown', start, { capture: true });
  addEventListener('keydown', start, { capture: true });
  const ready = () => ac && ac.state === 'running' && isOn();

  // § parts: a quick rise to `gain`, then a fall to nothing at `end`
  function envelope(t, gain, attack, end) {
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + end);
    return g;
  }
  // A slice of the noise, from `from` seconds in, through one filter
  function slice(t, { type, freq, sweepTo, ring = 1, gain, attack, end, from, rate = 1 }) {
    const src = ac.createBufferSource(), filter = ac.createBiquadFilter();
    src.buffer = noise;
    src.playbackRate.value = rate;
    filter.type = type;
    filter.frequency.setValueAtTime(freq, t);
    if (sweepTo) filter.frequency.exponentialRampToValueAtTime(sweepTo, t + end);
    filter.Q.value = ring;
    src.connect(filter).connect(envelope(t, gain, attack, end)).connect(ac.destination);
    src.start(t, from, end);
  }
  // A pure tone sliding from one pitch to another
  function tone(t, { from, to, gain, attack, end }) {
    const osc = ac.createOscillator();
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(to, t + end);
    osc.connect(envelope(t, gain, attack, end)).connect(ac.destination);
    osc.start(t);
    osc.stop(t + end);
  }

  // § footstep: a short burst of muffled noise, a light "tk"
  function footstep() {
    if (!ready()) return;
    slice(ac.currentTime, {
      type: 'lowpass', rate: between(vary, 1 - STEP.rate, 1 + STEP.rate), freq: between(vary, STEP.low, STEP.high),
      gain: STEP.gain * between(vary, STEP.quiet, 1), attack: STEP.attack, end: STEP.end, from: between(vary, 0, NOISE_S - 2 * STEP.end),
    });
  }
  // § lantern tick: a soft "tok" each time the lantern goes on or off, by hand or by itself
  function lantern(lit) {
    if (!ready()) return;
    slice(ac.currentTime, { type: 'bandpass', freq: lit ? TICK.on : TICK.off, ring: TICK.ring, gain: TICK.gain, attack: TICK.attack, end: TICK.end, from: TICK.from });
  }
  // § hit: the hero strikes a creature, with the lantern or with the knife held
  function hit(knife) {
    if (!ready()) return;
    const t = ac.currentTime, p = between(varyHit, 1 - HIT.pitch, 1 + HIT.pitch), loud = between(varyHit, HIT.quiet, 1);
    const { thud, dull } = HIT;
    tone(t, { ...thud, from: thud.from * p, to: thud.to * p, gain: thud.gain * loud });
    slice(t, { type: 'lowpass', ...dull, freq: dull.freq * p, gain: dull.gain * loud });
    if (knife) slice(t, { type: 'bandpass', ...HIT.knife, freq: HIT.knife.freq * p, gain: HIT.knife.gain * loud });
  }
  // § teeth: a rat's bite; `afterHit` when the hero hit something this same turn
  function teeth(afterHit) {
    if (!ready()) return;
    const t = ac.currentTime + (afterHit ? TEETH.afterHit : 0);
    const p = between(varyBite, 1 - HIT.pitch, 1 + HIT.pitch), loud = between(varyBite, HIT.quiet, 1);
    const { snap, breath } = TEETH;
    for (const d of TEETH.snaps) slice(t + d, { type: 'bandpass', ...snap, freq: snap.freq * p, gain: snap.gain * loud, from: snap.from + d });
    slice(t + TEETH.breathAt, { type: 'lowpass', ...breath, freq: breath.freq * p, sweepTo: breath.sweepTo * p, gain: breath.gain * loud });
  }
  // § glass: the flask mimic's bite, a clink and a snap; `afterHit` as for teeth
  function glass(afterHit) {
    if (!ready()) return;
    const t = ac.currentTime + (afterHit ? TEETH.afterHit : 0);
    const p = between(varyBite, 1 - HIT.pitch, 1 + HIT.pitch), loud = between(varyBite, HIT.quiet, 1);
    const { clink, ping } = GLASS, { snap } = TEETH;
    slice(t, { type: 'bandpass', ...clink, freq: clink.freq * p, gain: clink.gain * loud });
    tone(t, { ...ping, from: ping.from * p, to: ping.to * p, gain: ping.gain * loud });
    slice(t + GLASS.snapAt, { type: 'bandpass', ...snap, freq: snap.freq * p, gain: snap.gain * loud });
  }
  // § sting: the scorpion's, two clicks and a stab; `afterHit` as for teeth
  function sting(afterHit) {
    if (!ready()) return;
    const t = ac.currentTime + (afterHit ? TEETH.afterHit : 0);
    const p = between(varyBite, 1 - HIT.pitch, 1 + HIT.pitch), loud = between(varyBite, HIT.quiet, 1);
    const { click, stab } = STING;
    for (const d of STING.clicks) slice(t + d, { type: 'bandpass', ...click, freq: click.freq * p, gain: click.gain * loud, from: click.from + d });
    slice(t + STING.stabAt, { type: 'bandpass', ...stab, freq: stab.freq * p, sweepTo: stab.sweepTo * p, gain: stab.gain * loud });
  }
  // § hiss: the cave spider's, a soft hiss and a click; `afterHit` as for teeth
  function hiss(afterHit) {
    if (!ready()) return;
    const t = ac.currentTime + (afterHit ? TEETH.afterHit : 0);
    const p = between(varyBite, 1 - HIT.pitch, 1 + HIT.pitch), loud = between(varyBite, HIT.quiet, 1);
    const { hiss: h, click } = HISS;
    slice(t, { type: 'bandpass', ...h, freq: h.freq * p, sweepTo: h.sweepTo * p, gain: h.gain * loud });
    slice(t + HISS.clickAt, { type: 'bandpass', ...click, freq: click.freq * p, gain: click.gain * loud });
  }
  // § squeak: the bat's, a chirp and a flap; `afterHit` as for teeth
  function squeak(afterHit) {
    if (!ready()) return;
    const t = ac.currentTime + (afterHit ? TEETH.afterHit : 0);
    const p = between(varyBite, 1 - HIT.pitch, 1 + HIT.pitch), loud = between(varyBite, HIT.quiet, 1);
    const { chirp, flap } = SQUEAK;
    tone(t, { ...chirp, from: chirp.from * p, to: chirp.to * p, gain: chirp.gain * loud });
    slice(t + SQUEAK.flapAt, { type: 'lowpass', ...flap, freq: flap.freq * p, sweepTo: flap.sweepTo * p, gain: flap.gain * loud });
  }
  // § snuffle: the mole's, two sniffs and a scrape; `afterHit` as for teeth
  function snuffle(afterHit) {
    if (!ready()) return;
    const t = ac.currentTime + (afterHit ? TEETH.afterHit : 0);
    const p = between(varyBite, 1 - HIT.pitch, 1 + HIT.pitch), loud = between(varyBite, HIT.quiet, 1);
    const { sniff, scrape } = SNUFFLE;
    for (const d of SNUFFLE.sniffs) slice(t + d, { type: 'bandpass', ...sniff, freq: sniff.freq * p, sweepTo: sniff.sweepTo * p, gain: sniff.gain * loud, from: sniff.from + d });
    slice(t + SNUFFLE.scrapeAt, { type: 'bandpass', ...scrape, freq: scrape.freq * p, sweepTo: scrape.sweepTo * p, gain: scrape.gain * loud });
  }
  // § snap: the snapcap's, a wet squelch and the snap of its cap; `afterHit` as for teeth
  function snap(afterHit) {
    if (!ready()) return;
    const t = ac.currentTime + (afterHit ? TEETH.afterHit : 0);
    const p = between(varyBite, 1 - HIT.pitch, 1 + HIT.pitch), loud = between(varyBite, HIT.quiet, 1);
    const { squelch, shut, click } = SNAP;
    slice(t, { type: 'lowpass', ...squelch, freq: squelch.freq * p, sweepTo: squelch.sweepTo * p, gain: squelch.gain * loud });
    tone(t + SNAP.shutAt, { ...shut, from: shut.from * p, to: shut.to * p, gain: shut.gain * loud });
    slice(t + SNAP.shutAt, { type: 'bandpass', ...click, freq: click.freq * p, gain: click.gain * loud });
  }
  // § rustle: the herb mimic's, dry leaves and a snap of teeth; `afterHit` as for teeth
  function rustle(afterHit) {
    if (!ready()) return;
    const t = ac.currentTime + (afterHit ? TEETH.afterHit : 0);
    const p = between(varyBite, 1 - HIT.pitch, 1 + HIT.pitch), loud = between(varyBite, HIT.quiet, 1);
    const { leaf } = RUSTLE, { snap } = TEETH;
    for (const d of RUSTLE.leaves) slice(t + d, { type: 'bandpass', ...leaf, freq: leaf.freq * p, sweepTo: leaf.sweepTo * p, gain: leaf.gain * loud, from: leaf.from + d });
    for (const d of TEETH.snaps) slice(t + RUSTLE.snapAt + d, { type: 'bandpass', ...snap, freq: snap.freq * p, gain: snap.gain * loud, from: snap.from + d });
  }
  // § rattle: the bone rat's, a clatter of bones and a snap of teeth; `afterHit` as for teeth
  function rattle(afterHit) {
    if (!ready()) return;
    const t = ac.currentTime + (afterHit ? TEETH.afterHit : 0);
    const p = between(varyBite, 1 - HIT.pitch, 1 + HIT.pitch), loud = between(varyBite, HIT.quiet, 1);
    const { knock } = RATTLE, { snap } = TEETH;
    RATTLE.knocks.forEach((d, i) => slice(t + d, { type: 'bandpass', ...knock, freq: knock.freq * p * RATTLE.drop ** i, gain: knock.gain * loud, from: knock.from + d }));
    for (const d of TEETH.snaps) slice(t + RATTLE.snapAt + d, { type: 'bandpass', ...snap, freq: snap.freq * p, gain: snap.gain * loud, from: snap.from + d });
  }
  return { footstep, lantern, hit, teeth, glass, sting, hiss, squeak, snuffle, snap, rustle, rattle };
}
