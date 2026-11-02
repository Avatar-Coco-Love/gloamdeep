# Changelog: stage 0.3, part 1 (from 0.3.0)

Moved unchanged from `CHANGELOG.md`: 0.3.0 at 0.3.18, 0.3.1 at 0.3.19, 0.3.2 at 0.3.20, 0.3.3 and 0.3.4 at 0.3.21, 0.3.5 and 0.3.6 at 0.3.22, 0.3.7 at 0.3.23, 0.3.8 at 0.3.24, 0.3.9 at 0.3.26, 0.3.10 at 0.3.27, 0.3.11 at 0.3.28, 0.3.12 at 0.3.29, 0.3.13 at 0.3.30, 0.3.14 and 0.3.15 at 0.3.31 (the 8 KB cap), and 0.3.16 to 0.3.28 at 0.3.32, the eighth audit (D-570).
From 0.3.37 on, `tools/release.js` moves each version here once 3 newer ones are in `CHANGELOG.md` (D-572).
From 0.3.36 on, `tools/release.js` moves each version here once 3 newer ones are in `CHANGELOG.md` (D-572).
From 0.3.35 on, `tools/release.js` moves each version here once 3 newer ones are in `CHANGELOG.md` (D-572).
From 0.3.34 on, `tools/release.js` moves each version here once 3 newer ones are in `CHANGELOG.md` (D-572).
From 0.3.33 on, `tools/release.js` moves each version here once 3 newer ones are in `CHANGELOG.md` (D-572).
Newest first. Grep for a version; never read this whole.

## 0.3.34 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 3. The workbench, chest and peddler cards each have their own small file for their keys, taps and picks, and the game looks them up in a table, so a new card is one file.
- Decisions: D-573.

## 0.3.33 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 2. A new tool keeps the game's records: one command sets the version number, copies these notes into the Version history, and moves older notes to the archive.
- Decisions: D-572.

## 0.3.32 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 1. The bag, Drop, setting down, and the workbench, chest, bed and peddler cards moved into their own file of the code.
- For screen readers: on the peddler's Sell side, each bag slot is read with its name, how many and its price again, not "Empty". It had been wrong since 0.2.219.
- Tests run faster (22 s to 16 s), two unused pieces of code are gone, and the notes for making changes are tidier.
- Decisions: D-570, D-571.

## 0.3.31 (2026-11-02)
- Feed your garden now: walk into a sprout and its card shows FEED and DECONSTRUCT. Feed puts 1 Bat Guano on the soil. It takes a turn.
- A fed sprout shows a few flecks of guano on its soil and grows in 150 turns from planting instead of 300. Fed after that, it grows at once.
- Once is enough: with no guano, or already fed, Feed is dim. After picking, the sprout needs feeding again. Taken down, the guano is spent.
- Water doesn't matter to the garden yet; it waits for a way to carry water.
- Decisions: D-569.

## 0.3.30 (2026-11-02)
- Pick your garden's berries now: walk into a grown garden bed and its card shows PICK and DECONSTRUCT. Pick gives 3 Gloamberries, one more than a wild bush. It takes a turn.
- After picking, the bed holds a sprout again, and it grows new berries 300 turns later. Plant a seed once and pick again and again.
- With a full bag you keep nothing and the berries stay on the bush. With room for only some, the rest drop on the ground nearby, as at a wild bush.
- Decisions: D-568.

## 0.3.29 (2026-11-02)
- A planted sprout grows now: 300 turns after planting it becomes a small gloamberry bush with ripe berries. Every turn counts, on the surface and below.
- The grown bed's card says "Gloamberries grow here." Picking the berries comes at the next step.
- Deconstruct a grown bed and the bed and its seed come back, as with a sprout.
- Dev mode: the Room section has a new Grow button that grows every planted garden bed at once.
- Decisions: D-567.

## 0.3.28 (2026-11-02)
- Plant your Gloamberry Seeds now: walk into a garden bed and its card shows PLANT and DECONSTRUCT. Plant puts one seed in the bed. It takes a turn.
- A planted bed shows a sprout, two round leaves on a short stem, and its card says "A sprout grows here." Growing comes at the next step.
- Plant is grey when you carry no seed, or when the bed already holds one.
- Deconstruct takes the bed back straight away. If a seed was planted, it comes back to your bag too, when there is room.
- Decisions: D-566.

## 0.3.27 (2026-11-02)
- You can make a garden bed now: it is the last slot on the workbench's card, from 3 Wood and 2 Stone. It takes a turn.
- Set it down on the surface from the bag, as you do the bed. It is a low wooden box of dark soil, a place to plant your Gloamberry Seeds at the next step.
- Walk into it to take it back: a card asks "Deconstruct garden bed?" with "Nothing grows here yet." Yes puts it back in your bag.
- Decisions: D-565.

## 0.3.26 (2026-11-02)
- Gloamberries make a seed now: choose them in the bag and press Make (or C) to turn 3 Gloamberries into 1 Gloamberry Seed. It takes a turn, as making a potion does.
- The Gloamberry Seed is a small brown pip with a tiny green shoot. It stacks to 20. It does nothing yet: the garden bed to plant it in comes at the next step.
- Decisions: D-564.

## 0.3.25 (2026-11-02)
- Creatures no longer bob. Each one stands with its feet on its shadow: the cave spider, the snapcap and the mole no longer float, and an awake flask mimic or herb mimic sits on the floor.
- The bat and the lampmoth fly, so they hover a little above their shadow, held still.
- A sleeping mimic or a shut snapcap still bobs like the find it pretends to be.
- Decisions: D-563.

## 0.3.24 (2026-11-02)
- Nothing changes in the game. The garden comes next, before another new creature, in six small steps: a Gloamberry seed, made in the bag; a garden bed, made at the workbench and set down at home; planting; growing while you are below; picking; then guano and water.
- Decisions: D-561, D-562.

## 0.3.23 (2026-11-02)
- The workbench now uses what is in your stash chests too: on the surface, every chest within 6 tiles of you counts, as for the bag's Store button.
- Its card shows one total for each cost, what your bag and those chests hold together, as "3 / 5 Wood", and Make is dim only when they all hold too few.
- Make takes from your bag first, then from the nearest chest, then the next.
- Decisions: D-560.

## 0.3.22 (2026-11-02)
- A small Sort button sits in the bag's title strip, always: just left of Store, or beside the cross when Store is hidden. It lines your bag up in the game's own order (oil and healing first, things you made last) and joins half stacks, the full ones first, free.
- It says "You sort the bag.", or "The bag is in order." when nothing would change.
- On a keyboard, press Up from the gear row to reach Sort (Store when it shows, then Left for Sort), and Down to go back.
- Decisions: D-559.

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

## 0.3.4 (2026-10-31)
- The gloamberry bush no longer looks like it floats: it sits 1 pixel lower, resting on its shadow, and the shadow is now as wide as its base.
- Decisions: D-532.

## 0.3.3 (2026-10-31)
- Gloamberry bushes now grow in the surface woods, one in each woods room: a low round bush with dark blue berries. Walk into one to pick 2 Gloamberries; the bush stands bare and fills again 300 turns later.
- Gloamberries stack to 20 in the bag. Eat one for 1 heart, as a heartcap. Their seed comes with the garden, and a recipe later.
- Decisions: D-531.

## 0.3.2 (2026-10-31)
- Before the garden, a first wild plant comes to the surface woods, giving the garden its first seed; fruit bushes, flowers, cave plants grown at home and water plants follow, one at a time. Docs only.
- Decisions: D-530.

## 0.3.1 (2026-10-31)
- The Look card's Trim tab now shows each lantern trim as a square of its two metal shades, the light cap over the dark base, with its name, instead of a tiny hero whose lantern was hard to see. Your hero above still carries the trim you pick.
- Decisions: D-529. Questions closed: Q-074.

## 0.3.0 (2026-10-31)
- The Look card's Eyes tab now shows each eye colour as a big square of colour with its name, instead of a tiny hero whose eyes were hard to see. Your hero above still shows the eyes you pick.
- The game moves to version 0.3: stage 0.2's last steps are all done, so the world stage now has its own numbers, starting here.
- Decisions: D-527, D-528.
