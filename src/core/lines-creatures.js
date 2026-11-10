// § lines, creatures: what the text line says for each creature, and for the finds creatures leave
// (Take, Look, Full), moved word for word from `lines.js` at the thirteenth audit (D-782). Plain data,
// as there; `lines.js` spreads it into LINES.

export const CREATURE_LINES = {
  ratHurt: { text: 'The rat squeaks and flees.', warn: false }, // hurt, it flees (D-292; was the study's line, D-107)
  // Hurt, it stands its ground: the lines take turns (D-297, D-301)
  ratStands: { texts: ['The rat stands its ground.', 'The rat squeaks and bares its teeth.', 'The rat squeaks.'], warn: false },
  ratPack: { texts: ['The pack closes in!', 'Rats squeak all around you!', 'A pack of rats comes for you!'], warn: true }, // a pack notices (D-766)
  ratDie: { text: 'The rat squeaks and falls still.', warn: false }, // (D-112)
  ratBite: { text: 'The rat bites you.', warn: false, kind: 'harm' }, // (D-117)
  gloamlingHurt: { text: 'The gloamling hisses at you.', warn: false }, // (D-240)
  gloamlingDie: { text: 'The gloamling hisses and fades.', warn: false }, // (D-240)
  gloamlingBite: { text: 'The gloamling bites you.', warn: false, kind: 'harm' }, // (D-240)
  lampmothDie: { text: 'The lampmoth flutters and falls.', warn: false }, // (D-356)
  lampmothBite: { text: 'The lampmoth bites you.', warn: false, kind: 'harm' }, // (D-356)
  scorpionDie: { text: 'The scorpion curls up and falls still.', warn: false }, // (D-370)
  scorpionBite: { text: 'The scorpion stings you.', warn: false, kind: 'harm' }, // (D-370)
  scorpionRaises: { text: 'The scorpion raises its tail!', warn: true }, // it strikes (D-729), Claude's drafts the owner may change
  scorpionMisses: { text: 'The sting strikes the bare floor.', warn: false },
  stingsFoe: { text: 'The sting strikes the {n}.', warn: false }, // a sting hits a creature, not the hero, {n} its name (D-768)
  caveSpiderHurt: { text: 'The cave spider hisses.', warn: false }, // (D-535)
  caveSpiderDie: { text: 'The cave spider falls still.', warn: false }, // (D-535)
  caveSpiderBite: { text: 'The cave spider bites you.', warn: false, kind: 'harm' }, // (D-535)
  moleHurt: { text: 'The mole grunts and digs in.', warn: false }, // hurt, it keeps coming (D-541)
  moleDie: { text: 'The mole slumps and falls still.', warn: false },
  moleBite: { text: 'The mole claws you.', warn: false, kind: 'harm' },
  moleDigs: { text: 'The mole digs down into the earth!', warn: false }, // it burrows (D-726), Claude's drafts the owner may change
  moleSurfaces: { text: 'The mole bursts up beside you!', warn: false },
  moleUnder: { text: 'It is under the earth, out of reach.', warn: false },
  snapcapHurt: { text: 'The snapcap squelches and snaps.', warn: false }, // it never moves (D-543)
  snapcapDie: { text: 'The snapcap splits and falls still.', warn: false },
  snapcapBite: { text: 'The snapcap snaps at you.', warn: false, kind: 'harm' },
  herbMimicWakes: { text: 'The herb opens its eyes!', warn: false }, // (D-549)
  herbMimicHurt: { text: 'The herb mimic rustles.', warn: false },
  herbMimicSettles: { text: 'The herb mimic settles down.', warn: false },
  herbMimicDie: { text: 'The herb mimic wilts and falls still.', warn: false },
  herbMimicBite: { text: 'The herb mimic bites you.', warn: false, kind: 'harm' },
  boneRatHurt: { text: 'The bone rat rattles and keeps coming.', warn: false }, // hurt, it never flees (D-551)
  boneRatDie: { text: 'The bone rat falls apart.', warn: false },
  boneRatFalls: { text: 'The bone rat falls into a pile of bones.', warn: false }, // it comes back (D-731), Claude's drafts the owner may change
  boneRatStirs: { text: 'The bones stir.', warn: true }, // its last turn as a pile (D-731)
  boneRatScatters: { text: 'You scatter the bones for good.', warn: false }, // stepped on (D-731)
  boneRatBite: { text: 'The bone rat bites you.', warn: false, kind: 'harm' },
  oilTickHurt: { text: 'The oil tick squirts and keeps coming.', warn: false }, // (D-606)
  oilTickDie: { text: 'The oil tick bursts and falls still.', warn: false },
  oilTickDrinks: { text: 'The oil tick drinks your oil.', warn: false, kind: 'harm' }, // instead of a bite, while there is oil (D-606)
  oilTickBite: { text: 'The oil tick bites you.', warn: false, kind: 'harm' }, // with the lantern empty
  lureWispDie: { text: 'The lure wisp gutters out.', warn: false }, // (D-649); it never bites, so it has no bite line
  batHurt: { text: 'The bat shrieks and flees.', warn: false }, // hurt, it flees (D-537)
  batStands: { texts: ['The bat squeaks and circles.', 'The bat flutters back at you.'], warn: false },
  batDie: { text: 'The bat flutters and falls still.', warn: false },
  batBite: { text: 'The bat bites you.', warn: false, kind: 'harm' },
  flaskMimicWakes: { text: 'The flask opens its eyes!', warn: false }, // (D-368)
  flaskMimicHurt: { text: 'The flask mimic cracks.', warn: false }, // (D-369)
  flaskMimicSettles: { text: 'The flask mimic settles down.', warn: false }, // (D-368)
  flaskMimicDie: { text: 'The flask mimic cracks and falls still.', warn: false }, // (D-366)
  flaskMimicBite: { text: 'The flask mimic bites you.', warn: false, kind: 'harm' }, // (D-366)
  // The finds creatures leave
  ratTailTake: { texts: ['You pick up the rat tail.', 'You take the tail. It is still warm.', 'The rat tail goes in your bag.'], warn: false },
  ratTailLook: { texts: ['A rat tail, good for making things.', 'Long, pink and a little stiff.', 'It smells of the tunnels.'], warn: false },
  ratTailFull: { text: "You can't carry more rat tails.", warn: false },
  mothDustTake: { texts: ['You gather the moth dust.', 'The dust glitters on your fingers.', 'A pinch of moth dust for the bag.'], warn: false }, // (D-475)
  mothDustLook: { texts: ['Moth dust, good for making things.', 'It glints amber in the light.', 'Fine and pale, like ash.'], warn: false },
  mothDustFull: { text: "You can't carry more moth dust.", warn: false },
  stingerTake: { texts: ['You pick up the stinger.', 'You take the sting, carefully.', 'The stinger goes in your bag.'], warn: false },
  stingerLook: { texts: ['A stinger, for crafting later.', 'The tip is still sharp.', 'Its shell is hard and dry.'], warn: false },
  stingerFull: { text: "You can't carry more stingers.", warn: false },
  mimicGlassTake: { texts: ['You pick up the mimic glass.', 'A shard of the mimic. It is still oily.', 'The mimic glass goes in your bag.'], warn: false },
  mimicGlassLook: { texts: ['Mimic glass. With 2 oilcaps, a flask.', 'Thick glass, smeared with oil.', 'Its edge is sharp.'], warn: false },
  mimicGlassFull: { text: "You can't carry more mimic glass.", warn: false },
  gloamWispTake: { texts: ['You catch the gloam wisp.', 'The wisp is cold in your hand.', 'The gloam wisp goes in your bag.'], warn: false },
  gloamWispLook: { texts: ['A gloam wisp, good for making things.', 'It shrinks from your light.', 'A scrap of living shadow.'], warn: false },
  gloamWispFull: { text: "You can't carry more gloam wisps.", warn: false },
  spiderSilkTake: { texts: ['You pick up the spider silk.', 'You wind up the silk.', 'The spider silk goes in your bag.'], warn: false }, // (D-535)
  spiderSilkLook: { texts: ['Spider silk, good for making things.', 'Fine, pale and very strong.', 'It is still a little sticky.'], warn: false },
  spiderSilkFull: { text: "You can't carry more spider silk.", warn: false },
  batWingTake: { texts: ['You pick up the bat wing.', 'Thin leather, light as paper.', 'The bat wing goes in your bag.'], warn: false }, // (D-537)
  batWingLook: { texts: ['A bat wing, for crafting later.', 'Thin dark leather on fine bones.', 'It folds up small.'], warn: false },
  batWingFull: { text: "You can't carry more bat wings.", warn: false },
  moleFurTake: { texts: ['You pick up the mole fur.', 'Soft as velvet, and warm.', 'The mole fur goes in your bag.'], warn: false }, // (D-541)
  moleFurLook: { texts: ['Mole fur, good for making things.', 'Dark, short and very soft.', 'It smells of earth.'], warn: false },
  moleFurFull: { text: "You can't carry more mole fur.", warn: false },
  snapcapGillTake: { texts: ['You pick up the snapcap gill.', 'Soft pink frills, still damp.', 'The snapcap gill goes in your bag.'], warn: false }, // (D-543)
  snapcapGillLook: { texts: ['A snapcap gill, good for making things.', 'Pale pink, fine as paper.', 'It smells faintly sweet.'], warn: false },
  snapcapGillFull: { text: "You can't carry more snapcap gills.", warn: false },
  mimicLeafTake: { texts: ['You pick up the mimic leaf.', 'A leaf with a pink spot, like an eye.', 'The mimic leaf goes in your bag.'], warn: false }, // (D-549)
  mimicLeafLook: { texts: ['A mimic leaf, good for making things.', 'Its pink spot still seems to stare.', 'It smells green and bitter.'], warn: false },
  mimicLeafFull: { text: "You can't carry more mimic leaves.", warn: false },
  ratBoneTake: { texts: ['You pick up the rat bone.', 'A small pale bone with knobbed ends.', 'The rat bone goes in your bag.'], warn: false }, // (D-551)
  ratBoneLook: { texts: ['A rat bone, for crafting later.', 'Dry, light and very clean.', 'It clicks against the others.'], warn: false },
  ratBoneFull: { text: "You can't carry more rat bones.", warn: false },
  tickShellTake: { texts: ['You pick up the tick shell.', 'A split dusky shell, light as paper.', 'The tick shell goes in your bag.'], warn: false }, // (D-606)
  tickShellLook: { texts: ['A tick shell, good for making things.', 'Thin, dark and a little oily.', 'It smells faintly of the lantern.'], warn: false },
  tickShellFull: { text: "You can't carry more tick shells.", warn: false },
  oilBladderTake: { texts: ['You pick up an oil bladder.', 'The sac the tick kept its oil in.', 'The oil bladder goes in your bag.'], warn: false }, // (D-606)
  oilBladderLook: { texts: ['An oil bladder, for crafting later.', 'Amber oil sloshes inside.', 'It is warm, and full.'], warn: false },
  oilBladderFull: { text: "You can't carry more oil bladders.", warn: false },
  wispGlassTake: { texts: ['You pick up the wisp glass.', 'A sliver of cold blue glass.', 'The wisp glass goes in your bag.'], warn: false }, // (D-649)
  wispGlassLook: { texts: ['Wisp glass, good for making things.', 'It holds a faint blue glimmer.', 'Cold to the touch, still.'], warn: false },
  wispGlassFull: { text: "You can't carry more wisp glass.", warn: false },
  bunnyDie: { text: 'The bunny goes still.', warn: false }, // (D-784); it never bites, so it has no bite line
  bunnyFurTake: { texts: ['You pick up the bunny fur.', 'Soft and warm, pale at the tips.', 'The bunny fur goes in your bag.'], warn: false }, // (D-784)
  bunnyFurLook: { texts: ['Bunny fur, for crafting later.', 'Soft brown fur, pale at the tips.', 'It smells of grass.'], warn: false },
  bunnyFurFull: { text: "You can't carry more bunny fur.", warn: false },
  batGuanoTake: { texts: ['You scoop up the guano.', 'You bag a handful of guano.', 'It crumbles as you lift it.'], warn: false }, // (D-540)
  batGuanoLook: { texts: ['Bat guano. It smells sharp.', 'Dry and crumbly, it reeks.', 'Gardeners prize this.'], warn: false },
  batGuanoFull: { text: "You can't carry more guano.", warn: false },
  venomSacTake: { texts: ['A venom sac! A rare find.', 'You lift the sac gently. It sloshes.', 'The venom sac goes in your bag.'], warn: false }, // (D-476)
  venomSacLook: { texts: ['A venom sac, for crafting later.', 'Green venom, sealed in a thin skin.', 'Best not to squeeze it.'], warn: false },
  venomSacFull: { text: "You can't carry more venom sacs.", warn: false },
  mimicHeartTake: { texts: ['A mimic heart! A rare find.', 'The heart is warm, like lamp oil.', 'The mimic heart goes in your bag.'], warn: false },
  mimicHeartLook: { texts: ['A mimic heart, good for making things.', 'Amber oil, shaped like a heart.', 'It seems to beat, now and then.'], warn: false },
  mimicHeartFull: { text: "You can't carry more mimic hearts.", warn: false },
  gloamEyeTake: { texts: ['A gloam eye! A rare find.', 'The eye is cold and smooth.', 'The gloam eye goes in your bag.'], warn: false },
  gloamEyeLook: { texts: ['A gloam eye, for crafting later.', 'It still seems to watch you.', 'It blinks away from your light.'], warn: false },
  gloamEyeFull: { text: "You can't carry more gloam eyes.", warn: false },
  batFangTake: { texts: ['A bat fang! A rare find.', 'A tiny fang, needle sharp.', 'The bat fang goes in your bag.'], warn: false }, // (D-537)
  batFangLook: { texts: ['A bat fang, for crafting later.', 'Small, white and very sharp.', 'Mind your fingers.'], warn: false },
  batFangFull: { text: "You can't carry more bat fangs.", warn: false },
  moleClawTake: { texts: ['A mole claw! A rare find.', 'A broad claw, made for digging.', 'The mole claw goes in your bag.'], warn: false }, // (D-541)
  moleClawLook: { texts: ['A mole claw, for crafting later.', 'Wide, pale and blunt-tipped.', 'Still gritty with earth.'], warn: false },
  moleClawFull: { text: "You can't carry more mole claws.", warn: false },
};
