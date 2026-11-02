# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump. The same lines go, word for word, into the in-game Version
history, `src/core/history-0.3.js` (D-254, D-528).

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- `0.3.x`: stage 0.3, the world (D-168), from 0.3.0, once stage 0.2's
  last steps were done (D-528).
- Later minor versions (`0.4`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.3.21 (2026-11-02)
- A small Store button sits in the bag's title strip, just left of the cross, when you are on the surface with a stash chest within 6 tiles. It sends each stack in your bag to the chests nearby that already hold that kind, the nearest chest first, free.
- It says how many stacks moved, "Nothing to store." when none match, and "Chests full." after the count when some had to stay in your bag ("The chest is full." with only one chest nearby).
- On a keyboard, press Up from the gear row to reach Store, and Down to go back.
- Decisions: D-558.

## 0.3.20 (2026-11-02)
- Falling on a floor of several rooms, from depth 2 down, no longer freezes the game: the small round map broke while showing the fall, and stopped everything. Thanks to a friend's playtest.
- If anything else ever goes wrong while the screen is drawn, the game now carries on instead of freezing.
- Decisions: D-557.

## 0.3.19 (2026-11-02)
- A stash chest's card has a Store button in its bottom right corner: every stack in your bag of a kind the chest already holds goes onto it, free. It says how many stacks moved, "Nothing to store." when none match, and that the chest is full when some had to stay in your bag.
- On a keyboard, press Down from the bag's bottom row to reach Store.
- Decisions: D-556.

## 0.3.18 (2026-11-02)
- Storing what matches will come as two buttons: first Store on a chest's card, filling just that chest, then a small Store in the bag, sending your stacks to every stash chest within 6 tiles that already holds that kind. Both free. Docs only.
- Decisions: D-555.

## 0.3.17 (2026-11-01)
- Choose the Weapon or Tool slot in the bag's gear row and press Take off: the spear, knife or Stone Pick goes back into your bag, and no turn passes. With the bag full it stays put. Worn pieces show their words but can't come off.
- On a keyboard, press Up from the bag's top row to reach the gear row; Enter takes off.
- Decisions: D-554.

## 0.3.16 (2026-11-01)
- The bag shows a row of five gear slots across its top: Weapon, Tool, Armour and two Charms. Empty ones show faintly what goes there, and what you wear is now always in view.
- The Stone Pick has its own Tool slot. Choose it in the bag and press Hold to put it there (a turn); it breaks copper veins only from that slot. A pick you make goes straight into an empty Tool slot, and one already in your bag moves there by itself.
- Decisions: D-552, D-553.

## 0.3.15 (2026-11-01)
- A new creature, the bone rat, now turns up from depth 4 down: a rat with nothing left but bone. It chases you and never runs away.
- It has 3 hearts and bites for 1, with a dry clatter of bones and a snap of teeth.
- Beaten, it may leave a Rat Bone, which the peddler buys for 1 coin; its recipes come later.
- Decisions: D-551.

## 0.3.14 (2026-11-01)
- A new creature, the herb mimic, now turns up from depth 3 down. Asleep, it looks just like a herb; bump it, or step on it to heal, and it opens its eyes and chases you for 6 turns.
- It has 2 hearts and bites for 1, with a dry rustle of leaves and a snap. Stepping on it never heals you.
- Beaten, it may leave a Mimic Leaf, which the peddler buys for 1 coin; its recipes come later.
- Decisions: D-549, D-550.

## 0.3.13 (2026-11-01)
- The workbench can make a Pouch, from 4 Rat Tail and 2 Spider Silk. Make it and your bag holds 9 things instead of 6, for good.
- Once you have the Pouch, the workbench offers the Big Bag, from 4 Mole Fur and 3 Spider Silk, and your bag holds 12.
- A bigger bag shows as a 3 × 3 grid, then 4 × 3, with slightly smaller slots so it fits a sideways screen, in the bag, the chest and the peddler's card.
- Decisions: D-547, D-548.

## 0.3.12 (2026-11-01)
- A new Drop button in the bag, for every item (or X on a keyboard), sets the chosen stack down at your feet, free, to make room. Walk back onto it to pick it all up again.
- Drop while standing on something your full bag couldn't take, and the two swap: your stack goes down and the find comes into the bag.
- Bigger bags come later: a Pouch for 9 slots, then a Big Bag for 12, made at the workbench.
- Decisions: D-545, D-546.

## 0.3.11 (2026-11-01)
- A new creature, the snapcap, now turns up from depth 2 down. It looks just like a heartcap until you stand beside it; then its eyes and teeth show.
- It never moves. It bites for 1 whoever stands beside it, light or dark, with a wet squelch and a snap, and it has 2 hearts.
- Beaten, it may leave a Snapcap Gill, which the peddler buys for 1 coin; its recipes come later.
- Decisions: D-543, D-544.

## 0.3.10 (2026-11-01)
- A new creature, the mole, now turns up from depth 5 down. It chases you once it sees you in the light, and it never flees.
- It has 4 hearts, the most of any creature so far, and bites for 1, with a low snuffle and a scrape of claws.
- Beaten, it may leave Mole Fur, which the peddler buys for 1 coin, and now and then a rare Mole Claw, which the peddler buys for 5; their recipes come later.
- Decisions: D-541, D-542.

## 0.3.9 (2026-11-01)
- Bat Guano now lies in the caves: as each room is made, every bat gets a pile on the floor beside it. Walk onto it to put it in your bag, in stacks of 20.
- It grows back a day after you take it, out of sight. The peddler buys it for 1 coin, and it is kept for the garden and for crafts later.
- Decisions: D-540.

## 0.3.8 (2026-11-01)
- A new creature, the bat, now turns up from depth 3 down. It flies toward your lit lantern, or the nearest lit torch, from anywhere in the room; with no light about, it stays where it is.
- It has 2 hearts and bites for 1, with a quick squeak and a flap of wings. Hurt, it may flee for a few turns, as a rat does.
- Beaten, it may leave a Bat Wing, which the peddler buys for 1 coin, and now and then a rare Bat Fang, which the peddler buys for 5; their recipes come later.
- Decisions: D-537, D-538, D-539.

## 0.3.7 (2026-11-01)
- A new creature, the cave spider, now turns up from depth 2 down. It shuns light: it waits in the dark, backs away from your lantern, and bites only when you stand beside it in the dark.
- It has 2 hearts and bites for 1, with a soft hiss and a click. Beaten, it may leave Spider Silk, which the peddler buys for 1 coin; its recipes come later.
- Decisions: D-535, D-536.

## 0.3.6 (2026-11-01)
- Rooms below the surface now hold more creatures, of mixed kinds: 2 in each room at depth 2, 3 at depths 3 and 4, and 4 from depth 5 down. Every room holds at least two kinds.
- Each depth has its own mix. Rats and lampmoths turn up from depth 2, scorpions from depth 3 and gloamlings from depth 5, and none of them stops turning up deeper. A rat still waits by each room's flask, and the flask mimic is as before.
- Decisions: D-534.

## 0.3.5 (2026-10-31)
- On the Look card, the Cloak tab now shows the three cloak patterns, Zebra, Cow and Camo, in a third row. Each is dim, with LOCK at its corner.
- Tap a locked pattern to try it on the big hero. A note says it costs Glints, earned from Feats, and that its price isn't decided yet. OK keeps your own cloak, and RANDOM never rolls a locked one.
- Decisions: D-533.
