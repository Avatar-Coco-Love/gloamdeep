# Content, part 5

`CONTENT.md` continued, under its rules. Tiles added once `CONTENT-4.md`
neared 8 KB (0.3.412); its own tiles moved here word for word at 0.3.422
(D-981), as it neared 8 KB again.

## Tiles, continued (`src/core/tiles.js`)
Tiles added once `CONTENT-3.md` neared 8 KB (0.3.337).

| id | What it does | Grows back | Where | Decisions |
| --- | --- | --- | --- | --- |
| `brazier` | a vault's cold brazier: a crypt-stone fire bowl on a foot, its violet band dark, old ash in the bowl; solid, light passing over it. Bumped with the lantern out, it says "A cold stone brazier.", then "Old ash lies in its bowl.", a sentence a bump, free; with it lit, the text line says the first and the card asks "Light the brazier?" over the second, Yes grey with less than 5 turns' oil, lighting it for 5 turns' oil and a turn: "The brazier catches." | | 2 in each vault (`vault.js`) | D-891, D-892, D-893 |
| `brazierLit` | a lit brazier: its violet band bright, coals in the bowl, the torch's flame swaying over them in 3 frames; solid, light passing over it, lighting 2 tiles round it in the torch's warm colour, as a campfire's embers. Bumped, it says "A brazier, burning.", then "Its flame burns steady.", free | | where a brazier was lit | D-893 |
| `sealedDoor` | a vault's sealed door: a stone slab in the wall's face, a flame rune cut in it, a dark notch on the lintel above it for each brazier, glowing violet for each lit, the left first; solid, blocking light. Bumped, it says "A sealed stone door.", then "A flame rune is cut into it.", free. Left with a brazier still cold, its lit braziers go cold again, the oil spent | | in the middle of each vault's inner wall (`vault.js`) | D-891, D-892, D-893, D-895 |
| `openDoor` | Open door: the sealed door once both braziers burn, the slab sunk away, the doorway fully open and dark, a worn line where it sank, both notches glowing on the lintel; walked through, light passing; open for good, the braziers lit. "The stone door sinks open." in the last brazier's line's place | | where a vault's sealed door was | D-895 |
| `plinth`, `plinthEmber` | a small crypt-stone plinth with the brazier's dark violet band at the vault's heart, its prize on its top; solid, light passing over it. The prize the seed draws (`prizeOf`): 1 vault in 4 an ember, its own tile, glowing faintly 1 tile round in the torch's warm colour; else 2 of one of the 7 rare materials, all alike. Bumped, the prize is taken, a turn (`prize.js`): an ember 1 more for Growth, "An ember! Spend it in Growth."; a material into the bag, its own take line, or with no room for both, nothing, the bag's full line, free | never | at the vault's heart, behind its door | D-896 |
| `plinthBare` | the plinth, its prize taken. Bumped, it says "A bare stone plinth.", then "Something rested here once.", free | | where the prize was taken | D-896 |
| `pillar` | a round column in the crypt's stone, its cap and foot wider than its shaft; solid, casting a shadow as a wall does | | 4 round the arena's middle; every other tile along the hallway's sides (`arena.js`) | D-940 |
| `sealStone` | the Lightkeepers' old seal: a floor slab with the sealed door's flame rune cut in it in dark violet; walked on as floor | | ringing the arena's stairs down; down the middle of its hallway (`arena.js`) | D-940 |
| `gap` | where the floor gave way: a black drop, its far face and ragged edge below standing ground; solid but low, so leapt over, light passing | | a line before one dead end's cache a floor, depths 5 to 8 (`leapgap.js`); in a save kept from before, the arena's seal stones (`beaten.js`) | D-963, D-968 |

## Tiles, continued again (`src/core/tiles.js`)

| id | What it does | Grows back | Where | Decisions |
| --- | --- | --- | --- | --- |
| `archway` | Archway: a round-topped opening in the wall, dark all the way in, its stone rim a shade lighter; walked onto, it goes through, as stairs do, "You go through the archway.", to the room beyond a Leap gap and back, the hero arriving on the other side's Archway | | in the corner past each Leap gap, depths 5 to 8: one wall tile beside the corner only, on the room's outer edge where it can be (about 2 gaps in 3), farthest from the Gap (`beyond.js`); in the room beyond, the middle of the edge facing back | D-970 |

## Places, continued
| id | What it is | Where | Decisions |
| --- | --- | --- | --- |
| a gap room's id with `/beyond` | the room beyond a Leap gap: one cell big, walls round an empty floor, in the floor's own look, off the floor's grid; for now nothing in it (its look, creatures, finds and more rooms are later steps, D-969); on the map, the hero in it shows at the gap room's Archway | through the Archway past each Leap gap, depths 5 to 8 | D-969, D-970 |
