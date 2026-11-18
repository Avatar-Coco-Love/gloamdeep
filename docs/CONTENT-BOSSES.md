# Content: bosses

`CONTENT.md`'s creature table continued for the bosses, one per biome
(D-463, D-643), as that page neared 8 KB. Same columns; the code and the
decisions win where they disagree.

## Bosses (`src/core/enemies.js`, ways in `behaviours.js`)

| id | Hearts | Bite | Ways | Where | Decisions |
| --- | --- | --- | --- | --- | --- |
| `lampeater` | 12 | 2 | biome 1's boss: `darkOnly`, it moves a tile a turn only over dark tiles, seeing the hero along a clear line, lit or not, backs out of light, and drifts back to its first tile when it loses them; it bites only in the dark; light falling on it, it is `caught`, held for its next turn, then backs away, drawn `burns`; caught with no dark tile beside it (only the lantern's light can it back through), it is pinned its `pins` (2) more turns, then bursts free across the light toward the nearest dark; waiting in the dark beside a tile the lantern lights, seeing the hero, lantern lit, it drinks its `edgeDrinks` (1/60, 1 turn's oil) a turn, never while caught, drawn with a thread of light into its mouth, the tick's sip and the oil bar's flicker (`edgedrink.js`): paled, white-hot eyes, a ring of flame; blows hurt it only while lit, else they `sink` into it, hurting nothing, with its line, no flash (the swing's puff plays); a sting, glob or slam always sinks, and the Fist knocks it nowhere; look A, the pool: a low mound of gloam with a dripping edge, a dark mouth, pink eyes that glow over the dark in a faint violet haze (`eyesGlow`); how to fight it opens after 1 beaten; beaten, it leaves Leap's find where it fell (`sure`, `leapFind`, D-992), the door staying sealed till that is stepped on and its card closed, then sinking open, the seal stones standing, no floor giving way (D-967; the Gap, its crumble, shake and sound kept unused), and its gloamlings crumble; while it comes for the hero, chasing, not caught, its `flankers` (gloamlings) take the free tiles beside the hero, leaving the side nearest it open (`flank.js`, D-973); left unbeaten, by a doorway or a fall, it is whole again (`beaten.js`); the first seal of a journey plays its cutscene, its eyes flaring (`render/cutscene.js`, D-957); while sealed, its name and a pink-to-violet bar of its hearts, bottom middle (`render/bossbar.js`, D-959) | depth 8's arena only (`arena.js`), one tile below the tile before the sealed door; with it, a gloamling beside each of the 4 braziers, on its outer side, the arena's own (`startingBrood`, D-971) | D-939, D-941, D-943, D-944, D-945, D-946, D-947, D-950, D-953, D-957, D-959, D-963, D-964, D-965, D-967, D-971, D-972, D-973, D-974, D-976, D-977, D-978, D-992 |

## The Lampeater's fight, its later steps (H-84)
Its hearts went 8 to 12 (D-950). Its entry's `snuffs` and `calls` hold
the numbers; the code wins.
- **Phases and snuffing** (`snuff.js`; D-947, D-978): at 8 and 4 of its
  12 hearts it owes a snuff; free, in the dark, it breathes on the lit
  brazier nearest it, the flame shuddering 2 turns; then it is cold, a
  plain brazier lit again as ever. Caught, the breath stops and waits.
  With none lit when free, the phase is spent. These replace the
  half-hearts snuff and the snuff after each catch.
- **Brood** (`brood.js`): a snuffed bowl keeps a gloamling that crawls
  out onto a dark free tile beside it, while fewer than 6 are out.
- **Calls** (`call.js`; D-972, D-974): struck and free again, it walks
  through the dark beside the nearest cold brazier and calls a gloamling
  out of it over 2 turns; caught, the call stops; that brazier lit, it
  turns to another. After a phase, from another cold brazier than the
  one snuffed. At most 6 gloamlings, those waiting in a bowl counted.
- **Guards** (`guarding.js`; D-976): only while 6 are alive, the 2
  nearest it hold its shoulders, front and back left open.
- **Wary** (`wary.js`; D-977): struck and free with no cold brazier it
  can reach, or 6 alive, it keeps 3 turns to the dark just past the
  lantern's reach, drinking at the edge, its eyes dimmed.
- Owing or breathing, it neither calls nor is wary.

## Before a second boss (H-102)
The Lampeater's rules find it by its id, `'lampeater'`, in 5 files:
`beaten.js` (`BOSS`), `arena.js`, `bossbench.js`, `main.js` (its bar and
tune) and `render/frame.js` (its glow in the cutscene); `fixups/oldarena.js`
too. TECH.md wants registry data, not special cases, so when a second boss
is planned, its first step gives each boss a `boss` field in `enemies.js`
and these read that instead (D-983).

