# Sounds 2

The creatures' sounds, moved word for word from `SOUNDS.md` at 0.3.266
to keep it under 8 KB. Each line reads as the lines there do. Places,
"Maybe" and "Later" followed at 0.3.272, the fourteenth audit (D-826),
word for word. Menus and screens followed at 0.3.277, word for word, and Fighting at
0.3.278.

## Fighting

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `hit` | the hero hits with the lantern (D-777) | a dull knock | `kenney-impact-sounds/impactPunch_medium_000` to `004`, at a quarter loudness, CC0 |
| `hit` | the hero hits with the knife or spear (D-777) | a quick slice | `kenney-rpg-audio/knifeSlice` and `knifeSlice2`, at a quarter loudness, CC0 |
| `miss` | the hero, stiff, swings and misses (D-759, D-831) | a swish through air | the elemental pack's `Wind-012` to `014`, at 0.55, CC0 |
| `beaten` | a creature is beaten (D-777) | a short fall or crumple, 0.12 s after the hit | `kenney-impact-sounds/impactSoft_heavy_000` to `004`, at a quarter loudness, CC0 |
| `hurt` | the hero is hurt: a bite or a glob takes a heart, a moment after the hero's swing (D-831) | a small gasp; no pack has a voice, so a blow | `kenney-impact-sounds/impactPunch_heavy_000` to `004`, a tenth lower, muffled above 900 Hz, at 0.32, CC0 |
| `poison` | poison takes a heart (D-654, D-831) | a sick, low pulse | the same punch at 0.6 pitch, muffled above 400 Hz, at 0.36, then at 0.57 and 0.26, 0.35 s later, CC0 |
| `rise` | a level reached (D-246, D-831), after the beaten thud | a short rising note | `kenney-impact-sounds/impactGlass_light_000` to `002` at 1, 1.26 and 1.5, 0.11 s apart, at 0.2 to 0.16, 0.55 s late, CC0 |

## Creatures (their bites and their own sounds)

Each bite plays a quarter second after the hero's swing, as the hurt blow does, and all share one line in Settings, Bites (D-832). The gloamling's, lampmoth's and warden's bites stay silent for now: their own board comes next.

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `teeth` | a rat bites; a centipede bites; an oil tick bites (D-832) | small sharp teeth | `kenney-impact-sounds/impactGeneric_light_000` and `001` at 1.7, then at 1.95, 0.07 s later, at 0.22 and 0.18, CC0 |
| | rats in a pack call out (D-767) | squeaks together | — |
| | a gloamling bites (silent until now) | — | — |
| | a lampmoth bites (silent until now) | a papery flutter | — |
| `glass` | a flask mimic bites (D-832) | a clink and a snap | `impactGlass_light_000` and `001` at 1.1, 0.2, then the rat's nip at 1.5, 0.08 s later, CC0 |
| | a flask mimic or herb mimic wakes (silent until now, D-368) | a jolt | — |
| `sting` | a scorpion stings (D-832) | two clicks and a stab | `kenney-interface-sounds/pluck_001` and `002` at 0.8 and 0.85, 0.09 s apart, at 0.2, then `kenney-rpg-audio/knifeSlice`'s first 0.3 s at 0.25, 0.2 s in, CC0 |
| | a scorpion raises its tail | a dry rattle | — |
| `hiss` | a cave spider bites (D-832) | a soft hiss and a click | the elemental pack's `Wind-015` at 1.2, 0.5 s, fading 0.3 s, at 0.35, then a pluck at 0.9, 0.15, 0.35 s in, CC0 |
| `squeak` | a bat bites (D-832) | a chirp and a flap | two plucks at 1.6 and 1.7, 0.07 s apart, at 0.15, then `kenney-rpg-audio/cloth1` or `2` at 1.3, 0.3, 0.12 s in, CC0 |
| `snuffle` | a mole bites (D-832) | sniffs and a scrape | the stiff miss's puffs at 1.5, three, 0.12 s apart, at 0.4 to 0.32, then `footstep_snow_000` or `001` at 0.25, 0.4 s in, CC0 |
| | a mole digs down or comes up | earth shifting | — |
| `snap` | a snapcap bites (D-832) | a wet squelch and a snap | `Water-025` at 1.2, 0.35 s, fading 0.15 s, at 0.35, then the rat's nip at 1.4, 0.25, 0.12 s in, CC0 |
| `rustle` | a herb mimic bites (D-832) | dry leaves and teeth | two grass steps at 1.3 and 1.4, 0.08 s apart, at 0.3 and 0.26, then the rat's nip at 1.7, 0.16 s in, CC0 |
| `rattle` | a bone rat bites (D-832); its bones are scattered | clattering bones | `impactWood_light_000`, `001`, `002`, `000` at 1.6, at 0, 0.05, 0.1 and 0.16 s, at 0.2 falling to 0.14, CC0 |
| | a bone rat falls to bones, or stands up again | bones dropping, bones gathering | — |
| `sip` | an oil tick drinks the lantern's oil (D-606, D-832) | a wet slurp and a gulp | `Water-038` at 1.1, 0.4 s, fading 0.15 s, at 0.35, then `Water-025` at 1.3, 0.3 s, at 0.3, 0.25 s in, CC0 |
| | a warden bites | stone grinding | — |
| | a warden wakes | heavy stone shifting | — |
| | a creature spits a glob (D-688) | a wet spit | — |
| | a glob breaks or hits (D-688) | a small splat | — |

## Menus and screens

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `tap` | a button tapped, off play, changing something on the same card (D-819) | a tiny soft tick | `kenney-interface-sounds/tick_002`, at an eighth loudness, CC0 |
| `card` | a card opens, or closes (D-819) | a page turning | `kenney-rpg-audio/bookFlip3` to open, `bookFlip2` to close, at 0.38 and 0.58, CC0 |
| `refuse` | a dim pick that can't be done (D-819) | a low, dull tock | `kenney-impact-sounds/impactWood_light_000`, a quarter lower, at a quarter loudness, CC0 |
| | the run ends | a slow falling tone | — |

## Places

| Name | When | Feel | File |
| --- | --- | --- | --- |
| `bells` | a waystone wakes (D-591) | three bells rising | — |
| | travel by waystone (D-593) | a deep hum | — |
| `chime` | a boon picked (D-596) | two bells rising | — |
| `plop` | the fishing line cast (D-613) | a small plop | — |
| `splash` | a fish caught (D-613) | a splash and drops | — |
| | sleeping in a bed or out (D-758) | a long breath out | — |

## Maybe (for the owner to pick)

None of these is decided (Q-095): steps on more grounds (water,
wood; a wood step is picked, D-774: the grass files at a quarter
loudness, muffled, with the bright crack filtered off above 1400 Hz,
the same as the burrows' earth, D-776); sounds all around, such as wind on the
surface, birds by day, crickets at night, drips in caves; music; a
warning when the oil runs low; a heartbeat at the last heart.

## Later (decided, not yet built)

Each comes with its own step: the night creatures (D-760) and day
creatures (D-771), the alchemy station (D-771), and the bow (D-772).
