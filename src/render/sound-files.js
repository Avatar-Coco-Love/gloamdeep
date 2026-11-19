// § sound files, 1: the start of `FILES`, moved word for word from render/sound.js at 0.3.433 (D-995),
// so sound.js keeps under 20 KB (H-99); the rest from the D-833 picks on are in sound-files-2.js.
// sound.js joins the two, in this order, as `FILES`.
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
export const impact = (name) => [0, 1, 2, 3, 4].map((n) => `kenney-impact-sounds/${name}_00${n}.ogg`);
export const steps = (ground) => impact(`footstep_${ground}`);
export const elements = (name) => [`morphonaut-elemental-forces/${name.split('-')[0]}/${name}.ogg`];
export const nip = impact('impactGeneric_light').slice(0, 2); // a small snap of teeth (D-832)
export const pluck = ['kenney-interface-sounds/pluck_001.ogg', 'kenney-interface-sounds/pluck_002.ogg']; // a dry click, or high, a chirp
export const puffs = [12, 13, 14].map((n) => elements(`Wind-0${n}`)[0]); // short puffs of air: the stiff miss, or high, a sniff
export const bones = impact('impactWood_light').slice(0, 3);
export const soft = impact('impactSoft_medium').slice(1, 3); // a soft cushioned thump: the heartbeat's lub and dub (D-835)
export const bell = impact('impactBell_heavy')[2]; // a short bell: the waystone's and the boon's
export const FILES_1 = {
  footstep: { files: steps('grass'), gain: 0.25, pitch: 0.06 },
  stoneStep: { files: steps('concrete'), gain: 0.1, pitch: 0.06, echo: true },
  earthStep: { files: steps('grass'), gain: 0.25, pitch: 0.06, muffle: 1400 },
  lantern: { files: ['kenney-rpg-audio/metalClick.ogg'], gain: 0.5, pitch: 0, pitchOf: (lit) => (lit ? 1.12 : 0.89) },
  hit: { as: (held) => (held === 'stone' ? 'stoneHit' : held ? 'knifeHit' : 'lanternHit') }, // the Warden's Fist `hits` of stone (D-888)
  lanternHit: { files: impact('impactPunch_medium'), gain: 0.25, pitch: 0.06 },
  knifeHit: { files: ['kenney-rpg-audio/knifeSlice.ogg', 'kenney-rpg-audio/knifeSlice2.ogg'], gain: 0.25, pitch: 0.06 },
  stoneHit: { files: impact('impactMining'), gain: 0.25, pitch: 0.05, pitchOf: () => 0.7 }, // the Warden's Fist: the warden's knock of stone, as loud as a hit (D-888)
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
  chop: { files: ['kenney-rpg-audio/chop.ogg'], gain: 0.2, pitch: 0.08 }, // each bump on a tree: an axe biting into wood (D-842)
  treeFall: { files: ['kenney-rpg-audio/chop.ogg'], gain: 0.22, pitch: 0.04, with: [['treeCrash', 0.5]] }, // it falls: a last chop, then a thud, no creak (D-846)
  treeCrash: { files: impact('impactWood_heavy'), gain: 0.4, pitch: 0.04, muffle: 2500, part: true }, // a heavy wooden thud as it lands, at its own pitch (D-846)
  branchSnap: { files: ['kenney-rpg-audio/chop.ogg'], gain: 0.2, pitch: 0.06, with: [['branchKnock', 0.12]] }, // a branch snaps: a last chop, a light knock (D-843)
  branchKnock: { files: impact('impactWood_light'), gain: 0.3, pitch: 0.06, part: true }, // a small wooden clack as it breaks
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
};
