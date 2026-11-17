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

## 0.3.411 (2026-11-17)
- Walk into a Leap gap before you have learnt Leap and it says "Too wide to step. More lies beyond." Once you have Leap, it says "Too wide to step. Leap it."
- Decisions: D-969. D-963 moved to the archive, word for word.

## 0.3.410 (2026-11-17)
- From depth 5 to 8, a dead end on a floor can hold its cache of finds behind a gap: a short line of black drop across the floor, "Too wide to step across." You can see the finds over it, but not reach them yet.
- Once the Lampeater is beaten and you have learnt Leap, come back up and leap the gap to take them. Rooms you have already been in stay as they were.
- About 6 floors in 10 from depth 5 to 8 have one; the rest have none, where no straight line fits. The map preview marks each gap.
- Decisions: D-968. D-964 moved to the archive, word for word.

## 0.3.409 (2026-11-17)
- No more falling floor in the Lampeater's fight. Beat it and its door sinks open ("The door sinks open. You learn Leap."), and the seal stones round the stairs stay standing, wherever you are.
- Walk through the door, over the stones and onto the stairs, or leap from the door straight onto them. The way back down on a later trip is never cut off.
- The gap, its crumble, its shake and its sound are kept for another place later.
- Decisions: D-967. D-951 moved to the archive, word for word.
