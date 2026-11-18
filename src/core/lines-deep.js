// § lines-deep: the lines of the deep's fights, the warden and the Lampeater, braziers, leaps, runes and the miners' camp, moved word for word
// from lines.js (H-99). Plain data, no drawing; lines.js gathers them into LINES.
export const DEEP_LINES = {
  centipedeHurt: { text: 'The centipede writhes and comes on.', warn: false }, // (D-654)
  centipedeDie: { text: 'The centipede curls up and falls still.', warn: false },
  centipedeBite: { text: "The centipede's bite poisons you.", warn: false, kind: 'harm' }, // it starts poisoned, or starts it again (D-654)
  poisonEnds: { text: 'The poison wears off.', warn: false }, // (D-654)
  poisonHeld: { text: 'Poisoned: {n} turns left.', warn: false }, // a tap on its mark (D-654)
  centipedeLegTake: { texts: ['You pick up the centipede leg.', 'A thin pale leg, still twitching.', 'The centipede leg goes in your bag.'], warn: false }, // (D-654)
  centipedeLegLook: { texts: ['A centipede leg. Three make a charm.', 'Thin, pale and jointed.', 'It has a hook at its tip.'], warn: false },
  centipedeLegFull: { text: "You can't carry more centipede legs.", warn: false },
  antidoteMake: { text: 'You make an antidote.', warn: false }, // 1 Snapcap Gill and 1 herb crafted (D-655)
  antidoteFull: { text: "You can't carry more antidotes.", warn: false }, // every stack full, no slot free (D-655)
  antidoteDrink: { texts: ['You drink the antidote.', 'The poison fades.', 'The poison leaves you.'], warn: false }, // drunk while poisoned (D-655)
  notPoisoned: { text: "You aren't poisoned.", warn: false }, // Drink on an antidote, not poisoned: free (D-655)
  spitGrubDie: { text: 'The spit grub bursts and goes dark.', warn: false }, // (D-688)
  spitGrubSpits: { text: 'The spit grub spits a glowing glob.', warn: false }, // (D-688)
  spitGrubHit: { text: 'The glob splashes you.', warn: false, kind: 'harm' }, // a glob hits the hero (D-688)
  grubSkinTake: { texts: ['You pick up the grub skin.', 'A thin pale skin, shed and curled.', 'The grub skin goes in your bag.'], warn: false }, // (D-688)
  grubSkinLook: { texts: ['A grub skin. Two make a Spitproof.', 'Thin, pale and papery.', 'It crackles when you fold it.'], warn: false },
  grubSkinFull: { text: "You can't carry more grub skins.", warn: false },
  glowGlandTake: { texts: ['A glow gland! A rare find.', 'It still glows a little.', 'The glow gland goes in your bag.'], warn: false }, // (D-688)
  glowGlandLook: { texts: ['A glow gland. With wood, a glow lamp.', 'A soft green light, sealed in.', 'It glows faintly in the dark.'], warn: false },
  glowGlandFull: { text: "You can't carry more glow glands.", warn: false },
  locketTake: { texts: ['A locket! A relic of the old city.', 'Kept close, whatever the dark took.', 'The locket goes in your bag.'], warn: false }, // (D-691)
  locketLook: { texts: ['A locket from the old city.', 'A tiny flame is scratched on its face.', 'Kept close, whatever the dark took.'], warn: false },
  locketFull: { text: 'You already have the locket.', warn: false },
  locketShelfSet: { text: 'You set the locket on the shelf.', warn: false }, // (D-693)
  featReached: { text: 'Feat reached: {n}.', warn: false }, // a Feat's tier reached, its Glints paid (D-695)
  goalDone: { text: 'Goal done: {n}.', warn: false }, // a teaching goal done, its reward paid (D-706)
  goalsDone: { text: 'Goals done: {n}.', warn: false }, // two or more done on one turn, on one line (the owner's pick, H-13)
  locketKept: { text: 'The locket kept {n}.', warn: false }, // a Normal fall, the locket on the shelf (D-694)
  wardenWakes: { text: "The warden's eye lights up!", warn: false }, // (D-692), Claude's drafts the owner may change
  wardenHurt: { text: 'The warden cracks.', warn: false },
  wardenSettles: { text: 'The warden stands still again.', warn: false },
  wardenDie: { text: 'The warden crumbles and falls still.', warn: false },
  wardenBite: { text: 'The warden slams you back!', warn: false, kind: 'harm' }, // its slam (D-885), Claude's drafts the owner may change
  wardenRaises: { text: 'The warden raises its fists!', warn: true },
  wardenMisses: { text: "The warden's fists sink into the floor!", warn: false }, // open to blows till it next acts (D-937)
  wardenRings: { text: 'Your blow rings off the stone.', warn: false }, // a blow its stone turns (D-937)
  lampeaterSinks: { text: 'Your blow sinks into the gloam.', warn: false }, // a blow on the Lampeater, hurting nothing (D-941)
  lampeaterBite: { text: 'The Lampeater bites!', warn: false, kind: 'harm' }, // its bite in the dark (D-944), Claude's drafts the owner may change
  lampeaterCaught: { text: "Caught in your light, it can't move!", warn: false }, // light falls on it: held a turn (D-944)
  lampeaterPinned: { text: "Pinned in the light, it can't slip away!", warn: false }, // no dark beside it: held 2 more turns (D-945)
  lampeaterBreathes: { text: 'The Lampeater breathes on a brazier.', warn: false, kind: 'harm' }, // from half its hearts, its breath's start (D-947)
  brazierGutters: { text: 'The brazier gutters out.', warn: false, kind: 'harm' }, // its breath's end, the brazier cold (D-947)
  gloamlingCrawls: { text: 'A gloamling crawls out of the ashes.', warn: false, kind: 'harm' }, // the first from a snuffed bowl, after the gutter's line (D-949)
  lampeaterWary: { text: 'The Lampeater draws back, wary.', warn: false, kind: 'harm' }, // struck, with none to call, wary (D-977), Claude's draft
  lampeaterCalls: { text: 'The Lampeater calls into the ashes.', warn: false, kind: 'harm' }, // struck and free again, its call's start (D-974), Claude's draft
  lampeaterDrinks: { text: 'The Lampeater drinks your light.', warn: false, kind: 'harm' }, // at the light's edge, said the first time (D-946)
  campfireHigh: { text: 'A campfire, burning high.', warn: false }, // said as a blazing fire's card opens, its note the rest (D-757, D-844)
  campfireCoals: { text: 'The coals still glow.', warn: false }, // the embers' the same way
  campfireSat: { text: 'You sit by the fire and warm up.', warn: false }, // Yes on Sit by the fire? (D-844), Claude's draft the owner may change
  campfireAshes: { text: 'Cold ashes.', warn: false }, // said as cold ashes' card opens, its note the rest (D-757)
  campfireFed: { text: 'You add wood. The fire burns high.', warn: false }, // Add wood on embers (Q-088, feeding), Claude's draft the owner may change
  campfireLit: { text: 'The fire catches.', warn: false }, // Claude's draft the owner may change
  lamppost: { texts: ['An old lamppost.', 'Its lamp went out long ago.'], warn: false }, // the dead lamppost bumped, a sentence a bump (D-769)
  brazier: { texts: ['A cold stone brazier.', 'Old ash lies in its bowl.'], warn: false }, // a vault's cold brazier bumped, a sentence a bump (D-892)
  brazierCold: { text: 'A cold stone brazier.', warn: false }, // said as a cold brazier's card opens, the lantern lit, its note the rest (D-893)
  brazierCatches: { text: 'The brazier catches.', warn: false }, // Yes on Light the brazier? (D-893)
  vaultOpens: { text: 'The stone door sinks open.', warn: false }, // the last brazier lit, the door opening, in its catching's place: the strip holds one (D-895)
  brazierLit: { texts: ['A brazier, burning.', 'Its flame burns steady.'], warn: false }, // a lit brazier bumped, a sentence a bump (D-893)
  arenaSeals: { text: 'The way behind you seals.', warn: true }, // a step into the Lampeater's arena past its way in, a sealed door rising there (D-956)
  hallWarning: { text: 'The seal hall: once in, no way back.', warn: true }, // coming into the arena's hallway, the Lampeater unbeaten (D-956)
  leapLearnt: { text: 'The floor gives way. You learn Leap.', warn: false }, // the Lampeater beaten with the hero near the stairs: the gap's line and Leap's on one, the door seen sinking (D-962, D-963, D-964); kept, unused (D-967)
  lampeaterDie: { text: 'The Lampeater fades. Something glows.', warn: false }, // beaten: Leap's find lies where it fell (D-992, Claude's draft)
  leapFound: { text: 'You learn Leap.', warn: false }, // Leap's find stepped on, under its card (D-992)
  leapFindLook: { texts: ['A mark glows where it fell.'], warn: false }, // Leap's find, looked at (D-992, Claude's draft)
  floorGives: { text: 'The floor gives way.', warn: false }, // first near the stairs once it is beaten: the stones fall into the gap, the room shaking (Q-113, D-964); kept, unused (D-967)
  levelLeap: { text: 'Level {n}. You learn Leap.', warn: false }, // a level reached on the blow that beats it (D-962)
  gapBump: { text: "Too wide to step. More lies beyond.", warn: false }, // walking into a gap, free (D-963); kept with the Gap (D-967); before a cache, depths 5 to 8 (D-968); before Leap, its hint of the place beyond (D-969)
  gapLeap: { text: 'Too wide to step. Leap it.', warn: false }, // walking into a gap once Leap is learnt, free (D-969)
  leapWhich: { text: 'Leap which way?', warn: false }, // the Leap button pressed, waiting for a way (D-962)
  leapNoRoom: { text: 'No room to land.', warn: false }, // a leap whose landing tile isn't open, free (D-962)
  leapTooTall: { text: 'Too tall to leap over.', warn: false }, // a leap over a wall or a tall thing, free (D-962)
  sealedDoor: { texts: ['A sealed stone door.', 'A flame rune is cut into it.'], warn: false }, // a vault's sealed door bumped (D-892)
  runesLit: { texts: ['Faint marks.', 'Too pale to see by lantern light.'], warn: false }, // the rune wall bumped lit, a sentence a bump (D-927, D-929)
  runesOpen: { text: 'The runes flare, the stone sinks away.', warn: false }, // the rune wall bumped dark, sinking open (D-929)
  minersCamp: { text: "A miners' camp, long left.", warn: false }, // the camp bumped: on its card's opening, and bare, alone (D-770)
  campPickTaken: { text: 'You take the old pick.', warn: false }, // Claude's draft the owner may change (D-770)
};
