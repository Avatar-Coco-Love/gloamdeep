# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.2.169 · **Stage:** 0.2, the last steps (36 to 41), in the
world of 0.3 (D-168, D-237)

## Next up
The camera on whole pixels, so the light no longer goes black on some
screen sizes, with a test (D-434); then the Half choice and Automatic
(D-432, D-433), the woods past the crypt's doorway outside (D-423), and
the scope, part 2 (`SCOPE.md`, D-413). Upright play (Q-065) is tabled.

## Waiting on the owner
- A space or digits in names (Q-054), any time.
- Play data: kept on the device or sent (Q-052), near 1.0.
- The play-earned currency (Q-055), before the first unlock.
- A region's name and rating (Q-056), with a second region.
- Achievements' tiers and rewards (Q-057), before the first one.
- The scope's parts 2 to 8 (`SCOPE.md`), one part at a time.
- Creature materials: names, chances, recipes (Q-061), part 3.
- The chest card on squarer screens (Q-064), any time.
- Playing upright too (Q-065), tabled for now.
- Rooms seen through the wall (Q-066), after the edge.
- The light choices' names in Settings (Q-068), with the Half step.

## Build plan: stage 0.3, the world (D-168, order approved; may change)
Ticked steps up to 0.2.121 are in `archive/PROGRESS-LOG.md`. Tick a step
when merged, with its version, and move ticked steps there at each audit.

**Next audit: 0.2.184** (D-337, D-421).

Ideas for later (and the owner's wish list in `RESEARCH.md`): gathering (D-282); more Records lines; painting rooms and saving them to a file (D-214); a Depth Meter to find or craft (the owner's idea); polish the outside art, and many generated looks for cave mouths (the owner's wish); menu themes, a changing or moving title background and hero (D-181); landmarks, NPC houses, special items, a second region,
lit rooms glowing ahead, swimming (Q-039); the lantern by itself at
low oil (D-210); music and more sounds (`RESEARCH.md`); scarcer light deeper
(D-159); more places (D-152, D-163); dev God mode (D-154); cheaper lighting for phones, the look unchanged (D-294, D-295); workstations for some crafts (D-296); a floor torch; trees, weather, sun and moon (Q-034, Q-035).

## Log (last 3)
- **2026-10-29, 0.2.169, half-size light, pictures.** Pictures drawn by
  the game compare today's light with two half-size ones; the owner picked
  the soft one (D-432) and Automatic switching down once (D-433). The
  owner's S26 Ultra runs at about 120 fps. Found: the light goes black on
  some screen sizes; fixing it is next (D-434).
  [Pictures](https://claude.ai/artifact/GbP79PqaMwajfoF8gy4Nvz).
- **2026-10-29, 0.2.168, smoother light, a speed check.** The light
  reuses work that hasn't changed, every pixel the same (3,456 pictures):
  on a simulated slow phone about 45 fps instead of 37 (D-429).
  `tools/perf.js` and a frame budget in `TECH.md` (D-430); one step a
  conversation (D-431). [Playtest](https://claude.ai/artifact/6vCMhWMRrz9oKxRTy3BKjH).
- **2026-10-29, 0.2.167, a bug, faster light, a save warning.** A check
  of the game (tests, 360,000 random turns, a slow-phone timing) found a
  creature and the hero sharing a tile after stairs or a fall: it steps
  aside now (D-426). The light is about twice as fast, every pixel the
  same (D-427); a failed save says so (D-428). Q-068 opened.
  [Playtest](https://claude.ai/artifact/PiAgNGU9GwEkafNrZx7RqM).
