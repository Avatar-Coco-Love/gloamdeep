// § history 0.2: stage 0.2 (D-159), in the world of 0.3 (D-168, D-237). Newest first. Each line is the change's
// line in CHANGELOG.md or its archive, word for word, without backticks (D-254);
// tests/history.test.js checks every one. Plain data. New versions go at the top here; older ones are in
// history-0.2-3.js (0.2.121 to 0.2.186), split at the sixth audit (D-493), and history-0.2-2.js
// (0.2.60 to 0.2.119) and history-0.2-1.js (0.2.0 to 0.2.59), split at the third audit (D-337).
export const HISTORY_02 = [
  { v: '0.2.207', date: '2026-10-30', title: 'The sixth audit', lines: [
    "Nothing in the game changes. The sixth audit: the Version history's 0.2.121 to 0.2.186 move word for word from history-0.2.js into their own file, history-0.2-3.js.",
    "Docs: CHANGELOG.md keeps its newest 3 entries, the rest moved to archive/CHANGELOG-STAGE-0.2-1.md; finished decisions D-491 and D-492 moved to the archive; the build plan's ticked steps 9 to 12 moved to archive/PROGRESS-LOG.md. The next audit is at 0.2.227.",
    "Decisions: D-493.",
  ] },
  { v: '0.2.206', date: '2026-10-30', title: 'He stands at home', lines: [
    "Free the peddler and he goes straight home: he stands in the woods on the surface, on the open tile nearest their middle, and turns to face you.",
    "Bump him there and he speaks, his home lines taking turns. No turn passes.",
    "Nothing you set down, and nothing that grows back, goes on his tile. Rescuing the first person is done; the audit comes next.",
    "Decisions: D-492.",
  ] },
  { v: '0.2.205', date: '2026-10-30', title: 'The rescue', lines: [
    "Dig the rubble around the trapped peddler on depth 3 to free him. Each heap takes 3 bumps, a turn each, and no tool; he calls out as you dig, his lines taking turns.",
    "Clear any one heap and he is free: he thanks you and is gone from the room, heading home. The rest of the rubble stays, and you can still dig it.",
    "Cleared rubble gives no stone and never comes back. Rubble with no one behind it is dug the same, with its own lines.",
    "Decisions: D-491.",
  ] },
  { v: '0.2.204', date: '2026-10-30', title: 'The trapped peddler', lines: [
    "In one room of depth 3, the seed picks which, a peddler is trapped in a ring of rubble: tall heaps of fallen rock fill every open tile around him. The rubble is solid, but your light passes over it, so you can see him through it.",
    "Bump the rubble around him and he calls out to you, his lines taking turns. No turn passes. Rubble with no one behind it is only a heap of fallen rock.",
    "He stands side-on with a big canvas pack on his back, and turns to face whichever side you are on. Freeing him comes next.",
    "Behind the scenes, people are now their own kind, and each room keeps its people as it keeps its creatures. Your save is updated by itself; a room you have already seen stays as it was, so he waits only in a room not yet seen.",
    "Decisions: D-489, D-490.",
  ] },
  { v: '0.2.203', date: '2026-10-30', title: 'The bed', lines: [
    "Make a Bed at the workbench, the first home piece: bump the bench and choose its seventh slot. It costs 4 Wood and 2 Rat Tail, and Make is dim with too few. You carry one at a time.",
    "Choose it in the bag and press Set down to put it beside you on the surface, as the stash chest goes.",
    "From dusk until morning, bump the bed to sleep: you sleep until the next morning, and the lantern burns nothing while you sleep. You wake healed to full and rested, with one gold heart after your red ones. A bite takes the gold heart first, and a fall loses it.",
    "By day, bumping the bed asks \"Deconstruct bed?\" with \"You aren't tired.\" Yes takes it back into the bag; No, picked first, leaves it.",
    "How to play's Bench page now says to bump the bed at night to sleep.",
    "Decisions: D-488.",
  ] },
  { v: '0.2.202', date: '2026-10-30', title: 'The heart charm', lines: [
    "Make a Heart Charm at the workbench, the second charm: bump the bench and choose its sixth slot. It costs 1 Mimic Heart and 1 Copper Ore, and Make is dim with too few. You have one at a time.",
    "Choose it in the bag and press Wear: you put it on, and no turn passes. You can wear both charms and the vest together.",
    "While you wear it, the lantern burns oil more slowly: a full tank lasts about 70 turns instead of 60, or about 87 with the Copper Wick.",
    "Behind the scenes, each worn slot now holds a list and says how many pieces it takes, so more slots can come later without breaking saves. Your save is updated by itself, and anything you wear stays on.",
    "How to play's Bench page now says you can wear two charms.",
    "Decisions: D-487.",
  ] },
  { v: '0.2.201', date: '2026-10-30', title: 'Tap to set down', lines: [
    "Tapping a marked tile now sets down the workbench, the stash chest or a torch, as it should. On phones the tap was read in the wrong place, missed the tile, and left the thing in the bag; swiping still worked.",
    "Decisions: none (it was meant to work this way, D-322).",
  ] },
  { v: '0.2.200', date: '2026-10-30', title: 'The wisp charm', lines: [
    "Make a Wisp Charm at the workbench, the first charm: bump the bench and choose its fifth slot. It costs 3 Gloam Wisp and 1 Copper Ore, and Make is dim with too few. You have one at a time.",
    "Choose the charm in the bag and press Wear: you put it on, and no turn passes. You can wear it and the vest together.",
    "While you wear it, beaten creatures leave their rare material about 1 in 5 instead of 1 in 10: the Venom Sac, the Mimic Heart and the Gloam Eye. Common drops stay about 1 in 2.",
    "How to play's Bench page has a new row for the charm.",
    "Decisions: D-486.",
  ] },
  { v: '0.2.199', date: '2026-10-30', title: 'The rat hide vest', lines: [
    "The workbench card has room for more: its grid is now 4 × 3, 12 slots, like the stash chest's.",
    "Make a Rat Hide Vest at the workbench, the first armour: bump the bench and choose its fourth slot. It costs 4 Rat Tail and 1 Wood, and Make is dim with too few. You have one at a time.",
    "Choose the vest in the bag and press Wear: you put it on, and no turn passes.",
    "While you wear it, each bite has a 1 in 4 chance to glance off and hurt nothing: \"The bite glances off your vest.\"",
    "How to play's Crafting page is now two tabs, Bag and Bench, with new rows for the Copper Wick and the vest.",
    "Decisions: D-484 and D-485.",
  ] },
  { v: '0.2.198', date: '2026-10-30', title: 'The copper wick', lines: [
    "Make a Copper Wick at the workbench, the first lantern part: bump the bench and choose its third slot. It costs 3 Copper Ore and 1 Wood, and Make is dim with too few. You have one at a time.",
    "Choose the wick in the bag and press Fit: it goes into the lantern, and no turn passes.",
    "With the wick fitted, the lantern burns oil a quarter slower: a full tank lasts 75 turns instead of 60, and each flask lasts longer too. How far the light reaches still depends only on the oil.",
    "Decisions: D-483.",
  ] },
  { v: '0.2.197', date: '2026-10-30', title: 'The rest of the order', lines: [
    "A look at where things stand: steps 1 to 8 of the build order are done, and all 685 tests pass.",
    "Lantern parts come next, the first to use Copper Ore. The rest follow in the order proposed in the plan: armour and charms, home pieces and rest, the first rescue, the vendor and coins, the garden, fishing, lore, relics, feats.",
    "Half and Automatic light keep waiting. Nothing in the game changed.",
    "Decisions: D-482.",
  ] },
  { v: '0.2.196', date: '2026-10-30', title: 'The Growth tree', lines: [
    "The Journal's Growth tab is now a tree: an ember glows at its root, and three limbs climb from it, Light, Body and Hands. Each branch has a row of places, the first at the bottom.",
    "Today's hearts are Body's first upgrade, with a row of small hearts for those bought. Light and Hands show dim places still to come, and a dim locked row above opens deeper down.",
    "The arrows or a tap pick a place, outlined in gold. On the right it says your embers, the place's name and what it does, with its button and cost: ADD A HEART on the heart. Left past Light turns back to Records.",
    "Embers buy any open upgrade, in any order; nothing you buy closes another.",
    "Decisions: D-481.",
  ] },
  { v: '0.2.195', date: '2026-10-30', title: 'The pick and copper', lines: [
    "Make a Stone Pick at the workbench: bump it and choose the new slot beside the stash chest. It costs 2 Wood and 3 Stone, and Make is dim with too few. You carry one at a time.",
    "Copper veins, grey boulders flecked with copper, are the first ore. From depth 3, one of the three boulders in each Cave room is a vein. Without the pick in your bag, bumping one says it is too hard to break by hand, and no turn passes.",
    "With the pick in your bag, 4 bumps break a vein, a turn each, and give 1 Copper Ore. Ore stacks 20 to a slot and is for crafting later. A broken vein grows back after 1800 turns, twice as slow as stone.",
    "The Crafting page of How to play has a row for the pick.",
    "Decisions: D-480.",
  ] },
  { v: '0.2.194', date: '2026-10-30', title: 'The spear', lines: [
    "A second weapon, the spear, lies in the first room of depth 3. Walking into a creature with it hits that creature for 2 and the one behind it, in a straight line, for 1. Both flash.",
    "Found while you hold a weapon, a weapon now goes into your bag instead of staying on the floor. If the bag is full, it stays there.",
    "Choose a weapon in the bag and press Hold: it goes into your hand and the one you held takes its slot. It takes a turn.",
    "Decisions: D-479.",
  ] },
  { v: '0.2.193', date: '2026-10-30', title: 'Torches', lines: [
    "Torches: in the bag, choose Moth Dust and press Make, and 1 Moth Dust with 1 Wood makes a torch. Without Wood the Make button is dim. Torches stack 5 to a slot.",
    "Choose a torch in the bag and press Set down, then pick a side: it stands on that floor tile, in the depths too, on a stick in a ring of stones, and lights 3 tiles around like a wall torch. It blocks the way, and lampmoths come to it.",
    "A torch burns 100 turns, even while you are away, then goes out and leaves bare floor. It can't be picked back up.",
    "The Crafting page of How to play has a row for it.",
    "Decisions: D-478.",
  ] },
  { v: '0.2.192', date: '2026-10-30', title: 'The glass flask', lines: [
    "Mimic Glass is the first creature find you can craft with: choose it in the bag and press Make, and 1 Mimic Glass with 2 Oilcaps makes an oil flask. 3 Oilcaps alone still make one too.",
    "Without 2 Oilcaps the Make button is dim. Choosing Mimic Glass now says what it makes.",
    "The Crafting page of How to play has a row for it.",
    "Decisions: D-477.",
  ] },
  { v: '0.2.191', date: '2026-10-30', title: 'The rare drops', lines: [
    "A beaten scorpion, flask mimic or gloamling now and then leaves a rare find as well, about 1 time in 10: a Venom Sac, a Mimic Heart or a Gloam Eye. It has a chance of its own, so a creature can leave both; then the rare one lies on the tile beside.",
    "A Venom Sac is a plump bulb of green venom. A Mimic Heart is a heart of amber oil with a glassy gleam. A Gloam Eye is a round pale eye with a pink iris.",
    "Each goes in your bag in stacks of 20, with a line, and says a line when chosen there; they are for crafting later. With every stack full they stay on the floor.",
    "Decisions: D-476.",
  ] },
  { v: '0.2.190', date: '2026-10-30', title: 'Four more drops', lines: [
    "A beaten lampmoth, scorpion, flask mimic or gloamling now leaves its own material where it fell, about 1 time in 2, as a rat leaves its tail: Moth Dust, a Stinger, Mimic Glass or a Gloam Wisp.",
    "Moth Dust is a small heap of pale dust with amber glints. A Stinger is a scorpion's curled tail tip, always in the sand colours. Mimic Glass is a curved shard with a smear of oil. A Gloam Wisp is a tuft of shadow shaped like a small flame.",
    "Each goes in your bag in stacks of 20, with a line, and says a line when chosen there; they are for crafting later. With every stack full they stay on the floor.",
    "Decisions: D-475.",
  ] },
  { v: '0.2.189', date: '2026-10-30', title: 'The Rat Tail', lines: [
    "A beaten rat now leaves a Rat Tail where it fell, about 1 time in 2. Step on it to put it in your bag, in stacks of 20, with a line.",
    "A Rat Tail is curled into a loop, the rat's pink with a grey stub. Choosing it in the bag says a line about it; it is for crafting later.",
    "With every stack full it stays on the floor until you come back for it. It never grows back.",
    "Decisions: D-474.",
  ] },
  { v: '0.2.188', date: '2026-10-30', title: 'The build order', lines: [
    "The scope's build order is set: creature drops come first, so today's five creatures leave materials to take home.",
    "The first 8 steps: a rat's Rat Tail, the other common drops, the rare drops, a first recipe using one, torches to make and set down, a second weapon kind, a pick and the first ore, and the Growth tree.",
    "Nothing in the game changes yet.",
    "Decisions: D-473.",
  ] },
  { v: '0.2.187', date: '2026-10-30', title: 'The scope, part 8', lines: [
    "The scope's part 8, home and trade, is settled. Home grows by the pieces you build there, and sleeping at home gives a short boost for the next trip.",
    "Most people will be rescued below and move home; later some stay where you meet them, and wanderers such as a merchant visit.",
    "The first vendor will be a rescued person at home, buying creature materials and spare finds. Trade coins come only from selling, and are kept when you fall.",
    "Nothing in the game changes yet. The whole scope is now settled.",
    "Decisions: D-469 to D-472.",
  ] },
];
