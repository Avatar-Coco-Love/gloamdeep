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
// The rest next (D-833), Claude's recommended picks by the owner's go-ahead: the last three bites, the creatures' own
// sounds, a fall and waking, new floors and rooms, eating, people, making, the places' bells and water, sleep, the run's end.
// The first "Maybe" next (D-834): the oil's warning, two short sputters cut from the empty lantern's
// crackle, as "The flame is getting low." is said.
// Chopping next (D-842): an axe's chop for each bump on a tree, and as it falls a last chop and a
// heavy wooden thud, the slow creak gone (D-846); under Digging's and Stone breaks' lines in Settings.
// A fallen branch chops too (D-843), and as it snaps a last chop and a light wooden knock.
// The heartbeat next (D-835): a soft lub-dub twice, the second fainter, as the hero drops to the last heart.
// Sounds all around next (D-836), drips in the rock caves first: a drop and its ripple, through the cave's
// echo, every 8 to 16 seconds while the hero plays there, each a little left or right.
// What stays is each sound's name and the moment it plays (main.js's `hear`, the
// creatures' `sound` and `sips` in enemies.js), so a file plugs straight in.
// A browser plays sound only after a tap, click or key, so the sound maker starts
// on the first one and fetches the files then; until then, and with Sound: Off,
// nothing plays.
import { rng } from '../core/rng.js';
import { FILES_1 } from './sound-files.js';
import { FILES_2 } from './sound-files-2.js';

const PACKS = 'sounds/packs/';
// § files: each sound's files, its loudness and pitch, in sound-files.js and sound-files-2.js (D-995)
export const FILES = { ...FILES_1, ...FILES_2 };

// § voices: every sound the game asks for, each silent until its file is in
const VOICES = ['footstep', 'stoneStep', 'earthStep', 'lantern', 'hit', 'beaten', 'teeth', 'glass', 'sting', 'hiss', 'squeak', 'snuffle', 'snap', 'rustle', 'rattle', 'sip', 'gloam', 'flutter', 'grind', 'pack', 'jolt', 'tail', 'burrow', 'bonesFall', 'bonesStand', 'statue', 'ring', 'sink', 'spit', 'splat', 'fall', 'wake', 'giveWay', 'floor', 'room', 'eat', 'shimmer', 'tools', 'hum', 'breath', 'ended', 'bells', 'chime', 'plop', 'splash', 'tap', 'card', 'refuse', 'pat', 'draw', 'thunk', 'clink', 'crumble', 'chop', 'treeFall', 'branchSnap', 'chest', 'coins', 'shelf', 'sow', 'feed', 'pour', 'sputter', 'gutter', 'torch', 'kindle', 'miss', 'hurt', 'poison', 'heartbeat', 'rise', 'drip', 'learn'];
// § kinds: which loudness each sound follows (D-823): Steps with the lantern and the light,
// Fighting with the creatures, Finds with the bag and places, and Menus; a fall and new rooms are Steps (D-833);
// a cave's drips are Finds, in Places' line (D-836); a new ability's card is Finds (D-994)
const KINDS = {
  steps: ['footstep', 'stoneStep', 'earthStep', 'lantern', 'pour', 'sputter', 'sputter2', 'gutter', 'torch', 'kindle', 'falling', 'fall', 'fallThud', 'wake', 'giveWay', 'giveWayCrack', 'giveWayRumble', 'rooms', 'floor', 'room'],
  fight: ['hit', 'lanternHit', 'knifeHit', 'stoneHit', 'beaten', 'teeth', 'glass', 'sting', 'hiss', 'squeak', 'snuffle', 'snap', 'rustle', 'rattle', 'sip', 'miss', 'hurt', 'poison', 'poisonAgain', 'heartbeat', 'heartbeat2', 'heartbeat3', 'heartbeat4', 'rise', 'rise2', 'rise3', 'bites', 'teeth2', 'glassSnap', 'sting2', 'stab', 'hissClick', 'squeak2', 'flap', 'sniff2', 'sniff3', 'scrape', 'snapNip', 'rustle2', 'rustleNip', 'rattle2', 'rattle3', 'rattle4', 'gulp', 'gloam', 'gloamNip', 'flutter', 'flutter2', 'flutter3', 'grind', 'grindKnock', 'creatures', 'pack', 'pack2', 'pack3', 'pack4', 'jolt', 'tail', 'tail2', 'tail3', 'tail4', 'burrow', 'bonesFall', 'bonesFall2', 'bonesFall3', 'bonesFall4', 'bonesStand', 'bonesStand2', 'bonesStand3', 'bonesStand4', 'statue', 'ring', 'sink', 'sinkRumble', 'sinkKnock', 'spit', 'splat'],
  finds: ['pat', 'draw', 'thunk', 'clink', 'crumble', 'chop', 'treeFall', 'treeCrash', 'branchSnap', 'branchKnock', 'patter', 'chest', 'chestOpen', 'chestClose', 'coins', 'shelf', 'sow', 'sowAgain', 'feed', 'bells', 'chime', 'plop', 'splash', 'eat', 'crunch', 'crunch2', 'gulpDown', 'shimmer', 'shimmer2', 'shimmer3', 'tools', 'tools2', 'tools3', 'places', 'bells2', 'bells3', 'hum', 'chime2', 'breath', 'drip', 'learn', 'learn1', 'learn2', 'learn3', 'learn4', 'learnLow'],
  menus: ['tap', 'card', 'cardOpen', 'cardClose', 'refuse', 'ended'],
  music: ['surface', 'crypt', 'caves', 'warrens', 'dungeon', 'lampeater'], // each place's theme (D-837 to D-841), the boss tune (D-961)
};
export const kindOf = (voice) => Object.keys(KINDS).find((k) => KINDS[k].includes(voice));
// What plays as a kind's loudness changes, at its new loudness: a step, a hit, a pat, the tick
export const KIND_SOUND = { steps: 'footstep', fight: 'hit', finds: 'pat', menus: 'tap', music: 'tap' }; // Music: the tick, and the music itself where it plays (D-837)
export { VOICES };
const SEED = 255; // the steps' variety, the same on every visit

// § ground: which step the hero's feet make: grass on the surface, packed earth in
// the burrows, stone everywhere else below (the crypt, rock caves, dungeon halls) (D-776)
export const stepOf = (sky, look) => (sky ? 'footstep' : look === 'earth' ? 'earthStep' : 'stoneStep');

// § drips (D-836): a cave's drips fall in the rock caves (floors 2 to 4), the next one 8 to 16
// seconds after the last, picked at random each time so they never fall on a beat
export const dripsIn = (sky, look) => !sky && look === 'rock';
export const dripGap = (r) => (8 + r * 8) * 1000; // r in [0, 1): milliseconds to the next drip

// § music (D-837): the surface's theme, Abstraction's "Ludum Dare 30 06" (CC0), looped non-stop with no
// break, by day and by night, home too. Leaving the surface fades it out over 2 seconds; coming back
// starts it again from its beginning a second later, fading in over a second. Its own kind, Music.
// The rock caves (floors 2 to 4) play "The Vile Grove" the same way, carrying on from floor to floor (D-838).
// The whole crypt, its two top rooms by the cave mouth and floor 1, plays "Ludum Dare 30 05" the same way,
// carrying on down its stairs (D-839); main.js gives its top rooms, depth 0 below the sky, the crypt's look.
// The warrens, the earth burrows on floors 5 to 7, play "Patreon Challenge 11" the same way, carrying on
// from floor to floor (D-840). The dungeon, its cold halls from floor 8 down, plays "Patreon Challenge 04"
// the same way, carrying on from floor to floor (D-841). The Lampeater's boss tune, "Ludum Dare 28 08", plays
// while its arena's way in is sealed: `now`, it starts at full with the door, no quiet, no fade in (D-961).
export const MUSIC = {
  surface: { file: 'abstraction-music-loops/Ludum Dare 30 06.ogg', gain: 0.4 },
  crypt: { file: 'abstraction-music-loops/Ludum Dare 30 05.ogg', gain: 0.79 }, // as loud to the ear as the surface's
  caves: { file: 'abstraction-music-loops/The Vile Grove.ogg', gain: 0.59 }, // as loud to the ear as the surface's
  warrens: { file: 'abstraction-music-loops/Patreon Challenge 11.ogg', gain: 0.47 }, // as loud to the ear as the surface's
  dungeon: { file: 'abstraction-music-loops/Patreon Challenge 04.ogg', gain: 0.46 }, // as loud to the ear as the surface's
  lampeater: { file: 'abstraction-music-loops/Ludum Dare 28 08.ogg', gain: 0.27, now: true }, // as loud to the ear as the surface's
};
export const musicOf = (sky, look) => (sky ? 'surface' : look === 'crypt' ? 'crypt' : dripsIn(sky, look) ? 'caves' : look === 'earth' ? 'warrens' : look === 'dungeon' ? 'dungeon' : null);
export const FADE_OUT = 2, QUIET = 1, FADE_IN = 1; // seconds

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
  const tunes = {}; // each theme, decoded whole so it loops with no break (D-837)
  let tune = null; // the theme playing: its name, its source, its loudness and when it is fully in
  const vary = rng(SEED + 1); // which file and what pitch, each time
  const last = {}; // the file each voice played last, never played twice running
  // § start: on the first tap, click or key, the sound maker is made; the files are fetched only
  // once Sound is On (H-03): at that tap, or the frame Sound turns On
  for (const voice of Object.keys(FILES)) buffers[voice] = [];
  let fetched = false;
  const decoded = {}; // each file's one decoding, shared by every voice that plays it (H-74)
  const decode = (path) => (decoded[path] ??= fetch(PACKS + path).then((r) => r.arrayBuffer()).then((b) => ac.decodeAudioData(b)));
  function fetchAll() {
    if (fetched || !ac || !isOn()) return;
    fetched = true;
    for (const [voice, { files = [] }] of Object.entries(FILES)) {
      files.forEach((f, i) => { decode(f).then((d) => { buffers[voice][i] = d; }).catch(() => {}); }); // a file that fails stays silent
    }
  }
  const asked = {}; // the themes fetched, each the first time its place wants it (H-03)
  function fetchTune(name) {
    if (asked[name]) return;
    asked[name] = true;
    decode(encodeURI(MUSIC[name].file)).then((d) => { tunes[name] = d; }).catch(() => {});
  }
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
    }
    fetchAll();
    if (ac.state === 'suspended') ac.resume();
  }
  addEventListener('pointerdown', start, { capture: true });
  addEventListener('keydown', start, { capture: true });
  // The game in the background (another app, the phone locked) is silent, the music too; back, it carries on
  globalThis.document?.addEventListener?.('visibilitychange', () => { if (ac) (document.hidden ? ac.suspend() : ac.resume()).catch?.(() => {}); });
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
    const { around } = FILES[voice];
    let out = g;
    if (around && ac.createStereoPanner) { // a little left or right (D-836)
      const side = ac.createStereoPanner();
      side.pan.value = (vary() * 2 - 1) * around;
      out = g.connect(side);
    }
    out.connect(ac.destination);
    if (echoes) out.connect(echo);
    const when = ac.currentTime + at + wait + (arg === true ? after : 0), rate = src.playbackRate.value, { from = 0, len, fade, slide } = FILES[voice];
    if (len) { // only part of the file: it fades out over its last `fade` seconds, its pitch sliding to `slide`
      if (fade) { g.gain.setValueAtTime(g.gain.value, when + len - fade); g.gain.linearRampToValueAtTime(0, when + len); }
      if (slide) { src.playbackRate.setValueAtTime(rate, when); src.playbackRate.linearRampToValueAtTime(slide, when + len); }
      src.start(when, from);
      src.stop(when + len);
    } else src.start(when, from);
    for (const [v, later] of FILES[voice].with ?? []) play(v, undefined, at + later + (arg === true ? after : 0)); // after the swing too, as the bite's own parts (D-832)
  }
  // § music: the theme wanted now, or null; called every frame (D-837). A new one, or none, fades
  // the old out; Sound Off or the theme turned Off is none; a loudness change follows in a moment.
  // `ahead`, a theme fetched early so it can start the moment it is wanted (the boss tune, D-961)
  function music(name, ahead) {
    if (!ac || ac.state !== 'running') return;
    fetchAll();
    for (const n of [name, ahead]) if (n && isOn() && !muted(n)) fetchTune(n);
    const want = name && isOn() && !muted(name) && tunes[name] ? name : null, now = ac.currentTime;
    if (tune && tune.name !== want) {
      const { src, g } = tune;
      g.gain.cancelScheduledValues(now);
      g.gain.setValueAtTime(g.gain.value, now);
      g.gain.linearRampToValueAtTime(0, now + FADE_OUT);
      src.stop(now + FADE_OUT);
      tune = null;
    }
    if (!want) return;
    const level = MUSIC[want].gain * loudness('music');
    if (!tune) {
      const src = ac.createBufferSource(), g = ac.createGain();
      src.buffer = tunes[want];
      src.loop = true;
      const wait = MUSIC[want].now ? 0 : QUIET, rise = MUSIC[want].now ? 0 : FADE_IN; // at once, at full (D-961)
      g.gain.setValueAtTime(rise ? 0 : level, now);
      if (rise) { g.gain.setValueAtTime(0, now + wait); g.gain.linearRampToValueAtTime(level, now + wait + rise); }
      src.connect(g).connect(ac.destination);
      src.start(now + wait);
      tune = { name: want, src, g, level, full: now + wait + rise };
    } else if (level !== tune.level && now >= tune.full) {
      tune.g.gain.cancelScheduledValues(now);
      tune.g.gain.setTargetAtTime(level, now, 0.05);
      tune.level = level;
    }
  }
  const voice = (v) => (FILES[v] ? (arg) => play(v, arg) : () => {});
  const { footstep, stoneStep, earthStep, lantern, hit, beaten, teeth, glass, sting, hiss, squeak, snuffle, snap, rustle, rattle, sip, gloam, flutter, grind, pack, jolt, tail, burrow, bonesFall, bonesStand, statue, ring, sink, spit, splat, fall, wake, giveWay, floor, room, eat, shimmer, tools, hum, breath, ended, bells, chime, plop, splash, tap, card, refuse, pat, draw, thunk, clink, crumble, chop, treeFall, branchSnap, chest, coins, shelf, sow, feed, pour, sputter, gutter, torch, kindle, miss, hurt, poison, heartbeat, rise, drip, learn } = Object.fromEntries(VOICES.map((v) => [v, voice(v)]));
  const sample = (v) => FILES[v] && play(v, true); // one sound by its name, as Settings' list turns it On (D-824)
  return { footstep, stoneStep, earthStep, lantern, hit, beaten, teeth, glass, sting, hiss, squeak, snuffle, snap, rustle, rattle, sip, gloam, flutter, grind, pack, jolt, tail, burrow, bonesFall, bonesStand, statue, ring, sink, spit, splat, fall, wake, giveWay, floor, room, eat, shimmer, tools, hum, breath, ended, bells, chime, plop, splash, tap, card, refuse, pat, draw, thunk, clink, crumble, chop, treeFall, branchSnap, chest, coins, shelf, sow, feed, pour, sputter, gutter, torch, kindle, miss, hurt, poison, heartbeat, rise, drip, learn, sample, music };
}
