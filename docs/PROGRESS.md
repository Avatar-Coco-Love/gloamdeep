# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.3.34 · **Stage:** 0.3, the world (D-168); 0.3.x from 0.3.0
(D-528)

## Next up
The eighth audit, part 5 on (D-571, D-573, D-574): more cards into
`src/input/cards/`, a few a PR (the bed, then the menus), nothing visible
changed; after them, Q-076.

## Waiting on the owner
- A space or digits in names (Q-054), any time.
- Play data: kept on the device or sent (Q-052), near 1.0.
- Glints: which Feats pay, how many, the prices (Q-055), before the first unlock.
- A region's name and rating (Q-056), with a second region.
- Achievements' records and numbers (Q-057), before the first one.
- Creature materials: looks and recipes (Q-061), each at its own step.
- The chest card on squarer screens (Q-064), any time.
- Rooms seen through the wall (Q-066), after the edge.
- Half and Automatic for the light (Q-069), waiting for now (D-482).
- Water and the garden (Q-071), once water can be carried (D-569).
- What the guide is, not a faery (Q-072), when the owner wants it.
- Which new creature kind next (Q-076), after the audit.
- The herb mimic's and the bone rat's rare drops (Q-061), any time.
- A chance of an unguarded flask (Q-075), any time.

## Build plan: stage 0.3, the world (D-168, order approved; may change)
Ticked steps are in `archive/PROGRESS-LOG.md`. Tick a step
when merged, with its version, and move ticked steps there at each audit.

The rest of the scope, proposed (D-482; may change):
- [ ] 15 Fishing
- [ ] 16 Lore
- [ ] 17 Relics
- [ ] 18 Feats

**Next audit: 0.3.72** (D-518, D-570).

Ideas for later (and the owner's wish list in `RESEARCH.md`): gathering (D-282); more Records lines; painting rooms and saving them to a file (D-214); a Depth Meter to find or craft (the owner's idea); polish the outside art, and many generated looks for cave mouths (the owner's wish); menu themes, a changing or moving title background and hero (D-181); landmarks, NPC houses, special items, a second region,
lit rooms glowing ahead, swimming (Q-039); the lantern by itself at
low oil (D-210); music and more sounds (`RESEARCH.md`); scarcer light deeper
(D-159); more places (D-152, D-163); dev God mode (D-154); cheaper lighting for phones, the look unchanged (D-294, D-295); workstations for some crafts (D-296); trees, weather, sun and moon (Q-034, Q-035).

## Log (last 3)
- **2026-11-02, 0.3.35, the eighth audit, part 4.** All recommended: the
  bag's card and setting down get their own files in `src/input/cards/`,
  moved word for word; C, X and spoken words stay where they are; the
  test checks setting down by itself (D-574). Nothing visible.
- **2026-11-02, 0.3.34, the eighth audit, part 3.** All recommended: the
  workbench, chest and peddler cards each get a file in
  `src/input/cards/` with pick, arrows, tap and close, moved word for
  word; `screens.js` asks `cards/table.js` first; a test checks every
  card in it answers all four and closes (D-573). Nothing visible.
- **2026-11-02, 0.3.33, the eighth audit, part 2.** All recommended:
  `node tools/release.js` sets VERSION, copies the changelog into the
  history (its title from this log), keeps the changelog and this log at
  3, and only suggests moving decisions, past 11 KB; `npm test` runs its
  `--check` (D-572). Next: the table of screens. Nothing visible.
