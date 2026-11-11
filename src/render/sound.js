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
// Digging and chests next (D-825): a mining clink for each bump on stone, a deeper one
// and small stones tumbling as it breaks; a wooden creak as a chest opens, a knock as it closes.
// Home next (D-828): coins for a sale, a book set on wood for a relic shelved, two soft earth
// steps for a seed planted, the bag's pat dulled for guano fed.
// The lantern and the light next (D-830), from the elemental pack: glugs for a flask poured, a crackle
// that slows and fades as the oil runs out, a quick whoosh for a torch lit, a fire catching for a campfire.
// The fight's rest next (D-831): a short puff of air for a stiff swing that misses, a dull muffled blow
// for the hero hurt by a bite, a deep slow throb twice as poison takes a heart, three glass notes rising for a level.
// The creatures' bites next (D-832), one for each kind: a double nip, a clink and a snap, clicks and a stab, a hiss,
// chirps and a flap, sniffs and a scrape, a squelch and a snap, leaves and teeth, a clatter of bones, a slurp and a gulp.
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
// by what the game passes in, as the hit does: the lantern's knock or the knife's slice;
// `part` marks files heard only as part of another sound, with no line of their own; `with`
// plays other entries too, each that many seconds later, as the break's stones tumble; `wait`
// starts it that many seconds late every time, as the chest's knock after the page (D-825);
// `from` starts that many seconds into the file and `len` plays that many seconds of it, its
// last `fade` seconds fading out, and `slide` is the pitch it slides to over them (D-830)
const impact = (name) => [0, 1, 2, 3, 4].map((n) => `kenney-impact-sounds/${name}_00${n}.ogg`);
const PACKS = 'sounds/packs/';
const steps = (ground) => impact(`footstep_${ground}`);
const elements = (name) => [`morphonaut-elemental-forces/${name.split('-')[0]}/${name}.ogg`];
const nip = impact('impactGeneric_light').slice(0, 2); // a small snap of teeth (D-832)
const pluck = ['kenney-interface-sounds/pluck_001.ogg', 'kenney-interface-sounds/pluck_002.ogg']; // a dry click, or high, a chirp
const puffs = [12, 13, 14].map((n) => elements(`Wind-0${n}`)[0]); // short puffs of air: the stiff miss, or high, a sniff
const bones = impact('impactWood_light').slice(0, 3);
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
  cardOpen: { files: ['kenney-rpg-audio/bookFlip3.ogg'], gain: 0.38, pitch: 0, part: true }, // each as loud as a step
  cardClose: { files: ['kenney-rpg-audio/bookFlip2.ogg'], gain: 0.58, pitch: 0, part: true },
  refuse: { files: ['kenney-impact-sounds/impactWood_light_000.ogg'], gain: 0.25, pitch: 0, pitchOf: () => 0.75 }, // a quarter lower
  pat: { files: [1, 2, 3, 4].map((n) => `kenney-rpg-audio/cloth${n}.ogg`), gain: 0.33, pitch: 0.06 }, // each as loud as a step (D-820)
  draw: { files: ['kenney-rpg-audio/drawKnife3.ogg'], gain: 0.82, pitch: 0 },
  thunk: { files: impact('impactWood_medium'), gain: 0.25, pitch: 0.06 },
  clink: { files: impact('impactMining'), gain: 0.25, pitch: 0.06, echo: true }, // each bump on stone (D-825)
  crumble: { files: impact('impactMining'), gain: 0.35, pitch: 0.03, pitchOf: () => 0.75, echo: true, with: [['patter', 0.12], ['patter', 0.22], ['patter', 0.34]] }, // it breaks: a quarter lower, then stones tumble
  patter: { files: steps('concrete'), gain: 0.12, pitch: 0.1, pitchOf: () => 1.2, echo: true, part: true },
  chest: { as: (open) => (open ? 'chestOpen' : 'chestClose') },
  chestOpen: { files: ['kenney-rpg-audio/creak1.ogg'], gain: 0.5, pitch: 0, part: true }, // before the page flips (D-825)
  chestClose: { files: impact('impactWood_heavy'), gain: 0.25, pitch: 0.04, wait: 0.1, part: true }, // after it
  coins: { files: ['kenney-rpg-audio/handleCoins.ogg'], gain: 0.25, pitch: 0.04 }, // an item sold at home (D-828)
  shelf: { files: [1, 2, 3].map((n) => `kenney-rpg-audio/bookPlace${n}.ogg`), gain: 0.25, pitch: 0.06 }, // a relic set on the shelf
  sow: { files: steps('grass'), gain: 0.25, pitch: 0.06, muffle: 1400, with: [['sowAgain', 0.13]] }, // a seed planted: two quick earth steps
  sowAgain: { files: steps('grass'), gain: 0.2, pitch: 0.06, muffle: 1400, part: true },
  feed: { files: [1, 2, 3, 4].map((n) => `kenney-rpg-audio/cloth${n}.ogg`), gain: 0.33, pitch: 0.06, muffle: 1400 }, // guano fed: the bag's pat, dulled
  pour: { files: elements('Water-027'), gain: 0.47, pitch: 0 }, // a flask poured: seven quick glugs (D-830)
  gutter: { files: elements('Fire-017'), gain: 0.22, pitch: 0, len: 1.3, fade: 1, slide: 0.7 }, // the oil runs out: a crackle slowing as it fades
  torch: { files: elements('Fire-030'), gain: 0.24, pitch: 0, from: 0.1, len: 1.2, fade: 0.5 }, // a torch lit: a quick whoosh
  kindle: { files: elements('Fire-021'), gain: 0.27, pitch: 0, from: 0.18, len: 2.4, fade: 0.9 }, // cold ashes lit: a fire catching, then burning
  miss: { files: puffs, gain: 0.55, pitch: 0.06 }, // stiff, the swing goes wide: a puff of air (D-831)
  hurt: { files: impact('impactPunch_heavy'), gain: 0.32, pitch: 0.04, pitchOf: () => 0.9, muffle: 900, after: 0.25 }, // a bite takes a heart: a dull blow, after the hero's swing
  poison: { files: impact('impactPunch_heavy'), gain: 0.36, pitch: 0, pitchOf: () => 0.6, muffle: 400, with: [['poisonAgain', 0.35]] }, // poison takes a heart: a deep throb, twice
  poisonAgain: { files: impact('impactPunch_heavy'), gain: 0.26, pitch: 0, pitchOf: () => 0.57, muffle: 400, part: true },
  rise: { files: [impact('impactGlass_light')[0]], gain: 0.2, pitch: 0, wait: 0.55, with: [['rise2', 0.11], ['rise3', 0.22]] }, // a level: three glass notes rising, after the beaten thud
  rise2: { files: [impact('impactGlass_light')[1]], gain: 0.18, pitch: 0, pitchOf: () => 1.26, wait: 0.55, part: true },
  rise3: { files: [impact('impactGlass_light')[2]], gain: 0.16, pitch: 0, pitchOf: () => 1.5, wait: 0.55, part: true },
  bites: { as: () => 'teeth' }, // Settings' one line for every bite, turned On, plays the rat's (D-832)
  // § bites: one for each kind of creature, each a quarter second after the hero's swing, as the blow is (D-832)
  teeth: { files: nip, gain: 0.22, pitch: 0.05, pitchOf: () => 1.7, after: 0.25, with: [['teeth2', 0.07]] }, // a rat or a centipede: a quick double nip
  teeth2: { files: nip, gain: 0.18, pitch: 0.05, pitchOf: () => 1.95, part: true },
  glass: { files: impact('impactGlass_light').slice(0, 2), gain: 0.2, pitch: 0.04, pitchOf: () => 1.1, after: 0.25, with: [['glassSnap', 0.08]] }, // a flask mimic: a glass clink, then a snap
  glassSnap: { files: nip, gain: 0.22, pitch: 0.05, pitchOf: () => 1.5, part: true },
  sting: { files: pluck, gain: 0.2, pitch: 0.04, pitchOf: () => 0.8, after: 0.25, with: [['sting2', 0.09], ['stab', 0.2]] }, // a scorpion: two dry clicks, then a stab
  sting2: { files: pluck, gain: 0.2, pitch: 0.04, pitchOf: () => 0.85, part: true },
  stab: { files: ['kenney-rpg-audio/knifeSlice.ogg'], gain: 0.25, pitch: 0.04, len: 0.3, fade: 0.12, part: true },
  hiss: { files: elements('Wind-015'), gain: 0.35, pitch: 0, pitchOf: () => 1.2, len: 0.5, fade: 0.3, after: 0.25, with: [['hissClick', 0.35]] }, // a cave spider: a soft hiss, then a click
  hissClick: { files: pluck, gain: 0.15, pitch: 0.04, pitchOf: () => 0.9, part: true },
  squeak: { files: pluck, gain: 0.15, pitch: 0.04, pitchOf: () => 1.6, after: 0.25, with: [['squeak2', 0.07], ['flap', 0.12]] }, // a bat: two high chirps, then a flap
  squeak2: { files: pluck, gain: 0.13, pitch: 0.04, pitchOf: () => 1.7, part: true },
  flap: { files: ['kenney-rpg-audio/cloth1.ogg', 'kenney-rpg-audio/cloth2.ogg'], gain: 0.3, pitch: 0.05, pitchOf: () => 1.3, part: true },
  snuffle: { files: puffs, gain: 0.4, pitch: 0.05, pitchOf: () => 1.5, after: 0.25, with: [['sniff2', 0.12], ['sniff3', 0.24], ['scrape', 0.4]] }, // a mole: three quick sniffs, then a scrape
  sniff2: { files: puffs, gain: 0.36, pitch: 0.05, pitchOf: () => 1.5, part: true },
  sniff3: { files: puffs, gain: 0.32, pitch: 0.05, pitchOf: () => 1.5, part: true },
  scrape: { files: steps('snow').slice(0, 2), gain: 0.25, pitch: 0.05, part: true },
  snap: { files: elements('Water-025'), gain: 0.35, pitch: 0, pitchOf: () => 1.2, len: 0.35, fade: 0.15, after: 0.25, with: [['snapNip', 0.12]] }, // a snapcap: a wet squelch, then a snap
  snapNip: { files: nip, gain: 0.25, pitch: 0.05, pitchOf: () => 1.4, part: true },
  rustle: { files: steps('grass'), gain: 0.3, pitch: 0.06, pitchOf: () => 1.3, after: 0.25, with: [['rustle2', 0.08], ['rustleNip', 0.16]] }, // a herb mimic: a rustle of leaves, then teeth
  rustle2: { files: steps('grass'), gain: 0.26, pitch: 0.06, pitchOf: () => 1.4, part: true },
  rustleNip: { files: nip, gain: 0.22, pitch: 0.05, pitchOf: () => 1.7, part: true },
  rattle: { files: [bones[0]], gain: 0.2, pitch: 0.05, pitchOf: () => 1.6, after: 0.25, with: [['rattle2', 0.05], ['rattle3', 0.1], ['rattle4', 0.16]] }, // a bone rat: a quick clatter of bones
  rattle2: { files: [bones[1]], gain: 0.18, pitch: 0.05, pitchOf: () => 1.6, part: true },
  rattle3: { files: [bones[2]], gain: 0.16, pitch: 0.05, pitchOf: () => 1.6, part: true },
  rattle4: { files: [bones[0]], gain: 0.14, pitch: 0.05, pitchOf: () => 1.6, part: true },
  sip: { files: elements('Water-038'), gain: 0.35, pitch: 0, pitchOf: () => 1.1, len: 0.4, fade: 0.15, after: 0.25, with: [['gulp', 0.25]] }, // an oil tick drinks: a wet slurp, then a gulp
  gulp: { files: elements('Water-025'), gain: 0.3, pitch: 0, pitchOf: () => 1.3, len: 0.3, fade: 0.12, part: true },
};

// § voices: every sound the game asks for, each silent until its file is in
const VOICES = ['footstep', 'stoneStep', 'earthStep', 'lantern', 'hit', 'beaten', 'teeth', 'glass', 'sting', 'hiss', 'squeak', 'snuffle', 'snap', 'rustle', 'rattle', 'sip', 'bells', 'chime', 'plop', 'splash', 'tap', 'card', 'refuse', 'pat', 'draw', 'thunk', 'clink', 'crumble', 'chest', 'coins', 'shelf', 'sow', 'feed', 'pour', 'gutter', 'torch', 'kindle', 'miss', 'hurt', 'poison', 'rise'];
// § kinds: which loudness each sound follows (D-823): Steps with the lantern and the light,
// Fighting with the creatures, Finds with the bag and places, and Menus
const KINDS = {
  steps: ['footstep', 'stoneStep', 'earthStep', 'lantern', 'pour', 'gutter', 'torch', 'kindle'],
  fight: ['hit', 'lanternHit', 'knifeHit', 'beaten', 'teeth', 'glass', 'sting', 'hiss', 'squeak', 'snuffle', 'snap', 'rustle', 'rattle', 'sip', 'miss', 'hurt', 'poison', 'poisonAgain', 'rise', 'rise2', 'rise3', 'bites', 'teeth2', 'glassSnap', 'sting2', 'stab', 'hissClick', 'squeak2', 'flap', 'sniff2', 'sniff3', 'scrape', 'snapNip', 'rustle2', 'rustleNip', 'rattle2', 'rattle3', 'rattle4', 'gulp'],
  finds: ['pat', 'draw', 'thunk', 'clink', 'crumble', 'patter', 'chest', 'chestOpen', 'chestClose', 'coins', 'shelf', 'sow', 'sowAgain', 'feed', 'bells', 'chime', 'plop', 'splash'],
  menus: ['tap', 'card', 'cardOpen', 'cardClose', 'refuse'],
};
export const kindOf = (voice) => Object.keys(KINDS).find((k) => KINDS[k].includes(voice));
// What plays as a kind's loudness changes, at its new loudness: a step, a hit, a pat, the tick
export const KIND_SOUND = { steps: 'footstep', fight: 'hit', finds: 'pat', menus: 'tap' };
export { VOICES };
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

export function createSound(isOn, loudness = () => 1, muted = () => false) { // muted: a sound turned Off on its own (D-824) // loudness: a kind's, Loudness times its share, 0 to 1 (D-822, D-823)
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
  function play(voice, arg, at = 0) {
    if (!ready() || muted(voice)) return;
    if (FILES[voice].as) return play(FILES[voice].as(arg));
    const { gain, pitch, pitchOf, muffle, after = 0, wait = 0, echo: echoes } = FILES[voice], got = buffers[voice].map((b, i) => (b ? i : -1)).filter((i) => i >= 0);
    const choices = got.length > 1 ? got.filter((i) => i !== last[voice]) : got;
    if (!choices.length) return;
    const i = choices[Math.floor(vary() * choices.length)];
    last[voice] = i;
    const src = ac.createBufferSource(), g = ac.createGain();
    src.buffer = buffers[voice][i];
    src.playbackRate.value = (pitchOf ? pitchOf(arg) : 1) + (vary() * 2 - 1) * pitch;
    g.gain.value = gain * loudness(kindOf(voice));
    if (muffle) {
      const dull = ac.createBiquadFilter();
      dull.type = 'lowpass';
      dull.frequency.value = muffle;
      src.connect(dull).connect(g);
    } else src.connect(g);
    g.connect(ac.destination);
    if (echoes) g.connect(echo);
    const when = ac.currentTime + at + wait + (arg === true ? after : 0), rate = src.playbackRate.value, { from = 0, len, fade, slide } = FILES[voice];
    if (len) { // only part of the file: it fades out over its last `fade` seconds, its pitch sliding to `slide`
      if (fade) { g.gain.setValueAtTime(g.gain.value, when + len - fade); g.gain.linearRampToValueAtTime(0, when + len); }
      if (slide) { src.playbackRate.setValueAtTime(rate, when); src.playbackRate.linearRampToValueAtTime(slide, when + len); }
      src.start(when, from);
      src.stop(when + len);
    } else src.start(when, from);
    for (const [v, later] of FILES[voice].with ?? []) play(v, undefined, at + later + (arg === true ? after : 0)); // after the swing too, as the bite's own parts (D-832)
  }
  const voice = (v) => (FILES[v] ? (arg) => play(v, arg) : () => {});
  const { footstep, stoneStep, earthStep, lantern, hit, beaten, teeth, glass, sting, hiss, squeak, snuffle, snap, rustle, rattle, sip, bells, chime, plop, splash, tap, card, refuse, pat, draw, thunk, clink, crumble, chest, coins, shelf, sow, feed, pour, gutter, torch, kindle, miss, hurt, poison, rise } = Object.fromEntries(VOICES.map((v) => [v, voice(v)]));
  const sample = (v) => FILES[v] && play(v, true); // one sound by its name, as Settings' list turns it On (D-824)
  return { footstep, stoneStep, earthStep, lantern, hit, beaten, teeth, glass, sting, hiss, squeak, snuffle, snap, rustle, rattle, sip, bells, chime, plop, splash, tap, card, refuse, pat, draw, thunk, clink, crumble, chest, coins, shelf, sow, feed, pour, gutter, torch, kindle, miss, hurt, poison, rise, sample };
}
