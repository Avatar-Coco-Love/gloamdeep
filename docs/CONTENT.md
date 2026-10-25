# Content

Everything in the game today, one row each, with its numbers, where it
turns up and the decisions behind it (D-363). The words themselves are in
`GLOSSARY.md`; the numbers come from the registry files named in each
heading, and where this page and the code disagree, the code and the
decisions win. Read this before proposing new content, so it builds on
what exists. Every PR that adds or changes content updates its row
(the checklist is in `TECH.md`, "Adding content").

Turns are the hero's turns. "Grows back" is the `regrow` time (D-306).

## Creatures (`src/core/enemies.js`, ways in `behaviours.js`)

| id | Hearts | Bite | Ways | Where | Decisions |
| --- | --- | --- | --- | --- | --- |
| `rat` | 2 | 1 | chases, fleesHurt | the first rooms; 1 in each generated room, 2 from depth 5 | D-106, D-110, D-114, D-126, D-149, D-231, D-292, D-301 |
| `gloamling` | 2 | 1 | chases, shunsLight | depth 5 on, 3 rooms a floor, for the second rat | D-240, D-244 |
| `lampmoth` | 1 | 1 | seeksLight | depths 2 to 4, 1 room a floor, for the rat | D-351, D-356 |
| `flaskMimic` | 3 | 1 | none | depths 3 to 5, about 1 room in 4, as well as the rest | D-365, D-366, D-367 |

The ways so far: **chases** (notices in light along a clear line, then
comes), **shunsLight** (never steps into light, backs out of it, sees
along any clear line), **fleesHurt** (1 in 2, flees 4 turns once hurt),
**seeksLight** (walks to the lit lantern, else the nearest lit torch)
(D-269, D-351). With no way, a creature never moves and bites whoever
stands next to it, lit or not (D-366). A new creature mixes these by name; a new way is a new
mechanic and its own step.

## Finds and things made (`src/core/items.js`)

| id | What it does | Stack | Grows back | Where, or how made | Decisions |
| --- | --- | --- | --- | --- | --- |
| `flask` | 45% oil, poured from the bag | 5 | 900 | the first rooms; 1 in each generated room, a rat beside it; 3 oilcaps | D-078, D-149, D-247, D-299 |
| `knife` | held, hits for 2 | held | never | the first room of depth 2 | D-252, D-347 |
| `herb` | heals 2 where it lies | none | 300 | each generated room | D-155, D-156 |
| `oilcap` | 3 make a flask | 20 | 300 | each generated room | D-296, D-299 |
| `heartcap` | Eat: 1 heart; 3 make a potion | 20 | 300 | about half the generated rooms | D-303, D-308, D-309 |
| `potion` | Drink: 4 hearts | 5 | never | 3 heartcaps | D-309 |
| `stone` | for crafts | 20 | never | a deposit | D-312 |
| `wood` | for crafts and building | 20 | 300 | 3 sticks in each woods room; branches; trees | D-314, D-315 |
| `workbench` | set down as the bench tile | 1 | never | 3 Wood | D-319, D-322 |
| `chest` | set down as the stash tile | 1 | never | the workbench: 3 Wood, 3 Stone | D-324, D-326 |
| `lostbag` | the bag where you fell, in Normal | none | never | where the hero fell | D-345 |

## Tiles (`src/core/tiles.js`)

| id | What it does | Grows back | Where | Decisions |
| --- | --- | --- | --- | --- |
| `wall`, `floor` | solid and open ground | | everywhere | the style study |
| `caveMouth`, `outcrop` | the way into the crypt; surface rock | | the surface | D-209 |
| `stairsDown`, `stairsUp` | lead between depths | | each floor | D-132, D-174 |
| `tree` | 4 bumps: 3 Wood, leaves a stump | 900 | the woods; the edge is always trees | D-209, D-317, D-321 |
| `stump` | grows back into a tree | | where a tree was felled | D-317 |
| `branch` | 2 bumps: 2 Wood | 900 | 1 in each woods room | D-316 |
| `deposit` | 3 bumps: 1 Stone | 900 | 3 in each Cave room | D-311, D-312 |
| `bench` | the workbench's panel | | set down on the surface | D-320, D-322, D-323 |
| `stash` | a chest's 12 slots | | set down on the surface | D-325, D-330, D-340 |

## Lights (`src/core/lights.js`)

| id | What it does | Where | Decisions |
| --- | --- | --- | --- |
| `torch` | lights 3 tiles around, flickering | the first rooms; by the stairs up in generated rooms | D-121, D-149 |
| `unlitTorch` | lit for good by walking into its wall | the first rooms | D-121, D-122 |

## Places (`src/core/room.js`)

| Place | What it is | Decisions |
| --- | --- | --- |
| `first`, `second`, `south` | the hand-made rooms of the crypt | D-106, D-138, D-192 |
| `woods` | the surface's generated woods rooms | D-209, D-233 |
| generated depths | Crypt (1), Cave (2 to 4), Warren (5 to 7), Dungeon (8 on) | D-147, D-233, D-354 |

Regions: Hearthwood, the starting region (D-348, `docs/regions/`).

## The hero's looks (`src/core/looks.js`)

6 cloaks, 6 eyes, 6 trims and 4 clothes; their names are in
`GLOSSARY.md` (D-275 to D-278, D-289).
