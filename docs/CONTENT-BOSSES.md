# Content: bosses

`CONTENT.md`'s creature table continued for the bosses, one per biome
(D-463, D-643), as that page neared 8 KB. Same columns; the code and the
decisions win where they disagree.

## Bosses (`src/core/enemies.js`, ways in `behaviours.js`)

| id | Hearts | Bite | Ways | Where | Decisions |
| --- | --- | --- | --- | --- | --- |
| `lampeater` | 8 | 2 | biome 1's boss: `darkOnly`, it moves a tile a turn only over dark tiles, seeing the hero along a clear line, lit or not, backs out of light, and drifts back to its first tile when it loses them; it bites only in the dark; light falling on it, it is `caught`, held for its next turn, then backs away, drawn `burns`; caught with no dark tile beside it (only the lantern's light can it back through), it is pinned its `pins` (2) more turns, then bursts free across the light toward the nearest dark; waiting in the dark beside a tile the lantern lights, seeing the hero, lantern lit, it drinks its `edgeDrinks` (1/60, 1 turn's oil) a turn, never while caught, drawn with a thread of light into its mouth, the tick's sip and the oil bar's flicker (`edgedrink.js`): paled, white-hot eyes, a ring of flame; blows hurt it only while lit, else they `sink` into it, hurting nothing, with its line, no flash (the swing's puff plays); a sting, glob or slam always sinks, and the Fist knocks it nowhere; look A, the pool: a low mound of gloam with a dripping edge, a dark mouth, pink eyes that glow over the dark in a faint violet haze (`eyesGlow`); how to fight it opens after 1 beaten | depth 8's arena only (`arena.js`), one tile below the tile before the sealed door | D-939, D-941, D-943, D-944, D-945, D-946 |
