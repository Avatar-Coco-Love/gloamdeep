# Sounds

Every sound the game needs, one line each (D-773). It grows with the
game: a step that adds a moment worth hearing adds its line here. The
sounds come from files, a free pack first (Kenney's, which needs no
credit). Each sound is silent until its file is in; the footstep is
the first (D-774), the lantern's click the second (D-775), the steps
below the third (D-776), the fight's hit and beaten the fourth (D-777), the menus the fifth (D-819), the bag's the sixth (D-820), digging and chests the seventh (D-825), home's the eighth (D-828), the lantern and the light the ninth, the first from the elemental pack (D-830), the fight's rest the tenth (D-831), the creatures' bites the eleventh, all under one line, Bites (D-832), and the rest the twelfth, Claude's picks by the owner's go-ahead (D-833). Settings' Loudness turns every sound up or down together (D-822), and each of four kinds has its own share of it: Steps (Moving, and the lantern and the light), Fighting (and Creatures), Finds (the bag and home, digging and chests, and Places) and Menus (D-823). Each heard sound can be turned On or Off on its own, in a list opened from its kind's line (D-824).

**How a line reads.** *Name*: the sound's name in the code, where it
has one (`src/render/sound.js`). *When*: the moment it plays. *Feel*:
what it should sound like, a first guess for the owner to change.
*File*: the file picked, its pack and licence, or `—` while none is.
A sound goes in only after the owner hears it on the sound board
(D-256).

**Packs on hand** (`sounds/packs/`; the game plays from Kenney's Impact
Sounds, RPG Audio and Interface Sounds, and the elemental pack, so far; each folder keeps its `License.txt`). All six are CC0 (no credit needed),
`.ogg` files: four of Kenney's, one of ObsydianX's (itch.io), whose
222 tones were cut of their silence when saved, nothing else changed,
and MorphonautAudio's Elemental Forces (itch.io, bought by the owner,
D-829), saved from WAV, nothing else changed:

| Folder | Files | Good for |
| --- | --- | --- |
| `kenney-impact-sounds` | 130 | footsteps on many grounds, hits, thuds |
| `kenney-rpg-audio` | 52 | cloth, coins, books, doors, metal, footsteps |
| `kenney-interface-sounds` | 100 | menus: open, close, back, error |
| `kenney-ui-audio` | 52 | menus: clicks and switches |
| `obsydianx-interface-sfx-1` | 222 | menus: clean electronic tones; confirm, back, error (5 or 6 styles, 7 each, plain and echo) and cursor (5) |
| `morphonaut-elemental-forces` | 134 | fire, water, earth, wind: crackles, whooshes, splashes, rumbles, gusts; in `Earth` (29), `Fire` (35), `Water` (40) and `Wind` (30) |

## Moving

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `footstep` | the hero walks a tile on the surface (D-774) | soft, light, never two alike | `kenney-impact-sounds/footstep_grass_000` to `004`, at a quarter loudness, CC0 |
| `stoneStep` | the hero walks below: the crypt, rock caves, dungeon halls (D-776) | stone, with a faint echo off the walls | `kenney-impact-sounds/footstep_concrete_000` to `004`, at a tenth loudness, a 0.09 s echo, CC0 |
| `earthStep` | the hero walks in the burrows, floors 5 to 7 (D-776) | soft packed earth | the grass files, muffled above 1400 Hz, at a quarter loudness, CC0 |
| `fall` | the hero falls (D-119, D-833) | a slide and a thud | the elemental pack's `Earth-017`, 0.7 s, fading 0.3 s, at 0.47, then `impactPunch_heavy_000` to `004` at 0.8, muffled above 700 Hz, at 0.3, 0.55 s in, CC0 |
| `wake` | the hero wakes after a fall, at its deepest dark (D-833) | a groan or a breath; no pack has a voice, so a breath | `Wind-002` at 0.85, 1.2 s, fading 0.6 s, muffled above 1200 Hz, at 0.42, CC0 |
| `floor` | a new floor reached (D-833) | a low, far rumble | `Earth-024` at 0.8, 2 s, fading 1.2 s, muffled above 600 Hz, at 0.22, CC0 |
| `room` | a room never stood in before (D-245, D-833), not on a new floor | a small, quiet note | `kenney-interface-sounds/glass_001` at 0.8, at 0.12, CC0 |

## The lantern and the light

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `lantern` | the lantern goes on, by hand or by itself (D-775) | a metal click, higher | `kenney-rpg-audio/metalClick`, 12% higher, at half loudness, CC0 |
| `lantern` | the lantern goes off, by hand or by itself (D-775) | the same click, lower | `kenney-rpg-audio/metalClick`, 11% lower, at half loudness, CC0 |
| `pour` | a flask poured, by hand or by itself (D-249, D-830); a minnow is silent | oil glugging into glass | the elemental pack's `Water-027`, at 0.47, CC0 |
| `sputter` | the oil falls under 20%, with "The flame is getting low." (D-096, D-834) | the flame sputtering | `Fire-017`: from 0.78 s, 0.25 s, fading 0.1 s, at 0.92 pitch, at 0.24; again 0.32 s later, 0.22 s at 0.85 and 0.17, CC0 |
| `gutter` | the oil runs out (D-830) | a flame guttering out | `Fire-017`, a crackle: 1.3 s, fading 1 s, sliding to 0.7, at 0.22, CC0 |
| `torch` | a torch lit (D-121, D-830) | a whoosh of fire | `Fire-030`: from 0.1 s, 1.2 s, fading 0.5 s, at 0.24, CC0 |
| `kindle` | cold ashes lit into a campfire (D-757, D-830) | a whoosh, then crackling | `Fire-021`: from 0.18 s, 2.4 s, fading 0.9 s, at 0.27, CC0 |

## Fighting

In `SOUNDS-2.md`, moved word for word at 0.3.278.

## Creatures

Their bites and their own sounds are in `SOUNDS-3.md` (moved there from `SOUNDS-2.md` at 0.3.279).

## Finds, the bag and home

In `SOUNDS-2.md`, moved word for word at 0.3.279.

## Places

Their sounds are in `SOUNDS-2.md`, moved word for word at 0.3.272,
the fourteenth audit (D-826), with "Maybe" and "Later"; then in `SOUNDS-3.md`, moved word for word at 0.3.279.

## Menus and screens

In `SOUNDS-2.md`, moved word for word at 0.3.277.

## Maybe and Later

In `SOUNDS-2.md` (D-826).
