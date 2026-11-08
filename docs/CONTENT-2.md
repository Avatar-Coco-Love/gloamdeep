# Content, part 2

`CONTENT.md` continued, under its rules: one row each, with where it
turns up and the decisions behind it. The hero's looks and Growth
upgrades moved here word for word at 0.2.204 (D-490), as that page
neared 8 KB; the lights and places at 0.3.3 (D-531); the tiles at 0.3.7 (D-535).

## Things made, from the workbench on (`src/core/items.js`)
Moved from `CONTENT.md` word for word at 0.3.15; the rest of the finds are there.

| id | What it does | Stack | Grows back | Where, or how made | Decisions |
| --- | --- | --- | --- | --- | --- |
| `workbench` | set down as the bench tile | 1 | never | 3 Wood | D-319, D-322 |
| `chest` | set down as the stash tile | 1 | never | the workbench: 3 Wood, 3 Stone | D-324, D-326 |
| `pick` | the Stone Pick: in the Tool slot, breaks copper veins | 1 | never | the workbench: 2 Wood, 3 Stone | D-480, D-552 |
| `rod` | the Wooden Rod: in the Tool slot; bumping water casts, the home pond or a cave pool | 1 | never | the workbench: 2 Wood, 2 Spider Silk | D-608, D-609, D-610, D-618 |
| `pondMinnow` | the first fish: poured, 15% oil, by hand only; Eat: 1 heart; sold to the peddler for 1 coin | 20 | never | caught at the home pond with the rod | D-608, D-610, D-611, D-615, D-616 |
| `blindCavefish` | the cave pools' fish: poured, 20% oil, by hand only; Eat: 1 heart; sells for 2 coins; strike zone a fifth | 20 | never | caught at any cave pool with the rod | D-618 |
| `copperOre` | the first ore: the wick, the charms | 20 | never | a copper vein | D-480 |
| `copperWick` | Fit in the bag: the lantern's wick, a full tank lasting 75 turns, not 60 | 1 | never | the workbench: 3 Copper Ore, 1 Wood | D-483 |
| `ratVest` | Wear in the bag: the armour, each bite 1 in 4 to glance off and hurt nothing | 1 | never | the workbench: 4 Rat Tail, 1 Wood | D-484 |
| `wispCharm` | Wear in the bag: a charm, rare drops about 1 in 5, not 1 in 10 | 1 | never | the workbench: 3 Gloam Wisp, 1 Copper Ore | D-486 |
| `heartCharm` | Wear in the bag: the second charm, a full tank about 70 turns, not 60 | 1 | never | the workbench: 1 Mimic Heart, 1 Copper Ore | D-487 |
| `centipedeCharm` | Wear in the bag: the charm against poison, poisoned 3 turns and 1 heart, not 6 and 2 | 1 | never | the workbench: 3 Centipede Leg, 1 Copper Ore | D-656 |
| `bed` | set down as the bed tile | 1 | never | the workbench: 4 Wood, 2 Rat Tail | D-488 |
| `gardenBed` | set down as the garden bed tile, one seed planted in it | 1 | never | the workbench: 3 Wood, 2 Stone | D-562, D-565, D-566 |
| `shelf` | set down as the shelf tile, empty; the locket can be set on it (D-693) | 1 | never | the workbench: 4 Wood, 2 Stone | D-689, D-690 |
| `pouch` | made, the bag holds 9, never in the bag | – | never | the workbench: 4 Rat Tail, 2 Spider Silk | D-545, D-547, D-548 |
| `bigBag` | made after the Pouch, the bag holds 12 | – | never | the workbench: 4 Mole Fur, 3 Spider Silk | D-545, D-547, D-548 |
| `bagTorch` | set down as the torch stand, lit, 100 turns | 5 | never | 1 Moth Dust, 1 Wood; the peddler, 2 coins | D-478, D-495 |
| `lostbag` | the bag where you fell, in Normal | none | never | where the hero fell | D-345 |

## People (`src/core/people.js`)

| id | What it does | Where | Decisions |
| --- | --- | --- | --- |
| `peddler` | trapped in a ring of rubble; calls out when it is bumped or dug, then cheers the digging on; a heap straight beside him cleared, not a corner, thanks the hero and stays, talking when bumped, and goes home 5 turns after, or 3 after a bump, or when the hero leaves the room, in a lantern beam; beams in at home beside the woods' middle when the hero next comes, greets the hero once within 2 tiles, with his own lines, and his card opens to sell to him: each find at its own price (`sells`): 1 coin for most common creature materials (Wisp Glass 2), 5 for a rare one; his Buy tab sells a flask for 3 coins and a torch for 2, never running out (`wares`); stands still, facing forward, and turns to face the hero within 2 tiles, not in his column | one room of depth 3 the seed picks; freed, the woods | D-470, D-471, D-490, D-491, D-492, D-494, D-495, D-496, D-497, D-498, D-501, D-674 |

## The hero's looks (`src/core/looks.js`)

6 cloaks, 6 eyes, 6 trims and 4 clothes; their names are in
`GLOSSARY.md` (D-275 to D-278, D-289). Also 3 locked cloak patterns,
Zebra, Cow and Camo, shown but not yet bought (D-515, D-533).

## Growth upgrades (`src/core/upgrades.js`)

Bought with embers on the Journal's Growth tree (D-462, D-481): Light,
Body and Hands. Body: Heart, one more heart, up to 5 (D-293); Tough, a hurting bite
poisons only 1 time in 2, above Heart in the first row (D-657). Light and
Hands: none yet.

## Tiles, lights, places
Moved to `CONTENT-3.md` word for word at 0.3.73 (D-618).
