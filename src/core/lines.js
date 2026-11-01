// § lines: what the text line says, and when (D-094 to D-097). Plain data,
// no drawing. A line is said on a turn and shows for LINE_TURNS turns.
// The words are style study 1's (study lines 462, 482–483, Q-028).
// A line's `kind` says where it comes from, for its colour (D-509): 'speech', what people
// say; 'harm', a creature hurts you; none, the rest.

export const LINES = {
  oilLow: { text: 'The flame is getting low.', warn: false },
  oilEmpty: { text: 'The lantern gutters to an ember.', warn: true }, // a warning, in amber (D-097)
  ratHurt: { text: 'The rat squeaks and flees.', warn: false }, // hurt, it flees (D-292; was the study's line, D-107)
  // Hurt, it stands its ground: the lines take turns (D-297, D-301)
  ratStands: { texts: ['The rat stands its ground.', 'The rat squeaks and bares its teeth.', 'The rat squeaks.'], warn: false },
  ratDie: { text: 'The rat squeaks and falls still.', warn: false }, // (D-112)
  ratBite: { text: 'The rat bites you.', warn: false, kind: 'harm' }, // (D-117)
  gloamlingHurt: { text: 'The gloamling hisses at you.', warn: false }, // (D-240)
  gloamlingDie: { text: 'The gloamling hisses and fades.', warn: false }, // (D-240)
  gloamlingBite: { text: 'The gloamling bites you.', warn: false, kind: 'harm' }, // (D-240)
  lampmothDie: { text: 'The lampmoth flutters and falls.', warn: false }, // (D-356)
  lampmothBite: { text: 'The lampmoth bites you.', warn: false, kind: 'harm' }, // (D-356)
  scorpionDie: { text: 'The scorpion curls up and falls still.', warn: false }, // (D-370)
  scorpionBite: { text: 'The scorpion stings you.', warn: false, kind: 'harm' }, // (D-370)
  caveSpiderHurt: { text: 'The cave spider hisses.', warn: false }, // (D-535)
  caveSpiderDie: { text: 'The cave spider falls still.', warn: false }, // (D-535)
  caveSpiderBite: { text: 'The cave spider bites you.', warn: false, kind: 'harm' }, // (D-535)
  moleHurt: { text: 'The mole grunts and digs in.', warn: false }, // hurt, it keeps coming (D-541)
  moleDie: { text: 'The mole slumps and falls still.', warn: false },
  moleBite: { text: 'The mole claws you.', warn: false, kind: 'harm' },
  snapcapHurt: { text: 'The snapcap squelches and snaps.', warn: false }, // it never moves (D-543)
  snapcapDie: { text: 'The snapcap splits and falls still.', warn: false },
  snapcapBite: { text: 'The snapcap snaps at you.', warn: false, kind: 'harm' },
  batHurt: { text: 'The bat shrieks and flees.', warn: false }, // hurt, it flees (D-537)
  batStands: { texts: ['The bat squeaks and circles.', 'The bat flutters back at you.'], warn: false },
  batDie: { text: 'The bat flutters and falls still.', warn: false },
  batBite: { text: 'The bat bites you.', warn: false, kind: 'harm' },
  flaskMimicWakes: { text: 'The flask opens its eyes!', warn: false }, // (D-368)
  flaskMimicHurt: { text: 'The flask mimic cracks.', warn: false }, // (D-369)
  flaskMimicSettles: { text: 'The flask mimic settles down.', warn: false }, // (D-368)
  flaskMimicDie: { text: 'The flask mimic cracks and falls still.', warn: false }, // (D-366)
  flaskMimicBite: { text: 'The flask mimic bites you.', warn: false, kind: 'harm' }, // (D-366)
  fall: { text: 'You fall, and wake again.', warn: false }, // (D-119)
  anew: { text: 'The world begins again.', warn: false }, // a Hardcore fall (D-344)
  torchLit: { text: 'You light the torch.', warn: false }, // (D-124)
  lanternDark: { text: 'Your lantern is dark.', warn: false }, // (D-124)
  stairsDown: { text: 'You go down the stairs.', warn: false }, // (D-135)
  stairsUp: { text: 'You go up the stairs.', warn: false }, // (D-135)
  herbEat: { text: 'You eat the herb and feel better.', warn: false }, // (D-156)
  flaskPour: { text: 'You pour a flask.', warn: false }, // poured by itself (D-249)
  flaskFull: { text: "You can't carry more flasks.", warn: false }, // every stack full, no slot free (D-250, D-333)
  knifeTake: { text: 'You take the knife.', warn: false }, // into the held slot (D-252)
  knifeBag: { text: 'The knife goes in your bag.', warn: false }, // found with a weapon held (D-479)
  knifeHold: { text: 'You hold the knife.', warn: false }, // Hold in the bag (D-479)
  spearTake: { text: 'You take the spear.', warn: false }, // into the held slot (D-479)
  spearBag: { text: 'The spear goes in your bag.', warn: false }, // found with a weapon held (D-479)
  spearHold: { text: 'You hold the spear.', warn: false }, // Hold in the bag (D-479)
  flaskMake: { text: 'You make an oil flask.', warn: false }, // 3 oilcaps crafted (D-299)
  glassFlaskMake: { text: 'You make a flask from the glass.', warn: false }, // 1 mimic glass, 2 oilcaps (D-477)
  oilcapFull: { text: "You can't carry more oilcaps.", warn: false }, // every stack full, no slot free (D-250, D-296, D-333)
  heartcapFull: { text: "You can't carry more heartcaps.", warn: false }, // every stack full, no slot free (D-250, D-303, D-333)
  // Lines with `texts` take turns: each saying the next, then back to the first (D-297)
  oilcapTake: { texts: ['You grab the oilcap.', 'You pluck an oilcap from the floor.', 'The oilcap comes up with a soft pop.'], warn: false },
  oilcapLook: { texts: ['Three make an oil flask.', 'It smells faintly of lamp oil.', 'Its amber cap is slick with oil.'], warn: false },
  heartcapTake: { texts: ['You pick a heartcap.', 'The heartcap comes up whole.', 'A heartcap, warm in your hand.'], warn: false }, // (D-303)
  heartcapEat: { texts: ['You eat a heartcap.', 'The heartcap tastes of earth.', 'Warmth spreads through you.'], warn: false }, // eaten from the bag (D-308)
  potionMake: { text: 'You make a healing potion.', warn: false }, // 3 heartcaps crafted (D-309)
  potionFull: { text: "You can't carry more potions.", warn: false }, // every stack full, no slot free (D-309, D-333)
  potionDrink: { texts: ['You drink a healing potion.', 'The potion warms you through.', 'Your wounds close.'], warn: false }, // drunk from the bag (D-309)
  notHurt: { text: "You aren't hurt.", warn: false }, // Eat at full health (D-308)
  heartcapLook: { texts: ['It might mend a wound.', 'Its red cap is spotted white.', 'It feels faintly warm.'], warn: false },
  depositChip: { text: 'You chip at the boulder.', warn: false }, // the first bump (O2)
  depositCrack: { text: 'The boulder cracks.', warn: false }, // the second bump (O2)
  stoneTake: { texts: ['The boulder breaks. You take a stone.', 'The rock splits. A stone comes free.', 'The rock crumbles. You keep a stone.'], warn: false }, // the third (O2)
  stoneLook: { texts: ['A plain stone, for crafting later.', 'It is heavy and grey.', 'Cold and rough in your hand.'], warn: false },
  veinHard: { texts: ['Too hard to break by hand.', 'It glints with copper. It needs a pick.', 'Your knuckles ache. A pick would do it.'], warn: false }, // no pick in the bag, free (D-480)
  veinChip: { text: 'Your pick bites the rock.', warn: false }, // the first bump (D-480)
  veinChip2: { text: 'Chips of rock fly.', warn: false }, // the second
  veinCrack: { text: 'The vein cracks.', warn: false }, // the third
  copperOreTake: { texts: ['The rock gives. You take copper ore.', 'A lump of copper ore comes free.', 'The vein breaks. Copper ore!'], warn: false }, // the fourth
  copperOreLook: { texts: ['Copper ore, for crafting later.', 'Grey rock, flecked with copper.', 'It is heavier than it looks.'], warn: false },
  copperOreFull: { text: "You can't carry more copper ore.", warn: false },
  pickMake: { text: 'You make a stone pick.', warn: false }, // its line on the bench panel, a turn (D-480)
  pickFull: { text: 'You already carry a stone pick.', warn: false }, // only 1 is carried, free
  pickShort: { text: 'You need 2 Wood and 3 Stone.', warn: false }, // too few, free
  pickLook: { texts: ['A stone pick. It breaks copper veins.', 'Keep it in the bag to use it.', 'A sharp stone, lashed to a stick.'], warn: false },
  wickMake: { text: 'You make a copper wick.', warn: false }, // its line on the bench panel, a turn (D-483)
  copperWickFull: { text: 'You already have a copper wick.', warn: false }, // carried or fitted, free
  wickShort: { text: 'You need 3 Copper Ore and 1 Wood.', warn: false }, // too few, free
  copperWickLook: { texts: ['A copper wick. Fit it to burn less oil.', 'A wick in a copper collar.', 'It will make each flask last longer.'], warn: false },
  wickFit: { text: 'You fit the copper wick.', warn: false }, // Fit in the bag, free (D-483)
  vestMake: { text: 'You make a rat hide vest.', warn: false }, // its line on the bench panel, a turn (D-484)
  ratVestFull: { text: 'You already have a rat hide vest.', warn: false }, // carried or worn, free
  vestShort: { text: 'You need 4 Rat Tail and 1 Wood.', warn: false }, // too few, free
  ratVestLook: { texts: ['A rat hide vest. Wear it to turn bites.', 'Rat tails, stitched tight.', 'It smells of the tunnels too.'], warn: false },
  vestWear: { text: 'You put on the rat hide vest.', warn: false }, // Wear in the bag, free (D-484)
  glance: { text: 'The bite glances off your vest.', warn: false }, // worn, a bite that hurts nothing (D-484)
  charmMake: { text: 'You make a wisp charm.', warn: false }, // its line on the bench panel, a turn (D-486)
  wispCharmFull: { text: 'You already have a wisp charm.', warn: false }, // carried or worn, free
  charmShort: { text: 'You need 3 Gloam Wisp, 1 Copper Ore.', warn: false }, // too few, free
  wispCharmLook: { texts: ['A wisp charm. Wear it for rarer finds.', 'A gloam wisp, caught in copper.', 'It tugs toward hidden things.'], warn: false },
  charmWear: { text: 'You put on the wisp charm.', warn: false }, // Wear in the bag, free (D-486)
  heartMake: { text: 'You make a heart charm.', warn: false }, // its line on the bench panel, a turn (D-487)
  heartCharmFull: { text: 'You already have a heart charm.', warn: false }, // carried or worn, free
  heartShort: { text: 'You need 1 Mimic Heart, 1 Copper Ore.', warn: false }, // too few, free
  heartCharmLook: { texts: ['A heart charm. Wear it to burn less oil.', 'A mimic heart, set in copper.', 'It beats slow, like a banked flame.'], warn: false },
  heartWear: { text: 'You put on the heart charm.', warn: false }, // Wear in the bag, free (D-487)
  ratTailTake: { texts: ['You pick up the rat tail.', 'You take the tail. It is still warm.', 'The rat tail goes in your bag.'], warn: false },
  ratTailLook: { texts: ['A rat tail, for crafting later.', 'Long, pink and a little stiff.', 'It smells of the tunnels.'], warn: false },
  ratTailFull: { text: "You can't carry more rat tails.", warn: false },
  mothDustTake: { texts: ['You gather the moth dust.', 'The dust glitters on your fingers.', 'A pinch of moth dust for the bag.'], warn: false }, // (D-475)
  mothDustLook: { texts: ['Moth dust, for crafting later.', 'It glints amber in the light.', 'Fine and pale, like ash.'], warn: false },
  mothDustFull: { text: "You can't carry more moth dust.", warn: false },
  stingerTake: { texts: ['You pick up the stinger.', 'You take the sting, carefully.', 'The stinger goes in your bag.'], warn: false },
  stingerLook: { texts: ['A stinger, for crafting later.', 'The tip is still sharp.', 'Its shell is hard and dry.'], warn: false },
  stingerFull: { text: "You can't carry more stingers.", warn: false },
  mimicGlassTake: { texts: ['You pick up the mimic glass.', 'A shard of the mimic. It is still oily.', 'The mimic glass goes in your bag.'], warn: false },
  mimicGlassLook: { texts: ['Mimic glass. With 2 oilcaps, a flask.', 'Thick glass, smeared with oil.', 'Its edge is sharp.'], warn: false },
  mimicGlassFull: { text: "You can't carry more mimic glass.", warn: false },
  gloamWispTake: { texts: ['You catch the gloam wisp.', 'The wisp is cold in your hand.', 'The gloam wisp goes in your bag.'], warn: false },
  gloamWispLook: { texts: ['A gloam wisp, for crafting later.', 'It shrinks from your light.', 'A scrap of living shadow.'], warn: false },
  gloamWispFull: { text: "You can't carry more gloam wisps.", warn: false },
  spiderSilkTake: { texts: ['You pick up the spider silk.', 'You wind up the silk.', 'The spider silk goes in your bag.'], warn: false }, // (D-535)
  spiderSilkLook: { texts: ['Spider silk, for crafting later.', 'Fine, pale and very strong.', 'It is still a little sticky.'], warn: false },
  spiderSilkFull: { text: "You can't carry more spider silk.", warn: false },
  batWingTake: { texts: ['You pick up the bat wing.', 'Thin leather, light as paper.', 'The bat wing goes in your bag.'], warn: false }, // (D-537)
  batWingLook: { texts: ['A bat wing, for crafting later.', 'Thin dark leather on fine bones.', 'It folds up small.'], warn: false },
  batWingFull: { text: "You can't carry more bat wings.", warn: false },
  moleFurTake: { texts: ['You pick up the mole fur.', 'Soft as velvet, and warm.', 'The mole fur goes in your bag.'], warn: false }, // (D-541)
  moleFurLook: { texts: ['Mole fur, for crafting later.', 'Dark, short and very soft.', 'It smells of earth.'], warn: false },
  moleFurFull: { text: "You can't carry more mole fur.", warn: false },
  snapcapGillTake: { texts: ['You pick up the snapcap gill.', 'Soft pink frills, still damp.', 'The snapcap gill goes in your bag.'], warn: false }, // (D-543)
  snapcapGillLook: { texts: ['A snapcap gill, for crafting later.', 'Pale pink, fine as paper.', 'It smells faintly sweet.'], warn: false },
  snapcapGillFull: { text: "You can't carry more snapcap gills.", warn: false },
  batGuanoTake: { texts: ['You scoop up the guano.', 'You bag a handful of guano.', 'It crumbles as you lift it.'], warn: false }, // (D-540)
  batGuanoLook: { texts: ['Bat guano. It smells sharp.', 'Dry and crumbly, it reeks.', 'Gardeners prize this.'], warn: false },
  batGuanoFull: { text: "You can't carry more guano.", warn: false },
  venomSacTake: { texts: ['A venom sac! A rare find.', 'You lift the sac gently. It sloshes.', 'The venom sac goes in your bag.'], warn: false }, // (D-476)
  venomSacLook: { texts: ['A venom sac, for crafting later.', 'Green venom, sealed in a thin skin.', 'Best not to squeeze it.'], warn: false },
  venomSacFull: { text: "You can't carry more venom sacs.", warn: false },
  mimicHeartTake: { texts: ['A mimic heart! A rare find.', 'The heart is warm, like lamp oil.', 'The mimic heart goes in your bag.'], warn: false },
  mimicHeartLook: { texts: ['A mimic heart, for crafting later.', 'Amber oil, shaped like a heart.', 'It seems to beat, now and then.'], warn: false },
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
  stoneFull: { text: "You can't carry more stones.", warn: false }, // the third bump, every stack full: the boulder holds (O2)
  gloamberryTake: { texts: ['You pick two gloamberries.', 'Dark berries, cool to the touch.', 'The bush gives up its berries.'], warn: false }, // a full bush bumped (D-531)
  gloamberryFull: { text: "You can't carry more gloamberries.", warn: false }, // every stack full: the bush keeps its berries (D-531)
  gloamberryEat: { texts: ['You eat a gloamberry.', 'Sweet, and a little sour.', 'The berry bursts, dark and sweet.'], warn: false }, // eaten from the bag (D-531)
  gloamberryLook: { texts: ['A dark blue berry from the woods.', 'It might mend a little.', 'Small, round and cool.'], warn: false },
  bushBare: { text: 'The bush is bare. It will fill again.', warn: false }, // a picked bush bumped (D-531)
  woodTake: { texts: ['You pick up a stick.', 'A dry branch. You keep it.', 'You gather some wood.'], warn: false }, // (W1, D-314)
  branchCreak: { text: 'The branch creaks.', warn: false }, // the first bump (W2, D-316)
  branchTake: { texts: ['The branch snaps. You take wood.', 'It breaks apart. Wood for the bag.', 'Crack. You gather the wood.'], warn: false }, // the second
  woodFull: { text: "You can't carry more wood.", warn: false }, // the second bump, every stack full: the branch holds
  treeHack: { text: 'You hack at the tree.', warn: false }, // bumps 1 to 3 (W3, D-317)
  treeChips: { text: 'Chips fly from the trunk.', warn: false },
  treeGroan: { text: 'The tree groans.', warn: false },
  treeTake: { texts: ['The tree falls. You take wood.', 'It crashes down. Wood for the bag.', 'Timber! You gather the wood.'], warn: false }, // the fourth
  treeEdge: { texts: ['The forest will not yield.', 'These trees are too old to fell.'], warn: false }, // an edge tree bumped, free (D-321)
  benchMake: { text: 'You make a workbench.', warn: false }, // 3 Wood crafted (WB1, D-320)
  benchFull: { text: 'You already carry a workbench.', warn: false }, // only 1 is carried
  benchLook: { texts: ['A workbench, folded small.', 'Set it down on the surface.', 'Bigger things are made at it.'], warn: false },
  benchSet: { text: 'You set down the workbench.', warn: false }, // a turn (WB2, D-322)
  benchTake: { text: 'You take down the workbench.', warn: false }, // Deconstruct workbench, a turn (WB3, D-323)
  chestMake: { text: 'You make a stash chest.', warn: false }, // its line on the bench panel, a turn (CH1, D-326)
  chestFull: { text: 'You already carry a stash chest.', warn: false }, // only 1 is carried, free
  chestShort: { text: 'You need 3 Wood and 3 Stone.', warn: false }, // too few, free
  chestSet: { text: 'You set down the stash chest.', warn: false }, // a turn (CH2, D-329)
  chestTake: { text: 'You take down the stash chest.', warn: false }, // Deconstruct chest, a turn (CH5)
  chestNotEmpty: { text: 'Empty the chest first.', warn: false }, // Deconstruct chest with anything inside, free (CH5)
  chestLook: { texts: ['A stash chest, empty.', 'Set it down on the surface.', "It keeps what the bag can't."], warn: false },
  bedMake: { text: 'You make a bed.', warn: false }, // its line on the bench panel, a turn (D-488)
  bedFull: { text: 'You already carry a bed.', warn: false }, // only 1 is carried, free
  bedShort: { text: 'You need 4 Wood, 2 Rat Tail.', warn: false }, // too few, free
  bedSet: { text: 'You set down the bed.', warn: false }, // a turn
  bedTake: { text: 'You take down the bed.', warn: false }, // Yes on Deconstruct bed?, a turn
  // The trapped peddler's call through the rubble, the lines taking turns (step 12a, D-490); drafted for the playtest
  peddlerCalls: { texts: ['"Is someone there? I\'m stuck in here!"', '"The roof fell in. I can\'t get out!"', '"Please, dig me out of here!"'], warn: false, kind: 'speech' },
  peddlerDigging: { texts: ['"I hear you! Keep digging!"', '"It moved! Keep going!"', '"I see your light! Keep at it!"'], warn: false, kind: 'speech' }, // the rubble beside him being dug (D-496), drafted for the playtest
  peddlerFreed: { text: '"I\'m free! Thank you, friend!"', warn: false, kind: 'speech' }, // the rubble beside him cleared; he stays a little (D-491, D-496), drafted for the playtest
  peddlerWaiting: { texts: ['"I thought I\'d never see light again."', '"Your lantern found me. I owe you."', '"I know the way up from here."'], warn: false, kind: 'speech' }, // bumped, freed, still in the room (D-496), drafted for the playtest
  peddlerLeaving: { text: '"Thank you! I\'ll head for the surface."', warn: false, kind: 'speech' }, // the turns up, he goes home (D-496); the old freed line, drafted for the playtest
  peddlerGreets: { text: '"There you are, friend! Welcome!"', warn: false, kind: 'speech' }, // at home, the hero first within 2 tiles (D-496), drafted for the playtest
  peddlerHome: { texts: ['"You dug me out. I won\'t forget it."', '"Home at last. My legs still shake."', '"Let me unpack. I\'ll have wares soon."'], warn: false, kind: 'speech' }, // at home in the woods (D-492), drafted for the playtest
  rubbleDig: { text: 'You pull rocks off the heap.', warn: false }, // rubble with no one behind it, the first bump (D-491), drafted
  rubbleShift: { text: 'The heap shifts.', warn: false }, // the second
  rubbleClear: { text: 'The rubble falls away.', warn: false }, // the third: cleared, nothing taken
  bedLook: { texts: ['A bed, folded small.', 'Set it down on the surface.', 'Sleep in it at night.'], warn: false },
  sleep: { text: 'You sleep and wake rested.', warn: false }, // the bed at night (D-488)
  notTired: { text: "You aren't tired.", warn: false }, // the bed by day, free
  bagFull: { text: 'Your bag is full.', warn: false }, // Deconstruct with every slot taken, free; or a stack out of a chest (D-331), or the bag where you fell (D-345)
  bagBack: { text: 'You take back your bag.', warn: false }, // all of the bag where you fell, back in (MO3, D-345)
  stashFull: { text: 'The chest is full.', warn: false }, // a stack that can't all go into the stash chest, free (D-331)
  notSurface: { text: 'Only on the surface.', warn: false }, // Set down under a roof, free
  torchMake: { text: 'You make a torch.', warn: false }, // 1 moth dust, 1 wood (D-478)
  bagTorchLook: { texts: ['A torch. Set it down to light the way.', 'Moth dust packed round a stick.', 'It burns for a while, then goes out.'], warn: false },
  bagTorchFull: { text: "You can't carry more torches.", warn: false },
  torchSet: { text: 'You set down the torch.', warn: false }, // a turn (D-478)
  torchOut: { text: 'Your torch burns out.', warn: false }, // in sight, 100 turns after (D-478)
  noRoom: { text: 'There is no room there.', warn: false }, // Set down toward a side it can't go on, free
  woodLook: { texts: ['Three make a workbench.', 'It snaps if you bend it.', 'Good for building.'], warn: false },
  levelUp: { text: 'You feel stronger. Level {n}.', warn: false }, // {n}, the new level (D-246)
  unsaved: { text: 'Your journey could not be saved.', warn: true }, // a save failed: storage full or blocked; once, until one is kept again (D-428)
};
export const LINE_TURNS = 5; // turns a line stays before it fades (D-095)
const OIL_LOW = 0.2; // "under 20%", as in the study

// § say: (state, id, n) → new state, the line said on this turn; n fills a
// line's {n}, as the level does. A line with `texts` says the one after the
// last it said, kept in `state.told` (D-297).
export function say(state, id, n) {
  if (!LINES[id]) return state; // a creature with no line for this says nothing new (D-369)
  if (LINES[id]?.texts) {
    const i = (state.told?.[id] ?? 0) % LINES[id].texts.length;
    return { ...state, line: { id, turn: state.turn, i }, told: { ...state.told, [id]: i + 1 } };
  }
  return { ...state, line: n === undefined ? { id, turn: state.turn } : { id, turn: state.turn, n } };
}

// § shown: the line on screen now, or null once its turns are used up. A line
// with {n} is filled once per saying, so the same saying stays the same object
// and is drawn and spoken once (textline.js, frame.js).
const filled = new WeakMap();
export function shownLine(state) {
  if (!state.line || state.turn - state.line.turn >= LINE_TURNS) return null;
  const entry = LINES[state.line.id];
  if (!entry) return null; // a line that isn't there, as an old save may hold, shows nothing (D-369)
  if (entry.texts) {
    if (!filled.has(state.line)) filled.set(state.line, { ...entry, texts: undefined, text: entry.texts[state.line.i ?? 0] });
    return filled.get(state.line);
  }
  if (state.line.n === undefined) return entry;
  if (!filled.has(state.line)) filled.set(state.line, { ...entry, text: entry.text.replace('{n}', state.line.n) });
  return filled.get(state.line);
}

// § oil: a line only as the oil crosses a mark on the way down, so each is
// said once, and again only after the oil has gone back above it (D-096).
export function oilLine(before, after) {
  if (before > 0 && after === 0) return 'oilEmpty';
  if (before >= OIL_LOW && after < OIL_LOW) return 'oilLow';
  return null;
}
