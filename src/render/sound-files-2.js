// § sound files, 2: the rest of `FILES`, from the D-833 picks on, moved word for word from
// render/sound.js at 0.3.433 (D-995); what each field means is in sound-files.js.
import { impact, steps, elements, nip, pluck, bones, bell } from './sound-files.js';

export const FILES_2 = {
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
  ring: { files: impact('impactMetal_light'), gain: 0.25, pitch: 0.06, pitchOf: () => 0.75 }, // a blow rings off the warden's stone: one light metal clink, a quarter lower than Making's (D-937)
  sink: { files: impact('impactPunch_heavy'), gain: 0.36, pitch: 0.04, pitchOf: () => 0.7, with: [['sinkRumble', 0], ['sinkKnock', 0]] }, // the warden's fists sink into the floor: a slowed heavy punch, an earth rumble, its stone knock a touch lower (D-937, A6)
  sinkRumble: { files: elements('Earth-021'), gain: 0.16, pitch: 0, pitchOf: () => 0.8, part: true },
  sinkKnock: { files: impact('impactMining'), gain: 0.36, pitch: 0.04, pitchOf: () => 0.72, part: true },
  spit: { files: elements('Water-010'), gain: 0.4, pitch: 0.04, pitchOf: () => 1.3, len: 0.35, fade: 0.15 }, // a glob spat: a wet spit
  splat: { files: elements('Water-014'), gain: 0.32, pitch: 0.04, pitchOf: () => 0.8, len: 0.35, fade: 0.15 }, // a glob breaks or hits: a small splat
  falling: { as: () => 'fall' }, // Settings' one line for a fall and the waking after it (D-833)
  fall: { files: elements('Earth-017'), gain: 0.47, pitch: 0, len: 0.7, fade: 0.3, with: [['fallThud', 0.55]] }, // the hero falls: a slide, then a thud
  fallThud: { files: impact('impactPunch_heavy'), gain: 0.3, pitch: 0.04, pitchOf: () => 0.8, muffle: 700, part: true },
  wake: { files: elements('Wind-002'), gain: 0.42, pitch: 0, pitchOf: () => 0.85, len: 1.2, fade: 0.6, muffle: 1200 }, // waking after a fall: a breath
  giveWay: { files: impact('impactMining'), gain: 0.36, pitch: 0.04, pitchOf: () => 0.6, echo: true, with: [['giveWayCrack', 0.1], ['giveWayRumble', 0.2]] }, // the floor gives way (Q-113, D-966): a low stone crack as the cracks run, twice,
  giveWayCrack: { files: impact('impactMining'), gain: 0.3, pitch: 0.04, pitchOf: () => 0.55, echo: true, part: true },
  giveWayRumble: { files: elements('Earth-024'), gain: 0.3, pitch: 0, pitchOf: () => 0.8, len: 0.8, fade: 0.5, muffle: 1000, part: true }, // then a heavy rumble as they fall, fading into the dark; nothing lands
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
  learn: { files: elements('Fire-030'), gain: 0.2, pitch: 0, from: 0.1, len: 1, fade: 0.5, with: [['learn1', 0.25], ['learn2', 0.45], ['learn3', 0.65], ['learn4', 0.85], ['learnLow', 0.25]] }, // a new ability's card opens: the flame rises, four bells rising over a low held bell (D-994)
  learn1: { files: [bell], gain: 0.16, pitch: 0, part: true },
  learn2: { files: [bell], gain: 0.15, pitch: 0, pitchOf: () => 1.26, part: true },
  learn3: { files: [bell], gain: 0.14, pitch: 0, pitchOf: () => 1.5, part: true },
  learn4: { files: [bell], gain: 0.13, pitch: 0, pitchOf: () => 2, part: true },
  learnLow: { files: [impact('impactBell_heavy')[1]], gain: 0.2, pitch: 0, len: 2.6, fade: 1.6, muffle: 1500, part: true },
  ended: { files: [impact('impactBell_heavy')[1]], gain: 0.3, pitch: 0, pitchOf: () => 0.8, len: 2.6, fade: 1.6, slide: 0.5, muffle: 1500 }, // the run ends: a slow falling tone
};
