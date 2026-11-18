// § lines-home: the lines of home's stations, the Peddler, sleep, the bag and the stash, torches and campfires, moved word for word
// from lines.js (H-99). Plain data, no drawing; lines.js gathers them into LINES.
export const HOME_LINES = {
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
  stashHolds: { text: 'The chest already holds {n}.', warn: false }, // a second one-of-a-kind piece, the chest with room, {n} the piece, "a workbench" (H-67, D-865)
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
  bagCampfireMake: { text: 'You make a campfire.', warn: false }, // MAKE on the bag's Make tab, 3 stone, 2 wood, a turn (D-850, D-851)
  bagCampfireLook: { texts: ['Stones and wood for a campfire.', 'Set it down on the surface.', 'Light it with a little oil.'], warn: false }, // (D-851)
  bagCampfireFull: { text: 'You already carry a campfire.', warn: false }, // only 1 is carried, free (D-851)
  bagCampfireSet: { text: 'You lay the stones in a ring.', warn: false }, // a turn, cold ashes (D-850, D-851)
  ownCampfireTake: { text: 'You take up the stones.', warn: false }, // Take up on your own cold ashes, a turn, back in the bag whole (D-853)
  noRoom: { text: 'There is no room there.', warn: false }, // Set down toward a side it can't go on, free
  woodLook: { texts: ['Three make a workbench.', 'It snaps if you bend it.', 'Good for building.'], warn: false },
  newRow: { text: 'Growth has a new row.', warn: false }, // the first time a row of the Growth tree opens (D-815, D-816)
};
