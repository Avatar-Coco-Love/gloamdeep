// § sound: the game's sounds, from sound files (D-773), each from the list in
// docs/SOUNDS.md and played with Web Audio. They go in one by one; a sound with
// no file yet stays silent. The first is the footstep: Kenney's grass steps, on
// the surface only, at a quarter loudness, a little higher or lower each time (D-774).
// The lantern's metal click is next (D-775): higher for on, lower for off.
// Below ground the steps change with the floor (D-776): concrete with a faint echo
// off the walls, and in the burrows the grass steps muffled into packed earth.
// The fight's sounds next (D-777): the hit, a muffled punch with the lantern or a
// knife's slice with a weapon in hand, and a soft heavy thud a moment later when
// a creature is beaten.
// The menus' sounds next (D-819): a soft tick for a button tapped, a page flip as a
// card opens or closes, and a low wooden tock when a dim pick can't be done.
// The bag's sounds next (D-820): a soft pat of cloth as an item goes into the bag, a
// knife drawn as a weapon goes into the hand, a wooden knock as a tile is set down.
// What stays is each sound's name and the moment it plays (main.js's `hear`, the
// creatures' `sound` and `sips` in enemies.js), so a file plugs straight in.
// A browser plays sound only after a tap, click or key, so the sound maker starts
// on the first one and fetches the files then; until then, and with Sound: Off,
// nothing plays.
import { rng } from '../core/rng.js';

// § files: each sound's files (under sounds/packs/), its loudness (1 is the file's own)
// and how far its pitch may stray each time (a tenth is 0.1); `pitchOf` sets a pitch
// from what the game passes in, such as the lantern's on or off (1 is the file's own);
// `muffle` cuts the sound's brightness off above that many Hz, and `echo` sends it to
// the cave's echo too (D-776); `after` waits that many seconds when the game passes
// true, as the beaten thud does after a hit (D-777); `as` plays another entry's files
// by what the game passes in, as the hit does: the lantern's knock or the knife's slice
const impact = (name) => [0, 1, 2, 3, 4].map((n) => `kenney-impact-sounds/${name}_00${n}.ogg`);
const PACKS = 'sounds/packs/';
const steps = (ground) => impact(`footstep_${ground}`);
export const FILES = {
  footstep: { files: steps('grass'), gain: 0.25, pitch: 0.06 },
  stoneStep: { files: steps('concrete'), gain: 0.1, pitch: 0.06, echo: true },
  earthStep: { files: steps('grass'), gain: 0.25, pitch: 0.06, muffle: 1400 },
  lantern: { files: ['kenney-rpg-audio/metalClick.ogg'], gain: 0.5, pitch: 0, pitchOf: (lit) => (lit ? 1.12 : 0.89) },
  hit: { as: (held) => (held ? 'knifeHit' : 'lanternHit') },
  lanternHit: { files: impact('impactPunch_medium'), gain: 0.25, pitch: 0.06 },
  knifeHit: { files: ['kenney-rpg-audio/knifeSlice.ogg', 'kenney-rpg-audio/knifeSlice2.ogg'], gain: 0.25, pitch: 0.06 },
  beaten: { files: impact('impactSoft_heavy'), gain: 0.25, pitch: 0.06, after: 0.12 },
  tap: { files: ['kenney-interface-sounds/tick_002.ogg'], gain: 0.12, pitch: 0 }, // half a step's peak (D-819)
  card: { as: (open) => (open ? 'cardOpen' : 'cardClose') },
  cardOpen: { files: ['kenney-rpg-audio/bookFlip3.ogg'], gain: 0.38, pitch: 0 }, // each as loud as a step
  cardClose: { files: ['kenney-rpg-audio/bookFlip2.ogg'], gain: 0.58, pitch: 0 },
  refuse: { files: ['kenney-impact-sounds/impactWood_light_000.ogg'], gain: 0.25, pitch: 0, pitchOf: () => 0.75 }, // a quarter lower
  pat: { files: [1, 2, 3, 4].map((n) => `kenney-rpg-audio/cloth${n}.ogg`), gain: 0.33, pitch: 0.06 }, // each as loud as a step (D-820)
  draw: { files: ['kenney-rpg-audio/drawKnife3.ogg'], gain: 0.82, pitch: 0 },
  thunk: { files: impact('impactWood_medium'), gain: 0.25, pitch: 0.06 },
};

// § voices: every sound the game asks for, each silent until its file is in
const VOICES = ['footstep', 'stoneStep', 'earthStep', 'lantern', 'hit', 'beaten', 'teeth', 'glass', 'sting', 'hiss', 'squeak', 'snuffle', 'snap', 'rustle', 'rattle', 'sip', 'bells', 'chime', 'plop', 'splash', 'tap', 'card', 'refuse', 'pat', 'draw', 'thunk'];
const SEED = 255; // the steps' variety, the same on every visit

// § ground: which step the hero's feet make: grass on the surface, packed earth in
// the burrows, stone everywhere else below (the crypt, rock caves, dungeon halls) (D-776)
export const stepOf = (sky, look) => (sky ? 'footstep' : look === 'earth' ? 'earthStep' : 'stoneStep');

// § cards: which way a page turns as the screen changes (D-819). Play, setting a tile down
// and the title have no card on them: reaching one closes. Going back to a screen still
// under the open cards closes down to it; any other screen opens on top. `trail` is the
// screens open, the first under the rest.
const BARE = ['play', 'place', 'title'];
export function cardTurn(trail, to) {
  if (BARE.includes(to)) return { trail: [to], open: false };
  const at = trail.indexOf(to);
  return at >= 0 ? { trail: trail.slice(0, at + 1), open: false } : { trail: [...trail, to], open: true };
}

export function createSound(isOn, loudness = () => 1) { // loudness: every sound's together, 0 to 1 (D-822)
  let ac = null, echo = null; // the sound maker, and the cave's echo: a short repeat off the walls, fading (D-776)
  const buffers = {}; // each voice's decoded files, filled once they arrive
  const vary = rng(SEED + 1); // which file and what pitch, each time
  const last = {}; // the file each voice played last, never played twice running
  // § start: on the first tap, click or key, the sound maker is made and the files fetched
  function start() {
    if (!ac) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ac = new AC();
      echo = ac.createDelay();
      echo.delayTime.value = 0.09;
      const dull = ac.createBiquadFilter(), back = ac.createGain(), out = ac.createGain();
      dull.type = 'lowpass';
      dull.frequency.value = 2200;
      back.gain.value = 0.3;
      out.gain.value = 0.35;
      echo.connect(dull).connect(back).connect(echo);
      dull.connect(out).connect(ac.destination);
      for (const [voice, { files = [] }] of Object.entries(FILES)) {
        buffers[voice] = [];
        files.forEach((f, i) => {
          fetch(PACKS + f).then((r) => r.arrayBuffer()).then((b) => ac.decodeAudioData(b))
            .then((d) => { buffers[voice][i] = d; }).catch(() => {}); // a file that fails stays silent
        });
      }
    }
    if (ac.state === 'suspended') ac.resume();
  }
  addEventListener('pointerdown', start, { capture: true });
  addEventListener('keydown', start, { capture: true });
  const ready = () => ac && ac.state === 'running' && isOn();

  // § play: one of the voice's files, not the last one, at its loudness and a pitch near its own
  function play(voice, arg) {
    if (!ready()) return;
    if (FILES[voice].as) return play(FILES[voice].as(arg));
    const { gain, pitch, pitchOf, muffle, after = 0, echo: echoes } = FILES[voice], got = buffers[voice].map((b, i) => (b ? i : -1)).filter((i) => i >= 0);
    const choices = got.length > 1 ? got.filter((i) => i !== last[voice]) : got;
    if (!choices.length) return;
    const i = choices[Math.floor(vary() * choices.length)];
    last[voice] = i;
    const src = ac.createBufferSource(), g = ac.createGain();
    src.buffer = buffers[voice][i];
    src.playbackRate.value = (pitchOf ? pitchOf(arg) : 1) + (vary() * 2 - 1) * pitch;
    g.gain.value = gain * loudness();
    if (muffle) {
      const dull = ac.createBiquadFilter();
      dull.type = 'lowpass';
      dull.frequency.value = muffle;
      src.connect(dull).connect(g);
    } else src.connect(g);
    g.connect(ac.destination);
    if (echoes) g.connect(echo);
    src.start(ac.currentTime + (arg === true ? after : 0));
  }
  const voice = (v) => (FILES[v] ? (arg) => play(v, arg) : () => {});
  const { footstep, stoneStep, earthStep, lantern, hit, beaten, teeth, glass, sting, hiss, squeak, snuffle, snap, rustle, rattle, sip, bells, chime, plop, splash, tap, card, refuse, pat, draw, thunk } = Object.fromEntries(VOICES.map((v) => [v, voice(v)]));
  return { footstep, stoneStep, earthStep, lantern, hit, beaten, teeth, glass, sting, hiss, squeak, snuffle, snap, rustle, rattle, sip, bells, chime, plop, splash, tap, card, refuse, pat, draw, thunk };
}
