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
- `0.4.0`: when the way to depth 9 opens, chapter 1 done (D-954).
- Later minor versions (`0.5`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.3.441 (2026-11-20)
- New: the Bladder Tank, the lantern's first tank. Make it at the
  workbench's GEAR tab, its last slot, from 2 Oil Bladder and 2 Copper Ore,
  then choose it in the bag and press Fit: it goes in the lantern, and no
  turn passes.
- With it fitted the lantern holds a quarter more oil: a full tank lasts 75
  turns instead of 60, on top of the wick, charms and the rest. The oil past
  a plain tank's worth is kept in reserve: the light reaches no further.
- The oil bar runs on to 13 segments, each still a tenth of a plain tank,
  so a flask fills as many as before. Flasks poured by themselves pour a
  little sooner, once none would spill, and you wake from a fall with the
  bigger tank full.
- The Oil Bladder now says what it is for: "An oil bladder. Two make a tank."
- Decisions: D-1005.

## 0.3.440 (2026-11-20)
- In the Lampeater's fight, its name and health bar sit top middle, away
  from the hero and the text line; on an upright phone, just below your
  hearts and pause.
- The round map steps aside while the arena is sealed, and the creature
  list leaves out the Lampeater, since the bar shows it. Its gloamlings are
  still listed. Both come back once the fight ends.
- The bar goes faint while the Lampeater or the hero is under it.
- Decisions: D-1004.

## 0.3.439 (2026-11-20)
- A bug fixed (F-9): chopping a tree or digging out a stump on the surface
  no longer stalls the screen. Only the tiles that changed are painted
  again, not the whole woods and its border; the picture is the same. On
  a slow phone a chop's pause goes from almost a second to a blink.
- The Lampeater's phases stay as they are. Its polish waits while the
  owner playtests, for new ideas.
- Decisions: D-1003.
