# Sounds

Every sound the game needs, one line each (D-773). It grows with the
game: a step that adds a moment worth hearing adds its line here. The
sounds come from files, a free pack first (Kenney's, which needs no
credit). Each sound is silent until its file is in; the footstep is
the first (D-774), the lantern's click the second (D-775).

**How a line reads.** *Name*: the sound's name in the code, where it
has one (`src/render/sound.js`). *When*: the moment it plays. *Feel*:
what it should sound like, a first guess for the owner to change.
*File*: the file picked, its pack and licence, or `—` while none is.
A sound goes in only after the owner hears it on the sound board
(D-256).

**Packs on hand** (`sounds/packs/`, not yet played by the game; each
folder keeps its `License.txt`). All five are CC0 (no credit needed),
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
| `hit` | the hero hits with the lantern | a dull knock | — |
| `hit` | the hero hits with the knife | a quick slice | — |
| | the hero, stiff, swings and misses (D-759) | a swish through air | — |
| | a creature is beaten | a short fall or crumple | — |
| | the hero is hurt (any bite) | a small gasp | — |
| | poison takes a heart (D-654) | a sick, low pulse | — |
| | a level reached (D-246) | a short rising note | — |

## Creatures (their bites and their own sounds)

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `teeth` | a rat bites; a centipede bites | small sharp teeth | — |
| | rats in a pack call out (D-767) | squeaks together | — |
| | a gloamling bites (silent until now) | — | — |
| | a lampmoth bites (silent until now) | a papery flutter | — |
| `glass` | a flask mimic bites | a clink and a snap | — |
| | a flask mimic or herb mimic wakes (silent until now, D-368) | a jolt | — |
| `sting` | a scorpion stings | two clicks and a stab | — |
| | a scorpion raises its tail | a dry rattle | — |
| `hiss` | a cave spider bites | a soft hiss and a click | — |
| `squeak` | a bat bites | a chirp and a flap | — |
| `snuffle` | a mole bites | sniffs and a scrape | — |
| | a mole digs down or comes up | earth shifting | — |
| `snap` | a snapcap bites | a wet squelch and a snap | — |
| `rustle` | a herb mimic bites | dry leaves and teeth | — |
| `rattle` | a bone rat bites; its bones are scattered | clattering bones | — |
| | a bone rat falls to bones, or stands up again | bones dropping, bones gathering | — |
| `sip` | an oil tick drinks the lantern's oil (D-606) | a wet slurp and a gulp | — |
| | a warden bites | stone grinding | — |
| | a warden wakes | heavy stone shifting | — |
| | a creature spits a glob (D-688) | a wet spit | — |
| | a glob breaks or hits (D-688) | a small splat | — |

## Finds, the bag and home

| Name | When | Feel | File |
| --- | --- | --- | --- |
| | an item goes into the bag | a soft pat of cloth | — |
| | a herb, heartcap or potion eaten (D-308) | a crunch, or a drink | — |
| | a weapon goes into the hand (D-479) | a light metal scrape | — |
| | a tile set down from the bag (WB2) | a wooden thunk | — |
| | a stone or deposit chipped (O2) | a pick on stone | — |
| | a deposit breaks (O2) | stone cracking apart | — |
| | a person freed from the rubble (D-491) | stones tumbling away | — |
| | a person leaves for home, or arrives (D-496) | a soft shimmer | — |
| | an item sold at home (D-494) | coins | — |
| | a seed planted (D-566) | soft earth | — |
| | Bat Guano fed to a sprout (D-569) | a soft pat of earth | — |
| | a relic set on the shelf (D-693) | wood on wood | — |
| | something made at a bench or in the bag | tools at work | — |
| | a chest opened | a creaking lid | — |

## Places

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `bells` | a waystone wakes (D-591) | three bells rising | — |
| | travel by waystone (D-593) | a deep hum | — |
| `chime` | a boon picked (D-596) | two bells rising | — |
| `plop` | the fishing line cast (D-613) | a small plop | — |
| `splash` | a fish caught (D-613) | a splash and drops | — |
| | sleeping in a bed or out (D-758) | a long breath out | — |

## Menus and screens

| Name | When | Feel | File |
| --- | --- | --- | --- |
| | a button tapped | a tiny soft tick | — |
| | a card opens, or closes | a page turning | — |
| | something that can't be done | a low, dull tock | — |
| | the run ends | a slow falling tone | — |

## Maybe (for the owner to pick)

None of these is decided (Q-095): footsteps that change with the
ground (grass, stone, water; a wood step is picked, D-774: the grass
files at a quarter loudness, muffled, with the bright crack filtered
off above 1400 Hz); sounds all around, such as wind on the
surface, birds by day, crickets at night, drips in caves; music; a
warning when the oil runs low; a heartbeat at the last heart.

## Later (decided, not yet built)

Each comes with its own step: the night creatures (D-760) and day
creatures (D-771), the alchemy station (D-771), and the bow (D-772).
