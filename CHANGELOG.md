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

## 0.2.187 (2026-10-30)
- The scope's part 8, home and trade, is settled. Home grows by the pieces you build there, and sleeping at home gives a short boost for the next trip.
- Most people will be rescued below and move home; later some stay where you meet them, and wanderers such as a merchant visit.
- The first vendor will be a rescued person at home, buying creature materials and spare finds. Trade coins come only from selling, and are kept when you fall.
- Nothing in the game changes yet. The whole scope is now settled.
- Decisions: D-469 to D-472.

## 0.2.186 (2026-10-30)
- Nothing in the game changes. The fifth audit: the Seed Explorer, Settings' ways to play and the seed pad move word for word from screens.js into their own file, explorerscreens.js.
- Docs: CHANGELOG.md keeps its newest 3 entries, the rest moved to archive/CHANGELOG-STAGE-0.2-1.md; finished decisions moved to the archive; CLAUDE.md's pointers are tidied, its rules word for word; GLOSSARY.md's "In the code" moved word for word to GLOSSARY-CODE.md. The next audit is at 0.2.206.
- Decisions: D-468.

## 0.2.185 (2026-10-30)
- The scope's part 7, collectables, is settled. Lore pages found below fill a Lore tab in the Journal, in sets; finishing a set gives a small lasting boost.
- Relics, 1 or 2 a biome, are set on a shelf at home and each gives a small lasting boost while there.
- Each creature will have a trophy, made from its materials and hung at home, completing its Bestiary page.
- Achievements come in 3 tiers, each paying the look currency, in a Feats tab in the Journal.
- Nothing in the game changes yet.
- Decisions: D-464 to D-467.
