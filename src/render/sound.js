// § sound: the game's sounds, from sound files (D-773), each from the list in
// docs/SOUNDS.md and played with Web Audio. They go in one by one; a sound with
// no file yet stays silent. The first is the footstep: Kenney's grass steps, on
// the surface only, at a quarter loudness, a little higher or lower each time (D-774).
// The lantern's metal click is next (D-775): higher for on, lower for off.
// What stays is each sound's name and the moment it plays (main.js's `hear`, the
// creatures' `sound` and `sips` in enemies.js), so a file plugs straight in.
// A browser plays sound only after a tap, click or key, so the sound maker starts
// on the first one and fetches the files then; until then, and with Sound: Off,
// nothing plays.
import { rng } from '../core/rng.js';

// § files: each sound's files (under sounds/packs/), its loudness (1 is the file's own)
// and how far its pitch may stray each time (a tenth is 0.1); `pitchOf` sets a pitch
// from what the game passes in, such as the lantern's on or off (1 is the file's own)
const PACKS = 'sounds/packs/';
const grass = [0, 1, 2, 3, 4].map((n) => `kenney-impact-sounds/footstep_grass_00${n}.ogg`);
export const FILES = {
  footstep: { files: grass, gain: 0.25, pitch: 0.06 },
  lantern: { files: ['kenney-rpg-audio/metalClick.ogg'], gain: 0.5, pitch: 0, pitchOf: (lit) => (lit ? 1.12 : 0.89) },
};

// § voices: every sound the game asks for, each silent until its file is in
const VOICES = ['footstep', 'lantern', 'hit', 'teeth', 'glass', 'sting', 'hiss', 'squeak', 'snuffle', 'snap', 'rustle', 'rattle', 'sip', 'bells', 'chime', 'plop', 'splash'];
const SEED = 255; // the steps' variety, the same on every visit

export function createSound(isOn) {
  let ac = null;
  const buffers = {}; // each voice's decoded files, filled once they arrive
  const vary = rng(SEED + 1); // which file and what pitch, each time
  const last = {}; // the file each voice played last, never played twice running
  // § start: on the first tap, click or key, the sound maker is made and the files fetched
  function start() {
    if (!ac) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ac = new AC();
      for (const [voice, { files }] of Object.entries(FILES)) {
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
    const { gain, pitch, pitchOf } = FILES[voice], got = buffers[voice].map((b, i) => (b ? i : -1)).filter((i) => i >= 0);
    const choices = got.length > 1 ? got.filter((i) => i !== last[voice]) : got;
    if (!choices.length) return;
    const i = choices[Math.floor(vary() * choices.length)];
    last[voice] = i;
    const src = ac.createBufferSource(), g = ac.createGain();
    src.buffer = buffers[voice][i];
    src.playbackRate.value = (pitchOf ? pitchOf(arg) : 1) + (vary() * 2 - 1) * pitch;
    g.gain.value = gain;
    src.connect(g).connect(ac.destination);
    src.start();
  }
  const voice = (v) => (FILES[v] ? (arg) => play(v, arg) : () => {});
  const { footstep, lantern, hit, teeth, glass, sting, hiss, squeak, snuffle, snap, rustle, rattle, sip, bells, chime, plop, splash } = Object.fromEntries(VOICES.map((v) => [v, voice(v)]));
  return { footstep, lantern, hit, teeth, glass, sting, hiss, squeak, snuffle, snap, rustle, rattle, sip, bells, chime, plop, splash };
}
