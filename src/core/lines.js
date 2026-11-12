// § lines: what the text line says, and when (D-094 to D-097). Plain data,
// no drawing. A line is said on a turn and shows for LINE_TURNS turns.
// The words are style study 1's (study lines 462, 482–483, Q-028).
// A line's `kind` says where it comes from, for its colour (D-509): 'speech', what people
// say; 'harm', a creature hurts you; none, the rest. Each creature's lines, and those of the
// finds creatures leave, are in `lines-creatures.js` (D-782).
import { CREATURE_LINES } from './lines-creatures.js';

export const LINES = {
  ...CREATURE_LINES,
  oilLow: { text: 'The flame is getting low.', warn: false },
  oilEmpty: { text: 'The lantern gutters to an ember.', warn: true }, // a warning, in amber (D-097)
  fall: { text: 'You fall, and wake again.', warn: false }, // (D-119)
  anew: { text: 'The world begins again.', warn: false }, // a Hardcore fall (D-344)
  torchLit: { text: 'You light the torch.', warn: false }, // (D-124)
  stoneWakes: { text: 'The waystone wakes.', warn: false }, // (D-591)
  stoneTravel: { text: 'The waystone carries you.', warn: false }, // (D-593)
  stoneNear: { text: 'Not with a creature so near.', warn: false }, // travel barred (D-593)
  boonTake: { text: 'The waystone grants you {n}.', warn: false }, // a boon picked, {n} its name (D-596)
  boonHeld: { text: '{n}', warn: false }, // a tap on the boon's mark, {n} its name and card line (D-604)
  lanternDark: { text: 'Your lantern is dark.', warn: false }, // (D-124)
  stairsDown: { text: 'You go down the stairs.', warn: false }, // (D-135)
  stairsUp: { text: 'You go up the stairs.', warn: false }, // (D-135)
  herbEat: { text: 'You eat the herb and feel better.', warn: false }, // (D-156)
  flaskPour: { text: 'You pour a flask.', warn: false }, // poured by itself (D-249)
  flaskFull: { text: "You can't carry more flasks.", warn: false }, // every stack full, no slot free (D-250, D-333)
  knifeTake: { text: 'You take the knife.', warn: false }, // into the held slot (D-252)
  knifeBag: { text: 'The knife goes in your bag.', warn: false }, // found with a weapon held (D-479)
  knifeHold: { text: 'You hold the knife.', warn: false }, // Hold in the bag (D-479)
  knifeAway: { text: 'You put the knife away.', warn: false }, // Take off, into the bag, free (D-554)
  spearTake: { text: 'You take the spear.', warn: false }, // into the held slot (D-479)
  spearBag: { text: 'The spear goes in your bag.', warn: false }, // found with a weapon held (D-479)
  spearHold: { text: 'You hold the spear.', warn: false }, // Hold in the bag (D-479)
  spearAway: { text: 'You put the spear away.', warn: false }, // Take off, into the bag, free (D-554)
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
  looseStoneTake: { texts: ['You pick up a loose stone.', 'A stone from the slope. You keep it.', 'You lift a stone from the grass.'], warn: false }, // a loose stone (D-761)
  duskstarTake: { texts: ['You pick a duskstar.', 'A violet flower. You keep it.', 'You pick the little star of petals.'], warn: false }, // the first flower (D-763)
  duskstarLook: { texts: ['A duskstar, good for making things.', 'Violet petals, a yellow heart.', 'A small flower from the woods.'], warn: false },
  duskstarFull: { text: "You can't carry more duskstars.", warn: false },
  stoneLook: { texts: ['A plain stone, good for making things.', 'It is heavy and grey.', 'Cold and rough in your hand.'], warn: false },
  veinHard: { texts: ['Too hard to break by hand.', 'It glints with copper. It needs a pick.', 'Your knuckles ache. A pick would do it.'], warn: false }, // no pick in the Tool slot, free (D-480, D-552)
  veinChip: { text: 'Your pick bites the rock.', warn: false }, // the first bump (D-480)
  veinChip2: { text: 'Chips of rock fly.', warn: false }, // the second
  veinCrack: { text: 'The vein cracks.', warn: false }, // the third
  copperOreTake: { texts: ['The rock gives. You take copper ore.', 'A lump of copper ore comes free.', 'The vein breaks. Copper ore!'], warn: false }, // the fourth
  copperOreLook: { texts: ['Copper ore, good for making things.', 'Grey rock, flecked with copper.', 'It is heavier than it looks.'], warn: false },
  copperOreFull: { text: "You can't carry more copper ore.", warn: false },
  pickMake: { text: 'You make a stone pick.', warn: false }, // its line on the bench panel, a turn (D-480)
  pickFull: { text: 'You already carry a stone pick.', warn: false }, // only 1 is carried, free
  pickShort: { text: 'You need 2 Wood and 3 Stone.', warn: false }, // too few, free
  pickLook: { texts: ['A stone pick. It breaks copper veins.', 'Hold it to use it.', 'A sharp stone, lashed to a stick.'], warn: false }, // the second was "Keep it in the bag to use it." until D-552
  pickHold: { text: 'You hold the stone pick.', warn: false }, // Hold in the bag, into the Tool slot, a turn (D-552)
  pickAway: { text: 'You put the stone pick away.', warn: false }, // Take off, into the bag, free (D-554)
  moleClawPickMake: { text: 'You make a mole claw pick.', warn: false }, // its line on the bench's BUILD tab, a turn (D-810)
  moleClawPickFull: { text: 'You already carry a mole claw pick.', warn: false }, // only 1 is carried, free
  moleClawPickShort: { text: 'Need 1 Mole Claw, 2 Wood, 2 Stone.', warn: false }, // too few, free
  moleClawPickLook: { texts: ['A mole claw pick. It digs fast.', 'Veins and rubble go in 2 bumps.', "A mole's claw, lashed to a stick."], warn: false },
  moleClawPickHold: { text: 'You hold the mole claw pick.', warn: false }, // Hold in the bag, into the Tool slot, a turn
  moleClawPickAway: { text: 'You put the mole claw pick away.', warn: false }, // Take off, into the bag, free
  rodMake: { text: 'You make a wooden rod.', warn: false }, // its line on the bench panel, a turn (D-609)
  rodFull: { text: 'You already carry a wooden rod.', warn: false }, // only 1 is carried, free
  rodShort: { text: 'You need 2 Wood and 2 Spider Silk.', warn: false }, // too few, free
  rodLook: { texts: ['A wooden rod, strung with spider silk.', 'Hold it to use it.', 'A red and white float bobs on it.'], warn: false },
  rodHold: { text: 'You hold the wooden rod.', warn: false }, // Hold in the bag, into the Tool slot, a turn (D-609)
  rodAway: { text: 'You put the wooden rod away.', warn: false }, // Take off, into the bag, free
  castLine: { text: 'You cast the line.', warn: false }, // bumping water with the rod held, a turn (D-610, D-618)
  fishNibble: { text: 'A nibble...', warn: false }, // 1 waiting turn in 6, the float twitching; the bite next turn (D-613)
  fishBite: { text: 'Something bites!', warn: false }, // the turn after a nibble, the "!" over the float
  fishCatch: { text: 'You catch a pond minnow.', warn: false }, // a strike in the strike meter's zone (D-614)
  fishAway: { text: 'It got away.', warn: false }, // a bite not pulled in its turn, the float staying; or a strike missed, the line in (D-614)
  fishSlip: { text: 'No room. The minnow slips away.', warn: false }, // a catch with no room
  reelIn: { text: 'You reel in the line.', warn: false }, // walking off, or another tool held
  pondMinnowLook: { texts: ['A pond minnow, small and silver.', 'It still smells of the pond.', 'Poured, it gives the lantern a little oil.'], warn: false },
  pondMinnowFull: { text: "You can't carry more minnows.", warn: false },
  minnowEat: { text: 'You eat the minnow. Cold, but filling.', warn: false }, // eaten from the bag, 1 heart (D-615)
  cavefishCatch: { text: 'You catch a blind cavefish.', warn: false }, // a cave pool's catch (D-618)
  cavefishSlip: { text: 'No room. The cavefish slips away.', warn: false },
  blindCavefishLook: { texts: ['A blind cavefish, pale as bone.', 'It has never seen light.', 'Poured, it gives the lantern more oil.'], warn: false },
  blindCavefishFull: { text: "You can't carry more cavefish.", warn: false },
  cavefishEat: { text: 'You eat the cavefish. Cold, but filling.', warn: false }, // eaten from the bag, 1 heart (D-618)
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
  shellVestMake: { text: 'You make a shell vest.', warn: false }, // its line on the bench's GEAR tab, a turn (D-801)
  shellVestFull: { text: 'You already have a shell vest.', warn: false }, // carried or worn, free
  shellVestShort: { text: 'You need 4 Crab Shell and 1 Wood.', warn: false }, // too few, free
  shellVestLook: { texts: ['A shell vest. Hard bites hurt less.', 'Crab shells, plated like stone.', 'Heavy, but the claws slide off.'], warn: false },
  shellVestWear: { text: 'You put on the shell vest.', warn: false }, // Wear in the bag, free (D-801)
  furBedrollMake: { text: 'You make a fur bedroll.', warn: false }, // its line on the bench's BUILD tab, a turn (D-803)
  furBedrollFull: { text: 'You already have a fur bedroll.', warn: false }, // carried, free
  furBedrollShort: { text: 'You need 4 Bunny Fur, 1 Spider Silk.', warn: false }, // too few, free
  furBedrollLook: { texts: ['A fur bedroll, for sleeping out.', 'Bunny fur, rolled and tied with silk.', 'Soft, warm and light to carry.'], warn: false },
  glance: { text: 'The bite glances off your vest.', warn: false }, // worn, a bite that hurts nothing (D-484)
  guardGlance: { text: 'The bite glances off you.', warn: false }, // Guard, a bite that hurts nothing (D-817)
  thriftKeep: { text: 'You keep 1 {n}.', warn: false }, // Thrift, a making's part kept, {n} its name, in place of the make line (D-818)
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
  centipedeCharmMake: { text: 'You make a centipede charm.', warn: false }, // its line on the bench panel, a turn (D-656)
  centipedeCharmFull: { text: 'You already have a centipede charm.', warn: false }, // carried or worn, free
  centipedeCharmShort: { text: 'Need 3 Centipede Leg, 1 Copper Ore.', warn: false }, // too few, free
  centipedeCharmLook: { texts: ['A centipede charm, against poison.', 'A drop of venom, set in copper.', 'Wear it, and poison passes sooner.'], warn: false },
  centipedeCharmWear: { text: 'You put on the centipede charm.', warn: false }, // Wear in the bag, free (D-656)
  echoCharmMake: { text: 'You make an echo charm.', warn: false }, // its line on the bench panel, a turn (D-805)
  echoCharmFull: { text: 'You already have an echo charm.', warn: false }, // carried or worn, free
  echoCharmShort: { text: 'Need 3 Bat Wing, 1 Copper Ore.', warn: false }, // too few, free
  echoCharmLook: { texts: ['An echo charm, for the dark.', 'A bat wing, set in copper.', 'Near creatures show in the dark.'], warn: false },
  echoCharmWear: { text: 'You put on the echo charm.', warn: false }, // Wear in the bag, free (D-805)
  fangCharmMake: { text: 'You make a fang charm.', warn: false }, // its line on the bench panel, a turn (D-809)
  fangCharmFull: { text: 'You already have a fang charm.', warn: false }, // carried or worn, free
  fangCharmShort: { text: 'Need 1 Bat Fang, 1 Copper Ore.', warn: false }, // too few, free
  fangCharmLook: { texts: ['A fang charm, for hearts back.', 'A bat fang, set in copper.', 'Beaten creatures may mend you.'], warn: false },
  fangCharmWear: { text: 'You put on the fang charm.', warn: false }, // Wear in the bag, free (D-809)
  fangCharmMend: { text: 'The fang drinks. You feel better.', warn: false }, // a heart back from a creature beaten (D-809)
  boneHookMake: { text: 'You make a bone hook.', warn: false }, // its line on the bench's BUILD tab, a turn (D-807)
  boneHookFull: { text: 'You already have a bone hook.', warn: false }, // carried or fitted, free
  boneHookShort: { text: 'Need 3 Rat Bone, 1 Spider Silk.', warn: false }, // too few, free
  boneHookLook: { texts: ['A bone hook, for your rod.', 'Rat bone, bent and tied with silk.', 'Fish land easier on it.'], warn: false },
  boneHookFit: { text: 'You tie the bone hook to your rod.', warn: false }, // Fit in the bag, free (D-807)
  boneHookNoRod: { text: 'You have no rod to fit it to.', warn: false }, // Fit with no rod carried, free
  stoneFull: { text: "You can't carry more stones.", warn: false }, // the third bump, every stack full: the boulder holds (O2)
  gloamberryTake: { texts: ['You pick two gloamberries.', 'Dark berries, cool to the touch.', 'The bush gives up its berries.'], warn: false }, // a full bush bumped (D-531)
  gloamberryFull: { text: "You can't carry more gloamberries.", warn: false }, // every stack full: the bush keeps its berries (D-531)
  gloamberryEat: { texts: ['You eat a gloamberry.', 'Sweet, and a little sour.', 'The berry bursts, dark and sweet.'], warn: false }, // eaten from the bag (D-531)
  gloamberryLook: { texts: ['A dark blue berry from the woods.', 'It might mend a little.', 'Small, round and cool.'], warn: false },
  gloamberrySeedMake: { text: 'You make a gloamberry seed.', warn: false }, // 3 Gloamberries crafted (D-564)
  gloamberrySeedFull: { text: "You can't carry more seeds.", warn: false }, // no room for the seed made (D-564)
  gloamberrySeedLook: { texts: ['A seed from the gloamberry.', 'It wants soft ground.', 'Something might grow from this.'], warn: false }, // chosen in the bag (D-564)
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
  pouchMake: { text: 'Your bag holds 9 now.', warn: false }, // its line on the bench panel, a turn (D-547)
  pouchFull: { text: 'Your bag already holds 9.', warn: false }, // free
  pouchShort: { text: 'You need 4 Rat Tail and 2 Spider Silk.', warn: false }, // too few, free
  pouchLook: { texts: ['A rat hide pouch. Your bag will hold 9.', 'Rat hide, sewn with spider silk.'], warn: false },
  bigBagMake: { text: 'Your bag holds 12 now.', warn: false }, // after the Pouch, a turn (D-547)
  bigBagFull: { text: 'Your bag already holds 12.', warn: false }, // free
  bigBagShort: { text: 'You need 4 Mole Fur and 3 Spider Silk.', warn: false }, // too few, free
  bigBagLook: { texts: ['A mole fur pack. Your bag will hold 12.', 'Mole fur, sewn with spider silk.'], warn: false },
  bedMake: { text: 'You make a bed.', warn: false }, // its line on the bench panel, a turn (D-488)
  bedFull: { text: 'You already carry a bed.', warn: false }, // only 1 is carried, free
  bedShort: { text: 'You need 4 Wood, 2 Rat Tail.', warn: false }, // too few, free
  bedSet: { text: 'You set down the bed.', warn: false }, // a turn
  bedTake: { text: 'You take down the bed.', warn: false }, // Yes on Deconstruct bed?, a turn
  gardenBedMake: { text: 'You make a garden bed.', warn: false }, // its line on the bench panel, a turn (D-565)
  gardenBedFull: { text: 'You already carry a garden bed.', warn: false }, // only 1 is carried, free
  gardenBedShort: { text: 'You need 3 Wood, 2 Stone.', warn: false }, // too few, free
  gardenBedSet: { text: 'You set down the garden bed.', warn: false }, // a turn
  gardenBedTake: { text: 'You take down the garden bed.', warn: false }, // Deconstruct on its card, a turn
  shelfMake: { text: 'You make a shelf.', warn: false }, // its line on the bench panel, a turn (D-690), drafted for the playtest
  shelfFull: { text: 'You already carry a shelf.', warn: false }, // only 1 is carried, free
  shelfShort: { text: 'You need 4 Wood, 2 Stone.', warn: false }, // too few, free
  shelfSet: { text: 'You set down the shelf.', warn: false }, // a turn
  shelfTake: { text: 'You take down the shelf.', warn: false }, // Yes on Deconstruct shelf?, a turn
  mortarMake: { text: 'You make a mortar and pestle.', warn: false }, // MAKE on the bag's Make tab, a turn (D-786)
  mortarFull: { text: 'You already carry a mortar.', warn: false }, // only 1 is carried, free
  mortarSet: { text: 'You set down the mortar.', warn: false }, // a turn
  mortarTake: { text: 'You take down the mortar.', warn: false }, // Deconstruct on its card, a turn
  gardenBedPlant: { text: 'You plant a gloamberry seed.', warn: false }, // Plant on its card, a turn (D-566)
  gardenBedPick: { text: 'You pick three gloamberries.', warn: false }, // Pick on the grown bed's card, a turn (D-568)
  gardenBedFeed: { text: 'You feed the soil with guano.', warn: false }, // Feed on the sprout's card, a turn (D-569)
  // The trapped peddler's call through the rubble, the lines taking turns (step 12a, D-490); drafted for the playtest
  peddlerCalls: { texts: ['"Is someone there? I\'m stuck in here!"', '"The roof fell in. I can\'t get out!"', '"Please, dig me out of here!"'], warn: false, kind: 'speech' },
  peddlerDigging: { texts: ['"I hear you! Keep digging!"', '"It moved! Keep going!"', '"I see your light! Keep at it!"'], warn: false, kind: 'speech' }, // the rubble beside him being dug (D-496), drafted for the playtest
  peddlerFreed: { text: '"I\'m free! Thank you, friend!"', warn: false, kind: 'speech' }, // the rubble beside him cleared; he stays a little (D-491, D-496), drafted for the playtest
  peddlerWaiting: { texts: ['"I thought I\'d never see light again."', '"Your lantern found me. I owe you."', '"I know the way up from here."'], warn: false, kind: 'speech' }, // bumped, freed, still in the room (D-496), drafted for the playtest
  peddlerLeaving: { text: '"Thank you! I\'ll head for the surface."', warn: false, kind: 'speech' }, // the turns up, he goes home (D-496); the old freed line, drafted for the playtest
  peddlerGreets: { text: '"There you are, friend! Welcome!"', warn: false, kind: 'speech' }, // at home, the hero first within 2 tiles (D-496), drafted for the playtest
  peddlerHome: { texts: ['"You dug me out. I won\'t forget it."', '"Home at last. My legs still shake."'], warn: false, kind: 'speech' }, // at home in the woods (D-492), drafted for the playtest; "I'll have wares soon" dropped, as he sells at home (D-684)
  rubbleDig: { text: 'You pull rocks off the heap.', warn: false }, // rubble with no one behind it, the first bump (D-491), drafted
  rubbleShift: { text: 'The heap shifts.', warn: false }, // the second
  rubbleClear: { text: 'The rubble falls away.', warn: false }, // the third: cleared, nothing taken
  bedLook: { texts: ['A bed, folded small.', 'Set it down on the surface.', 'Sleep in it at night.'], warn: false },
  gardenBedLook: { texts: ['A box of soft soil.', 'Set it down on the surface.', 'Seeds grow in it.'], warn: false }, // (D-565)
  shelfLook: { texts: ['A wooden shelf, in pieces.', 'Set it down on the surface.', 'Relics rest on it.'], warn: false }, // (D-690), drafted for the playtest
  mortarLook: { texts: ['A stone bowl and a wooden pestle.', 'Set it down on the surface.', 'Grind finds into draughts.'], warn: false }, // (D-786)
  sleep: { text: 'You sleep and wake rested.', warn: false }, // the bed at night (D-488)
  notTired: { text: "You aren't tired.", warn: false }, // the bed by day, free
  sleepOut: { text: 'You wake on the cold ground, stiff.', warn: false }, // the moon button outside, no bed (D-758), stiff (D-759)
  bedrollSet: { text: 'You lay out the fur bedroll.', warn: false }, // a turn (D-804)
  bedrollTake: { text: 'You roll up the fur bedroll.', warn: false }, // Yes on Roll up the bedroll?, a turn (D-804)
  sleepChased: { text: 'Not with a creature after you.', warn: false }, // SLEEP or the bedroll with one after the hero, free (D-804)
  sleepUnder: { text: 'Only under the sky.', warn: false }, // SLEEP below ground, free (D-804)
  sleepOutRoll: { text: 'You wake warm in your fur bedroll.', warn: false }, // sleeping out with the Fur Bedroll in the bag: 2 hearts, not stiff (D-803)
  stiffMiss: { text: 'Your stiff arm swings wide.', warn: false }, // a hit missed while stiff (D-759)
  stiffEnds: { text: 'The stiffness wears off.', warn: false }, // (D-759)
  stiffHeld: { text: 'Stiff: 1 hit in 3 misses, {n} turns left.', warn: false }, // a tap on its mark (D-759)
  bagFull: { text: 'Your bag is full.', warn: false }, // Deconstruct with every slot taken, free; or a stack out of a chest (D-331), or the bag where you fell (D-345)
  setDown: { text: 'You set it down.', warn: false }, // Drop in the bag, free (D-546)
  bagBack: { text: 'You take back your bag.', warn: false }, // all of the bag where you fell, back in (MO3, D-345)
  stashFull: { text: 'The chest is full.', warn: false }, // a stack that can't all go into the stash chest, free (D-331)
  storeOne: { text: 'You store 1 stack.', warn: false }, // Store on the chest's card, free (D-556)
  storeSome: { text: 'You store {n} stacks.', warn: false }, // the same, {n} bag stacks moved (D-555)
  storeOneFull: { text: 'You store 1 stack. The chest is full.', warn: false }, // the same, some left in the bag (D-556)
  storeSomeFull: { text: 'You store {n} stacks. The chest is full.', warn: false },
  storeOneFulls: { text: 'You store 1 stack. Chests full.', warn: false }, // the bag's Store, more than one chest in reach (D-558)
  storeSomeFulls: { text: 'You store {n} stacks. Chests full.', warn: false }, // short, to fit the strip (D-558)
  chestsFull: { text: 'The chests are full.', warn: false }, // the same, nothing fitting anywhere (D-558)
  storeNone: { text: 'Nothing to store.', warn: false }, // Store with no bag stack the chest holds (D-555)
  sortDone: { text: 'You sort the bag.', warn: false }, // the bag's SORT, free (D-559)
  sortNone: { text: 'The bag is in order.', warn: false }, // the same, nothing to change
  notSurface: { text: 'Only on the surface.', warn: false }, // Set down under a roof, free
  torchMake: { text: 'You make a torch.', warn: false }, // 1 moth dust, 1 wood (D-478)
  bagTorchLook: { texts: ['A torch. Set it down to light the way.', 'Moth dust packed round a stick.', 'It burns for a while, then goes out.'], warn: false },
  bagTorchFull: { text: "You can't carry more torches.", warn: false },
  torchSet: { text: 'You set down the torch.', warn: false }, // a turn (D-478)
  torchOut: { text: 'Your torch burns out.', warn: false }, // in sight, 100 turns after (D-478)
  glowLampMake: { text: 'You make a glow lamp.', warn: false }, // 1 glow gland, 1 wood (D-808)
  glowLampLook: { texts: ['A glow lamp. Set it down for light.', 'A glow gland on a stick, glowing green.', 'It glows a long while, then goes dark.'], warn: false },
  glowLampFull: { text: "You can't carry more glow lamps.", warn: false },
  glowLampSet: { text: 'You set down the glow lamp.', warn: false }, // a turn (D-808)
  glowLampOut: { text: 'Your glow lamp goes dark.', warn: false }, // in sight, 300 turns after (D-808)
  noRoom: { text: 'There is no room there.', warn: false }, // Set down toward a side it can't go on, free
  woodLook: { texts: ['Three make a workbench.', 'It snaps if you bend it.', 'Good for building.'], warn: false },
  newRow: { text: 'Growth has a new row.', warn: false }, // the first time a row of the Growth tree opens (D-815, D-816)
  levelUp: { text: 'You feel stronger. Level {n}.', warn: false }, // {n}, the new level (D-246)
  unsaved: { text: 'Your journey could not be saved.', warn: true }, // a save failed: storage full or blocked; once, until one is kept again (D-428)
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
  locketKept: { text: 'The locket kept {n}.', warn: false }, // a Normal fall, the locket on the shelf (D-694)
  wardenWakes: { text: "The warden's eye lights up!", warn: false }, // (D-692), Claude's drafts the owner may change
  wardenHurt: { text: 'The warden cracks.', warn: false },
  wardenSettles: { text: 'The warden stands still again.', warn: false },
  wardenDie: { text: 'The warden crumbles and falls still.', warn: false },
  wardenBite: { text: 'The warden strikes you.', warn: false, kind: 'harm' },
  campfireHigh: { text: 'A campfire, burning high.', warn: false }, // said as a blazing fire's card opens, its note the rest (D-757, D-844)
  campfireCoals: { text: 'The coals still glow.', warn: false }, // the embers' the same way
  campfireSat: { text: 'You sit by the fire and warm up.', warn: false }, // Yes on Sit by the fire? (D-844), Claude's draft the owner may change
  campfireAshes: { text: 'Cold ashes.', warn: false }, // said as cold ashes' card opens, its note the rest (D-757)
  campfireFed: { text: 'You add wood. The fire burns high.', warn: false }, // Add wood on embers (Q-088, feeding), Claude's draft the owner may change
  campfireLit: { text: 'The fire catches.', warn: false }, // Claude's draft the owner may change
  lamppost: { texts: ['An old lamppost.', 'Its lamp went out long ago.'], warn: false }, // the dead lamppost bumped, a sentence a bump (D-769)
  minersCamp: { text: "A miners' camp, long left.", warn: false }, // the camp bumped: on its card's opening, and bare, alone (D-770)
  campPickTaken: { text: 'You take the old pick.', warn: false }, // Claude's draft the owner may change (D-770)
  glowDraughtMake: { text: 'You make a Glow Draught.', warn: false }, // MORTAR's card, a turn (D-786)
  glowDraughtShort: { text: 'You need 2 Duskstar and 1 Wisp Glass.', warn: false }, // too few, free
  glowDraughtFull: { text: "You can't carry more Glow Draughts.", warn: false }, // every stack full, no slot free
  glowDraughtDrink: { texts: ['You drink the Glow Draught.', 'Warmth runs into the lantern.', 'The light reaches farther.'], warn: false }, // drunk from the bag, any time (D-791)
  glowDraughtLook: { texts: ['A gold draught that glows.', 'Drink it: the light reaches farther.', 'Made at the mortar.'], warn: false },
  glowEnds: { text: 'The glow fades.', warn: false }, // its turns run out (D-791)
  glowHeld: { text: 'Glow Draught: {n} turns left.', warn: false }, // a tap on its mark (D-791)
  slowburnMake: { text: 'You make a Slowburn.', warn: false }, // MORTAR's card, a turn (D-792)
  slowburnShort: { text: 'You need 2 Tick Shell and 1 Oilcap.', warn: false }, // too few, free
  slowburnFull: { text: "You can't carry more Slowburns.", warn: false }, // every stack full, no slot free
  slowburnDrink: { texts: ['You drink the Slowburn.', 'The flame settles low and steady.', 'The lantern drinks slower.'], warn: false }, // drunk from the bag, any time (D-792)
  slowburnLook: { texts: ['A dark draught, thick as oil.', 'Drink it: the lantern burns slower.', 'Made at the mortar.'], warn: false },
  slowEnds: { text: 'The flame burns hungry again.', warn: false }, // its turns run out (D-792)
  slowHeld: { text: 'Slowburn: {n} turns left.', warn: false }, // a tap on its mark (D-792)
  warmEnds: { text: "The fire's warmth fades.", warn: false }, // Warmed's turns run out (D-845), Claude's draft the owner may change
  warmHeld: { text: 'Warmed: oil lasts longer, {n} turns left.', warn: false }, // a tap on its mark (D-845)
  mendingMake: { text: 'You make a Mending Draught.', warn: false }, // MORTAR's card, a turn (D-794)
  mendingShort: { text: 'You need 2 Mimic Leaf and 1 Herb.', warn: false }, // too few, free
  mendingFull: { text: "You can't carry more Mending Draughts.", warn: false }, // every stack full, no slot free
  mendingDrink: { texts: ['You drink the Mending Draught.', 'It tastes green and bitter.', 'A slow warmth settles in.'], warn: false }, // drunk from the bag, any time (D-794)
  mendingLook: { texts: ['A green draught, bitter as leaves.', 'Drink it: it mends you slowly.', 'Made at the mortar.'], warn: false },
  mendEnds: { text: 'The warmth fades.', warn: false }, // its turns run out (D-794)
  mendHeld: { text: 'Mending Draught: {n} turns left.', warn: false }, // a tap on its mark (D-794)
  wardMake: { text: 'You make a Ward Draught.', warn: false }, // MORTAR's card, a turn (D-795)
  wardShort: { text: 'You need 2 Centipede Leg and 1 Herb.', warn: false }, // too few, free
  wardFull: { text: "You can't carry more Ward Draughts.", warn: false }, // every stack full, no slot free
  wardDrink: { texts: ['You drink the Ward Draught.', 'It tastes clean and cold.', 'Your blood runs clear.'], warn: false }, // drunk from the bag, any time (D-795)
  wardLook: { texts: ['A pale draught, clear as frost.', 'Drink it: no poison takes you.', 'Made at the mortar.'], warn: false },
  wardEnds: { text: 'The ward wears off.', warn: false }, // its turns run out (D-795)
  wardHeld: { text: 'Ward Draught: {n} turns left.', warn: false }, // a tap on its mark (D-795)
  spitproofMake: { text: 'You make a Spitproof Draught.', warn: false }, // MORTAR's card, a turn (D-802)
  spitproofShort: { text: 'You need 2 Grub Skin and 1 Herb.', warn: false }, // too few, free
  spitproofFull: { text: "You can't carry more Spitproofs.", warn: false }, // every stack full, no slot free
  spitproofDrink: { texts: ['You drink the Spitproof Draught.', 'It tastes of wax and dust.', 'Your skin feels slick.'], warn: false }, // drunk from the bag, any time (D-802)
  spitproofLook: { texts: ['A rose-pink draught, thick as wax.', "Drink it: a grub's spit slides off.", 'Made at the mortar.'], warn: false },
  spitproofSplash: { text: 'The glob splashes off you.', warn: false }, // a glob reaches the hero while it works (D-802)
  spitproofEnds: { text: 'Your skin feels dry again.', warn: false }, // its turns run out (D-802)
  spitproofHeld: { text: 'Spitproof Draught: {n} turns left.', warn: false }, // a tap on its mark (D-802)
  shadeMake: { text: 'You make a Shade Draught.', warn: false }, // MORTAR's card, a turn (D-806)
  shadeShort: { text: 'Need 2 Lurker Claw, 1 Duskstar.', warn: false }, // too few, free
  shadeFull: { text: "You can't carry more Shade Draughts.", warn: false }, // every stack full, no slot free
  shadeDrink: { texts: ['You drink the Shade Draught.', 'It tastes of cold stone.', 'The dark folds round you.'], warn: false }, // drunk from the bag, any time (D-806)
  shadeLook: { texts: ['A dusky violet draught, still as night.', 'Drink it: creatures see you only near.', 'Made at the mortar.'], warn: false },
  shadeEnds: { text: 'The shade lifts from you.', warn: false }, // its turns run out (D-806)
  shadeHeld: { text: 'Shade Draught: {n} turns left.', warn: false }, // a tap on its mark (D-806)
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
    if (!filled.has(state.line)) filled.set(state.line, { ...entry, texts: undefined, text: entry.texts[(state.line.i ?? 0) % entry.texts.length] }); // a saved line past a list's end, as after D-684, wraps round
    return filled.get(state.line);
  }
  if (state.line.n === undefined) return entry;
  if (!filled.has(state.line)) filled.set(state.line, { ...entry, text: entry.text.replace('{n}', state.line.n) });
  return filled.get(state.line);
}

// § heard: as a screen opens, the line already showing counts as heard, so the
// card's own words aren't spoken over a frame later; a line said on the card is
// still spoken, and back in play the line showing is spoken again (D-670)
export const heardAs = (screen, state) => (screen === 'play' || !state ? null : shownLine(state));

// § oil: a line only as the oil crosses a mark on the way down, so each is
// said once, and again only after the oil has gone back above it (D-096).
export function oilLine(before, after) {
  if (before > 0 && after === 0) return 'oilEmpty';
  if (before >= OIL_LOW && after < OIL_LOW) return 'oilLow';
  return null;
}
