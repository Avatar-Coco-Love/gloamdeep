# Content

Everything in the game today, one row each, with its numbers, where it
turns up and the decisions behind it (D-363). The words themselves are in
`GLOSSARY.md`; the numbers come from the registry files named in each
heading, and where this page and the code disagree, the code and the
decisions win. Read this before proposing new content, so it builds on
what exists. Every PR that adds or changes content updates its row
(the checklist is in `TECH.md`, "Adding content").

Turns are the hero's turns. A creature beaten gives its hearts plus its
bite in experience (D-371). "Grows back" is the `regrow` time (D-306).

## Creatures (`src/core/enemies.js`, ways in `behaviours.js`)

| id | Hearts | Bite | Ways | Where | Decisions |
| --- | --- | --- | --- | --- | --- |
| `rat` | 2 | 1 | chases, fleesHurt | the first rooms; the pool from depth 2, and always the one by each room's flask | D-106, D-110, D-114, D-126, D-149, D-231, D-292, D-301, D-474, D-534 |
| `gloamling` | 2 | 1 | chases, shunsLight | the pool from depth 5 | D-240, D-244, D-475, D-476, D-534 |
| `lampmoth` | 1 | 1 | seeksLight | the pool from depth 2 | D-351, D-356, D-475, D-534 |
| `flaskMimic` | 3 | 1 | chases, once bumped awake; asleep it looks like a flask, for 6 turns | depths 3 to 5, about 1 room in 4, as well as the rest | D-365 to D-369, D-475, D-476 |
| `caveSpider` | 2 | 1 | shunsLight only, so it never comes: waits in the dark, backs out of light, bites only from the dark | the pool from depth 2 | D-365, D-535, D-536 |
| `scorpion` | 1 | 2 | chases; wears one of 5 colour sets | the pool from depth 3 | D-370, D-373, D-475, D-476, D-534 |
| `bat` | 2 | 1 | seeksLight, fleesHurt | the pool from depth 3 | D-365, D-537, D-538 |

The ways so far: **chases** (notices in light along a clear line, then
comes), **shunsLight** (never steps into light, backs out of it, sees
along any clear line), **fleesHurt** (1 in 2, flees 4 turns once hurt),
**seeksLight** (walks to the lit lantern, else the nearest lit torch)
(D-269, D-351). A creature that `looksLike` a find sleeps in its disguise
until bumped, then wakes for its `awakeTurns` (D-368). A creature with `colours` wears one of that many colour sets, picked by the seed (D-373).
Each generated room holds 2 creatures at depth 2, 3 at depths 3 and 4, 4 from depth 5: the rat by the flask, the rest picked from the depth's pool (`poolAt` in `room.js`), at least two kinds a room (D-534); the cave spider joins the pool at depth 2 (D-535), the bat at depth 3 (D-537).
A new creature mixes these by name; a new way is a new
mechanic and its own step.

## Finds and things made (`src/core/items.js`)

| id | What it does | Stack | Grows back | Where, or how made | Decisions |
| --- | --- | --- | --- | --- | --- |
| `flask` | 45% oil, poured from the bag or the quick slot | 5 | 900 | the first rooms; 1 in each generated room, a rat beside it; 3 oilcaps, or 1 Mimic Glass and 2 oilcaps; the peddler, 3 coins | D-078, D-149, D-247, D-299, D-384, D-477, D-495 |
| `knife` | held, hits for 2; in the bag, Hold | held, or 1 a slot | never | the first room of depth 2 | D-252, D-347, D-479 |
| `spear` | held, hits for 2 and the one behind for 1; in the bag, Hold | held, or 1 a slot | never | the first room of depth 3 | D-479 |
| `herb` | heals 2 where it lies when hurt; at full health into the bag, Eat: 2 hearts | 5 | 300 | each generated room | D-155, D-511 |
| `oilcap` | 3 make a flask | 20 | 300 | each generated room | D-296, D-299 |
| `heartcap` | Eat: 1 heart; 3 make a potion | 20 | 300 | about half the generated rooms | D-303, D-308, D-309 |
| `potion` | Drink: 4 hearts | 5 | never | 3 heartcaps | D-309 |
| `stone` | for crafts | 20 | never | a deposit | D-312 |
| `ratTail` | 4 with 1 Wood make the Rat Hide Vest; 2 with 4 Wood, the bed | 20 | never | a beaten rat, about 1 in 2 | D-453, D-454, D-474, D-484, D-488 |
| `mothDust` | with 1 Wood makes a torch | 20 | never | a beaten lampmoth, about 1 in 2 | D-454, D-475, D-478 |
| `stinger` | for crafts later | 20 | never | a beaten scorpion, about 1 in 2; always Sand | D-454, D-475 |
| `mimicGlass` | with 2 oilcaps makes a flask | 20 | never | a beaten flask mimic, about 1 in 2 | D-454, D-475, D-477 |
| `gloamWisp` | 3 with 1 Copper Ore make the Wisp Charm | 20 | never | a beaten gloamling, about 1 in 2 | D-454, D-475, D-486 |
| `spiderSilk` | for crafts later | 20 | never | a beaten cave spider, about 1 in 2 | D-535 |
| `batWing` | for crafts later | 20 | never | a beaten bat, about 1 in 2 | D-537 |
| `venomSac` | for crafts later | 20 | never | a beaten scorpion, about 1 in 10 (1 in 5 with the charm), its own coin | D-454, D-476, D-486 |
| `mimicHeart` | with 1 Copper Ore makes the Heart Charm | 20 | never | a beaten flask mimic, about 1 in 10 (1 in 5 with the charm), its own coin | D-454, D-476, D-486 |
| `gloamEye` | for crafts later | 20 | never | a beaten gloamling, about 1 in 10 (1 in 5 with the charm), its own coin | D-454, D-476, D-486 |
| `batFang` | for crafts later | 20 | never | a beaten bat, about 1 in 10 (1 in 5 with the charm), its own coin | D-537 |
| `gloamberry` | Eat: 1 heart; its seed and a recipe come later | 20 | never | a gloamberry bush, 2 a bump | D-530, D-531 |
| `wood` | for crafts and building | 20 | 300 | 3 sticks in each woods room; branches; trees | D-314, D-315 |
| `workbench` | set down as the bench tile | 1 | never | 3 Wood | D-319, D-322 |
| `chest` | set down as the stash tile | 1 | never | the workbench: 3 Wood, 3 Stone | D-324, D-326 |
| `pick` | the Stone Pick: in the bag, breaks copper veins | 1 | never | the workbench: 2 Wood, 3 Stone | D-480 |
| `copperOre` | the first ore: the wick, the charm | 20 | never | a copper vein | D-480 |
| `copperWick` | Fit in the bag: the lantern's wick, a full tank lasting 75 turns, not 60 | 1 | never | the workbench: 3 Copper Ore, 1 Wood | D-483 |
| `ratVest` | Wear in the bag: the armour, each bite 1 in 4 to glance off and hurt nothing | 1 | never | the workbench: 4 Rat Tail, 1 Wood | D-484 |
| `wispCharm` | Wear in the bag: a charm, rare drops about 1 in 5, not 1 in 10 | 1 | never | the workbench: 3 Gloam Wisp, 1 Copper Ore | D-486 |
| `heartCharm` | Wear in the bag: the second charm, a full tank about 70 turns, not 60 | 1 | never | the workbench: 1 Mimic Heart, 1 Copper Ore | D-487 |
| `bed` | set down as the bed tile | 1 | never | the workbench: 4 Wood, 2 Rat Tail | D-488 |
| `bagTorch` | set down as the torch stand, lit, 100 turns | 5 | never | 1 Moth Dust, 1 Wood; the peddler, 2 coins | D-478, D-495 |
| `lostbag` | the bag where you fell, in Normal | none | never | where the hero fell | D-345 |

## Tiles
Moved to `CONTENT-2.md` word for word at 0.3.7 (D-535).

## Lights, places
Moved to `CONTENT-2.md` word for word at 0.3.3 (D-531).

## People, the hero's looks, Growth upgrades
In `CONTENT-2.md`.
