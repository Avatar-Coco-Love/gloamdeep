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
| `oilcap` | 3 make a flask | 20 | 300 | each generated room; each woods room on the surface, home too, on grass beside a tree (`woodscap.js`), none in the mountain rooms | D-296, D-299, D-760 |
| `heartcap` | Eat: 1 heart; 3 make a potion | 20 | 300 | about half the generated rooms | D-303, D-308, D-309 |
| `potion` | Drink: 4 hearts | 5 | never | 3 heartcaps | D-309 |
| `antidote` | Drink: ends poisoned, healing nothing; only while poisoned | 5 | never | 1 Snapcap Gill and 1 herb, made in the bag | D-652, D-655 |
| `stone` | for crafts | 20 | 300 when lying loose; never from a deposit | a deposit; 2 loose on open grass in each mountain room (`loosestone.js`), none in the woods rooms | D-312, D-761 |
| `duskstar` | for crafts later | 20 | 300, on another grass tile of its room | 2 on open grass in each woods room (`duskstar.js`), none in the mountain rooms | D-763 |
| `ratTail` | 4 with 1 Wood make the Rat Hide Vest; 2 with 4 Wood, the bed | 20 | never | a beaten rat, about 1 in 2 | D-453, D-454, D-474, D-484, D-488 |
| `mothDust` | with 1 Wood makes a torch | 20 | never | a beaten lampmoth, about 1 in 2 | D-454, D-475, D-478 |
| `stinger` | for crafts later | 20 | never | a beaten scorpion, about 1 in 2; always Sand | D-454, D-475 |
| `mimicGlass` | with 2 oilcaps makes a flask | 20 | never | a beaten flask mimic, about 1 in 2 | D-454, D-475, D-477 |
| `gloamWisp` | 3 with 1 Copper Ore make the Wisp Charm | 20 | never | a beaten gloamling, about 1 in 2 | D-454, D-475, D-486 |
| `spiderSilk` | 2 in the Pouch, 3 in the Big Bag | 20 | never | a beaten cave spider, about 1 in 2 | D-535 |
| `batWing` | for crafts later | 20 | never | a beaten bat, about 1 in 2 | D-537 |
| `moleFur` | 4 in the Big Bag | 20 | never | a beaten mole, about 1 in 2 | D-541 |
| `snapcapGill` | with 1 herb makes an Antidote | 20 | never | a beaten snapcap, about 1 in 2 | D-543 |
| `mimicLeaf` | for crafts later | 20 | never | a beaten herb mimic, about 1 in 2 | D-549 |
| `ratBone` | for crafts later | 20 | never | a bone rat's pile, scattered, about 1 in 2 | D-551, D-731 |
| `tickShell` | for crafts later | 20 | never | a beaten oil tick, about 1 in 2 | D-606 |
| `batGuano` | Feed on a sprout's card: grows in 150 turns, not 300; crafts later; sells for 1 | 20 | 300 | a pile beside each bat as a room is made | D-539, D-540, D-569 |
| rare materials | moved to `CONTENT-3.md`, "Rare materials", word for word at 0.3.106 | | | | |
| `wispGlass` | for crafts later; sold for 2 | 20 | never | a beaten lure wisp, about 1 in 2 | D-649 |
| `centipedeLeg` | 3 with 1 Copper Ore make the Centipede Charm | 20 | never | a beaten centipede, about 1 in 2 | D-654 |
| `grubSkin` | for crafts later; sold for 1 | 20 | never | a beaten spit grub, about 1 in 2 | D-688 |
| `gloamberry` | Eat: 1 heart; 3 make a Gloamberry Seed; a recipe comes later | 20 | never | a gloamberry bush, 2 a bump; a grown garden bed, 3 a Pick | D-530, D-531, D-564, D-568 |
| `gloamberrySeed` | planted in a garden bed from its card | 20 | never | made from 3 Gloamberries | D-562, D-564, D-566 |
| `wood` | for crafts and building | 20 | 300 | 3 sticks in each woods room; branches; trees | D-314, D-315 |
| `locket` | the Lightkeeper's Locket, biome 1's first relic: set on the shelf for good (D-693); there, a Normal fall brings home the bag's stack worth most to the peddler (D-694) | 1 | never | one room at depth 4, a warden guarding it | D-689, D-691, D-692, D-693, D-694 |


The workbench and the things made after it, from `workbench` to `lostbag`,
moved to `CONTENT-2.md` word for word at 0.3.15.
