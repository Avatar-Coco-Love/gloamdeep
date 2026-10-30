# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump. The same lines go, word for word, into the in-game Version
history, `src/core/history-0.2.js` (D-254).

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- Later minor versions (`0.3`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.2.200 (2026-10-30)
- Make a Wisp Charm at the workbench, the first charm: bump the bench and choose its fifth slot. It costs 3 Gloam Wisp and 1 Copper Ore, and Make is dim with too few. You have one at a time.
- Choose the charm in the bag and press Wear: you put it on, and no turn passes. You can wear it and the vest together.
- While you wear it, beaten creatures leave their rare material about 1 in 5 instead of 1 in 10: the Venom Sac, the Mimic Heart and the Gloam Eye. Common drops stay about 1 in 2.
- How to play's Bench page has a new row for the charm.
- Decisions: D-486.

## 0.2.199 (2026-10-30)
- The workbench card has room for more: its grid is now 4 × 3, 12 slots, like the stash chest's.
- Make a Rat Hide Vest at the workbench, the first armour: bump the bench and choose its fourth slot. It costs 4 Rat Tail and 1 Wood, and Make is dim with too few. You have one at a time.
- Choose the vest in the bag and press Wear: you put it on, and no turn passes.
- While you wear it, each bite has a 1 in 4 chance to glance off and hurt nothing: "The bite glances off your vest."
- How to play's Crafting page is now two tabs, Bag and Bench, with new rows for the Copper Wick and the vest.
- Decisions: D-484 and D-485.

## 0.2.198 (2026-10-30)
- Make a Copper Wick at the workbench, the first lantern part: bump the bench and choose its third slot. It costs 3 Copper Ore and 1 Wood, and Make is dim with too few. You have one at a time.
- Choose the wick in the bag and press Fit: it goes into the lantern, and no turn passes.
- With the wick fitted, the lantern burns oil a quarter slower: a full tank lasts 75 turns instead of 60, and each flask lasts longer too. How far the light reaches still depends only on the oil.
- Decisions: D-483.

## 0.2.197 (2026-10-30)
- A look at where things stand: steps 1 to 8 of the build order are done, and all 685 tests pass.
- Lantern parts come next, the first to use Copper Ore. The rest follow in the order proposed in the plan: armour and charms, home pieces and rest, the first rescue, the vendor and coins, the garden, fishing, lore, relics, feats.
- Half and Automatic light keep waiting. Nothing in the game changed.
- Decisions: D-482.

## 0.2.196 (2026-10-30)
- The Journal's Growth tab is now a tree: an ember glows at its root, and three limbs climb from it, Light, Body and Hands. Each branch has a row of places, the first at the bottom.
- Today's hearts are Body's first upgrade, with a row of small hearts for those bought. Light and Hands show dim places still to come, and a dim locked row above opens deeper down.
- The arrows or a tap pick a place, outlined in gold. On the right it says your embers, the place's name and what it does, with its button and cost: ADD A HEART on the heart. Left past Light turns back to Records.
- Embers buy any open upgrade, in any order; nothing you buy closes another.
- Decisions: D-481.

## 0.2.195 (2026-10-30)
- Make a Stone Pick at the workbench: bump it and choose the new slot beside the stash chest. It costs 2 Wood and 3 Stone, and Make is dim with too few. You carry one at a time.
- Copper veins, grey boulders flecked with copper, are the first ore. From depth 3, one of the three boulders in each Cave room is a vein. Without the pick in your bag, bumping one says it is too hard to break by hand, and no turn passes.
- With the pick in your bag, 4 bumps break a vein, a turn each, and give 1 Copper Ore. Ore stacks 20 to a slot and is for crafting later. A broken vein grows back after 1800 turns, twice as slow as stone.
- The Crafting page of How to play has a row for the pick.
- Decisions: D-480.

## 0.2.194 (2026-10-30)
- A second weapon, the spear, lies in the first room of depth 3. Walking into a creature with it hits that creature for 2 and the one behind it, in a straight line, for 1. Both flash.
- Found while you hold a weapon, a weapon now goes into your bag instead of staying on the floor. If the bag is full, it stays there.
- Choose a weapon in the bag and press Hold: it goes into your hand and the one you held takes its slot. It takes a turn.
- Decisions: D-479.

## 0.2.193 (2026-10-30)
- Torches: in the bag, choose Moth Dust and press Make, and 1 Moth Dust with 1 Wood makes a torch. Without Wood the Make button is dim. Torches stack 5 to a slot.
- Choose a torch in the bag and press Set down, then pick a side: it stands on that floor tile, in the depths too, on a stick in a ring of stones, and lights 3 tiles around like a wall torch. It blocks the way, and lampmoths come to it.
- A torch burns 100 turns, even while you are away, then goes out and leaves bare floor. It can't be picked back up.
- The Crafting page of How to play has a row for it.
- Decisions: D-478.

## 0.2.192 (2026-10-30)
- Mimic Glass is the first creature find you can craft with: choose it in the bag and press Make, and 1 Mimic Glass with 2 Oilcaps makes an oil flask. 3 Oilcaps alone still make one too.
- Without 2 Oilcaps the Make button is dim. Choosing Mimic Glass now says what it makes.
- The Crafting page of How to play has a row for it.
- Decisions: D-477.

## 0.2.191 (2026-10-30)
- A beaten scorpion, flask mimic or gloamling now and then leaves a rare find as well, about 1 time in 10: a Venom Sac, a Mimic Heart or a Gloam Eye. It has a chance of its own, so a creature can leave both; then the rare one lies on the tile beside.
- A Venom Sac is a plump bulb of green venom. A Mimic Heart is a heart of amber oil with a glassy gleam. A Gloam Eye is a round pale eye with a pink iris.
- Each goes in your bag in stacks of 20, with a line, and says a line when chosen there; they are for crafting later. With every stack full they stay on the floor.
- Decisions: D-476.

## 0.2.190 (2026-10-30)
- A beaten lampmoth, scorpion, flask mimic or gloamling now leaves its own material where it fell, about 1 time in 2, as a rat leaves its tail: Moth Dust, a Stinger, Mimic Glass or a Gloam Wisp.
- Moth Dust is a small heap of pale dust with amber glints. A Stinger is a scorpion's curled tail tip, always in the sand colours. Mimic Glass is a curved shard with a smear of oil. A Gloam Wisp is a tuft of shadow shaped like a small flame.
- Each goes in your bag in stacks of 20, with a line, and says a line when chosen there; they are for crafting later. With every stack full they stay on the floor.
- Decisions: D-475.

## 0.2.189 (2026-10-30)
- A beaten rat now leaves a Rat Tail where it fell, about 1 time in 2. Step on it to put it in your bag, in stacks of 20, with a line.
- A Rat Tail is curled into a loop, the rat's pink with a grey stub. Choosing it in the bag says a line about it; it is for crafting later.
- With every stack full it stays on the floor until you come back for it. It never grows back.
- Decisions: D-474.

## 0.2.188 (2026-10-30)
- The scope's build order is set: creature drops come first, so today's five creatures leave materials to take home.
- The first 8 steps: a rat's Rat Tail, the other common drops, the rare drops, a first recipe using one, torches to make and set down, a second weapon kind, a pick and the first ore, and the Growth tree.
- Nothing in the game changes yet.
- Decisions: D-473.
