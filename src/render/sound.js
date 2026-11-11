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
// The heartbeat next (D-835): a soft lub-dub twice, the second fainter, as the hero drops to the last heart.
// Sounds all around next (D-836), drips in the rock caves first: a drop and its ripple, through the cave's
// echo, every 8 to 16 seconds while the hero plays there, each a little left or right.
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
// last `fade` seconds fading out, and `slide` is the pitch it slides to over them (D-830); `around`
// places it that far left or right at random, 1 being all the way, as a cave's drips (D-836)
const impact = (name) => [0, 1, 2, 3, 4].map((n) => `kenney-impact-sounds/${name}_00${n}.ogg`);
const PACKS = 'sounds/packs/';
const steps = (ground) => impact(`footstep_${ground}`);
const elements = (name) => [`morphonaut-elemental-forces/${name.split('-')[0]}/${name}.ogg`];
const nip = impact('impactGeneric_light').slice(0, 2); // a small snap of teeth (D-832)
const pluck = ['kenney-interface-sounds/pluck_001.ogg', 'kenney-interface-sounds/pluck_002.ogg']; // a dry click, or high, a chirp
const puffs = [12, 13, 14].map((n) => elements(`Wind-0${n}`)[0]); // short puffs of air: the stiff miss, or high, a sniff
const bones = impact('impactWood_light').slice(0, 3);
const soft = impact('impactSoft_medium').slice(1, 3); // a soft cushioned thump: the heartbeat's lub and dub (D-835)
const bell = impact('impactBell_heavy')[2]; // a short bell: the waystone's and the boon's
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
  sputter: { files: elements('Fire-017'), gain: 0.24, pitch: 0, pitchOf: () => 0.92, from: 0.78, len: 0.25, fade: 0.1, with: [['sputter2', 0.32]] }, // the oil runs low: two short sputters (D-834)
  sputter2: { files: elements('Fire-017'), gain: 0.17, pitch: 0, pitchOf: () => 0.85, from: 0.78, len: 0.22, fade: 0.1, part: true }, // the second softer and lower
  torch: { files: elements('Fire-030'), gain: 0.24, pitch: 0, from: 0.1, len: 1.2, fade: 0.5 }, // a torch lit: a quick whoosh
  kindle: { files: elements('Fire-021'), gain: 0.27, pitch: 0, from: 0.18, len: 2.4, fade: 0.9 }, // cold ashes lit: a fire catching, then burning
  miss: { files: puffs, gain: 0.55, pitch: 0.06 }, // stiff, the swing goes wide: a puff of air (D-831)
  hurt: { files: impact('impactPunch_heavy'), gain: 0.32, pitch: 0.04, pitchOf: () => 0.9, muffle: 900, after: 0.25 }, // a bite takes a heart: a dull blow, after the hero's swing
  poison: { files: impact('impactPunch_heavy'), gain: 0.36, pitch: 0, pitchOf: () => 0.6, muffle: 400, with: [['poisonAgain', 0.35]] }, // poison takes a heart: a deep throb, twice
  poisonAgain: { files: impact('impactPunch_heavy'), gain: 0.26, pitch: 0, pitchOf: () => 0.57, muffle: 400, part: true },
  heartbeat: { files: [soft[0]], gain: 0.36, pitch: 0, pitchOf: () => 0.8, muffle: 350, wait: 0.7, after: 0.3, with: [['heartbeat2', 0.17], ['heartbeat3', 0.8], ['heartbeat4', 0.97]] }, // the last heart: a soft lub-dub twice (D-835), after the blow or poison's throb
  heartbeat2: { files: [soft[1]], gain: 0.25, pitch: 0, pitchOf: () => 0.74, muffle: 350, wait: 0.7, part: true }, // the dub, lower and softer
  heartbeat3: { files: [soft[0]], gain: 0.25, pitch: 0, pitchOf: () => 0.8, muffle: 350, wait: 0.7, part: true }, // the second beat, fainter
  heartbeat4: { files: [soft[1]], gain: 0.17, pitch: 0, pitchOf: () => 0.74, muffle: 350, wait: 0.7, part: true },
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
  // § the rest (D-833): the owner's go-ahead to finish with Claude's recommended picks, each by its measured shape
  gloam: { files: elements('Wind-011'), gain: 0.45, pitch: 0.04, pitchOf: () => 0.8, from: 0.4, len: 0.5, fade: 0.3, muffle: 1500, after: 0.25, with: [['gloamNip', 0.2]] }, // a gloamling: a low breath, then a snap
  gloamNip: { files: nip, gain: 0.24, pitch: 0.05, pitchOf: () => 1.2, part: true },
  flutter: { files: [1, 2, 3, 4].map((n) => `kenney-rpg-audio/cloth${n}.ogg`), gain: 0.28, pitch: 0.05, pitchOf: () => 1.6, after: 0.25, with: [['flutter2', 0.06], ['flutter3', 0.12]] }, // a lampmoth: a papery flutter
  flutter2: { files: [1, 2, 3, 4].map((n) => `kenney-rpg-audio/cloth${n}.ogg`), gain: 0.24, pitch: 0.05, pitchOf: () => 1.7, part: true },
  flutter3: { files: [1, 2, 3, 4].map((n) => `kenney-rpg-audio/cloth${n}.ogg`), gain: 0.2, pitch: 0.05, pitchOf: () => 1.8, part: true },
  grind: { files: elements('Earth-019'), gain: 0.5, pitch: 0, pitchOf: () => 0.8, from: 0.3, len: 0.5, fade: 0.2, after: 0.25, with: [['grindKnock', 0.15]] }, // a warden: stone grinding, a knock of stone
  grindKnock: { files: impact('impactMining'), gain: 0.2, pitch: 0.05, pitchOf: () => 0.7, part: true },
  creatures: { as: () => 'pack' }, // Settings' one line for the creatures' own sounds, turned On, plays the pack's (D-833)
  pack: { files: pluck, gain: 0.15, pitch: 0.04, pitchOf: () => 1.8, with: [['pack2', 0.06], ['pack3', 0.13], ['pack4', 0.2]] }, // rats in a pack: squeaks together
  pack2: { files: pluck, gain: 0.14, pitch: 0.04, pitchOf: () => 1.95, part: true },
  pack3: { files: pluck, gain: 0.13, pitch: 0.04, pitchOf: () => 1.7, part: true },
  pack4: { files: pluck, gain: 0.12, pitch: 0.04, pitchOf: () => 2.05, part: true },
  jolt: { files: impact('impactSoft_medium'), gain: 0.26, pitch: 0.05, pitchOf: () => 1.25 }, // a mimic wakes: a jolt
  tail: { files: pluck, gain: 0.14, pitch: 0.04, pitchOf: () => 0.7, with: [['tail2', 0.05], ['tail3', 0.1], ['tail4', 0.15]] }, // a scorpion raises its tail: a dry rattle
  tail2: { files: pluck, gain: 0.13, pitch: 0.04, pitchOf: () => 0.75, part: true },
  tail3: { files: pluck, gain: 0.12, pitch: 0.04, pitchOf: () => 0.7, part: true },
  tail4: { files: pluck, gain: 0.11, pitch: 0.04, pitchOf: () => 0.8, part: true },
  burrow: { files: elements('Earth-017'), gain: 0.4, pitch: 0, pitchOf: (up) => (up ? 1.15 : 0.85), from: 0.2, len: 0.6, fade: 0.3, muffle: 1500 }, // a mole digs down, lower, or comes up, higher: earth shifting
  bonesFall: { files: [bones[0]], gain: 0.2, pitch: 0.04, pitchOf: () => 1.3, wait: 0.15, with: [['bonesFall2', 0.08], ['bonesFall3', 0.16], ['bonesFall4', 0.26]] }, // a bone rat falls to bones: a slow clatter, falling
  bonesFall2: { files: [bones[1]], gain: 0.18, pitch: 0.04, pitchOf: () => 1.2, wait: 0.15, part: true },
  bonesFall3: { files: [bones[2]], gain: 0.16, pitch: 0.04, pitchOf: () => 1.1, wait: 0.15, part: true },
  bonesFall4: { files: [bones[0]], gain: 0.14, pitch: 0.04, pitchOf: () => 1, wait: 0.15, part: true },
  bonesStand: { files: [bones[2]], gain: 0.14, pitch: 0.04, pitchOf: () => 1, with: [['bonesStand2', 0.06], ['bonesStand3', 0.12], ['bonesStand4', 0.18]] }, // it stands up again: the clatter rising
  bonesStand2: { files: [bones[1]], gain: 0.16, pitch: 0.04, pitchOf: () => 1.2, part: true },
  bonesStand3: { files: [bones[0]], gain: 0.18, pitch: 0.04, pitchOf: () => 1.4, part: true },
  bonesStand4: { files: [bones[1]], gain: 0.2, pitch: 0.04, pitchOf: () => 1.6, part: true },
  statue: { files: elements('Earth-028'), gain: 0.32, pitch: 0, pitchOf: () => 0.75, len: 1.2, fade: 0.6, muffle: 1200 }, // a warden wakes: heavy stone shifting
  spit: { files: elements('Water-010'), gain: 0.4, pitch: 0.04, pitchOf: () => 1.3, len: 0.35, fade: 0.15 }, // a glob spat: a wet spit
  splat: { files: elements('Water-014'), gain: 0.32, pitch: 0.04, pitchOf: () => 0.8, len: 0.35, fade: 0.15 }, // a glob breaks or hits: a small splat
  falling: { as: () => 'fall' }, // Settings' one line for a fall and the waking after it (D-833)
  fall: { files: elements('Earth-017'), gain: 0.47, pitch: 0, len: 0.7, fade: 0.3, with: [['fallThud', 0.55]] }, // the hero falls: a slide, then a thud
  fallThud: { files: impact('impactPunch_heavy'), gain: 0.3, pitch: 0.04, pitchOf: () => 0.8, muffle: 700, part: true },
  wake: { files: elements('Wind-002'), gain: 0.42, pitch: 0, pitchOf: () => 0.85, len: 1.2, fade: 0.6, muffle: 1200 }, // waking after a fall: a breath
  rooms: { as: () => 'room' }, // Settings' one line for a new floor and a room never stood in (D-833)
  floor: { files: elements('Earth-024'), gain: 0.22, pitch: 0, pitchOf: () => 0.8, len: 2, fade: 1.2, muffle: 600 }, // a new floor: a low, far rumble
  room: { files: ['kenney-interface-sounds/glass_001.ogg'], gain: 0.12, pitch: 0.03, pitchOf: () => 0.8 }, // a room never stood in: a small, quiet note
  eat: { as: (drink) => (drink ? 'gulpDown' : 'crunch') }, // a herb or heartcap eaten crunches, a potion drunk gulps
  crunch: { files: steps('snow'), gain: 0.24, pitch: 0.05, pitchOf: () => 1.3, with: [['crunch2', 0.14]], part: true },
  crunch2: { files: steps('snow'), gain: 0.2, pitch: 0.05, pitchOf: () => 1.4, part: true },
  gulpDown: { files: elements('Water-039'), gain: 0.45, pitch: 0, pitchOf: () => 0.9, len: 0.7, fade: 0.3, part: true },
  shimmer: { files: [impact('impactGlass_light')[0]], gain: 0.1, pitch: 0.03, pitchOf: () => 1.6, with: [['shimmer2', 0.07], ['shimmer3', 0.14]] }, // a person leaves for home or arrives: a soft shimmer
  shimmer2: { files: [impact('impactGlass_light')[1]], gain: 0.09, pitch: 0.03, pitchOf: () => 1.8, part: true },
  shimmer3: { files: [impact('impactGlass_light')[2]], gain: 0.08, pitch: 0.03, pitchOf: () => 2, part: true },
  tools: { files: impact('impactMetal_light'), gain: 0.2, pitch: 0.06, with: [['tools2', 0.16], ['tools3', 0.34]] }, // something made: tools at work, two taps of metal and a knock of wood
  tools2: { files: impact('impactMetal_light'), gain: 0.2, pitch: 0.06, part: true },
  tools3: { files: impact('impactWood_medium'), gain: 0.22, pitch: 0.06, part: true },
  places: { as: () => 'bells' }, // Settings' one line for the places' sounds (D-833)
  bells: { files: [bell], gain: 0.16, pitch: 0, with: [['bells2', 0.18], ['bells3', 0.36]] }, // a waystone wakes: three bells rising
  bells2: { files: [bell], gain: 0.14, pitch: 0, pitchOf: () => 1.26, part: true },
  bells3: { files: [bell], gain: 0.12, pitch: 0, pitchOf: () => 1.5, part: true },
  hum: { files: [impact('impactBell_heavy')[1]], gain: 0.3, pitch: 0, pitchOf: () => 0.5, len: 3, fade: 1.5, muffle: 800 }, // travel by waystone: a deep hum
  chime: { files: [bell], gain: 0.12, pitch: 0, pitchOf: () => 1.5, with: [['chime2', 0.12]] }, // a boon picked: two bells rising, higher and quicker
  chime2: { files: [bell], gain: 0.1, pitch: 0, pitchOf: () => 2, part: true },
  plop: { files: elements('Water-015'), gain: 0.27, pitch: 0.04, len: 0.6, fade: 0.3 }, // the line cast: a small plop
  splash: { files: elements('Water-016'), gain: 0.27, pitch: 0.04 }, // a fish caught: a splash and drops
  drip: { files: elements('Water-009'), gain: 0.1, pitch: 0.1, pitchOf: () => 1.2, echo: true, around: 0.6 }, // a cave's drip: a drop and its ripple, a little higher (D-836)
  breath: { files: elements('Wind-007'), gain: 0.26, pitch: 0, pitchOf: () => 0.8, len: 2.2, fade: 1.4, muffle: 900 }, // sleeping: a long breath out
  ended: { files: [impact('impactBell_heavy')[1]], gain: 0.3, pitch: 0, pitchOf: () => 0.8, len: 2.6, fade: 1.6, slide: 0.5, muffle: 1500 }, // the run ends: a slow falling tone
};

// § voices: every sound the game asks for, each silent until its file is in
const VOICES = ['footstep', 'stoneStep', 'earthStep', 'lantern', 'hit', 'beaten', 'teeth', 'glass', 'sting', 'hiss', 'squeak', 'snuffle', 'snap', 'rustle', 'rattle', 'sip', 'gloam', 'flutter', 'grind', 'pack', 'jolt', 'tail', 'burrow', 'bonesFall', 'bonesStand', 'statue', 'spit', 'splat', 'fall', 'wake', 'floor', 'room', 'eat', 'shimmer', 'tools', 'hum', 'breath', 'ended', 'bells', 'chime', 'plop', 'splash', 'tap', 'card', 'refuse', 'pat', 'draw', 'thunk', 'clink', 'crumble', 'chest', 'coins', 'shelf', 'sow', 'feed', 'pour', 'sputter', 'gutter', 'torch', 'kindle', 'miss', 'hurt', 'poison', 'heartbeat', 'rise', 'drip'];
// § kinds: which loudness each sound follows (D-823): Steps with the lantern and the light,
// Fighting with the creatures, Finds with the bag and places, and Menus; a fall and new rooms are Steps (D-833);
// a cave's drips are Finds, in Places' line (D-836)
const KINDS = {
  steps: ['footstep', 'stoneStep', 'earthStep', 'lantern', 'pour', 'sputter', 'sputter2', 'gutter', 'torch', 'kindle', 'falling', 'fall', 'fallThud', 'wake', 'rooms', 'floor', 'room'],
  fight: ['hit', 'lanternHit', 'knifeHit', 'beaten', 'teeth', 'glass', 'sting', 'hiss', 'squeak', 'snuffle', 'snap', 'rustle', 'rattle', 'sip', 'miss', 'hurt', 'poison', 'poisonAgain', 'heartbeat', 'heartbeat2', 'heartbeat3', 'heartbeat4', 'rise', 'rise2', 'rise3', 'bites', 'teeth2', 'glassSnap', 'sting2', 'stab', 'hissClick', 'squeak2', 'flap', 'sniff2', 'sniff3', 'scrape', 'snapNip', 'rustle2', 'rustleNip', 'rattle2', 'rattle3', 'rattle4', 'gulp', 'gloam', 'gloamNip', 'flutter', 'flutter2', 'flutter3', 'grind', 'grindKnock', 'creatures', 'pack', 'pack2', 'pack3', 'pack4', 'jolt', 'tail', 'tail2', 'tail3', 'tail4', 'burrow', 'bonesFall', 'bonesFall2', 'bonesFall3', 'bonesFall4', 'bonesStand', 'bonesStand2', 'bonesStand3', 'bonesStand4', 'statue', 'spit', 'splat'],
  finds: ['pat', 'draw', 'thunk', 'clink', 'crumble', 'patter', 'chest', 'chestOpen', 'chestClose', 'coins', 'shelf', 'sow', 'sowAgain', 'feed', 'bells', 'chime', 'plop', 'splash', 'eat', 'crunch', 'crunch2', 'gulpDown', 'shimmer', 'shimmer2', 'shimmer3', 'tools', 'tools2', 'tools3', 'places', 'bells2', 'bells3', 'hum', 'chime2', 'breath', 'drip'],
  menus: ['tap', 'card', 'cardOpen', 'cardClose', 'refuse', 'ended'],
  music: ['surface'], // each place's theme (D-837)
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
export const MUSIC = { surface: { file: 'abstraction-music-loops/Ludum Dare 30 06.ogg', gain: 0.4 } };
export const musicOf = (sky) => (sky ? 'surface' : null);
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
      for (const [name, { file }] of Object.entries(MUSIC)) {
        fetch(PACKS + encodeURI(file)).then((r) => r.arrayBuffer()).then((b) => ac.decodeAudioData(b))
          .then((d) => { tunes[name] = d; }).catch(() => {});
      }
    }
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
  // the old out; Sound Off or the theme turned Off is none; a loudness change follows in a moment
  function music(name) {
    if (!ac || ac.state !== 'running') return;
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
      g.gain.setValueAtTime(0, now);
      g.gain.setValueAtTime(0, now + QUIET);
      g.gain.linearRampToValueAtTime(level, now + QUIET + FADE_IN);
      src.connect(g).connect(ac.destination);
      src.start(now + QUIET);
      tune = { name: want, src, g, level, full: now + QUIET + FADE_IN };
    } else if (level !== tune.level && now >= tune.full) {
      tune.g.gain.cancelScheduledValues(now);
      tune.g.gain.setTargetAtTime(level, now, 0.05);
      tune.level = level;
    }
  }
  const voice = (v) => (FILES[v] ? (arg) => play(v, arg) : () => {});
  const { footstep, stoneStep, earthStep, lantern, hit, beaten, teeth, glass, sting, hiss, squeak, snuffle, snap, rustle, rattle, sip, gloam, flutter, grind, pack, jolt, tail, burrow, bonesFall, bonesStand, statue, spit, splat, fall, wake, floor, room, eat, shimmer, tools, hum, breath, ended, bells, chime, plop, splash, tap, card, refuse, pat, draw, thunk, clink, crumble, chest, coins, shelf, sow, feed, pour, sputter, gutter, torch, kindle, miss, hurt, poison, heartbeat, rise, drip } = Object.fromEntries(VOICES.map((v) => [v, voice(v)]));
  const sample = (v) => FILES[v] && play(v, true); // one sound by its name, as Settings' list turns it On (D-824)
  return { footstep, stoneStep, earthStep, lantern, hit, beaten, teeth, glass, sting, hiss, squeak, snuffle, snap, rustle, rattle, sip, gloam, flutter, grind, pack, jolt, tail, burrow, bonesFall, bonesStand, statue, spit, splat, fall, wake, floor, room, eat, shimmer, tools, hum, breath, ended, bells, chime, plop, splash, tap, card, refuse, pat, draw, thunk, clink, crumble, chest, coins, shelf, sow, feed, pour, sputter, gutter, torch, kindle, miss, hurt, poison, heartbeat, rise, drip, sample, music };
}
