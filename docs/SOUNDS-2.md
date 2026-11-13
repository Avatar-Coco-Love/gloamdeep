# Sounds 2

The creatures' sounds, moved word for word from `SOUNDS.md` at 0.3.266
to keep it under 8 KB. Each line reads as the lines there do. Places,
"Maybe" and "Later" followed at 0.3.272, the fourteenth audit (D-826),
word for word. Menus and screens followed at 0.3.277, word for word, and Fighting at
0.3.278. Finds, the bag and home followed at 0.3.279, word for word, and
the creatures and places went on to `SOUNDS-3.md`.

## Fighting

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `hit` | the hero hits with the lantern (D-777) | a dull knock | `kenney-impact-sounds/impactPunch_medium_000` to `004`, at a quarter loudness, CC0 |
| `hit` | the hero hits with the knife or spear (D-777) | a quick slice | `kenney-rpg-audio/knifeSlice` and `knifeSlice2`, at a quarter loudness, CC0 |
| `hit` | the hero hits with the Warden's Fist (D-888) | a knock of stone, the warden's own | `kenney-impact-sounds/impactMining_000` to `004`, at 0.7, at a quarter loudness, CC0 |
| `miss` | the hero, stiff, swings and misses (D-759, D-831) | a swish through air | the elemental pack's `Wind-012` to `014`, at 0.55, CC0 |
| `beaten` | a creature is beaten (D-777) | a short fall or crumple, 0.12 s after the hit | `kenney-impact-sounds/impactSoft_heavy_000` to `004`, at a quarter loudness, CC0 |
| `hurt` | the hero is hurt: a bite or a glob takes a heart, a moment after the hero's swing (D-831) | a small gasp; no pack has a voice, so a blow | `kenney-impact-sounds/impactPunch_heavy_000` to `004`, a tenth lower, muffled above 900 Hz, at 0.32, CC0 |
| `poison` | poison takes a heart (D-654, D-831) | a sick, low pulse | the same punch at 0.6 pitch, muffled above 400 Hz, at 0.36, then at 0.57 and 0.26, 0.35 s later, CC0 |
| `heartbeat` | a turn leaves the hero on the last heart, from more (D-835) | a soft lub-dub, twice | `impactSoft_medium` 001 then 002 at 0.8 and 0.74, muffled above 350 Hz, 0.17 s apart, at 0.36 and 0.25; again 0.8 s later at 0.25 and 0.17; 0.7 s after the blow or the throb, CC0 |
| `rise` | a level reached (D-246, D-831), after the beaten thud | a short rising note | `kenney-impact-sounds/impactGlass_light_000` to `002` at 1, 1.26 and 1.5, 0.11 s apart, at 0.2 to 0.16, 0.55 s late, CC0 |

## Finds, the bag and home

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `pat` | an item goes into the bag, unless it is a fish with its splash (D-820) | a soft pat of cloth | `kenney-rpg-audio/cloth1` to `cloth4`, at a third loudness, CC0 |
| `eat` | a herb, heartcap or potion eaten (D-308, D-833) | a crunch, or a drink | a crunch: `footstep_snow_000` to `004` at 1.3, at 0.24, then at 1.4, at 0.2, 0.14 s later; a potion: `Water-039` at 0.9, 0.7 s, fading 0.3 s, at 0.45, CC0 |
| `draw` | a weapon goes from the bag into the hand (D-479, D-820) | a light metal scrape | `kenney-rpg-audio/drawKnife3`, at 0.82, CC0 |
| `thunk` | a tile set down from the bag (WB2, D-820) | a wooden thunk | `kenney-impact-sounds/impactWood_medium_000` to `004`, at a quarter loudness, CC0 |
| `clink` | a deposit, copper vein or rubble bumped, not its last bump (O2, D-825) | a pick on stone | `kenney-impact-sounds/impactMining_000` to `004`, at a quarter loudness, the cave's echo, CC0 |
| `crumble` | its last bump breaks it (O2, D-825) | stone cracking apart, small stones tumbling | the mining files a quarter lower at 0.35, then three of `footstep_concrete_000` to `004`, a fifth higher at 0.12, 0.12 s, 0.22 s and 0.34 s after, the cave's echo, CC0 |
| | a person freed from the rubble (D-491) | stones tumbling away | — (the rubble's `crumble` plays) |
| `chop` | a tree bumped, not its last bump (W3, D-842); under Digging's line | an axe biting into wood | `kenney-rpg-audio/chop`, at 0.2, its pitch straying 0.08, CC0 |
| `treeFall` | its last bump fells it (W3, D-842); under Stone breaks' line | a last chop, then a heavy thud (D-846) | the chop at 0.22, then `impactWood_heavy_000` to `004` at their own pitch, at 0.4, muffled above 2500 Hz, 0.5 s after, CC0 |
| | a fallen branch bumped, not its last bump (W2, D-843) | the same chop | — (the tree's `chop` plays) |
| `branchSnap` | its last bump snaps it (W2, D-843); under Stone breaks' line | a last chop, a light knock | the chop at 0.2, its pitch straying 0.06, then `impactWood_light_000` to `004` at 0.3, 0.12 s after, CC0 |
| `shimmer` | a person leaves for home, or arrives (D-496, D-833) | a soft shimmer | `impactGlass_light_000` to `002` at 1.6, 1.8 and 2, 0.07 s apart, at 0.1 to 0.08, CC0 |
| `coins` | an item sold at home (D-494, D-828), not the tick | coins | `kenney-rpg-audio/handleCoins`, at a quarter loudness, CC0 |
| `sow` | a seed planted (D-566, D-828) | soft earth | the earth step's files, twice, 0.13 s apart, at a quarter, then 0.2, CC0 |
| `feed` | Bat Guano fed to a sprout (D-569, D-828) | a soft pat of earth | the bag's `pat` files, muffled above 1400 Hz, at a third, CC0 |
| `shelf` | a relic set on the shelf (D-693, D-828) | wood on wood | `kenney-rpg-audio/bookPlace1` to `3`, at a quarter loudness, CC0 |
| `tools` | something made at a bench or in the bag (D-833) | tools at work | two of `impactMetal_light_000` to `004`, 0.16 s apart, at 0.2, then `impactWood_medium_000` to `004` at 0.22, 0.34 s in, CC0 |
| `chest` | a stash chest opened, its page turning 0.3 s later (D-825) | a creaking lid | `kenney-rpg-audio/creak1`, at half loudness, CC0 |
| `chest` | a stash chest closed, 0.1 s after its page (D-825) | a wooden knock | `kenney-impact-sounds/impactWood_heavy_000` to `004`, at a quarter loudness, CC0 |

## Creatures (their bites and their own sounds)

In `SOUNDS-3.md`, moved word for word at 0.3.279.

## Menus and screens

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `tap` | a button tapped, off play, changing something on the same card (D-819) | a tiny soft tick | `kenney-interface-sounds/tick_002`, at an eighth loudness, CC0 |
| `card` | a card opens, or closes (D-819) | a page turning | `kenney-rpg-audio/bookFlip3` to open, `bookFlip2` to close, at 0.38 and 0.58, CC0 |
| `refuse` | a dim pick that can't be done (D-819); a "You can't carry more" line (D-833) | a low, dull tock | `kenney-impact-sounds/impactWood_light_000`, a quarter lower, at a quarter loudness, CC0 |
| `ended` | the run ends, a Hardcore fall's "Your journey ends." (D-833) | a slow falling tone | `impactBell_heavy_001` at 0.8 sliding to 0.5, 2.6 s, fading 1.6 s, muffled above 1500 Hz, at 0.3, CC0 |

## Places

In `SOUNDS-3.md`, moved word for word at 0.3.279.

## Maybe (for the owner to pick)

None of these is decided (Q-095): steps on more grounds (water,
wood; a wood step is picked, D-774: the grass files at a quarter
loudness, muffled, with the bright crack filtered off above 1400 Hz,
the same as the burrows' earth, D-776); sounds all around, such as wind on the
surface, birds by day, crickets at night, drips in caves; music. All
are wanted, one step each (D-834): sounds all around next, then music.
A cave's drips came first, in `SOUNDS-3.md`'s Places (D-836); music began on the surface, in `SOUNDS-3.md`'s Music (D-837), each other place its own step. The oil's warning is in `SOUNDS.md` (D-834),
the heartbeat at the last heart in the fight's table above (D-835).

## Later (decided, not yet built)

Each comes with its own step: the night creatures (D-760) and day
creatures (D-771), the alchemy station (D-771), and the bow (D-772).
