# Content, part 5

`CONTENT.md` continued, under its rules. Tiles added once `CONTENT-4.md`
neared 8 KB (0.3.412).

## Tiles, continued again (`src/core/tiles.js`)

| id | What it does | Grows back | Where | Decisions |
| --- | --- | --- | --- | --- |
| `archway` | Archway: a round-topped opening in the wall, dark all the way in, its stone rim a shade lighter; walked onto, it goes through, as stairs do, "You go through the archway.", to the room beyond a Leap gap and back, the hero arriving on the other side's Archway | | in the corner past each Leap gap, depths 5 to 8: one wall tile beside the corner only, on the room's outer edge where it can be (about 2 gaps in 3), farthest from the Gap (`beyond.js`); in the room beyond, the middle of the edge facing back | D-970 |

## Places, continued
| id | What it is | Where | Decisions |
| --- | --- | --- | --- |
| a gap room's id with `/beyond` | the room beyond a Leap gap: one cell big, walls round an empty floor, in the floor's own look, off the floor's grid; for now nothing in it (its look, creatures, finds and more rooms are later steps, D-969); on the map, the hero in it shows at the gap room's Archway | through the Archway past each Leap gap, depths 5 to 8 | D-969, D-970 |
