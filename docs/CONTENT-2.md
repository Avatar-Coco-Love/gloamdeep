# Content, part 2

`CONTENT.md` continued, under its rules: one row each, with where it
turns up and the decisions behind it. The hero's looks and Growth
upgrades moved here word for word at 0.2.204 (D-490), as that page
neared 8 KB; the lights and places at 0.3.3 (D-531).

## People (`src/core/people.js`)

| id | What it does | Where | Decisions |
| --- | --- | --- | --- |
| `peddler` | trapped in a ring of rubble; calls out when it is bumped or dug, then cheers the digging on; a heap straight beside him cleared, not a corner, thanks the hero and stays, talking when bumped, and goes home 5 turns after, or 3 after a bump, or when the hero leaves the room, in a lantern beam; beams in at home beside the woods' middle when the hero next comes, greets the hero once within 2 tiles, with his own lines, and his card opens to sell to him: each common creature material 1 coin, each rare one 5 (`sells`); his Buy tab sells a flask for 3 coins and a torch for 2, never running out (`wares`); stands still, facing forward, and turns to face the hero within 2 tiles, not in his column | one room of depth 3 the seed picks; freed, the woods | D-470, D-471, D-490, D-491, D-492, D-494, D-495, D-496, D-497, D-498, D-501 |

## The hero's looks (`src/core/looks.js`)

6 cloaks, 6 eyes, 6 trims and 4 clothes; their names are in
`GLOSSARY.md` (D-275 to D-278, D-289).

## Growth upgrades (`src/core/upgrades.js`)

Bought with embers on the Journal's Growth tree (D-462, D-481): Light,
Body and Hands. Body: Heart, one more heart, up to 5 (D-293). Light and
Hands: none yet.

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
