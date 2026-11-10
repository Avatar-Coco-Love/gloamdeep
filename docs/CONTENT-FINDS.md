# Content: finds

`CONTENT.md` continued, under its rules: one row each, with its numbers,
where it turns up and the decisions behind it. The finds and things made
moved here from `CONTENT.md` word for word at 0.3.113, the tenth audit
(D-660), as that page neared 8 KB.

## Finds and things made (`src/core/items.js`)

| id | What it does | Stack | Grows back | Where, or how made | Decisions |
| --- | --- | --- | --- | --- | --- |
| `flask` | 45% oil, poured from the bag or the quick slot | 5 | 900 | the first rooms; 1 in each generated room, a rat beside it; 3 oilcaps, or 1 Mimic Glass and 2 oilcaps; the peddler, 3 coins | D-078, D-149, D-247, D-299, D-384, D-477, D-495 |
| `knife` | held, hits for 2; in the bag, Hold | held, or 1 a slot | never | the first room of depth 2 | D-252, D-347, D-479 |
| `spear` | held, hits for 2 and the one behind for 1; in the bag, Hold | held, or 1 a slot | never | the first room of depth 3 | D-479 |
| `herb` | heals 2 where it lies when hurt; at full health into the bag, Eat: 2 hearts | 5 | 300 | each generated room; 1 in each woods room outside | D-155, D-511, D-762 |
| `oilcap` | 3 make a flask; 1 with 2 Tick Shell, Slowburn at the mortar (D-792) | 20 | 300 | each generated room; each woods room on the surface, home too, on grass beside a tree (`woodscap.js`), none in the mountain rooms | D-296, D-299, D-760 |
| `heartcap` | Eat: 1 heart; 3 make a potion | 20 | 300 | about half the generated rooms | D-303, D-308, D-309 |
| `potion` | Drink: 4 hearts | 5 | never | 3 heartcaps | D-309 |
| `antidote` | Drink: ends poisoned, healing nothing; only while poisoned | 5 | never | 1 Snapcap Gill and 1 herb, made in the bag | D-652, D-655 |
| `stone` | for crafts; 4 with 1 Wood make the Mortar and Pestle (D-786) | 20 | 300 when lying loose; never from a deposit | a deposit; 2 loose on open grass in each mountain room (`loosestone.js`), none in the woods rooms | D-312, D-761 |
| `duskstar` | 2 with 1 Wisp Glass make the Glow Draught at the mortar (D-786) | 20 | 300, on another grass tile of its room | 2 on open grass in each woods room (`duskstar.js`), none in the mountain rooms | D-763 |
| `ratTail` | 4 with 1 Wood make the Rat Hide Vest; 2 with 4 Wood, the bed | 20 | never | a beaten rat, about 1 in 2 | D-453, D-454, D-474, D-484, D-488 |
| `mothDust` | with 1 Wood makes a torch | 20 | never | a beaten lampmoth, about 1 in 2 | D-454, D-475, D-478 |
| `stinger` | for crafts later | 20 | never | a beaten scorpion, about 1 in 2; always Sand | D-454, D-475 |
| `mimicGlass` | with 2 oilcaps makes a flask | 20 | never | a beaten flask mimic, about 1 in 2 | D-454, D-475, D-477 |
| `gloamWisp` | 3 with 1 Copper Ore make the Wisp Charm | 20 | never | a beaten gloamling, about 1 in 2 | D-454, D-475, D-486 |
| `spiderSilk` | 2 in the Pouch, 3 in the Big Bag | 20 | never | a beaten cave spider, about 1 in 2 | D-535 |
| `batWing` | for crafts later | 20 | never | a beaten bat, about 1 in 2 | D-537 |
| `moleFur` | 4 in the Big Bag | 20 | never | a beaten mole, about 1 in 2 | D-541 |
| `snapcapGill` | with 1 herb makes an Antidote | 20 | never | a beaten snapcap, about 1 in 2 | D-543 |
| `mimicLeaf` | 2 with 1 Herb make the Mending Draught at the mortar (D-794) | 20 | never | a beaten herb mimic, about 1 in 2 | D-549 |
| `ratBone` | for crafts later | 20 | never | a bone rat's pile, scattered, about 1 in 2 | D-551, D-731 |
| `tickShell` | 2 with 1 Oilcap make Slowburn at the mortar (D-792) | 20 | never | a beaten oil tick, about 1 in 2 | D-606 |
| `batGuano` | Feed on a sprout's card: grows in 150 turns, not 300; crafts later; sells for 1 | 20 | 300 | a pile beside each bat as a room is made | D-539, D-540, D-569 |
| rare materials | moved to `CONTENT-3.md`, "Rare materials", word for word at 0.3.106; below since 0.3.220 | | | | |
| `wispGlass` | 1 with 2 Duskstar make the Glow Draught at the mortar (D-786); sold for 2 | 20 | never | a beaten lure wisp, about 1 in 2 | D-649 |
| `centipedeLeg` | 3 with 1 Copper Ore make the Centipede Charm; 2 with 1 Herb, the Ward Draught at the mortar (D-795) | 20 | never | a beaten centipede, about 1 in 2 | D-654 |
| `grubSkin` | for crafts later; sold for 1 | 20 | never | a beaten spit grub, about 1 in 2 | D-688 |
| `gloamberry` | Eat: 1 heart; 3 make a Gloamberry Seed; a recipe comes later | 20 | never | a gloamberry bush, 2 a bump; a grown garden bed, 3 a Pick | D-530, D-531, D-564, D-568 |
| `gloamberrySeed` | planted in a garden bed from its card | 20 | never | made from 3 Gloamberries | D-562, D-564, D-566 |
| `wood` | for crafts and building | 20 | 300 | 3 sticks in each woods room; branches; trees | D-314, D-315 |
| `locket` | the Lightkeeper's Locket, biome 1's first relic: set on the shelf for good (D-693); there, a Normal fall brings home the bag's stack worth most to the peddler (D-694) | 1 | never | one room at depth 4, a warden guarding it | D-689, D-691, D-692, D-693, D-694 |
| `bunnyFur` | for crafts later; sold for 1 | 20 | never | a beaten bunny, about 1 in 2 | D-784 |
| `crabShell` | 4 with 1 Wood make the Shell Vest (D-801); sold for 1 | 20 | never | a beaten skulker crab, about 1 in 2 | D-796 |
| `lurkerClaw` | for crafts later; sold for 1 | 20 | never | a beaten rim lurker, about 1 in 2 | D-797 |
| `glowDraught` | Drink, in the bag, any time: the lantern's light reaches 1 tile farther for 60 turns, added to Wide Glow's; none while the lantern is empty | 5 | never | made at the mortar: 2 Duskstar, 1 Wisp Glass | D-786, D-791 |
| `slowburn` | Drink, in the bag, any time: a lit turn burns 6/7 of its oil for 60 turns, a full tank lasting 70, not 60, added to the Heart Charm's | 5 | never | made at the mortar: 2 Tick Shell, 1 Oilcap | D-792 |
| `mendingDraught` | Drink, in the bag, any time: a heart every 15 turns for 60 turns, 4 in all, never above full | 5 | never | made at the mortar: 2 Mimic Leaf, 1 Herb | D-794 |
| `wardDraught` | Drink, in the bag, any time: ends poisoned, and for 60 turns a bite never poisons | 5 | never | made at the mortar: 2 Centipede Leg, 1 Herb | D-795 |


The workbench and the things made after it, from `workbench` to `lostbag`,
moved to `CONTENT-2.md` word for word at 0.3.15.

## Rare materials (`src/core/items.js`)

Moved from `CONTENT.md` word for word at 0.3.106, as that page passed 8 KB;
the Venom Sac's row since names the centipede too (D-654).

| id | What it does | Stack | Grows back | Where, or how made | Decisions |
| --- | --- | --- | --- | --- | --- |
| `venomSac` | for crafts later | 20 | never | a beaten scorpion or centipede, about 1 in 10 (1 in 5 with the charm), its own coin | D-454, D-476, D-486 |
| `mimicHeart` | with 1 Copper Ore makes the Heart Charm | 20 | never | a beaten flask mimic, about 1 in 10 (1 in 5 with the charm), its own coin | D-454, D-476, D-486 |
| `gloamEye` | for crafts later | 20 | never | a beaten gloamling, about 1 in 10 (1 in 5 with the charm), its own coin | D-454, D-476, D-486 |
| `batFang` | for crafts later | 20 | never | a beaten bat, about 1 in 10 (1 in 5 with the charm), its own coin | D-537 |
| `moleClaw` | for crafts later | 20 | never | a beaten mole, about 1 in 10 (1 in 5 with the charm), its own coin | D-541 |
| `oilBladder` | for crafts later | 20 | never | a beaten oil tick, about 1 in 10 (1 in 5 with the charm), its own coin | D-606 |
| `glowGland` | for crafts later | 20 | never | a beaten spit grub, about 1 in 10 (1 in 5 with the charm), its own coin | D-688 |
