# Content: bosses

`CONTENT.md`'s creature table continued for the bosses, one per biome
(D-463, D-643), as that page neared 8 KB. Same columns; the code and the
decisions win where they disagree.

## Bosses (`src/core/enemies.js`, ways in `behaviours.js`)

| id | Hearts | Bite | Ways | Where | Decisions |
| --- | --- | --- | --- | --- | --- |
| `lampeater` | none yet (step 4) | 0 | biome 1's boss: `darkOnly`, it moves a tile a turn only over dark tiles, seeing the hero along a clear line, lit or not, backs out of light, and drifts back to its first tile when it loses them; no bite yet (step 4); every blow, sting, glob or slam `sinks` into it, hurting nothing, with its line, and a hit doesn't flash (the swing's puff plays); look A, the pool: a low mound of gloam with a dripping edge, a dark mouth, pink eyes that glow over the dark in a faint violet haze (`eyesGlow`); how to fight it opens after 1 beaten | depth 8's arena only (`arena.js`), one tile below the tile before the sealed door | D-939, D-941, D-943 |
