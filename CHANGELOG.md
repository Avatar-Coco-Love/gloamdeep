# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump. The same lines go, word for word, into the in-game Version
history, `src/core/history-0.3.js` (D-254, D-528).

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- `0.3.x`: stage 0.3, the world (D-168), from 0.3.0, once stage 0.2's
  last steps were done (D-528).
- Later minor versions (`0.4`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.3.191 (2026-11-09)
- The rock on the surface is rounded now, as the cave walls are, but lit by day: a sunlit grey top in place of the near-black squares. Rocks in the mountain rooms are fuller lumps, trees stand in front of them, and the two rocks beside the cave mouth are rounded too.
- Past a mountain room's edge the rock goes on, with a grass path leading out to each room beside it, where trees stood before.
- Decisions: D-739.

## 0.3.190 (2026-11-09)
- The three rooms along the north of Hearthwood are mountain rooms now: rocky slopes of grass, rock standing where the trees would be, with a few lone trees. Each has 3 grey boulders to break for stone, as in the caves, and its own sticks and fallen branch, but no pond or bush. On the map, rock on the surface shows grey. If you have already been to one of these rooms, it stays woods.
- Decisions: D-738.

## 0.3.189 (2026-11-09)
- Where you wake after a fall: beside the last bed you slept in, on the spot you lay down from (or the nearest free spot beside the bed). With no bed, on the home waystone once it is woken; no boon is offered until you step off and back on. Otherwise, where the journey began. Taking the bed down forgets it until you sleep in it again. Hardcore still begins the world again.
- Decisions: D-737.
