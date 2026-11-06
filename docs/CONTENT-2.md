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
| `rod` | the Wooden Rod: in the Tool slot; bumping the home pond casts, a cave pool says a line | 1 | never | the workbench: 2 Wood, 2 Spider Silk | D-608, D-609, D-610 |
| `pondMinnow` | the first fish; its uses one a step | 20 | never | caught at the home pond with the rod | D-608, D-610 |
| `copperOre` | the first ore: the wick, the charm | 20 | never | a copper vein | D-480 |
| `copperWick` | Fit in the bag: the lantern's wick, a full tank lasting 75 turns, not 60 | 1 | never | the workbench: 3 Copper Ore, 1 Wood | D-483 |
| `ratVest` | Wear in the bag: the armour, each bite 1 in 4 to glance off and hurt nothing | 1 | never | the workbench: 4 Rat Tail, 1 Wood | D-484 |
| `wispCharm` | Wear in the bag: a charm, rare drops about 1 in 5, not 1 in 10 | 1 | never | the workbench: 3 Gloam Wisp, 1 Copper Ore | D-486 |
| `heartCharm` | Wear in the bag: the second charm, a full tank about 70 turns, not 60 | 1 | never | the workbench: 1 Mimic Heart, 1 Copper Ore | D-487 |
| `bed` | set down as the bed tile | 1 | never | the workbench: 4 Wood, 2 Rat Tail | D-488 |
| `gardenBed` | set down as the garden bed tile, one seed planted in it | 1 | never | the workbench: 3 Wood, 2 Stone | D-562, D-565, D-566 |
| `pouch` | made, the bag holds 9, never in the bag | – | never | the workbench: 4 Rat Tail, 2 Spider Silk | D-545, D-547, D-548 |
| `bigBag` | made after the Pouch, the bag holds 12 | – | never | the workbench: 4 Mole Fur, 3 Spider Silk | D-545, D-547, D-548 |
| `bagTorch` | set down as the torch stand, lit, 100 turns | 5 | never | 1 Moth Dust, 1 Wood; the peddler, 2 coins | D-478, D-495 |
| `lostbag` | the bag where you fell, in Normal | none | never | where the hero fell | D-345 |

## People (`src/core/people.js`)

| id | What it does | Where | Decisions |
| --- | --- | --- | --- |
| `peddler` | trapped in a ring of rubble; calls out when it is bumped or dug, then cheers the digging on; a heap straight beside him cleared, not a corner, thanks the hero and stays, talking when bumped, and goes home 5 turns after, or 3 after a bump, or when the hero leaves the room, in a lantern beam; beams in at home beside the woods' middle when the hero next comes, greets the hero once within 2 tiles, with his own lines, and his card opens to sell to him: each common creature material 1 coin, each rare one 5 (`sells`); his Buy tab sells a flask for 3 coins and a torch for 2, never running out (`wares`); stands still, facing forward, and turns to face the hero within 2 tiles, not in his column | one room of depth 3 the seed picks; freed, the woods | D-470, D-471, D-490, D-491, D-492, D-494, D-495, D-496, D-497, D-498, D-501 |

## The hero's looks (`src/core/looks.js`)

6 cloaks, 6 eyes, 6 trims and 4 clothes; their names are in
`GLOSSARY.md` (D-275 to D-278, D-289). Also 3 locked cloak patterns,
Zebra, Cow and Camo, shown but not yet bought (D-515, D-533).

## Growth upgrades (`src/core/upgrades.js`)

Bought with embers on the Journal's Growth tree (D-462, D-481): Light,
Body and Hands. Body: Heart, one more heart, up to 5 (D-293). Light and
Hands: none yet.

## Tiles (`src/core/tiles.js`)

| id | What it does | Grows back | Where | Decisions |
| --- | --- | --- | --- | --- |
| `wall`, `floor` | solid and open ground | | everywhere | the style study |
| `caveMouth`, `outcrop` | the way into the crypt; surface rock | | the surface | D-209 |
| `stairsDown`, `stairsUp` | lead between depths | | each floor | D-132, D-174 |
| `tree` | 4 bumps: 3 Wood, leaves a stump | 900 | the woods; the edge is always trees | D-209, D-317, D-321 |
| `stump` | grows back into a tree | | where a tree was felled | D-317 |
| `branch` | 2 bumps: 2 Wood | 900 | 1 in each woods room | D-316 |
| `berryBush` | 1 bump: 2 Gloamberries, leaves it bare | 300 | 1 in each woods room | D-531 |
| `bareBush` | a picked bush, solid; fills again on its tile | | where a bush was picked | D-531 |
| `deposit` | 3 bumps: 1 Stone | 900 | 3 in each Cave room | D-311, D-312 |
| `vein` | with the pick in the Tool slot, 4 bumps: 1 Copper Ore | 1800 | 1 of the 3 deposits in each Cave room from depth 3 | D-480, D-552 |
| `bench` | the workbench's panel | | set down on the surface | D-320, D-322, D-323 |
| `stash` | a chest's 12 slots | | set down on the surface | D-325, D-330, D-340 |
| `bedstead` | the bed: at night sleep till morning, healed, a gold heart; by day, Deconstruct bed? | | set down on the surface | D-488 |
| `plot` | the garden bed: bumped, its card, Plant (a Gloamberry Seed) or Deconstruct | | set down on the surface | D-565, D-566 |
| `sprout` | the garden bed planted, a sprout showing; its card, Feed (a Bat Guano) or Deconstruct, which gives back the seed too | | planted from the bed's card | D-566, D-567, D-569 |
| `fedSprout` | the sprout fed, guano flecks on its soil; grows 150 turns after planting; Feed dim | | Feed on the sprout's card | D-569 |
| `berryBed` | the sprout grown, a small gloamberry bush, its card "Gloamberries grow here."; Pick gives 3 Gloamberries, a sprout again; Deconstruct gives back the seed too | | 300 turns after planting, every turn counting | D-567, D-568 |
| `rubble` | solid, light passing over it; 3 bumps by hand clear it, nothing taken, never back; the person beside it calls out, then is freed | | a ring around the peddler, depth 3: at least 4 heaps, a wall on one straight side at most | D-490, D-491, D-586 |
| `water` | a still pool: solid, light passing over it; on the map in its blue-grey (D-502) | | about 1 grey-rock Cave room in 2, 5 to 9 tiles; a pond at home (D-503) | D-500, D-502, D-503 |
| `standingStone`, `waystonePath`, `waystonePlate` | the home waystone, asleep, 5 × 5 from its plan (`landmarks.js`): standing stones on the corners, solid and blocking light like rock; flagstones on the cross and the plate in the middle, walked on; stepping on the plate wakes it (`wakes`) into `wokenPlate`, its rune lit violet with the stairs' faint glow; on a woken plate the travel card goes to another (`travel.js`) | | the woods, 3 tiles north of the middle; in an old save, the nearest clear spot | D-579, D-587, D-589, D-591, D-593 |
| `torchStand` | a torch's stone foot, solid; bare floor once it burns out | | set down anywhere | D-478 |

## Lights (`src/core/lights.js`)

| id | What it does | Where | Decisions |
| --- | --- | --- | --- |
| `torch` | lights 3 tiles around, flickering | the first rooms; by the stairs up in generated rooms; on a torch stand, out after 100 turns | D-121, D-149, D-478 |
| `unlitTorch` | lit for good by walking into its wall | the first rooms | D-121, D-122 |

## Places (`src/core/room.js`)

| Place | What it is | Decisions |
| --- | --- | --- |
| `first`, `second`, `south` | the hand-made rooms of the crypt | D-106, D-138, D-192 |
| `woods` | the surface's generated woods rooms | D-209, D-233 |
| generated depths | Crypt (1), Cave (2 to 4), Warren (5 to 7), Dungeon (8 on) | D-147, D-233, D-354 |

Regions: Hearthwood, the starting region (D-348, `docs/regions/`).
