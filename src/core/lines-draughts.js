// § lines-draughts: the lines of draughts, the ember and the vault's plinth, moved word for word
// from lines.js (H-99). Plain data, no drawing; lines.js gathers them into LINES.
export const DRAUGHT_LINES = {
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
  mendingShort: { text: 'Need 2 Mimic Leaf, 1 Healing Herb.', warn: false }, // too few, free
  mendingFull: { text: "You can't carry more Mending Draughts.", warn: false }, // every stack full, no slot free
  mendingDrink: { texts: ['You drink the Mending Draught.', 'It tastes green and bitter.', 'A slow warmth settles in.'], warn: false }, // drunk from the bag, any time (D-794)
  mendingLook: { texts: ['A green draught, bitter as leaves.', 'Drink it: it mends you slowly.', 'Made at the mortar.'], warn: false },
  mendEnds: { text: 'The warmth fades.', warn: false }, // its turns run out (D-794)
  mendHeld: { text: 'Mending Draught: {n} turns left.', warn: false }, // a tap on its mark (D-794)
  wardMake: { text: 'You make a Ward Draught.', warn: false }, // MORTAR's card, a turn (D-795)
  wardShort: { text: 'Need 2 Centipede Leg, 1 Healing Herb.', warn: false }, // too few, free
  wardFull: { text: "You can't carry more Ward Draughts.", warn: false }, // every stack full, no slot free
  wardDrink: { texts: ['You drink the Ward Draught.', 'It tastes clean and cold.', 'Your blood runs clear.'], warn: false }, // drunk from the bag, any time (D-795)
  wardLook: { texts: ['A pale draught, clear as frost.', 'Drink it: no poison takes you.', 'Made at the mortar.'], warn: false },
  wardEnds: { text: 'The ward wears off.', warn: false }, // its turns run out (D-795)
  wardHeld: { text: 'Ward Draught: {n} turns left.', warn: false }, // a tap on its mark (D-795)
  spitproofMake: { text: 'You make a Spitproof Draught.', warn: false }, // MORTAR's card, a turn (D-802)
  spitproofShort: { text: 'Need 2 Grub Skin, 1 Healing Herb.', warn: false }, // too few, free
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
  emberTake: { text: 'An ember! Spend it in Growth.', warn: false }, // a vault's ember taken (D-896)
  emberLook: { texts: ['An ember, still warm.', 'It glows in your palm.'], warn: false }, // (D-896)
  plinthBare: { texts: ['A bare stone plinth.', 'Something rested here once.'], warn: false }, // the vault's plinth, its prize taken, a sentence a bump (D-896)
  // § the Homestone (D-1015), Claude's drafts
  homestoneMake: { text: 'You make a Homestone.', warn: false }, // the workbench's GEAR tab, a turn
  homestoneShort: { text: 'You need 5 Duskstar and 5 Stone.', warn: false }, // too few, free
  homestoneFull: { text: "You can't carry more Homestones.", warn: false }, // 3 carried, free
  homestoneUse: { text: 'The Homestone carries you home.', warn: false }, // USE in the bag: on the home plate
  homestoneHere: { text: 'You are home already.', warn: false }, // in the home waystone's room, free, kept
  homestoneAsleep: { text: 'The home waystone sleeps.', warn: false }, // its stone not woken, free, kept
  homestoneLook: { texts: ['A chip of waystone.', 'Use it: back to the home waystone.', 'Only one way: home.'], warn: false },
};
