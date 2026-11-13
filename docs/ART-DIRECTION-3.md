# Art direction, part 3: colours only the code had

`ART-DIRECTION.md` continued, under its rules. Made at 0.3.326 (D-881,
health check H-61): every colour the drawing code used that no art doc
wrote down, with where it lives. Colours already in `ART-DIRECTION.md`,
`ART-DIRECTION-2.md`, the style study or `src/core/looks.js` aren't
repeated. A new colour in the code gets its line here too.

## Text and menus
| What | Colours | Code |
| --- | --- | --- |
| Dim: a line that can't be picked, an empty slot, an unlit mark | `#5c566a` | `menu.js:7`, `slots.js`, `journal.js`, `journalrows.js`, `cloak.js`, `map.js`, `boons.js`, `ways.js`, `title.js:41` |
| A gold line that can't be picked | `#a08548` | `menu.js:7`, `ways.js:12` |
| Words on a tapped creature's tag | `#c9c2d6` | `framed.js:10` |
| The sealed arch's pale lintel stone | `#8a93a6` | `seal.js:14` |

## Light and glints
| What | Colours | Code |
| --- | --- | --- |
| The leaving beam's paler yellows | `#ffe9a8` `#fff3c8` | `beam.js:9` |
| The locket's sliding glint | `#fffbe8` | `sprites.js:335` |
| The lure wisp's halo (60%) | `#5a66b8` `#3a4590` | `sprites.js:304` |
| An unlit torch's burnt head | `#2b2228` `#5a5260` | `torches.js:17` |

## The woods and the waystone
| What | Colours | Code |
| --- | --- | --- |
| Grass, three patches and the pale blade | `#345a2c` `#3f6b34` `#4a7a3a` `#5a8c44` | `woods.js:29-30` |
| Crowns, the old green, highlight to rim | `#6fb04e` `#4f8a3f` `#36633a` `#2c5230` `#1d3620` `#13241a` | `woods.js:41` |
| Crowns, a deep blue-green | `#62a067` `#457f52` `#2e5a42` `#244a38` `#162e25` `#0e1e18` | `woods.js:42` |
| Crowns, a warm olive | `#93b552` `#719440` `#527034` `#415c2c` `#2a3c1e` `#192612` | `woods.js:43` |
| Trunks: wood, light to dark (D-314) | `#9a7350` `#6a4c36` `#3e2c20` | `pictures.js:14`, `woods.js:56`, `torches.js:15`, `map.js:33` |
| The waystone's moss, and its grass | `#3d5a32` `#4f6b3a` `#5f7d44`; `#3f6b34` `#4a7a3a` | `waystone.js:11` |
| The cave mouth's path | `#3e3126` `#4a3a2c` | `mouth.js:15` |

## Water
| What | Colours | Code |
| --- | --- | --- |
| Bank, rim, shallow, deep, body | `#0d1119` `#151d2e`, `#56688c`, `#2c3a58`, `#1f2a44`, `#25324f` | `water.js:9`, `tiles.js:104` |
| Ripples, light to dark | `#8aa2cc` `#62789f` `#45587c` | `water.js:9`, `float.js:6` |
| The grass lip by water | `#13241a` `#1d3620` | `water.js:11` |
| The lantern's light on water, near to far | `#ffd889` `#e0a050` `#9a6234` | `water.js:92` |

## Creatures, finds and marks
| What | Colours | Code |
| --- | --- | --- |
| The cave spider (D-535) | `#5d5672` `#3a344b` | `pictures.js:15` |
| The bush's shades; the gloamberry (D-531) | `#2c5230` `#1d3620`; `#3a4590` `#8a98e0` | `pictures.js:16` |
| The centipede's rust; venom's green (D-654) | `#c4553a` `#7e3020` `#4e1c16`; `#b6e07a` | `pictures.js:20`, `hearts.js:17`, `marks.js:18` |
| The spit grub's glow (D-688) | `#eaffb8` | `pictures.js:21` |
| The locket's gold and violet (D-692) | `#ffe08a` `#9a5424` `#b49cf0` `#2b1f44` | `pictures.js:347, 497` |
| Ward, spitproof, shade draughts and marks | `#dcf0d4` `#8fb898`; `#e0a0aa` `#a8606e`; `#b39ad0` `#6e5a8c` | `pictures.js:571-577`, `marks.js:30-34` |
| The scorpions' five looks | `#d9c48e` `#9a8458`; `#d0603a` `#7e3020`; `#5e5870` `#302c3c`; `#a9a65a` `#64612e`; `#e6dcc4` `#a89c80` | `pictures-creatures.js:130-132` |
| The map's dungeon and woods tones | `#4c5a84` `#4f8a3f` | `map.js:28` |
