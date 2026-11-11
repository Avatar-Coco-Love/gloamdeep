# Sounds

Every sound the game needs, one line each (D-773). It grows with the
game: a step that adds a moment worth hearing adds its line here. The
sounds come from files, a free pack first (Kenney's, which needs no
credit). Each sound is silent until its file is in; the footstep is
the first (D-774), the lantern's click the second (D-775), the steps
below the third (D-776), the fight's hit and beaten the fourth (D-777), the menus the fifth (D-819), the bag's the sixth (D-820), digging and chests the seventh (D-825). Settings' Loudness turns every sound up or down together (D-822), and each of four kinds has its own share of it: Steps (Moving, and the lantern and the light), Fighting (and Creatures), Finds (the bag and home, digging and chests, and Places) and Menus (D-823). Each heard sound can be turned On or Off on its own, in a list opened from its kind's line (D-824).

**How a line reads.** *Name*: the sound's name in the code, where it
has one (`src/render/sound.js`). *When*: the moment it plays. *Feel*:
what it should sound like, a first guess for the owner to change.
*File*: the file picked, its pack and licence, or `—` while none is.
A sound goes in only after the owner hears it on the sound board
(D-256).

**Packs on hand** (`sounds/packs/`; the game plays from Kenney's Impact
Sounds, RPG Audio and Interface Sounds so far; each folder keeps its `License.txt`). All five are CC0 (no credit needed),
`.ogg` files: four of Kenney's and one of ObsydianX's (itch.io), whose
222 tones were cut of their silence when saved, nothing else changed:

| Folder | Files | Good for |
| --- | --- | --- |
| `kenney-impact-sounds` | 130 | footsteps on many grounds, hits, thuds |
| `kenney-rpg-audio` | 52 | cloth, coins, books, doors, metal, footsteps |
| `kenney-interface-sounds` | 100 | menus: open, close, back, error |
| `kenney-ui-audio` | 52 | menus: clicks and switches |
| `obsydianx-interface-sfx-1` | 222 | menus: clean electronic tones; confirm, back, error (5 or 6 styles, 7 each, plain and echo) and cursor (5) |

## Moving

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `footstep` | the hero walks a tile on the surface (D-774) | soft, light, never two alike | `kenney-impact-sounds/footstep_grass_000` to `004`, at a quarter loudness, CC0 |
| `stoneStep` | the hero walks below: the crypt, rock caves, dungeon halls (D-776) | stone, with a faint echo off the walls | `kenney-impact-sounds/footstep_concrete_000` to `004`, at a tenth loudness, a 0.09 s echo, CC0 |
| `earthStep` | the hero walks in the burrows, floors 5 to 7 (D-776) | soft packed earth | the grass files, muffled above 1400 Hz, at a quarter loudness, CC0 |
| | the hero falls (D-119) | a slide and a thud | — |
| | the hero wakes after a fall | a groan or a breath | — |
| | a new floor reached | a low, far rumble | — |
| | a room never stood in before (D-245) | a small, quiet note | — |

## The lantern and the light

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `lantern` | the lantern goes on, by hand or by itself (D-775) | a metal click, higher | `kenney-rpg-audio/metalClick`, 12% higher, at half loudness, CC0 |
| `lantern` | the lantern goes off, by hand or by itself (D-775) | the same click, lower | `kenney-rpg-audio/metalClick`, 11% lower, at half loudness, CC0 |
| | a flask poured, by hand or by itself (D-249) | oil glugging into glass | — |
| | the oil runs out | a flame guttering out | — |
| | a torch lit (D-121) | a whoosh of fire | — |
| | cold ashes lit into a campfire (D-757) | a whoosh, then crackling | — |

## Fighting

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `hit` | the hero hits with the lantern (D-777) | a dull knock | `kenney-impact-sounds/impactPunch_medium_000` to `004`, at a quarter loudness, CC0 |
| `hit` | the hero hits with the knife or spear (D-777) | a quick slice | `kenney-rpg-audio/knifeSlice` and `knifeSlice2`, at a quarter loudness, CC0 |
| | the hero, stiff, swings and misses (D-759) | a swish through air | — |
| `beaten` | a creature is beaten (D-777) | a short fall or crumple, 0.12 s after the hit | `kenney-impact-sounds/impactSoft_heavy_000` to `004`, at a quarter loudness, CC0 |
| | the hero is hurt (any bite) | a small gasp | — |
| | poison takes a heart (D-654) | a sick, low pulse | — |
| | a level reached (D-246) | a short rising note | — |

## Creatures

Their bites and their own sounds are in `SOUNDS-2.md`.

## Finds, the bag and home

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `pat` | an item goes into the bag, unless it is a fish with its splash (D-820) | a soft pat of cloth | `kenney-rpg-audio/cloth1` to `cloth4`, at a third loudness, CC0 |
| | a herb, heartcap or potion eaten (D-308) | a crunch, or a drink | — |
| `draw` | a weapon goes from the bag into the hand (D-479, D-820) | a light metal scrape | `kenney-rpg-audio/drawKnife3`, at 0.82, CC0 |
| `thunk` | a tile set down from the bag (WB2, D-820) | a wooden thunk | `kenney-impact-sounds/impactWood_medium_000` to `004`, at a quarter loudness, CC0 |
| `clink` | a deposit, copper vein or rubble bumped, not its last bump (O2, D-825) | a pick on stone | `kenney-impact-sounds/impactMining_000` to `004`, at a quarter loudness, the cave's echo, CC0 |
| `crumble` | its last bump breaks it (O2, D-825) | stone cracking apart, small stones tumbling | the mining files a quarter lower at 0.35, then three of `footstep_concrete_000` to `004`, a fifth higher at 0.12, 0.12 s, 0.22 s and 0.34 s after, the cave's echo, CC0 |
| | a person freed from the rubble (D-491) | stones tumbling away | — (the rubble's `crumble` plays) |
| | a person leaves for home, or arrives (D-496) | a soft shimmer | — |
| | an item sold at home (D-494) | coins | — |
| | a seed planted (D-566) | soft earth | — |
| | Bat Guano fed to a sprout (D-569) | a soft pat of earth | — |
| | a relic set on the shelf (D-693) | wood on wood | — |
| | something made at a bench or in the bag | tools at work | — |
| `chest` | a stash chest opened, its page turning 0.3 s later (D-825) | a creaking lid | `kenney-rpg-audio/creak1`, at half loudness, CC0 |
| `chest` | a stash chest closed, 0.1 s after its page (D-825) | a wooden knock | `kenney-impact-sounds/impactWood_heavy_000` to `004`, at a quarter loudness, CC0 |

## Places

Their sounds are in `SOUNDS-2.md`, moved word for word at 0.3.272,
the fourteenth audit (D-826), with "Maybe" and "Later".

## Menus and screens

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `tap` | a button tapped, off play, changing something on the same card (D-819) | a tiny soft tick | `kenney-interface-sounds/tick_002`, at an eighth loudness, CC0 |
| `card` | a card opens, or closes (D-819) | a page turning | `kenney-rpg-audio/bookFlip3` to open, `bookFlip2` to close, at 0.38 and 0.58, CC0 |
| `refuse` | a dim pick that can't be done (D-819) | a low, dull tock | `kenney-impact-sounds/impactWood_light_000`, a quarter lower, at a quarter loudness, CC0 |
| | the run ends | a slow falling tone | — |

## Maybe and Later

In `SOUNDS-2.md` (D-826).
