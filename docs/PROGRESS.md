# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.3.138 · **Stage:** 0.3, the world (D-168); 0.3.x from 0.3.0
(D-528)

## Next up
S3's second half (D-686): with reduced motion on, play draws a frame
only when something changes, play feeling the same. Then the Spit grub
(D-659).

## Waiting on the owner
- A space or digits in names (Q-054), any time.
- Play data: kept on the device or sent (Q-052), near 1.0.
- Glints: which Feats pay, how many, the prices (Q-055), before the first unlock.
- A region's name and rating (Q-056), with a second region.
- Achievements' records and numbers (Q-057), before the first one.
- Creature materials: looks and recipes (Q-061), each at its own step.
- Rooms seen through the wall (Q-066), after the edge.
- Half and Automatic for the light (Q-069), waiting for now (D-482).
- Water and the garden (Q-071), once water can be carried (D-569).
- Who the keeper is (Q-084), when the owner wants.
- The herb mimic's and the bone rat's rare drops (Q-061), any time.
- A chance of an unguarded flask (Q-075), any time.
- Begin a journey on the surface (Q-081), as its own small step.
- Special creatures with histories (Q-083), at their own step.
- Rooms that fill again (Q-086), after biome 1 grows.

## Build plan: stage 0.3, the world (D-168, order approved; may change)
Ticked steps are in `archive/PROGRESS-LOG.md`. Tick a step
when merged, with its version, and move ticked steps there at each audit.

The rest of the scope, proposed (D-482; may change):
- [ ] 19 Lore (D-629): the first words (0.3.83); the Bestiary tab (0.3.85); how it acts (0.3.86); how to fight it (0.3.87); the story (0.3.88)
- [ ] 20 Relics
- [ ] 21 Feats

**Next audit: 0.3.152** (D-518, D-660).

Ideas for later (and the owner's wish list in `RESEARCH.md`): the boon cards dealt face down (D-603); gathering (D-282); more Records lines; painting rooms and saving them to a file (D-214); a Depth Meter to find or craft (the owner's idea); polish the outside art, and many generated looks for cave mouths (the owner's wish); menu themes, a changing or moving title background and hero (D-181); landmarks, NPC houses, special items, a second region,
lit rooms glowing ahead, swimming (Q-039); the lantern by itself at
low oil (D-210); music and more sounds (`RESEARCH.md`); scarcer light deeper
(D-159); more places (D-152, D-163); cheaper lighting for phones, the look unchanged (D-294, D-295; what is left in `RESEARCH-PAGES.md`); workstations for some crafts (D-296); trees, weather, sun and moon (Q-034, Q-035).

## Log (last 3)
- **2026-11-07, 0.3.138, The room holds still under a card.** As
  recommended (D-686): under a card the room is drawn once and kept, so a
  frame with the bag open takes about 1 ms, not 8, on a slowed phone (S3,
  its first half). Its torches stop flickering until the card closes. A
  test checks when it is kept. Playtest:
  https://claude.ai/artifact/RsX1LEgtp244Ayem2bLSUH
- **2026-11-07, 0.3.137, The rock painted faster.** As recommended
  (D-685): the rock painter works out each tile's walls once, not for
  every pixel, so a cave room paints in about half the time (S1). The
  picture is the same, pixel for pixel; a test checks 12 rooms.
  Playtest:
  https://claude.ai/artifact/AgfwmCnzfa5JA3mFQBA2RF
- **2026-11-07, 0.3.136, He has wares at home.** As recommended
  (D-684): the peddler at home no longer says "I'll have wares soon"
  while selling them (D4). His two other home lines take turns. A test
  checks it. Playtest:
  https://claude.ai/artifact/8ea1a3caT6egJh2pSvMoya
