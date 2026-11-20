// § lines-finds: the lines of finds, the things made from them, fishing, charms, wood and trees, moved word for word
// from lines.js (H-99). Plain data, no drawing; lines.js gathers them into LINES.
export const FIND_LINES = {
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
  glowcupTake: { texts: ['You pick a glowcup.', 'A teal flower. You keep it.', 'You pick the little cup of petals.'], warn: false }, // the second flower (D-1007)
  glowcupLook: { texts: ['A glowcup, for crafting later.', 'A teal cup, a pale green heart.', 'A small flower from the dark floors.'], warn: false },
  glowcupFull: { text: "You can't carry more glowcups.", warn: false },
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
  shovelMake: { text: 'You make a shovel.', warn: false }, // its line on the bench's BUILD tab, a turn (D-926)
  shovelFull: { text: 'You already carry a shovel.', warn: false }, // only 1 is carried, free
  shovelShort: { text: 'Need 3 Wood, 2 Stone.', warn: false }, // too few, free
  shovelLook: { texts: ['A shovel. It digs out stumps.', 'Hold it to use it.', 'A flat stone, lashed to a stick.'], warn: false },
  shovelHold: { text: 'You hold the shovel.', warn: false }, // Hold in the bag, into the Tool slot, a turn
  shovelAway: { text: 'You put the shovel away.', warn: false }, // Take off, into the bag, free
  stumpDug: { texts: ['You dig out the stump.', 'The stump comes up, roots and all.', 'Only grass is left.'], warn: false }, // a stump dug out, a turn (D-926)
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
  tankMake: { text: 'You make a bladder tank.', warn: false }, // its line on the bench panel, a turn (D-1005)
  bladderTankFull: { text: 'You already have a bladder tank.', warn: false }, // carried or fitted, free
  tankShort: { text: 'Need 2 Oil Bladder, 2 Copper Ore.', warn: false }, // too few, free
  bladderTankLook: { texts: ['A bladder tank. Fit it to hold more oil.', 'Two oil bladders, bound in copper.', 'It holds a quarter more oil.'], warn: false },
  tankFit: { text: 'You fit the bladder tank.', warn: false }, // Fit in the bag, free (D-1005)
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
  woodFull: { text: "You can't carry more wood.", warn: false }, // every stack full, no slot free (H-02, D-864)
  woodTake: { texts: ['You pick up a stick.', 'A dry branch. You keep it.', 'You gather some wood.'], warn: false }, // (W1, D-314)
  branchCreak: { text: 'The branch creaks.', warn: false }, // the first bump (W2, D-316)
  branchTake: { texts: ['The branch snaps. You take wood.', 'It breaks apart. Wood for the bag.', 'Crack. You gather the wood.'], warn: false }, // the second
  woodFull: { text: "You can't carry more wood.", warn: false }, // the second bump, every stack full: the branch holds
  treeHack: { text: 'You hack at the tree.', warn: false }, // bumps 1 to 3 (W3, D-317)
  treeChips: { text: 'Chips fly from the trunk.', warn: false },
  treeGroan: { text: 'The tree groans.', warn: false },
  treeTake: { texts: ['The tree falls. You take wood.', 'It crashes down. Wood for the bag.', 'Timber! You gather the wood.'], warn: false }, // the fourth
  treeEdge: { texts: ['The forest will not yield.', 'These trees are too old to fell.'], warn: false }, // an edge tree bumped, free (D-321)
};
